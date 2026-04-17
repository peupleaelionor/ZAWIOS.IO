/**
 * /api/signal-contexts — CRUD for structured signal analyses.
 *
 * POST: Create a new context (one per user per signal, max 180 chars).
 * GET:  Fetch contexts for a signal (sorted by likes desc, limited).
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
      { error: 'Sign in to add an analysis' },
      { status: 401 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 },
    )
  }

  const payload = body as Record<string, unknown>
  const signalId =
    typeof payload.signal_id === 'string' ? payload.signal_id : ''
  const voteType =
    typeof payload.vote_type === 'string' ? payload.vote_type : ''
  const contextText =
    typeof payload.context_text === 'string'
      ? payload.context_text.trim()
      : ''

  if (!signalId) {
    return NextResponse.json(
      { error: 'signal_id is required' },
      { status: 400 },
    )
  }

  if (!['yes', 'no', 'neutral'].includes(voteType)) {
    return NextResponse.json(
      { error: 'vote_type must be yes, no, or neutral' },
      { status: 400 },
    )
  }

  if (contextText.length < 3 || contextText.length > 180) {
    return NextResponse.json(
      { error: 'Context must be 3-180 characters' },
      { status: 400 },
    )
  }

  const { data: context, error: insertError } = await supabase
    .from('signal_contexts')
    .insert({
      signal_id: signalId,
      user_id: user.id,
      vote_type: voteType,
      context_text: contextText,
    })
    .select(
      '*, author:profiles!signal_contexts_user_id_fkey(username, full_name)',
    )
    .single()

  if (insertError) {
    // Unique constraint = already submitted
    if (insertError.code === '23505') {
      return NextResponse.json(
        { error: 'You have already submitted an analysis for this signal' },
        { status: 409 },
      )
    }
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/signal-contexts] insert error', insertError)
    }
    return NextResponse.json(
      { error: 'Failed to post analysis' },
      { status: 500 },
    )
  }

  return NextResponse.json({ context }, { status: 201 })
}

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const signalId = searchParams.get('signal_id')
  const limit = Math.min(Number(searchParams.get('limit') ?? 3), 20)

  if (!signalId) {
    return NextResponse.json(
      { error: 'signal_id is required' },
      { status: 400 },
    )
  }

  const { data: contexts, error } = await supabase
    .from('signal_contexts')
    .select(
      '*, author:profiles!signal_contexts_user_id_fkey(username, full_name)',
    )
    .eq('signal_id', signalId)
    .order('likes_count', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    return NextResponse.json(
      { error: 'Failed to load analyses' },
      { status: 500 },
    )
  }

  // Also return total context count for nuance index
  const { count } = await supabase
    .from('signal_contexts')
    .select('*', { count: 'exact', head: true })
    .eq('signal_id', signalId)

  return NextResponse.json({
    contexts: contexts ?? [],
    contextCount: count ?? 0,
  })
}
