import { NextResponse } from 'next/server';

/**
 * GET /api/debug-env
 *
 * Read-only diagnostic - reports which env vars are present without
 * exposing their values. Safe to ship temporarily. Delete this file
 * once you've confirmed the email pipeline works end-to-end.
 */
export async function GET() {
  const key = process.env.RESEND_API_KEY ?? '';
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV ?? null,
    hasResendApiKey: key.length > 0,
    resendKeyLooksRight: key.startsWith('re_'),
    resendKeyLength: key.length,
    hasBriefToEmail: !!process.env.BRIEF_TO_EMAIL,
    briefToEmail: process.env.BRIEF_TO_EMAIL ?? '(unset - will fall back to default)',
    hasBriefFromEmail: !!process.env.BRIEF_FROM_EMAIL,
    briefFromEmail: process.env.BRIEF_FROM_EMAIL ?? '(unset - will fall back to default)',
  });
}
