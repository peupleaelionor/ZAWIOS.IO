'use client'
/**
 * useSignalContexts — manage structured analysis contexts for a signal.
 *
 * localStorage-backed, Supabase-ready.
 * Handles submitting context, toggling likes, and computing nuance index.
 */
import { useState, useEffect, useCallback } from 'react'
import {
  getTopContexts,
  computeNuanceIndex,
  aggregateContext,
  type SignalContext,
  type VoteType,
} from '@/lib/signal-contexts'

const CONTEXT_STORAGE_KEY = (signalId: string) =>
  `zawios:ctx:${signalId}`

export interface UseSignalContextsReturn {
  /** Top 3 contexts sorted by likes/recency */
  topContexts: SignalContext[]
  /** Whether current user has submitted a context */
  hasSubmitted: boolean
  /** Submit a new context */
  submitContext: (text: string, voteType: VoteType) => void
  /** Toggle like on a context */
  toggleLike: (contextId: string) => void
  /** Set of liked context IDs */
  likedIds: Set<string>
  /** Nuance index (% of votes with analysis) */
  nuanceIndex: number
  /** Aggregated synthesis results */
  synthesis: ReturnType<typeof aggregateContext>
}

export function useSignalContexts(
  signalId: string,
  totalVotes: number,
): UseSignalContextsReturn {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [topContexts, setTopContexts] = useState<SignalContext[]>([])
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [nuanceIndex, setNuanceIndex] = useState(0)
  const [synthesis, setSynthesis] = useState<ReturnType<typeof aggregateContext>>([])

  // Load on mount
  useEffect(() => {
    setTopContexts(getTopContexts(signalId))
    setNuanceIndex(computeNuanceIndex(totalVotes, signalId))
    setSynthesis(aggregateContext(signalId))

    const stored = localStorage.getItem(CONTEXT_STORAGE_KEY(signalId))
    if (stored) setHasSubmitted(true)
  }, [signalId, totalVotes])

  const submitContext = useCallback(
    (text: string, voteType: VoteType) => {
      if (hasSubmitted || text.trim().length < 3 || text.length > 180) return

      // Persist locally (Supabase TODO)
      localStorage.setItem(CONTEXT_STORAGE_KEY(signalId), text)
      setHasSubmitted(true)

      // Optimistic: add to top of list
      const newCtx: SignalContext = {
        id: `ctx-local-${Date.now()}`,
        signalId,
        userId: 'local',
        authorName: 'Vous',
        voteType,
        contextText: text,
        createdAt: 'now',
        likesCount: 0,
        isFeatured: false,
      }
      setTopContexts((prev) => [newCtx, ...prev].slice(0, 3))
    },
    [signalId, hasSubmitted],
  )

  const toggleLike = useCallback((contextId: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev)
      if (next.has(contextId)) {
        next.delete(contextId)
        setTopContexts((ctxs) =>
          ctxs.map((c) =>
            c.id === contextId ? { ...c, likesCount: Math.max(0, c.likesCount - 1) } : c,
          ),
        )
      } else {
        next.add(contextId)
        setTopContexts((ctxs) =>
          ctxs.map((c) =>
            c.id === contextId ? { ...c, likesCount: c.likesCount + 1 } : c,
          ),
        )
      }
      return next
    })
  }, [])

  return {
    topContexts,
    hasSubmitted,
    submitContext,
    toggleLike,
    likedIds,
    nuanceIndex,
    synthesis,
  }
}
