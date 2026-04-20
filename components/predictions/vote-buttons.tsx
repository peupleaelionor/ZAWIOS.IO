'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface VoteButtonsProps {
  predictionId: string
  className?: string
}

export function VoteButtons({ predictionId, className }: VoteButtonsProps) {
  const [voted, setVoted] = useState<'yes' | 'no' | 'neutral' | null>(null)

  const handleVote = (choice: 'yes' | 'no' | 'neutral') => {
    if (voted) return
    setVoted(choice)
    const labels = { yes: 'Oui', no: 'Non', neutral: 'Neutre' }
    toast.success(`Vote enregistré : ${labels[choice]}`, {
      description: 'Créez un compte pour suivre votre précision.',
    })
    void predictionId
  }

  const btnBase: React.CSSProperties = {
    flex: '1 1 0',
    minWidth: 0,
    minHeight: '44px',
    padding: '10px 8px',
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--mono)',
    fontWeight: 600,
    fontSize: '13px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transition: 'all 150ms ease',
    cursor: 'pointer',
  }

  return (
    <div
      className={cn('w-full min-w-0', className)}
      onClick={(e) => e.preventDefault()}
    >
      <div style={{ display: 'flex', gap: '8px', width: '100%', minWidth: 0 }}>
        <button
          onClick={() => handleVote('yes')}
          disabled={voted !== null}
          aria-label="Voter Oui"
          style={{
            ...btnBase,
            cursor: voted !== null ? 'default' : 'pointer',
            color: voted === 'yes' ? '#fff' : voted === null ? 'var(--positive)' : 'var(--text-subtle)',
            background: voted === 'yes' ? 'var(--positive)' : voted === null ? 'var(--positive-soft)' : 'var(--surface-alt)',
            border: `1.5px solid ${voted === 'yes' ? 'var(--positive)' : voted === null ? 'color-mix(in srgb, var(--positive) 35%, transparent)' : 'var(--border)'}`,
            opacity: voted !== null && voted !== 'yes' ? 0.45 : 1,
          }}
        >
          Oui
        </button>

        <button
          onClick={() => handleVote('no')}
          disabled={voted !== null}
          aria-label="Voter Non"
          style={{
            ...btnBase,
            cursor: voted !== null ? 'default' : 'pointer',
            color: voted === 'no' ? '#fff' : voted === null ? 'var(--negative)' : 'var(--text-subtle)',
            background: voted === 'no' ? 'var(--negative)' : voted === null ? 'var(--negative-soft)' : 'var(--surface-alt)',
            border: `1.5px solid ${voted === 'no' ? 'var(--negative)' : voted === null ? 'color-mix(in srgb, var(--negative) 35%, transparent)' : 'var(--border)'}`,
            opacity: voted !== null && voted !== 'no' ? 0.45 : 1,
          }}
        >
          Non
        </button>

        <button
          onClick={() => handleVote('neutral')}
          disabled={voted !== null}
          aria-label="Voter Neutre"
          style={{
            ...btnBase,
            cursor: voted !== null ? 'default' : 'pointer',
            color: voted === 'neutral' ? '#fff' : voted === null ? 'var(--text-muted)' : 'var(--text-subtle)',
            background: voted === 'neutral' ? 'var(--text-muted)' : 'var(--surface-alt)',
            border: `1.5px solid ${voted === 'neutral' ? 'var(--text-muted)' : 'var(--border)'}`,
            opacity: voted !== null && voted !== 'neutral' ? 0.45 : 1,
          }}
        >
          Neutre
        </button>
      </div>
    </div>
  )
}
