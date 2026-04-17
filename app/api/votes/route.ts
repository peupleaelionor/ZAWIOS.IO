/**
 * /api/votes — cast a vote on a prediction option (Supabase-backed).
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>

  if (
    typeof payload.prediction_id !== 'string' ||
    typeof payload.option_id !== 'string'
  ) {
    return NextResponse.json(
      { error: 'prediction_id and option_id are required' },
      { status: 400 }
    )
  }

  // Check if user has already voted on this prediction
  const { data: existing } = await supabase
    .from('votes')
    .select('id')
    .eq('user_id', user.id)
    .eq('prediction_id', payload.prediction_id)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'You have already voted on this prediction' }, { status: 409 })
  }

  // Insert vote
  const { data: vote, error: voteError } = await supabase
    .from('votes')
    .insert({
      user_id: user.id,
      prediction_id: payload.prediction_id,
      option_id: payload.option_id,
      is_yes: payload.is_yes === true,
    })
    .select()
    .single()

  if (voteError) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/votes] insert error', voteError)
    }
    return NextResponse.json({ error: 'Failed to cast vote' }, { status: 500 })
  }

  return NextResponse.json({ vote }, { status: 201 })
}
