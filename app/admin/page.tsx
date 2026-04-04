import { Navbar } from '@/components/layout/navbar'
import { StatCard } from '@/components/ui/stat-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { mockPredictions, mockProfiles, PLATFORM_STATS } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { IconShield, IconTrending, IconUsers, IconChart, IconEye, IconCheck } from '@/components/ui/icons'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
}

export default function AdminPage() {
  const pendingPredictions = mockPredictions.slice(0, 3)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="container py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)' }}>
            <IconShield className="w-5 h-5" size={20} style={{ color: 'var(--zred)' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Admin Dashboard</h1>
            <p className="text-sm" style={{ color: 'var(--text3)' }}>Moderation &amp; platform management</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total users" value={PLATFORM_STATS.total_users} icon={IconUsers} trend={8} />
          <StatCard label="Total predictions" value={PLATFORM_STATS.total_predictions} icon={IconTrending} trend={15} />
          <StatCard label="Total votes" value={PLATFORM_STATS.total_votes} icon={IconChart} trend={22} />
          <StatCard label="Resolved today" value={12} icon={IconCheck} trend={4} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending review */}
          <div className="surface rounded-2xl">
            <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="font-semibold" style={{ color: 'var(--text)' }}>Pending review</h2>
              <Badge variant="warning">3 pending</Badge>
            </div>
            <div>
              {pendingPredictions.map((p, i) => (
                <div key={p.id} className="px-6 py-4" style={{ borderBottom: i < pendingPredictions.length - 1 ? '1px solid var(--border)' : undefined }}>
                  <p className="text-sm font-medium line-clamp-1 mb-1" style={{ color: 'var(--text)' }}>{p.title}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs" style={{ color: 'var(--text3)' }}>by {p.creator?.username}</span>
                    <span className="text-xs" style={{ color: 'var(--border)' }}>·</span>
                    <span className="text-xs capitalize" style={{ color: 'var(--text3)' }}>{p.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="gap-1.5">
                      <IconCheck className="w-3.5 h-3.5" size={14} />
                      Approve
                    </Button>
                    <Button size="sm" variant="danger" className="gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      Reject
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1.5">
                      <IconEye className="w-3.5 h-3.5" size={14} />
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent users */}
          <div className="surface rounded-2xl">
            <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="font-semibold" style={{ color: 'var(--text)' }}>Recent users</h2>
            </div>
            <div>
              {mockProfiles.map((profile, i) => (
                <div key={profile.id} className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: i < mockProfiles.length - 1 ? '1px solid var(--border)' : undefined }}>
                  <Avatar src={profile.avatar_url} name={profile.full_name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{profile.full_name}</p>
                    <p className="text-xs" style={{ color: 'var(--text3)' }}>@{profile.username} · {formatDate(profile.created_at)}</p>
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
