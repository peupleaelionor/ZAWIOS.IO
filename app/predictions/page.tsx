import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { Button } from '@/components/ui/button'
import { IconZap, IconTarget } from '@/components/ui/icons'
import { mockPredictions } from '@/lib/mock-data'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Predictions',
  description: 'Browse all predictions on ZAWIOS. Vote, predict, and compare your views with the crowd.',
}

const categories = [
  { value: 'all', label: 'All' },
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'politics', label: 'Politics' },
  { value: 'science', label: 'Science' },
  { value: 'sports', label: 'Sports' },
  { value: 'business', label: 'Business' },
  { value: 'culture', label: 'Culture' },
  { value: 'world', label: 'World' },
]

export default function PredictionsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="container py-12">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text)]">Predictions</h1>
            <p className="mt-2 text-[var(--text2)]">
              {mockPredictions.length} predictions · vote and compare with the crowd
            </p>
          </div>
          <Link href="/predictions/create">
            <Button size="sm" className="gap-1.5">
              <IconZap className="w-4 h-4" size={16} />
              Create prediction
            </Button>
          </Link>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat, i) => (
            <button
              key={cat.value}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                i === 0
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'border-[var(--border2)] hover:border-[var(--accent)] hover:text-[var(--accent2)] text-[var(--text2)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-[var(--border2)] text-[var(--text2)] hover:border-[var(--accent)] transition-colors">
            <IconTarget className="w-3.5 h-3.5" size={14} />
            Filter
          </button>
        </div>

        {/* Predictions grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPredictions.map((prediction) => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
