'use client'

import { useState, useEffect } from 'react'

interface StreakData {
  currentStreak: number
  isStreakActive: boolean
  streakAtRisk: boolean
}

export function useStreak(): StreakData {
  const [data, setData] = useState<StreakData>({
    currentStreak: 0,
    isStreakActive: false,
    streakAtRisk: false,
  })

  useEffect(() => {
    try {
      const stored = localStorage.getItem('zawios-streak')
      if (!stored) return
      const parsed = JSON.parse(stored) as { streak: number; lastActive: string }
      const lastActive = new Date(parsed.lastActive)
      const now = new Date()
      const hoursDiff = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60)
      setData({
        currentStreak: parsed.streak,
        isStreakActive: hoursDiff < 24,
        streakAtRisk: hoursDiff >= 20 && hoursDiff < 48,
      })
    } catch {}
  }, [])

  return data
}
