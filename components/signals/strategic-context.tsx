'use client'

/**
 * StrategicContext — Structured signal analysis components
 *
 * Contains:
 * - StrategicContextInput: post-vote 180 char analysis input
 * - StrategicAnalyses: top 3 analyses display with likes
 * - NuanceIndex: contextualization percentage indicator
 * - StrategicSynthesis: aggregated trend summary
 *
 * Design: Blanc Royal adaptation — minimal, institutional, no social noise.
 * Colors: Royal Signal Blue #1C39BB as accent, clean borders, white cards on dark.
 */

import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { IconUpvote, IconChart } from '@/components/ui/icons'
import { useLanguage } from '@/components/providers/language-provider'
import type { SignalContext, VoteType } from '@/lib/signal-contexts'

const ROYAL_BLUE = '#1C39BB'
const MAX_CHARS = 180

// ═══════════════════════════════════════════════════════
// StrategicContextInput
// ═══════════════════════════════════════════════════════

interface ContextInputProps {
  voteType: VoteType
  onSubmit: (text: string, voteType: VoteType) => void
  hasSubmitted: boolean
}

export function StrategicContextInput({
  voteType,
  onSubmit,
  hasSubmitted,
}: ContextInputProps) {
  const [showInput, setShowInput] = useState(false)
  const [text, setText] = useState('')
  const { t } = useLanguage()

  if (hasSubmitted) return null

  const handleSubmit = () => {
    if (text.trim().length < 3) return
    onSubmit(text.trim(), voteType)
    setText('')
    setShowInput(false)
    toast.success(t.signalContext.published)
  }

  return (
    <div className="space-y-2">
      {/* Confirmation message */}
      <p
        className="text-[12px] font-semibold"
        style={{ color: ROYAL_BLUE, fontFamily: 'var(--mono)' }}
      >
        {t.signalContext.positionRecorded}
      </p>

      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="text-[11px] font-medium transition-colors hover:opacity-80"
          style={{
            fontFamily: 'var(--mono)',
            color: 'var(--text3)',
          }}
        >
          {t.signalContext.addAnalysis} →
        </button>
      ) : (
        <div
          className="rounded-lg p-3"
          style={{
            background: 'var(--surface)',
            border: `1px solid ${ROYAL_BLUE}33`,
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
            placeholder={t.signalContext.placeholder}
            rows={2}
            maxLength={MAX_CHARS}
            className="w-full resize-none text-[12px] leading-relaxed bg-transparent outline-none placeholder:text-[var(--text3)]"
            style={{ color: 'var(--text)', fontFamily: 'var(--font)' }}
            autoFocus
          />
          <div
            className="flex items-center justify-between mt-2 pt-2"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <span
              className="text-[9px]"
              style={{
                fontFamily: 'var(--mono)',
                color: text.length > 160 ? 'var(--warn)' : 'var(--text3)',
              }}
            >
              {text.length}/{MAX_CHARS}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowInput(false)
                  setText('')
                }}
                className="text-[10px] text-[var(--text3)] hover:text-[var(--text2)]"
                style={{ fontFamily: 'var(--mono)' }}
              >
                {t.signalContext.cancel}
              </button>
              <button
                onClick={handleSubmit}
                disabled={text.trim().length < 3}
                className="px-3 py-1 rounded-lg text-[10px] font-semibold transition-colors disabled:opacity-30"
                style={{
                  fontFamily: 'var(--mono)',
                  background: ROYAL_BLUE,
                  color: '#fff',
                }}
              >
                {t.signalContext.submit}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// StrategicAnalyses — Top 3 analyses display
// ═══════════════════════════════════════════════════════

interface AnalysesProps {
  contexts: SignalContext[]
  likedIds: Set<string>
  onLike: (id: string) => void
}

function voteLabel(voteType: VoteType, t: { vote: { yes: string; no: string; neutral: string } }): string {
  return voteType === 'yes' ? t.vote.yes.toUpperCase() : voteType === 'no' ? t.vote.no.toUpperCase() : t.vote.neutral.toUpperCase()
}

function voteColor(voteType: VoteType): string {
  return voteType === 'yes'
    ? 'var(--yes)'
    : voteType === 'no'
      ? 'var(--no)'
      : 'var(--text3)'
}

export function StrategicAnalyses({
  contexts,
  likedIds,
  onLike,
}: AnalysesProps) {
  const { t } = useLanguage()

  if (contexts.length === 0) return null

  return (
    <div className="space-y-2">
      <h4
        className="text-[10px] font-bold uppercase tracking-wider"
        style={{
          fontFamily: 'var(--mono)',
          color: ROYAL_BLUE,
          letterSpacing: '0.1em',
        }}
      >
        {t.signalContext.sectionTitle}
      </h4>

      <div className="space-y-1.5">
        {contexts.map((ctx) => (
          <div
            key={ctx.id}
            className="p-2.5 rounded-lg"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Header: author + vote badge */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[10px] font-medium"
                  style={{
                    fontFamily: 'var(--mono)',
                    color: 'var(--text3)',
                  }}
                >
                  {ctx.authorName}
                </span>
                <span
                  className="text-[9px] font-bold px-1 py-0.5 rounded"
                  style={{
                    fontFamily: 'var(--mono)',
                    color: voteColor(ctx.voteType),
                    background: `${voteColor(ctx.voteType)}15`,
                  }}
                >
                  {voteLabel(ctx.voteType, t)}
                </span>
              </div>
              <span
                className="text-[9px]"
                style={{
                  fontFamily: 'var(--mono)',
                  color: 'var(--text3)',
                }}
              >
                {ctx.createdAt}
              </span>
            </div>

            {/* Context text */}
            <p
              className="text-[12px] leading-relaxed"
              style={{ color: 'var(--text2)' }}
            >
              {ctx.contextText}
            </p>

            {/* Like button */}
            <div className="flex items-center gap-3 mt-1.5">
              <button
                onClick={() => onLike(ctx.id)}
                className="flex items-center gap-0.5 text-[10px] transition-colors"
                style={{
                  fontFamily: 'var(--mono)',
                  color: likedIds.has(ctx.id) ? ROYAL_BLUE : 'var(--text3)',
                }}
              >
                <IconUpvote size={10} className="w-2.5 h-2.5" />
                {ctx.likesCount}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// NuanceIndex — Contextualization percentage
// ═══════════════════════════════════════════════════════

interface NuanceIndexProps {
  percentage: number
}

export function NuanceIndex({ percentage }: NuanceIndexProps) {
  const { t } = useLanguage()

  if (percentage === 0) return null

  return (
    <div
      className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg"
      style={{
        background: `${ROYAL_BLUE}08`,
        border: `1px solid ${ROYAL_BLUE}18`,
      }}
    >
      <IconChart size={12} className="w-3 h-3 shrink-0" style={{ color: ROYAL_BLUE }} />
      <div className="flex items-baseline gap-1">
        <span
          className="text-[10px] font-bold"
          style={{ fontFamily: 'var(--mono)', color: ROYAL_BLUE }}
        >
          {t.signalContext.nuanceIndex} :
        </span>
        <span
          className="text-[11px] font-bold"
          style={{ fontFamily: 'var(--mono)', color: ROYAL_BLUE }}
        >
          {percentage}%
        </span>
        <span
          className="text-[9px]"
          style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}
        >
          {t.signalContext.nuancePercent}
        </span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// StrategicSynthesis — Aggregated trend summary
// ═══════════════════════════════════════════════════════

interface SynthesisProps {
  synthesis: Array<{ voteType: VoteType; summary: string }>
}

export function StrategicSynthesis({ synthesis }: SynthesisProps) {
  const { t } = useLanguage()

  if (synthesis.length === 0) return null

  return (
    <div
      className="rounded-lg p-3"
      style={{
        background: `${ROYAL_BLUE}06`,
        border: `1px solid ${ROYAL_BLUE}15`,
      }}
    >
      <h4
        className="text-[10px] font-bold uppercase tracking-wider mb-2"
        style={{
          fontFamily: 'var(--mono)',
          color: ROYAL_BLUE,
          letterSpacing: '0.1em',
        }}
      >
        {t.signalContext.synthesisTitle}
      </h4>

      <div className="space-y-1.5">
        {synthesis.map((s, i) => (
          <p
            key={i}
            className="text-[11px] leading-relaxed"
            style={{ color: 'var(--text2)' }}
          >
            <span
              className="font-bold mr-1"
              style={{ color: voteColor(s.voteType) }}
            >
              ▸
            </span>
            {s.summary}
          </p>
        ))}
      </div>

      <p
        className="text-[9px] mt-2 italic"
        style={{
          fontFamily: 'var(--mono)',
          color: 'var(--text3)',
        }}
      >
        {t.signalContext.synthesisNote}
      </p>
    </div>
  )
}
