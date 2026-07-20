import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  getClientIp,
  rateLimit,
  sanitizeFilename,
  extensionAllowed,
  base64Bytes,
  isBase64,
  safeHttpUrl,
} from '@/lib/api-guard';

// Hard server-side limits (client enforces friendlier ones first).
const MAX_ASSETS = 4;
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB per file
const MAX_TOTAL_BYTES = 18 * 1024 * 1024; // keep under Vercel's ~20MB body cap
const CAP = { short: 200, notes: 4000, colors: 6, refs: 6 };

function clampStr(v: unknown, max: number): string {
  return typeof v === 'string' ? v.slice(0, max) : '';
}

/**
 * POST /api/brief
 * Receives the multi-step brief form submission and emails it to the studio
 * inbox via Resend. Falls back to a console-log in dev if RESEND_API_KEY
 * is unset - so the form still works locally without configuration.
 *
 * Required env vars (prod):
 *   RESEND_API_KEY    e.g. re_XXXXXXXXXX (from https://resend.com)
 *   BRIEF_TO_EMAIL    where briefs land   (e.g. hello@swash.studio)
 *   BRIEF_FROM_EMAIL  verified send-from  (e.g. briefs@swash.studio)
 */

type Reference = { url?: string; note?: string };

type UploadedFile = {
  name?: string;
  type?: string;
  size?: number;
  content?: string; // base64
};

type Brief = {
  industry?: string;
  projectName?: string;
  currentSite?: string;
  goal?: string;
  features?: string[];
  timeline?: string;
  budget?: string;
  budgetCurrency?: string;
  budgetMin?: string;
  budgetMax?: string;
  hosting?: string;
  ongoingUpdates?: string;
  paymentPreference?: string;
  brandStatus?: string;
  brandColors?: string[];
  logo?: UploadedFile | null;
  assets?: UploadedFile[];
  assetsLink?: string;
  references?: Reference[];
  notes?: string;
  name?: string;
  email?: string;
  phone?: string;
  bestReach?: string;
};

const HOSTING_LABEL: Record<string, string> = {
  yes:    'Yes - host it for me',
  self:   'No - I will host it myself',
  unsure: 'Not sure yet',
};

const UPDATES_LABEL: Record<string, string> = {
  retainer: 'Monthly retainer (48-hour turnaround)',
  self:     'Self-manage via the CMS',
  unsure:   'Not sure yet',
};

const PAYMENT_LABEL: Record<string, string> = {
  full:   'Pay in full on sign-off',
  split:  'Split into two payments',
  unsure: 'Not sure yet',
};

function label(map: Record<string, string>, key?: string) {
  if (!key) return '';
  return map[key] ?? key;
}

const CURRENCY_SYMBOL: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  ZAR: 'R',
};

function formatBudgetRange(d: Brief): string {
  const min = (d.budgetMin ?? '').trim();
  const max = (d.budgetMax ?? '').trim();
  if (!min && !max) return '';
  const cur = d.budgetCurrency ?? 'USD';
  const sym = CURRENCY_SYMBOL[cur] ?? '';
  const fmt = (v: string) => {
    const n = Number(v);
    return Number.isFinite(n) && v !== '' ? n.toLocaleString('en-US') : v;
  };
  if (min && max) return `${sym}${fmt(min)} - ${sym}${fmt(max)} (${cur})`;
  if (min) return `from ${sym}${fmt(min)} (${cur})`;
  return `up to ${sym}${fmt(max)} (${cur})`;
}

function htmlEscape(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!),
  );
}

function formatRefs(refs?: Reference[]) {
  if (!refs || refs.length === 0) return '';
  return refs
    .filter(r => (r.url ?? '').trim().length > 0)
    .map(r => (r.note ? `${r.url} - ${r.note}` : r.url ?? ''))
    .join('\n');
}

function row(label: string, value?: string | string[]) {
  if (!value || (Array.isArray(value) && value.length === 0)) return '';
  const v = Array.isArray(value) ? value.join(', ') : value;
  return `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #E1DAC4;font:11px/1 'JetBrains Mono', monospace;text-transform:uppercase;letter-spacing:0.18em;color:#6B6B65;width:160px;vertical-align:top;">
        ${htmlEscape(label)}
      </td>
      <td style="padding:10px 14px;border-bottom:1px solid #E1DAC4;font:14px/1.5 -apple-system, system-ui, sans-serif;color:#0A0A0A;">
        ${htmlEscape(v)}
      </td>
    </tr>`;
}

function colorRow(label: string, hexes?: string[]) {
  if (!hexes || hexes.length === 0) return '';
  const swatches = hexes
    .map((h) => {
      const safe = /^#[0-9a-fA-F]{3,8}$/.test(h) ? h : '#000000';
      return `<span style="display:inline-block;width:18px;height:18px;border-radius:4px;background:${safe};border:1px solid rgba(0,0,0,0.1);margin-right:6px;vertical-align:middle;"></span><span style="vertical-align:middle;font-family:monospace;font-size:12px;color:#0A0A0A;margin-right:14px;">${htmlEscape(h)}</span>`;
    })
    .join('');
  return `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #E1DAC4;font:11px/1 'JetBrains Mono', monospace;text-transform:uppercase;letter-spacing:0.18em;color:#6B6B65;width:160px;vertical-align:top;">
        ${htmlEscape(label)}
      </td>
      <td style="padding:10px 14px;border-bottom:1px solid #E1DAC4;line-height:1.8;">
        ${swatches}
      </td>
    </tr>`;
}

function attachmentRow(label: string, files: { name: string; size: number }[]) {
  if (files.length === 0) return '';
  const list = files
    .map((f) => `${htmlEscape(f.name)} <span style="color:#6B6B65;font-family:monospace;font-size:11px;">(${formatBytesServer(f.size)})</span>`)
    .join('<br />');
  return `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #E1DAC4;font:11px/1 'JetBrains Mono', monospace;text-transform:uppercase;letter-spacing:0.18em;color:#6B6B65;width:160px;vertical-align:top;">
        ${htmlEscape(label)}
      </td>
      <td style="padding:10px 14px;border-bottom:1px solid #E1DAC4;font:14px/1.5 -apple-system;color:#0A0A0A;">
        ${list}
        <p style="margin:6px 0 0;font:11px/1.4 'JetBrains Mono';color:#6B6B65;text-transform:uppercase;letter-spacing:0.16em;">
          (attached to this email)
        </p>
      </td>
    </tr>`;
}

function formatBytesServer(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function linkRow(label: string, url?: string) {
  if (!url || !url.trim()) return '';
  // Only render a clickable anchor for http(s). Anything else (javascript:,
  // data:, mailto tricks) renders as inert escaped text instead.
  const httpUrl = safeHttpUrl(url);
  const cell = httpUrl
    ? `<a href="${htmlEscape(httpUrl)}" style="color:#2447FF;text-decoration:underline;word-break:break-all;">${htmlEscape(httpUrl)}</a>`
    : `<span style="word-break:break-all;color:#0A0A0A;">${htmlEscape(url.trim())}</span>`;
  return `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #E1DAC4;font:11px/1 'JetBrains Mono', monospace;text-transform:uppercase;letter-spacing:0.18em;color:#6B6B65;width:160px;vertical-align:top;">
        ${htmlEscape(label)}
      </td>
      <td style="padding:10px 14px;border-bottom:1px solid #E1DAC4;font:14px/1.5 -apple-system, system-ui, sans-serif;">
        ${cell}
      </td>
    </tr>`;
}

function buildEmail(d: Brief) {
  const subject = `New brief - ${d.projectName ?? 'Unnamed'} · ${d.industry ?? 'unknown industry'}`;
  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:32px;background:#F7F1E2;font-family:-apple-system, system-ui, sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" style="max-width:640px;margin:0 auto;background:#FBF6E8;border:1px solid #E1DAC4;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:32px 28px 16px;">
        <p style="margin:0;font:11px/1 'JetBrains Mono', monospace;text-transform:uppercase;letter-spacing:0.22em;color:#C2402F;">
          A new brief just landed
        </p>
        <h1 style="margin:14px 0 6px;font:600 32px/1.1 'Inter Tight', system-ui, sans-serif;letter-spacing:-0.02em;color:#0A0A0A;">
          ${htmlEscape(d.projectName ?? 'Unnamed project')}
        </h1>
        <p style="margin:0;font:14px/1.5 -apple-system;color:#6B6B65;">
          ${htmlEscape(d.industry ?? '')} · From ${htmlEscape(d.name ?? '')} (${htmlEscape(d.email ?? '')})
        </p>
      </td>
    </tr>
    <tr><td style="padding:0 14px 16px;">
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
        ${row('Industry', d.industry)}
        ${row('Project', d.projectName)}
        ${row('Current site', d.currentSite || '-')}
        ${row('Goal', d.goal)}
        ${row('Features', d.features)}
        ${row('Timeline', d.timeline)}
        ${row('Budget', d.budget)}
        ${row('Budget range', formatBudgetRange(d))}
        ${row('Payment', label(PAYMENT_LABEL, d.paymentPreference))}
        ${row('Hosting', label(HOSTING_LABEL, d.hosting))}
        ${row('Updates after launch', label(UPDATES_LABEL, d.ongoingUpdates))}
        ${row('Brand status', d.brandStatus)}
        ${colorRow('Brand colors', d.brandColors)}
        ${attachmentRow('Logo', d.logo && d.logo.name && d.logo.size ? [{ name: d.logo.name, size: d.logo.size }] : [])}
        ${attachmentRow('Assets', (d.assets ?? []).filter((a): a is Required<UploadedFile> => !!a.name && !!a.size).map(a => ({ name: a.name, size: a.size })))}
        ${linkRow('Assets link', d.assetsLink)}
        ${row('References', formatRefs(d.references))}
        ${row('Notes', d.notes || '-')}
        ${row('Name', d.name)}
        ${row('Email', d.email)}
        ${row('Phone', d.phone || '-')}
        ${row('Best reach', d.bestReach)}
      </table>
    </td></tr>
    <tr><td style="padding:16px 28px 32px;">
      <p style="margin:0;font:11px/1.5 'JetBrains Mono', monospace;color:#6B6B65;text-transform:uppercase;letter-spacing:0.18em;">
        Video demo within 48 hours · request changes after · pay nothing until you sign off.
      </p>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `New brief - ${d.projectName ?? 'Unnamed'}`,
    '',
    `Industry: ${d.industry ?? ''}`,
    `Current site: ${d.currentSite ?? '-'}`,
    `Goal: ${d.goal ?? ''}`,
    `Features: ${(d.features ?? []).join(', ')}`,
    `Timeline: ${d.timeline ?? ''}`,
    `Budget: ${d.budget ?? ''}`,
    `Budget range: ${formatBudgetRange(d) || '-'}`,
    `Payment: ${label(PAYMENT_LABEL, d.paymentPreference)}`,
    `Hosting: ${label(HOSTING_LABEL, d.hosting)}`,
    `Updates after launch: ${label(UPDATES_LABEL, d.ongoingUpdates)}`,
    `Brand status: ${d.brandStatus ?? ''}`,
    `Brand colors: ${(d.brandColors ?? []).join(', ') || '-'}`,
    `Logo: ${d.logo?.name ?? '-'}`,
    `Assets: ${(d.assets ?? []).map(a => a.name).join(', ') || '-'}`,
    `Assets link: ${d.assetsLink?.trim() || '-'}`,
    `References:\n${formatRefs(d.references) || '-'}`,
    `Notes: ${d.notes ?? '-'}`,
    '',
    `From: ${d.name ?? ''} <${d.email ?? ''}>`,
    `Phone: ${d.phone ?? '-'}`,
    `Best reach: ${d.bestReach ?? ''}`,
  ].join('\n');

  return { subject, html, text };
}

export async function POST(req: Request) {
  // Rate limit: 5 briefs per 10 minutes per IP (best-effort, in-memory).
  const ip = getClientIp(req);
  if (!rateLimit(`brief:${ip}`)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please wait a few minutes, or email hello@swash.studio.' },
      { status: 429 },
    );
  }

  let raw: (Brief & { website?: string }) | null;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (!raw || typeof raw !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // Honeypot: real users never fill "website". Pretend success, send nothing.
  if (typeof raw.website === 'string' && raw.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Normalize + clamp every field so a hand-crafted payload can't blow past
  // our limits or inject oversized content into the studio inbox.
  const files: UploadedFile[] = [];
  const addFile = (f: UploadedFile | null | undefined): UploadedFile | null => {
    if (!f || typeof f !== 'object') return null;
    const content = typeof f.content === 'string' ? f.content : '';
    const name = sanitizeFilename(typeof f.name === 'string' ? f.name : 'file');
    if (!content || !isBase64(content)) return null;
    if (!extensionAllowed(name)) return null;
    if (base64Bytes(content) > MAX_FILE_BYTES) return null;
    const clean: UploadedFile = { name, type: clampStr(f.type, 100), size: base64Bytes(content), content };
    files.push(clean);
    return clean;
  };

  const rawAssets = Array.isArray(raw.assets) ? raw.assets.slice(0, MAX_ASSETS) : [];
  const logo = addFile(raw.logo);
  const assets = rawAssets.map(addFile).filter((f): f is UploadedFile => f !== null);
  const totalBytes = files.reduce((n, f) => n + (f.size ?? 0), 0);
  if (totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: 'Uploads too large. Remove a file or share a Drive link instead.' },
      { status: 413 },
    );
  }

  const data: Brief = {
    industry: clampStr(raw.industry, CAP.short),
    projectName: clampStr(raw.projectName, CAP.short),
    currentSite: clampStr(raw.currentSite, CAP.short),
    goal: clampStr(raw.goal, CAP.short),
    features: Array.isArray(raw.features) ? raw.features.slice(0, 20).map((f) => clampStr(f, CAP.short)) : [],
    timeline: clampStr(raw.timeline, CAP.short),
    budget: clampStr(raw.budget, CAP.short),
    budgetCurrency: clampStr(raw.budgetCurrency, 8),
    budgetMin: clampStr(raw.budgetMin, 20),
    budgetMax: clampStr(raw.budgetMax, 20),
    hosting: clampStr(raw.hosting, CAP.short),
    ongoingUpdates: clampStr(raw.ongoingUpdates, CAP.short),
    paymentPreference: clampStr(raw.paymentPreference, CAP.short),
    brandStatus: clampStr(raw.brandStatus, CAP.short),
    brandColors: Array.isArray(raw.brandColors) ? raw.brandColors.slice(0, CAP.colors).map((c) => clampStr(c, 32)) : [],
    logo,
    assets,
    assetsLink: clampStr(raw.assetsLink, 500),
    references: Array.isArray(raw.references)
      ? raw.references.slice(0, CAP.refs).map((r) => ({ url: clampStr(r?.url, 500), note: clampStr(r?.note, CAP.short) }))
      : [],
    notes: clampStr(raw.notes, CAP.notes),
    name: clampStr(raw.name, CAP.short),
    email: clampStr(raw.email, CAP.short),
    phone: clampStr(raw.phone, 60),
    bestReach: clampStr(raw.bestReach, 20),
  };

  if (!data.email || !data.name) {
    return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BRIEF_TO_EMAIL ?? 'hello@swash.studio';
  const from = process.env.BRIEF_FROM_EMAIL ?? 'Swash <briefs@swash.studio>';
  const isProd = process.env.NODE_ENV === 'production';

  const email = buildEmail(data);

  // In production we MUST send the email. If credentials are missing, fail
  // loudly so the form shows an error instead of silently dropping briefs.
  if (!apiKey) {
    if (isProd) {
      // Redacted: no PII, no base64 attachment content in logs.
      console.error(
        `[brief] RESEND_API_KEY missing in production - dropped submission for project "${data.projectName || 'Unnamed'}"`,
      );
      return NextResponse.json(
        { error: 'Email service not configured. Please email us directly while we fix this.' },
        { status: 503 },
      );
    }
    // Dev fallback: log and succeed so the form is functional without setup.
    console.log('[brief] RESEND_API_KEY unset - logging instead of sending (dev only)');
    console.log('[brief] to:', to);
    console.log('[brief] subject:', email.subject);
    return NextResponse.json({ ok: true, dev: true });
  }

  // Build Resend attachments from uploaded files (logo + assets).
  // Resend total email size limit is 40MB; per-file we already capped at 5MB.
  const attachments: { filename: string; content: string }[] = [];
  if (data.logo?.content && data.logo.name) {
    attachments.push({
      filename: `logo-${data.logo.name}`,
      content: data.logo.content,
    });
  }
  for (const asset of data.assets ?? []) {
    if (asset?.content && asset.name) {
      attachments.push({ filename: asset.name, content: asset.content });
    }
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('[brief] resend error:', error);
      return NextResponse.json({ error: 'Email failed to send' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[brief] unexpected error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
