'use client'

import { useState } from 'react'
import { getWorldViewSignals } from '@/lib/signals-data'

// Minimal SVG world map — continent silhouettes, very subtle
function MinimalWorldMap({ activeRegion }: { activeRegion: string }) {
  const continentOpacity = (id: string) =>
    activeRegion === 'global' || activeRegion === id ? 1 : 0.3

  return (
    <svg
      viewBox="0 0 360 180"
      className="w-full"
      style={{ maxHeight: '180px', opacity: 0.6 }}
      fill="none"
    >
      {/* North America */}
      <path
        d="M30 30 L60 25 L75 35 L80 55 L70 70 L55 80 L45 75 L35 60 Z"
        fill={activeRegion === 'usa' || activeRegion === 'global' ? 'rgba(23,213,207,0.12)' : 'rgba(255,255,255,0.04)'}
        stroke={activeRegion === 'usa' ? 'rgba(23,213,207,0.4)' : 'rgba(255,255,255,0.08)'}
        strokeWidth="0.8"
        style={{ transition: 'all 400ms ease', opacity: continentOpacity('usa') }}
      />
      {/* South America */}
      <path
        d="M70 95 L85 90 L95 105 L90 130 L75 140 L65 125 L60 110 Z"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="0.8"
      />
      {/* Europe */}
      <path
        d="M145 25 L170 22 L178 35 L172 50 L158 55 L148 45 Z"
        fill={activeRegion === 'europe' || activeRegion === 'global' ? 'rgba(65,105,225,0.12)' : 'rgba(255,255,255,0.04)'}
        stroke={activeRegion === 'europe' ? 'rgba(65,105,225,0.4)' : 'rgba(255,255,255,0.08)'}
        strokeWidth="0.8"
        style={{ transition: 'all 400ms ease', opacity: continentOpacity('europe') }}
      />
      {/* Africa */}
      <path
        d="M148 60 L172 58 L185 75 L188 105 L175 125 L155 128 L140 110 L135 85 Z"
        fill={activeRegion === 'africa' || activeRegion === 'rdc' || activeRegion === 'global' ? 'rgba(23,213,207,0.08)' : 'rgba(255,255,255,0.04)'}
        stroke={activeRegion === 'africa' || activeRegion === 'rdc' ? 'rgba(23,213,207,0.3)' : 'rgba(255,255,255,0.08)'}
        strokeWidth="0.8"
        style={{ transition: 'all 400ms ease', opacity: continentOpacity('africa') }}
      />
      {/* Asia */}
      <path
        d="M185 20 L260 18 L280 40 L275 70 L255 80 L220 75 L195 60 L180 45 Z"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="0.8"
      />
      {/* Oceania */}
      <path
        d="M260 110 L290 108 L300 120 L285 135 L265 130 Z"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="0.8"
      />

      {/* Grid lines */}
      <line x1="0" y1="90" x2="360" y2="90" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3 6" />
      <line x1="180" y1="0" x2="180" y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3 6" />

      {/* City dots */}
      <circle cx="165" cy="100" r="2.5" fill="rgba(23,213,207,0.6)" />
      <circle cx="165" cy="100" r="5" fill="rgba(23,213,207,0.12)" stroke="rgba(23,213,207,0.2)" strokeWidth="0.5" />
      <circle cx="153" cy="33" r="2" fill="rgba(65,105,225,0.7)" />
      <circle cx="153" cy="33" r="4" fill="rgba(65,105,225,0.1)" stroke="rgba(65,105,225,0.2)" strokeWidth="0.5" />
      <circle cx="155" cy="90" r="2" fill="rgba(23,213,207,0.4)" />
      <circle cx="60" cy="45" r="2" fill="rgba(255,255,255,0.25)" />
      <circle cx="252" cy="85" r="1.5" fill="rgba(255,255,255,0.2)" />
    </svg>
  )
}

export function WorldViewSection() {
  const [activeRegion, setActiveRegion] = useState('global')
  const [compareOptIn, setCompareOptIn] = useState(false)
  const signals = getWorldViewSignals(3)

  const getRegionStats = (region: string) => {
    if (!signals.length || !signals[0].regionalBreakdown) return { yes: 54, no: 46 }
    const bd = signals[0].regionalBreakdown
    const yesVal =
      region === 'global' ? bd.global
      : region === 'africa' ? bd.africa
      : region === 'europe' ? bd.europe
      : region === 'usa' ? bd.usa
      : bd.france
    return { yes: yesVal, no: 100 - yesVal }
  }

  const stats = getRegionStats(activeRegion)

  // Safe-by-default: only "Ma région" + "Global" visible. Others behind opt-in.
  const SAFE_REGIONS = [
    { id: 'global', label: 'Global résumé', votes: '2M' },
  ]
  const COMPARE_REGIONS = [
    { id: 'africa', label: 'Afrique', votes: '980K' },
    { id: 'europe', label: 'Europe', votes: '540K' },
    { id: 'usa', label: 'USA', votes: '430K' },
  ]

  const visibleRegions = compareOptIn
    ? [...SAFE_REGIONS, ...COMPARE_REGIONS]
    : SAFE_REGIONS

  return (
    <section
      className="py-12 md:py-20"
      style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container">
        <div className="mb-8">
          <p className="section-label">World View</p>
          <h2
            className="text-2xl md:text-3xl font-bold text-[var(--text)] mt-1"
            style={{ letterSpacing: '-0.025em' }}
          >
            Comment le monde pense
          </h2>
          <p className="mt-2 text-sm text-[var(--text2)]">
            Résumé global agrégé — données anonymes et indicatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Left: map + region tabs */}
          <div
            className="rounded-xl p-5 overflow-hidden"
            style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
          >
            {/* Region tabs: safe-by-default */}
            <div className="flex items-center gap-1.5 mb-4 overflow-x-auto scrollbar-none flex-wrap">
              {visibleRegions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setActiveRegion(r.id)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-150"
                  style={{
                    fontFamily: 'var(--mono)',
                    background: activeRegion === r.id ? 'rgba(23,213,207,0.15)' : 'transparent',
                    color: activeRegion === r.id ? 'var(--teal)' : 'var(--text3)',
                    border: activeRegion === r.id ? '1px solid rgba(23,213,207,0.3)' : '1px solid transparent',
                  }}
                >
                  {r.label}
                  <span className="ml-1.5 opacity-60">{r.votes}</span>
                </button>
              ))}
              {/* Opt-in toggle for region comparison */}
              {!compareOptIn && (
                <button
                  onClick={() => setCompareOptIn(true)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-150"
                  style={{
                    fontFamily: 'var(--mono)',
                    background: 'var(--surface2)',
                    color: 'var(--text3)',
                    border: '1px dashed var(--border3)',
                  }}
                >
                  Comparer Afrique / Europe / USA
                </button>
              )}
            </div>

            {/* Map */}
            <MinimalWorldMap activeRegion={activeRegion} />

            {/* Stats below map */}
            <div className="mt-4 flex items-center gap-4">
              <div>
                <p
                  className="text-3xl font-bold"
                  style={{ fontFamily: 'var(--mono)', color: 'var(--teal)', lineHeight: 1 }}
                >
                  {stats.yes}%
                </p>
                <p className="text-[10px] text-[var(--teal)] font-semibold mt-0.5" style={{ fontFamily: 'var(--mono)' }}>
                  YES
                </p>
              </div>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface3)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${stats.yes}%`,
                    background: 'linear-gradient(90deg, var(--teal), var(--teal2))',
                  }}
                />
              </div>
              <div className="text-right">
                <p
                  className="text-xl font-bold text-[var(--text2)]"
                  style={{ fontFamily: 'var(--mono)', lineHeight: 1 }}
                >
                  {stats.no}%
                </p>
                <p className="text-[10px] text-[var(--text3)] font-semibold mt-0.5" style={{ fontFamily: 'var(--mono)' }}>
                  NO
                </p>
              </div>
            </div>

            {/* Privacy note */}
            <p
              className="mt-3 text-[9px] text-[var(--text3)] opacity-60"
              style={{ fontFamily: 'var(--mono)' }}
            >
              Données agrégées, anonymes, indicatives.
            </p>
          </div>

          {/* Right: signal breakdown list */}
          <div className="space-y-3">
            {signals.map((sig) => {
              if (!sig.regionalBreakdown) return null
              const bd = sig.regionalBreakdown

              // Safe-by-default: only show "Global" + "Ma région" rows unless opt-in
              const safeRows = [
                { label: 'Global', value: bd.global, highlight: false },
              ]
              const compareRows = [
                { label: 'Afrique', value: bd.africa, highlight: activeRegion === 'africa' },
                { label: 'France', value: bd.france, highlight: activeRegion === 'europe' },
                { label: 'Europe', value: bd.europe, highlight: activeRegion === 'europe' },
                { label: 'USA', value: bd.usa, highlight: activeRegion === 'usa' },
              ]
              const rows = compareOptIn ? [...safeRows, ...compareRows] : safeRows

              return (
                <div
                  key={sig.id}
                  className="rounded-xl p-4"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
                >
                  <p className="text-sm font-semibold text-[var(--text)] mb-3 leading-snug">{sig.title}</p>
                  <div className="space-y-2">
                    {rows.map((row) => (
                      <div key={row.label} className="flex items-center gap-2">
                        <span
                          className="text-[10px] w-14 shrink-0"
                          style={{
                            fontFamily: 'var(--mono)',
                            color: row.highlight ? 'var(--teal)' : 'var(--text3)',
                          }}
                        >
                          {row.label}
                        </span>
                        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface3)' }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${row.value}%`,
                              background: row.highlight
                                ? 'var(--teal)'
                                : 'rgba(255,255,255,0.15)',
                            }}
                          />
                        </div>
                        <span
                          className="text-[10px] w-8 text-right shrink-0 font-semibold"
                          style={{
                            fontFamily: 'var(--mono)',
                            color: row.highlight ? 'var(--teal)' : 'var(--text3)',
                          }}
                        >
                          {row.value}%
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Labels neutres: écarts / divergence / consensus */}
                  {compareOptIn && (
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      {(() => {
                        const vals = [bd.global, bd.africa, bd.france, bd.europe, bd.usa]
                        const max = Math.max(...vals)
                        const min = Math.min(...vals)
                        const spread = max - min
                        if (spread < 10) return (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--teal)]/10 text-[var(--teal)]" style={{ fontFamily: 'var(--mono)' }}>
                            consensus ({spread}pts d&apos;écart)
                          </span>
                        )
                        return (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--amber)]/10 text-[var(--amber)]" style={{ fontFamily: 'var(--mono)' }}>
                            divergence ({spread}pts d&apos;écart)
                          </span>
                        )
                      })()}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
