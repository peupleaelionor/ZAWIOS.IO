'use client'

import { cn } from '@/lib/utils'
import { IconMark } from '@/components/ui/icons'
import { type Signal } from '@/lib/signals-data'
import { formatNumber } from '@/lib/utils'

interface ShareCardProps {
  signal: Signal
  userVote: 'yes' | 'no'
  wasCorrect?: boolean
  userScore?: number
}

// Decorative convergence lines for share card backdrop
function CardConvergence() {
  const n = 9
  const cx = 120
  const cy = 48
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 96"
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none', opacity: 0.12 }}
    >
      {Array.from({ length: n }, (_, i) => {
        const y = (i / (n - 1)) * 96
        return (
          <line
            key={`r${i}`}
            x1={cx} y1={cy}
            x2={240} y2={y}
            stroke="#17d5cf"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        )
      })}
      {Array.from({ length: n }, (_, i) => {
        const y = (i / (n - 1)) * 96
        return (
          <line
            key={`l${i}`}
            x1={cx} y1={cy}
            x2={0} y2={y}
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export function ShareCard({ signal, userVote, wasCorrect, userScore }: ShareCardProps) {
  const shareText = `${signal.title}\n${signal.yesPercent}% YES · ${signal.noPercent}% NO · ${formatNumber(signal.totalVotes)} votes\nzawios.io`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).catch(() => {})
  }

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ text: shareText }).catch(() => {})
    } else {
      handleCopy()
    }
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
    >
      {/* ── Preview card — matches Social Share Framework design ── */}
      <div
        className="relative overflow-hidden p-5"
        style={{ background: 'linear-gradient(135deg, #0c0d10 0%, #141820 100%)' }}
      >
        <CardConvergence />

        {/* Header: mark + brand */}
        <div className="relative flex items-center gap-2 mb-4">
          <IconMark width={32} leftColor="rgba(255,255,255,0.9)" rightColor="#17d5cf" />
          <div>
            <p className="text-[13px] font-bold text-white leading-none tracking-wide">ZAWIOS</p>
            <p className="text-[9px] text-[rgba(255,255,255,0.4)] uppercase tracking-widest mt-0.5" style={{ fontFamily: 'var(--mono)' }}>
              data-driven signal
            </p>
          </div>
        </div>

        {/* Signal title */}
        <p className="relative text-sm font-semibold text-white leading-snug mb-4 pr-4" style={{ maxWidth: '85%' }}>
          {signal.title}
        </p>

        {/* Vote stats */}
        <div className="relative flex items-end gap-4">
          <div>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--mono)', lineHeight: 1 }}>
              {signal.yesPercent}%
            </p>
            <p className="text-[10px] text-[rgba(255,255,255,0.45)] mt-1" style={{ fontFamily: 'var(--mono)' }}>
              {signal.yesPercent}% YES · {signal.noPercent}% NO
            </p>
          </div>

          {/* YES/NO pills */}
          <div className="flex gap-2 ml-auto">
            <span
              className={cn(
                'px-3 py-1 rounded-full text-[11px] font-bold',
                userVote === 'yes'
                  ? 'bg-[var(--teal)] text-[var(--bg)]'
                  : 'bg-transparent text-[var(--teal)] border border-[rgba(23,213,207,0.35)]'
              )}
              style={{ fontFamily: 'var(--mono)' }}
            >
              YES
            </span>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-[11px] font-bold',
                userVote === 'no'
                  ? 'bg-white text-[var(--bg)]'
                  : 'bg-transparent text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.15)]'
              )}
              style={{ fontFamily: 'var(--mono)' }}
            >
              NO
            </span>
          </div>
        </div>

        {/* Vote count */}
        <p className="relative mt-3 text-[10px] text-[rgba(255,255,255,0.3)]" style={{ fontFamily: 'var(--mono)' }}>
          Voted by {formatNumber(signal.totalVotes)} users
        </p>

        {/* Outcome badge if resolved */}
        {wasCorrect !== undefined && (
          <div
            className={cn(
              'relative mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold',
              wasCorrect
                ? 'bg-[var(--teal)]/15 text-[var(--teal)]'
                : 'bg-[var(--zred)]/15 text-[var(--zred)]'
            )}
            style={{ fontFamily: 'var(--mono)' }}
          >
            {wasCorrect ? 'YOU WERE RIGHT' : 'YOU WERE WRONG'}
            {userScore !== undefined && (
              <span className="text-[rgba(255,255,255,0.5)]">
                · +{userScore} pts
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Share actions ── */}
      <div className="flex gap-2 p-4">
        <button
          onClick={handleCopy}
          className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[var(--text2)] transition-colors"
          style={{
            fontFamily: 'var(--mono)',
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
          }}
        >
          Copier
        </button>
        <button
          onClick={() => window.open(`https://linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(signal.title)}`, '_blank')}
          className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white transition-all hover:brightness-110"
          style={{
            fontFamily: 'var(--mono)',
            background: '#0A66C2',
          }}
        >
          LinkedIn
        </button>
        <button
          onClick={handleNativeShare}
          className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[var(--bg)] transition-all hover:brightness-110"
          style={{
            fontFamily: 'var(--mono)',
            background: 'var(--teal)',
          }}
        >
          Partager
        </button>
      </div>
    </div>
  )
}
