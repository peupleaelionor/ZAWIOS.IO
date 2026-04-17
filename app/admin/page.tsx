'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { StatCard } from '@/components/ui/stat-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { mockPredictions, mockProfiles, PLATFORM_STATS } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import {
  IconShield,
  IconTrending,
  IconUsers,
  IconChart,
  IconEye,
  IconCheck,
  IconX,
  IconEdit,
} from '@/components/ui/icons'

type ModerationAction = 'approve' | 'reject' | 'propose'

function AdminPageContent() {
  const [pendingIds, setPendingIds] = useState<Set<string>>(
    new Set(mockPredictions.slice(0, 3).map((p) => p.id)),
  )
  const [proposingId, setProposingId] = useState<string | null>(null)
  const [proposalText, setProposalText] = useState('')
  const [actionInProgress, setActionInProgress] = useState<string | null>(null)

  const pendingPredictions = mockPredictions.filter((p) => pendingIds.has(p.id))

  const handleModeration = async (predictionId: string, action: ModerationAction) => {
    setActionInProgress(predictionId)

    try {
      const requestBody: Record<string, string> = {
        action,
        target_type: 'prediction',
        target_id: predictionId,
      }
      if (action === 'propose') {
        requestBody.suggestion = proposalText
      }
      if (action === 'reject') {
        requestBody.reason = 'Does not meet community guidelines'
      }

      const res = await fetch('/api/admin/moderation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const { toast } = await import('sonner')

      if (res.ok) {
        setPendingIds((prev) => {
          const next = new Set(prev)
          next.delete(predictionId)
          return next
        })
        setProposingId(null)
        setProposalText('')
        toast.success(
          action === 'approve'
            ? 'Prediction approved'
            : action === 'reject'
              ? 'Prediction rejected'
              : 'Edit suggestion sent',
        )
      } else {
        const data = await res.json()
        toast.error(data.error || 'Action failed')
      }
    } catch {
      const { toast } = await import('sonner')
      toast.error('Network error')
    } finally {
      setActionInProgress(null)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="container py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(240,96,112,0.1)' }}
          >
            <IconShield className="w-5 h-5" size={20} style={{ color: 'var(--zred)' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)', fontFamily: 'var(--font)' }}>
              Admin Dashboard
            </h1>
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
            <div
              className="px-6 py-4 border-b flex items-center justify-between"
              style={{ borderColor: 'var(--border2)' }}
            >
              <h2 className="font-semibold" style={{ color: 'var(--text)' }}>Pending review</h2>
              <Badge variant="warning">{pendingPredictions.length} pending</Badge>
            </div>
            <div>
              {pendingPredictions.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <p className="text-sm" style={{ color: 'var(--text3)' }}>All caught up — no pending items.</p>
                </div>
              )}
              {pendingPredictions.map((p) => (
                <div
                  key={p.id}
                  className="px-6 py-4 border-b last:border-b-0"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <p className="text-sm font-medium line-clamp-2 mb-1" style={{ color: 'var(--text)' }}>
                    {p.title}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs" style={{ color: 'var(--text3)' }}>by {p.creator?.username}</span>
                    <span className="text-xs" style={{ color: 'var(--border3)' }}>·</span>
                    <span className="text-xs capitalize" style={{ color: 'var(--text3)' }}>{p.category}</span>
                  </div>

                  {/* Propose edit form */}
                  {proposingId === p.id && (
                    <div className="mb-3 space-y-2">
                      <textarea
                        value={proposalText}
                        onChange={(e) => setProposalText(e.target.value)}
                        placeholder="Suggest specific edits or improvements…"
                        rows={3}
                        className="w-full rounded-lg p-3 text-sm resize-none bg-transparent outline-none"
                        style={{
                          background: 'var(--surface2)',
                          border: '1px solid var(--border2)',
                          color: 'var(--text)',
                          fontFamily: 'var(--font)',
                        }}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleModeration(p.id, 'propose')}
                          disabled={!proposalText.trim() || actionInProgress === p.id}
                        >
                          Send suggestion
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setProposingId(null)
                            setProposalText('')
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      className="gap-1.5"
                      onClick={() => handleModeration(p.id, 'approve')}
                      disabled={actionInProgress === p.id}
                    >
                      <IconCheck className="w-3.5 h-3.5" size={14} />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="gap-1.5"
                      onClick={() => handleModeration(p.id, 'reject')}
                      disabled={actionInProgress === p.id}
                    >
                      <IconX className="w-3.5 h-3.5" size={14} />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                      onClick={() => setProposingId(proposingId === p.id ? null : p.id)}
                      disabled={actionInProgress === p.id}
                    >
                      <IconEdit className="w-3.5 h-3.5" size={14} />
                      Propose edit
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
            <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border2)' }}>
              <h2 className="font-semibold" style={{ color: 'var(--text)' }}>Recent users</h2>
            </div>
            <div>
              {mockProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="px-6 py-4 flex items-center gap-3 border-b last:border-b-0"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Avatar src={profile.avatar_url} name={profile.full_name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
                      {profile.full_name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text2)' }}>
                      @{profile.username} · {formatDate(profile.created_at)}
                    </p>
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

export default function AdminPage() {
  return <AdminPageContent />
}
