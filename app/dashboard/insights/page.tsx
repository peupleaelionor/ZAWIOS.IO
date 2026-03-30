import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { mockCategoryInsights } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Lock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights',
}

export default function DashboardInsightsPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">My Insights</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Your personal prediction analytics</p>
      </div>

      {/* Personal stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Best category', value: 'Technology', sub: '73% accuracy' },
          { label: 'Worst category', value: 'Politics', sub: '48% accuracy' },
          { label: 'Prediction streak', value: '7 days', sub: 'Keep it up!' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
            <p className="text-sm text-zinc-500 mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
            <p className="text-xs text-zinc-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Category accuracy</h2>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
          {mockCategoryInsights.slice(0, 5).map((insight) => (
            <div key={insight.category}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 capitalize">{insight.label}</span>
                  {insight.trending && (
                    <Badge variant="default" className="gap-1 text-xs">
                      <TrendingUp className="w-2.5 h-2.5" />
                      Hot
                    </Badge>
                  )}
                </div>
                <span className={`text-sm font-bold ${insight.avg_accuracy >= 65 ? 'text-emerald-600' : 'text-zinc-600'}`}>
                  {insight.avg_accuracy}%
                </span>
              </div>
              <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${insight.avg_accuracy >= 65 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                  style={{ width: `${insight.avg_accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium upsell */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Advanced analytics with Premium</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 max-w-sm mx-auto">
          Get full historical performance charts, detailed accuracy breakdowns, and CSV exports.
        </p>
        <Link href="/pricing">
          <Button size="sm">Upgrade to Premium</Button>
        </Link>
      </div>
    </DashboardLayout>
  )
}
