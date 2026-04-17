'use client'

/**
 * SuggestionCard — Display a subject proposal with validation bar and vote buttons.
 *
 * Design: Blanc Royal — minimal, institutional, no social noise.
 * Royal Signal Blue (#1C39BB) accent, clean borders, subtle status badges.
 */

import { cn } from '@/lib/utils'
import { IconUpvote, IconCheck } from '@/components/ui/icons'
import { useLanguage } from '@/components/providers/language-provider'
import { SIGNAL_CATEGORIES } from '@/lib/signals-data'
import { getStatusColor, type SuggestedSignal } from '@/lib/suggestions'

const ROYAL_BLUE = '#1C39BB'

interface SuggestionCardProps {
  suggestion: SuggestedSignal
  voted?: boolean
  votedPositive?: boolean
  onVote: (id: string, isPositive: boolean) => void
}

const getCategoryLabel = (id: string) =>
  SIGNAL_CATEGORIES.find((c) => c.id === id)?.labelFr ?? id

function horizonLabel(h: string, t: Record<string, string>): string {
  switch (h) {
    case 'short': return t.horizonShort
    case 'medium': return t.horizonMedium
    case 'long': return t.horizonLong
    default: return h
  }
}

function statusLabel(s: string, t: Record<string, string>): string {
  switch (s) {
    case 'pending': return t.pending
    case 'community_validated': return t.validated
    case 'editorial_review': return t.editorial
    case 'approved': return t.approved
    case 'rejected': return t.rejected
    default: return s
  }
}

export function SuggestionCard({
  suggestion,
  voted = false,
  votedPositive,
  onVote,
}: SuggestionCardProps) {
  const { t } = useLanguage()
  const tp = t.propositions

  const approvalPercent =
    suggestion.validationVotes + suggestion.rejectionVotes > 0
      ? Math.round(
          (suggestion.validationVotes /
            (suggestion.validationVotes + suggestion.rejectionVotes)) *
            100,
        )
      : 0

  const totalVotes = suggestion.validationVotes + suggestion.rejectionVotes
  const statusCol = getStatusColor(suggestion.status)

  return (
    <div
      className="relative overflow-hidden flex flex-col p-4 rounded-xl transition-all duration-200"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border2)',
      }}
    >
      {/* Header: category + horizon + status */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              fontFamily: 'var(--mono)',
              background: `${ROYAL_BLUE}12`,
              color: ROYAL_BLUE,
            }}
          >
            {getCategoryLabel(suggestion.category)}
          </span>
          <span
            className="text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{
              fontFamily: 'var(--mono)',
              background: 'var(--surface3)',
              color: 'var(--text3)',
            }}
          >
            {horizonLabel(suggestion.timeHorizon, tp)}
          </span>
        </div>
        <span
          className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{
            fontFamily: 'var(--mono)',
            color: statusCol,
            background: `${statusCol}15`,
          }}
        >
          {suggestion.status === 'community_validated' && (
            <IconCheck size={9} className="inline w-2.5 h-2.5 mr-0.5" />
          )}
          {statusLabel(suggestion.status, tp)}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-bold text-[15px] text-[var(--text)] leading-snug mb-1"
        style={{ letterSpacing: '-0.01em' }}
      >
        {suggestion.title}
      </h3>

      {/* Description */}
      {suggestion.description && (
        <p className="text-[12px] text-[var(--text2)] leading-relaxed line-clamp-2 mb-3">
          {suggestion.description}
        </p>
      )}

      {/* Validation bar */}
      <div className="mb-3">
        <div className="flex items-baseline justify-between mb-1">
          <span
            className="text-[10px] font-semibold"
            style={{ fontFamily: 'var(--mono)', color: ROYAL_BLUE }}
          >
            {approvalPercent}% {tp.validationPercent}
          </span>
          <span
            className="text-[9px]"
            style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}
          >
            {totalVotes} {tp.votesCount}
          </span>
        </div>
        <div
          className="w-full h-1 rounded-full overflow-hidden"
          style={{ background: 'var(--surface3)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${approvalPercent}%`,
              background: ROYAL_BLUE,
              opacity: 0.8,
            }}
          />
        </div>
      </div>

      {/* Vote buttons — validate / reject */}
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] text-[var(--text3)]"
          style={{ fontFamily: 'var(--mono)' }}
        >
          {suggestion.authorName}
        </span>

        {suggestion.status === 'pending' && (
          <div className="flex gap-1.5">
            <button
              onClick={() => onVote(suggestion.id, true)}
              disabled={voted}
              className={cn(
                'flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all',
                voted && votedPositive ? 'opacity-100' : voted ? 'opacity-25' : 'active:scale-95',
              )}
              style={{
                fontFamily: 'var(--mono)',
                background: voted && votedPositive ? ROYAL_BLUE : `${ROYAL_BLUE}12`,
                color: voted && votedPositive ? '#fff' : ROYAL_BLUE,
                border: `1px solid ${ROYAL_BLUE}30`,
              }}
            >
              <IconUpvote size={10} className="w-2.5 h-2.5" />
              {tp.validate}
            </button>
            <button
              onClick={() => onVote(suggestion.id, false)}
              disabled={voted}
              className={cn(
                'px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all',
                voted && votedPositive === false ? 'opacity-100' : voted ? 'opacity-25' : 'active:scale-95',
              )}
              style={{
                fontFamily: 'var(--mono)',
                background: voted && votedPositive === false ? 'var(--surface3)' : 'transparent',
                color: 'var(--text3)',
                border: '1px solid var(--border2)',
              }}
            >
              {tp.reject}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
