import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { Button } from '@/components/ui/button'
import { IconTarget, IconPlus, IconTrending, IconUsers, IconChart } from '@/components/ui/icons'
import { mockPredictions, PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signaux | ZAWIOS',
  description: 'Explorez les signaux sur ZAWIOS. Votez, analysez et comparez vos projections avec le collectif. Intelligence collective structurée.',
  keywords: ['signaux', 'intelligence collective', 'vote', 'analyse', 'projection', 'forecasting', 'crowd wisdom'],
  openGraph: {
    title: 'Signaux | ZAWIOS',
    description: 'Explorez les signaux sur ZAWIOS. Votez, analysez et comparez vos projections avec le collectif.',
    type: 'website',
    url: 'https://zawios.io/signals',
  },
}

const categories = [
  { value: 'all', label: 'All' },
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'politics', label: 'Politics' },
  { value: 'science', label: 'Science' },
  { value: 'sports', label: 'Sports' },
  { value: 'business', label: 'Business' },
  { value: 'culture', label: 'Culture' },
  { value: 'world', label: 'World' },
]

export default function SignalsPage() {
  const resolved = mockPredictions.filter((p) => p.status === 'resolved').length

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      {/* Header */}
      <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }} aria-label="Page header">
        <div className="container py-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="section-label">Intelligence collective</p>
              <h1 className="text-3xl font-bold text-[var(--text)] mt-1" style={{ letterSpacing: '-0.01em' }}>
                Signaux
              </h1>
              <p className="mt-2 text-sm text-[var(--text2)]">
                Votez sur les signaux actifs et suivez l&apos;intelligence collective en temps réel
              </p>
            </div>
            <Link href="/signals/create" className="hidden sm:block">
              <Button size="sm" className="gap-1.5">
                <IconPlus className="w-4 h-4" size={16} />
                Nouveau signal
              </Button>
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-6 mt-7 pt-6" style={{ borderTop: '1px solid var(--border)' }} role="region" aria-label="Platform statistics">
            {[
              { icon: IconTrending, value: formatNumber(mockPredictions.length), label: 'signaux' },
              { icon: IconUsers, value: formatNumber(PLATFORM_STATS.total_votes), label: 'votes' },
              { icon: IconChart, value: `${PLATFORM_STATS.avg_accuracy}%`, label: 'précision moy.' },
              { icon: IconTarget, value: String(resolved), label: 'résolus' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon size={14} style={{ color: 'var(--text3)' }} aria-hidden="true" />
                <span className="text-sm font-semibold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>
                  {stat.value}
                </span>
                <span className="text-xs text-[var(--text3)]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="container py-8" role="main">
        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-8" role="region" aria-label="Category filters">
          {categories.map((cat, i) => (
            <button
              key={cat.value}
              className="px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors"
              style={
                i === 0
                  ? { background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)' }
                  : { borderColor: 'var(--border2)', color: 'var(--text2)' }
              }
            >
              {cat.label}
            </button>
          ))}
          <button className="ml-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors"
            style={{ borderColor: 'var(--border2)', color: 'var(--text2)' }}>
            <IconTarget className="w-3.5 h-3.5" size={14} />
            Filtrer
          </button>
        </div>

        {/* Mobile create CTA */}
        <div className="sm:hidden mb-6">
          <Link href="/signals/create" className="block">
            <Button size="sm" className="gap-1.5 w-full">
              <IconPlus className="w-4 h-4" size={16} />
              Nouveau signal
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" role="region" aria-label="Signals list">
          {mockPredictions.map((prediction) => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      </main>
      <footer><Footer /></footer>
    </div>
  )
}
