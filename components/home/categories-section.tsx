import Link from 'next/link'
import { SignalVisual } from '@/components/ui/signal-visual'
import { allPredictions } from '@/lib/mock-data'
import type { Category } from '@/types'

const CATEGORIES: { value: Category | string; label: string }[] = [
  { value: 'technology', label: 'Tech & IA' },
  { value: 'finance',    label: 'Finance' },
  { value: 'future',     label: 'Futur' },
  { value: 'africa',     label: 'Afrique' },
  { value: 'science',    label: 'Science & Climat' },
  { value: 'work',       label: 'Travail' },
  { value: 'politics',   label: 'Politique' },
  { value: 'education',  label: 'Éducation' },
  { value: 'lifestyle',  label: 'Société' },
  { value: 'world',      label: 'Monde' },
  { value: 'business',   label: 'Business' },
  { value: 'culture',    label: 'Culture' },
  { value: 'sports',     label: 'Sport' },
]

export function CategoriesSection() {
  const countByCategory = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.value] = allPredictions.filter((p) => p.category === cat.value).length
    return acc
  }, {})

  return (
    <section className="py-24" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="mb-12">
          <p className="section-label">Explorer</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-1" style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}>
            13 catégories, des milliers de signaux
          </h2>
          <p className="mt-3 text-sm" style={{ color: 'var(--text2)' }}>
            De l'intelligence artificielle au climat, votez sur tout ce qui façonne le monde.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/signals`}
              className="group block rounded-xl overflow-hidden card-hover"
              style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
            >
              {/* Thumbnail */}
              <div style={{ height: 64, overflow: 'hidden' }}>
                <SignalVisual category={cat.value} />
              </div>

              {/* Label */}
              <div className="px-3 py-2.5">
                <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{cat.label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                  {countByCategory[cat.value] ?? 0} signaux
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
