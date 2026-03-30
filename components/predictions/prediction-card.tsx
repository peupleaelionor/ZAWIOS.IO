import Link from 'next/link'
import { formatDate, formatNumber } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { MessageSquare, Eye, TrendingUp, CheckCircle, Clock } from 'lucide-react'
import type { Prediction } from '@/types'

const categoryColors: Record<string, string> = {
  technology: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  finance: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  politics: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  sports: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  science: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  business: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  culture: 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  world: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
}

interface PredictionCardProps {
  prediction: Prediction
  compact?: boolean
}

export function PredictionCard({ prediction, compact = false }: PredictionCardProps) {
  const mainOption = prediction.options?.[0]
  const secondOption = prediction.options?.[1]
  const isResolved = prediction.status === 'resolved'

  return (
    <Link href={`/predictions/${prediction.id}`} className="block group">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5 card-hover">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${categoryColors[prediction.category] || 'bg-zinc-100 text-zinc-700'}`}
            >
              {prediction.category}
            </span>
            {isResolved && (
              <Badge variant="success" className="gap-1">
                <CheckCircle className="w-3 h-3" />
                Resolved
              </Badge>
            )}
            {prediction.featured && !isResolved && (
              <Badge variant="default" className="gap-1">
                <TrendingUp className="w-3 h-3" />
                Trending
              </Badge>
            )}
          </div>
          <span className="text-xs text-zinc-400 whitespace-nowrap flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(prediction.resolution_date)}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors leading-snug ${compact ? 'text-sm line-clamp-2' : 'text-base line-clamp-2'}`}
        >
          {prediction.title}
        </h3>

        {!compact && (
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {prediction.description}
          </p>
        )}

        {/* Progress bar for yes/no */}
        {prediction.type === 'yes_no' && mainOption && secondOption && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-zinc-500 mb-1">
              <span className="font-medium text-emerald-600">
                {mainOption.label} {mainOption.percentage}%
              </span>
              <span className="font-medium text-red-500">
                {secondOption.label} {secondOption.percentage}%
              </span>
            </div>
            <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${mainOption.percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Probability */}
        {prediction.type === 'probability' && mainOption && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-zinc-500 mb-1">
              <span>Community probability</span>
              <span className="font-semibold text-indigo-600">{mainOption.percentage}%</span>
            </div>
            <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${mainOption.percentage}%` }}
              />
            </div>
          </div>
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
              <span className="text-xs text-zinc-500">{prediction.creator.username}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-xs text-zinc-400 ml-auto">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {formatNumber(prediction.vote_count)}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {formatNumber(prediction.comment_count)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatNumber(prediction.view_count)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
