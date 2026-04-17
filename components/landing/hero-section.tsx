'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers/language-provider'
import { staggerContainer, staggerItem } from '@/lib/motion'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section
      className="relative overflow-hidden pt-14 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20"
      style={{ background: 'var(--background)' }}
    >
      {/* Subtle background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(28,57,187,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container relative">
        <motion.div
          className="max-w-[680px]"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Label */}
          <motion.p variants={staggerItem} className="section-label mb-5">
            Intelligence Collective
          </motion.p>

          {/* Headline */}
          <motion.h1 variants={staggerItem} className="mb-5 text-balance">
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--display-font)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 5.5vw, 3.75rem)',
                letterSpacing: '-0.028em',
                lineHeight: 1.07,
                color: 'var(--text-strong)',
              }}
            >
              Analyse collective
              <br className="hidden sm:block" />
              {' '}mondiale.
            </span>
            <span
              style={{
                display: 'block',
                marginTop: '0.25em',
                fontFamily: 'var(--display-font)',
                fontWeight: 800,
                fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                color: 'var(--primary)',
              }}
            >
              Compare. Décide. Anticipe.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={staggerItem}
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              maxWidth: 500,
              marginBottom: '2rem',
            }}
          >
            Infrastructure stratégique fondée sur la réputation
            et la précision des signaux collectifs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col xs:flex-row gap-3"
            style={{ flexWrap: 'wrap' }}
          >
            <Link href="/onboarding">
              <Button size="lg" style={{ minWidth: 140 }}>
                {t.hero.cta}
              </Button>
            </Link>
            <Link href="#feed">
              <Button variant="outline" size="lg" style={{ minWidth: 140 }}>
                {t.hero.ctaSecondary}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
