import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { StatCard } from '@/components/ui/stat-card'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { Badge } from '@/components/ui/badge'
import { mockPredictions, mockLeaderboard } from '@/lib/mock-data'
import { Award, Target, TrendingUp, Users, ArrowRight, Clock, MessageSquare, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

const recentActivity = [
  { icon: ThumbsUp, text: 'You voted Yes on "Will AI surpass human benchmarks by end 2025?"', time: '2 min ago', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' },
  { icon: TrendingUp, text: 'Your prediction on Bitcoin is trending — 9.2K votes', time: '1 hour ago', color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' },
  { icon: Award, text: 'You moved up to rank #24 on the global leaderboard', time: '3 hours ago', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30' },
  { icon: MessageSquare, text: 'New comment on your Fed Funds Rate prediction', time: '5 hours ago', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30' },
  { icon: Target, text: '"UK general election" resolved — your prediction was correct', time: 'Yesterday', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' },
]

export default function DashboardPage() {
  const trendingPredictions = mockPredictions.filter((p) => p.featured).slice(0, 3)
  const topPredictor = mockLeaderboard[0]

  return (
    <DashboardLayout>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Good morning</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Here&apos;s what&apos;s happening on ZAWIOS today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Your score" value={4218} icon={Award} trend={12} />
        <StatCard label="Accuracy rate" value="67%" icon={Target} />
        <StatCard label="Predictions" value={42} icon={TrendingUp} trend={3} />
        <StatCard label="Global rank" value="#24" icon={Users} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Recent activity */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Recent activity</h2>
            <Badge variant="outline" className="text-xs gap-1">
              <Clock className="w-2.5 h-2.5" /> Live
            </Badge>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl divide-y divide-zinc-100 dark:divide-zinc-800">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{item.text}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats + top predictor */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
            <p className="text-sm text-zinc-500 mb-1">New predictions today</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">23</p>
            <Badge variant="success" className="mt-2">+8 today</Badge>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
            <p className="text-sm text-zinc-500 mb-1">Total votes today</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">1,847</p>
            <Badge variant="success" className="mt-2">+12% vs yesterday</Badge>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
            <p className="text-sm text-zinc-500 mb-3">Top predictor today</p>
            <div className="flex items-center gap-3">
              <Avatar src={topPredictor.user.avatar_url} name={topPredictor.user.full_name} size="sm" />
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{topPredictor.user.full_name}</p>
                <p className="text-xs text-zinc-500">{topPredictor.accuracy_rate}% accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending */}
      <section>
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
    </DashboardLayout>
  )
}
