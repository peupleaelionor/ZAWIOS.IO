// Ambassador section — city dots on minimal SVG world map

const AMBASSADOR_CITIES = [
    { name: 'Kinshasa', country: 'RD Congo', x: 165, y: 100, color: 'var(--accent)', members: '2.4K' },
    { name: 'Paris', country: 'France', x: 153, y: 33, color: 'var(--accent2)', members: '3.1K' },
    { name: 'Lagos', country: 'Nigeria', x: 155, y: 88, color: 'var(--accent)', members: '1.8K' },
    { name: 'Bruxelles', country: 'Belgique', x: 150, y: 30, color: 'var(--accent2)', members: '890' },
    { name: 'Dakar', country: 'Sénégal', x: 130, y: 78, color: 'var(--accent)', members: '1.2K' },
    { name: 'New York', country: 'USA', x: 60, y: 45, color: 'rgba(255,255,255,0.4)', members: '5.2K' },
    { name: 'Abidjan', country: "Côte d'Ivoire", x: 143, y: 88, color: 'var(--accent)', members: '1.1K' },
]

function AmbassadorMap() {
  return (
    <div className="relative w-full" style={{ maxWidth: '540px' }}>
      <svg
        viewBox="0 0 360 180"
        className="w-full"
        style={{ opacity: 0.75 }}
        fill="none"
      >
        {/* Continents */}
        <path d="M30 30 L60 25 L75 35 L80 55 L70 70 L55 80 L45 75 L35 60 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <path d="M70 95 L85 90 L95 105 L90 130 L75 140 L65 125 L60 110 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
        <path d="M145 25 L170 22 L178 35 L172 50 L158 55 L148 45 Z" fill="rgba(90,75,255,0.06)" stroke="rgba(90,75,255,0.15)" strokeWidth="0.8" />
        <path d="M148 60 L172 58 L185 75 L188 105 L175 125 L155 128 L140 110 L135 85 Z" fill="rgba(65,105,225,0.05)" stroke="rgba(65,105,225,0.18)" strokeWidth="0.8" />
        <path d="M185 20 L260 18 L280 40 L275 70 L255 80 L220 75 L195 60 L180 45 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
        <path d="M260 110 L290 108 L300 120 L285 135 L265 130 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />

        {/* Grid */}
        <line x1="0" y1="90" x2="360" y2="90" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3 8" />
        <line x1="180" y1="0" x2="180" y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3 8" />

        {/* City dots */}
        {AMBASSADOR_CITIES.map((city) => (
          <g key={city.name}>
            <circle cx={city.x} cy={city.y} r="4" fill={`${city.color}`} opacity="0.15" />
            <circle cx={city.x} cy={city.y} r="2" fill={city.color} opacity="0.8" />
          </g>
        ))}
      </svg>
    </div>
  )
}

export function AmbassadorSection() {
  return (
    <section
      className="py-12 md:py-20"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: map */}
          <div
            className="rounded-xl p-5"
            style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
          >
            <AmbassadorMap />
          </div>

          {/* Right: content */}
          <div>
            <p className="section-label">Ambassadeurs</p>
            <h2
              className="text-2xl md:text-3xl font-bold text-[var(--text)] mt-1 mb-3"
              style={{ letterSpacing: '-0.025em' }}
            >
              Une intelligence<br />sans frontières
            </h2>
            <p className="text-sm text-[var(--text2)] leading-relaxed mb-6">
              Des analystes dans 94 pays. Afrique, Europe, Amériques, Asie —
              chaque signal est enrichi par des perspectives locales.
            </p>

            {/* City list */}
            <div className="space-y-2">
              {AMBASSADOR_CITIES.slice(0, 5).map((city) => (
                <div
                  key={city.name}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: city.color }} />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">{city.name}</p>
                      <p className="text-[10px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                        {city.country}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-[11px] font-semibold"
                    style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}
                  >
                    {city.members}
                  </span>
                </div>
              ))}
            </div>

            <p
              className="mt-4 text-[10px] text-[var(--text3)]"
              style={{ fontFamily: 'var(--mono)' }}
            >
              47K+ votants actifs · 94 pays
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
