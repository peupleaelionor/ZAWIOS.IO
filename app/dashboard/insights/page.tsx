import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { mockCategoryInsights } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Target, Flame, Calendar, BarChart2 } from 'lucide-react'
import { UpgradePrompt } from '@/components/upgrade-prompt'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights',
}

const monthlyPerformance = [
  { month: 'Oct', correct: 8, total: 12 },
  { month: 'Nov', correct: 11, total: 15 },
  { month: 'Dec', correct: 9, total: 14 },
  { month: 'Jan', correct: 14, total: 18 },
  { month: 'Feb', correct: 12, total: 16 },
  { month: 'Mar', correct: 15, total: 19 },
]

export default function DashboardInsightsPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">My Insights</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Your personal prediction analytics</p>
      </div>

      {/* Personal stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Target, label: 'Best category', value: 'Technology', sub: '73% accuracy', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30' },
          { icon: BarChart2, label: 'Worst category', value: 'Politics', sub: '48% accuracy', color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/30' },
          { icon: Flame, label: 'Current streak', value: '7 days', sub: 'Keep it going', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30' },
          { icon: Calendar, label: 'Active since', value: 'Oct 2024', sub: '6 months', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <p className="text-xs text-zinc-500 mb-0.5">{stat.label}</p>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Monthly performance */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Monthly accuracy</h2>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
          <div className="flex items-end gap-3 h-40">
            {monthlyPerformance.map((m) => {
              const pct = Math.round((m.correct / m.total) * 100)
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">{pct}%</span>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full relative" style={{ height: '100px' }}>
                    <div
                      className={`absolute bottom-0 w-full rounded-full ${pct >= 70 ? 'bg-emerald-500' : pct >= 55 ? 'bg-indigo-500' : 'bg-amber-500'}`}
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-500">{m.month}</span>
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <p className="text-sm text-zinc-500">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">69</span> correct out of <span className="font-semibold text-zinc-900 dark:text-zinc-100">94</span> predictions
            </p>
            <Badge variant="success">73% overall</Badge>
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Category accuracy</h2>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
          {mockCategoryInsights.slice(0, 6).map((insight) => (
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
                <span className={`text-sm font-bold ${insight.avg_accuracy >= 65 ? 'text-emerald-600' : 'text-zinc-600 dark:text-zinc-400'}`}>
                  {insight.avg_accuracy}%
                </span>
              </div>
              <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${insight.avg_accuracy >= 65 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                  style={{ width: `${insight.avg_accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium upsell — using UpgradePrompt component */}
      <UpgradePrompt
        currentPlan="free"
        feature="advanced analytics"
        source="dashboard_insights"
      />
    </DashboardLayout>
  )
}
