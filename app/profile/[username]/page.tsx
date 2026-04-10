import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'
import { mockProfiles, mockPredictions, mockLeaderboard } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import {
  IconPin, IconLink, IconCalendar, IconTrophy,
  IconTrending, IconTarget, IconAward, IconChart,
} from '@/components/ui/icons'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ username: string }>
}

// ── generateMetadata ──────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  try {
    const supabase = await createClient()
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, bio, username')
      .eq('username', username)
      .single()

    if (profile) {
      return {
        title: `${profile.full_name} (@${profile.username})`,
        description: profile.bio || `${profile.full_name} — analyste ZAWIOS`,
      }
    }
  } catch {
    /* Fall through to mock */
  }

  const mock = mockProfiles.find((p) => p.username === username)
  if (!mock) return { title: 'Profil introuvable' }
  return {
    title: `${mock.full_name} (@${mock.username})`,
    description: mock.bio || `${mock.full_name}'s prediction profile on ZAWIOS`,
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProfilePage({ params }: Props) {
  const { username } = await params

  // ── Fetch from Supabase ─────────────────────────────────────────────────
  let profile: Record<string, unknown> | null = null
  let reputation: Record<string, unknown> | null = null
  let signalVoteCount = 0
  let neutralRate = 0
  let dataSource = 'mock'

  try {
    const supabase = await createClient()

    const { data: dbProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (dbProfile) {
      profile    = dbProfile
      dataSource = 'db'

      const { data: rep } = await supabase
        .from('reputation_scores')
        .select('*')
        .eq('user_id', dbProfile.user_id)
        .single()

      reputation = rep ?? null

      // Signal vote stats
      const { count: svCount } = await supabase
        .from('signal_votes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', dbProfile.user_id)

      const { count: neutralCount } = await supabase
        .from('signal_votes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', dbProfile.user_id)
        .eq('vote_type', 'neutral')

      signalVoteCount = svCount ?? 0
      neutralRate     = svCount && svCount > 0
        ? Math.round(((neutralCount ?? 0) / svCount) * 100)
        : 0
    }
  } catch (err) {
    captureException(err, { page: 'ProfilePage', username })
  }

  // ── Fall back to mock if DB unavailable ─────────────────────────────────
  if (dataSource === 'mock') {
    const mockProfile = mockProfiles.find((p) => p.username === username)
    if (!mockProfile) notFound()
    profile    = mockProfile as unknown as Record<string, unknown>
    const mock = mockLeaderboard.find((e) => e.user.username === username)
    if (mock) {
      reputation = {
        total_score:      mock.score,
        accuracy_rate:    mock.accuracy_rate,
        prediction_count: mock.prediction_count,
        global_rank:      mock.rank,
      }
    }
  } else if (!profile) {
    notFound()
  }

  const p = profile!
  const r = reputation

  // ZAWIOS-specific stats
  const totalVotesDays = signalVoteCount  // proxy for engagement depth

  // Plan label
  const planLabel = (p.plan as string) === 'pro'  ? 'Pro'
    : (p.plan as string) === 'business'           ? 'Intelligence'
    : null

  const userPredictions = dataSource === 'mock'
    ? mockPredictions.filter((pred) => pred.created_by === (p.user_id as string))
    : []

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Sidebar: profile card ──────────────────────────────── */}
          <div className="space-y-5">

            {/* Profile card */}
            <div
              className="surface rounded-2xl p-7 text-center relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg,transparent,var(--accent),transparent)', opacity: 0.5 }}
              />
              <Avatar
                src={p.avatar_url as string | undefined}
                name={p.full_name as string}
                size="xl"
                className="mx-auto mb-4"
              />
              <h1 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
                {p.full_name as string}
              </h1>
              <p className="text-sm" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                @{p.username as string}
              </p>

              {planLabel && (
                <Badge variant="default" className="mt-3">{planLabel}</Badge>
              )}

              {p.bio && (
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {p.bio as string}
                </p>
              )}

              <div className="flex flex-col gap-2.5 mt-5 text-sm" style={{ color: 'var(--text3)' }}>
                {p.location && (
                  <span className="flex items-center justify-center gap-1.5">
                    <IconPin size={14} />
                    {p.location as string}
                  </span>
                )}
                {p.website && (
                  <a
                    href={p.website as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 transition-colors hover:text-[var(--accent2)]"
                  >
                    <IconLink size={14} />
                    {(p.website as string).replace(/^https?:\/\//, '')}
                  </a>
                )}
                <span className="flex items-center justify-center gap-1.5">
                  <IconCalendar size={14} />
                  Membre depuis {new Date(p.created_at as string).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Reputation card */}
            {r && (
              <div className="surface rounded-2xl p-6">
                <p className="section-label mb-5">Réputation</p>
                <div className="space-y-4">
                  {[
                    {
                      icon: IconAward,
                      label: 'Score',
                      value: formatNumber(r.total_score as number ?? 0),
                      color: 'var(--amber)',
                    },
                    {
                      icon: IconTarget,
                      label: 'Précision',
                      value: `${Math.round(r.accuracy_rate as number ?? 0)}%`,
                      color: (r.accuracy_rate as number ?? 0) >= 70 ? 'var(--teal)' : 'var(--text2)',
                    },
                    {
                      icon: IconTrending,
                      label: 'Prédictions',
                      value: String(r.prediction_count ?? 0),
                      color: 'var(--accent2)',
                    },
                    {
                      icon: IconTrophy,
                      label: 'Classement',
                      value: `#${r.global_rank ?? '—'}`,
                      color: 'var(--accent)',
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <item.icon size={15} style={{ color: item.color }} />
                        <span className="text-sm" style={{ color: 'var(--text2)' }}>{item.label}</span>
                      </div>
                      <span
                        className="text-sm font-bold"
                        style={{ color: item.color, fontFamily: 'var(--mono)' }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ZAWIOS signal stats */}
            {signalVoteCount > 0 && (
              <div className="surface rounded-2xl p-6">
                <p className="section-label mb-5">Signaux</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <IconChart size={15} style={{ color: 'var(--teal)' }} />
                      <span className="text-sm" style={{ color: 'var(--text2)' }}>Votes émis</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}>
                      {formatNumber(signalVoteCount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <IconTarget size={15} style={{ color: 'var(--text3)' }} />
                      <span className="text-sm" style={{ color: 'var(--text2)' }}>Taux neutre</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                      {neutralRate}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <IconTrending size={15} style={{ color: 'var(--accent2)' }} />
                      <span className="text-sm" style={{ color: 'var(--text2)' }}>Jours actifs</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: 'var(--accent2)', fontFamily: 'var(--mono)' }}>
                      {totalVotesDays}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Main: predictions ──────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}>
                Prédictions
              </h2>
              {userPredictions.length > 0 && (
                <span className="text-sm" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                  {userPredictions.length} total
                </span>
              )}
            </div>

            {userPredictions.length > 0 ? (
              <div className="grid gap-4">
                {userPredictions.slice(0, 12).map((prediction) => (
                  <div
                    key={prediction.id}
                    className="surface rounded-xl p-4"
                    style={{ borderColor: 'var(--border2)' }}
                  >
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>
                      {prediction.title}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                      {prediction.category} · {prediction.status}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="surface rounded-2xl p-12 text-center"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'color-mix(in srgb,var(--accent) 10%,transparent)',
                    color: 'var(--accent2)',
                  }}
                >
                  <IconTrending size={22} />
                </div>
                <p className="text-sm" style={{ color: 'var(--text3)' }}>
                  Aucune prédiction publique pour l'instant.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
