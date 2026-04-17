/**
 * /api/suggestions/vote — Reputation-weighted validation vote.
 *
 * POST: Cast a validation vote (positive or negative) on a suggestion.
 * Weight is computed from user's reputation score.
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
      { error: 'Sign in to vote' },
      { status: 401 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>
  const suggestionId =
    typeof payload.suggestion_id === 'string' ? payload.suggestion_id : ''
  const isPositive = payload.is_positive === true

  if (!suggestionId) {
    return NextResponse.json(
      { error: 'suggestion_id is required' },
      { status: 400 },
    )
  }

  // Check already voted
  const { data: existing } = await supabase
    .from('suggestion_votes')
    .select('id')
    .eq('user_id', user.id)
    .eq('suggestion_id', suggestionId)
    .maybeSingle()

  if (existing) {
    return NextResponse.json(
      { error: 'Already voted on this suggestion' },
      { status: 409 },
    )
  }

  // Get reputation for weight
  const { data: rep } = await supabase
    .from('reputation_scores')
    .select('total_score')
    .eq('user_id', user.id)
    .maybeSingle()

  const reputationScore = rep?.total_score ?? 0
  const weight = Math.min(3.0, 1 + Number(reputationScore) / 1000)

  // Insert vote
  const { error: insertError } = await supabase
    .from('suggestion_votes')
    .insert({
      user_id: user.id,
      suggestion_id: suggestionId,
      is_positive: isPositive,
      weight,
    })

  if (insertError) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/suggestions/vote] insert error', insertError)
    }
    return NextResponse.json(
      { error: 'Failed to cast vote' },
      { status: 500 },
    )
  }

  // Recalculate suggestion scores
  const { data: allVotes } = await supabase
    .from('suggestion_votes')
    .select('is_positive, weight')
    .eq('suggestion_id', suggestionId)

  if (allVotes) {
    const totalWeighted = allVotes.reduce(
      (sum: number, v: { is_positive: boolean; weight: number }) =>
        sum + Number(v.weight),
      0,
    )
    const positiveWeighted = allVotes
      .filter((v: { is_positive: boolean; weight: number }) => v.is_positive)
      .reduce(
        (sum: number, v: { is_positive: boolean; weight: number }) =>
          sum + Number(v.weight),
        0,
      )
    const validationVotes = allVotes.filter(
      (v: { is_positive: boolean }) => v.is_positive,
    ).length
    const rejectionVotes = allVotes.filter(
      (v: { is_positive: boolean }) => !v.is_positive,
    ).length
    const score = totalWeighted > 0 ? positiveWeighted / totalWeighted : 0

    await supabase
      .from('suggested_signals')
      .update({
        validation_score: score,
        validation_votes: validationVotes,
        rejection_votes: rejectionVotes,
      })
      .eq('id', suggestionId)
  }

  return NextResponse.json({ voted: true, weight })
}
