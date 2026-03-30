import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Globe, Target, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about ZAWIOS — the collective intelligence platform for predictions and reputation.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
          <div className="container max-w-3xl">
            <Badge variant="outline" className="mb-4">Our mission</Badge>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">
              Intelligence is collective. <br />Reputation should be verifiable.
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              ZAWIOS was built on a simple premise: the best information about the future comes from aggregating
              many perspectives, not from a single analyst. We built the infrastructure to make that signal accessible
              — and to reward the people who get it right.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white dark:bg-zinc-950">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Globe,
                  title: 'Open & Global',
                  description: 'No gatekeepers. Predictors from 94 countries participate on equal terms. The best ideas win, regardless of credential or location.',
                },
                {
                  icon: Target,
                  title: 'Accuracy First',
                  description: 'We measure what matters: were you right? Not how loud you were, not how confident you sounded — just your track record over time.',
                },
                {
                  icon: TrendingUp,
                  title: 'Transparent Data',
                  description: 'Every signal is public. Every vote is recorded. Every reputation score is calculated transparently. No black boxes.',
                },
              ].map((value) => (
                <div key={value.title} className="text-center">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">The story</h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
        <section className="py-16 bg-white dark:bg-zinc-950">
          <div className="container text-center">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              Ready to start building your reputation?
            </h2>
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Join ZAWIOS free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
