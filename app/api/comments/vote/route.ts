/**
 * /api/comments/vote — upvote a comment (Supabase-backed).
 * Each user can upvote a comment once.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Sign in to upvote' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>
  const commentId = payload.comment_id

  if (typeof commentId !== 'string' || !commentId) {
    return NextResponse.json({ error: 'comment_id is required' }, { status: 400 })
  }

  // Check for duplicate upvote
  const { data: existing } = await supabase
    .from('comment_votes')
    .select('id')
    .eq('user_id', user.id)
    .eq('comment_id', commentId)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'Already upvoted' }, { status: 409 })
  }

  // Insert upvote
  const { error: voteError } = await supabase
    .from('comment_votes')
    .insert({ user_id: user.id, comment_id: commentId })

  if (voteError) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/comments/vote] insert error', voteError)
    }
    return NextResponse.json({ error: 'Failed to upvote' }, { status: 500 })
  }

  // Use RPC to atomically increment the upvote count
  try {
    await supabase.rpc('increment_comment_upvotes', { cmt_id: commentId })
  } catch {
    /* non-critical — UI optimistically updated */
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
