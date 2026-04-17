/**
 * /api/suggestions — CRUD for subject proposals.
 *
 * POST: Create a new suggestion (anti-spam enforced).
 * GET:  List suggestions, optionally filtered by status.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Sign in to suggest a topic' },
      { status: 401 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>
  const title = typeof payload.title === 'string' ? payload.title.trim() : ''
  const description =
    typeof payload.description === 'string' ? payload.description.trim() : ''
  const category = typeof payload.category === 'string' ? payload.category : ''
  const timeHorizon =
    typeof payload.time_horizon === 'string' ? payload.time_horizon : ''

  if (title.length < 10 || title.length > 120) {
    return NextResponse.json(
      { error: 'Title must be 10-120 characters' },
      { status: 400 },
    )
  }

  if (description.length > 300) {
    return NextResponse.json(
      { error: 'Description must be max 300 characters' },
      { status: 400 },
    )
  }

  if (!['short', 'medium', 'long'].includes(timeHorizon)) {
    return NextResponse.json(
      { error: 'time_horizon must be short, medium, or long' },
      { status: 400 },
    )
  }

  // Anti-spam: max 2 per week
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const { count: recentCount } = await supabase
    .from('suggested_signals')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .gte('created_at', weekAgo)

  if ((recentCount ?? 0) >= 2) {
    return NextResponse.json(
      { error: 'Maximum 2 suggestions per week' },
      { status: 429 },
    )
  }

  // Anti-spam: cooldown after 3 consecutive rejections
  const { data: recentSuggestions } = await supabase
    .from('suggested_signals')
    .select('status, updated_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3)

  if (recentSuggestions && recentSuggestions.length >= 3) {
    const allRejected = recentSuggestions.every(
      (s: { status: string; updated_at: string }) => s.status === 'rejected',
    )
    if (allRejected) {
      const lastRejection = new Date(recentSuggestions[0].updated_at)
      const cooldownEnd = new Date(
        lastRejection.getTime() + 14 * 24 * 60 * 60 * 1000,
      )
      if (new Date() < cooldownEnd) {
        return NextResponse.json(
          { error: 'Temporary cooldown after consecutive rejections' },
          { status: 429 },
        )
      }
    }
  }

  const { data: suggestion, error: insertError } = await supabase
    .from('suggested_signals')
    .insert({
      user_id: user.id,
      title,
      description,
      category,
      time_horizon: timeHorizon,
    })
    .select('*')
    .single()

  if (insertError) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/suggestions] insert error', insertError)
    }
    return NextResponse.json(
      { error: 'Failed to submit suggestion' },
      { status: 500 },
    )
  }

  return NextResponse.json({ suggestion }, { status: 201 })
}

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const limit = Math.min(Number(searchParams.get('limit') ?? 30), 100)

  let query = supabase
    .from('suggested_signals')
    .select(
      '*, author:profiles!suggested_signals_user_id_fkey(username, full_name)',
    )
    .order('validation_score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (status) {
    query = query.eq('status', status)
  }

  const { data: suggestions, error } = await query

  if (error) {
    return NextResponse.json(
      { error: 'Failed to load suggestions' },
      { status: 500 },
    )
  }

  return NextResponse.json({ suggestions: suggestions ?? [] })
}
