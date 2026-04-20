'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { SignalCard } from './signal-card'
import { SignalFeedSkeleton } from './signal-card-skeleton'
import { WorldViewComparison } from './world-view-comparison'
import {
  SIGNAL_REGIONS,
  CATEGORY_COLORS,
  getWorldViewSignals,
  type SignalRegion,
  type SignalCategory,
} from '@/lib/signals-data'
import { useSignals } from '@/hooks/useSignals'
import { useSignalVote } from '@/hooks/useSignalVote'
import { useUIStore } from '@/lib/stores/ui'

// ── Category tabs ─────────────────────────────────────────────────────────────
const CATEGORY_TABS: { id: SignalCategory | 'all'; labelFr: string; emoji?: string }[] = [
  { id: 'all',           labelFr: 'Tous' },
  { id: 'worldview',     labelFr: 'World View',    emoji: '🌍' },
  { id: 'news',          labelFr: 'Actu',           emoji: '📰' },
  { id: 'tech',          labelFr: 'Tech & IA',      emoji: '🤖' },
  { id: 'business',      labelFr: 'Business',       emoji: '📈' },
  { id: 'crypto',        labelFr: 'Crypto',         emoji: '🔐' },
  { id: 'sports',        labelFr: 'Sport',          emoji: '⚽' },
  { id: 'culture',       labelFr: 'Culture',        emoji: '🎭' },
  { id: 'society',       labelFr: 'Société',        emoji: '👥' },
  { id: 'entertainment', labelFr: 'Divertissement', emoji: '🎬' },
  { id: 'trends',        labelFr: 'Tendances',      emoji: '🔥' },
  { id: 'fun',           labelFr: 'Fun',            emoji: '😄' },
  { id: 'work',          labelFr: 'Travail',        emoji: '💼' },
  { id: 'education',     labelFr: 'Éducation',      emoji: '🎓' },
  { id: 'health',        labelFr: 'Santé',          emoji: '🏥' },
  { id: 'housing',       labelFr: 'Logement',       emoji: '🏠' },
  { id: 'climate',       labelFr: 'Climat',         emoji: '🌱' },
  { id: 'relationships', labelFr: 'Relations',      emoji: '💬' },
  { id: 'youth',         labelFr: 'Jeunesse',       emoji: '✨' },
  { id: 'spirituality',  labelFr: 'Spiritualité',   emoji: '🙏' },
  { id: 'finance',       labelFr: 'Finances',       emoji: '💰' },
  { id: 'geopolitics',   labelFr: 'Géopolitique',   emoji: '🗺️' },
]

const SORT_TABS = [
  { id: 'trending',  label: 'Tendances' },
  { id: 'latest',    label: 'Récents' },
  { id: 'popular',   label: 'Populaires' },
  { id: 'following', label: 'Suivis' },
]

type SortId = typeof SORT_TABS[number]['id']

export function SignalFeed() {
  // ── Zustand UI state ──────────────────────────────────────────────────────
  const {
    feedSort,     setFeedSort,
    feedCategory, setFeedCategory,
    feedRegion,   setFeedRegion,
    showWorldView, toggleWorldView,
    resetFeedFilters,
  } = useUIStore()

  // ── React Query data ──────────────────────────────────────────────────────
  const sortParam = (feedSort === 'following' ? 'trending' : feedSort) as 'trending' | 'latest' | 'popular'
  const { data: signals = [], isLoading } = useSignals({
    category: feedCategory,
    region:   feedRegion,
    sort:     sortParam,
    limit:    20,
  })

  const { mutate: castVote } = useSignalVote()
  const worldViewSignals = useMemo(() => getWorldViewSignals(3), [])

  const catColor = (id: SignalCategory | 'all') =>
    id !== 'all' ? CATEGORY_COLORS[id] : { bg: 'rgba(255,255,255,0.08)', text: '#f0f0f8' }

  return (
    <div className="space-y-4">

      {/* ── Sort tabs ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {SORT_TABS.map((tab) => {
          const active = feedSort === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setFeedSort(tab.id as 'trending' | 'latest' | 'popular' | 'following')}
              className={cn(
                'px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all duration-150 min-h-[36px]',
                active ? 'text-[var(--bg)]' : 'text-[var(--text2)] hover:text-[var(--text)]',
              )}
              style={{
                background: active ? 'var(--text)' : 'var(--surface)',
                border:     active ? '1px solid transparent' : '1px solid var(--border2)',
                fontFamily: 'var(--font)',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── Category color pills ───────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORY_TABS.map((tab) => {
          const col    = catColor(tab.id)
          const active = feedCategory === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setFeedCategory(tab.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-150 min-h-[32px]"
              style={{
                fontFamily: 'var(--mono)',
                background: active ? col.bg : 'var(--surface)',
                color:      active ? col.text : 'var(--text3)',
                border:     active ? `1px solid ${col.text}40` : '1px solid var(--border)',
              }}
            >
              {tab.emoji && <span style={{ fontSize: 11 }}>{tab.emoji}</span>}
              {tab.labelFr}
            </button>
          )
        })}
      </div>

      {/* ── Region pills ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setFeedRegion('all')}
          className={cn(
            'px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-150',
          )}
          style={{
            fontFamily: 'var(--mono)',
            background: feedRegion === 'all' ? 'var(--surface3)' : 'transparent',
            border:     feedRegion === 'all' ? '1px solid var(--border3)' : '1px solid transparent',
            color:      feedRegion === 'all' ? 'var(--text)' : 'var(--text3)',
          }}
        >
          🌐 Toutes régions
        </button>
        {SIGNAL_REGIONS.map((r) => (
          <button
            key={r.id}
            onClick={() => setFeedRegion(r.id as SignalRegion)}
            className="px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-150"
            style={{
              fontFamily: 'var(--mono)',
              background: feedRegion === r.id ? 'var(--surface3)' : 'transparent',
              border:     feedRegion === r.id ? '1px solid var(--border3)' : '1px solid transparent',
              color:      feedRegion === r.id ? 'var(--text)' : 'var(--text3)',
            }}
          >
            {r.labelFr}
          </button>
        ))}
      </div>

      {/* ── World View collapsible banner ──────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden cursor-pointer transition-all"
        style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
        onClick={toggleWorldView}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--teal)', boxShadow: '0 0 6px var(--teal)' }}
            />
            <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>🌍 World View</span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(29,228,222,0.12)', color: 'var(--teal)', fontFamily: 'var(--mono)' }}
            >
              Comment le monde pense ?
            </span>
          </div>
          <span className="text-[10px]" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
            {showWorldView ? '▲' : '▼'}
          </span>
        </div>

        {showWorldView && (
          <div className="px-4 pb-4 space-y-4" style={{ borderTop: '1px solid var(--border)' }}>
            <p className="text-xs pt-3" style={{ color: 'var(--text3)' }}>
              Signaux cross-régionaux — compare Afrique · France · Europe · USA.
            </p>
            {worldViewSignals.map((sig) => (
              <div key={sig.id}>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{sig.title}</p>
                {sig.regionalBreakdown && (
                  <WorldViewComparison breakdown={sig.regionalBreakdown} />
                )}
              </div>
            ))}
            <button
              onClick={(e) => { e.stopPropagation(); setFeedCategory('worldview') }}
              className="text-xs font-semibold hover:underline"
              style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}
            >
              {t.feed.viewWorldView}
            </button>
          </div>
        )}
      </div>

      {/* ── Signal cards grid ──────────────────────────────────────────────── */}
      {isLoading ? (
        <SignalFeedSkeleton count={6} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {signals.map((signal) => (
            <SignalCard
              key={signal.id}
              signal={signal}
              onVote={(id, vote) => castVote({ signalId: id, voteType: vote })}
            />
          ))}
        </div>
      )}

      {/* ── Empty state ───────────────────────────────────────────────────── */}
      {!isLoading && signals.length === 0 && (
        <div
          className="text-center py-16 rounded-2xl"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p className="text-sm mb-3" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
            Aucun signal pour ces filtres.
          </p>
          <button
            onClick={resetFeedFilters}
            className="text-xs font-semibold hover:underline"
            style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}
          >
            {t.feed.resetFilters}
          </button>
        </div>
      )}
    </div>
  )
}
