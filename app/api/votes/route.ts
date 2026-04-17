/**
 * /api/votes — Cast a vote on a prediction option (Supabase-backed).
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'

const voteSchema = z.object({
  prediction_id: z.string().uuid(),
  option_id:     z.string().uuid(),
  is_yes:        z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const parsed = voteSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'prediction_id and option_id are required' },
        { status: 400 },
      )
    }

    const { prediction_id, option_id, is_yes } = parsed.data

    // Check for duplicate vote
    const { data: existing } = await supabase
      .from('votes')
      .select('id')
      .eq('user_id', user.id)
      .eq('prediction_id', prediction_id)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: 'You have already voted on this prediction' },
        { status: 409 },
      )
    }

    const { data: vote, error: voteError } = await supabase
      .from('votes')
      .insert({ user_id: user.id, prediction_id, option_id, is_yes: is_yes === true })
      .select()
      .single()

    if (voteError) {
      captureException(voteError, { route: 'POST /api/votes', userId: user.id, prediction_id })
      return NextResponse.json({ error: 'Failed to cast vote' }, { status: 500 })
    }

    return NextResponse.json({ vote }, { status: 201 })
  } catch (err) {
    captureException(err, { route: 'POST /api/votes' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
