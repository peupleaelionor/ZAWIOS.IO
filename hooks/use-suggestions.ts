'use client'
/**
 * useSuggestions — manage subject suggestion state.
 *
 * localStorage-backed, Supabase-ready.
 * Handles submission, voting, anti-spam checks.
 */
import { useState, useEffect, useCallback } from 'react'
import {
  MOCK_SUGGESTIONS,
  canUserSubmit,
  isTitleValid,
  isDuplicate,
  computeVoteWeight,
  recalculateValidationScore,
  type SuggestedSignal,
  type TimeHorizon,
} from '@/lib/suggestions'

const SUBMISSIONS_KEY = 'zawios:suggestions:submitted'
const VOTES_KEY = 'zawios:suggestions:votes'

interface SubmitPayload {
  title: string
  description: string
  category: string
  timeHorizon: TimeHorizon
}

export interface UseSuggestionsReturn {
  suggestions: SuggestedSignal[]
  canSubmit: { allowed: boolean; reason?: string }
  submitSuggestion: (payload: SubmitPayload) => { success: boolean; error?: string }
  voteSuggestion: (id: string, isPositive: boolean) => void
  votedIds: Record<string, boolean>
  filterByStatus: (status: string | null) => void
  activeFilter: string | null
}

export function useSuggestions(): UseSuggestionsReturn {
  const [suggestions, setSuggestions] = useState<SuggestedSignal[]>([])
  const [allSuggestions, setAllSuggestions] = useState<SuggestedSignal[]>([])
  const [votedIds, setVotedIds] = useState<Record<string, boolean>>({})
  const [submissionsThisWeek, setSubmissionsThisWeek] = useState(0)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SUBMISSIONS_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { count: number; weekStart: string }
        const weekStart = new Date(parsed.weekStart)
        const now = new Date()
        const diffDays = (now.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)
        if (diffDays < 7) {
          setSubmissionsThisWeek(parsed.count)
        }
      } catch {
        /* ignore corrupt data */
      }
    }

    const votesStored = localStorage.getItem(VOTES_KEY)
    if (votesStored) {
      try {
        setVotedIds(JSON.parse(votesStored))
      } catch {
        /* ignore */
      }
    }

    setAllSuggestions(MOCK_SUGGESTIONS)
    setSuggestions(MOCK_SUGGESTIONS)
  }, [])

  const submitPermission = canUserSubmit(submissionsThisWeek, 0, null)

  const submitSuggestion = useCallback(
    (payload: SubmitPayload): { success: boolean; error?: string } => {
      if (!submitPermission.allowed) {
        return { success: false, error: submitPermission.reason }
      }

      if (!isTitleValid(payload.title)) {
        return { success: false, error: 'tooShort' }
      }

      const existingTitles = allSuggestions.map((s) => s.title)
      if (isDuplicate(payload.title, existingTitles)) {
        return { success: false, error: 'duplicate' }
      }

      const newSuggestion: SuggestedSignal = {
        id: `sug-local-${Date.now()}`,
        userId: 'local',
        authorName: 'Vous',
        title: payload.title.trim(),
        description: payload.description.trim(),
        category: payload.category,
        timeHorizon: payload.timeHorizon,
        validationScore: 0,
        validationVotes: 0,
        rejectionVotes: 0,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const updated = [newSuggestion, ...allSuggestions]
      setAllSuggestions(updated)
      setSuggestions(
        activeFilter
          ? updated.filter((s) => s.status === activeFilter)
          : updated,
      )

      // Track submissions
      const newCount = submissionsThisWeek + 1
      setSubmissionsThisWeek(newCount)
      localStorage.setItem(
        SUBMISSIONS_KEY,
        JSON.stringify({ count: newCount, weekStart: new Date().toISOString() }),
      )

      return { success: true }
    },
    [submitPermission, allSuggestions, submissionsThisWeek, activeFilter],
  )

  const voteSuggestion = useCallback(
    (id: string, isPositive: boolean) => {
      if (votedIds[id] !== undefined) return // already voted

      // Mock reputation weight (default user = 1.0)
      const weight = computeVoteWeight(0)

      setSuggestions((prev) =>
        prev.map((s) => {
          if (s.id !== id) return s
          const totalWeighted =
            s.validationVotes + s.rejectionVotes > 0
              ? s.validationScore * (s.validationVotes + s.rejectionVotes)
              : 0
          const newScore = recalculateValidationScore(
            isPositive ? totalWeighted : totalWeighted,
            s.validationVotes + s.rejectionVotes,
            weight,
            isPositive,
          )
          return {
            ...s,
            validationScore: newScore,
            validationVotes: isPositive
              ? s.validationVotes + 1
              : s.validationVotes,
            rejectionVotes: isPositive
              ? s.rejectionVotes
              : s.rejectionVotes + 1,
          }
        }),
      )

      const newVoted = { ...votedIds, [id]: isPositive }
      setVotedIds(newVoted)
      localStorage.setItem(VOTES_KEY, JSON.stringify(newVoted))
    },
    [votedIds],
  )

  const filterByStatus = useCallback(
    (status: string | null) => {
      setActiveFilter(status)
      if (status === null) {
        setSuggestions(allSuggestions)
      } else {
        setSuggestions(allSuggestions.filter((s) => s.status === status))
      }
    },
    [allSuggestions],
  )

  return {
    suggestions,
    canSubmit: submitPermission,
    submitSuggestion,
    voteSuggestion,
    votedIds,
    filterByStatus,
    activeFilter,
  }
}
