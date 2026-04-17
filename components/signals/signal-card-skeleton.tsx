'use client'

// Colors match the YES (teal) / NO (pink) voting palette for visual coherence
const SHIMMER_YES  = 'rgba(29,228,222,0.06)'
const SHIMMER_MID  = 'rgba(29,228,222,0.12)'
const SHIMMER_NO   = 'rgba(255,107,157,0.06)'

function Shimmer({
  className,
  style,
  variant = 'neutral',
}: {
  className?: string
  style?: React.CSSProperties
  variant?: 'yes' | 'no' | 'neutral'
}) {
  const gradientColors =
    variant === 'yes'
      ? `linear-gradient(90deg, var(--surface2) 25%, ${SHIMMER_MID} 50%, var(--surface2) 75%)`
      : variant === 'no'
      ? `linear-gradient(90deg, var(--surface2) 25%, ${SHIMMER_NO} 50%, var(--surface2) 75%)`
      : `linear-gradient(90deg, var(--surface2) 25%, var(--surface3) 50%, var(--surface2) 75%)`

  return (
    <div
      className={className}
      style={{
        background:     gradientColors,
        backgroundSize: '200% 100%',
        animation:      'shimmer 1.6s infinite linear',
        borderRadius:   8,
        ...style,
      }}
    />
  )
}

export function SignalCardSkeleton({ index = 0 }: { index?: number }) {
  // Alternate YES/NO hints subtly across cards
  const hint = index % 3 === 0 ? 'yes' : index % 3 === 1 ? 'no' : 'neutral'

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{
        background:     'var(--surface)',
        border:         '1px solid var(--border)',
        animationDelay: `${index * 0.08}s`,
      }}
      aria-hidden="true"
    >
      {/* Header: category pill + time + bookmark */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shimmer style={{ width: 68, height: 20 }} variant={hint} />
          <Shimmer style={{ width: 52, height: 16 }} />
        </div>
        <Shimmer style={{ width: 28, height: 20 }} />
      </div>

      {/* Title: 2 lines */}
      <div className="flex flex-col gap-2.5">
        <Shimmer style={{ width: '100%', height: 17 }} />
        <Shimmer style={{ width: '72%', height: 17 }} />
      </div>

      {/* Subtle description line */}
      <Shimmer style={{ width: '90%', height: 13 }} />

      {/* Stats numbers */}
      <div className="flex gap-3 items-baseline">
        <Shimmer style={{ width: 52, height: 22 }} variant={hint} />
        <Shimmer style={{ width: 40, height: 16 }} />
        <Shimmer style={{ width: 36, height: 14 }} />
      </div>

      {/* Progress bar — tri-color segments */}
      <div
        className="w-full h-2 rounded-full flex overflow-hidden gap-[2px]"
        style={{ background: 'var(--surface3)' }}
      >
        <Shimmer style={{ width: '62%', height: '100%', borderRadius: '9999px 0 0 9999px' }} variant="yes" />
        <Shimmer style={{ width: '10%', height: '100%', borderRadius: 0 }} />
        <Shimmer style={{ width: '28%', height: '100%', borderRadius: '0 9999px 9999px 0' }} variant="no" />
      </div>

      {/* Vote buttons */}
      <div className="grid grid-cols-3 gap-2">
        <Shimmer style={{ height: 52, borderRadius: 12 }} variant="yes" />
        <Shimmer style={{ height: 52, borderRadius: 12 }} />
        <Shimmer style={{ height: 52, borderRadius: 12 }} variant="no" />
      </div>

      {/* Reactions row */}
      <div className="flex gap-2 items-center pt-1" style={{ borderTop: '1px solid var(--border)' }}>
        {[36, 32, 32, 32, 32].map((w, i) => (
          <Shimmer key={i} style={{ width: w, height: 24, borderRadius: 20 }} />
        ))}
        <div className="flex-1" />
        <Shimmer style={{ width: 64, height: 24, borderRadius: 20 }} />
      </div>

      {/* Footer: avatar + trending */}
      <div className="flex items-center justify-between pt-1" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <Shimmer style={{ width: 24, height: 24, borderRadius: '50%' }} />
          <Shimmer style={{ width: 80, height: 12 }} />
        </div>
        <Shimmer style={{ width: 48, height: 14, borderRadius: 20 }} />
      </div>
    </div>
  )
}

export function SignalFeedSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <SignalCardSkeleton key={i} index={i} />
      ))}
    </div>
  )
}
