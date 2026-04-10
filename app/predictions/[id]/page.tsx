import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { allPredictions } from '@/lib/mock-data'
import { RegionalComparison } from '@/components/world-view/regional-comparison'
import { formatDate, formatNumber } from '@/lib/utils'
import { IconCalendar, IconUsers, IconEye, IconComment, IconTrending, IconCheck } from '@/components/ui/icons'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const prediction = allPredictions.find((p) => p.id === id)
  if (!prediction) return { title: 'Prediction not found' }
  return {
    title: prediction.title,
    description: prediction.description,
  }
}

export default async function PredictionPage({ params }: Props) {
  const { id } = await params
  const prediction = allPredictions.find((p) => p.id === id)
  if (!prediction) notFound()

  const isResolved = prediction.status === 'resolved'
  const totalVotes = prediction.options?.reduce((sum, o) => sum + o.vote_count, 0) ?? 0

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="container py-12">
        <Link
          href="/predictions"
          className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors"
          style={{ color: 'var(--text3)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to predictions
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="surface rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-medium capitalize"
                  style={{ background: 'rgba(124,110,240,0.1)', color: 'var(--accent)' }}
                >
                  {prediction.category}
                </span>
                {isResolved && (
                  <Badge variant="success" className="gap-1">
                    <IconCheck size={12} />
                    Resolved
                  </Badge>
                )}
                {prediction.featured && (
                  <Badge variant="default" className="gap-1">
                    <IconTrending size={12} />
                    Trending
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-4" style={{ color: 'var(--text)' }}>
                {prediction.title}
              </h1>

              <p className="leading-relaxed" style={{ color: 'var(--text3)' }}>
                {prediction.description}
              </p>

              <div
                className="flex flex-wrap gap-4 mt-6 pt-6 text-sm"
                style={{ borderTop: '1px solid var(--border)', color: 'var(--text3)' }}
              >
                <span className="flex items-center gap-1.5">
                  <IconCalendar size={16} />
                  Resolves {formatDate(prediction.resolution_date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconUsers size={16} />
                  {formatNumber(prediction.vote_count)} votes
                </span>
                <span className="flex items-center gap-1.5">
                  <IconEye size={16} />
                  {formatNumber(prediction.view_count)} views
                </span>
                <span className="flex items-center gap-1.5">
                  <IconComment size={16} />
                  {prediction.comment_count} comments
                </span>
              </div>
            </div>

            {/* Voting */}
            <div className="surface rounded-2xl p-8">
              <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--text)' }}>
                Community vote · {formatNumber(totalVotes)} responses
              </h2>

              <div className="space-y-4">
                {prediction.options?.map((option) => (
                  <div key={option.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{option.label}</span>
                        {option.is_correct && (
                          <IconCheck size={16} style={{ color: 'var(--teal)' }} />
                        )}
                      </div>
                      <span className="text-sm font-bold" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>
                        {option.percentage}%
                      </span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${option.percentage}%`,
                          background: option.is_correct
                            ? 'var(--teal)'
                            : option.label === 'No'
                            ? 'var(--zred)'
                            : 'var(--accent)',
                        }}
                      />
                    </div>
                    <p className="text-xs mt-1" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{formatNumber(option.vote_count)} votes</p>
                  </div>
                ))}
              </div>

              {!isResolved && (
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                  <p className="text-sm mb-4" style={{ color: 'var(--text3)' }}>Cast your vote</p>
                  <div className="flex gap-3 flex-wrap">
                    {prediction.options?.map((option) => (
                      <Link href="/auth/login" key={option.id}>
                        <Button variant="outline" size="sm">
                          {option.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                  <p className="text-xs mt-3" style={{ color: 'var(--text3)' }}>
                    <Link href="/auth/login" className="underline">Sign in</Link> to cast your vote
                  </p>
                </div>
              )}

              {isResolved && prediction.resolution_notes && (
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="flex items-start gap-2 p-4 rounded-xl" style={{ background: 'rgba(52,208,182,0.08)', border: '1px solid rgba(52,208,182,0.2)' }}>
                    <IconCheck size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--teal)' }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--teal)' }}>Resolution</p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text2)' }}>{prediction.resolution_notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Comparaison régionale */}
            {prediction.regional_data && prediction.regional_data.length > 0 && (
              <div className="surface rounded-2xl p-8">
                <RegionalComparison data={prediction.regional_data} />
              </div>
            )}

            {/* Tags */}
            {prediction.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs" style={{ color: 'var(--text3)' }}>Tags:</span>
                {prediction.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {prediction.creator && (
              <div className="surface rounded-2xl p-6">
                <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--text3)' }}>Created by</h3>
                <Link href={`/profile/${prediction.creator.username}`} className="flex items-center gap-3 group">
                  <Avatar src={prediction.creator.avatar_url} name={prediction.creator.full_name} size="md" />
                  <div>
                    <p className="font-semibold transition-colors" style={{ color: 'var(--text)' }}>
                      {prediction.creator.full_name}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text3)' }}>@{prediction.creator.username}</p>
                  </div>
                </Link>
                {prediction.creator.bio && (
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text3)' }}>
                    {prediction.creator.bio}
                  </p>
                )}
              </div>
            )}

            <div className="rounded-2xl p-6" style={{ background: 'rgba(124,110,240,0.08)', border: '1px solid rgba(124,110,240,0.2)' }}>
              <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>Want to vote?</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text2)' }}>
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
