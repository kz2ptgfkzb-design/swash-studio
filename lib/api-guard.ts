/**
 * Lightweight abuse guards for the public form endpoints (/api/brief, /api/review).
 *
 * These are best-effort protections that need no external infrastructure:
 *   - getClientIp        read the caller IP from Vercel/proxy headers
 *   - rateLimit          in-memory sliding window, per IP per route
 *   - sanitizeFilename    strip path separators / control chars, cap length
 *   - extensionAllowed    allowlist upload extensions
 *
 * The in-memory limiter only sees requests that hit the same warm serverless
 * instance, so it will not stop a distributed flood. It does blunt the common
 * case (one script hammering the form) at zero cost. If real abuse appears,
 * upgrade to @upstash/ratelimit backed by Redis - the call sites won't change.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('cf-connecting-ip') ??
    'unknown'
  );
}

/**
 * Returns true if the caller is within the limit, false if they've exceeded it.
 * Default: 5 requests per 10 minutes per (route, ip).
 */
export function rateLimit(
  key: string,
  opts: { limit?: number; windowMs?: number } = {},
): boolean {
  const limit = opts.limit ?? 5;
  const windowMs = opts.windowMs ?? 10 * 60 * 1000;
  const now = Date.now();

  const existing = buckets.get(key);
  if (!existing || now > existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    // Opportunistic cleanup so the map can't grow without bound.
    if (buckets.size > 5000) {
      for (const [k, b] of buckets) if (now > b.resetAt) buckets.delete(k);
    }
    return true;
  }

  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}

const ALLOWED_EXTENSIONS = new Set([
  'png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'pdf',
]);

export function extensionAllowed(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return ALLOWED_EXTENSIONS.has(ext);
}

export function sanitizeFilename(name: string): string {
  return name
    .replace(/[/\\]/g, '_') // path separators
    .replace(/[\x00-\x1f]/g, '') // control chars
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120) || 'file';
}

/** Rough byte size of a base64 string (each 4 chars ~= 3 bytes). */
export function base64Bytes(b64: string): number {
  return Math.floor((b64.length * 3) / 4);
}

const BASE64_RE = /^[A-Za-z0-9+/]*={0,2}$/;
export function isBase64(s: string): boolean {
  return s.length > 0 && s.length % 4 === 0 && BASE64_RE.test(s);
}

/** Render a URL only if it uses http(s); otherwise return null so callers can
 *  fall back to plain escaped text (blocks javascript:/data: links in emails). */
export function safeHttpUrl(url?: string): string | null {
  if (!url || !url.trim()) return null;
  try {
    const u = new URL(url.trim());
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null;
  } catch {
    return null;
  }
}
