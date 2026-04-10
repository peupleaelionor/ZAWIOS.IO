'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconMark, IconArrows } from '@/components/ui/icons'
import { SignalCard } from '@/components/signals/signal-card'
import { getTrendingSignals } from '@/lib/signals-data'

/** Animated orb background — vibrant, social-platform feel */
function OrbBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Teal orb — top-left */}
      <div
        className="absolute rounded-full"
        style={{
          width:     '480px',
          height:    '480px',
          top:       '-120px',
          left:      '-80px',
          background:'radial-gradient(circle, rgba(29,228,222,0.12) 0%, rgba(29,228,222,0) 70%)',
          animation: 'convergence-pulse 6s ease-in-out infinite',
        }}
      />
      {/* Accent orb — right */}
      <div
        className="absolute rounded-full"
        style={{
          width:     '400px',
          height:    '400px',
          top:       '60px',
          right:     '-80px',
          background:'radial-gradient(circle, rgba(108,92,231,0.10) 0%, rgba(108,92,231,0) 70%)',
          animation: 'convergence-pulse 8s ease-in-out infinite 2s',
        }}
      />
      {/* Pink orb — bottom center */}
      <div
        className="absolute rounded-full"
        style={{
          width:     '320px',
          height:    '320px',
          bottom:    '0px',
          left:      '50%',
          transform: 'translateX(-50%)',
          background:'radial-gradient(circle, rgba(255,107,157,0.07) 0%, rgba(255,107,157,0) 70%)',
          animation: 'convergence-pulse 7s ease-in-out infinite 1s',
        }}
      />
      {/* Subtle grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(13,14,20,0) 40%, rgba(13,14,20,1) 100%)' }}
      />
    </div>
  )
}

export function HeroSection() {
  const heroSignal = getTrendingSignals(1)[0]

  return (
    <section className="relative pt-20 pb-10 md:pt-28 md:pb-20 overflow-hidden">
      <OrbBackground />

      <div className="container relative">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* ── Text column ─────────────────────────────────────────── */}
          <div className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            {/* Mark */}
            <div className="flex justify-center lg:justify-start mb-6">
              <IconMark
                width={52}
                leftColor="rgba(255,255,255,0.85)"
                rightColor="rgba(29,228,222,0.85)"
              />
            </div>

            {/* Badge */}
            <div className="flex justify-center lg:justify-start mb-4">
              <span
                className="inline-flex items-center gap-2 text-[11px] font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background:  'rgba(29,228,222,0.08)',
                  border:      '1px solid rgba(29,228,222,0.2)',
                  color:       'var(--teal)',
                  fontFamily:  'var(--mono)',
                  letterSpacing: '0.05em',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ background: 'var(--teal)', animation: 'pulse-dot 2s ease-in-out infinite' }}
                />
                47 000+ signaux collectifs ce mois
              </span>
            </div>

            <h1
              className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight mb-5"
              style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}
            >
              Vote sur l&apos;actu.<br />
              <span className="gradient-text">Compare avec la foule.</span>
            </h1>

            <p
              className="text-base md:text-lg leading-relaxed mb-7 max-w-md mx-auto lg:mx-0"
              style={{ color: 'var(--text2)' }}
            >
              ZAWIOS est la couche sociale de l&apos;information.
              Vote <strong style={{ color: 'var(--teal)' }}>YES</strong> ou{' '}
              <strong style={{ color: 'var(--pink)' }}>NO</strong>, compare avec le monde,
              construis ta réputation d&apos;analyste.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 px-8">
                  Rejoindre la bêta <IconArrows className="w-4 h-4" size={16} />
                </Button>
              </Link>
              <Link href="#feed" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                  Voir les signaux
                </Button>
              </Link>
            </div>

            {/* Social proof micro */}
            <p
              className="mt-5 text-[12px]"
              style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
            >
              Afrique · Europe · Amériques · Asie — 94 pays
            </p>
          </div>

          {/* ── Signal card preview — desktop right column ───────── */}
          {heroSignal && (
            <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0">
              <p
                className="text-[10px] font-semibold uppercase tracking-wider mb-2 text-center lg:text-left"
                style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
              >
                Signal en direct
              </p>
              <div className="relative">
                {/* Glow behind card on desktop */}
                <div
                  className="absolute inset-0 rounded-2xl hidden lg:block"
                  style={{ boxShadow: '0 0 40px rgba(29,228,222,0.1)' }}
                />
                <SignalCard signal={heroSignal} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
