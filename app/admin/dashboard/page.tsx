import type { Metadata } from 'next'
import Link from 'next/link'
import { mockSignals } from '@/lib/signals-data'
import { PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import {
  polarizationIndex,
  regionalDivergenceScore,
  decisivenessRate,
} from '@/lib/signal-analytics'

export const metadata: Metadata = {
  title: 'Admin — Dashboard interne',
}

// ── Simple role guard (server-side — expand with Supabase auth later) ──────
// For now: protected by /admin path convention. Add proper middleware guard
// in middleware.ts when Supabase auth is fully wired.

function StatBox({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
    >
      <p className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-wider mb-1" style={{ fontFamily: 'var(--mono)' }}>
        {label}
      </p>
      <p className="text-2xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>
        {typeof value === 'number' ? formatNumber(value) : value}
      </p>
      {sub && (
        <p className="text-[10px] text-[var(--text3)] mt-0.5" style={{ fontFamily: 'var(--mono)' }}>{sub}</p>
      )}
    </div>
  )
}

export default function AdminDashboardPage() {
  const activeSignals   = mockSignals.filter((s) => s.status === 'active')
  const resolvedSignals = mockSignals.filter((s) => s.status === 'resolved')

  // Compute analytics
  const avgNeutral = Math.round(
    activeSignals.reduce((acc, s) => acc + (s.neutralPercent ?? 0), 0) / Math.max(1, activeSignals.length)
  )
  const avgPolarization = (
    activeSignals.reduce((acc, s) => {
      const dist = { yes: s.yesPercent, no: s.noPercent, neutral: s.neutralPercent ?? 0, total: s.totalVotes }
      return acc + polarizationIndex(dist)
    }, 0) / Math.max(1, activeSignals.length)
  ).toFixed(2)

  const highDivergenceSignals = activeSignals
    .filter((s) => s.regionalBreakdown)
    .map((s) => ({
      signal: s,
      score: regionalDivergenceScore(s.regionalBreakdown!),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  const hotSignals = activeSignals
    .filter((s) => s.hot)
    .sort((a, b) => b.totalVotes - a.totalVotes)

  const highNeutralSignals = activeSignals
    .filter((s) => (s.neutralPercent ?? 0) >= 10)
    .sort((a, b) => (b.neutralPercent ?? 0) - (a.neutralPercent ?? 0))
    .slice(0, 5)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Admin header */}
      <div
        className="sticky top-0 z-50"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border2)' }}
      >
        <div className="container h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--zred)' }} />
            <span className="text-sm font-semibold text-[var(--text)]">ZAWIOS Admin</span>
            <span
              className="text-[10px] px-2 py-0.5 rounded"
              style={{ fontFamily: 'var(--mono)', background: 'var(--surface2)', color: 'var(--text3)' }}
            >
              internal
            </span>
          </div>
          <Link
            href="/"
            className="text-xs text-[var(--text3)] hover:text-[var(--text)] transition-colors"
            style={{ fontFamily: 'var(--mono)' }}
          >
            ← Site public
          </Link>
        </div>
      </div>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--text)] mb-1" style={{ letterSpacing: '-0.025em' }}>
            Dashboard interne
          </h1>
          <p className="text-sm text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
            Signaux · Votes · Analytiques · Divergence
          </p>
        </div>

        {/* Platform stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatBox label="Votants actifs" value={PLATFORM_STATS.total_users} />
          <StatBox label="Votes totaux" value={PLATFORM_STATS.total_votes} />
          <StatBox label="Signaux actifs" value={activeSignals.length} />
          <StatBox label="Signaux résolus" value={resolvedSignals.length} />
        </div>

        {/* Analytics indices */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatBox label="Neutralité moy." value={`${avgNeutral}%`} sub="% votes neutres" />
          <StatBox label="Polarisation moy." value={avgPolarization} sub="0→1 engagés/total" />
          <StatBox label="Précision plateforme" value={`${PLATFORM_STATS.avg_accuracy}%`} sub="avg tous utilisateurs" />
          <StatBox label="Signaux HOT" value={hotSignals.length} sub="trending actifs" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* High divergence signals */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--border2)' }}
          >
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent2)' }} />
              <p className="text-[11px] font-bold text-[var(--text)] uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>
                Divergence régionale max
              </p>
            </div>
            <div style={{ background: 'var(--surface)' }}>
              {highDivergenceSignals.map(({ signal, score }) => (
                <div
                  key={signal.id}
                  className="px-4 py-3"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <p className="text-sm text-[var(--text)] font-medium line-clamp-1 mb-1">
                    {signal.title}
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded"
                      style={{
                        fontFamily: 'var(--mono)',
                        background: score > 20 ? 'rgba(240,96,112,0.12)' : 'rgba(240,192,80,0.1)',
                        color: score > 20 ? 'var(--zred)' : 'var(--amber)',
                      }}
                    >
                      Δ {Math.round(score)}pts
                    </span>
                    <span className="text-[10px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                      {signal.region} · {signal.category}
                    </span>
                  </div>
                </div>
              ))}
              {highDivergenceSignals.length === 0 && (
                <p className="px-4 py-4 text-xs text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                  Aucun signal avec breakdown régional.
                </p>
              )}
            </div>
          </div>

          {/* High neutral rate signals */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--border2)' }}
          >
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--text3)' }} />
              <p className="text-[11px] font-bold text-[var(--text)] uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>
                Taux de neutralité élevé
              </p>
            </div>
            <div style={{ background: 'var(--surface)' }}>
              {highNeutralSignals.map((signal) => (
                <div
                  key={signal.id}
                  className="px-4 py-3"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <p className="text-sm text-[var(--text)] font-medium line-clamp-1 mb-1">
                    {signal.title}
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-semibold"
                      style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}
                    >
                      {signal.neutralPercent}% neutre
                    </span>
                    <span className="text-[10px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                      {formatNumber(signal.totalVotes)} votes · {signal.region}
                    </span>
                  </div>
                </div>
              ))}
              {highNeutralSignals.length === 0 && (
                <p className="px-4 py-4 text-xs text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                  Aucun signal à forte neutralité.
                </p>
              )}
            </div>
          </div>

          {/* All signals table */}
          <div
            className="md:col-span-2 rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--border2)' }}
          >
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}
            >
              <p className="text-[11px] font-bold text-[var(--text)] uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>
                Signaux actifs — vue complète
              </p>
              <span className="text-[10px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                {activeSignals.length} signaux
              </span>
            </div>
            {/* Column headers */}
            <div
              className="grid grid-cols-12 px-4 py-2 text-[9px] font-semibold uppercase tracking-wider"
              style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)', color: 'var(--text3)' }}
            >
              <div className="col-span-5">Signal</div>
              <div className="col-span-2 text-center">YES</div>
              <div className="col-span-2 text-center">NO</div>
              <div className="col-span-1 text-center">NEUTRE</div>
              <div className="col-span-2 text-right">Votes</div>
            </div>
            <div style={{ background: 'var(--surface)', maxHeight: '400px', overflowY: 'auto' }}>
              {activeSignals.slice(0, 20).map((signal, i) => {
                const pol = polarizationIndex({
                  yes: signal.yesPercent,
                  no: signal.noPercent,
                  neutral: signal.neutralPercent ?? 0,
                  total: signal.totalVotes,
                })
                return (
                  <div
                    key={signal.id}
                    className="grid grid-cols-12 items-center px-4 py-2.5 hover:bg-white/[0.015]"
                    style={{ borderBottom: i < 19 ? '1px solid var(--border)' : 'none' }}
                  >
                    <div className="col-span-5 min-w-0">
                      <p className="text-xs text-[var(--text)] truncate font-medium">{signal.title}</p>
                      <p className="text-[9px] text-[var(--text3)] mt-0.5" style={{ fontFamily: 'var(--mono)' }}>
                        {signal.category} · {signal.region}
                        {signal.hot && <span className="ml-1 text-[var(--zred)]">HOT</span>}
                      </p>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="text-xs font-semibold" style={{ fontFamily: 'var(--mono)', color: 'var(--teal)' }}>
                        {signal.yesPercent}%
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="text-xs font-semibold text-[var(--text2)]" style={{ fontFamily: 'var(--mono)' }}>
                        {signal.noPercent}%
                      </span>
                    </div>
                    <div className="col-span-1 text-center">
                      <span className="text-xs text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                        {signal.neutralPercent ?? 0}%
                      </span>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="text-xs text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                        {formatNumber(signal.totalVotes)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
