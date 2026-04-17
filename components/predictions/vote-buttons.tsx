'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface VoteButtonsProps {
  predictionId: string
  className?: string
}

export function VoteButtons({ predictionId, className }: VoteButtonsProps) {
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null)

  const handleVote = (choice: 'yes' | 'no') => {
    if (voted) return

    setVoted(choice)
    toast.success(`Vote recorded: ${choice === 'yes' ? 'Yes' : 'No'}`, {
      description: 'Sign in to track your prediction accuracy.',
    })

    // In production, this would POST to the API
    void predictionId
  }

  return (
    <div
      className={cn('flex items-center gap-2', className)}
      onClick={(e) => e.preventDefault()}
    >
      <button
        onClick={() => handleVote('yes')}
        disabled={voted !== null}
        className={cn(
          'flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
          voted === 'yes'
            ? 'text-[var(--bg)] shadow-sm'
            : voted === null
              ? 'text-[var(--teal)] hover:text-[var(--bg)] hover:shadow-sm'
              : 'text-[var(--text3)] cursor-not-allowed opacity-50',
        )}
        style={{
          fontFamily: 'var(--mono)',
          background:
            voted === 'yes'
              ? 'var(--teal)'
              : voted === null
                ? 'color-mix(in srgb, var(--teal) 12%, transparent)'
                : 'var(--surface2)',
          border: `1px solid ${
            voted === 'yes'
              ? 'var(--teal)'
              : voted === null
                ? 'color-mix(in srgb, var(--teal) 20%, transparent)'
                : 'var(--border)'
          }`,
        }}
      >
        Yes
      </button>
      <button
        onClick={() => handleVote('no')}
        disabled={voted !== null}
        className={cn(
          'flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
          voted === 'no'
            ? 'text-[var(--bg)] shadow-sm'
            : voted === null
              ? 'text-[var(--zred)] hover:text-[var(--bg)] hover:shadow-sm'
              : 'text-[var(--text3)] cursor-not-allowed opacity-50',
        )}
        style={{
          fontFamily: 'var(--mono)',
          background:
            voted === 'no'
              ? 'var(--zred)'
              : voted === null
                ? 'color-mix(in srgb, var(--zred) 12%, transparent)'
                : 'var(--surface2)',
          border: `1px solid ${
            voted === 'no'
              ? 'var(--zred)'
              : voted === null
                ? 'color-mix(in srgb, var(--zred) 20%, transparent)'
                : 'var(--border)'
          }`,
        }}
      >
        No
      </button>
    </div>
  )
}
