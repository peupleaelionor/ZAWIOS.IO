'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { Button } from '@/components/ui/button'
import { mockPredictions } from '@/lib/mock-data'
import Link from 'next/link'
import { IconPlus, IconTarget, IconTrending, IconCheck, IconChart } from '@/components/ui/icons'
import { formatNumber } from '@/lib/utils'

type TabKey = 'created' | 'voted' | 'resolved'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'created', label: 'Created' },
  { key: 'voted', label: 'Voted' },
  { key: 'resolved', label: 'Resolved' },
]

export default function DashboardPredictionsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('created')

  /* Simulate different data splits for each tab */
  const created = mockPredictions.slice(0, 4)
  const voted = mockPredictions.filter((p) => p.status === 'open').slice(0, 3)
  const resolved = mockPredictions.filter((p) => p.status === 'resolved')

  const predictions =
    activeTab === 'created' ? created : activeTab === 'voted' ? voted : resolved

  const totalVotes = mockPredictions.reduce((s, p) => s + p.vote_count, 0)
  const resolvedCount = mockPredictions.filter((p) => p.status === 'resolved').length

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold text-[var(--text)]"
            style={{ letterSpacing: '-0.01em' }}
          >
            My Predictions
          </h1>
          <p className="text-[var(--text2)] mt-1 text-sm">
            Track your created and voted predictions
          </p>
        </div>
        <Link href="/predictions/create">
          <Button size="sm" className="gap-1.5">
            <IconPlus className="w-4 h-4" size={16} />
            New prediction
          </Button>
        </Link>
      </div>

      {/* Stats bar */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
      >
        {[
          {
            icon: IconTrending,
            label: 'Total',
            value: formatNumber(mockPredictions.length),
            color: 'var(--accent)',
          },
          {
            icon: IconTarget,
            label: 'Active',
            value: formatNumber(mockPredictions.filter((p) => p.status === 'open').length),
            color: 'var(--teal)',
          },
          {
            icon: IconCheck,
            label: 'Resolved',
            value: formatNumber(resolvedCount),
            color: 'var(--amber)',
          },
          {
            icon: IconChart,
            label: 'Total votes',
            value: formatNumber(totalVotes),
            color: 'var(--blue)',
          },
        ].map((stat) => (
          <div key={stat.label} className="surface rounded-xl p-4 flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: `color-mix(in srgb, ${stat.color} 15%, transparent)`,
                color: stat.color,
              }}
            >
              <stat.icon className="w-4 h-4" size={16} />
            </div>
            <div>
              <p
                className="text-lg font-bold text-[var(--text)]"
                style={{ fontFamily: 'var(--mono)', lineHeight: 1.2 }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-[var(--text3)]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 mb-6 p-1 rounded-xl"
        style={{ background: 'var(--surface2)', width: 'fit-content' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200"
            style={
              activeTab === tab.key
                ? {
                    background: 'var(--surface3)',
                    color: 'var(--text)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }
                : { color: 'var(--text3)' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {predictions.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {predictions.map((p) => (
            <PredictionCard key={p.id} prediction={p} />
          ))}
        </div>
      ) : (
        <div className="surface rounded-2xl p-12 text-center">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
              color: 'var(--accent)',
            }}
          >
            <IconTarget className="w-6 h-6" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
            No {activeTab} predictions yet
          </h3>
          <p className="text-sm text-[var(--text2)] mb-4 max-w-xs mx-auto">
            {activeTab === 'created'
              ? 'Create your first prediction to start building your track record.'
              : activeTab === 'voted'
                ? 'Browse predictions and cast your first vote.'
                : 'Resolved predictions will appear here once outcomes are confirmed.'}
          </p>
          <Link href={activeTab === 'created' ? '/predictions/create' : '/predictions'}>
            <Button size="sm" variant="outline">
              {activeTab === 'created' ? 'Create prediction' : 'Browse predictions'}
            </Button>
          </Link>
        </div>
      )}

      {/* Update timestamp */}
      <p
        className="text-center mt-6 text-[var(--text3)]"
        style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.04em' }}
      >
        Updated automatically
      </p>
    </DashboardLayout>
  )
}
