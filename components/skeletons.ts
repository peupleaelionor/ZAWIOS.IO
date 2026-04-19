/**
 * ZAWIOS — Skeleton components barrel export
 *
 * Central import for all loading skeletons used with Suspense boundaries.
 */
export { Skeleton, SkeletonCard, SkeletonText } from './ui/skeleton'
export { SignalCardSkeleton, SignalFeedSkeleton } from './signals/signal-card-skeleton'

/**
 * Convenience alias for Suspense fallback in signal feeds.
 * Usage: <Suspense fallback={<SignalSkeleton />}>
 */
export { SignalFeedSkeleton as SignalSkeleton } from './signals/signal-card-skeleton'
