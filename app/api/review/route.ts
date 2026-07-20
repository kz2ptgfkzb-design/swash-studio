import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getClientIp, rateLimit } from '@/lib/api-guard';

/**
 * POST /api/review
 * Receives a public review submission and emails it to the studio inbox
 * for moderation. Nothing is published automatically - approved reviews
 * are added to data/reviews.ts and deployed.
 *
 * Uses the same Resend env vars as /api/brief:
 *   RESEND_API_KEY, BRIEF_TO_EMAIL, BRIEF_FROM_EMAIL
 */

type ReviewSubmission = {
  name?: string;
  company?: string;
  email?: string;
  rating?: number;
  text?: string;
  /** Honeypot - real users never fill this */
  website?: string;
};

function htmlEscape(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!),
  );
}

const MAX = { name: 120, company: 120, email: 200, text: 2000 };

export async function POST(req: Request) {
  // Rate limit: 5 reviews per 10 minutes per IP (best-effort, in-memory).
  const ip = getClientIp(req);
  if (!rateLimit(`review:${ip}`)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please wait a few minutes.' },
      { status: 429 },
    );
  }

  let data: ReviewSubmission;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot: pretend success, send nothing.
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? '').trim().slice(0, MAX.name);
  const company = (data.company ?? '').trim().slice(0, MAX.company);
  const email = (data.email ?? '').trim().slice(0, MAX.email);
  const text = (data.text ?? '').trim().slice(0, MAX.text);
  const rating = Number(data.rating);

  if (!name || !email || !text) {
    return NextResponse.json({ error: 'Missing name, email, or review text' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be 1-5' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BRIEF_TO_EMAIL ?? 'hello@swash.studio';
  const from = process.env.BRIEF_FROM_EMAIL ?? 'Swash <briefs@swash.studio>';
  const isProd = process.env.NODE_ENV === 'production';

  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const subject = `New review (${rating}/5) - ${name}${company ? ` · ${company}` : ''}`;

  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:32px;background:#F7F1E2;font-family:-apple-system, system-ui, sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" style="max-width:640px;margin:0 auto;background:#FBF6E8;border:1px solid #E1DAC4;border-radius:12px;overflow:hidden;">
    <tr><td style="padding:32px 28px 8px;">
      <p style="margin:0;font:11px/1 'JetBrains Mono', monospace;text-transform:uppercase;letter-spacing:0.22em;color:#C2402F;">
        Review submission - moderation needed
      </p>
      <h1 style="margin:14px 0 4px;font:600 26px/1.15 'Inter Tight', system-ui, sans-serif;letter-spacing:-0.02em;color:#0A0A0A;">
        ${htmlEscape(stars)} &nbsp;${rating}/5
      </h1>
      <p style="margin:0 0 4px;font:15px/1.5 -apple-system;color:#0A0A0A;">
        <strong>${htmlEscape(name)}</strong>${company ? ` · ${htmlEscape(company)}` : ''}
      </p>
      <p style="margin:0;font:13px/1.5 -apple-system;color:#6B6B65;">${htmlEscape(email)}</p>
    </td></tr>
    <tr><td style="padding:16px 28px;">
      <div style="border:1px solid #E1DAC4;border-radius:8px;padding:16px 18px;background:#FFFFFF;">
        <p style="margin:0;font:15px/1.65 -apple-system;color:#0A0A0A;white-space:pre-wrap;">${htmlEscape(text)}</p>
      </div>
    </td></tr>
    <tr><td style="padding:8px 28px 32px;">
      <p style="margin:0;font:11px/1.6 'JetBrains Mono', monospace;color:#6B6B65;text-transform:uppercase;letter-spacing:0.16em;">
        Nothing publishes automatically. To publish: add it to data/reviews.ts and deploy.
      </p>
    </td></tr>
  </table>
</body></html>`;

  const textBody = [
    `New review submission (${rating}/5)`,
    '',
    `Name: ${name}`,
    `Company: ${company || '-'}`,
    `Email: ${email}`,
    `Rating: ${stars} (${rating}/5)`,
    '',
    text,
    '',
    'Nothing publishes automatically. To publish: add it to data/reviews.ts and deploy.',
  ].join('\n');

  if (!apiKey) {
    if (isProd) {
      console.error('[review] RESEND_API_KEY missing in production - review dropped');
      return NextResponse.json(
        { error: 'Review service not configured. Please email us directly.' },
        { status: 503 },
      );
    }
    console.log('[review] RESEND_API_KEY unset - logging instead of sending (dev only)');
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
      text: textBody,
    });

    if (error) {
      console.error('[review] resend error:', error);
      return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[review] unexpected error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
