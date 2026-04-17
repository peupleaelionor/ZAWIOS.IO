'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconArrows } from '@/components/ui/icons'
import { SignalCard } from '@/components/signals/signal-card'
import { getTrendingSignals } from '@/lib/signals-data'

export function HeroSection() {
  const heroSignal = getTrendingSignals(1)[0]

  return (
    <section className="relative pt-16 pb-6 md:pt-24 md:pb-10">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 300,
          background: 'radial-gradient(ellipse at center top, rgba(107,110,248,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative">
        <div className="max-w-lg mx-auto text-center mb-8 md:mb-10">
          {/* Live indicator */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--yes)',
                boxShadow: '0 0 8px var(--yes)',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
            >
              47 000 actifs · 94 pays
            </span>
          </div>

          <h1
            className="font-bold leading-[1.08] mb-4"
            style={{
              fontSize: 'clamp(2rem, 7vw, 3.5rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
            }}
          >
            Vote. Compare.
            <br />
            <span style={{ color: 'var(--accent)' }}>Prédit l&apos;avenir.</span>
          </h1>

          <p
            className="text-sm md:text-base mb-7 leading-relaxed max-w-sm mx-auto"
            style={{ color: 'var(--text2)' }}
          >
            Intelligence collective mondiale. Construis ta réputation sur la précision de tes prédictions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 px-7">
                Commencer gratuitement <IconArrows size={15} />
              </Button>
            </Link>
            <Link href="#feed" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-7">
                Voir les signaux
              </Button>
            </Link>
          </div>
        </div>

        {/* Live signal preview */}
        {heroSignal && (
          <div className="max-w-sm mx-auto">
            <p
              className="section-label mb-3 justify-center"
              style={{ justifyContent: 'center' }}
            >
              Signal du moment
            </p>
            <SignalCard signal={heroSignal} />
          </div>
        )}
      </div>
    </section>
  )
}
