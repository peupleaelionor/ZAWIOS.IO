'use client'

/**
 * /propositions — Community subject suggestion page.
 *
 * Users can propose signal topics. Community validates.
 * Platform publishes (editorial control).
 *
 * Design: Blanc Royal — institutional, minimal, no social chaos.
 */

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SuggestionCard } from '@/components/propositions/suggestion-card'
import { SuggestionForm } from '@/components/propositions/suggestion-form'
import { useSuggestions } from '@/hooks/use-suggestions'
import { useLanguage } from '@/components/providers/language-provider'
import { IconPlus } from '@/components/ui/icons'

const ROYAL_BLUE = '#1C39BB'

const STATUS_FILTERS = [
  { value: null, labelFr: 'Tout', labelEn: 'All' },
  { value: 'pending', labelFr: 'En attente', labelEn: 'Pending' },
  { value: 'community_validated', labelFr: 'Validé', labelEn: 'Validated' },
  { value: 'editorial_review', labelFr: 'Revue', labelEn: 'Review' },
  { value: 'approved', labelFr: 'Approuvé', labelEn: 'Approved' },
]

export default function PropositionsPage() {
  const { t } = useLanguage()
  const tp = t.propositions
  const [showForm, setShowForm] = useState(false)

  const {
    suggestions,
    canSubmit,
    submitSuggestion,
    voteSuggestion,
    votedIds,
    filterByStatus,
    activeFilter,
  } = useSuggestions()

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      {/* Header */}
      <section
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}
        aria-label="Page header"
      >
        <div className="container py-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="section-label"
                style={{ color: ROYAL_BLUE }}
              >
                COMMUNITY
              </p>
              <h1
                className="text-2xl sm:text-3xl font-bold text-[var(--text)] mt-1"
                style={{ letterSpacing: '-0.01em' }}
              >
                {tp.pageTitle}
              </h1>
              <p className="mt-2 text-sm text-[var(--text2)] max-w-lg">
                {tp.pageSubtitle}
              </p>
            </div>
            <button
              onClick={() => setShowForm((v) => !v)}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
              style={{
                background: ROYAL_BLUE,
                color: '#fff',
              }}
            >
              <IconPlus size={16} className="w-4 h-4" />
              {tp.suggestCta}
            </button>
          </div>
        </div>
      </section>

      <main className="container py-8" role="main">
        {/* Mobile CTA */}
        <div className="sm:hidden mb-6">
          <button
            onClick={() => setShowForm((v) => !v)}
            className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
            style={{
              background: ROYAL_BLUE,
              color: '#fff',
            }}
          >
            <IconPlus size={16} className="w-4 h-4" />
            {tp.suggestCta}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 max-w-2xl mx-auto">
            <SuggestionForm
              onSubmit={submitSuggestion}
              onCancel={() => setShowForm(false)}
              canSubmit={canSubmit}
            />
          </div>
        )}

        {/* Status filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {STATUS_FILTERS.map((f) => (
            <button
              key={String(f.value)}
              onClick={() => filterByStatus(f.value)}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors"
              style={{
                fontFamily: 'var(--mono)',
                background:
                  activeFilter === f.value
                    ? ROYAL_BLUE
                    : 'transparent',
                color:
                  activeFilter === f.value
                    ? '#fff'
                    : 'var(--text3)',
                border: `1px solid ${
                  activeFilter === f.value
                    ? ROYAL_BLUE
                    : 'var(--border2)'
                }`,
              }}
            >
              {f.labelFr}
            </button>
          ))}
        </div>

        {/* Suggestions grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((sug) => (
            <SuggestionCard
              key={sug.id}
              suggestion={sug}
              voted={votedIds[sug.id] !== undefined}
              votedPositive={votedIds[sug.id]}
              onVote={voteSuggestion}
            />
          ))}
        </div>

        {suggestions.length === 0 && (
          <div className="text-center py-16">
            <p
              className="text-[13px] text-[var(--text3)]"
              style={{ fontFamily: 'var(--mono)' }}
            >
              Aucune proposition pour le moment.
            </p>
          </div>
        )}
      </main>
      <footer><Footer /></footer>
    </div>
  )
}
