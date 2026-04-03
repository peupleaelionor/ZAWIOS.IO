import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { Button } from '@/components/ui/button'
import { mockPredictions } from '@/lib/mock-data'
import Link from 'next/link'
import { IconPlus } from '@/components/ui/icons'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Predictions',
}

export default function DashboardPredictionsPage() {
  const myPredictions = mockPredictions.slice(0, 4)

  return (
    <DashboardLayout>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]" style={{ letterSpacing: '-0.01em' }}>
            My Predictions
          </h1>
          <p className="text-[var(--text2)] mt-1 text-sm">Track your created and voted predictions</p>
        </div>
        <Link href="/predictions/create">
          <Button size="sm" className="gap-1.5">
            <IconPlus className="w-4 h-4" size={16} />
            New prediction
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: 'var(--surface2)', width: 'fit-content' }}>
        {['Created', 'Voted', 'Resolved'].map((tab, i) => (
          <button
            key={tab}
            className="px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200"
            style={
              i === 0
                ? { background: 'var(--surface3)', color: 'var(--text)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }
                : { color: 'var(--text3)' }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {myPredictions.map((p) => (
          <PredictionCard key={p.id} prediction={p} />
        ))}
      </div>
    </DashboardLayout>
  )
}
