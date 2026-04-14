/**
 * QuestionOfDay — Server component.
 * Selects the "question of the day" from featured open predictions
 * using a date-based rotation (deterministic, no randomness on hydration).
 */
import Link from 'next/link'
import { allPredictions } from '@/lib/mock-data'
import { PredictionImage } from '@/components/ui/prediction-image'
import { formatNumber } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IconArrows } from '@/components/ui/icons'

function getTodayQuestion() {
  const open = allPredictions.filter((p) => p.featured && p.status === 'open')
  if (open.length === 0) return allPredictions[0]
  // Rotate daily — floor(timestamp / ms-per-day) gives a stable daily index
  const dayIndex = Math.floor(Date.now() / 86_400_000) % open.length
  return open[dayIndex]
}

export function QuestionOfDay() {
  const q = getTodayQuestion()
  const mainOption = q.options?.[0]
  const secOption  = q.options?.[1]
  const mainPct    = mainOption?.percentage ?? 0
  const secPct     = secOption?.percentage ?? 0

  return (
    <section className="py-24" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="mb-10">
          <p className="section-label">Question du jour</p>
          <h2
            className="text-3xl md:text-4xl font-bold mt-1"
            style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
          >
            Le signal que la communauté suit
          </h2>
        </div>

        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            border: '1px solid var(--border2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Hero image — tall, with bottom gradient */}
          <div style={{ position: 'relative', height: 320 }}>
            <PredictionImage
              predictionId={q.id}
              title={q.title}
              category={q.category}
              height={320}
              gradient
              hero
            />

            {/* Category + LIVE badge overlaid on image */}
            <div
              className="absolute top-0 left-0 right-0 flex items-center justify-between p-5"
              style={{ zIndex: 2 }}
            >
              <span
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  background: 'rgba(5,5,8,0.7)',
                  color: 'var(--text2)',
                  fontFamily: 'var(--mono)',
                  border: '1px solid var(--border2)',
                  backdropFilter: 'blur(8px)',
                  letterSpacing: '0.1em',
                }}
              >
                {q.category}
              </span>

              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(5,5,8,0.7)',
                  color: 'var(--teal)',
                  fontFamily: 'var(--mono)',
                  border: '1px solid rgba(23,213,207,0.25)',
                  backdropFilter: 'blur(8px)',
                  letterSpacing: '0.08em',
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--teal)',
                    display: 'inline-block',
                    animation: 'pulse-dot 2s ease-in-out infinite',
                  }}
                />
                LIVE
              </span>
            </div>

            {/* Title overlaid at bottom of image */}
            <div
              className="absolute bottom-0 left-0 right-0 px-8 pb-8 pt-16"
              style={{ zIndex: 2 }}
            >
              <h3
                className="text-2xl md:text-3xl font-bold leading-snug"
                style={{ color: '#eaeaf0', letterSpacing: '-0.01em', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
              >
                {q.title}
              </h3>
            </div>
          </div>

          {/* Bottom panel */}
          <div
            className="grid md:grid-cols-2 gap-8 p-8"
            style={{ background: 'var(--surface)' }}
          >
            {/* Vote split */}
            <div>
              <p
                className="text-xs font-bold mb-4 uppercase tracking-wider"
                style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
              >
                Community split · {formatNumber(q.vote_count)} votes
              </p>

              {q.options?.map((opt) => {
                const isYes = opt.label === 'Yes' || opt.label === 'Oui'
                const color = isYes ? 'var(--teal)' : 'var(--zred)'
                return (
                  <div key={opt.id} className="mb-3 last:mb-0">
                    <div className="flex justify-between text-xs mb-1.5" style={{ fontFamily: 'var(--mono)' }}>
                      <span style={{ color: 'var(--text2)', fontWeight: 600 }}>{opt.label}</span>
                      <span style={{ color, fontWeight: 700 }}>{opt.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface3)' }}>
                      <div
                        className="h-full rounded-full bar-settle"
                        style={{ width: `${opt.percentage}%`, background: color, opacity: isYes ? 1 : 0.65 }}
                      />
                    </div>
                  </div>
                )
              })}

              {/* Big stat */}
              <div className="mt-6 flex items-baseline gap-3">
                <span
                  className="text-4xl font-bold"
                  style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}
                >
                  {mainPct}%
                </span>
                <span className="text-sm" style={{ color: 'var(--text3)' }}>
                  vote {mainOption?.label} vs {secPct}% {secOption?.label}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col justify-between">
              {q.description && (
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: 'var(--text3)' }}
                >
                  {q.description.slice(0, 200)}{q.description.length > 200 ? '…' : ''}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <Link href={`/predictions/${q.id}`}>
                  <Button size="md" className="gap-2">
                    Vote now <IconArrows size={14} />
                  </Button>
                </Link>
                <Link href="/predictions">
                  <Button variant="outline" size="md">
                    All predictions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
