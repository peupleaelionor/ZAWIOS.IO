/**
 * ZAWIOS — In-memory sliding-window rate limiter
 *
 * Production-grade rate limiting without external dependencies.
 * Uses a sliding window algorithm for accurate request counting.
 *
 * Tiers:
 *   • API routes:   60 req / 60 s
 *   • Auth routes:  5  req / 60 s  (brute-force protection)
 *   • Vote routes:  30 req / 60 s
 *   • Contact:      3  req / 60 s
 *
 * In a multi-instance deployment, replace with Redis (Upstash) or
 * Vercel KV-backed store. The interface stays the same.
 */

interface SlidingWindow {
  timestamps: number[]
  blockedUntil: number
}

const store = new Map<string, SlidingWindow>()

// Garbage collect every 5 minutes
const GC_INTERVAL = 5 * 60 * 1000

let lastGc = Date.now()

function gc() {
  const now = Date.now()
  if (now - lastGc < GC_INTERVAL) return
  lastGc = now
  const cutoff = now - 120_000 // 2 min window max
  for (const [key, window] of store) {
    if (window.timestamps.length === 0 || window.timestamps[window.timestamps.length - 1] < cutoff) {
      store.delete(key)
    }
  }
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfter: number // seconds
}

export type RateLimitTier = 'api' | 'auth' | 'vote' | 'contact' | 'admin'

const TIER_CONFIG: Record<RateLimitTier, { maxRequests: number; windowMs: number; blockDurationMs: number }> = {
  api:     { maxRequests: 60, windowMs: 60_000, blockDurationMs: 60_000 },
  auth:    { maxRequests: 5,  windowMs: 60_000, blockDurationMs: 300_000 },
  vote:    { maxRequests: 30, windowMs: 60_000, blockDurationMs: 60_000 },
  contact: { maxRequests: 3,  windowMs: 60_000, blockDurationMs: 120_000 },
  admin:   { maxRequests: 30, windowMs: 60_000, blockDurationMs: 60_000 },
}

/**
 * Check if a request is allowed under the rate limit.
 * @param identifier - Unique client ID (IP address or user ID)
 * @param tier       - Rate limit tier
 */
export function checkRateLimit(identifier: string, tier: RateLimitTier): RateLimitResult {
  gc()

  const config = TIER_CONFIG[tier]
  const key = `${tier}:${identifier}`
  const now = Date.now()

  let window = store.get(key)
  if (!window) {
    window = { timestamps: [], blockedUntil: 0 }
    store.set(key, window)
  }

  // Check if currently blocked
  if (window.blockedUntil > now) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((window.blockedUntil - now) / 1000),
    }
  }

  // Slide the window: remove timestamps older than windowMs
  const cutoff = now - config.windowMs
  window.timestamps = window.timestamps.filter((t) => t > cutoff)

  if (window.timestamps.length >= config.maxRequests) {
    window.blockedUntil = now + config.blockDurationMs
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil(config.blockDurationMs / 1000),
    }
  }

  window.timestamps.push(now)

  return {
    allowed: true,
    remaining: config.maxRequests - window.timestamps.length,
    retryAfter: 0,
  }
}

/**
 * Rate-limit headers to attach to HTTP responses (RFC 7231 + draft-ietf-httpapi-ratelimit-headers).
 */
export function rateLimitHeaders(result: RateLimitResult, tier: RateLimitTier): Record<string, string> {
  const config = TIER_CONFIG[tier]
  return {
    'X-RateLimit-Limit': String(config.maxRequests),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(config.windowMs / 1000)),
    ...(result.retryAfter > 0 ? { 'Retry-After': String(result.retryAfter) } : {}),
  }
}
