import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PredictionsFeed } from '@/components/predictions/predictions-feed'
import { Button } from '@/components/ui/button'
import { IconTarget, IconPlus, IconTrending, IconUsers, IconChart } from '@/components/ui/icons'
import { allPredictions, PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prédictions',
  description: 'Explorez les prédictions, votez et comparez vos intuitions avec la foule.',
}

export default function PredictionsPage() {
  const resolved = allPredictions.filter((p) => p.status === 'resolved').length

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      {/* En-tête */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container py-8 md:py-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="section-label">Communauté</p>
              <h1 className="text-2xl md:text-3xl font-bold mt-1" style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}>
                Prédictions
              </h1>
              <p className="mt-1.5 text-sm" style={{ color: 'var(--text2)' }}>
                Votez, comparez, construisez votre réputation
              </p>
            </div>
            <Link href="/predictions/create" className="hidden sm:block flex-shrink-0">
              <Button size="sm" className="gap-1.5">
                <IconPlus size={15} />
                Créer
              </Button>
            </Link>
          </div>

          {/* Barre de stats */}
          <div
            className="flex items-center gap-4 md:gap-6 mt-6 pt-5 overflow-x-auto"
            style={{ borderTop: '1px solid var(--border)', scrollbarWidth: 'none' }}
          >
            {[
              { icon: IconTrending, value: formatNumber(allPredictions.length), label: 'prédictions' },
              { icon: IconUsers, value: formatNumber(PLATFORM_STATS.total_votes), label: 'votes' },
              { icon: IconChart, value: `${PLATFORM_STATS.avg_accuracy}%`, label: 'précision moy.' },
              { icon: IconTarget, value: String(resolved), label: 'résolues' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-1.5 flex-shrink-0">
                <stat.icon size={13} style={{ color: 'var(--text3)' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>
                  {stat.value}
                </span>
                <span className="text-xs" style={{ color: 'var(--text3)' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="container py-6 md:py-8">
        {/* CTA mobile */}
        <div className="sm:hidden mb-5">
          <Link href="/predictions/create">
            <Button size="sm" className="gap-1.5 w-full">
              <IconPlus size={15} />
              Créer une prédiction
            </Button>
          </Link>
        </div>

        <PredictionsFeed predictions={allPredictions} />
      </main>

      <Footer />
    </div>
  )
}
