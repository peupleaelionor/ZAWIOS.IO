'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconMark, IconArrows } from '@/components/ui/icons'
import { SignalCard } from '@/components/signals/signal-card'
import { getTrendingSignals } from '@/lib/signals-data'

/** Lightweight SVG convergence background — no raster images */
function ConvergenceBackground() {
  const lines = 18
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {Array.from({ length: lines }, (_, i) => {
          const y = (i / (lines - 1)) * 500
          return (
            <line
              key={`l${i}`}
              x1={0}
              y1={y}
              x2={400}
              y2={250}
              stroke="rgba(23,213,207,0.04)"
              strokeWidth="1"
            />
          )
        })}
        {Array.from({ length: lines }, (_, i) => {
          const y = (i / (lines - 1)) * 500
          return (
            <line
              key={`r${i}`}
              x1={800}
              y1={y}
              x2={400}
              y2={250}
              stroke="rgba(90,75,255,0.03)"
              strokeWidth="1"
            />
          )
        })}
      </svg>
      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(12,13,16,0.6) 0%, rgba(12,13,16,0.95) 100%)' }}
      />
    </div>
  )
}

export function HeroSection() {
  const heroSignal = getTrendingSignals(1)[0]

  return (
    <section className="relative pt-20 pb-10 md:pt-28 md:pb-20 overflow-hidden">
      <ConvergenceBackground />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-12">
          {/* Logo mark */}
          <div className="flex justify-center mb-6">
            <IconMark width={56} leftColor="rgba(255,255,255,0.8)" rightColor="rgba(23,213,207,0.8)" />
          </div>

          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--text)] leading-[1.1] tracking-tight mb-4"
            style={{ fontFamily: 'var(--font)', letterSpacing: '-0.03em' }}
          >
            Vote sur l&apos;actu.<br />
            Compare avec la foule.
          </h1>

          <p className="text-base md:text-lg text-[var(--text2)] mb-6 max-w-md mx-auto leading-relaxed">
            ZAWIOS est la couche sociale de l&apos;information.
            Vote YES ou NO, compare ton signal avec le public,
            construis ta reputation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 px-8">
                Commencer <IconArrows className="w-4 h-4" size={16} />
              </Button>
            </Link>
            <Link href="#feed" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                Voir les signaux
              </Button>
            </Link>
          </div>
        </div>

        {/* Live signal preview — single signal only */}
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
