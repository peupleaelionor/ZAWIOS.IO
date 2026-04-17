import { IconTrending, IconChart, IconTrophy } from '@/components/ui/icons'

export function StepsSection() {
  const steps = [
    {
      step: '01',
      title: 'Vote',
      description: 'YES ou NO sur les sujets du moment. Actualité, tech, sport, culture — ton avis compte.',
      icon: <IconTrending className="w-5 h-5" size={20} />,
      color: 'var(--teal)',
    },
    {
      step: '02',
      title: 'Compare',
      description: 'Découvre ce que la foule pense. Es-tu avec la majorité ou contre ?',
      icon: <IconChart className="w-5 h-5" size={20} />,
      color: 'var(--text2)',
    },
    {
      step: '03',
      title: 'Réputation',
      description: 'Chaque bonne réponse renforce ton score. Construis ta réputation dans le temps.',
      icon: <IconTrophy className="w-5 h-5" size={20} />,
      color: 'var(--amber)',
    },
  ]

  return (
    <section className="py-12 md:py-20 bg-[var(--bg2)]">
      <div className="container">
        <div className="mb-8 md:mb-12">
          <p className="section-label">Comment ça marche</p>
          <h2 className="text-xl md:text-3xl font-bold text-[var(--text)] mt-1" style={{ letterSpacing: '-0.02em' }}>
            3 étapes. Rien de plus.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative surface p-5 md:p-6 overflow-hidden rounded-xl"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{ background: item.color, borderRadius: '0 2px 2px 0' }}
              />
              <span
                className="text-xs font-bold text-[var(--text3)] mb-3 block"
                style={{ fontFamily: 'var(--mono)' }}
              >
                {item.step}
              </span>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: `color-mix(in srgb, ${item.color} 12%, transparent)`,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-[var(--text)] mb-1.5">{item.title}</h3>
              <p className="text-sm text-[var(--text2)] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
