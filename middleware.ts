import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { applySecurityHeaders, buildCsp } from '@/lib/security/headers'
import { getClientIp, isMaliciousBot } from '@/lib/security/request-validator'
import { checkRateLimit, type RateLimitTier } from '@/lib/security/rate-limiter'

/** Determine rate-limit tier based on request path */
function getTierForPath(pathname: string): RateLimitTier {
  if (pathname.startsWith('/api/auth')) return 'auth'
  if (pathname.startsWith('/api/vote') || (pathname.startsWith('/api/signals/') && pathname.endsWith('/vote'))) return 'vote'
  if (pathname.startsWith('/api/contact')) return 'contact'
  if (pathname.startsWith('/api/admin')) return 'admin'
  return 'api'
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Bot protection ──────────────────────────────────────────────────────
  const ua = request.headers.get('user-agent')
  if (isMaliciousBot(ua)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // ── Rate limit API routes at middleware level ───────────────────────────
  if (pathname.startsWith('/api/')) {
    const ip = getClientIp(request)
    const tier = getTierForPath(pathname)
    const result = checkRateLimit(ip, tier)
    if (!result.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(result.retryAfter) } },
      )
    }
  }

  // ── Supabase session refresh + auth guard ───────────────────────────────
  const response = await updateSession(request)

  // ── Apply security headers to all responses ─────────────────────────────
  applySecurityHeaders(response)
  response.headers.set('Content-Security-Policy', buildCsp())

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
