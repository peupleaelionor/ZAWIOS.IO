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
      {/* Signal rays pattern — positioned right, visible md+ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          backgroundImage: 'url(/brand/pattern-signal-rays.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.55,
        }}
      />
      {/* Radial gradient overlay to fade the pattern toward content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 65% 80% at 0% 50%, var(--background) 30%, transparent 75%), radial-gradient(ellipse 80% 50% at 50% -20%, rgba(28,57,187,0.05) 0%, transparent 70%)',
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
            {t.hero.sectionLabel}
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
                whiteSpace: 'pre-line',
              }}
            >
              {t.hero.headline1}
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
              {t.hero.headline2}
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
            {t.hero.description}
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
