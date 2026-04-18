/**
 * /api/signals/[id]/reactions
 *   GET    — get reaction counts for a signal
 *   POST   — upsert a reaction (auth required)
 *   DELETE — remove own reaction (auth required)
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'

const REACTION_TYPES = ['fire', 'wow', 'think', 'skeptic', 'clap'] as const
type ReactionType = typeof REACTION_TYPES[number]

const postSchema = z.object({
  reaction_type: z.enum(REACTION_TYPES),
}).strict()

// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: signalId } = await params
    const supabase = await createClient()

    const { data, error } = await supabase
      .rpc('get_reaction_counts', { p_signal_id: signalId })

    if (error || !data) {
      // Fallback: direct aggregation
      const { data: rows } = await supabase
        .from('signal_reactions')
        .select('reaction_type')
        .eq('signal_id', signalId)

      const counts = REACTION_TYPES.reduce<Record<ReactionType, number>>(
        (acc, t) => ({ ...acc, [t]: 0 }),
        {} as Record<ReactionType, number>,
      )
      rows?.forEach((r: { reaction_type: string }) => {
        if (r.reaction_type in counts) counts[r.reaction_type as ReactionType]++
      })

      return NextResponse.json({ reactions: counts, source: 'fallback' })
    }

    const counts = REACTION_TYPES.reduce<Record<ReactionType, number>>(
      (acc, t) => ({ ...acc, [t]: 0 }),
      {} as Record<ReactionType, number>,
    )
    data.forEach((r: { reaction_type: string; count: number }) => {
      if (r.reaction_type in counts) counts[r.reaction_type as ReactionType] = r.count
    })

    // Include user's own reaction if authenticated
    const { data: { user } } = await supabase.auth.getUser()
    let userReaction: ReactionType | null = null
    if (user) {
      const { data: myReaction } = await supabase
        .from('signal_reactions')
        .select('reaction_type')
        .eq('signal_id', signalId)
        .eq('user_id', user.id)
        .single()
      userReaction = (myReaction?.reaction_type as ReactionType) ?? null
    }

    return NextResponse.json({ reactions: counts, userReaction, source: 'db' })
  } catch (err) {
    captureException(err, { route: 'GET /api/signals/[id]/reactions' })
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

    // Upsert — one reaction per user per signal
    const { error } = await supabase
      .from('signal_reactions')
      .upsert(
        { signal_id: signalId, user_id: user.id, reaction_type: parsed.data.reaction_type },
        { onConflict: 'signal_id,user_id' },
      )

    if (error) {
      captureException(error, { route: 'POST /api/signals/[id]/reactions', signalId, userId: user.id })
      return NextResponse.json({ error: 'Failed to save reaction' }, { status: 500 })
    }

    return NextResponse.json({ reaction: parsed.data.reaction_type })
  } catch (err) {
    captureException(err, { route: 'POST /api/signals/[id]/reactions' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── DELETE ────────────────────────────────────────────────────────────────────
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: signalId } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('signal_reactions')
      .delete()
      .eq('signal_id', signalId)
      .eq('user_id', user.id)

    if (error) {
      captureException(error, { route: 'DELETE /api/signals/[id]/reactions', signalId, userId: user.id })
      return NextResponse.json({ error: 'Failed to remove reaction' }, { status: 500 })
    }

    return NextResponse.json({ removed: true })
  } catch (err) {
    captureException(err, { route: 'DELETE /api/signals/[id]/reactions' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
