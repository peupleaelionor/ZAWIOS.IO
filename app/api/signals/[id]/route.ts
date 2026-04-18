/**
 * /api/signals/[id] — Fetch a single signal with optional user vote context
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'

interface Props {
  params: Promise<{ id: string }>
}

export async function GET(_request: NextRequest, { params }: Props) {
  try {
    const { id } = await params

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Signal ID required' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch signal
    const { data: signal, error: sigError } = await supabase
      .from('signals')
      .select('*')
      .eq('id', id)
      .single()

    if (sigError || !signal) {
      return NextResponse.json({ error: 'Signal not found' }, { status: 404 })
    }

    // Fetch user's vote if authenticated
    let userVote: string | null = null
    if (user) {
      const { data: vote } = await supabase
        .from('signal_votes')
        .select('vote_type')
        .eq('signal_id', id)
        .eq('user_id', user.id)
        .maybeSingle()

      userVote = vote?.vote_type ?? null
    }

    return NextResponse.json({ signal, userVote })
  } catch (err) {
    captureException(err, { route: 'GET /api/signals/[id]' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
