'use client'
import { useVotes } from '@/hooks/use-votes'
import { formatDate, formatNumber } from '@/lib/utils'
import { IconCheck } from '@/components/ui/icons'
import Link from 'next/link'
import type { Prediction } from '@/types'

interface VotePanelProps {
  prediction: Prediction
}

const OPTION_COLORS: Record<string, string> = {
  Yes: 'var(--teal)',
  Oui: 'var(--teal)',
  OUI: 'var(--teal)',
  No: 'var(--zred)',
  Non: 'var(--zred)',
  NON: 'var(--zred)',
}

function getOptionColor(label: string, isVoted: boolean, isCorrect?: boolean): string {
  if (isCorrect) return 'var(--teal)'
  if (OPTION_COLORS[label]) return OPTION_COLORS[label]
  return isVoted ? 'var(--accent)' : 'var(--violet2)'
}

export function VotePanel({ prediction }: VotePanelProps) {
  const { options, totalVotes, hasVoted, votedOptionId, castVote } = useVotes(
    prediction.id,
    prediction.options ?? [],
  )

  const isResolved = prediction.status === 'resolved'
  const votedOption = options.find((o) => o.id === votedOptionId)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
          Community vote
          <span className="ml-2 text-sm font-normal" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
            · {formatNumber(totalVotes)} responses
          </span>
        </h2>
        {hasVoted && !isResolved && (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(23,213,207,0.12)', color: 'var(--teal)' }}
          >
            <IconCheck size={12} />
            {votedOption ? `Your vote: ${votedOption.label}` : 'Voted'}
          </span>
        )}
      </div>

      {/* Option bars */}
      <div className="space-y-4 mb-8">
        {options.map((option) => {
          const isVotedFor = option.id === votedOptionId
          const color = getOptionColor(option.label, isVotedFor, option.is_correct)
          const pct = option.percentage

          return (
            <div key={option.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: isVotedFor || option.is_correct ? color : 'var(--text)' }}
                  >
                    {option.label}
                  </span>
                  {option.is_correct && (
                    <span
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold"
                      style={{ background: 'rgba(23,213,207,0.12)', color: 'var(--teal)', fontFamily: 'var(--mono)' }}
                    >
                      <IconCheck size={10} /> CORRECT
                    </span>
                  )}
                  {isVotedFor && !isResolved && (
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(23,213,207,0.08)', color: 'var(--teal)', fontFamily: 'var(--mono)' }}
                    >
                      votre vote
                    </span>
                  )}
                </div>
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ color: isVotedFor || option.is_correct ? color : 'var(--text)', fontFamily: 'var(--mono)' }}
                >
                  {pct}%
                </span>
              </div>

              {/* Progress bar */}
              <div
                className="h-2.5 rounded-full overflow-hidden"
                style={{ background: 'var(--surface2)' }}
              >
                <div
                  className="h-full rounded-full bar-settle"
                  style={{
                    width: `${pct}%`,
                    background: color,
                    opacity: isVotedFor || option.is_correct ? 1 : 0.55,
                  }}
                />
              </div>

              <p
                className="text-xs mt-1.5"
                style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
              >
                {formatNumber(option.vote_count)} votes
              </p>
            </div>
          )
        })}
      </div>

      {/* Vote action area */}
      {!isResolved && (
        <div
          className="pt-6"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {!hasVoted ? (
            <>
              <p className="text-sm mb-4" style={{ color: 'var(--text3)' }}>
                Cast your vote — your response is anonymous until you sign in.
              </p>
              <div className="flex flex-wrap gap-3">
                {options.map((option) => {
                  const isYes = option.label === 'Yes' || option.label === 'Oui' || option.label === 'OUI'
                  const isNo  = option.label === 'No'  || option.label === 'Non' || option.label === 'NON'
                  return (
                    <button
                      key={option.id}
                      onClick={() => castVote(option.id)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.97]"
                      style={
                        isYes
                          ? {
                              background: 'rgba(23,213,207,0.1)',
                              color: 'var(--teal)',
                              border: '1.5px solid rgba(23,213,207,0.35)',
                            }
                          : isNo
                          ? {
                              background: 'rgba(240,96,112,0.1)',
                              color: 'var(--zred)',
                              border: '1.5px solid rgba(240,96,112,0.35)',
                            }
                          : {
                              background: 'var(--surface2)',
                              color: 'var(--text)',
                              border: '1.5px solid var(--border2)',
                            }
                      }
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
              <p className="text-xs mt-4" style={{ color: 'var(--text3)' }}>
                <Link href="/auth/login" className="underline hover:text-[var(--text2)] transition-colors">
                  Sign in
                </Link>{' '}
                to link your vote to your reputation score.
              </p>
            </>
          ) : (
            <div
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: 'rgba(23,213,207,0.06)', border: '1px solid rgba(23,213,207,0.18)' }}
            >
              <IconCheck size={16} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--teal)' }}>Vote recorded</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>
                  Resolves {formatDate(prediction.resolution_date)}.{' '}
                  <Link href="/auth/signup" className="underline hover:text-[var(--text2)] transition-colors">
                    Create an account
                  </Link>{' '}
                  to track your accuracy.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resolved resolution notes */}
      {isResolved && prediction.resolution_notes && (
        <div
          className="mt-6 pt-6"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div
            className="flex items-start gap-3 p-4 rounded-xl"
            style={{ background: 'rgba(23,213,207,0.06)', border: '1px solid rgba(23,213,207,0.18)' }}
          >
            <IconCheck size={16} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--teal)' }}>Resolution</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text2)', lineHeight: 1.6 }}>
                {prediction.resolution_notes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
