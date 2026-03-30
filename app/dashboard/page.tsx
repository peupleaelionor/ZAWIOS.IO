import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { StatCard } from '@/components/ui/stat-card'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { Badge } from '@/components/ui/badge'
import { mockPredictions, mockLeaderboard } from '@/lib/mock-data'
import { Award, Target, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  const trendingPredictions = mockPredictions.filter((p) => p.featured).slice(0, 3)
  const activePredictions = mockPredictions.filter((p) => p.status === 'open').slice(0, 3)
  const topPredictor = mockLeaderboard[0]

  return (
    <DashboardLayout>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Good morning 👋</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Here&apos;s what&apos;s happening on ZAWIOS today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Your score" value={4218} icon={Award} trend={12} />
        <StatCard label="Accuracy rate" value="67%" icon={Target} />
        <StatCard label="Predictions" value={42} icon={TrendingUp} trend={3} />
        <StatCard label="Global rank" value="#24" icon={Users} />
      </div>

      {/* Trending */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Trending predictions</h2>
            <p className="text-sm text-zinc-500">Most active in the last 24 hours</p>
          </div>
          <Link href="/predictions">
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {trendingPredictions.map((p) => (
            <PredictionCard key={p.id} prediction={p} compact />
          ))}
        </div>
      </section>

      {/* Active predictions */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Open predictions</h2>
            <p className="text-sm text-zinc-500">Questions still accepting votes</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {activePredictions.map((p) => (
            <PredictionCard key={p.id} prediction={p} compact />
          ))}
        </div>
      </section>

      {/* Platform activity */}
      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Platform today</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
            <p className="text-sm text-zinc-500 mb-1">New predictions</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">23</p>
            <Badge variant="success" className="mt-2">+8 today</Badge>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
            <p className="text-sm text-zinc-500 mb-1">Total votes today</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">1,847</p>
            <Badge variant="success" className="mt-2">+12% vs yesterday</Badge>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
            <p className="text-sm text-zinc-500 mb-1">Top predictor today</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{topPredictor.user.full_name}</span>
              <Badge variant="default">{topPredictor.accuracy_rate}%</Badge>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}
