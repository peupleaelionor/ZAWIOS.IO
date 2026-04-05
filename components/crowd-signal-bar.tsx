import { cn } from '@/lib/utils'

interface CrowdSignalBarProps {
  yesPercent: number
  totalVotes: number
  compact?: boolean
  className?: string
}

export function CrowdSignalBar({
  yesPercent,
  totalVotes,
  compact = false,
  className,
}: CrowdSignalBarProps) {
  const clamped = Math.max(0, Math.min(100, yesPercent))
  const noPercent = 100 - clamped
  const isEmpty = totalVotes === 0
  const strongSignal = !isEmpty && (clamped > 70 || clamped < 30)
  const dominant = clamped >= 50 ? 'Yes' : 'No'

  return (
    <div className={cn('flex flex-col', compact ? 'gap-1' : 'gap-1.5', className)}>
      {/* Percentage labels */}
      <div
        className={cn(
          'flex items-center justify-between',
          compact ? 'text-[10px]' : 'text-xs',
        )}
        style={{ fontFamily: 'var(--mono)' }}
      >
        <span style={{ color: 'var(--teal)' }}>
          {isEmpty ? '--' : `${Math.round(clamped)}% Yes`}
        </span>
        <span style={{ color: 'var(--zred)' }}>
          {isEmpty ? '--' : `${Math.round(noPercent)}% No`}
        </span>
      </div>

      {/* Bar */}
      <div
        className={cn(
          'flex w-full overflow-hidden',
          compact ? 'h-1.5' : 'h-2',
        )}
        style={{
          borderRadius: 'var(--radius)',
          backgroundColor: isEmpty ? 'var(--surface2)' : undefined,
        }}
      >
        {!isEmpty && (
          <>
            <div
              style={{
                width: `${clamped}%`,
                backgroundColor: 'var(--teal)',
                borderRadius:
                  clamped === 100
                    ? 'var(--radius)'
                    : 'var(--radius) 0 0 var(--radius)',
              }}
            />
            <div
              style={{
                width: `${noPercent}%`,
                backgroundColor: 'var(--zred)',
                opacity: 0.7,
                borderRadius:
                  noPercent === 100
                    ? 'var(--radius)'
                    : '0 var(--radius) var(--radius) 0',
              }}
            />
          </>
        )}
      </div>

      {/* Meta line */}
      <div
        className={cn(
          'flex items-center justify-between',
          compact ? 'text-[9px]' : 'text-[10px]',
        )}
        style={{ fontFamily: 'var(--mono)' }}
      >
        <span style={{ color: 'var(--text3)' }}>
          {totalVotes === 0
            ? 'No votes yet'
            : `${totalVotes.toLocaleString()} vote${totalVotes === 1 ? '' : 's'}`}
        </span>
        {strongSignal && (
          <span
            className="uppercase tracking-wider"
            style={{ color: dominant === 'Yes' ? 'var(--teal)' : 'var(--zred)' }}
          >
            Strong signal
          </span>
        )}
      </div>
    </div>
  )
}
