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
const CATEGORY_TABS: { id: SignalCategory | 'all'; labelFr: string }[] = [
  { id: 'all',           labelFr: 'Tous' },
  { id: 'worldview',     labelFr: 'World View' },
  { id: 'news',          labelFr: 'Actu' },
  { id: 'tech',          labelFr: 'Tech & IA' },
  { id: 'business',      labelFr: 'Business' },
  { id: 'crypto',        labelFr: 'Crypto' },
  { id: 'sports',        labelFr: 'Sport' },
  { id: 'culture',       labelFr: 'Culture' },
  { id: 'society',       labelFr: 'Société' },
  { id: 'entertainment', labelFr: 'Divertissement' },
  { id: 'trends',        labelFr: 'Tendances' },
  { id: 'fun',           labelFr: 'Fun' },
]

const SORT_TABS = [
  { id: 'trending',  label: 'Tendances' },
  { id: 'latest',    label: 'Récents' },
  { id: 'popular',   label: 'Populaires' },
  { id: 'following', label: 'Suivis' },
]

export function SignalFeed() {
  // ── State from Zustand (UI-only) ──────────────────────────────────────────
  const {
    feedSort,     setFeedSort,
    feedCategory, setFeedCategory,
    feedRegion,   setFeedRegion,
    showWorldView, toggleWorldView,
    resetFeedFilters,
  } = useUIStore()

  // ── Server data from React Query ──────────────────────────────────────────
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
    id !== 'all' ? CATEGORY_COLORS[id] : { bg: 'rgba(255,255,255,0.08)', text: '#eaeaf0' }

  return (
    <div className="space-y-5">

      {/* ── World View banner ─────────────────────────────────────────────── */}
      <div
        className="rounded-xl overflow-hidden cursor-pointer"
        style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
        onClick={toggleWorldView}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--teal)', boxShadow: '0 0 6px var(--teal)' }}
            />
            <span className="text-sm font-semibold text-[var(--text)]">World View</span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: 'color-mix(in srgb,var(--teal) 15%,transparent)', color: 'var(--teal)', fontFamily: 'var(--mono)' }}
            >
              Comment le monde pense ?
            </span>
          </div>
          <span className="text-[var(--text3)] text-xs" style={{ fontFamily: 'var(--mono)' }}>
            {showWorldView ? '▲' : '▼'}
          </span>
        </div>

        {showWorldView && (
          <div
            className="px-4 pb-4 space-y-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <p className="text-xs text-[var(--text3)] pt-3">
              Signaux cross-régionaux — compare l'opinion de l'Afrique, la France, l'Europe et les USA.
            </p>
            {worldViewSignals.map((sig) => (
              <div key={sig.id}>
                <p className="text-sm font-semibold text-[var(--text)] mb-2">{sig.title}</p>
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
              Voir tous les signaux World View →
            </button>
          </div>
        )}
      </div>

      {/* ── Sort tabs ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {SORT_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFeedSort(tab.id as typeof feedSort)}
            className={cn(
              'px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all duration-150 min-h-[36px]',
              feedSort === tab.id
                ? 'text-[var(--bg)]'
                : 'text-[var(--text2)] hover:text-[var(--text)]',
            )}
            style={{
              fontFamily:   'var(--font)',
              background:   feedSort === tab.id ? 'var(--text)' : 'transparent',
              border:       feedSort === tab.id ? '1px solid transparent' : '1px solid var(--border2)',
            }}
          >
            {tab.label}
          </button>
        ))}
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
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-150 min-h-[32px]"
              style={{
                fontFamily: 'var(--mono)',
                background: active ? col.bg : 'transparent',
                color:      active ? col.text : 'var(--text3)',
                border:     active ? `1px solid ${col.text}40` : '1px solid transparent',
              }}
            >
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
            feedRegion === 'all'
              ? 'text-[var(--text)]'
              : 'text-[var(--text3)] hover:text-[var(--text2)]',
          )}
          style={{
            fontFamily: 'var(--mono)',
            background: feedRegion === 'all' ? 'var(--surface3)' : 'transparent',
            border:     feedRegion === 'all' ? '1px solid var(--border3)' : '1px solid transparent',
          }}
        >
          Toutes régions
        </button>
        {SIGNAL_REGIONS.map((r) => (
          <button
            key={r.id}
            onClick={() => setFeedRegion(r.id as SignalRegion)}
            className={cn(
              'px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-150',
              feedRegion === r.id
                ? 'text-[var(--text)]'
                : 'text-[var(--text3)] hover:text-[var(--text2)]',
            )}
            style={{
              fontFamily: 'var(--mono)',
              background: feedRegion === r.id ? 'var(--surface3)' : 'transparent',
              border:     feedRegion === r.id ? '1px solid var(--border3)' : '1px solid transparent',
            }}
          >
            {r.labelFr}
          </button>
        ))}
      </div>

      {/* ── Signal cards ──────────────────────────────────────────────────── */}
      {isLoading ? (
        <SignalFeedSkeleton count={6} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="text-center py-16">
          <p
            className="text-sm"
            style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
          >
            Aucun signal pour ces filtres.
          </p>
          <button
            onClick={resetFeedFilters}
            className="mt-3 text-xs hover:underline"
            style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  )
}
