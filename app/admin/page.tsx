import { Navbar } from '@/components/layout/navbar'
import { StatCard } from '@/components/ui/stat-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { mockPredictions, mockProfiles, PLATFORM_STATS } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { Shield, TrendingUp, Users, BarChart2, Eye, Check, X } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
}

export default function AdminPage() {
  const pendingPredictions = mockPredictions.slice(0, 3)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />
      <main className="container py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-red-50 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-sm text-zinc-500">Moderation &amp; platform management</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total users" value={PLATFORM_STATS.total_users} icon={Users} trend={8} />
          <StatCard label="Total predictions" value={PLATFORM_STATS.total_predictions} icon={TrendingUp} trend={15} />
          <StatCard label="Total votes" value={PLATFORM_STATS.total_votes} icon={BarChart2} trend={22} />
          <StatCard label="Resolved today" value={12} icon={Check} trend={4} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending review */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Pending review</h2>
              <Badge variant="warning">3 pending</Badge>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {pendingPredictions.map((p) => (
                <div key={p.id} className="px-6 py-4">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1 mb-1">{p.title}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-zinc-400">by {p.creator?.username}</span>
                    <span className="text-xs text-zinc-300 dark:text-zinc-600">·</span>
                    <span className="text-xs text-zinc-400 capitalize">{p.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      Approve
                    </Button>
                    <Button size="sm" variant="danger" className="gap-1.5">
                      <X className="w-3.5 h-3.5" />
                      Reject
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent users */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Recent users</h2>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {mockProfiles.map((profile) => (
                <div key={profile.id} className="px-6 py-4 flex items-center gap-3">
                  <Avatar src={profile.avatar_url} name={profile.full_name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">{profile.full_name}</p>
                    <p className="text-xs text-zinc-500">@{profile.username} · {formatDate(profile.created_at)}</p>
                  </div>
                  {profile.is_premium && <Badge variant="default" className="text-xs">Premium</Badge>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
