'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconArrows } from '@/components/ui/icons'
import { useLanguage } from '@/components/providers/language-provider'

const VOTE_GATING_THRESHOLD = 3

interface VoteGatingProps {
  voteCount: number
  children: React.ReactNode
}

/**
 * Conversion gating — after N anonymous votes, prompt the user
 * to create an account (non-agressive). They can continue without
 * an account but with limited features.
 */
export function VoteGating({ voteCount, children }: VoteGatingProps) {
  const [dismissed, setDismissed] = useState(false)
  const [hasAccount, setHasAccount] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Check if already dismissed this session
    try {
      if (typeof window !== 'undefined') {
        const d = sessionStorage.getItem('zawios_gating_dismissed')
        if (d === 'true') setDismissed(true)
        // Check if user has a session (simplified: check localStorage for supabase)
        const keys = Object.keys(localStorage)
        const hasSupabase = keys.some((k) => k.startsWith('sb-') && k.includes('auth'))
        if (hasSupabase) setHasAccount(true)
      }
    } catch {
      // SSR or storage error
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem('zawios_gating_dismissed', 'true')
    } catch {
      // Storage error
    }
  }

  // Don't gate if user has account, dismissed, or below threshold
  if (hasAccount || dismissed || voteCount < VOTE_GATING_THRESHOLD) {
    return <>{children}</>
  }

  return (
    <div className="space-y-4">
      {children}
      <div
        className="rounded-xl p-5 text-center relative overflow-hidden"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border2)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--teal), transparent)' }}
        />
        <p
          className="text-sm font-semibold text-[var(--text)] mb-1"
          style={{ letterSpacing: '-0.01em' }}
        >
          {t.gating.title}
        </p>
        <p className="text-xs text-[var(--text3)] mb-4 max-w-[260px] mx-auto">
          {t.gating.body}
        </p>
        <div className="flex flex-col gap-2 max-w-[280px] mx-auto">
          <Link href="/auth/signup">
            <Button size="md" className="w-full gap-2">
              {t.gating.cta} <IconArrows size={14} className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <button
            onClick={handleDismiss}
            className="text-[11px] text-[var(--text3)] hover:text-[var(--text2)] transition-colors py-1"
            style={{ fontFamily: 'var(--mono)' }}
          >
            {t.gating.dismiss}
          </button>
        </div>
      </div>
    </div>
  )
}
