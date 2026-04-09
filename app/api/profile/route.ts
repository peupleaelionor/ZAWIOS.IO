/**
 * /api/profile — get or update the authenticated user's profile (Supabase-backed).
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*, reputation_scores(*)')
    .eq('user_id', user.id)
    .single()

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/profile] fetch error', error)
    }
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }

  return NextResponse.json({ profile, email: user.email })
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>

  // Build update object — only allow safe fields
  const updates: Record<string, unknown> = {}
  if (typeof payload.full_name === 'string') updates.full_name = payload.full_name.trim()
  if (typeof payload.username === 'string') updates.username = payload.username.trim()
  if (typeof payload.bio === 'string') updates.bio = payload.bio.trim()
  if (typeof payload.location === 'string') updates.location = payload.location.trim()
  if (typeof payload.website === 'string') updates.website = payload.website.trim()
  if (typeof payload.avatar_url === 'string') updates.avatar_url = payload.avatar_url.trim()

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/profile] update error', error)
    }
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }

  // If email or password update was requested, handle via auth
  if (typeof payload.email === 'string' && payload.email !== user.email) {
    const { error: emailError } = await supabase.auth.updateUser({ email: payload.email })
    if (emailError) {
      return NextResponse.json({ profile, warning: 'Profile updated but email change failed' })
    }
  }

  if (typeof payload.new_password === 'string') {
    if (payload.new_password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }
    const { error: pwError } = await supabase.auth.updateUser({ password: payload.new_password })
    if (pwError) {
      return NextResponse.json({ profile, warning: 'Profile updated but password change failed' })
    }
  }

  return NextResponse.json({ profile })
}
