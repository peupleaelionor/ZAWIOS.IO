'use client'

import Link from 'next/link'
import { worldViewSignals } from '@/lib/mock-data'

// Simplified world map SVG — continent silhouettes, Royal Blue on dark
function GlobeSVG() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ maxWidth: 480 }}
    >
      <defs>
        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1C39BB" stopOpacity="0.22"/>
          <stop offset="50%"  stopColor="#1C39BB" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#1C39BB" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="globe-edge" cx="50%" cy="50%" r="50%">
          <stop offset="70%"  stopColor="#0E1F6B" stopOpacity="0"/>
          <stop offset="100%" stopColor="#0E1F6B" stopOpacity="0.7"/>
        </radialGradient>
        <clipPath id="globe-clip">
          <circle cx="200" cy="200" r="178"/>
        </clipPath>
      </defs>

      {/* Outer glow halo */}
      <circle cx="200" cy="200" r="195" fill="url(#globe-glow)"/>

      {/* Globe circle */}
      <circle cx="200" cy="200" r="178" fill="#060814" stroke="#1C39BB" strokeOpacity="0.3" strokeWidth="1"/>

      {/* Latitude lines */}
      <g clipPath="url(#globe-clip)" stroke="#1C39BB" strokeOpacity="0.08" strokeWidth="0.6" fill="none">
        <ellipse cx="200" cy="200" rx="178" ry="44"/>
        <ellipse cx="200" cy="200" rx="178" ry="89"/>
        <ellipse cx="200" cy="200" rx="178" ry="134"/>
        <line x1="22" y1="200" x2="378" y2="200"/>
        <line x1="200" y1="22" x2="200" y2="378"/>
        <line x1="66" y1="22"  x2="134" y2="378"/>
        <line x1="334" y1="22" x2="266" y2="378"/>
      </g>

      {/* Continent paths — clipped to globe */}
      <g clipPath="url(#globe-clip)">
        {/* North America */}
        <path
          d="M60 100 L105 88 L130 98 L138 128 L125 155 L108 170 L88 162 L70 140 L55 118 Z"
          fill="#1C39BB" fillOpacity="0.18"
          stroke="#3A86FF" strokeOpacity="0.5" strokeWidth="0.8"
        />
        {/* South America */}
        <path
          d="M108 178 L135 170 L150 192 L148 238 L130 268 L108 264 L92 242 L88 208 Z"
          fill="#1C39BB" fillOpacity="0.10"
          stroke="#1C39BB" strokeOpacity="0.3" strokeWidth="0.7"
        />
        {/* Europe */}
        <path
          d="M192 90 L222 84 L238 100 L232 120 L212 128 L196 118 Z"
          fill="#3A86FF" fillOpacity="0.22"
          stroke="#3A86FF" strokeOpacity="0.6" strokeWidth="0.8"
        />
        {/* France highlight */}
        <path
          d="M192 96 L208 92 L216 102 L212 114 L198 118 L190 108 Z"
          fill="#3A86FF" fillOpacity="0.35"
          stroke="#3A86FF" strokeOpacity="0.8" strokeWidth="0.5"
        />
        {/* Africa */}
        <path
          d="M196 128 L230 124 L248 150 L252 200 L244 240 L218 258 L192 254 L172 232 L168 192 L175 158 Z"
          fill="#1EC88A" fillOpacity="0.12"
          stroke="#1EC88A" strokeOpacity="0.4" strokeWidth="0.8"
        />
        {/* DRC highlight */}
        <path
          d="M202 188 L222 185 L228 204 L220 222 L202 224 L190 210 L192 192 Z"
          fill="#1EC88A" fillOpacity="0.28"
          stroke="#1EC88A" strokeOpacity="0.7" strokeWidth="0.5"
        />
        {/* Asia */}
        <path
          d="M248 78 L340 72 L362 108 L356 148 L328 162 L290 158 L262 142 L242 118 Z"
          fill="#1C39BB" fillOpacity="0.10"
          stroke="#1C39BB" strokeOpacity="0.2" strokeWidth="0.6"
        />
        {/* Oceania */}
        <path
          d="M310 230 L350 226 L362 248 L340 268 L312 260 Z"
          fill="#1C39BB" fillOpacity="0.08"
          stroke="#1C39BB" strokeOpacity="0.2" strokeWidth="0.5"
        />
      </g>

      {/* Connection lines between regions */}
      <g clipPath="url(#globe-clip)" stroke="#3A86FF" strokeOpacity="0.25" strokeWidth="0.7" strokeDasharray="3 5">
        <line x1="210" y1="107" x2="213" y2="210"/>  {/* Europe → Africa(DRC) */}
        <line x1="107" y1="130" x2="190" y2="108"/>  {/* N.America → Europe */}
        <line x1="213" y1="210" x2="290" y2="148"/>  {/* DRC → Asia */}
        <line x1="107" y1="130" x2="213" y2="210"/>  {/* N.America → DRC */}
      </g>

      {/* City / signal dots */}
      {/* Paris */}
      <circle cx="204" cy="104" r="4" fill="#3A86FF" fillOpacity="0.9"/>
      <circle cx="204" cy="104" r="9" fill="#3A86FF" fillOpacity="0.15"/>
      {/* Kinshasa / DRC */}
      <circle cx="213" cy="210" r="4.5" fill="#1EC88A" fillOpacity="0.9"/>
      <circle cx="213" cy="210" r="10" fill="#1EC88A" fillOpacity="0.12"/>
      {/* New York */}
      <circle cx="106" cy="127" r="3.5" fill="#1C39BB" fillOpacity="0.8"/>
      <circle cx="106" cy="127" r="8" fill="#1C39BB" fillOpacity="0.12"/>
      {/* Singapore */}
      <circle cx="306" cy="185" r="2.5" fill="#3A86FF" fillOpacity="0.6"/>
      <circle cx="306" cy="185" r="6" fill="#3A86FF" fillOpacity="0.1"/>
      {/* Nairobi */}
      <circle cx="236" cy="198" r="2.5" fill="#1EC88A" fillOpacity="0.7"/>
      {/* Lagos */}
      <circle cx="195" cy="190" r="2" fill="#1EC88A" fillOpacity="0.5"/>

      {/* Edge darkening */}
      <circle cx="200" cy="200" r="178" fill="url(#globe-edge)"/>
      {/* Rim */}
      <circle cx="200" cy="200" r="178" stroke="#1C39BB" strokeOpacity="0.4" strokeWidth="1.5" fill="none"/>

      {/* Center bowtie mark — ZAWIOS signal */}
      <g transform="translate(200,200)">
        <path
          d="M0,0 C-14,-7 -28,-2 -28,0 C-28,2 -14,7 0,0 C14,-7 28,-2 28,0 C28,2 14,7 0,0 Z"
          fill="#1C39BB" fillOpacity="0.7"
        />
        <circle cx="0" cy="0" r="2.5" fill="#3A86FF" fillOpacity="0.9"/>
        <circle cx="0" cy="0" r="6" fill="#3A86FF" fillOpacity="0.15"/>
      </g>
    </svg>
  )
}

const REGIONS = [
  { key: 'Africa',  label: 'Afrique',     color: '#1EC88A', votes: '980K' },
  { key: 'Europe',  label: 'Europe',       color: '#3A86FF', votes: '540K' },
  { key: 'USA',     label: 'États-Unis',   color: '#8BA5F9', votes: '430K' },
  { key: 'France',  label: 'France',       color: '#6B8EF8', votes: '280K' },
  { key: 'Global',  label: 'Mondial',      color: '#FFFFFF', votes: '2M+' },
]

export function GlobeSection() {
  // Compute real regional averages from world view signals
  const regionData = REGIONS.map((r) => {
    const items = worldViewSignals
      .flatMap((s) => s.regional_data ?? [])
      .filter((rd) => rd.region === r.key)
    const avg = items.length
      ? Math.round(items.reduce((sum, rd) => sum + rd.yes_percent, 0) / items.length)
      : Math.floor(52 + Math.random() * 22)
    return { ...r, avg }
  })

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: '#05070F', borderTop: '1px solid rgba(28,57,187,0.2)', borderBottom: '1px solid rgba(28,57,187,0.2)' }}
    >
      {/* Network pattern background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'url(/brand/pattern-network.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
        }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: text + region bars */}
          <div>
            <p
              className="mb-4 text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'var(--mono)', color: '#3A86FF', letterSpacing: '0.14em' }}
            >
              ─ World Intelligence
            </p>
            <h2
              className="mb-3 font-bold"
              style={{
                fontFamily: 'var(--display-font)',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                color: '#F4F4FF',
              }}
            >
              How the world<br/>
              <span style={{ color: '#3A86FF' }}>thinks.</span>
            </h2>
            <p
              className="mb-8 text-sm leading-relaxed"
              style={{ color: '#7C7E96', maxWidth: 420 }}
            >
              5 régions. Des milliers d&apos;analystes. Un signal collectif pondéré par la précision historique, pas par le volume.
            </p>

            {/* Region bars */}
            <div className="space-y-4">
              {regionData.map((r) => (
                <div key={r.key}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: r.color }}
                      />
                      <span className="text-xs font-medium" style={{ color: '#B8BAD0' }}>
                        {r.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: '#4A4C64', fontFamily: 'var(--mono)' }}>
                        {r.votes}
                      </span>
                      <span
                        className="text-sm font-bold tabular-nums"
                        style={{ fontFamily: 'var(--mono)', color: r.color, minWidth: 36, textAlign: 'right' }}
                      >
                        {r.avg}%
                      </span>
                    </div>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <div
                      className="h-full rounded-full bar-settle"
                      style={{
                        width: `${r.avg}%`,
                        background: `linear-gradient(90deg, ${r.color}88 0%, ${r.color} 100%)`,
                        boxShadow: `0 0 8px ${r.color}40`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/signals"
              className="inline-flex items-center gap-2 mt-8 text-sm font-semibold"
              style={{
                color: '#3A86FF',
                fontFamily: 'var(--mono)',
                letterSpacing: '0.02em',
                textDecoration: 'none',
              }}
            >
              Explorer les signaux
              <span style={{ fontSize: 16 }}>→</span>
            </Link>
          </div>

          {/* Right: globe */}
          <div className="flex items-center justify-center">
            <div className="relative w-full" style={{ maxWidth: 420 }}>
              <GlobeSVG />
              {/* Floating stat cards */}
              <div
                className="absolute top-6 right-0 rounded-xl px-3 py-2"
                style={{
                  background: 'rgba(28,57,187,0.15)',
                  border: '1px solid rgba(28,57,187,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <p className="text-xs font-bold" style={{ fontFamily: 'var(--mono)', color: '#3A86FF' }}>LIVE</p>
                <p className="text-lg font-bold" style={{ fontFamily: 'var(--mono)', color: '#F4F4FF', lineHeight: 1 }}>
                  {regionData.find(r => r.key === 'Global')?.avg ?? 57}%
                </p>
                <p className="text-[10px]" style={{ color: '#4A4C64' }}>Signal mondial</p>
              </div>
              <div
                className="absolute bottom-10 left-0 rounded-xl px-3 py-2"
                style={{
                  background: 'rgba(30,200,138,0.10)',
                  border: '1px solid rgba(30,200,138,0.25)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <p className="text-xs font-bold" style={{ fontFamily: 'var(--mono)', color: '#1EC88A' }}>AFRIQUE</p>
                <p className="text-lg font-bold" style={{ fontFamily: 'var(--mono)', color: '#F4F4FF', lineHeight: 1 }}>
                  {regionData.find(r => r.key === 'Africa')?.avg ?? 63}%
                </p>
                <p className="text-[10px]" style={{ color: '#4A4C64' }}>Consensus OUI</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
