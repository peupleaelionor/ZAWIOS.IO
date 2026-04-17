import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { allPredictions } from '@/lib/mock-data'
import { RegionalComparison } from '@/components/world-view/regional-comparison'
import { PredictionImage } from '@/components/ui/prediction-image'
import { VotePanel } from '@/components/predictions/vote-panel'
import { CommentSection } from '@/components/comments/comment-section'
import { formatDate, formatNumber } from '@/lib/utils'
import {
  IconCalendar,
  IconUsers,
  IconEye,
  IconComment,
  IconTrending,
  IconCheck,
} from '@/components/ui/icons'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const prediction = allPredictions.find((p) => p.id === id)
  if (!prediction) return { title: 'Signal introuvable' }
  return {
    title: prediction.title,
    description: prediction.description || `Votez et suivez ce signal sur ZAWIOS.`,
    openGraph: {
      title: prediction.title,
      description: prediction.description || 'Votez et suivez ce signal sur ZAWIOS.',
      type: 'article',
    },
  }
}

export default async function SignalDetailPage({ params }: Props) {
  const { id } = await params
  const prediction = allPredictions.find((p) => p.id === id)
  if (!prediction) notFound()

  const isResolved = prediction.status === 'resolved'

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />

      {/* ── Hero image ── */}
      <div style={{ position: 'relative' }}>
        <PredictionImage
          predictionId={prediction.id}
          title={prediction.title}
          category={prediction.category}
          height={320}
          gradient
          hero
        />
        {/* Badges overlaid */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center gap-2 px-6 py-5 flex-wrap"
          style={{ zIndex: 2 }}
        >
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
            style={{
              background: 'rgba(5,5,8,0.65)',
              color: 'var(--accent)',
              border: '1px solid rgba(23,213,207,0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {prediction.category}
          </span>
          {isResolved && (
            <Badge variant="success" className="gap-1">
              <IconCheck size={12} /> Resolved
            </Badge>
          )}
          {prediction.featured && (
            <Badge variant="default" className="gap-1">
              <IconTrending size={12} /> Trending
            </Badge>
          )}
        </div>
      </div>

      <main className="container py-10 md:max-w-3xl md:mx-auto">
        {/* Back */}
        <Link
          href="/signals"
          className="inline-flex items-center gap-1.5 text-sm mb-7 transition-colors"
          style={{ color: 'var(--text3)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Retour aux signaux
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Main ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Title + meta */}
            <div className="surface rounded-2xl p-8">
              <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-4" style={{ color: 'var(--text)' }}>
                {prediction.title}
              </h1>
              {prediction.description && (
                <p className="leading-relaxed mb-6" style={{ color: 'var(--text3)' }}>
                  {prediction.description}
                </p>
              )}
              <div
                className="flex flex-wrap gap-4 text-sm pt-4"
                style={{ borderTop: '1px solid var(--border)', color: 'var(--text3)' }}
              >
                <span className="flex items-center gap-1.5">
                  <IconCalendar size={15} />
                  Resolves {formatDate(prediction.resolution_date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconUsers size={15} />
                  {formatNumber(prediction.vote_count)} votes
                </span>
                <span className="flex items-center gap-1.5">
                  <IconEye size={15} />
                  {formatNumber(prediction.view_count)} views
                </span>
                <span className="flex items-center gap-1.5">
                  <IconComment size={15} />
                  {prediction.comment_count} comments
                </span>
              </div>
            </div>

            {/* ── Vote panel (interactive) ── */}
            <div className="surface rounded-2xl p-8">
              <VotePanel prediction={prediction} />
            </div>

            {/* Regional comparison */}
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

            {/* ── Comments ── */}
            <div className="surface rounded-2xl p-8">
              <CommentSection
                predictionId={prediction.id}
                commentCount={prediction.comment_count}
              />
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            {/* Creator */}
            {prediction.creator && (
              <div className="surface rounded-2xl p-6">
                <h3 className="text-xs font-bold mb-4 uppercase tracking-wider"
                  style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                  Created by
                </h3>
                <Link href={`/profile/${prediction.creator.username}`} className="flex items-center gap-3 group">
                  <Avatar src={prediction.creator.avatar_url} name={prediction.creator.full_name} size="md" />
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--text)' }}>
                      {prediction.creator.full_name}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text3)' }}>
                      @{prediction.creator.username}
                    </p>
                  </div>
                </Link>
                {prediction.creator.bio && (
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text3)' }}>
                    {prediction.creator.bio}
                  </p>
                )}
              </div>
            )}

            {/* Track accuracy CTA */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(23,213,207,0.06)', border: '1px solid rgba(23,213,207,0.2)' }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--accent)' }}>
                Track your accuracy
              </h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text2)' }}>
                Create a free account to link your vote to your reputation score and
                track your forecast accuracy over time.
              </p>
              <Link href="/auth/signup" className="block">
                <button
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.97]"
                  style={{ background: 'var(--accent)', color: 'var(--bg)', border: 'none', cursor: 'pointer' }}
                >
                  Join free
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="surface rounded-2xl p-5">
              <h3 className="text-xs font-bold mb-4 uppercase tracking-wider"
                style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                Signal stats
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Total votes', value: formatNumber(prediction.vote_count) },
                  { label: 'Views', value: formatNumber(prediction.view_count) },
                  { label: 'Comments', value: String(prediction.comment_count) },
                  {
                    label: 'Status',
                    value: isResolved ? 'Resolved' : 'Open',
                    accent: isResolved ? 'var(--teal)' : 'var(--amber)',
                  },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between items-center">
                    <span className="text-xs" style={{ color: 'var(--text3)' }}>{s.label}</span>
                    <span className="text-sm font-semibold"
                      style={{ color: s.accent ?? 'var(--text)', fontFamily: 'var(--mono)' }}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
