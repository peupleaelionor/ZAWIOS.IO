import { cn, formatNumber } from '@/lib/utils'
import type { ComponentType } from 'react'

interface IconProps {
  className?: string
  size?: number
  style?: React.CSSProperties
}

interface StatCardProps {
  label: string
  value: number | string
  icon?: ComponentType<IconProps>
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
        'surface rounded-xl p-5 md:p-6',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--text3)] font-medium">{label}</p>
          <p className="mt-1 text-2xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>
            {displayValue}
            {suffix && <span className="text-lg ml-1 text-[var(--text3)]">{suffix}</span>}
          </p>
          {trend !== undefined && (
            <p
              className={cn(
                'mt-1 text-xs font-medium',
                isPositiveTrend ? 'text-[var(--teal)]' : 'text-[var(--zred)]'
              )}
              style={{ fontFamily: 'var(--mono)' }}
            >
              {isPositiveTrend ? '+' : ''}
              {trend}% vs last month
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-2.5 rounded-xl" style={{ background: 'rgba(23,213,207,0.1)' }}>
            <Icon className="w-5 h-5" size={20} style={{ color: 'var(--teal)' }} />
          </div>
        )}
      </div>
    </div>
  )
}
