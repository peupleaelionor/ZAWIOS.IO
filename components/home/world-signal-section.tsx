import Link from 'next/link'
import { mockSignals, getTrendingSignals } from '@/lib/signals-data'

// ── Flat world map — equirectangular projection, 800×400 viewport ──────────
function WorldMap() {
  const continentStyle = {
    fill: 'rgba(28,57,187,0.07)',
    stroke: '#1C39BB',
    strokeOpacity: 0.22,
    strokeWidth: 0.8,
  }
  const regionDotStyle = {
    fill: '#1C39BB',
    fillOpacity: 0.9,
  }

  return (
    <svg
      viewBox="0 0 800 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      style={{ maxHeight: 360, display: 'block' }}
      fill="none"
      aria-hidden
    >
      {/* Graticule — subtle grid lines */}
      <g stroke="#1C39BB" strokeOpacity="0.05" strokeWidth="0.5">
        {/* Equator */}
        <line x1="0" y1="200" x2="800" y2="200" strokeDasharray="4 8"/>
        {/* Prime meridian */}
        <line x1="400" y1="0" x2="400" y2="400" strokeDasharray="4 8"/>
        {/* Tropics */}
        <line x1="0" y1="152" x2="800" y2="152" strokeDasharray="2 6"/>
        <line x1="0" y1="248" x2="800" y2="248" strokeDasharray="2 6"/>
        {/* Vertical quarters */}
        <line x1="200" y1="0" x2="200" y2="400" strokeDasharray="2 6"/>
        <line x1="600" y1="0" x2="600" y2="400" strokeDasharray="2 6"/>
      </g>

      {/* ── Continents ── */}
      {/* North America */}
      <path
        d="M 38,95 L 52,58 L 88,30 L 144,24 L 196,34 L 238,58 L 260,92 L 256,132 L 228,162 L 198,178 L 170,170 L 158,180 L 136,172 L 112,152 L 88,130 L 60,108 Z"
        {...continentStyle}
      />
      {/* South America */}
      <path
        d="M 154,192 L 204,180 L 256,196 L 268,228 L 262,270 L 246,314 L 216,350 L 186,360 L 160,344 L 142,310 L 136,264 L 142,220 Z"
        {...continentStyle}
      />
      {/* Europe */}
      <path
        d="M 346,60 L 388,46 L 430,50 L 456,70 L 446,92 L 414,104 L 386,100 L 358,86 L 344,70 Z"
        {...continentStyle}
        fill="rgba(28,57,187,0.12)"
      />
      {/* Africa */}
      <path
        d="M 358,104 L 402,94 L 446,100 L 472,126 L 486,164 L 488,208 L 476,254 L 450,294 L 414,322 L 378,328 L 342,304 L 318,270 L 312,226 L 316,178 L 330,138 Z"
        {...continentStyle}
        fill="rgba(30,200,138,0.07)"
        stroke="#1EC88A"
        strokeOpacity={0.2}
      />
      {/* Asia */}
      <path
        d="M 463,52 L 530,34 L 608,26 L 678,36 L 746,56 L 782,88 L 784,124 L 760,154 L 716,170 L 670,174 L 620,164 L 566,154 L 506,130 L 468,96 Z"
        {...continentStyle}
      />
      {/* Oceania / Australia */}
      <path
        d="M 638,244 L 698,226 L 750,232 L 776,258 L 774,296 L 748,318 L 704,324 L 660,306 L 638,276 Z"
        {...continentStyle}
      />

      {/* ── Connection lines between regions ── */}
      <g stroke="#1C39BB" strokeOpacity="0.15" strokeWidth="0.7" strokeDasharray="3 6">
        {/* Paris → Kinshasa */}
        <line x1="398" y1="74" x2="410" y2="218"/>
        {/* NY → Paris */}
        <line x1="224" y1="118" x2="398" y2="74"/>
        {/* Kinshasa → Singapore */}
        <line x1="410" y1="218" x2="634" y2="178"/>
        {/* NY → Kinshasa */}
        <line x1="224" y1="118" x2="410" y2="218"/>
      </g>

      {/* ── Region dots ── */}
      {/* Global — center of map */}
      <circle cx="400" cy="180" r="3" {...regionDotStyle} fillOpacity={0.3}/>

      {/* Paris / Europe */}
      <circle cx="398" cy="74" r="5" fill="#3A86FF" fillOpacity="0.9"/>
      <circle cx="398" cy="74" r="11" fill="#3A86FF" fillOpacity="0.12"/>
      <circle cx="398" cy="74" r="18" fill="#3A86FF" fillOpacity="0.04"/>

      {/* Kinshasa / Africa */}
      <circle cx="410" cy="218" r="5.5" fill="#1EC88A" fillOpacity="0.9"/>
      <circle cx="410" cy="218" r="12" fill="#1EC88A" fillOpacity="0.12"/>
      <circle cx="410" cy="218" r="20" fill="#1EC88A" fillOpacity="0.04"/>

      {/* New York / USA */}
      <circle cx="224" cy="118" r="4.5" fill="#1C39BB" fillOpacity="0.85"/>
      <circle cx="224" cy="118" r="10" fill="#1C39BB" fillOpacity="0.10"/>

      {/* Singapore / Asia */}
      <circle cx="634" cy="178" r="3.5" fill="#6B8EF8" fillOpacity="0.8"/>
      <circle cx="634" cy="178" r="8" fill="#6B8EF8" fillOpacity="0.10"/>

      {/* Lagos / Africa W */}
      <circle cx="368" cy="196" r="2.5" fill="#1EC88A" fillOpacity="0.5"/>

      {/* Nairobi */}
      <circle cx="440" cy="206" r="2" fill="#1EC88A" fillOpacity="0.5"/>

      {/* ── City labels ── */}
      <text x="408" y="68" fontSize="8" fill="#3A86FF" fillOpacity="0.7" fontFamily="IBM Plex Mono, monospace" fontWeight="600">PARIS</text>
      <text x="418" y="215" fontSize="8" fill="#1EC88A" fillOpacity="0.7" fontFamily="IBM Plex Mono, monospace" fontWeight="600">KINSHASA</text>
      <text x="230" y="114" fontSize="8" fill="#1C39BB" fillOpacity="0.7" fontFamily="IBM Plex Mono, monospace" fontWeight="600">NEW YORK</text>
    </svg>
  )
}

const REGIONS = [
  { key: 'Africa',  label: 'Afrique',    color: '#1EC88A', icon: '🌍', votes: '980K' },
  { key: 'Europe',  label: 'Europe',     color: '#3A86FF', icon: '🌍', votes: '540K' },
  { key: 'USA',     label: 'Amériques',  color: '#1C39BB', icon: '🌎', votes: '430K' },
  { key: 'France',  label: 'France',     color: '#6B8EF8', icon: '🇫🇷', votes: '280K' },
  { key: 'Global',  label: 'Mondial',    color: '#0F172A', icon: '🌐', votes: '2M+' },
]

export function WorldSignalSection() {
  const signals = getTrendingSignals(3)
  const featuredSignal = signals[0]

  // Real regional data from mockSignals
  const regionData = REGIONS.map((r) => {
    const key = r.key.toLowerCase() as keyof NonNullable<typeof mockSignals[0]['regionalBreakdown']>
    const items = mockSignals
      .map(s => s.regionalBreakdown?.[key])
      .filter((v): v is number => v !== undefined && typeof v === 'number')
    const avg = items.length
      ? Math.round(items.reduce((a, b) => a + b, 0) / items.length)
      : 55
    return { ...r, avg }
  })

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20"
      style={{ background: 'var(--surface-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      {/* Constellation — top-right accent, fades toward content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'url(/brand/backgrounds/mesh/bg-constellation.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'top right',
          mixBlendMode: 'multiply',
          opacity: 0.35,
          WebkitMaskImage: 'radial-gradient(ellipse 65% 75% at 100% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
          maskImage: 'radial-gradient(ellipse 65% 75% at 100% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
        }}
      />
      <div className="container relative">

        {/* Section header */}
        <div className="mb-10">
          <p className="section-label mb-3">Vision mondiale</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2
              className="font-bold"
              style={{
                fontFamily: 'var(--display-font)',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                letterSpacing: '-0.025em',
                color: 'var(--text-strong)',
                lineHeight: 1.1,
              }}
            >
              Comment le monde pense.
            </h2>
            <Link
              href="/signals"
              className="text-sm font-semibold shrink-0"
              style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', letterSpacing: '0.02em' }}
            >
              Explorer →
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left col: region breakdown (2/5) */}
          <div className="lg:col-span-2 space-y-3">
            {regionData.map((r) => (
              <div
                key={r.key}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                {/* Color dot */}
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: r.color }}
                />
                {/* Label */}
                <span
                  className="text-sm font-medium flex-1 min-w-0"
                  style={{ color: 'var(--text-strong)' }}
                >
                  {r.label}
                </span>
                {/* Votes count */}
                <span
                  className="text-xs shrink-0"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}
                >
                  {r.votes}
                </span>
                {/* Percentage */}
                <span
                  className="text-sm font-bold tabular-nums shrink-0"
                  style={{ fontFamily: 'var(--mono)', color: r.color, minWidth: 36, textAlign: 'right' }}
                >
                  {r.avg}%
                </span>
              </div>
            ))}

            {/* Featured hot signal */}
            {featuredSignal && (
              <Link
                href={`/signals/${featuredSignal.id}`}
                className="block mt-4 rounded-xl px-4 py-4"
                style={{
                  background: 'var(--primary-soft)',
                  border: '1px solid rgba(28,57,187,0.15)',
                  textDecoration: 'none',
                }}
              >
                <p
                  className="text-[10px] font-bold mb-2 uppercase tracking-wider"
                  style={{ fontFamily: 'var(--mono)', color: 'var(--primary)' }}
                >
                  ● Signal du moment
                </p>
                <p
                  className="text-sm font-semibold leading-snug mb-1"
                  style={{ color: 'var(--text-strong)' }}
                >
                  {featuredSignal.title}
                </p>
                <p className="text-xs" style={{ color: 'var(--primary)', fontFamily: 'var(--mono)' }}>
                  {featuredSignal.yesPercent ?? 58}% OUI · {featuredSignal.totalVotes?.toLocaleString('fr') ?? '—'} votes →
                </p>
              </Link>
            )}
          </div>

          {/* Right col: world map (3/5) */}
          <div
            className="lg:col-span-3 rounded-2xl overflow-hidden relative"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: '16px',
            }}
          >
            <WorldMap />
            {/* Map legend */}
            <div className="flex flex-wrap gap-3 mt-3 px-1">
              {[
                { color: '#3A86FF', label: 'Europe' },
                { color: '#1EC88A', label: 'Afrique' },
                { color: '#1C39BB', label: 'Amériques' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: l.color }}/>
                  <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
