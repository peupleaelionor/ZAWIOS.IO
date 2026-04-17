/**
 * /api/signal-contexts/like — Toggle like on a signal context.
 *
 * POST: Like or unlike a context (idempotent toggle).
 * Only likes — no replies, no threads.
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
      { error: 'Sign in to like an analysis' },
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
  const contextId =
    typeof payload.context_id === 'string' ? payload.context_id : ''

  if (!contextId) {
    return NextResponse.json(
      { error: 'context_id is required' },
      { status: 400 },
    )
  }

  // Check if already liked
  const { data: existing } = await supabase
    .from('signal_context_likes')
    .select('id')
    .eq('user_id', user.id)
    .eq('context_id', contextId)
    .maybeSingle()

  if (existing) {
    // Unlike
    await supabase
      .from('signal_context_likes')
      .delete()
      .eq('id', existing.id)

    // Decrement count
    try {
      await supabase.rpc('decrement_context_likes', { ctx_id: contextId })
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[api/signal-contexts/like] decrement error', e)
      }
    }

    return NextResponse.json({ liked: false })
  }

  // Like
  const { error: insertError } = await supabase
    .from('signal_context_likes')
    .insert({ user_id: user.id, context_id: contextId })

  if (insertError) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/signal-contexts/like] insert error', insertError)
    }
    return NextResponse.json(
      { error: 'Failed to like analysis' },
      { status: 500 },
    )
  }

  // Increment count
  try {
    await supabase.rpc('increment_context_likes', { ctx_id: contextId })
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/signal-contexts/like] increment error', e)
    }
  }

  return NextResponse.json({ liked: true })
}
