import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Avatar } from '@/components/ui/avatar'
import { IconTrophy, IconMedal, IconUsers, IconChart, IconTrending } from '@/components/ui/icons'
import { mockLeaderboard, PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Classement',
  description: 'Les meilleurs analystes ZAWIOS, classés par précision et score de réputation.',
}

interface LeaderboardRow {
  user_id:         string
  username:        string
  full_name:       string
  avatar_url?:     string
  plan:            string
  total_score:     number
  accuracy_rate:   number
  prediction_count: number
  global_rank:     number
}

const rankColors = ['var(--amber)', 'var(--text3)', '#cd7f32']

export default async function LeaderboardPage() {
  // Try to fetch real data from Supabase RPC
  let entries: LeaderboardRow[] = []
  let totalUsers   = PLATFORM_STATS.total_users
  let avgAccuracy  = PLATFORM_STATS.avg_accuracy
  let totalPredictions = PLATFORM_STATS.total_predictions
  let dataSource   = 'mock'

  try {
    const supabase = await createClient()

    const { data: rpcData, error } = await supabase.rpc('get_leaderboard', {
      p_limit: 25,
      p_offset: 0,
    })

    if (!error && Array.isArray(rpcData) && rpcData.length > 0) {
      entries    = rpcData
      dataSource = 'db'

      // Compute platform stats from real data
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
      if (count) totalUsers = count

      if (entries.length > 0) {
        avgAccuracy = Math.round(
          entries.reduce((sum, e) => sum + (e.accuracy_rate ?? 0), 0) / entries.length,
        )
        totalPredictions = entries.reduce((sum, e) => sum + (e.prediction_count ?? 0), 0)
      }
    }
  } catch (err) {
    captureException(err, { page: 'LeaderboardPage' })
  }

  // Fall back to mock data if DB unavailable
  if (dataSource === 'mock') {
    entries = mockLeaderboard.map((e, i) => ({
      user_id:          e.user.id,
      username:         e.user.username,
      full_name:        e.user.full_name,
      avatar_url:       e.user.avatar_url,
      plan:             e.user.plan as string,
      total_score:      e.score,
      accuracy_rate:    e.accuracy_rate,
      prediction_count: e.prediction_count,
      global_rank:      i + 1,
    }))
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">

          {/* ── Header ──────────────────────────────────────────────── */}
          <div className="text-center mb-8 md:mb-10">
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4"
              style={{ background: 'color-mix(in srgb,var(--amber) 10%,transparent)', color: 'var(--amber)' }}
            >
              <IconTrophy className="w-6 h-6 md:w-7 md:h-7" size={24} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)' }}>
              Classement
            </h1>
            <p className="mt-2 text-sm" style={{ color: 'var(--text2)' }}>
              Analystes classés par précision et score de réputation
            </p>

            {/* Quick stats */}
            <div className="flex items-center justify-center gap-4 md:gap-6 mt-5 md:mt-6 flex-wrap">
              {[
                { icon: IconUsers,   value: formatNumber(totalUsers),       label: 'Analystes' },
                { icon: IconChart,   value: `${avgAccuracy}%`,              label: 'Précision moy.' },
                { icon: IconTrending, value: formatNumber(totalPredictions), label: 'Signaux' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <s.icon size={13} style={{ color: 'var(--text3)' }} />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}
                  >
                    {s.value}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--text3)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Mobile: card layout ──────────────────────────────────── */}
          <div className="md:hidden space-y-3">
            {entries.map((entry, index) => (
              <Link
                href={`/profile/${entry.username}`}
                key={entry.user_id}
                className="surface rounded-xl p-4 flex items-center gap-3 card-hover block"
              >
                <div className="flex-shrink-0 w-8 text-center">
                  {index < 3 ? (
                    <IconMedal className="w-5 h-5 mx-auto" size={20} style={{ color: rankColors[index] }} />
                  ) : (
                    <span
                      className="text-sm font-bold"
                      style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <Avatar src={entry.avatar_url} name={entry.full_name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>
                    {entry.full_name}
                  </p>
                  <p className="text-[10px]" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                    {formatNumber(entry.total_score)} pts · {Math.round(entry.accuracy_rate)}% précision
                  </p>
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: entry.accuracy_rate >= 70 ? 'var(--teal)'
                         : entry.accuracy_rate >= 60 ? 'var(--amber)'
                         : 'var(--text2)',
                    fontFamily: 'var(--mono)',
                  }}
                >
                  {Math.round(entry.accuracy_rate)}%
                </span>
              </Link>
            ))}
          </div>

          {/* ── Desktop: table layout ────────────────────────────────── */}
          <div className="hidden md:block surface rounded-xl overflow-hidden">
            <div
              className="grid grid-cols-12 px-6 py-3 text-xs font-medium uppercase tracking-wider"
              style={{
                background:  'var(--surface2)',
                borderBottom: '1px solid var(--border2)',
                color:       'var(--text3)',
                fontFamily:  'var(--mono)',
              }}
            >
              <div className="col-span-1">Rang</div>
              <div className="col-span-5">Analyste</div>
              <div className="col-span-2 text-right">Score</div>
              <div className="col-span-2 text-right">Précision</div>
              <div className="col-span-2 text-right">Signaux</div>
            </div>

            {entries.map((entry, index) => (
              <Link
                href={`/profile/${entry.username}`}
                key={entry.user_id}
                className="grid grid-cols-12 items-center px-6 py-4 transition-colors hover:bg-white/[0.02]"
                style={{
                  borderBottom: index < entries.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div className="col-span-1">
                  {index < 3 ? (
                    <IconMedal className="w-5 h-5" size={20} style={{ color: rankColors[index] }} />
                  ) : (
                    <span
                      className="text-sm font-bold"
                      style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <Avatar src={entry.avatar_url} name={entry.full_name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                      {entry.full_name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text3)' }}>
                      @{entry.username}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span
                    className="text-sm font-bold"
                    style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}
                  >
                    {formatNumber(entry.total_score)}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: entry.accuracy_rate >= 70 ? 'var(--teal)'
                           : entry.accuracy_rate >= 60 ? 'var(--amber)'
                           : 'var(--text2)',
                      fontFamily: 'var(--mono)',
                    }}
                  >
                    {Math.round(entry.accuracy_rate)}%
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span
                    className="text-sm"
                    style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
                  >
                    {entry.prediction_count}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p
            className="text-center text-xs mt-6"
            style={{ color: 'var(--text3)', fontFamily: 'var(--mono)', fontSize: '11px' }}
          >
            Classement mis à jour en temps réel · basé sur la précision et le volume des votes engagés
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
