/**
 * /auth/callback — handles Supabase email confirmation, magic links,
 * and password reset redirects. This server route exchanges the auth
 * code for a session and redirects accordingly.
 */
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=missing_code`)
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`)
  }

  // If the user was resetting their password, send them to the reset form
  if (next === '/auth/reset-password') {
    return NextResponse.redirect(`${origin}/auth/reset-password`)
  }

  // Send welcome email for new users (fire-and-forget)
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      // Build internal API URL from env var (trusted) with fallback to request origin
      const internalBase = process.env.NEXT_PUBLIC_APP_URL || origin
      const welcomeUrl = new URL('/api/auth/welcome', internalBase)
      fetch(welcomeUrl.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      }).catch(() => { /* non-blocking */ })
    }
  } catch {
    /* non-blocking */
  }

  return NextResponse.redirect(`${origin}${next}`)
}
