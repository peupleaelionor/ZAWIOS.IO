import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconArrows } from '@/components/ui/icons'

export function CTASection() {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── Background orbs ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: '500px', height: '500px',
            top: '-100px', left: '50%', transform: 'translateX(-60%)',
            background: 'radial-gradient(circle, rgba(29,228,222,0.10) 0%, transparent 70%)',
            animation: 'convergence-pulse 7s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '400px', height: '400px',
            bottom: '-80px', right: '-60px',
            background: 'radial-gradient(circle, rgba(108,92,231,0.10) 0%, transparent 70%)',
            animation: 'convergence-pulse 9s ease-in-out infinite 1.5s',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '300px', height: '300px',
            bottom: '20px', left: '-40px',
            background: 'radial-gradient(circle, rgba(255,107,157,0.07) 0%, transparent 70%)',
            animation: 'convergence-pulse 8s ease-in-out infinite 3s',
          }}
        />
      </div>

      <div className="container relative">
        <div
          className="max-w-2xl mx-auto text-center rounded-3xl px-6 py-12 md:py-16 relative overflow-hidden"
          style={{
            background:  'var(--surface)',
            border:      '1px solid var(--border2)',
            boxShadow:   '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset',
          }}
        >
          {/* Top gradient bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, var(--pink), var(--teal), var(--accent2), var(--pink))', backgroundSize: '200% 100%', animation: 'shimmer 4s linear infinite' }}
          />

          {/* Globe emoji badge */}
          <div className="flex justify-center mb-5">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background:  'rgba(29,228,222,0.08)',
                border:      '1px solid rgba(29,228,222,0.2)',
                color:       'var(--teal)',
                fontFamily:  'var(--mono)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--teal)', animation: 'pulse-dot 2s ease-in-out infinite' }}
              />
              47 000+ analystes • 94 pays • Gratuit
            </span>
          </div>

          <h2
            className="text-2xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Prêt à voter{' '}
            <span className="gradient-text">avec le monde ?</span>
          </h2>

          <p
            className="text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto"
            style={{ color: 'var(--text2)' }}
          >
            ZAWIOS est plus qu&apos;un sondage — c&apos;est ta voix dans le débat global.
            Afrique, Europe, Amériques, Asie : ensemble on pense mieux.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link href="/auth/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 px-8">
                Rejoindre gratuitement <IconArrows className="w-4 h-4" size={16} />
              </Button>
            </Link>
            <Link href="#feed" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                Voir les signaux
              </Button>
            </Link>
          </div>

          {/* Social proof avatars */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {['🇫🇷', '🇨🇩', '🇳🇬', '🇺🇸', '🇯🇵'].map((flag, i) => (
                <span
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm border-2"
                  style={{
                    background:  'var(--surface2)',
                    borderColor: 'var(--bg)',
                    zIndex:      5 - i,
                  }}
                >
                  {flag}
                </span>
              ))}
            </div>
            <p className="text-xs" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
              +47K votants actifs ce mois
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
