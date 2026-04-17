import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { StatCard } from '@/components/ui/stat-card'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { Badge } from '@/components/ui/badge'
import { mockPredictions, mockLeaderboard } from '@/lib/mock-data'
import { IconTrophy, IconTarget, IconTrending, IconUsers, IconArrows, IconUpvote, IconComment } from '@/components/ui/icons'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

const recentActivity = [
  { icon: IconUpvote, text: 'You voted Yes on "Will AI surpass human benchmarks by end 2025?"', time: '2 min ago', color: 'var(--teal)' },
  { icon: IconTrending, text: 'Your signal on Bitcoin is trending — 9.2K votes', time: '1 hour ago', color: 'var(--accent)' },
  { icon: IconTrophy, text: 'You moved up to rank #24 on the global leaderboard', time: '3 hours ago', color: 'var(--amber)' },
  { icon: IconComment, text: 'New comment on your Fed Funds Rate signal', time: '5 hours ago', color: 'var(--accent2)' },
  { icon: IconTarget, text: '"UK general election" resolved — your signal was correct', time: 'Yesterday', color: 'var(--teal)' },
]

export default async function DashboardPage() {
  const trendingPredictions = mockPredictions.filter((p) => p.featured).slice(0, 3)
  const topPredictor = mockLeaderboard[0]

  // Try to fetch real user data
  let userName = ''
  let userScore = 4218
  let userAccuracy = '67%'
  let userPredictions = 42
  let userRank = '#24'

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, username')
        .eq('user_id', user.id)
        .single()

      if (profile) {
        userName = profile.full_name || profile.username || ''
      }

      const { data: reputation } = await supabase
        .from('reputation_scores')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (reputation) {
        userScore = reputation.total_score ?? userScore
        userAccuracy = `${reputation.accuracy_rate ?? 67}%`
        userPredictions = reputation.prediction_count ?? userPredictions
        userRank = `#${reputation.global_rank ?? 24}`
      }
    }
  } catch {
    /* Fallback to mock data */
  }

  const greeting = userName ? `Welcome back, ${userName.split(' ')[0]}` : 'Good morning'

  return (
    <DashboardLayout>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text)]">{greeting}</h1>
        <p className="text-[var(--text2)] mt-1">Here&apos;s what&apos;s happening on ZAWIOS today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Your score" value={userScore} icon={IconTrophy} trend={12} />
        <StatCard label="Accuracy rate" value={userAccuracy} icon={IconTarget} />
        <StatCard label="Signals" value={userPredictions} icon={IconTrending} trend={3} />
        <StatCard label="Global rank" value={userRank} icon={IconUsers} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Recent activity */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Recent activity</h2>
            <span className="badge-mono" style={{ color: 'var(--teal)' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--teal)] mr-1.5" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
              Live
            </span>
          </div>
          <div className="surface rounded-2xl divide-y divide-[var(--border)]">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `color-mix(in srgb, ${item.color} 15%, transparent)`, color: item.color }}
                >
                  <item.icon className="w-4 h-4" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text2)] leading-relaxed">{item.text}</p>
                  <p className="text-xs text-[var(--text3)] mt-0.5" style={{ fontFamily: 'var(--mono)' }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats + top analyst */}
        <div className="space-y-4">
          <div className="surface rounded-2xl p-6">
            <p className="text-sm text-[var(--text3)] mb-1">New signals today</p>
            <p className="text-3xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>23</p>
            <Badge variant="success" className="mt-2">+8 today</Badge>
          </div>
          <div className="surface rounded-2xl p-6">
            <p className="text-sm text-[var(--text3)] mb-1">Total votes today</p>
            <p className="text-3xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>1,847</p>
            <Badge variant="success" className="mt-2">+12% vs yesterday</Badge>
          </div>
          <div className="surface rounded-2xl p-6">
            <p className="text-sm text-[var(--text3)] mb-3">Top analyst today</p>
            <div className="flex items-center gap-3">
              <Avatar src={topPredictor.user.avatar_url} name={topPredictor.user.full_name} size="sm" />
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">{topPredictor.user.full_name}</p>
                <p className="text-xs text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>{topPredictor.accuracy_rate}% accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text)]">Trending signals</h2>
            <p className="text-sm text-[var(--text3)]">Most active in the last 24 hours</p>
          </div>
          <Link href="/signals">
            <Button variant="ghost" size="sm" className="gap-1">
              View all <IconArrows className="w-3.5 h-3.5" size={14} />
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
