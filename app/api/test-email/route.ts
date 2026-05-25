import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * GET /api/test-email
 *
 * One-shot Resend smoke test — visit this URL in the browser to verify
 * your RESEND_API_KEY + BRIEF_TO_EMAIL combo is working. You should see
 * "Hello World" land in your inbox within a few seconds.
 *
 * Delete this file once you've confirmed delivery — the real brief form
 * already uses Resend via /api/brief.
 */
export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BRIEF_TO_EMAIL ?? 'jordanmarcusproductions@gmail.com';

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'RESEND_API_KEY is not set. Add it to .env.local and restart `npm run dev`.',
      },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
  });

  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 502 });
  }

  return NextResponse.json({ ok: true, sentTo: to, id: data?.id });
}
