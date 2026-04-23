'use client'

import Link from 'next/link'
import { getTrendingSignals, mockSignals } from '@/lib/signals-data'

const REGION_COLORS: Record<string, string> = {
  global:  '#FFFFFF',
  africa:  '#1EC88A',
  europe:  '#3A86FF',
  usa:     '#8BA5F9',
  france:  '#6B8EF8',
}
const REGION_LABELS: Record<string, string> = {
  global: 'Mondial',
  africa: 'Afrique',
  europe: 'Europe',
  usa:    'Amériques',
  france: 'France',
}

export function HotTopicCard() {
  const signals = getTrendingSignals(4)
  const hotSignal = signals.find(s => s.hot) ?? signals[0]
  if (!hotSignal) return null

  // Regional breakdown from first world-view signal that has one
  const signalWithBreakdown = mockSignals.find(s => s.regionalBreakdown)
  const breakdown = signalWithBreakdown?.regionalBreakdown ?? {
    global: 58, africa: 65, europe: 54, usa: 49, france: 56,
  }

  const regions = Object.entries(REGION_LABELS).map(([key, label]) => ({
    key,
    label,
    yes: breakdown[key as keyof typeof breakdown] ?? 55,
    color: REGION_COLORS[key],
  }))

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: '#030509',
        borderTop: '1px solid rgba(28,57,187,0.15)',
        borderBottom: '1px solid rgba(28,57,187,0.15)',
      }}
    >
      {/* World map SVG background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'url(/brand/pattern-signal-rays.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
        }}
      />

      <div className="container relative py-10 md:py-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold"
              style={{
                background: 'rgba(229,72,77,0.15)',
                border: '1px solid rgba(229,72,77,0.3)',
                color: '#E5484D',
                fontFamily: 'var(--mono)',
                letterSpacing: '0.06em',
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: '#E5484D', boxShadow: '0 0 6px #E5484D' }}
              />
              HOT TOPIC
            </span>
            <p
              className="text-xs"
              style={{ color: '#4A4C64', fontFamily: 'var(--mono)' }}
            >
              Signal le plus suivi aujourd&apos;hui
            </p>
          </div>
          <Link
            href="/signals"
            className="text-xs font-semibold"
            style={{ color: '#3A86FF', fontFamily: 'var(--mono)', whiteSpace: 'nowrap' }}
          >
            Voir tous →
          </Link>
        </div>

        {/* Signal title */}
        <div className="mb-8">
          <h3
            className="font-bold mb-2"
            style={{
              fontFamily: 'var(--display-font)',
              fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
              letterSpacing: '-0.02em',
              color: '#F4F4FF',
              maxWidth: 640,
              lineHeight: 1.25,
            }}
          >
            {hotSignal.title}
          </h3>
          <p className="text-xs" style={{ color: '#4A4C64', fontFamily: 'var(--mono)' }}>
            {hotSignal.category} · {hotSignal.totalVotes?.toLocaleString('fr') ?? '—'} votes
          </p>
        </div>

        {/* Regional breakdown — horizontal cards */}
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}
        >
          {regions.map((r) => (
            <div
              key={r.key}
              className="rounded-xl p-3 flex flex-col gap-2"
              style={{
                background: `${r.color}0A`,
                border: `1px solid ${r.color}22`,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ fontFamily: 'var(--mono)', color: r.color }}
                >
                  {r.label}
                </span>
              </div>
              <div>
                <span
                  className="text-2xl font-bold tabular-nums"
                  style={{ fontFamily: 'var(--mono)', color: '#F4F4FF', lineHeight: 1 }}
                >
                  {r.yes}%
                </span>
                <span className="text-[10px] ml-1" style={{ color: '#4A4C64' }}>OUI</span>
              </div>
              {/* Mini progress bar */}
              <div className="h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${r.yes}%`, background: r.color, opacity: 0.7 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 flex gap-3 flex-wrap">
          <Link
            href={`/signals/${hotSignal.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg"
            style={{
              background: '#1C39BB',
              color: '#fff',
              textDecoration: 'none',
              fontFamily: 'var(--mono)',
              boxShadow: '0 2px 12px rgba(28,57,187,0.35)',
            }}
          >
            Rejoindre le débat →
          </Link>
          <Link
            href="/intelligence"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#B8BAD0',
              textDecoration: 'none',
              fontFamily: 'var(--mono)',
            }}
          >
            Vue intelligence
          </Link>
        </div>
      </div>
    </section>
  )
}
