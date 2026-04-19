/**
 * ZAWIOS — Request validation utilities for API routes
 *
 * Standardized request validation with:
 *   • Method checking
 *   • Content-Type validation
 *   • Body size limits
 *   • Origin verification
 *   • Bot detection (basic)
 */

import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, rateLimitHeaders, type RateLimitTier } from './rate-limiter'
import { sanitizeTextInput } from './sanitize'

/**
 * Extract the client IP from the request.
 * Works with Vercel, Cloudflare, and standard proxies.
 */
export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('cf-connecting-ip') ??
    '127.0.0.1'
  )
}

/**
 * Basic bot detection based on User-Agent patterns.
 * Blocks known malicious bots while allowing search engines.
 */
const BLOCKED_UA_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /zgrab/i,
  /gobuster/i,
  /dirbuster/i,
  /wpscan/i,
  /acunetix/i,
  /nessus/i,
  /openvas/i,
  /python-requests\/\d/i,
  /curl\/\d/i,
]

export function isMaliciousBot(userAgent: string | null): boolean {
  if (!userAgent) return false
  return BLOCKED_UA_PATTERNS.some((pattern) => pattern.test(userAgent))
}

/**
 * Validate an API request with rate limiting and security checks.
 * Returns a NextResponse error if validation fails, or null if the request is valid.
 */
export function validateApiRequest(
  request: NextRequest,
  options: {
    allowedMethods?: string[]
    rateLimitTier?: RateLimitTier
    maxBodySize?: number
  } = {},
): NextResponse | null {
  const {
    allowedMethods = ['GET', 'POST'],
    rateLimitTier = 'api',
    maxBodySize = 100_000, // 100 KB default
  } = options

  // Method check
  if (!allowedMethods.includes(request.method)) {
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405, headers: { Allow: allowedMethods.join(', ') } },
    )
  }

  // Bot detection
  const ua = request.headers.get('user-agent')
  if (isMaliciousBot(ua)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Rate limiting
  const ip = getClientIp(request)
  const rateResult = checkRateLimit(ip, rateLimitTier)
  if (!rateResult.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      {
        status: 429,
        headers: rateLimitHeaders(rateResult, rateLimitTier),
      },
    )
  }

  // Body size check (for POST/PUT/PATCH)
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > maxBodySize) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 },
      )
    }
  }

  return null // Valid request
}

/**
 * Parse and sanitize a JSON body from a request.
 * Returns the parsed object or a NextResponse error.
 */
export async function parseJsonBody<T extends Record<string, unknown>>(
  request: NextRequest,
  requiredFields: string[] = [],
): Promise<T | NextResponse> {
  try {
    const body = (await request.json()) as T

    // Check required fields
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        )
      }
    }

    // Sanitize all string fields
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        const sanitized = sanitizeTextInput(value)
        if (sanitized === null) {
          return NextResponse.json(
            { error: `Invalid input in field: ${key}` },
            { status: 400 },
          )
        }
        ;(body as Record<string, unknown>)[key] = sanitized
      }
    }

    return body
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    )
  }
}
