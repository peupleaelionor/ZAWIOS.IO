/**
 * /api/profile/me — authenticated user's profile + preferences
 * GET  — returns profile with prefs (region, language, world_view_opt_in)
 * PATCH — updates prefs safely
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'

const ALLOWED_REGIONS = ['global','africa','france','europe','usa','rdc','belgique'] as const

const prefsSchema = z.object({
  region:              z.enum(ALLOWED_REGIONS).optional(),
  language:            z.enum(['fr','en']).optional(),
  world_view_opt_in:   z.boolean().optional(),
  safe_mode:           z.boolean().optional(),
}).strict()

// ── GET ───────────────────────────────────────────────────────────────────────

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('user_id, username, full_name, avatar_url, bio, location, region, language, world_view_opt_in, safe_mode, is_premium, plan, created_at')
      .eq('user_id', user.id)
      .single()

    if (error || !profile) {
      captureException(error, { route: 'GET /api/profile/me', userId: user.id })
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Vote counters
    const { count: totalVotes } = await supabase
      .from('signal_votes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    return NextResponse.json({
      profile: {
        ...profile,
        region:            profile.region            ?? 'global',
        language:          profile.language          ?? 'fr',
        world_view_opt_in: profile.world_view_opt_in ?? false,
        safe_mode:         profile.safe_mode         ?? true,
      },
      counters: { totalVotes: totalVotes ?? 0 },
      email: user.email,
    })
  } catch (err) {
    captureException(err, { route: 'GET /api/profile/me' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── PATCH ─────────────────────────────────────────────────────────────────────

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: unknown
    try { body = await request.json() }
    catch { return NextResponse.json({ error: 'Invalid request body' }, { status: 400 }) }

    const parsed = prefsSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Validation failed' },
        { status: 400 },
      )
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .update(parsed.data)
      .eq('user_id', user.id)
      .select('user_id, username, full_name, avatar_url, region, language, world_view_opt_in, safe_mode')
      .single()

    if (error) {
      captureException(error, { route: 'PATCH /api/profile/me', userId: user.id })
      return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 })
    }

    return NextResponse.json({ profile })
  } catch (err) {
    captureException(err, { route: 'PATCH /api/profile/me' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
