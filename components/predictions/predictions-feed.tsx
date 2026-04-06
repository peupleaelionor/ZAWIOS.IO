'use client'
import { useState, useMemo } from 'react'
import { PredictionCard } from '@/components/predictions/prediction-card'
import type { Prediction } from '@/types'

type Tab = 'trending' | 'latest' | 'following' | 'popular'
type Category = 'all' | string

const TABS: { value: Tab; label: string }[] = [
  { value: 'trending', label: 'Tendances' },
  { value: 'latest', label: 'Récents' },
  { value: 'following', label: 'Abonnements' },
  { value: 'popular', label: 'Populaires' },
]

const CATEGORIES = [
  { value: 'all', label: 'Tout' },
  { value: 'technology', label: 'Tech' },
  { value: 'finance', label: 'Finance' },
  { value: 'politics', label: 'Politique' },
  { value: 'science', label: 'Science' },
  { value: 'sports', label: 'Sport' },
  { value: 'business', label: 'Business' },
  { value: 'culture', label: 'Culture' },
  { value: 'world', label: 'Monde' },
]

interface PredictionsFeedProps {
  predictions: Prediction[]
}

export function PredictionsFeed({ predictions }: PredictionsFeedProps) {
  const [tab, setTab] = useState<Tab>('trending')
  const [category, setCategory] = useState<Category>('all')

  const filtered = useMemo(() => {
    let list = [...predictions]

    // Filtre catégorie
    if (category !== 'all') {
      list = list.filter((p) => p.category === category)
    }

    // Tri selon l'onglet
    switch (tab) {
      case 'trending':
        list = list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.vote_count - a.vote_count)
        break
      case 'latest':
        list = list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'following':
        // Placeholder : même logique que trending (nécessite auth)
        list = list.sort((a, b) => b.vote_count - a.vote_count)
        break
      case 'popular':
        list = list.sort((a, b) => b.view_count - a.view_count)
        break
    }

    return list
  }, [predictions, tab, category])

  return (
    <div>
      {/* Onglets principaux */}
      <div
        className="flex gap-1 mb-5 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={
              tab === t.value
                ? { background: 'var(--text)', color: 'var(--bg)' }
                : { color: 'var(--text3)', border: '1px solid var(--border)' }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filtres catégorie */}
      <div
        className="flex gap-1.5 mb-7 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors"
            style={
              category === cat.value
                ? { background: 'var(--surface3)', color: 'var(--text)', border: '1px solid var(--border2)' }
                : { color: 'var(--text3)', border: '1px solid var(--border)' }
            }
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grille */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm" style={{ color: 'var(--text3)' }}>
            Aucune prédiction dans cette catégorie.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((prediction) => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      )}
    </div>
  )
}
