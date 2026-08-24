/**
 * A small in-memory rate limiter for public route handlers.
 *
 * ── What this is honestly worth ─────────────────────────────────────────────
 *
 * The counter lives in the memory of one serverless instance. Vercel runs
 * several, and recycles them, so a determined attacker spread across instances
 * gets a multiple of the stated limit, and a cold start resets the window.
 *
 * That is fine for what this defends against, which is not a determined
 * attacker: it is a stuck retry loop, a scraper hammering an endpoint it found,
 * and a bored person with curl. Those all come from one address and all get
 * stopped. Anything more serious needs a WAF rule or a shared store, and this
 * file should not be mistaken for either.
 *
 * It is written as a shared helper rather than inline because /api/leads has
 * been carrying "no rate limiting" as a known gap since it went live, and this
 * is the thing it would adopt.
 */

type Window = { count: number; resetAt: number };

/**
 * One bucket map per limiter, so two endpoints cannot exhaust each other's
 * budget. Keyed by caller identity (an IP, normally).
 */
export function createRateLimiter({
  limit,
  windowMs,
  /**
   * Hard ceiling on tracked keys. Without it the map is an unbounded cache
   * keyed by attacker-controlled input — a memory leak with a friendly name.
   * When it fills, the whole map is dropped: crude, but it bounds memory and
   * the worst case is one forgiving window.
   */
  maxKeys = 10_000,
}: {
  limit: number;
  windowMs: number;
  maxKeys?: number;
}) {
  const buckets = new Map<string, Window>();

  return function check(key: string): { allowed: boolean; retryAfterSeconds: number } {
    const now = Date.now();

    if (buckets.size > maxKeys) buckets.clear();

    const existing = buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }

    existing.count += 1;

    if (existing.count > limit) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      };
    }

    return { allowed: true, retryAfterSeconds: 0 };
  };
}

/**
 * Best-effort caller identity from proxy headers.
 *
 * `x-forwarded-for` is a comma-separated chain; the first entry is the client
 * as seen by the outermost proxy. It is spoofable in general — behind Vercel it
 * is rewritten, so it is trustworthy here and would not be behind a naked
 * Node server. Returns a fixed key when nothing is present, which means an
 * un-proxied environment rate-limits everyone together rather than nobody.
 */
export function callerKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
