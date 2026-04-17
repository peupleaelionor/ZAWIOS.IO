import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconArrows } from '@/components/ui/icons'

export function CTASection() {
  return (
    <section className="py-16 md:py-24" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div
          className="max-w-xl mx-auto text-center px-6 py-12 md:py-16 rounded-2xl relative overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0, left: '20%', right: '20%', height: 1,
              background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            }}
          />

          <p className="section-label mb-5" style={{ justifyContent: 'center' }}>
            Rejoindre
          </p>

          <h2
            className="font-bold mb-3 leading-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', letterSpacing: '-0.025em', color: 'var(--text)' }}
          >
            Commence à construire<br />ta réputation.
          </h2>

          <p className="text-sm mb-8 max-w-xs mx-auto leading-relaxed" style={{ color: 'var(--text2)' }}>
            47 000 analystes votent chaque jour. Gratuit. Pour toujours.
          </p>

          <Link href="/onboarding">
            <Button size="lg" className="gap-2 px-8">
              Commencer maintenant <IconArrows size={15} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
