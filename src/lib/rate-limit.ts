/**
 * Minimal in-memory, per-key fixed-window rate limiter — zero dependencies.
 *
 * TRADEOFF (by design): state lives in module memory, so it resets on a cold
 * start and is NOT shared across serverless instances. It reliably stops
 * casual abuse and accidental double-submits, but is not a hard DDoS guarantee.
 * The shape (a single `rateLimit()` call returning ok/remaining/retryAfter) is
 * intentionally close to @upstash/ratelimit so it can be swapped later if
 * traffic warrants a durable, shared store.
 */

interface Bucket {
  count: number;
  /** epoch ms when the current window resets */
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Prune expired buckets occasionally so the Map can't grow unbounded under
// a spray of unique keys. Cheap: only runs when we cross the threshold.
const PRUNE_THRESHOLD = 5000;
function maybePrune(now: number): void {
  if (buckets.size < PRUNE_THRESHOLD) return;
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** requests still allowed in the current window */
  remaining: number;
  /** seconds until the window resets (for a Retry-After header) */
  retryAfter: number;
}

/**
 * @param key       identifier to bucket on (e.g. client IP)
 * @param limit     max requests allowed per window
 * @param windowMs  window length in milliseconds
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  maybePrune(now);

  const existing = buckets.get(key);

  // New key, or the previous window has elapsed → start a fresh window.
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (existing.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { ok: true, remaining: limit - existing.count, retryAfter: 0 };
}
