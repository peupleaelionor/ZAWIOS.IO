import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { mockPredictions } from '@/lib/mock-data'
import { formatDate, formatNumber } from '@/lib/utils'
import {
  Calendar,
  Users,
  Eye,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const prediction = mockPredictions.find((p) => p.id === id)
  if (!prediction) return { title: 'Prediction not found' }
  return {
    title: prediction.title,
    description: prediction.description,
  }
}

export default async function PredictionPage({ params }: Props) {
  const { id } = await params
  const prediction = mockPredictions.find((p) => p.id === id)
  if (!prediction) notFound()

  const isResolved = prediction.status === 'resolved'
  const totalVotes = prediction.options?.reduce((sum, o) => sum + o.vote_count, 0) ?? 0

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main className="container py-12">
        <Link href="/predictions" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to predictions
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 capitalize">
                  {prediction.category}
                </span>
                {isResolved && (
                  <Badge variant="success" className="gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Resolved
                  </Badge>
                )}
                {prediction.featured && (
                  <Badge variant="default" className="gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-snug mb-4">
                {prediction.title}
              </h1>

              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {prediction.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Resolves {formatDate(prediction.resolution_date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {formatNumber(prediction.vote_count)} votes
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {formatNumber(prediction.view_count)} views
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  {prediction.comment_count} comments
                </span>
              </div>
            </div>

            {/* Voting */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
                Community vote · {formatNumber(totalVotes)} responses
              </h2>

              <div className="space-y-4">
                {prediction.options?.map((option) => (
                  <div key={option.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{option.label}</span>
                        {option.is_correct && (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {option.percentage}%
                      </span>
                    </div>
                    <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          option.is_correct
                            ? 'bg-emerald-500'
                            : option.label === 'Yes'
                            ? 'bg-indigo-500'
                            : option.label === 'No'
                            ? 'bg-red-400'
                            : 'bg-indigo-500'
                        }`}
                        style={{ width: `${option.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">{formatNumber(option.vote_count)} votes</p>
                  </div>
                ))}
              </div>

              {!isResolved && (
                <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-sm text-zinc-500 mb-4">Cast your vote</p>
                  <div className="flex gap-3 flex-wrap">
                    {prediction.options?.map((option) => (
                      <Link href="/auth/login" key={option.id}>
                        <Button variant="outline" size="sm">
                          {option.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-400 mt-3">
                    <Link href="/auth/login" className="underline">Sign in</Link> to cast your vote
                  </p>
                </div>
              )}

              {isResolved && prediction.resolution_notes && (
                <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-start gap-2 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Resolution</p>
                      <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">{prediction.resolution_notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {prediction.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-zinc-400">Tags:</span>
                {prediction.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {prediction.creator && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                <h3 className="text-sm font-medium text-zinc-500 mb-4">Created by</h3>
                <Link href={`/profile/${prediction.creator.username}`} className="flex items-center gap-3 group">
                  <Avatar src={prediction.creator.avatar_url} name={prediction.creator.full_name} size="md" />
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 transition-colors">
                      {prediction.creator.full_name}
                    </p>
                    <p className="text-sm text-zinc-500">@{prediction.creator.username}</p>
                  </div>
                </Link>
                {prediction.creator.bio && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
                    {prediction.creator.bio}
                  </p>
                )}
              </div>
            )}

            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-2">Want to vote?</h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-400 mb-4 leading-relaxed">
                Create a free account to cast your vote and track your prediction accuracy.
              </p>
              <Link href="/auth/signup" className="block">
                <Button size="sm" className="w-full">Join free</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
