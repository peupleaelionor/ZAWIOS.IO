import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Avatar } from '@/components/ui/avatar'
import { IconTrophy, IconMedal, IconUsers, IconChart, IconTrending } from '@/components/ui/icons'
import { mockLeaderboard, PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Classement',
  description: 'Les meilleurs prévisionnistes ZAWIOS classés par précision.',
}

const rankColors = ['var(--warn)', 'var(--text2)', '#A0724A']

function accuracyColor(rate: number) {
  if (rate >= 72) return 'var(--win)'
  if (rate >= 60) return 'var(--warn)'
  return 'var(--text2)'
}

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-8 md:mb-10">
            <p className="section-label mb-3">Classement</p>
            <h1
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: 'var(--text)', letterSpacing: '-0.025em' }}
            >
              Top prévisionnistes
            </h1>
            <p className="text-sm" style={{ color: 'var(--text3)' }}>
              Classés par précision de prédiction.
            </p>

            {/* Stats */}
            <div
              className="flex items-center gap-5 mt-5 py-3 px-4 rounded-xl"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {[
                { icon: IconUsers,   value: formatNumber(PLATFORM_STATS.total_users),       label: 'analystes' },
                { icon: IconChart,   value: `${PLATFORM_STATS.avg_accuracy}%`,              label: 'précision moy.' },
                { icon: IconTrending, value: formatNumber(PLATFORM_STATS.total_predictions), label: 'prédictions' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <s.icon size={12} style={{ color: 'var(--text3)' }} />
                  <span className="text-xs font-bold" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>
                    {s.value}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--text3)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-2">
            {mockLeaderboard.map((entry, index) => (
              <Link
                key={entry.user.id}
                href={`/profile/${entry.user.username}`}
                className="surface rounded-xl p-4 flex items-center gap-3 card-hover block"
              >
                <div className="w-7 text-center shrink-0">
                  {index < 3 ? (
                    <IconMedal size={16} style={{ color: rankColors[index] }} />
                  ) : (
                    <span className="text-xs font-bold" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <Avatar src={entry.user.avatar_url} name={entry.user.full_name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{entry.user.full_name}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                    {formatNumber(entry.score)} pts
                  </p>
                </div>
                <span className="text-sm font-bold" style={{ color: accuracyColor(entry.accuracy_rate), fontFamily: 'var(--mono)' }}>
                  {entry.accuracy_rate}%
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop table */}
          <div
            className="hidden md:block rounded-xl overflow-hidden"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {/* Header row */}
            <div
              className="grid grid-cols-12 px-5 py-3 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)', color: 'var(--text3)', fontFamily: 'var(--mono)' }}
            >
              <div className="col-span-1">#</div>
              <div className="col-span-5">Analyste</div>
              <div className="col-span-2 text-right">Score</div>
              <div className="col-span-2 text-right">Précision</div>
              <div className="col-span-2 text-right">Signaux</div>
            </div>

            {mockLeaderboard.map((entry, index) => (
              <Link
                key={entry.user.id}
                href={`/profile/${entry.user.username}`}
                className="grid grid-cols-12 items-center px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
                style={{ borderBottom: index < mockLeaderboard.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <div className="col-span-1">
                  {index < 3 ? (
                    <IconMedal size={16} style={{ color: rankColors[index] }} />
                  ) : (
                    <span className="text-sm font-bold" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <Avatar src={entry.user.avatar_url} name={entry.user.full_name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{entry.user.full_name}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text3)' }}>@{entry.user.username}</p>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm font-bold" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>
                    {formatNumber(entry.score)}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm font-semibold" style={{ color: accuracyColor(entry.accuracy_rate), fontFamily: 'var(--mono)' }}>
                    {entry.accuracy_rate}%
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                    {entry.prediction_count}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p
            className="text-center mt-5"
            style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'var(--mono)' }}
          >
            Classement mis à jour en continu · basé sur la précision et le volume de prédictions
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
