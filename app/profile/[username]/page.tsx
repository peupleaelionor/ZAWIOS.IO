import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { mockProfiles, mockLeaderboard } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { IconPin, IconCalendar, IconTrophy, IconTrending, IconTarget, IconAward } from '@/components/ui/icons'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const profile = mockProfiles.find((p) => p.username === username)
  if (!profile) return { title: 'Profil introuvable' }
  return {
    title: `${profile.full_name} (@${profile.username}) — ZAWIOS`,
    description: profile.bio || `Profil de ${profile.full_name} sur ZAWIOS`,
  }
}

const PLAN_LABELS: Record<string, string> = {
  free: 'Gratuit',
  premium: 'Premium',
  creator: 'Créateur',
  business: 'Business',
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params
  const profile = mockProfiles.find((p) => p.username === username)
  if (!profile) notFound()

  const leaderboardEntry = mockLeaderboard.find((e) => e.user.username === username)

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navbar />
      <main className="container py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">

          {/* ── Sidebar profil ─────────────────────────── */}
          <div className="space-y-5">
            <div
              className="rounded-2xl p-6 md:p-7 text-center relative overflow-hidden"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', opacity: 0.4 }}
              />
              <Avatar src={profile.avatar_url} name={profile.full_name} size="xl" className="mx-auto mb-4" />
              <h1 className="text-lg font-bold" style={{ color: 'var(--text-strong)' }}>{profile.full_name}</h1>
              <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>@{profile.username}</p>

              {/* Plan badge */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <Badge variant={profile.is_premium ? 'default' : 'outline'}>
                  {PLAN_LABELS[profile.plan ?? 'free'] ?? 'Gratuit'}
                </Badge>
              </div>

              {profile.bio && (
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{profile.bio}</p>
              )}

              <div className="flex flex-col gap-2.5 mt-5 text-sm" style={{ color: 'var(--text-muted)' }}>
                {profile.location && (
                  <span className="flex items-center justify-center gap-1.5">
                    <IconPin size={14} />
                    {profile.location}
                  </span>
                )}
                <span className="flex items-center justify-center gap-1.5">
                  <IconCalendar size={14} />
                  Membre depuis {new Date(profile.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Reputation card */}
            {leaderboardEntry && (
              <div
                className="rounded-2xl p-5 md:p-6"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <p className="section-label mb-5">Réputation</p>
                <div className="space-y-4">
                  {[
                    { icon: IconAward, label: 'Score', value: formatNumber(leaderboardEntry.score), color: 'var(--warn)' },
                    { icon: IconTarget, label: 'Précision', value: `${leaderboardEntry.accuracy_rate}%`, color: leaderboardEntry.accuracy_rate >= 70 ? 'var(--positive)' : 'var(--text-muted)' },
                    { icon: IconTrending, label: 'Signaux', value: String(leaderboardEntry.prediction_count), color: 'var(--primary)' },
                    { icon: IconTrophy, label: 'Rang global', value: `#${leaderboardEntry.rank}`, color: 'var(--primary)' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <item.icon size={15} style={{ color: item.color }} />
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.label}</span>
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

          {/* ── Activité ─────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>
                Activité
              </h2>
            </div>

            <div
              className="rounded-2xl p-8 md:p-12 text-center"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
              >
                <IconTrending size={22} />
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-strong)' }}>Aucun signal pour le moment</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Les signaux soumis par cet utilisateur apparaîtront ici.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
