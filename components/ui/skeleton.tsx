import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  style?: CSSProperties
}

export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={cn('skeleton', className)} style={style} />
}

// Pre-built skeletons for common shapes
export function SkeletonCard() {
  return (
    <div className="surface rounded-2xl overflow-hidden">
      <Skeleton style={{ height: 72 }} className="rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton style={{ height: 10, width: '35%' }} />
        <Skeleton style={{ height: 14, width: '90%' }} />
        <Skeleton style={{ height: 14, width: '70%' }} />
        <div className="flex items-center justify-between pt-2">
          <Skeleton style={{ height: 32, width: 32, borderRadius: '50%' }} />
          <Skeleton style={{ height: 10, width: '20%' }} />
        </div>
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          style={{ height: 12, width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}
