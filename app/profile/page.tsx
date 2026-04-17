import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockProfiles, mockLeaderboard, PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { IconAward, IconTarget, IconTrending, IconTrophy, IconEdit } from '@/components/ui/icons'
import { AvatarUpload } from '@/components/ui/avatar-upload'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mon profil',
}

export default async function ProfilePage() {
  let profile = mockProfiles[0]
  let leaderboardEntry = mockLeaderboard[0]
  let totalUsers = PLATFORM_STATS.total_users

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: realProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (realProfile) {
        profile = { ...profile, ...realProfile }
      }

      const { data: reputation } = await supabase
        .from('reputation_scores')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (reputation) {
        leaderboardEntry = {
          ...leaderboardEntry,
          score: reputation.total_score ?? leaderboardEntry.score,
          accuracy_rate: reputation.accuracy_rate ?? leaderboardEntry.accuracy_rate,
          prediction_count: reputation.prediction_count ?? leaderboardEntry.prediction_count,
          rank: reputation.global_rank ?? leaderboardEntry.rank,
        }
      }

      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
      if (count) totalUsers = count
    }
  } catch {
    /* Fallback to mock data */
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navbar />
      <main className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--text)]">Mon profil</h1>
            <p className="text-[var(--text2)] mt-1">Votre réputation publique sur ZAWIOS</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile card */}
            <div className="surface rounded-2xl p-8 text-center">
              <AvatarUpload currentUrl={profile.avatar_url} name={profile.full_name} />
              <h2 className="text-xl font-bold text-[var(--text)]">{profile.full_name}</h2>
              <p className="text-sm text-[var(--text2)]">@{profile.username}</p>
              {profile.is_premium && <Badge variant="default" className="mt-2">Premium</Badge>}
              <p className="mt-4 text-sm text-[var(--text2)] leading-relaxed">{profile.bio}</p>
              <Button variant="outline" size="sm" className="mt-4 w-full gap-1.5">
                <IconEdit className="w-3.5 h-3.5" size={14} />
                Modifier le profil
              </Button>
            </div>

            {/* Stats */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4 content-start">
              <div className="surface rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <IconAward className="w-5 h-5 text-[var(--amber)]" size={20} />
                  <span className="text-sm text-[var(--text2)]">Score de réputation</span>
                </div>
                <p className="text-3xl font-bold text-[var(--text)]">{formatNumber(leaderboardEntry.score)}</p>
                <Badge variant="success" className="mt-2">+12% ce mois</Badge>
              </div>
              <div className="surface rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <IconTarget className="w-5 h-5 text-[var(--teal)]" size={20} />
                  <span className="text-sm text-[var(--text2)]">Taux de précision</span>
                </div>
                <p className="text-3xl font-bold text-[var(--teal)]">{leaderboardEntry.accuracy_rate}%</p>
                <p className="text-xs text-[var(--text3)] mt-2">Sur {leaderboardEntry.prediction_count} signaux</p>
              </div>
              <div className="surface rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <IconTrending className="w-5 h-5 text-[var(--accent)]" size={20} />
                  <span className="text-sm text-[var(--text2)]">Signaux émis</span>
                </div>
                <p className="text-3xl font-bold text-[var(--text)]">{leaderboardEntry.prediction_count}</p>
              </div>
              <div className="surface rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <IconTrophy className="w-5 h-5 text-[var(--accent)]" size={20} />
                  <span className="text-sm text-[var(--text2)]">Rang mondial</span>
                </div>
                <p className="text-3xl font-bold text-[var(--text)]">#{leaderboardEntry.rank}</p>
                <p className="text-xs text-[var(--text3)] mt-2">Top {Math.round((leaderboardEntry.rank / totalUsers) * 100)}% des analystes</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
