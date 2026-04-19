import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { applySecurityHeaders, buildCsp } from '@/lib/security/headers'
import { getClientIp, isMaliciousBot } from '@/lib/security/request-validator'
import { checkRateLimit } from '@/lib/security/rate-limiter'

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
    const tier = pathname.startsWith('/api/auth') ? 'auth' as const
      : pathname.startsWith('/api/vote') ? 'vote' as const
      : pathname.startsWith('/api/contact') ? 'contact' as const
      : 'api' as const
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
