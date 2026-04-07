import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline' | 'category'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[var(--teal)]/12 text-[var(--teal)] border border-[var(--teal)]/20',
    success: 'bg-[var(--teal)]/12 text-[var(--teal)] border border-[var(--teal)]/20',
    warning: 'bg-[var(--amber)]/12 text-[var(--amber)] border border-[var(--amber)]/20',
    danger: 'bg-[var(--zred)]/12 text-[var(--zred)] border border-[var(--zred)]/20',
    outline: 'border border-[var(--border2)] text-[var(--text2)]',
    category: 'bg-[var(--surface2)] text-[var(--text2)] border border-[var(--border)]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
