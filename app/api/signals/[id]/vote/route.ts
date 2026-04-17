/**
 * /api/signals/[id]/vote — Cast or change a tri-state vote (yes / no / neutral)
 *
 * POST  — cast vote (or change existing)
 * DELETE — retract vote
 *
 * RLS ensures users can only touch their own signal_votes rows.
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'

interface Props {
  params: Promise<{ id: string }>
}

const voteSchema = z.object({
  vote_type: z.enum(['yes', 'no', 'neutral']),
})

// ── POST /api/signals/[id]/vote ───────────────────────────────────────────────

export async function POST(request: NextRequest, { params }: Props) {
  try {
    const { id: signalId } = await params

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const parsed = voteSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'vote_type must be yes | no | neutral' },
        { status: 400 },
      )
    }

    const { vote_type } = parsed.data

    // Verify signal exists and is active
    const { data: signal } = await supabase
      .from('signals')
      .select('id, status')
      .eq('id', signalId)
      .single()

    if (!signal) {
      return NextResponse.json({ error: 'Signal not found' }, { status: 404 })
    }
    if (signal.status === 'resolved') {
      return NextResponse.json({ error: 'Signal is resolved — voting closed' }, { status: 409 })
    }

    // Upsert: create or replace the user's vote (allows changing YES→NO→NEUTRAL)
    const { data: vote, error: voteError } = await supabase
      .from('signal_votes')
      .upsert(
        { user_id: user.id, signal_id: signalId, vote_type },
        { onConflict: 'user_id,signal_id' },
      )
      .select()
      .single()

    if (voteError) {
      captureException(voteError, { route: 'POST /api/signals/[id]/vote', signalId, userId: user.id })
      return NextResponse.json({ error: 'Failed to record vote' }, { status: 500 })
    }

    // Fetch updated signal stats
    const { data: updated } = await supabase
      .from('signals')
      .select('yes_percent, no_percent, neutral_percent, total_votes')
      .eq('id', signalId)
      .single()

    return NextResponse.json({ vote, signal: updated }, { status: 201 })
  } catch (err) {
    captureException(err, { route: 'POST /api/signals/[id]/vote' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── DELETE /api/signals/[id]/vote ─────────────────────────────────────────────

export async function DELETE(_request: NextRequest, { params }: Props) {
  try {
    const { id: signalId } = await params

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('signal_votes')
      .delete()
      .eq('signal_id', signalId)
      .eq('user_id', user.id)

    if (error) {
      captureException(error, { route: 'DELETE /api/signals/[id]/vote', signalId, userId: user.id })
      return NextResponse.json({ error: 'Failed to retract vote' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    captureException(err, { route: 'DELETE /api/signals/[id]/vote' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
