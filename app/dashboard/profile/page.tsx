import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockProfiles, mockLeaderboard, PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { Award, Target, TrendingUp, Trophy, Edit2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Profile',
}

export default function DashboardProfilePage() {
  const profile = mockProfiles[0]
  const leaderboardEntry = mockLeaderboard[0]

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">My Profile</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Your public reputation on ZAWIOS</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center">
          <div className="relative inline-block mb-4">
            <Avatar src={profile.avatar_url} name={profile.full_name} size="xl" />
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Edit2 className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{profile.full_name}</h2>
          <p className="text-sm text-zinc-500">@{profile.username}</p>
          {profile.is_premium && <Badge variant="default" className="mt-2">Premium</Badge>}
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{profile.bio}</p>
          <Button variant="outline" size="sm" className="mt-4 w-full gap-1.5">
            <Edit2 className="w-3.5 h-3.5" />
            Edit profile
          </Button>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4 content-start">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-zinc-500">Reputation score</span>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{formatNumber(leaderboardEntry.score)}</p>
            <Badge variant="success" className="mt-2">+12% this month</Badge>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-emerald-500" />
              <span className="text-sm text-zinc-500">Accuracy rate</span>
            </div>
            <p className="text-3xl font-bold text-emerald-600">{leaderboardEntry.accuracy_rate}%</p>
            <p className="text-xs text-zinc-400 mt-2">Over {leaderboardEntry.prediction_count} predictions</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <span className="text-sm text-zinc-500">Predictions made</span>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{leaderboardEntry.prediction_count}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-zinc-500">Global rank</span>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">#{leaderboardEntry.rank}</p>
            <p className="text-xs text-zinc-400 mt-2">Top {Math.round((leaderboardEntry.rank / PLATFORM_STATS.total_users) * 100)}% of all predictors</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
