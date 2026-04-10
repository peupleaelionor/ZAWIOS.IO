/**
 * /api/signals/[id]/comments
 *   GET  — list comments for a signal
 *   POST — create a new comment (auth required)
 *   DELETE — delete own comment (?commentId=)
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'

const postSchema = z.object({
  body:      z.string().min(1).max(1000),
  parent_id: z.string().uuid().optional(),
}).strict()

// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: signalId } = await params
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const limit  = Math.min(Number(searchParams.get('limit')  ?? 30), 100)
    const offset = Math.max(Number(searchParams.get('offset') ?? 0),  0)

    // Try RPC first
    const { data: rpcData, error: rpcError } = await supabase
      .rpc('get_signal_comments', { p_signal_id: signalId, p_limit: limit, p_offset: offset })

    if (!rpcError && Array.isArray(rpcData)) {
      return NextResponse.json({ comments: rpcData, source: 'db' })
    }

    // Fallback: direct query
    const { data, error } = await supabase
      .from('signal_comments')
      .select(`
        id, parent_id, body, edited, created_at, user_id,
        profiles!signal_comments_user_id_fkey (username, full_name, avatar_url, is_premium)
      `)
      .eq('signal_id', signalId)
      .is('parent_id', null)
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error) {
      captureException(error, { route: 'GET /api/signals/[id]/comments', signalId })
      return NextResponse.json({ comments: [], source: 'fallback' })
    }

    return NextResponse.json({ comments: data ?? [], source: 'db' })
  } catch (err) {
    captureException(err, { route: 'GET /api/signals/[id]/comments' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── POST ──────────────────────────────────────────────────────────────────────
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: signalId } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: unknown
    try { body = await request.json() }
    catch { return NextResponse.json({ error: 'Invalid request body' }, { status: 400 }) }

    const parsed = postSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Validation failed' },
        { status: 400 },
      )
    }

    const { data: comment, error } = await supabase
      .from('signal_comments')
      .insert({
        signal_id: signalId,
        user_id:   user.id,
        body:      parsed.data.body,
        parent_id: parsed.data.parent_id ?? null,
      })
      .select(`
        id, parent_id, body, edited, created_at, user_id,
        profiles!signal_comments_user_id_fkey (username, full_name, avatar_url, is_premium)
      `)
      .single()

    if (error) {
      captureException(error, { route: 'POST /api/signals/[id]/comments', signalId, userId: user.id })
      return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 })
    }

    return NextResponse.json({ comment }, { status: 201 })
  } catch (err) {
    captureException(err, { route: 'POST /api/signals/[id]/comments' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── DELETE ────────────────────────────────────────────────────────────────────
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: signalId } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const commentId = searchParams.get('commentId')
    if (!commentId) {
      return NextResponse.json({ error: 'commentId required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('signal_comments')
      .delete()
      .eq('id', commentId)
      .eq('signal_id', signalId)
      .eq('user_id', user.id)  // RLS + app-level: only own comments

    if (error) {
      captureException(error, { route: 'DELETE /api/signals/[id]/comments', signalId, userId: user.id })
      return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 })
    }

    return NextResponse.json({ deleted: true })
  } catch (err) {
    captureException(err, { route: 'DELETE /api/signals/[id]/comments' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
