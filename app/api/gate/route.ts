/**
 * /api/gate — Soft gating for anonymous users.
 * GET: returns { allowed: boolean, votesUsed: number, limit: number }
 * Called client-side to decide whether to show "create account" CTA.
 *
 * Anonymous quota is tracked in a session cookie (no DB write needed).
 * Authenticated users always get { allowed: true }.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'

const ANON_VOTE_LIMIT = 3

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Authenticated users: always allowed
    if (user) {
      return NextResponse.json({ allowed: true, authenticated: true })
    }

    // Anonymous: read vote count from cookie
    const cookieHeader = request.headers.get('cookie') ?? ''
    const match = cookieHeader.match(/anon_votes=(\d+)/)
    const votesUsed = match ? parseInt(match[1], 10) : 0
    const allowed   = votesUsed < ANON_VOTE_LIMIT

    return NextResponse.json({
      allowed,
      authenticated: false,
      votesUsed,
      limit: ANON_VOTE_LIMIT,
      remaining: Math.max(0, ANON_VOTE_LIMIT - votesUsed),
    })
  } catch (err) {
    captureException(err, { route: 'GET /api/gate' })
    // Fail open — don't block users due to infra issues
    return NextResponse.json({ allowed: true, authenticated: false })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Authenticated users don't need gating
    if (user) {
      return NextResponse.json({ allowed: true, authenticated: true })
    }

    const cookieHeader = request.headers.get('cookie') ?? ''
    const match = cookieHeader.match(/anon_votes=(\d+)/)
    const current  = match ? parseInt(match[1], 10) : 0
    const updated  = current + 1
    const allowed  = updated <= ANON_VOTE_LIMIT

    const res = NextResponse.json({
      allowed,
      authenticated: false,
      votesUsed:  updated,
      limit:      ANON_VOTE_LIMIT,
      remaining:  Math.max(0, ANON_VOTE_LIMIT - updated),
    })

    // Increment anon vote counter cookie (session-scoped, no expiry)
    res.cookies.set('anon_votes', String(updated), {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })

    return res
  } catch (err) {
    captureException(err, { route: 'POST /api/gate' })
    return NextResponse.json({ allowed: true, authenticated: false })
  }
}
