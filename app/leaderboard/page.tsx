import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Avatar } from '@/components/ui/avatar'
import { mockLeaderboard } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { Trophy } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leaderboard',
  description: 'See the top predictors on ZAWIOS ranked by accuracy and reputation score.',
}

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-amber-50 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-7 h-7 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Leaderboard</h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Top predictors ranked by accuracy and reputation
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="grid grid-cols-12 px-6 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-500 uppercase tracking-wide">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Predictor</div>
              <div className="col-span-2 text-right">Score</div>
              <div className="col-span-2 text-right">Accuracy</div>
              <div className="col-span-2 text-right">Predictions</div>
            </div>

            {mockLeaderboard.map((entry, index) => (
              <div
                key={entry.user.id}
                className={`grid grid-cols-12 items-center px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors ${
                  index < mockLeaderboard.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800' : ''
                }`}
              >
                <div className="col-span-1">
                  <span className={`text-sm font-bold ${
                    index === 0 ? 'text-amber-500' :
                    index === 1 ? 'text-zinc-400' :
                    index === 2 ? 'text-amber-700' : 'text-zinc-400'
                  }`}>
                    {index + 1}
                  </span>
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <Avatar src={entry.user.avatar_url} name={entry.user.full_name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{entry.user.full_name}</p>
                    <p className="text-xs text-zinc-500">@{entry.user.username}</p>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{formatNumber(entry.score)}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className={`text-sm font-semibold ${
                    entry.accuracy_rate >= 70 ? 'text-emerald-600' :
                    entry.accuracy_rate >= 60 ? 'text-amber-600' : 'text-zinc-600'
                  }`}>
                    {entry.accuracy_rate}%
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm text-zinc-500">{entry.prediction_count}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-zinc-400 mt-6">
            Rankings updated in real-time based on prediction accuracy and volume
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
