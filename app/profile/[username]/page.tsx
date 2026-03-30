import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { mockProfiles, mockPredictions, mockLeaderboard } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { MapPin, Globe, Award, TrendingUp, Target, Calendar, Trophy } from 'lucide-react'
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
    description: profile.bio || `${profile.full_name}'s prediction profile on ZAWIOS`,
  }
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params
  const profile = mockProfiles.find((p) => p.username === username)
  if (!profile) notFound()

  const leaderboardEntry = mockLeaderboard.find((e) => e.user.username === username)
  const userPredictions = mockPredictions.filter((p) => p.created_by === profile.user_id)

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center">
              <Avatar src={profile.avatar_url} name={profile.full_name} size="xl" className="mx-auto mb-4" />
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{profile.full_name}</h1>
              <p className="text-sm text-zinc-500">@{profile.username}</p>
              {profile.is_premium && (
                <Badge variant="default" className="mt-2">Premium</Badge>
              )}
              {profile.bio && (
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{profile.bio}</p>
              )}
              <div className="flex flex-col gap-2 mt-4 text-sm text-zinc-500">
                {profile.location && (
                  <span className="flex items-center justify-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {profile.location}
                  </span>
                )}
                {profile.website && (
                  <a href={profile.website} className="flex items-center justify-center gap-1.5 hover:text-indigo-600">
                    <Globe className="w-3.5 h-3.5" />
                    {profile.website}
                  </a>
                )}
                <span className="flex items-center justify-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Stats */}
            {leaderboardEntry && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wide">Reputation</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">Score</span>
                    </div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatNumber(leaderboardEntry.score)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">Accuracy</span>
                    </div>
                    <span className={`font-bold ${leaderboardEntry.accuracy_rate >= 70 ? 'text-emerald-600' : 'text-zinc-900 dark:text-zinc-100'}`}>
                      {leaderboardEntry.accuracy_rate}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">Predictions</span>
                    </div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{leaderboardEntry.prediction_count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">Global rank</span>
                    </div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">#{leaderboardEntry.rank}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Predictions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
              Predictions by {profile.full_name}
            </h2>
            {userPredictions.length > 0 ? (
              <div className="grid gap-4">
                {userPredictions.map((prediction) => (
                  <PredictionCard key={prediction.id} prediction={prediction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-zinc-500">
                <TrendingUp className="w-8 h-8 mx-auto mb-3 opacity-30" />
                <p>No predictions yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
