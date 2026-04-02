import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { GridBackground, Orb } from '@/components/ui/effects'
import { IconGlobe, IconTarget, IconTrending, IconArrows, IconShield, IconUsers, IconCheck } from '@/components/ui/icons'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about ZAWIOS — the collective intelligence platform for predictions and reputation.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <GridBackground />
          <Orb color="var(--accent)" size={350} top="-10%" left="10%" />
          <div className="container max-w-3xl relative">
            <p className="section-label">Our mission</p>
            <h1 className="text-4xl font-bold text-[var(--text)] mb-6">
              Intelligence is collective. <br />Reputation should be verifiable.
            </h1>
            <p className="text-lg text-[var(--text2)] leading-relaxed">
              ZAWIOS was built on a simple premise: the best information about the future comes from aggregating
              many perspectives, not from a single analyst. We built the infrastructure to make that signal accessible
              — and to reward the people who get it right.
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
                  title: 'Open & Global',
                  description: 'No gatekeepers. Predictors from 94 countries participate on equal terms. The best ideas win, regardless of credential or location.',
                },
                {
                  icon: <IconTarget className="w-6 h-6" size={24} />,
                  title: 'Accuracy First',
                  description: 'We measure what matters: were you right? Not how loud you were, not how confident you sounded — just your track record over time.',
                },
                {
                  icon: <IconTrending className="w-6 h-6" size={24} />,
                  title: 'Transparent Data',
                  description: 'Every signal is public. Every vote is recorded. Every reputation score is calculated transparently. No black boxes.',
                },
              ].map((value) => (
                <div key={value.title} className="text-center rv">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(124,110,240,0.1)', color: 'var(--accent2)' }}
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
            <h2 className="text-2xl font-bold text-[var(--text)] mb-6">The story</h2>
            <div className="space-y-4 text-[var(--text2)] leading-relaxed">
              <p>
                ZAWIOS started from a frustration: the most valuable insights about the future were locked in
                expensive research reports, proprietary models, and private channels. Meanwhile, millions of smart,
                well-informed people had great intuitions about the world — and nowhere to put them.
              </p>
              <p>
                We built ZAWIOS to fix that. A platform where every person can take a position, compete on accuracy,
                and build a verified track record over time. No money, no bets — just signal.
              </p>
              <p>
                We believe that collective intelligence, properly structured and measured, produces better forecasts
                than any single expert. And we believe that the people who are consistently right deserve recognition.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--bg2)]">
          <div className="container text-center">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">
              Ready to start building your reputation?
            </h2>
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Join ZAWIOS free <IconArrows className="w-4 h-4" size={16} />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
