'use client'
/**
 * useVotes — localStorage-backed voting, Supabase-ready.
 *
 * To connect Supabase, replace the localStorage calls in castVote():
 *   const { error } = await supabase
 *     .from('votes')
 *     .insert({ prediction_id: predictionId, option_id: optionId, user_id: session.user.id })
 */
import { useState, useEffect, useCallback } from 'react'
import type { PredictionOption } from '@/types'

export interface VoteState {
  votedOptionId: string | null
  options: PredictionOption[]
  totalVotes: number
  hasVoted: boolean
  castVote: (optionId: string) => void
}

function storageKey(predictionId: string) {
  return `zawios:vote:${predictionId}`
}

function recalcPercentages(options: PredictionOption[]): PredictionOption[] {
  const total = options.reduce((sum, o) => sum + o.vote_count, 0)
  if (total === 0) return options
  return options.map((o) => ({
    ...o,
    percentage: Math.round((o.vote_count / total) * 100),
  }))
}

export function useVotes(predictionId: string, initialOptions: PredictionOption[]): VoteState {
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null)
  const [options, setOptions] = useState<PredictionOption[]>(initialOptions)

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    const stored = localStorage.getItem(storageKey(predictionId))
    if (stored) {
      setVotedOptionId(stored)
    }
  }, [predictionId])

  const castVote = useCallback(
    (optionId: string) => {
      if (votedOptionId) return // one vote per prediction

      // Optimistic update: +1 to chosen option, recalc %
      setOptions((prev) => {
        const updated = prev.map((o) =>
          o.id === optionId ? { ...o, vote_count: o.vote_count + 1 } : o,
        )
        return recalcPercentages(updated)
      })
      setVotedOptionId(optionId)

      // Persist locally
      localStorage.setItem(storageKey(predictionId), optionId)

      // ── TODO: replace with Supabase when auth is connected ──
      // const supabase = createClient()
      // supabase.from('votes').insert({ prediction_id: predictionId, option_id: optionId })
    },
    [predictionId, votedOptionId],
  )

  return {
    votedOptionId,
    options,
    totalVotes: options.reduce((sum, o) => sum + o.vote_count, 0),
    hasVoted: votedOptionId !== null,
    castVote,
  }
}
