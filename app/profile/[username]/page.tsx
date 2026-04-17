import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { mockProfiles, mockPredictions, mockLeaderboard } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { IconPin, IconLink, IconCalendar, IconTrophy, IconTrending, IconTarget, IconAward } from '@/components/ui/icons'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const profile = mockProfiles.find((p) => p.username === username)
  if (!profile) return { title: 'Profile not found' }
  return {
    title: `${profile.full_name} (@${profile.username})`,
    description: profile.bio || `${profile.full_name}'s signal profile on ZAWIOS`,
  }
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params
  const profile = mockProfiles.find((p) => p.username === username)
  if (!profile) notFound()

  const leaderboardEntry = mockLeaderboard.find((e) => e.user.username === username)
  const userPredictions = mockPredictions.filter((p) => p.created_by === profile.user_id)

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Profile sidebar ─────────────────────────── */}
          <div className="space-y-5">
            <div className="surface rounded-2xl p-7 text-center relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.5 }}
              />
              <Avatar src={profile.avatar_url} name={profile.full_name} size="xl" className="mx-auto mb-4" />
              <h1 className="text-lg font-bold text-[var(--text)]">{profile.full_name}</h1>
              <p className="text-sm text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>@{profile.username}</p>
              {profile.is_premium && (
                <Badge variant="default" className="mt-3">Premium</Badge>
              )}
              {profile.bio && (
                <p className="mt-4 text-sm text-[var(--text2)] leading-relaxed">{profile.bio}</p>
              )}
              <div className="flex flex-col gap-2.5 mt-5 text-sm text-[var(--text3)]">
                {profile.location && (
                  <span className="flex items-center justify-center gap-1.5">
                    <IconPin size={14} />
                    {profile.location}
                  </span>
                )}
                {profile.website && (
                  <a
                    href={profile.website}
                    className="flex items-center justify-center gap-1.5 hover:text-[var(--accent2)] transition-colors"
                  >
                    <IconLink size={14} />
                    {profile.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
                <span className="flex items-center justify-center gap-1.5">
                  <IconCalendar size={14} />
                  Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {leaderboardEntry && (
              <div className="surface rounded-2xl p-6">
                <p className="section-label mb-5">Reputation</p>
                <div className="space-y-4">
                  {[
                    { icon: IconAward, label: 'Score', value: formatNumber(leaderboardEntry.score), color: 'var(--amber)' },
                    { icon: IconTarget, label: 'Accuracy', value: `${leaderboardEntry.accuracy_rate}%`, color: leaderboardEntry.accuracy_rate >= 70 ? 'var(--teal)' : 'var(--text2)' },
                    { icon: IconTrending, label: 'Signals', value: String(leaderboardEntry.prediction_count), color: 'var(--accent2)' },
                    { icon: IconTrophy, label: 'Global rank', value: `#${leaderboardEntry.rank}`, color: 'var(--accent)' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <item.icon size={15} style={{ color: item.color }} />
                        <span className="text-sm text-[var(--text2)]">{item.label}</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: item.color, fontFamily: 'var(--mono)' }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Signals ─────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[var(--text)]" style={{ letterSpacing: '-0.01em' }}>
                Signals
              </h2>
              {userPredictions.length > 0 && (
                <span className="text-sm text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                  {userPredictions.length} total
                </span>
              )}
            </div>

            {userPredictions.length > 0 ? (
              <div className="grid gap-4">
                {userPredictions.map((prediction) => (
                  <PredictionCard key={prediction.id} prediction={prediction} />
                ))}
              </div>
            ) : (
              <div className="surface rounded-2xl p-12 text-center">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--accent2)' }}
                >
                  <IconTrending size={22} />
                </div>
                <p className="text-sm text-[var(--text3)]">No signals yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
