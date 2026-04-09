'use client'

function Shimmer({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      style={{
        background: 'linear-gradient(90deg, var(--surface2) 25%, var(--surface3) 50%, var(--surface2) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.4s infinite linear',
        borderRadius: 6,
        ...style,
      }}
    />
  )
}

export function SignalCardSkeleton() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div
        className="rounded-2xl p-5 flex flex-col gap-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        aria-hidden="true"
      >
        {/* Header: category pill + region */}
        <div className="flex items-center justify-between">
          <Shimmer style={{ width: 72, height: 22 }} />
          <Shimmer style={{ width: 48, height: 16 }} />
        </div>

        {/* Title lines */}
        <div className="flex flex-col gap-2">
          <Shimmer style={{ width: '100%', height: 18 }} />
          <Shimmer style={{ width: '78%', height: 18 }} />
        </div>

        {/* Progress bar */}
        <Shimmer style={{ width: '100%', height: 6 }} />

        {/* Stats row */}
        <div className="flex gap-4">
          <Shimmer style={{ width: 48, height: 14 }} />
          <Shimmer style={{ width: 48, height: 14 }} />
          <Shimmer style={{ width: 48, height: 14 }} />
        </div>

        {/* Vote buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Shimmer style={{ height: 48 }} />
          <Shimmer style={{ height: 48 }} />
          <Shimmer style={{ height: 48 }} />
        </div>
      </div>
    </>
  )
}

export function SignalFeedSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <SignalCardSkeleton key={i} />
      ))}
    </div>
  )
}
