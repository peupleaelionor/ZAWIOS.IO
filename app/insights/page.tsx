import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { mockCategoryInsights, mockTrends, PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { TrendingUp, BarChart2, Users, Zap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Explore trends, crowd signals, and analytics from the ZAWIOS prediction community.',
}

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main className="container py-12">
        <div className="mb-10">
          <Badge variant="outline" className="mb-3">Platform insights</Badge>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Data &amp; Trends</h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            What the crowd is predicting, and where accuracy is highest
          </p>
        </div>

        {/* Platform stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total predictors', value: formatNumber(PLATFORM_STATS.total_users), icon: Users, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' },
            { label: 'Predictions made', value: formatNumber(PLATFORM_STATS.total_predictions), icon: TrendingUp, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30' },
            { label: 'Votes cast', value: formatNumber(PLATFORM_STATS.total_votes), icon: BarChart2, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30' },
            { label: 'Avg accuracy', value: `${PLATFORM_STATS.avg_accuracy}%`, icon: Zap, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
              <p className="text-sm text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Category breakdown */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">Activity by category</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {mockCategoryInsights.map((insight) => (
              <div key={insight.category} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 capitalize">{insight.label}</h3>
                      {insight.trending && (
                        <Badge variant="default" className="gap-1 text-xs">
                          <TrendingUp className="w-2.5 h-2.5" />
                          Hot
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 mt-1">{insight.prediction_count} predictions · {formatNumber(insight.vote_count)} votes</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${insight.avg_accuracy >= 70 ? 'text-emerald-600' : insight.avg_accuracy >= 60 ? 'text-amber-600' : 'text-zinc-600'}`}>
                      {insight.avg_accuracy}%
                    </p>
                    <p className="text-xs text-zinc-400">avg accuracy</p>
                  </div>
                </div>
                <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                    style={{ width: `${(insight.vote_count / 130000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth trend */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">Platform growth</h2>
          <div className="space-y-4">
            {mockTrends.map((trend) => (
              <div key={trend.date} className="grid grid-cols-4 gap-4 items-center">
                <span className="text-sm font-medium text-zinc-500">{trend.date}</span>
                <div className="col-span-3 grid grid-cols-3 gap-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-zinc-400">Predictions</span>
                      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{trend.predictions}</span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(trend.predictions / 700) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-zinc-400">Votes</span>
                      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{formatNumber(trend.votes)}</span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(trend.votes / 60000) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-zinc-400">New users</span>
                      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{formatNumber(trend.new_users)}</span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(trend.new_users / 11000) * 100}%` }} />
                    </div>
                  </div>
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
