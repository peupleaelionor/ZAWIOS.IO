'use client'

import { cn } from '@/lib/utils'
import { IconMark } from '@/components/ui/icons'
import { type Signal } from '@/lib/signals-data'

interface ShareCardProps {
  signal: Signal
  userVote: 'yes' | 'no'
  wasCorrect: boolean
  userScore: number
}

export function ShareCard({ signal, userVote, wasCorrect, userScore }: ShareCardProps) {
  const shareText = wasCorrect
    ? `J'avais raison sur ZAWIOS : "${signal.title}" — Mon score : ${userScore} pts`
    : `J'avais tort sur ZAWIOS : "${signal.title}" — La foule gagne cette fois`

  const majorityPercent = Math.max(signal.yesPercent, signal.noPercent)
  const majorityLabel = signal.yesPercent > signal.noPercent ? 'YES' : 'NO'

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).catch(() => {})
  }

  return (
    <div className="surface p-4 md:p-5 rounded-xl space-y-4">
      {/* OG-style preview card (1200×630 ratio approximated) */}
      <div
        className="rounded-xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0C0D10 0%, #13141a 100%)',
          border: '1px solid var(--border2)',
          aspectRatio: '1200 / 630',
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
          {/* Top: Logo */}
          <div className="flex items-center gap-2">
            <IconMark width={28} leftColor="rgba(255,255,255,0.6)" rightColor="rgba(23,213,207,0.6)" />
            <span className="text-xs font-bold text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>
              ZAWIOS
            </span>
          </div>

          {/* Center: Big percentage */}
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)', lineHeight: 1 }}>
              {majorityPercent}%
            </p>
            <p className={cn(
              'text-sm font-bold mt-1',
              majorityLabel === 'YES' ? 'text-[var(--teal)]' : 'text-[var(--text2)]',
            )} style={{ fontFamily: 'var(--mono)' }}>
              {majorityLabel}
            </p>
          </div>

          {/* Bottom: Question + result */}
          <div>
            <p className="text-sm font-semibold text-[var(--text)] line-clamp-2 mb-2">{signal.title}</p>
            <div className="flex items-center gap-3">
              <span className={cn(
                'text-xs font-bold px-2 py-0.5 rounded',
                wasCorrect ? 'bg-[var(--teal)]/20 text-[var(--teal)]' : 'bg-[var(--zred)]/20 text-[var(--zred)]',
              )} style={{ fontFamily: 'var(--mono)' }}>
                {wasCorrect ? 'CORRECT' : 'FAUX'}
              </span>
              <span className="text-xs text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                Vote: {userVote.toUpperCase()} | Score: {userScore}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Share actions */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 py-3 rounded-xl text-xs font-semibold text-[var(--text)] bg-[var(--surface2)] hover:bg-[var(--surface3)] transition-colors duration-150 border border-[var(--border2)] min-h-[48px]"
          style={{ fontFamily: 'var(--mono)' }}
        >
          Copier le lien
        </button>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ text: shareText }).catch(() => {})
            }
          }}
          className="flex-1 py-3 rounded-xl text-xs font-semibold text-[var(--bg)] bg-[var(--teal)] hover:brightness-110 transition-all duration-150 min-h-[48px]"
          style={{ fontFamily: 'var(--mono)' }}
        >
          Partager
        </button>
      </div>
    </div>
  )
}
