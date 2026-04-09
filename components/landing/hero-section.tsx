'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconMark, IconArrows } from '@/components/ui/icons'
import { SignalCard } from '@/components/signals/signal-card'
import { getTrendingSignals } from '@/lib/signals-data'

// Convergence art — large parametric SVG backdrop matching the brand artwork
function ConvergenceArt({ className }: { className?: string }) {
  const lines = 28
  // fan from center — radiating to all edges
  const cx = 400
  const cy = 280
  const spread = Array.from({ length: lines }, (_, i) => i / (lines - 1))

  const leftPoints = spread.map((t) => ({ x: 0, y: t * 560 }))
  const rightPoints = spread.map((t) => ({ x: 800, y: t * 560 }))
  const topPoints = Array.from({ length: 14 }, (_, i) => ({ x: (i / 13) * 800, y: 0 }))
  const bottomPoints = Array.from({ length: 14 }, (_, i) => ({ x: (i / 13) * 800, y: 560 }))

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 560"
      className={className}
      style={{ pointerEvents: 'none' }}
    >
      {/* Left fan */}
      {leftPoints.map((p, i) => (
        <line
          key={`l${i}`}
          x1={cx} y1={cy}
          x2={p.x} y2={p.y}
          stroke="rgba(255,255,255,0.055)"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      ))}
      {/* Right fan */}
      {rightPoints.map((p, i) => (
        <line
          key={`r${i}`}
          x1={cx} y1={cy}
          x2={p.x} y2={p.y}
          stroke="rgba(23,213,207,0.07)"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      ))}
      {/* Top fan */}
      {topPoints.map((p, i) => (
        <line
          key={`t${i}`}
          x1={cx} y1={cy}
          x2={p.x} y2={p.y}
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      ))}
      {/* Bottom fan */}
      {bottomPoints.map((p, i) => (
        <line
          key={`b${i}`}
          x1={cx} y1={cy}
          x2={p.x} y2={p.y}
          stroke="rgba(23,213,207,0.03)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      ))}
      {/* Center glow */}
      <circle cx={cx} cy={cy} r="3" fill="rgba(23,213,207,0.6)" />
      <circle cx={cx} cy={cy} r="12" fill="rgba(23,213,207,0.08)" />
      <circle cx={cx} cy={cy} r="40" fill="rgba(23,213,207,0.03)" />
    </svg>
  )
}

export function HeroSection() {
  const heroSignal = getTrendingSignals(1)[0]

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Convergence art — full bleed backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ animation: 'convergence-pulse 8s ease-in-out infinite' }}
      >
        <ConvergenceArt className="absolute inset-0 w-full h-full" />
      </div>

      {/* Radial teal glow from convergence center */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(23,213,207,0.05) 0%, transparent 65%)' }}
      />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-12">
          {/* Logo mark */}
          <div className="flex justify-center mb-8" style={{ animation: 'float 6s ease-in-out infinite' }}>
            <IconMark width={72} leftColor="rgba(255,255,255,0.85)" rightColor="rgba(23,213,207,0.85)" />
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold text-[var(--text)] leading-[1.1] tracking-tight mb-5"
            style={{ fontFamily: 'var(--font)', letterSpacing: '-0.03em' }}
          >
            Vote sur l&apos;actu.<br />
            Compare avec la foule.
          </h1>

          <p className="text-base md:text-lg text-[var(--text2)] mb-8 max-w-md mx-auto leading-relaxed">
            ZAWIOS est la couche sociale de l&apos;information.
            Vote YES ou NO, compare ton signal avec le monde,
            construis ta réputation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="w-full sm:w-auto gap-2 px-8">
                Commencer <IconArrows className="w-4 h-4" size={16} />
              </Button>
            </Link>
            <Link href="#feed">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                Voir les signaux
              </Button>
            </Link>
          </div>
        </div>

        {/* Live signal preview */}
        {heroSignal && (
          <div className="max-w-md mx-auto">
            <p className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-wider mb-2 text-center" style={{ fontFamily: 'var(--mono)' }}>
              Signal en direct
            </p>
            <SignalCard signal={heroSignal} />
          </div>
        )}
      </div>
    </section>
  )
}
