'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconArrows } from '@/components/ui/icons'
import { useLanguage } from '@/components/providers/language-provider'

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div
          className="max-w-xl mx-auto text-center px-6 py-12 md:py-16 rounded-2xl relative overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
        >
          {/* Rose spiral — centered behind CTA card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'url(/brand/backgrounds/patterns/bg-rose.svg)',
              backgroundSize: '85%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              mixBlendMode: 'multiply',
              opacity: 0.22,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0, left: '20%', right: '20%', height: 1,
              background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            }}
          />

          <p className="section-label mb-5" style={{ justifyContent: 'center' }}>
            {t.cta.label}
          </p>

          <h2
            className="font-bold mb-3 leading-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', letterSpacing: '-0.025em', color: 'var(--text)' }}
          >
            {t.cta.title}
          </h2>

          <p className="text-sm mb-8 max-w-xs mx-auto leading-relaxed" style={{ color: 'var(--text2)' }}>
            {t.cta.subtitle}
          </p>

          <Link href="/onboarding">
            <Button size="lg" className="gap-2 px-8">
              {t.cta.button} <IconArrows size={15} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
