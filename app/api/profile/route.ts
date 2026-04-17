/**
 * /api/profile
 *   GET  — fetch the authenticated user's profile (or a public profile by ?username=)
 *   PATCH — update the authenticated user's profile
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'

const patchSchema = z.object({
  full_name:    z.string().min(1).max(100).optional(),
  username:     z.string().min(2).max(50).regex(/^[a-z0-9_-]+$/i).optional(),
  bio:          z.string().max(500).optional(),
  location:     z.string().max(100).optional(),
  website:      z.string().url().max(200).optional(),
  avatar_url:   z.string().url().max(500).optional(),
  email:        z.string().email().optional(),
  new_password: z.string().min(8).max(128).optional(),
}).strict()

// ── GET ───────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const usernameParam = searchParams.get('username')

    // Public profile lookup by username
    if (usernameParam) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('user_id, username, full_name, avatar_url, bio, location, website, plan, is_premium, created_at')
        .eq('username', usernameParam)
        .single()

      if (error || !profile) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
      }

      return NextResponse.json({ profile })
    }

    // Authenticated user's own profile
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*, reputation_scores(*)')
      .eq('user_id', user.id)
      .single()

    if (error) {
      captureException(error, { route: 'GET /api/profile', userId: user.id })
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json({ profile, email: user.email })
  } catch (err) {
    captureException(err, { route: 'GET /api/profile' })
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
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const parsed = patchSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Validation failed' },
        { status: 400 },
      )
    }

    const { email, new_password, ...profileFields } = parsed.data

    // Only update non-empty profile fields
    const updates: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(profileFields)) {
      if (v !== undefined) updates[k] = v
    }

    let profile = null
    if (Object.keys(updates).length > 0) {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) {
        captureException(error, { route: 'PATCH /api/profile', userId: user.id })
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
      }
      profile = data
    }

    // Auth-level changes
    if (email && email !== user.email) {
      const { error: emailError } = await supabase.auth.updateUser({ email })
      if (emailError) {
        return NextResponse.json({ profile, warning: 'Profile updated but email change failed' })
      }
    }

    if (new_password) {
      const { error: pwError } = await supabase.auth.updateUser({ password: new_password })
      if (pwError) {
        return NextResponse.json({ profile, warning: 'Profile updated but password change failed' })
      }
    }

    return NextResponse.json({ profile })
  } catch (err) {
    captureException(err, { route: 'PATCH /api/profile' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
