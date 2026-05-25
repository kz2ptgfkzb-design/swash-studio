import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

type Brief = {
  industry?: string;
  projectName?: string;
  currentSite?: string;
  goal?: string;
  features?: string[];
  timeline?: string;
  budget?: string;
  hosting?: string;
  ongoingUpdates?: string;
  paymentPreference?: string;
  brandStatus?: string;
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
        ${row('Payment', label(PAYMENT_LABEL, d.paymentPreference))}
        ${row('Hosting', label(HOSTING_LABEL, d.hosting))}
        ${row('Updates after launch', label(UPDATES_LABEL, d.ongoingUpdates))}
        ${row('Brand status', d.brandStatus)}
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
    `Payment: ${label(PAYMENT_LABEL, d.paymentPreference)}`,
    `Hosting: ${label(HOSTING_LABEL, d.hosting)}`,
    `Updates after launch: ${label(UPDATES_LABEL, d.ongoingUpdates)}`,
    `Brand status: ${d.brandStatus ?? ''}`,
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
  let data: Brief;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!data.email || !data.name) {
    return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
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
      console.error('[brief] RESEND_API_KEY missing in production - submission dropped');
      console.error('[brief] data:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: 'Email service not configured. Please email us directly while we fix this.' },
        { status: 503 },
      );
    }
    // Dev fallback: log and succeed so the form is functional without setup.
    console.log('[brief] RESEND_API_KEY unset - logging instead of sending (dev only)');
    console.log('[brief] to:', to);
    console.log('[brief] subject:', email.subject);
    console.log('[brief] data:', JSON.stringify(data, null, 2));
    return NextResponse.json({ ok: true, dev: true });
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
