'use client'

import { useState, useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { SignalCard } from './signal-card'
import { VoteGating } from './vote-gating'
import { WorldViewComparison } from './world-view-comparison'
import {
  mockSignals,
  SIGNAL_REGIONS,
  CATEGORY_COLORS,
  getWorldViewSignals,
  type SignalRegion,
  type SignalCategory,
} from '@/lib/signals-data'

// ── Category tabs with brand colors ──────────────────────────────────────────
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
  { id: 'work',          labelFr: 'Travail' },
  { id: 'education',     labelFr: 'Éducation' },
  { id: 'health',        labelFr: 'Santé' },
  { id: 'housing',       labelFr: 'Logement' },
  { id: 'climate',       labelFr: 'Climat' },
  { id: 'relationships', labelFr: 'Relations' },
  { id: 'youth',         labelFr: 'Jeunesse' },
  { id: 'spirituality',  labelFr: 'Spiritualité' },
  { id: 'finance',       labelFr: 'Finances' },
  { id: 'geopolitics',   labelFr: 'Géopolitique' },
]

// ── Feed sort tabs ────────────────────────────────────────────────────────────
const SORT_TABS = [
  { id: 'trending', label: 'Tendances' },
  { id: 'latest',   label: 'Récents' },
  { id: 'popular',  label: 'Populaires' },
  { id: 'following', label: 'Suivis' },
]

export function SignalFeed() {
  const [sortTab, setSortTab]         = useState('trending')
  const [category, setCategory]       = useState<SignalCategory | 'all'>('all')
  const [region, setRegion]           = useState<SignalRegion | 'all'>('all')
  const [showWorldView, setShowWV]    = useState(false)
  const [voteCount, setVoteCount]     = useState(0)

  const handleVote = useCallback(() => {
    setVoteCount((c) => c + 1)
  }, [])

  const worldViewSignals = useMemo(() => getWorldViewSignals(3), [])

  const filteredSignals = useMemo(() => {
    let signals = [...mockSignals].filter((s) => s.status === 'active')

    if (category !== 'all')   signals = signals.filter((s) => s.category === category)
    if (region !== 'all')     signals = signals.filter((s) => s.region === region)

    // worldview tab always shows worldview category
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
      case 'following':
        signals = signals.filter((s) => s.createdBy !== null)
        break
      default:
        break
    }

    return signals.slice(0, 15)
  }, [sortTab, category, region])

  const catColor = (id: SignalCategory | 'all') =>
    id !== 'all' ? CATEGORY_COLORS[id] : { bg: 'rgba(255,255,255,0.08)', text: '#eaeaf0' }

  return (
    <div className="space-y-5">

      {/* ── World View banner (collapsed by default) ── */}
      <div
        className="rounded-xl overflow-hidden cursor-pointer"
        style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
        onClick={() => setShowWV((v) => !v)}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[var(--teal)]" style={{ boxShadow: '0 0 6px var(--teal)' }} />
            <span className="text-sm font-semibold text-[var(--text)]">World View</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--teal)]/15 text-[var(--teal)]"
              style={{ fontFamily: 'var(--mono)' }}>
              Comment le monde pense ?
            </span>
          </div>
          <span className="text-[var(--text3)] text-xs" style={{ fontFamily: 'var(--mono)' }}>
            {showWorldView ? '▲' : '▼'}
          </span>
        </div>

        {showWorldView && (
          <div className="px-4 pb-4 space-y-4 border-t border-[var(--border)]">
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
              onClick={(e) => { e.stopPropagation(); setCategory('worldview') }}
              className="text-xs font-semibold text-[var(--teal)] hover:underline"
              style={{ fontFamily: 'var(--mono)' }}
            >
              Voir tous les signaux World View →
            </button>
          </div>
        )}
      </div>

      {/* ── Sort tabs ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {SORT_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSortTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all duration-150 min-h-[36px]',
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
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORY_TABS.map((tab) => {
          const col = catColor(tab.id)
          const active = category === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id)}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-150 min-h-[32px]"
              style={{
                fontFamily: 'var(--mono)',
                background: active ? col.bg : 'transparent',
                color: active ? col.text : 'var(--text3)',
                border: active
                  ? `1px solid ${col.text}40`
                  : '1px solid transparent',
              }}
            >
              {tab.labelFr}
            </button>
          )
        })}
      </div>

      {/* ── Region-Aware Toggles (Ethical Transparency) ── */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => { setRegion('all'); setCategory('all') }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold transition-all duration-150 min-h-[40px]"
          style={{
            fontFamily: 'var(--mono)',
            background: region === 'all' && category === 'all' ? 'rgba(23,213,207,0.12)' : 'var(--surface)',
            color: region === 'all' && category === 'all' ? 'var(--teal)' : 'var(--text2)',
            border: region === 'all' && category === 'all' ? '1px solid rgba(23,213,207,0.3)' : '1px solid var(--border2)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="7" cy="7" rx="3" ry="5.5" stroke="currentColor" strokeWidth="0.8" />
            <line x1="1.5" y1="7" x2="12.5" y2="7" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          Voir Monde
        </button>
        <button
          onClick={() => setShowWV((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold transition-all duration-150 min-h-[40px]"
          style={{
            fontFamily: 'var(--mono)',
            background: showWorldView ? 'rgba(90,75,255,0.12)' : 'var(--surface)',
            color: showWorldView ? 'var(--accent2)' : 'var(--text2)',
            border: showWorldView ? '1px solid rgba(90,75,255,0.3)' : '1px solid var(--border2)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="3" width="5" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
            <rect x="8" y="3" width="5" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
          </svg>
          Comparer régions
        </button>
      </div>

      {/* ── Region pills ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setRegion('all')}
          className={cn(
            'px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-150',
            region === 'all'
              ? 'bg-[var(--surface3)] text-[var(--text)] border border-[var(--border3)]'
              : 'text-[var(--text3)] hover:text-[var(--text2)]',
          )}
          style={{ fontFamily: 'var(--mono)' }}
        >
          Toutes régions
        </button>
        {SIGNAL_REGIONS.map((r) => (
          <button
            key={r.id}
            onClick={() => setRegion(r.id)}
            className={cn(
              'px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-150',
              region === r.id
                ? 'bg-[var(--surface3)] text-[var(--text)] border border-[var(--border3)]'
                : 'text-[var(--text3)] hover:text-[var(--text2)]',
            )}
            style={{ fontFamily: 'var(--mono)' }}
          >
            {r.labelFr}
          </button>
        ))}
      </div>

      {/* ── Signal cards with vote gating ── */}
      <VoteGating voteCount={voteCount}>
        <div className="grid gap-4 feed-grid">
          {filteredSignals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} onVote={handleVote} />
          ))}
        </div>
      </VoteGating>

      {filteredSignals.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
            Aucun signal pour ces filtres.
          </p>
          <button
            onClick={() => { setCategory('all'); setRegion('all') }}
            className="mt-3 text-xs text-[var(--teal)] hover:underline"
            style={{ fontFamily: 'var(--mono)' }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  )
}
