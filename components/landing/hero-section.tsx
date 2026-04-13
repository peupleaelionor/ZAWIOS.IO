'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconArrows } from '@/components/ui/icons'
import { SignalCard } from '@/components/signals/signal-card'
import { getTrendingSignals } from '@/lib/signals-data'

export function HeroSection() {
  const heroSignal = getTrendingSignals(1)[0]

  return (
    <section className="relative pt-20 pb-6 md:pt-24 md:pb-10">
      <div className="container relative">
        {/* App-style header — strong title, minimal subtext */}
        <div className="max-w-xl mx-auto text-center mb-6 md:mb-8">
          <h1
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--text)] leading-[1.12] tracking-tight mb-3"
            style={{ fontFamily: 'var(--font)', letterSpacing: '-0.03em' }}
          >
            Vote sur l&apos;actu.
            <br />
            Compare avec la foule.
          </h1>

          <p className="text-sm md:text-base text-[var(--text2)] mb-5 max-w-sm mx-auto leading-relaxed">
            Intelligence collective en temps réel. YES ou NO, compare ton signal avec le monde.
          </p>

          {/* Live stats block */}
          <div
            className="inline-flex items-center gap-4 px-4 py-2 rounded-full mb-5"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border2)',
            }}
          >
            <span className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
                style={{ boxShadow: '0 0 6px var(--accent)' }}
              />
              <span
                className="text-[11px] font-semibold text-[var(--accent)]"
                style={{ fontFamily: 'var(--mono)' }}
              >
                47K+ actifs
              </span>
            </span>
            <span
              className="text-[11px] text-[var(--text3)]"
              style={{ fontFamily: 'var(--mono)' }}
            >
              94 pays
            </span>
            <span
              className="text-[11px] text-[var(--text3)]"
              style={{ fontFamily: 'var(--mono)' }}
            >
              32 signaux/jour
            </span>
          </div>

          {/* CTAs */}
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

        {/* Live signal preview — immediate data, app-like */}
        {heroSignal && (
          <div className="max-w-md mx-auto">
            <p
              className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-wider mb-2 text-center"
              style={{ fontFamily: 'var(--mono)' }}
            >
              Signal en direct
            </p>
            <SignalCard signal={heroSignal} />
          </div>
        )}
      </div>
    </section>
  )
}
