import Link from 'next/link'
import { formatDate, formatNumber } from '@/lib/utils'
import { IconComment, IconShare } from '@/components/ui/icons'
import { Avatar } from '@/components/ui/avatar'
import { SignalVisual } from '@/components/ui/signal-visual'
import type { Prediction } from '@/types'

// Subtil mark décoratif en fond de carte
function CardMark() {
  const n = 9
  const ys = Array.from({ length: n }, (_, i) => (i / (n - 1)) * 34)
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 56 34"
      fill="none"
      width={80}
      height={49}
      style={{
        position: 'absolute',
        bottom: 12,
        right: 12,
        opacity: 0.05,
        pointerEvents: 'none',
      }}
    >
      {ys.map((y, i) => (
        <line key={`L${i}`} x1={28} y1={17} x2={0} y2={y} stroke="white" strokeWidth="1" strokeLinecap="round" />
      ))}
      {ys.map((y, i) => (
        <line key={`R${i}`} x1={28} y1={17} x2={56} y2={y} stroke="#7c6ef0" strokeWidth="1" strokeLinecap="round" />
      ))}
    </svg>
  )
}

interface PredictionCardProps {
  prediction: Prediction
  compact?: boolean
}

// Carte pour prédiction résolue
function ResultCard({ prediction }: { prediction: Prediction }) {
  const correctOption = prediction.options?.find((o) => o.is_correct)
  const mainOption = prediction.options?.[0]
  const isCorrect = correctOption?.label === mainOption?.label

  return (
    <Link href={`/predictions/${prediction.id}`} className="block group">
      <div className="relative surface rounded-2xl overflow-hidden card-hover">
        <div style={{ height: 96, overflow: 'hidden' }}>
          <SignalVisual category={prediction.category} />
        </div>
        <div className="relative p-5">
        <CardMark />
        {/* Badge résultat */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wider"
            style={{
              background: 'var(--teal)',
              color: '#050508',
              letterSpacing: '0.08em',
              fontFamily: 'var(--mono)',
            }}
          >
            RESULT
          </span>
          <span className="text-xs" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
            {formatDate(prediction.resolution_date)}
          </span>
        </div>

        {/* Titre */}
        <h3 className="text-sm font-semibold leading-snug mb-4 line-clamp-2" style={{ color: 'var(--text)' }}>
          {prediction.title}
        </h3>

        {/* Prédiction vs Réel */}
        <div
          className="grid grid-cols-2 gap-3 p-3 rounded-xl"
          style={{ background: 'var(--surface2)' }}
        >
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>
              PREDICTION
            </p>
            <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
              {mainOption?.label}{' '}
              <span style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                ({mainOption?.percentage}%)
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>
              ACTUAL
            </p>
            <p
              className="text-sm font-bold"
              style={{ color: correctOption ? 'var(--teal)' : 'var(--zred)' }}
            >
              {correctOption?.label ?? '—'}
            </p>
          </div>
        </div>

        {/* Résolution */}
        {prediction.resolution_notes && (
          <p className="mt-3 text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text3)' }}>
            {prediction.resolution_notes}
          </p>
        )}
        </div>{/* end inner p-5 */}
      </div>
    </Link>
  )
}

export function PredictionCard({ prediction, compact = false }: PredictionCardProps) {
  const mainOption = prediction.options?.[0]
  const secondOption = prediction.options?.[1]
  const isResolved = prediction.status === 'resolved'

  if (isResolved) return <ResultCard prediction={prediction} />

  const mainPct = mainOption?.percentage ?? 0
  const secondPct = secondOption?.percentage ?? 0

  // Version compacte (sidebar, widget)
  if (compact) {
    return (
      <Link href={`/predictions/${prediction.id}`} className="block group">
        <div className="surface rounded-xl p-4 card-hover relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)', letterSpacing: '0.08em' }}>SIGNAL</span>
            <span className="text-xs font-bold" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>{mainPct}%</span>
          </div>
          <h3 className="text-xs font-semibold line-clamp-2 leading-snug" style={{ color: 'var(--text)' }}>
            {prediction.title}
          </h3>
          <p className="text-xs mt-2" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
            {formatNumber(prediction.vote_count)} votes
          </p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/predictions/${prediction.id}`} className="block group">
      <div className="relative surface rounded-2xl overflow-hidden card-hover">
        {/* Thumbnail visuel généré */}
        <div style={{ height: 96, overflow: 'hidden' }}>
          <SignalVisual category={prediction.category} />
        </div>

        <div className="relative p-5">
        <CardMark />

        {/* Ligne SIGNAL + date */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-bold"
            style={{ color: 'var(--text3)', fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}
          >
            SIGNAL
          </span>
          <span className="text-xs" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
            {formatDate(prediction.resolution_date)}
          </span>
        </div>

        {/* Titre */}
        <h3 className="text-sm font-semibold leading-snug mb-4 line-clamp-2 group-hover:text-[var(--text2)] transition-colors" style={{ color: 'var(--text)' }}>
          {prediction.title}
        </h3>

        {/* Affichage vote : pourcentage + boutons YES/NO */}
        {prediction.type === 'yes_no' && mainOption && secondOption && (
          <div className="flex items-center justify-between mb-4">
            <div>
              <p
                className="text-3xl font-bold"
                style={{ color: 'var(--text)', fontFamily: 'var(--mono)', lineHeight: 1 }}
              >
                {mainPct}%
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                {mainPct}% · {secondPct}%
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>
                {formatNumber(prediction.vote_count)} votes
              </p>
            </div>
            <div className="flex gap-2">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  border: '1.5px solid rgba(23,213,207,0.3)',
                  color: 'var(--teal)',
                  background: 'rgba(23,213,207,0.07)',
                  fontFamily: 'var(--mono)',
                  letterSpacing: '0.04em',
                }}
              >
                YES
              </div>
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  border: '1.5px solid rgba(240,96,112,0.3)',
                  color: 'var(--zred)',
                  background: 'rgba(240,96,112,0.07)',
                  fontFamily: 'var(--mono)',
                  letterSpacing: '0.04em',
                }}
              >
                NO
              </div>
            </div>
          </div>
        )}

        {/* Probabilité */}
        {prediction.type === 'probability' && mainOption && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5" style={{ fontFamily: 'var(--mono)' }}>
              <span style={{ color: 'var(--text3)' }}>Probabilité collective</span>
              <span className="font-bold" style={{ color: 'var(--text)' }}>{mainOption.percentage}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface3)' }}>
              <div
                className="h-full rounded-full bar-settle"
                style={{ width: `${mainOption.percentage}%`, background: 'var(--accent)' }}
              />
            </div>
            <p className="text-xs mt-1.5" style={{ color: 'var(--text3)' }}>
              {formatNumber(prediction.vote_count)} votes
            </p>
          </div>
        )}

        {/* Choix multiples */}
        {prediction.type === 'multiple_choice' && (
          <div className="mb-4 space-y-1.5">
            {prediction.options?.slice(0, 3).map((opt) => (
              <div key={opt.id} className="flex items-center justify-between text-xs" style={{ fontFamily: 'var(--mono)' }}>
                <span style={{ color: 'var(--text2)' }}>{opt.label}</span>
                <span className="font-semibold" style={{ color: 'var(--text)' }}>{opt.percentage}%</span>
              </div>
            ))}
            <p className="text-xs mt-1" style={{ color: 'var(--text3)' }}>
              {formatNumber(prediction.vote_count)} votes
            </p>
          </div>
        )}

        {/* Pied de carte */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {prediction.creator && (
            <div className="flex items-center gap-1.5">
              <Avatar src={prediction.creator.avatar_url} name={prediction.creator.full_name} size="xs" />
              <span className="text-xs" style={{ color: 'var(--text3)' }}>@{prediction.creator.username}</span>
            </div>
          )}
          <div className="flex items-center gap-3 ml-auto" style={{ color: 'var(--text3)' }}>
            <span className="flex items-center gap-1 text-xs" style={{ fontFamily: 'var(--mono)' }}>
              <IconComment size={13} />
              {prediction.comment_count}
            </span>
            <IconShare size={13} />
          </div>
        </div>
        </div>{/* end inner p-5 */}
      </div>
    </Link>
  )
}
