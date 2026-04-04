import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockProfiles, mockLeaderboard, PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { IconAward, IconTarget, IconTrending, IconTrophy } from '@/components/ui/icons'
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
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>My Profile</h1>
        <p className="mt-1" style={{ color: 'var(--text3)' }}>Your public reputation on ZAWIOS</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="surface rounded-2xl p-8 text-center">
          <div className="relative inline-block mb-4">
            <Avatar src={profile.avatar_url} name={profile.full_name} size="xl" />
            <button
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'var(--accent)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{profile.full_name}</h2>
          <p className="text-sm" style={{ color: 'var(--text3)' }}>@{profile.username}</p>
          {profile.is_premium && <Badge variant="default" className="mt-2">Premium</Badge>}
          <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{profile.bio}</p>
          <Button variant="outline" size="sm" className="mt-4 w-full gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit profile
          </Button>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 content-start">
          <div className="surface rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <IconAward className="w-5 h-5" size={20} style={{ color: 'var(--amber)' }} />
              <span className="text-sm" style={{ color: 'var(--text3)' }}>Reputation score</span>
            </div>
            <p className="text-3xl font-bold" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>{formatNumber(leaderboardEntry.score)}</p>
            <Badge variant="success" className="mt-2">+12% this month</Badge>
          </div>
          <div className="surface rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <IconTarget className="w-5 h-5" size={20} style={{ color: 'var(--teal)' }} />
              <span className="text-sm" style={{ color: 'var(--text3)' }}>Accuracy rate</span>
            </div>
            <p className="text-3xl font-bold" style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}>{leaderboardEntry.accuracy_rate}%</p>
            <p className="text-xs mt-2" style={{ color: 'var(--text3)' }}>Over {leaderboardEntry.prediction_count} predictions</p>
          </div>
          <div className="surface rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <IconTrending className="w-5 h-5" size={20} style={{ color: 'var(--accent)' }} />
              <span className="text-sm" style={{ color: 'var(--text3)' }}>Predictions made</span>
            </div>
            <p className="text-3xl font-bold" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>{leaderboardEntry.prediction_count}</p>
          </div>
          <div className="surface rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <IconTrophy className="w-5 h-5" size={20} style={{ color: 'var(--accent2)' }} />
              <span className="text-sm" style={{ color: 'var(--text3)' }}>Global rank</span>
            </div>
            <p className="text-3xl font-bold" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>#{leaderboardEntry.rank}</p>
            <p className="text-xs mt-2" style={{ color: 'var(--text3)' }}>Top {Math.round((leaderboardEntry.rank / PLATFORM_STATS.total_users) * 100)}% of all predictors</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
