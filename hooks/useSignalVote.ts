'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import type { Signal } from '@/lib/signals-data'

type VoteType = 'yes' | 'no' | 'neutral'

interface VoteVars {
  signalId: string
  voteType: VoteType
}

interface VoteResponse {
  vote:   { vote_type: VoteType }
  signal: {
    yes_percent:     number
    no_percent:      number
    neutral_percent: number
    total_votes:     number
  }
}

async function castVote({ signalId, voteType }: VoteVars): Promise<VoteResponse> {
  const res = await fetch(`/api/signals/${signalId}/vote`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ vote_type: voteType }),
  })

  if (res.status === 401) throw new Error('AUTH_REQUIRED')
  if (!res.ok) {
    const json = await res.json().catch(() => ({})) as { error?: string }
    throw new Error(json.error ?? 'Vote failed')
  }

  return res.json() as Promise<VoteResponse>
}

export function useSignalVote() {
  const qc = useQueryClient()

  return useMutation<VoteResponse, Error, VoteVars>({
    mutationFn: castVote,

    // Optimistic update: immediately reflect the vote in cached feed data
    onMutate: async ({ signalId, voteType }) => {
      await qc.cancelQueries({ queryKey: queryKeys.signals.all })

      // Snapshot all feed caches for rollback
      const snapshots = qc.getQueriesData<Signal[]>({ queryKey: queryKeys.signals.all })

      qc.setQueriesData<Signal[]>({ queryKey: queryKeys.signals.all }, (old) => {
        if (!Array.isArray(old)) return old
        return old.map((s) => {
          if (s.id !== signalId) return s
          const votes = s.totalVotes + 1
          const newYes     = voteType === 'yes'     ? Math.min(97, s.yesPercent + 1)     : Math.max(1, s.yesPercent - 0.5)
          const newNo      = voteType === 'no'      ? Math.min(97, s.noPercent + 1)      : Math.max(1, s.noPercent - 0.5)
          const newNeutral = voteType === 'neutral'  ? Math.min(30, s.neutralPercent + 1) : Math.max(0, s.neutralPercent - 0.5)
          return { ...s, yesPercent: newYes, noPercent: newNo, neutralPercent: newNeutral, totalVotes: votes }
        })
      })

      return { snapshots }
    },

    // On server error — roll back optimistic update
    onError: (_err, _vars, ctx) => {
      const context = ctx as { snapshots?: Array<[readonly unknown[], Signal[] | undefined]> }
      context?.snapshots?.forEach(([key, data]) => {
        qc.setQueryData(key, data)
      })
    },

    // On success — sync with server's authoritative vote counts
    onSuccess: (data, { signalId }) => {
      qc.setQueriesData<Signal[]>({ queryKey: queryKeys.signals.all }, (old) => {
        if (!Array.isArray(old)) return old
        return old.map((s) => {
          if (s.id !== signalId) return s
          return {
            ...s,
            yesPercent:     data.signal.yes_percent,
            noPercent:      data.signal.no_percent,
            neutralPercent: data.signal.neutral_percent,
            totalVotes:     data.signal.total_votes,
          }
        })
      })
      // Invalidate detail cache too
      qc.invalidateQueries({ queryKey: queryKeys.signals.detail(signalId) })
    },
  })
}
