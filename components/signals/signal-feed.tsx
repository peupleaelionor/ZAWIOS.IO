'use client'

import { useState, useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { SignalCard } from './signal-card'
import { VoteGating } from './vote-gating'
import { WorldViewComparison } from './world-view-comparison'
import {
  mockSignals,
  SIGNAL_CATEGORIES,
  SIGNAL_REGIONS,
  CATEGORY_COLORS,
  getWorldViewSignals,
  type SignalRegion,
  type SignalCategory,
} from '@/lib/signals-data'

import { useLanguage } from '@/components/providers/language-provider'
import type { Lang } from '@/lib/i18n'

interface SignalFeedProps {
  excludedSignalIds?: string[]
}

// ── Category tabs with brand colors ──────────────────────────────────────────
const CATEGORY_TAB_IDS: { id: SignalCategory | 'all' }[] = [
  { id: 'all' },
  { id: 'worldview' },
  { id: 'news' },
  { id: 'tech' },
  { id: 'business' },
  { id: 'crypto' },
  { id: 'sports' },
  { id: 'culture' },
  { id: 'society' },
  { id: 'entertainment' },
  { id: 'trends' },
  { id: 'fun' },
  { id: 'work' },
  { id: 'education' },
  { id: 'health' },
  { id: 'housing' },
  { id: 'climate' },
  { id: 'relationships' },
  { id: 'youth' },
  { id: 'spirituality' },
  { id: 'finance' },
  { id: 'geopolitics' },
]

function getCategoryTabLabel(id: SignalCategory | 'all', lang: Lang, allLabel: string): string {
  if (id === 'all') return allLabel
  const cat = SIGNAL_CATEGORIES.find((c) => c.id === id) ?? null
  return lang === 'fr' ? (cat?.labelFr ?? id) : (cat?.label ?? id)
}

function getRegionLabelI18n(id: string, lang: Lang): string {
  const r = SIGNAL_REGIONS.find((region) => region.id === id) ?? null
  return lang === 'fr' ? (r?.labelFr ?? id) : (r?.label ?? id)
}

// Deterministic shuffle using a seed — same seed = same order
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr]
  let s = seed
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function SignalFeed({ excludedSignalIds = [] }: SignalFeedProps) {
  const [sortTab, setSortTab] = useState('trending')
  const [category, setCategory] = useState<SignalCategory | 'all'>('all')
  const [region, setRegion] = useState<SignalRegion | 'all'>('all')
  const [showWorldView, setShowWV] = useState(false)
  const [voteCount, setVoteCount] = useState(0)
  const { t, lang } = useLanguage()

  // Rotation seed: changes every 2 hours so the feed rotates without infinite re-renders
  const rotationSeed = useMemo(() => Math.floor(Date.now() / (1000 * 60 * 120)), [])

  const SORT_TABS = [
    { id: 'trending', label: t.feed.trends },
    { id: 'latest', label: t.feed.recent },
    { id: 'popular', label: t.feed.popular },
    { id: 'following', label: t.feed.following },
  ]

  const handleVote = useCallback(() => {
    setVoteCount((c) => c + 1)
  }, [])

  const worldViewSignals = useMemo(
    () => getWorldViewSignals(3).filter((sig) => !excludedSignalIds.includes(sig.id)),
    [excludedSignalIds],
  )

  const filteredSignals = useMemo(() => {
    let signals = [...mockSignals]
      .filter((s) => s.status === 'active')
      .filter((s) => !excludedSignalIds.includes(s.id))

    if (category !== 'all') signals = signals.filter((s) => s.category === category)
    if (region !== 'all') signals = signals.filter((s) => s.region === region)

    if (category === 'worldview') {
      signals = signals.sort((a, b) => b.totalVotes - a.totalVotes)
      return signals.slice(0, 15)
    }

    switch (sortTab) {
      case 'trending':
        signals = signals.filter((s) => s.trending || s.hot).sort((a, b) => b.totalVotes - a.totalVotes)
        break
      case 'popular':
        signals.sort((a, b) => b.totalVotes - a.totalVotes)
        break
      case 'latest':
        // Rotate the order every 2h so users see fresh questions each session
        signals = seededShuffle(signals, rotationSeed)
        break
      case 'following':
        signals = signals.filter((s) => s.createdBy !== null)
        break
      default:
        // Default "all" view: rotate to avoid always showing the same signals first
        signals = seededShuffle(signals, rotationSeed)
        break
    }

    return signals.slice(0, 20)
  }, [sortTab, category, region, excludedSignalIds, rotationSeed])

  const catColor = (id: SignalCategory | 'all') =>
    id !== 'all' ? CATEGORY_COLORS[id] : { bg: 'rgba(255,255,255,0.08)', text: '#eaeaf0' }

  return (
    <div className="space-y-5 min-w-0 w-full max-w-full overflow-x-hidden">
      {/* ── World View banner (collapsed by default) ── */}
      <div
        className="rounded-xl overflow-hidden cursor-pointer min-w-0 max-w-full"
        style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
        onClick={() => setShowWV((v) => !v)}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 min-w-0">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="w-2 h-2 shrink-0 rounded-full bg-[var(--teal)]" style={{ boxShadow: '0 0 6px var(--teal)' }} />
            <span className="text-sm font-semibold text-[var(--text)] truncate">{t.feed.worldViewLabel}</span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--teal)]/15 text-[var(--teal)] max-w-full truncate"
              style={{ fontFamily: 'var(--mono)' }}
            >
              {t.feed.worldViewQuestion}
            </span>
          </div>
          <span className="text-[var(--text3)] text-xs shrink-0" style={{ fontFamily: 'var(--mono)' }}>
            {showWorldView ? '▲' : '▼'}
          </span>
        </div>

        {showWorldView && (
          <div className="px-4 pb-4 space-y-4 border-t border-[var(--border)] min-w-0">
            <p className="text-xs text-[var(--text3)] pt-3">
              {t.feed.worldViewDesc}
            </p>
            {worldViewSignals.map((sig) => (
              <div key={sig.id} className="min-w-0">
                <p className="text-sm font-semibold text-[var(--text)] mb-2 break-words">{sig.title}</p>
                {sig.regionalBreakdown && (
                  <WorldViewComparison breakdown={sig.regionalBreakdown} />
                )}
              </div>
            ))}
            <button
              onClick={(e) => { e.stopPropagation(); setCategory('worldview') }}
              className="text-xs font-semibold text-[var(--teal)] hover:underline"
              style={{ fontFamily: 'var(--mono)' }}
            >
              {t.feed.viewWorldView}
            </button>
          </div>
        )}
      </div>

      {/* ── Sort tabs ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
        {SORT_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSortTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all duration-150 min-h-[36px] shrink-0',
              sortTab === tab.id
                ? 'bg-[var(--text)] text-[var(--bg)]'
                : 'text-[var(--text2)] border border-[var(--border2)] hover:border-[var(--border3)] hover:text-[var(--text)]',
            )}
            style={{ fontFamily: 'var(--font)' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Category color pills ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
        {CATEGORY_TAB_IDS.map((tab) => {
          const col = catColor(tab.id)
          const active = category === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id)}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-150 min-h-[32px] shrink-0"
              style={{
                fontFamily: 'var(--mono)',
                background: active ? col.bg : 'transparent',
                color: active ? col.text : 'var(--text3)',
                border: active
                  ? `1px solid ${col.text}40`
                  : '1px solid transparent',
              }}
            >
              {getCategoryTabLabel(tab.id, lang, t.feed.all)}
            </button>
          )
        })}
      </div>

      {/* ── Region-Aware Toggles (Ethical Transparency) ── */}
      <div className="flex flex-wrap items-center gap-2 min-w-0">
        <button
          onClick={() => { setRegion('all'); setCategory('all') }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold transition-all duration-150 min-h-[40px] min-w-0"
          style={{
            fontFamily: 'var(--mono)',
            background: region === 'all' && category === 'all' ? 'rgba(23,213,207,0.12)' : 'var(--surface)',
            color: region === 'all' && category === 'all' ? 'var(--teal)' : 'var(--text2)',
            border: region === 'all' && category === 'all' ? '1px solid rgba(23,213,207,0.3)' : '1px solid var(--border2)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="7" cy="7" rx="3" ry="5.5" stroke="currentColor" strokeWidth="0.8" />
            <line x1="1.5" y1="7" x2="12.5" y2="7" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          <span className="truncate">{t.feed.viewWorld}</span>
        </button>
        <button
          onClick={() => setShowWV((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold transition-all duration-150 min-h-[40px] min-w-0"
          style={{
            fontFamily: 'var(--mono)',
            background: showWorldView ? 'rgba(90,75,255,0.12)' : 'var(--surface)',
            color: showWorldView ? 'var(--accent2)' : 'var(--text2)',
            border: showWorldView ? '1px solid rgba(90,75,255,0.3)' : '1px solid var(--border2)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <rect x="1" y="3" width="5" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
            <rect x="8" y="3" width="5" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className="truncate">{t.feed.compareRegions}</span>
        </button>
      </div>

      {/* ── Region pills ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
        <button
          onClick={() => setRegion('all')}
          className={cn(
            'px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-150 shrink-0',
            region === 'all'
              ? 'bg-[var(--surface3)] text-[var(--text)] border border-[var(--border3)]'
              : 'text-[var(--text3)] hover:text-[var(--text2)]',
          )}
          style={{ fontFamily: 'var(--mono)' }}
        >
          {t.feed.allRegions}
        </button>
        {SIGNAL_REGIONS.map((r) => (
          <button
            key={r.id}
            onClick={() => setRegion(r.id)}
            className={cn(
              'px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-150 shrink-0',
              region === r.id
                ? 'bg-[var(--surface3)] text-[var(--text)] border border-[var(--border3)]'
                : 'text-[var(--text3)] hover:text-[var(--text2)]',
            )}
            style={{ fontFamily: 'var(--mono)' }}
          >
            {getRegionLabelI18n(r.id, lang)}
          </button>
        ))}
      </div>

      {/* ── Signal cards with vote gating ── */}
      <VoteGating voteCount={voteCount}>
        <div className="grid gap-4 feed-grid min-w-0 max-w-full">
          {filteredSignals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} onVote={handleVote} />
          ))}
        </div>
      </VoteGating>

      {filteredSignals.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
            {t.feed.noResults}
          </p>
          <button
            onClick={() => { setCategory('all'); setRegion('all') }}
            className="mt-3 text-xs text-[var(--teal)] hover:underline"
            style={{ fontFamily: 'var(--mono)' }}
          >
            {t.feed.resetFilters}
          </button>
        </div>
      )}
    </div>
  )
}
