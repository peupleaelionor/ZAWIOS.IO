'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers/language-provider'
import { staggerContainer, staggerItem } from '@/lib/motion'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="pt-16 pb-12 md:pt-24 md:pb-16" style={{ background: 'var(--background)' }}>
      <div className="container">
        <motion.div
          className="max-w-[720px] text-center sm:text-left"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Section label */}
          <motion.p
            variants={staggerItem}
            className="section-label mb-5 justify-center sm:justify-start"
          >
            Intelligence Collective
          </motion.p>

          {/* H1 — institutional copy */}
          <motion.h1
            variants={staggerItem}
            className="font-bold leading-[1.08] mb-5"
            style={{
              fontFamily: 'var(--display-font)',
              fontSize: 'clamp(2.25rem, 6vw, 4rem)',
              letterSpacing: '-0.02em',
              color: 'var(--text-strong)',
            }}
          >
            Analyse collective mondiale.
            <span style={{ color: 'var(--primary)', display: 'block' }}>
              Compare. Décide. Anticipe.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={staggerItem}
            className="text-lg leading-relaxed mb-8 mx-auto sm:mx-0"
            style={{ color: 'var(--text-muted)', maxWidth: 560 }}
          >
            Infrastructure stratégique fondée sur la réputation
            et la précision des signaux collectifs.
          </motion.p>

          {/* CTAs — full-width mobile, auto desktop */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start"
          >
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                {t.hero.cta}
              </Button>
            </Link>
            <Link href="#feed" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {t.hero.ctaSecondary}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
