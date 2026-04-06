'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconMark, IconArrows } from '@/components/ui/icons'
import { SignalCard } from '@/components/signals/signal-card'
import { getTrendingSignals } from '@/lib/signals-data'

export function HeroSection() {
  const heroSignal = getTrendingSignals(1)[0]

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(52,208,182,0.06) 0%, transparent 70%)' }}
      />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-12">
          {/* Logo mark */}
          <div className="flex justify-center mb-8">
            <IconMark width={64} leftColor="rgba(255,255,255,0.8)" rightColor="rgba(52,208,182,0.8)" />
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
            Vote YES ou NO, compare ton signal avec le public,
            construis ta reputation.
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
