import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { Button } from '@/components/ui/button'
import { mockPredictions } from '@/lib/mock-data'
import Link from 'next/link'
import { PlusCircle, Filter } from 'lucide-react'
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
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main className="container py-12">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Predictions</h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              {mockPredictions.length} predictions · vote and compare with the crowd
            </p>
          </div>
          <Link href="/predictions/create">
            <Button size="sm" className="gap-1.5">
              <PlusCircle className="w-4 h-4" />
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
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'border-zinc-200 dark:border-zinc-700 hover:border-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 transition-colors">
            <Filter className="w-3.5 h-3.5" />
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
