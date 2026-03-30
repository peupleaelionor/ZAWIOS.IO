import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { Button } from '@/components/ui/button'
import { mockPredictions } from '@/lib/mock-data'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
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
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">My Predictions</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Track your created and voted predictions</p>
        </div>
        <Link href="/predictions/create">
          <Button size="sm" className="gap-1.5">
            <PlusCircle className="w-4 h-4" />
            New prediction
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-800 mb-6">
        {['Created', 'Voted', 'Resolved'].map((tab, i) => (
          <button
            key={tab}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              i === 0
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
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
