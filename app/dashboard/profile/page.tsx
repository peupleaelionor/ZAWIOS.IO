import { DashboardLayout } from '@/components/layout/dashboard-layout'
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
  title: 'My Profile',
}

export default async function DashboardProfilePage() {
  // Try to fetch real profile data; fallback to mock
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
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text)]">My Profile</h1>
        <p className="text-[var(--text2)] mt-1">Your public reputation on ZAWIOS</p>
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
            Edit profile
          </Button>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4 content-start">
          <div className="surface rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <IconAward className="w-5 h-5 text-[var(--amber)]" size={20} />
              <span className="text-sm text-[var(--text2)]">Reputation score</span>
            </div>
            <p className="text-3xl font-bold text-[var(--text)]">{formatNumber(leaderboardEntry.score)}</p>
            <Badge variant="success" className="mt-2">+12% this month</Badge>
          </div>
          <div className="surface rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <IconTarget className="w-5 h-5 text-[var(--teal)]" size={20} />
              <span className="text-sm text-[var(--text2)]">Accuracy rate</span>
            </div>
            <p className="text-3xl font-bold text-[var(--teal)]">{leaderboardEntry.accuracy_rate}%</p>
            <p className="text-xs text-[var(--text3)] mt-2">Over {leaderboardEntry.prediction_count} predictions</p>
          </div>
          <div className="surface rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <IconTrending className="w-5 h-5 text-[var(--accent)]" size={20} />
              <span className="text-sm text-[var(--text2)]">Predictions made</span>
            </div>
            <p className="text-3xl font-bold text-[var(--text)]">{leaderboardEntry.prediction_count}</p>
          </div>
          <div className="surface rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <IconTrophy className="w-5 h-5 text-[var(--accent)]" size={20} />
              <span className="text-sm text-[var(--text2)]">Global rank</span>
            </div>
            <p className="text-3xl font-bold text-[var(--text)]">#{leaderboardEntry.rank}</p>
            <p className="text-xs text-[var(--text3)] mt-2">Top {Math.round((leaderboardEntry.rank / totalUsers) * 100)}% of all predictors</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
