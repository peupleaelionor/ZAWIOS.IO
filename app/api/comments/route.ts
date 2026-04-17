/**
 * /api/comments — CRUD for prediction comments (Supabase-backed).
 * Users can comment on predictions and view all comments.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Sign in to comment' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>
  const predictionId = payload.prediction_id
  const content = typeof payload.content === 'string' ? payload.content.trim() : ''

  if (typeof predictionId !== 'string' || !predictionId) {
    return NextResponse.json({ error: 'prediction_id is required' }, { status: 400 })
  }

  if (content.length < 3 || content.length > 2000) {
    return NextResponse.json({ error: 'Comment must be 3-2000 characters' }, { status: 400 })
  }

  // Insert comment
  const { data: comment, error: insertError } = await supabase
    .from('comments')
    .insert({
      prediction_id: predictionId,
      user_id: user.id,
      content,
    })
    .select('*, author:profiles!comments_user_id_fkey(id, username, full_name, avatar_url)')
    .single()

  if (insertError) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/comments] insert error', insertError)
    }
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 })
  }

  // Increment comment_count on prediction (best-effort)
  try {
    await supabase.rpc('increment_comment_count', { pred_id: predictionId })
  } catch {
    /* non-critical */
  }

  return NextResponse.json({ comment }, { status: 201 })
}

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const predictionId = searchParams.get('prediction_id')
  const sortBy = searchParams.get('sort') ?? 'popular'
  const limit = Math.min(Number(searchParams.get('limit') ?? 50), 100)
  const offset = Number(searchParams.get('offset') ?? 0)

  if (!predictionId) {
    return NextResponse.json({ error: 'prediction_id is required' }, { status: 400 })
  }

  let query = supabase
    .from('comments')
    .select('*, author:profiles!comments_user_id_fkey(id, username, full_name, avatar_url)')
    .eq('prediction_id', predictionId)
    .eq('is_hidden', false)
    .range(offset, offset + limit - 1)

  if (sortBy === 'popular') {
    query = query.order('upvotes', { ascending: false }).order('created_at', { ascending: false })
  } else {
    query = query.order('created_at', { ascending: false })
  }

  const { data: comments, error } = await query

  if (error) {
    return NextResponse.json({ error: 'Failed to load comments' }, { status: 500 })
  }

  return NextResponse.json({ comments: comments ?? [] })
}
