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

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).catch(() => {})
  }

  return (
    <div className="surface p-5 rounded-2xl space-y-4">
      {/* Preview card */}
      <div
        className="p-4 rounded-xl relative overflow-hidden"
        style={{ background: 'var(--surface2)', border: '1px solid var(--border2)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <IconMark width={24} leftColor="rgba(255,255,255,0.6)" rightColor="rgba(52,208,182,0.6)" />
          <span className="text-[10px] font-bold text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>
            ZAWIOS
          </span>
        </div>
        <p className="text-sm font-semibold text-[var(--text)] mb-2">{signal.title}</p>
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

      {/* Share actions */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[var(--text)] bg-[var(--surface2)] hover:bg-[var(--surface3)] transition-colors border border-[var(--border2)]"
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
          className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[var(--bg)] bg-[var(--teal)] hover:brightness-110 transition-all"
          style={{ fontFamily: 'var(--mono)' }}
        >
          Partager
        </button>
      </div>
    </div>
  )
}
