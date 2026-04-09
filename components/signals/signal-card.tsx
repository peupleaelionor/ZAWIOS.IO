'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { formatNumber } from '@/lib/utils'
import {
  CATEGORY_COLORS,
  SIGNAL_CATEGORIES,
  SIGNAL_REGIONS,
  type Signal,
} from '@/lib/signals-data'
import { Avatar } from '@/components/ui/avatar'
import { IconTrending, IconCheck } from '@/components/ui/icons'
import { WorldViewComparison } from '@/components/signals/world-view-comparison'

interface SignalCardProps {
  signal: Signal
  compact?: boolean
  onVote?: (signalId: string, vote: 'yes' | 'no' | 'neutral') => void
}

const getCategoryLabel = (id: string) =>
  SIGNAL_CATEGORIES.find((c) => c.id === id)?.labelFr ?? id

const getRegionLabel = (id: string) =>
  SIGNAL_REGIONS.find((r) => r.id === id)?.labelFr ?? id

export function SignalCard({ signal, compact = false, onVote }: SignalCardProps) {
  const [voted, setVoted] = useState<'yes' | 'no' | 'neutral' | null>(null)
  const [yes, setYes] = useState(signal.yesPercent)
  const [no, setNo] = useState(signal.noPercent)
  const [neutral, setNeutral] = useState(signal.neutralPercent ?? 0)
  const isResolved = signal.status === 'resolved'
  const catStyle = CATEGORY_COLORS[signal.category]

  const handleVote = (choice: 'yes' | 'no' | 'neutral') => {
    if (voted || isResolved) return
    setVoted(choice)

    // Simulate slight distribution shift
    if (choice === 'yes') {
      setYes((p) => Math.min(97, p + 1))
      setNo((p) => Math.max(1, p - 1))
    } else if (choice === 'no') {
      setNo((p) => Math.min(97, p + 1))
      setYes((p) => Math.max(1, p - 1))
    } else {
      setNeutral((p) => Math.min(30, p + 1))
      setYes((p) => Math.max(1, p - 1))
    }

    onVote?.(signal.id, choice)

    const label =
      choice === 'yes' ? 'Signal YES enregistré'
      : choice === 'no' ? 'Signal NO enregistré'
      : 'Position neutre enregistrée'

    toast.success(label, {
      description:
        choice === 'neutral'
          ? 'Ton abstention est comptabilisée séparément.'
          : 'Compare ton signal avec la foule mondiale.',
    })
  }

  return (
    <div
      className="card-hover relative overflow-hidden flex flex-col"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border2)',
        borderRadius: 'var(--radius)',
        padding: compact ? '14px' : '16px 18px 14px',
      }}
    >
      {/* HOT accent line */}
      {signal.hot && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, var(--teal), var(--accent), var(--teal))' }}
        />
      )}

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: catStyle.bg, color: catStyle.text, fontFamily: 'var(--mono)' }}
          >
            {getCategoryLabel(signal.category)}
          </span>
          <span
            className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ fontFamily: 'var(--mono)', background: 'var(--surface3)', color: 'var(--text3)' }}
          >
            {getRegionLabel(signal.region)}
          </span>
          {signal.hot && (
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ fontFamily: 'var(--mono)', background: 'rgba(240,96,112,0.12)', color: 'var(--zred)' }}
            >
              HOT
            </span>
          )}
          {isResolved && (
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ fontFamily: 'var(--mono)', background: 'rgba(23,213,207,0.1)', color: 'var(--teal)' }}
            >
              Résolu
            </span>
          )}
        </div>
        <span
          className="text-[10px] text-[var(--text3)] whitespace-nowrap shrink-0 mt-0.5"
          style={{ fontFamily: 'var(--mono)' }}
        >
          {signal.timeAgo}
        </span>
      </div>

      {/* ── Title ── */}
      <h3
        className={cn('font-bold text-[var(--text)] leading-snug', compact ? 'text-sm' : 'text-[15px]')}
        style={{ letterSpacing: '-0.01em' }}
      >
        {signal.title}
      </h3>

      {!compact && signal.description && (
        <p className="mt-1.5 text-[12px] text-[var(--text2)] line-clamp-2 leading-relaxed">
          {signal.description}
        </p>
      )}

      {/* ── Resolved result ── */}
      {isResolved && signal.resolvedResult !== undefined && (
        <div className="mt-4 flex items-center gap-4">
          <div>
            <span className="text-[9px] text-[var(--text3)] uppercase tracking-wider block mb-0.5" style={{ fontFamily: 'var(--mono)' }}>
              Prédiction foule
            </span>
            <span
              className={cn('text-sm font-bold', signal.yesPercent > 50 ? 'text-[var(--teal)]' : 'text-white')}
              style={{ fontFamily: 'var(--mono)' }}
            >
              {signal.yesPercent > 50 ? 'YES' : 'NO'}{' '}
              <span className="text-xs font-normal text-[var(--text3)]">
                {Math.max(signal.yesPercent, signal.noPercent)}%
              </span>
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[var(--text3)] uppercase tracking-wider block mb-0.5" style={{ fontFamily: 'var(--mono)' }}>
              Résultat réel
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold',
                signal.resolvedResult ? 'bg-[var(--teal)]/15 text-[var(--teal)]' : 'bg-[var(--zred)]/15 text-[var(--zred)]',
              )}
              style={{ fontFamily: 'var(--mono)' }}
            >
              {signal.resolvedResult ? 'VRAI' : 'FAUX'}
            </span>
          </div>
        </div>
      )}

      {/* ── Active signal: vote section ── */}
      {!isResolved && (
        <div className="mt-auto pt-4">
          {/* Stats row */}
          <div className="flex items-baseline gap-3 mb-2">
            <div className="flex items-baseline gap-1">
              <span
                className="text-[20px] font-bold text-[var(--text)]"
                style={{ fontFamily: 'var(--mono)', lineHeight: 1 }}
              >
                {yes}%
              </span>
              <span className="text-[10px] text-[var(--teal)] font-semibold" style={{ fontFamily: 'var(--mono)' }}>
                YES
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[14px] font-semibold text-[var(--text2)]" style={{ fontFamily: 'var(--mono)', lineHeight: 1 }}>
                {no}%
              </span>
              <span className="text-[10px] text-[var(--text3)] font-semibold" style={{ fontFamily: 'var(--mono)' }}>
                NO
              </span>
            </div>
            {neutral > 0 && (
              <div className="flex items-baseline gap-1">
                <span className="text-[12px] font-medium text-[var(--text3)]" style={{ fontFamily: 'var(--mono)', lineHeight: 1 }}>
                  {neutral}%
                </span>
                <span className="text-[10px] text-[var(--text3)] font-semibold" style={{ fontFamily: 'var(--mono)' }}>
                  —
                </span>
              </div>
            )}
          </div>

          {/* Tri-segment progress bar */}
          <div
            className="w-full h-1.5 rounded-full overflow-hidden flex mb-4"
            style={{ background: 'var(--surface3)' }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${yes}%`,
                background: voted === 'yes' ? 'var(--teal)' : 'rgba(23,213,207,0.7)',
                borderRadius: '9999px 0 0 9999px',
              }}
            />
            {neutral > 0 && (
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${neutral}%`,
                  background: voted === 'neutral' ? 'rgba(160,160,184,0.6)' : 'rgba(160,160,184,0.25)',
                  margin: '0 1px',
                }}
              />
            )}
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${no}%`,
                background: voted === 'no' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.18)',
                borderRadius: '0 9999px 9999px 0',
              }}
            />
          </div>

          {/* Vote count */}
          <div className="flex items-center gap-1.5 text-[10px] text-[var(--text3)] mb-3" style={{ fontFamily: 'var(--mono)' }}>
            <IconTrending size={10} className="w-2.5 h-2.5 shrink-0" />
            {formatNumber(signal.totalVotes)} signaux
          </div>

          {/* YES / NEUTRAL / NO buttons — 3-column horizontal */}
          {!voted ? (
            <div className="grid grid-cols-3 gap-2">
              <VoteButton
                label="YES"
                onClick={() => handleVote('yes')}
                variant="yes"
              />
              <VoteButton
                label="—"
                sublabel="NEUTRE"
                onClick={() => handleVote('neutral')}
                variant="neutral"
              />
              <VoteButton
                label="NO"
                onClick={() => handleVote('no')}
                variant="no"
              />
            </div>
          ) : (
            // Post-vote state: show chosen vote
            <div className="grid grid-cols-3 gap-2">
              <VoteButton
                label="YES"
                onClick={() => {}}
                variant="yes"
                state={voted === 'yes' ? 'active' : 'dim'}
                disabled
              />
              <VoteButton
                label="—"
                sublabel="NEUTRE"
                onClick={() => {}}
                variant="neutral"
                state={voted === 'neutral' ? 'active' : 'dim'}
                disabled
              />
              <VoteButton
                label="NO"
                onClick={() => {}}
                variant="no"
                state={voted === 'no' ? 'active' : 'dim'}
                disabled
              />
            </div>
          )}

          {/* Post-vote feedback + World View breakdown */}
          {voted && (
            <div className="mt-3 space-y-3">
              <div
                className="p-3 rounded-lg text-xs"
                style={{ background: 'var(--surface2)', border: '1px solid var(--border2)' }}
              >
                <span className="text-[var(--text2)]">Signal enregistré : </span>
                <span
                  className="font-bold"
                  style={{
                    color: voted === 'yes' ? 'var(--teal)' : voted === 'neutral' ? 'var(--text2)' : 'var(--text)',
                  }}
                >
                  {voted === 'yes' ? 'YES' : voted === 'no' ? 'NO' : 'NEUTRE'}
                </span>
                {voted !== 'neutral' && (
                  <span className="text-[var(--text3)]">
                    {' — '}
                    {(voted === 'yes' && yes > 50) || (voted === 'no' && no > 50)
                      ? 'Aligné avec la majorité.'
                      : 'Contre la majorité.'}
                  </span>
                )}
                {voted === 'neutral' && (
                  <span className="text-[var(--text3)]"> — Position abstention comptabilisée.</span>
                )}
              </div>
              {signal.regionalBreakdown && (
                <WorldViewComparison breakdown={signal.regionalBreakdown} neutralGlobal={neutral} />
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Footer: creator + trending ── */}
      <div
        className="mt-4 pt-3 flex items-center justify-between"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        {signal.createdBy && signal.creatorName ? (
          <div className="flex items-center gap-2">
            <Avatar src={signal.creatorAvatar} name={signal.creatorName} size="xs" />
            <span className="text-[11px] text-[var(--text3)] font-medium flex items-center gap-0.5">
              {signal.creatorName}
              {signal.verified && (
                <IconCheck size={10} className="inline-block w-2.5 h-2.5 text-[var(--teal)]" />
              )}
            </span>
          </div>
        ) : (
          <div />
        )}
        {signal.trending && !isResolved && (
          <span
            className="flex items-center gap-1 text-[10px] font-semibold"
            style={{ fontFamily: 'var(--mono)', color: 'var(--accent2)' }}
          >
            <IconTrending size={10} className="w-2.5 h-2.5" />
            trending
          </span>
        )}
      </div>
    </div>
  )
}

// ── Vote Button ────────────────────────────────────────────────────────────
type VoteVariant = 'yes' | 'no' | 'neutral'
type VoteState = 'idle' | 'active' | 'dim'

interface VoteButtonProps {
  label: string
  sublabel?: string
  onClick: () => void
  variant: VoteVariant
  state?: VoteState
  disabled?: boolean
}

function VoteButton({ label, sublabel, onClick, variant, state = 'idle', disabled = false }: VoteButtonProps) {
  const isActive = state === 'active'
  const isDim = state === 'dim'

  const styles: Record<VoteVariant, { active: string; idle: string; border: string; activeBorder: string }> = {
    yes: {
      active: 'var(--teal)',
      idle: 'transparent',
      border: 'rgba(23,213,207,0.2)',
      activeBorder: 'var(--teal)',
    },
    no: {
      active: 'rgba(255,255,255,0.85)',
      idle: 'transparent',
      border: 'var(--border2)',
      activeBorder: 'rgba(255,255,255,0.6)',
    },
    neutral: {
      active: 'rgba(160,160,184,0.25)',
      idle: 'transparent',
      border: 'var(--border)',
      activeBorder: 'rgba(160,160,184,0.5)',
    },
  }

  const s = styles[variant]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all duration-150',
        'min-h-[48px] py-2',
        !disabled && 'hover:brightness-110 active:scale-[0.97]',
        isDim && 'opacity-25',
      )}
      style={{
        background: isActive ? s.active : s.idle,
        border: `1px solid ${isActive ? s.activeBorder : s.border}`,
        fontFamily: 'var(--mono)',
      }}
    >
      <span
        className="text-[13px] font-bold leading-none"
        style={{
          color: isActive
            ? variant === 'yes' ? 'var(--bg)' : variant === 'no' ? 'var(--bg)' : 'var(--text2)'
            : variant === 'yes' ? 'var(--teal)' : variant === 'neutral' ? 'var(--text3)' : 'var(--text2)',
        }}
      >
        {label}
      </span>
      {sublabel && (
        <span
          className="text-[8px] font-semibold uppercase tracking-wider"
          style={{
            color: isActive
              ? variant === 'neutral' ? 'var(--text2)' : 'var(--bg)'
              : 'var(--text3)',
          }}
        >
          {sublabel}
        </span>
      )}
    </button>
  )
}
