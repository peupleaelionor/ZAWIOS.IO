import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconArrows } from '@/components/ui/icons'

export function CTASection() {
  return (
    <section className="py-12 md:py-20 bg-[var(--bg)]">
      <div className="container">
        <div
          className="max-w-xl mx-auto text-center surface py-10 md:py-14 px-6 md:px-8 rounded-xl relative overflow-hidden"
          style={{ border: '1px solid var(--border2)' }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--teal), transparent)' }}
          />
          <h2
            className="text-xl md:text-3xl font-bold text-[var(--text)] mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            Pret a voter ?
          </h2>
          <p className="text-sm text-[var(--text2)] mb-6 md:mb-7 max-w-sm mx-auto leading-relaxed">
            Rejoins 47 000+ personnes qui votent chaque jour sur les sujets du moment.
            Gratuit. Pour toujours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 px-8">
                Commencer maintenant <IconArrows className="w-4 h-4" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
