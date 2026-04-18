'use client'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { GridBackground, Orb } from '@/components/ui/effects'
import { IconGlobe, IconTarget, IconTrending, IconArrows } from '@/components/ui/icons'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/language-provider'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <GridBackground />
          <Orb color="var(--accent)" size={350} top="-10%" left="10%" />
          <div className="container max-w-3xl relative">
            <p className="section-label">{t.about.mission}</p>
            <h1 className="text-4xl font-bold text-[var(--text)] mb-6" style={{ whiteSpace: 'pre-line' }}>
              {t.about.missionHeadline}
            </h1>
            <p className="text-lg text-[var(--text2)] leading-relaxed">
              {t.about.missionDesc}
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-[var(--bg2)]">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: <IconGlobe className="w-6 h-6" size={24} />,
                  title: t.about.openGlobal,
                  description: t.about.openGlobalDesc,
                },
                {
                  icon: <IconTarget className="w-6 h-6" size={24} />,
                  title: t.about.accuracyFirst,
                  description: t.about.accuracyFirstDesc,
                },
                {
                  icon: <IconTrending className="w-6 h-6" size={24} />,
                  title: t.about.transparentData,
                  description: t.about.transparentDataDesc,
                },
              ].map((value) => (
                <div key={value.title} className="text-center rv">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(23,213,207,0.1)', color: 'var(--accent)' }}
                  >
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-[var(--text)] mb-2">{value.title}</h3>
                  <p className="text-sm text-[var(--text2)] leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-[var(--bg)]">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-6">{t.about.story}</h2>
            <div className="space-y-4 text-[var(--text2)] leading-relaxed">
              <p>{t.about.storyP1}</p>
              <p>{t.about.storyP2}</p>
              <p>{t.about.storyP3}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--bg2)]">
          <div className="container text-center">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">
              {t.about.readyCta}
            </h2>
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                {t.about.joinCta} <IconArrows className="w-4 h-4" size={16} />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
