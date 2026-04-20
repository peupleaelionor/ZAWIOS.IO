'use client'

import { IconTrending, IconChart, IconTrophy } from '@/components/ui/icons'
import { useLanguage } from '@/components/providers/language-provider'

export function StepsSection() {
  const { t } = useLanguage()

  const steps = [
    {
      step:        '01',
      emoji:       '🗳️',
      title:       'Vote',
      description: 'YES, NO, ou reste neutre. Sur tout : actu, tech, sport, culture, politique. Ton avis compte vraiment.',
      icon:        <IconTrending size={22} />,
      color:       'var(--teal)',
      glow:        'rgba(29,228,222,0.15)',
      border:      'rgba(29,228,222,0.25)',
    },
    {
      step:        '02',
      emoji:       '🌍',
      title:       'Compare',
      description: 'Vois ce que la foule mondiale pense. Tu es avec la majorité ou contre ? Afrique, Europe, Amériques, Asie.',
      icon:        <IconChart size={22} />,
      color:       'var(--accent2)',
      glow:        'rgba(139,127,240,0.15)',
      border:      'rgba(139,127,240,0.25)',
    },
    {
      step:        '03',
      emoji:       '🏆',
      title:       'Réputation',
      description: 'Chaque signal correct renforce ton score. Construis ta réputation d\'analyste dans le temps.',
      icon:        <IconTrophy size={22} />,
      color:       'var(--amber)',
      glow:        'rgba(255,214,0,0.12)',
      border:      'rgba(255,214,0,0.25)',
    },
  ]

  return (
    <section
      className="py-14 md:py-20 relative overflow-hidden"
      style={{ background: 'var(--bg2)' }}
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container relative">
        {/* Header */}
        <div className="mb-10 md:mb-14 text-center">
          <p className="section-label">Comment ça marche</p>
          <h2
            className="text-2xl md:text-4xl font-bold mt-1"
            style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}
          >
            3 étapes.{' '}
            <span className="gradient-text">Rien de plus.</span>
          </h2>
          <p className="mt-3 text-sm md:text-base max-w-md mx-auto" style={{ color: 'var(--text2)' }}>
            En 10 secondes tu votes. En 10 minutes tu comprends où tu te situes dans l&apos;opinion mondiale.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 relative">
          {/* Connecting line — desktop only */}
          <div
            className="absolute top-[52px] left-[calc(16.67%+12px)] right-[calc(16.67%+12px)] h-[1px] hidden md:block"
            style={{ background: 'linear-gradient(90deg, var(--teal), var(--accent2), var(--amber))', opacity: 0.3 }}
          />

          {steps.map((item, i) => (
            <div
              key={item.step}
              className="relative rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background:  `linear-gradient(145deg, var(--surface) 0%, var(--surface2) 100%)`,
                border:      `1px solid ${item.border}`,
                boxShadow:   `0 4px 24px ${item.glow}, 0 1px 0 rgba(255,255,255,0.05) inset`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-2xl relative z-10"
                  style={{
                    background:  `linear-gradient(135deg, ${item.glow} 0%, ${item.glow} 100%)`,
                    border:      `1px solid ${item.border}`,
                    color:       item.color,
                    boxShadow:   `0 0 16px ${item.glow}`,
                  }}
                >
                  {item.icon}
                </div>
                <span
                  className="text-4xl"
                  style={{ opacity: 0.18, fontFamily: 'var(--mono)', fontWeight: 700, color: item.color, letterSpacing: '-0.05em' }}
                >
                  {item.step}
                </span>
              </div>

              {/* Emoji */}
              <div className="text-3xl">{item.emoji}</div>

              {/* Text */}
              <div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: 'var(--text)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {item.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-[1px] rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`, opacity: 0.4 }}
              />
            </div>
          ))}
        </div>

        {/* Fun bottom note */}
        <p
          className="text-center mt-8 text-[11px]"
          style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
        >
          ✓ Gratuit · ✓ Sans pub · ✓ Aucune manipulation · ✓ Open methodology
        </p>
      </div>
    </section>
  )
}
