import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Avatar } from '@/components/ui/avatar'
import { GridBackground, Orb } from '@/components/ui/effects'
import { IconTrophy, IconMedal } from '@/components/ui/icons'
import { mockLeaderboard } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leaderboard',
  description: 'See the top predictors on ZAWIOS ranked by accuracy and reputation score.',
}

const rankColors = ['var(--amber)', 'var(--text3)', '#cd7f32']

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 relative">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(250,204,21,0.1)', color: 'var(--amber)' }}
            >
              <IconTrophy className="w-7 h-7" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-[var(--text)]">Leaderboard</h1>
            <p className="mt-2 text-[var(--text2)]">
              Top forecasters ranked by prediction accuracy
            </p>
          </div>

          <div className="surface rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 px-6 py-3 border-b text-xs font-medium text-[var(--text3)] uppercase tracking-wider" style={{ background: 'var(--surface2)', borderColor: 'var(--border2)', fontFamily: 'var(--mono)' }}>
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Predictor</div>
              <div className="col-span-2 text-right">Score</div>
              <div className="col-span-2 text-right">Accuracy</div>
              <div className="col-span-2 text-right">Predictions</div>
            </div>

            {mockLeaderboard.map((entry, index) => (
              <div
                key={entry.user.id}
                className={`grid grid-cols-12 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors`}
                style={{ borderBottom: index < mockLeaderboard.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <div className="col-span-1">
                  {index < 3 ? (
                    <IconMedal className="w-5 h-5" size={20} style={{ color: rankColors[index] }} />
                  ) : (
                    <span className="text-sm font-bold text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <Avatar src={entry.user.avatar_url} name={entry.user.full_name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">{entry.user.full_name}</p>
                    <p className="text-xs text-[var(--text3)]">@{entry.user.username}</p>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>{formatNumber(entry.score)}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className={`text-sm font-semibold`} style={{
                    color: entry.accuracy_rate >= 70 ? 'var(--teal)' : entry.accuracy_rate >= 60 ? 'var(--amber)' : 'var(--text2)',
                    fontFamily: 'var(--mono)',
                  }}>
                    {entry.accuracy_rate}%
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>{entry.prediction_count}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[var(--text3)] mt-6" style={{ fontFamily: 'var(--mono)', fontSize: '11px' }}>
Rankings update live · based on accuracy rate and prediction count
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
