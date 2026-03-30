import { cn, formatNumber } from '@/lib/utils'
import { type LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: number | string
  icon?: LucideIcon
  trend?: number
  suffix?: string
  className?: string
}

export function StatCard({ label, value, icon: Icon, trend, suffix, className }: StatCardProps) {
  const displayValue = typeof value === 'number' ? formatNumber(value) : value
  const isPositiveTrend = trend !== undefined && trend > 0

  return (
    <div
      className={cn(
        'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{label}</p>
          <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {displayValue}
            {suffix && <span className="text-lg ml-1 text-zinc-400">{suffix}</span>}
          </p>
          {trend !== undefined && (
            <p
              className={cn(
                'mt-1 text-xs font-medium',
                isPositiveTrend ? 'text-emerald-600' : 'text-red-600'
              )}
            >
              {isPositiveTrend ? '+' : ''}
              {trend}% vs last month
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
            <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
        )}
      </div>
    </div>
  )
}
