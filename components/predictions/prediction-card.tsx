import Link from 'next/link'
import { formatDate, formatNumber } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { IconComment, IconEye, IconTrending, IconCheck } from '@/components/ui/icons'
import { VoteButtons } from '@/components/predictions/vote-buttons'
import type { Prediction } from '@/types'

const categoryColors: Record<string, { bg: string; text: string }> = {
  technology: { bg: 'rgba(96,165,250,0.12)', text: '#60a5fa' },
  finance: { bg: 'rgba(52,208,182,0.12)', text: 'var(--teal)' },
  politics: { bg: 'rgba(124,110,240,0.12)', text: 'var(--accent2)' },
  sports: { bg: 'rgba(251,146,60,0.12)', text: '#fb923c' },
  science: { bg: 'rgba(34,211,238,0.12)', text: '#22d3ee' },
  business: { bg: 'rgba(250,204,21,0.12)', text: 'var(--amber)' },
  culture: { bg: 'rgba(244,114,182,0.12)', text: '#f472b6' },
  world: { bg: 'rgba(124,110,240,0.12)', text: 'var(--accent2)' },
}

interface PredictionCardProps {
  prediction: Prediction
  compact?: boolean
}

export function PredictionCard({ prediction, compact = false }: PredictionCardProps) {
  const mainOption = prediction.options?.[0]
  const secondOption = prediction.options?.[1]
  const isResolved = prediction.status === 'resolved'
  const catStyle = categoryColors[prediction.category] || { bg: 'var(--surface2)', text: 'var(--text2)' }

  return (
    <Link href={`/predictions/${prediction.id}`} className="block group">
      <div className="surface rounded-2xl p-5 card-hover relative overflow-hidden">
        <div className="accent-line-top" />
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
              style={{ background: catStyle.bg, color: catStyle.text }}
            >
              {prediction.category}
            </span>
            {isResolved && (
              <Badge variant="success" className="gap-1">
                <IconCheck className="w-3 h-3" size={12} />
                Resolved
              </Badge>
            )}
            {prediction.featured && !isResolved && (
              <Badge variant="default" className="gap-1">
                <IconTrending className="w-3 h-3" size={12} />
                Trending
              </Badge>
            )}
          </div>
          <span className="text-xs text-[var(--text3)] whitespace-nowrap flex items-center gap-1" style={{ fontFamily: 'var(--mono)' }}>
            {formatDate(prediction.resolution_date)}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-semibold text-[var(--text)] group-hover:text-[var(--accent2)] transition-colors leading-snug ${compact ? 'text-sm line-clamp-2' : 'text-base line-clamp-2'}`}
        >
          {prediction.title}
        </h3>

        {!compact && (
          <p className="mt-2 text-sm text-[var(--text2)] line-clamp-2 leading-relaxed">
            {prediction.description}
          </p>
        )}

        {/* Progress bar for yes/no */}
        {prediction.type === 'yes_no' && mainOption && secondOption && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1" style={{ fontFamily: 'var(--mono)' }}>
              <span className="font-medium text-[var(--teal)]">
                {mainOption.label} {mainOption.percentage}%
              </span>
              <span className="font-medium text-[var(--zred)]">
                {secondOption.label} {secondOption.percentage}%
              </span>
            </div>
            <div className="h-1.5 bg-[var(--surface3)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${mainOption.percentage}%`, background: 'linear-gradient(90deg, var(--teal), var(--accent))' }}
              />
            </div>
          </div>
        )}

        {/* Probability */}
        {prediction.type === 'probability' && mainOption && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1" style={{ fontFamily: 'var(--mono)' }}>
              <span className="text-[var(--text3)]">Community probability</span>
              <span className="font-semibold text-[var(--accent)]">{mainOption.percentage}%</span>
            </div>
            <div className="h-1.5 bg-[var(--surface3)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${mainOption.percentage}%`, background: 'var(--accent)' }}
              />
            </div>
          </div>
        )}

        {/* Inline vote buttons for active yes/no predictions */}
        {prediction.type === 'yes_no' && !isResolved && (
          <VoteButtons predictionId={prediction.id} className="mt-3" />
        )}

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          {prediction.creator && (
            <div className="flex items-center gap-2">
              <Avatar
                src={prediction.creator.avatar_url}
                name={prediction.creator.full_name}
                size="xs"
              />
              <span className="text-xs text-[var(--text3)]">@{prediction.creator.username}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-xs text-[var(--text3)] ml-auto" style={{ fontFamily: 'var(--mono)' }}>
            <span className="flex items-center gap-1">
              <IconTrending className="w-3 h-3" size={12} />
              {formatNumber(prediction.vote_count)}
            </span>
            <span className="flex items-center gap-1">
              <IconComment className="w-3 h-3" size={12} />
              {formatNumber(prediction.comment_count)}
            </span>
            <span className="flex items-center gap-1">
              <IconEye className="w-3 h-3" size={12} />
              {formatNumber(prediction.view_count)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
