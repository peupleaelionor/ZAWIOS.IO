'use client'

/**
 * Signal Intelligence UI Components
 *
 * Visual differentiation layer — makes ZAWIOS fundamentally different from
 * Polymarket, Reddit, or X. These are measurement instruments, not social widgets.
 *
 * Components:
 * - DivergenceGauge: visual tension indicator
 * - ImpactBadge: impact level badge
 * - ConvictionSelector: pre-vote conviction level
 * - ReasonSelector: post-vote "why" reason picker
 * - PersonalProjectionPrompt: "will this impact your life?"
 * - OfficialDoubtBadge: fragile hypothesis / insufficient data
 * - AccelerationBadge: replaces "trending"
 * - SignalScoreRadar: composite quality display
 * - GreyZoneOption: "too early to conclude" vote option
 */

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { IconTrending, IconChart } from '@/components/ui/icons'
import { useLanguage } from '@/components/providers/language-provider'
import {
  computeDivergenceIndex,
  getDivergenceLabel,
  CONVICTION_LEVELS,
  PERSONAL_IMPACT_OPTIONS,
  DOUBT_LABELS,
  type PersonalImpact,
  type SignalScore,
} from '@/lib/signal-intelligence'
import type { ConvictionLevel } from '@/lib/editorial-calendar'

const ROYAL_BLUE = '#1C39BB'

// ═══════════════════════════════════════════════════════
// DivergenceGauge
// ═══════════════════════════════════════════════════════

interface DivergenceGaugeProps {
  yesPercent: number
  noPercent: number
  className?: string
}

export function DivergenceGauge({
  yesPercent,
  noPercent,
  className,
}: DivergenceGaugeProps) {
  const index = computeDivergenceIndex(yesPercent, noPercent)
  const { label, color } = getDivergenceLabel(index)

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Mini gauge arc */}
      <div className="relative w-6 h-3 overflow-hidden">
        <svg viewBox="0 0 24 12" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 2 12 A 10 10 0 0 1 22 12"
            fill="none"
            stroke="var(--surface3)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Fill arc based on index */}
          <path
            d="M 2 12 A 10 10 0 0 1 22 12"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${(index / 100) * 31.4} 31.4`}
          />
        </svg>
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className="text-[11px] font-bold"
          style={{ fontFamily: 'var(--mono)', color }}
        >
          {index}
        </span>
        <span
          className="text-[9px]"
          style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// ImpactBadge
// ═══════════════════════════════════════════════════════

interface ImpactBadgeProps {
  level: 'faible' | 'structurel' | 'civilisationnel'
  className?: string
}

export function ImpactBadge({ level, className }: ImpactBadgeProps) {
  const labels: Record<string, { fr: string; color: string }> = {
    faible: { fr: 'Impact faible', color: 'var(--text3)' },
    structurel: { fr: 'Impact structurel', color: ROYAL_BLUE },
    civilisationnel: { fr: 'Impact civilisationnel', color: 'var(--accent)' },
  }
  const meta = labels[level]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded',
        className,
      )}
      style={{
        fontFamily: 'var(--mono)',
        color: meta.color,
        background: `${meta.color}12`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: meta.color }}
      />
      {meta.fr}
    </span>
  )
}

// ═══════════════════════════════════════════════════════
// ConvictionSelector — pre-vote conviction level
// ═══════════════════════════════════════════════════════

interface ConvictionSelectorProps {
  value: ConvictionLevel | null
  onChange: (level: ConvictionLevel) => void
  className?: string
}

export function ConvictionSelector({
  value,
  onChange,
  className,
}: ConvictionSelectorProps) {
  return (
    <div className={cn('', className)}>
      <p
        className="text-[10px] font-semibold mb-1.5 uppercase tracking-wider"
        style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}
      >
        Conviction
      </p>
      <div className="flex gap-1.5">
        {CONVICTION_LEVELS.map((level) => (
          <button
            key={level.value}
            onClick={() => onChange(level.value)}
            className="px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all"
            style={{
              fontFamily: 'var(--mono)',
              background:
                value === level.value ? ROYAL_BLUE : 'transparent',
              color: value === level.value ? '#fff' : 'var(--text3)',
              border: `1px solid ${
                value === level.value ? ROYAL_BLUE : 'var(--border2)'
              }`,
            }}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// ReasonSelector — post-vote "why"
// ═══════════════════════════════════════════════════════

interface ReasonSelectorProps {
  reasons: string[]
  voteType: 'yes' | 'no'
  selected: string | null
  onSelect: (reason: string) => void
  className?: string
}

export function ReasonSelector({
  reasons,
  selected,
  onSelect,
  className,
}: ReasonSelectorProps) {
  return (
    <div className={cn('', className)}>
      <p
        className="text-[10px] font-semibold mb-1.5 uppercase tracking-wider"
        style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}
      >
        Pourquoi ?
      </p>
      <div className="flex flex-col gap-1">
        {reasons.map((reason) => (
          <button
            key={reason}
            onClick={() => onSelect(reason)}
            className="text-left px-3 py-1.5 rounded-lg text-[11px] transition-all"
            style={{
              fontFamily: 'var(--mono)',
              background:
                selected === reason ? `${ROYAL_BLUE}15` : 'transparent',
              color: selected === reason ? ROYAL_BLUE : 'var(--text2)',
              border: `1px solid ${
                selected === reason ? `${ROYAL_BLUE}40` : 'var(--border)'
              }`,
            }}
          >
            {selected === reason ? '▸ ' : ''}
            {reason}
          </button>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// PersonalProjectionPrompt
// ═══════════════════════════════════════════════════════

interface PersonalProjectionProps {
  value: PersonalImpact | null
  onChange: (impact: PersonalImpact) => void
  className?: string
}

export function PersonalProjectionPrompt({
  value,
  onChange,
  className,
}: PersonalProjectionProps) {
  return (
    <div className={cn('', className)}>
      <p
        className="text-[10px] font-semibold mb-1.5"
        style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}
      >
        Cette hypothèse impactera-t-elle votre vie ?
      </p>
      <div className="flex gap-1.5">
        {PERSONAL_IMPACT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="px-3 py-1 rounded-lg text-[10px] font-semibold transition-all"
            style={{
              fontFamily: 'var(--mono)',
              background: value === opt.value ? `${ROYAL_BLUE}15` : 'transparent',
              color: value === opt.value ? ROYAL_BLUE : 'var(--text3)',
              border: `1px solid ${
                value === opt.value ? `${ROYAL_BLUE}40` : 'var(--border2)'
              }`,
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// OfficialDoubtBadge
// ═══════════════════════════════════════════════════════

interface OfficialDoubtBadgeProps {
  doubt: string | null
  className?: string
}

export function OfficialDoubtBadge({ doubt, className }: OfficialDoubtBadgeProps) {
  if (!doubt) return null

  const key = doubt === 'Hypothèse fragile' ? 'fragile' : 'insufficient_data'
  const meta = DOUBT_LABELS[key]
  if (!meta) return null

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[9px] font-medium italic px-1.5 py-0.5 rounded',
        className,
      )}
      style={{
        fontFamily: 'var(--mono)',
        color: meta.color,
        background: `${meta.color}10`,
      }}
    >
      ⚠ {meta.label}
    </span>
  )
}

// ═══════════════════════════════════════════════════════
// AccelerationBadge (replaces "trending")
// ═══════════════════════════════════════════════════════

interface AccelerationBadgeProps {
  accelerating: boolean
  ratio?: number
  className?: string
}

export function AccelerationBadge({
  accelerating,
  ratio,
  className,
}: AccelerationBadgeProps) {
  if (!accelerating) return null

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded',
        className,
      )}
      style={{
        fontFamily: 'var(--mono)',
        color: ROYAL_BLUE,
        background: `${ROYAL_BLUE}12`,
      }}
    >
      <IconTrending size={10} className="w-2.5 h-2.5" />
      En accélération{ratio ? ` ×${ratio}` : ''}
    </span>
  )
}

// ═══════════════════════════════════════════════════════
// SignalScoreRadar — minimal composite display
// ═══════════════════════════════════════════════════════

interface SignalScoreRadarProps {
  score: SignalScore
  className?: string
}

export function SignalScoreRadar({ score, className }: SignalScoreRadarProps) {
  const dimensions = [
    { label: 'Clarté', value: score.clarity },
    { label: 'Impact', value: score.impact },
    { label: 'Divergence', value: score.divergence },
    { label: 'Participation', value: score.participation },
  ]

  return (
    <div
      className={cn('p-3 rounded-lg', className)}
      style={{
        background: `${ROYAL_BLUE}06`,
        border: `1px solid ${ROYAL_BLUE}15`,
      }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-wider mb-2"
        style={{ fontFamily: 'var(--mono)', color: ROYAL_BLUE, letterSpacing: '0.1em' }}
      >
        Signal Score
      </p>
      <div className="grid grid-cols-4 gap-2">
        {dimensions.map((d) => (
          <div key={d.label} className="text-center">
            {/* Mini bar */}
            <div
              className="w-full h-1 rounded-full mb-1 overflow-hidden"
              style={{ background: 'var(--surface3)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${d.value}%`,
                  background: ROYAL_BLUE,
                  opacity: 0.7,
                }}
              />
            </div>
            <span
              className="text-[9px] font-semibold block"
              style={{ fontFamily: 'var(--mono)', color: ROYAL_BLUE }}
            >
              {d.value}
            </span>
            <span
              className="text-[8px] block"
              style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}
            >
              {d.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 pt-2 text-center" style={{ borderTop: `1px solid ${ROYAL_BLUE}12` }}>
        <span
          className="text-[12px] font-bold"
          style={{ fontFamily: 'var(--mono)', color: ROYAL_BLUE }}
        >
          {score.total}
        </span>
        <span
          className="text-[9px] ml-1"
          style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}
        >
          / 400
        </span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// GreyZoneOption — "too early to conclude"
// ═══════════════════════════════════════════════════════

interface GreyZoneOptionProps {
  selected: boolean
  onSelect: () => void
  className?: string
}

export function GreyZoneOption({
  selected,
  onSelect,
  className,
}: GreyZoneOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full py-1.5 rounded-lg text-[10px] font-semibold transition-all',
        className,
      )}
      style={{
        fontFamily: 'var(--mono)',
        background: selected ? 'var(--warn)' : 'transparent',
        color: selected ? '#fff' : 'var(--text3)',
        border: `1px solid ${selected ? 'var(--warn)' : 'var(--border)'}`,
        opacity: selected ? 1 : 0.7,
      }}
    >
      Trop tôt pour conclure
    </button>
  )
}
