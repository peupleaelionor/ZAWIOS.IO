import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { IconTrending, IconChart, IconUsers, IconZap } from '@/components/ui/icons'
import { mockCategoryInsights, mockTrends, PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Explorez les tendances, signaux collectifs et analyses de la communauté ZAWIOS.',
}

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="container py-12">
        <div className="mb-10">
          <p className="section-label">Analyses de la plateforme</p>
          <h1 className="text-3xl font-bold text-[var(--text)]">Données &amp; Tendances</h1>
          <p className="mt-2 text-[var(--text2)]">
            Ce que le collectif analyse, et où la précision est la plus élevée
          </p>
        </div>

        {/* Platform stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Analystes', value: formatNumber(PLATFORM_STATS.total_users), icon: IconUsers, color: 'var(--accent)' },
            { label: 'Signaux émis', value: formatNumber(PLATFORM_STATS.total_predictions), icon: IconTrending, color: 'var(--accent2)' },
            { label: 'Votes', value: formatNumber(PLATFORM_STATS.total_votes), icon: IconChart, color: 'var(--teal)' },
            { label: 'Précision moy.', value: `${PLATFORM_STATS.avg_accuracy}%`, icon: IconZap, color: 'var(--amber)' },
          ].map((stat) => (
            <div key={stat.label} className="surface rounded-2xl p-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `color-mix(in srgb, ${stat.color} 15%, transparent)`, color: stat.color }}
              >
                <stat.icon className="w-5 h-5" size={20} />
              </div>
              <p className="text-2xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>{stat.value}</p>
              <p className="text-sm text-[var(--text3)] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Category breakdown */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-6">Activity by category</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {mockCategoryInsights.map((insight) => (
              <div key={insight.category} className="surface rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[var(--text)] capitalize">{insight.label}</h3>
                      {insight.trending && (
                        <Badge variant="default" className="gap-1 text-xs">
                          <IconTrending className="w-2.5 h-2.5" size={10} />
                          Hot
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text3)] mt-1">{insight.prediction_count} predictions · {formatNumber(insight.vote_count)} votes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold" style={{
                      color: insight.avg_accuracy >= 70 ? 'var(--teal)' : insight.avg_accuracy >= 60 ? 'var(--amber)' : 'var(--text2)',
                      fontFamily: 'var(--mono)',
                    }}>
                      {insight.avg_accuracy}%
                    </p>
                    <p className="text-xs text-[var(--text3)]">avg accuracy</p>
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface3)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(insight.vote_count / 130000) * 100}%`, background: 'var(--accent)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth trend */}
        <div className="surface rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-6">Platform growth</h2>
          <div className="space-y-4">
            {mockTrends.map((trend) => (
              <div key={trend.date} className="grid grid-cols-4 gap-4 items-center">
                <span className="text-sm font-medium text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>{trend.date}</span>
                <div className="col-span-3 grid grid-cols-3 gap-2">
                  {[
                    { label: 'Predictions', value: trend.predictions, max: 700, color: 'var(--accent)' },
                    { label: 'Votes', value: trend.votes, max: 60000, color: 'var(--accent2)' },
                    { label: 'New users', value: trend.new_users, max: 11000, color: 'var(--teal)' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[var(--text3)]">{item.label}</span>
                        <span className="text-xs font-medium text-[var(--text2)]" style={{ fontFamily: 'var(--mono)' }}>
                          {typeof item.value === 'number' && item.value > 999 ? formatNumber(item.value) : item.value}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface3)' }}>
                        <div className="h-full rounded-full" style={{ width: `${(item.value / item.max) * 100}%`, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
