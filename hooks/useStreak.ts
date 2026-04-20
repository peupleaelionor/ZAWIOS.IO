'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'zawios_streak'

interface StreakData {
  currentStreak: number
  longestStreak: number
  lastVoteDate: string | null  // ISO date string YYYY-MM-DD
  totalVoteDays: number
}

interface UseStreakReturn extends StreakData {
  recordVote: () => void
  isStreakActive: boolean   // voted today
  streakAtRisk: boolean     // last vote was yesterday — vote today or lose streak
}

function toDateStr(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function loadStreak(): StreakData {
  if (typeof window === 'undefined') {
    return { currentStreak: 0, longestStreak: 0, lastVoteDate: null, totalVoteDays: 0 }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { currentStreak: 0, longestStreak: 0, lastVoteDate: null, totalVoteDays: 0 }
    return JSON.parse(raw) as StreakData
  } catch {
    return { currentStreak: 0, longestStreak: 0, lastVoteDate: null, totalVoteDays: 0 }
  }
}

function saveStreak(data: StreakData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage unavailable (private browsing, quota exceeded)
  }
}

export function useStreak(): UseStreakReturn {
  const [streak, setStreak] = useState<StreakData>(() => loadStreak())

  // Sync on mount (handles SSR hydration)
  useEffect(() => {
    setStreak(loadStreak())
  }, [])

  const today = toDateStr(new Date())
  const yesterday = toDateStr(new Date(Date.now() - 86_400_000))

  const isStreakActive = streak.lastVoteDate === today
  const streakAtRisk = streak.currentStreak > 0 && streak.lastVoteDate === yesterday

  function recordVote() {
    setStreak((prev) => {
      const alreadyVotedToday = prev.lastVoteDate === today
      if (alreadyVotedToday) return prev  // no change

      const consecutive = prev.lastVoteDate === yesterday
      const newStreak = consecutive ? prev.currentStreak + 1 : 1
      const next: StreakData = {
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastVoteDate: today,
        totalVoteDays: prev.totalVoteDays + 1,
      }
      saveStreak(next)
      return next
    })
  }

  return {
    ...streak,
    recordVote,
    isStreakActive,
    streakAtRisk,
  }
}
