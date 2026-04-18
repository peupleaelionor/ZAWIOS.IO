'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  SIGNAL_CATEGORIES,
  SIGNAL_REGIONS,
  CATEGORY_COLORS,
  type Signal,
} from '@/lib/signals-data'
import { WorldViewComparison } from '@/components/signals/world-view-comparison'
import {
  DivergenceGauge,
  ImpactBadge,
  OfficialDoubtBadge,
} from '@/components/signals/signal-intelligence-ui'
import { useLanguage } from '@/components/providers/language-provider'

type TriVote = 'yes' | 'neutral' | 'no'

const getCategoryLabel = (id: string) =>
  SIGNAL_CATEGORIES.find((c) => c.id === id)?.labelFr ?? id
const getRegionLabel = (id: string) =>
  SIGNAL_REGIONS.find((r) => r.id === id)?.labelFr ?? id

interface SignalDetailViewProps {
  signal: Signal
}

export function SignalDetailView({ signal }: SignalDetailViewProps) {
  const [voted, setVoted] = useState<TriVote | null>(null)
  const [yesPercent, setYesPercent] = useState(signal.yesPercent)
  const [noPercent, setNoPercent] = useState(signal.noPercent)
  const neutralPercent = Math.round((signal.totalVotes * 0.08) / (signal.totalVotes || 1) * 100) || 8
  const isResolved = signal.status === 'resolved'
  const catStyle = CATEGORY_COLORS[signal.category]
  const { t } = useLanguage()

  const handleVote = (choice: TriVote) => {
    if (voted || isResolved) return
    setVoted(choice)
    if (choice === 'yes') {
      setYesPercent((p) => Math.min(99, p + 1))
      setNoPercent((p) => Math.max(1, p - 1))
    } else if (choice === 'no') {
      setNoPercent((p) => Math.min(99, p + 1))
      setYesPercent((p) => Math.max(1, p - 1))
    }

    const msg = choice === 'yes' ? t.vote.toastYes : choice === 'neutral' ? t.vote.toastNeutral : t.vote.toastNo
    toast.success(msg)
  }

  return (
    <div className="signal-detail-container">
      {/* Back link */}
      <div className="container py-4">
        <Link
          href="/signals"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
          </svg>
          Retour aux signaux
        </Link>
      </div>

      {/* Hero image */}
      {signal.coverImage && (
        <div className="signal-detail-hero">
          <div className="container">
            <div className="signal-detail-hero-inner">
              <Image
                src={signal.coverImage}
                alt={signal.title}
                width={800}
                height={450}
                className="signal-detail-hero-img"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container">
        <div className="signal-detail-content">
          {/* Metadata badges */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <span
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide"
              style={{
                background: catStyle.bg,
                color: catStyle.text,
                fontFamily: 'var(--mono)',
              }}
            >
              {getCategoryLabel(signal.category)}
            </span>
            <span
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{
                background: 'var(--surface-alt)',
                color: 'var(--text-muted)',
                fontFamily: 'var(--mono)',
              }}
            >
              {getRegionLabel(signal.region)}
            </span>
            {signal.horizon && (
              <span
                className="text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-lg"
                style={{
                  background: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  fontFamily: 'var(--mono)',
                }}
              >
                {signal.horizon === 'court' ? '1-3 ans' : signal.horizon === 'moyen' ? '5-10 ans' : '15-30 ans'}
              </span>
            )}
          </div>

          {/* Title — large, readable */}
          <h1 className="signal-detail-title">
            {signal.title}
          </h1>

          {/* Description — generous size */}
          {signal.description && (
            <p className="signal-detail-description">
              {signal.description}
            </p>
          )}

          {/* Impact + Doubt badges */}
          {(signal.impactLevel || signal.officialDoubt) && (
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              {signal.impactLevel && <ImpactBadge level={signal.impactLevel} />}
              {signal.officialDoubt && <OfficialDoubtBadge doubt={signal.officialDoubt} />}
            </div>
          )}

          {/* Vote section */}
          {!isResolved && (
            <div
              className="signal-detail-vote-card"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
              }}
            >
              {/* Vote stats */}
              <div className="flex items-baseline gap-4 mb-5">
                <div className="flex items-baseline gap-1.5">
                  <span className="signal-detail-vote-pct" style={{ color: 'var(--positive)' }}>
                    {yesPercent}%
                  </span>
                  <span className="text-xs font-semibold" style={{ fontFamily: 'var(--mono)', color: 'var(--positive)', opacity: 0.7 }}>
                    OUI
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-medium" style={{ fontFamily: 'var(--mono)', color: 'var(--text-subtle)' }}>
                    {neutralPercent}%
                  </span>
                  <span className="text-xs" style={{ fontFamily: 'var(--mono)', color: 'var(--text-subtle)' }}>—</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="signal-detail-vote-pct" style={{ color: 'var(--negative)' }}>
                    {noPercent}%
                  </span>
                  <span className="text-xs font-semibold" style={{ fontFamily: 'var(--mono)', color: 'var(--negative)', opacity: 0.7 }}>
                    NON
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div
                className="w-full h-3 rounded-full overflow-hidden mb-6 flex"
                style={{ background: 'var(--surface-alt)' }}
              >
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${yesPercent}%`,
                    background: 'var(--positive)',
                    opacity: voted === 'yes' ? 1 : 0.6,
                    borderRadius: '9999px 0 0 9999px',
                  }}
                />
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${noPercent}%`,
                    background: 'var(--negative)',
                    opacity: voted === 'no' ? 1 : 0.6,
                    borderRadius: '0 9999px 9999px 0',
                  }}
                />
              </div>

              {/* Total votes */}
              <p className="text-sm mb-5" style={{ color: 'var(--text-subtle)', fontFamily: 'var(--mono)' }}>
                {signal.totalVotes.toLocaleString('fr-FR')} votes
              </p>

              {/* Vote buttons — larger on mobile */}
              <div className="signal-detail-vote-buttons">
                <button
                  onClick={() => handleVote('yes')}
                  disabled={voted !== null || isResolved}
                  className="signal-detail-vote-btn"
                  style={{
                    background: voted === 'yes' ? 'var(--positive)' : 'transparent',
                    color: voted === 'yes' ? 'white' : 'var(--positive)',
                    border: `2px solid ${voted === 'yes' ? 'var(--positive)' : 'var(--border)'}`,
                    opacity: voted !== null && voted !== 'yes' ? 0.4 : 1,
                  }}
                >
                  {t.vote.yes}
                </button>
                <button
                  onClick={() => handleVote('neutral')}
                  disabled={voted !== null || isResolved}
                  className="signal-detail-vote-btn"
                  style={{
                    background: voted === 'neutral' ? 'var(--surface-alt)' : 'transparent',
                    color: 'var(--text-muted)',
                    border: `2px solid ${voted === 'neutral' ? 'var(--border2)' : 'var(--border)'}`,
                    opacity: voted !== null && voted !== 'neutral' ? 0.4 : 1,
                  }}
                >
                  —
                </button>
                <button
                  onClick={() => handleVote('no')}
                  disabled={voted !== null || isResolved}
                  className="signal-detail-vote-btn"
                  style={{
                    background: voted === 'no' ? 'var(--negative)' : 'transparent',
                    color: voted === 'no' ? 'white' : 'var(--negative)',
                    border: `2px solid ${voted === 'no' ? 'var(--negative)' : 'var(--border)'}`,
                    opacity: voted !== null && voted !== 'no' ? 0.4 : 1,
                  }}
                >
                  {t.vote.no}
                </button>
              </div>
            </div>
          )}

          {/* Divergence gauge */}
          {signal.divergenceIndex !== undefined && (
            <div className="signal-detail-section">
              <DivergenceGauge yesPercent={yesPercent} noPercent={noPercent} />
            </div>
          )}

          {/* Regional breakdown */}
          {signal.regionalBreakdown && (
            <div className="signal-detail-section">
              <h2 className="signal-detail-section-title">Comparaison regionale</h2>
              <WorldViewComparison breakdown={signal.regionalBreakdown} />
            </div>
          )}

          {/* Time info */}
          <div className="signal-detail-meta">
            <div className="flex items-center gap-6 flex-wrap">
              <div>
                <span className="signal-detail-meta-label">Publie</span>
                <span className="signal-detail-meta-value">{signal.timeAgo}</span>
              </div>
              {signal.expiresIn && (
                <div>
                  <span className="signal-detail-meta-label">Horizon</span>
                  <span className="signal-detail-meta-value">{signal.expiresIn}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
