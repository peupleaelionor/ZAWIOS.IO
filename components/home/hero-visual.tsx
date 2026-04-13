import type { CSSProperties } from 'react'
import { allPredictions, mockLeaderboard, worldViewSignals } from '@/lib/mock-data'
import { SignalVisual } from '@/components/ui/signal-visual'
import { formatNumber } from '@/lib/utils'

// Inline avatar bubble — gradient initials fallback, no external request in mockup
function MiniAvatar({ name, accent }: { name: string; accent: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${accent} 0%, #050508 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 8,
        fontWeight: 700,
        color: '#eaeaf0',
        fontFamily: 'var(--mono)',
        flexShrink: 0,
        letterSpacing: '0.02em',
      }}
    >
      {initials}
    </div>
  )
}

const ACCENT_COLORS = ['#17D5CF', '#9d92f8', '#f0c050']

export function HeroVisual() {
  // Best featured yes_no prediction that is open
  const pred =
    allPredictions.find((p) => p.type === 'yes_no' && p.featured && p.status === 'open') ??
    allPredictions[0]

  const mainPct = pred.options?.[0]?.percentage ?? 64
  const secPct  = pred.options?.[1]?.percentage ?? 36
  const top3    = mockLeaderboard.slice(0, 3)

  // Region averages from world view signals
  const regionAverages = [
    { label: 'AFRIQUE', color: '#f0c050', avg: 0 },
    { label: 'GLOBAL',  color: '#17D5CF', avg: 0 },
    { label: 'USA',     color: '#60a8f0', avg: 0 },
  ].map((r) => {
    const rKey = r.label === 'AFRIQUE' ? 'Africa' : r.label === 'GLOBAL' ? 'Global' : 'USA'
    const items = worldViewSignals.flatMap((s) => s.regional_data ?? []).filter((rd) => rd.region === rKey)
    const avg = items.length ? Math.round(items.reduce((sum, rd) => sum + rd.yes_percent, 0) / items.length) : 57
    return { ...r, avg }
  })

  // Shared card style
  const cardBase: CSSProperties = {
    background: 'var(--surface)',
    border: '1px solid var(--border2)',
    borderRadius: 14,
    overflow: 'hidden',
  }

  return (
    <div
      aria-hidden="true"
      className="hero-visual-in"
      style={{ userSelect: 'none', pointerEvents: 'none', position: 'relative' }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '5%',
          right: '5%',
          height: '50%',
          background: 'radial-gradient(ellipse, rgba(23,213,207,0.13) 0%, transparent 70%)',
          filter: 'blur(24px)',
          zIndex: 0,
        }}
      />

      <div className="hero-grid float-gentle" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── LEFT: Main signal card ── */}
        <div
          style={{
            ...cardBase,
            boxShadow: '0 24px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {/* Category thumbnail */}
          <div style={{ height: 88, overflow: 'hidden' }}>
            <SignalVisual category={pred.category} />
          </div>

          <div style={{ padding: '16px 16px 14px' }}>
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 8.5, fontFamily: 'var(--mono)', color: 'var(--text3)', fontWeight: 700, letterSpacing: '0.1em' }}>
                SIGNAL
              </span>
              <span
                style={{ fontSize: 8, fontFamily: 'var(--mono)', color: 'var(--accent)', background: 'rgba(23,213,207,0.1)', padding: '2px 7px', borderRadius: 4, fontWeight: 600 }}
              >
                {pred.category.toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <p
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: 'var(--text)',
                lineHeight: 1.45,
                marginBottom: 16,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                WebkitBoxOrient: 'vertical' as any,
                overflow: 'hidden',
              }}
            >
              {pred.title}
            </p>

            {/* Big YES percentage */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                <span
                  style={{ fontSize: 30, fontWeight: 700, fontFamily: 'var(--mono)', color: 'var(--text)', lineHeight: 1 }}
                >
                  {mainPct}%
                </span>
                <div>
                  <span style={{ fontSize: 9, color: 'var(--teal)', fontFamily: 'var(--mono)', fontWeight: 700 }}>YES</span>
                  <span style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--mono)' }}> · {secPct}% NO</span>
                </div>
              </div>

              {/* YES bar */}
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 5 }}>
                <span style={{ fontSize: 8, fontFamily: 'var(--mono)', color: 'var(--teal)', width: 22, flexShrink: 0 }}>YES</span>
                <div style={{ flex: 1, height: 5, background: 'var(--surface3)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${mainPct}%`, background: 'var(--teal)', borderRadius: 10 }} />
                </div>
                <span style={{ fontSize: 8, fontFamily: 'var(--mono)', color: 'var(--text3)', width: 22, textAlign: 'right' }}>{mainPct}%</span>
              </div>

              {/* NO bar */}
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <span style={{ fontSize: 8, fontFamily: 'var(--mono)', color: 'var(--zred)', width: 22, flexShrink: 0 }}>NO</span>
                <div style={{ flex: 1, height: 5, background: 'var(--surface3)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${secPct}%`, background: 'var(--zred)', borderRadius: 10, opacity: 0.7 }} />
                </div>
                <span style={{ fontSize: 8, fontFamily: 'var(--mono)', color: 'var(--text3)', width: 22, textAlign: 'right' }}>{secPct}%</span>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid var(--border)',
                paddingTop: 10,
                marginTop: 4,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MiniAvatar name={pred.creator?.full_name ?? 'ZAWIOS'} accent="#17D5CF" />
                <span style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                  @{pred.creator?.username ?? 'zawios'}
                </span>
              </div>
              <span style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                {formatNumber(pred.vote_count)} votes
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT column (hidden on mobile) ── */}
        <div className="hero-grid-right" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Live badge */}
          <div
            style={{
              background: 'rgba(23,213,207,0.07)',
              border: '1px solid rgba(23,213,207,0.2)',
              borderRadius: 10,
              padding: '9px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--teal)',
                  borderRadius: '50%',
                  opacity: 0.45,
                }}
              />
              <div style={{ position: 'relative', width: 8, height: 8, background: 'var(--teal)', borderRadius: '50%' }} />
            </div>
            <span style={{ fontSize: 9, fontFamily: 'var(--mono)', color: 'var(--teal)', fontWeight: 700, letterSpacing: '0.08em' }}>
              LIVE · 47,280 ACTIFS
            </span>
          </div>

          {/* Leaderboard mini */}
          <div
            style={{
              ...cardBase,
              padding: '14px',
              boxShadow: '0 12px 28px rgba(0,0,0,0.4)',
            }}
          >
            <p style={{ fontSize: 8, fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--violet3)', letterSpacing: '0.12em', marginBottom: 12, textTransform: 'uppercase' }}>
              Top Predictors
            </p>
            {top3.map((entry, i) => (
              <div
                key={entry.user.id}
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: i < 2 ? 10 : 0 }}
              >
                <span
                  style={{
                    fontSize: 9, fontFamily: 'var(--mono)', fontWeight: 700, width: 13, flexShrink: 0,
                    color: i === 0 ? 'var(--amber)' : i === 1 ? 'var(--text3)' : '#cd7f32',
                  }}
                >
                  {i + 1}
                </span>
                <MiniAvatar name={entry.user.full_name} accent={ACCENT_COLORS[i]} />
                <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {entry.user.full_name.split(' ')[0]}
                </span>
                <span style={{ fontSize: 9, fontFamily: 'var(--mono)', color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>
                  {entry.accuracy_rate}%
                </span>
              </div>
            ))}
          </div>

          {/* World View mini */}
          <div
            style={{
              ...cardBase,
              padding: '14px',
              boxShadow: '0 12px 28px rgba(0,0,0,0.4)',
            }}
          >
            <p style={{ fontSize: 8, fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--violet3)', letterSpacing: '0.12em', marginBottom: 12, textTransform: 'uppercase' }}>
              World View
            </p>
            {regionAverages.map((r, i) => (
              <div key={r.label} style={{ marginBottom: i < regionAverages.length - 1 ? 9 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 8.5, fontFamily: 'var(--mono)', color: 'var(--text3)' }}>{r.label}</span>
                  <span style={{ fontSize: 8.5, fontFamily: 'var(--mono)', color: r.color, fontWeight: 700 }}>{r.avg}%</span>
                </div>
                <div style={{ height: 4, background: 'var(--surface3)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${r.avg}%`, background: r.color, borderRadius: 10, opacity: 0.85 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Reputation mini card */}
          <div
            style={{
              background: 'rgba(90,75,255,0.07)',
              border: '1px solid rgba(90,75,255,0.18)',
              borderRadius: 12,
              padding: '12px 14px',
            }}
          >
            <p style={{ fontSize: 8, fontFamily: 'var(--mono)', color: 'var(--violet3)', fontWeight: 700, letterSpacing: '0.12em', marginBottom: 8 }}>
              REPUTATION SCORE
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--mono)', color: 'var(--text)', lineHeight: 1 }}>9,847</span>
              <span style={{ fontSize: 9, color: 'var(--teal)', fontFamily: 'var(--mono)', fontWeight: 600 }}>+124 pts</span>
            </div>
            <div style={{ display: 'flex', gap: 3, marginTop: 8 }}>
              {[85, 70, 90, 60, 95, 75, 88].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: h * 0.28,
                    background: i === 6 ? 'var(--teal)' : 'rgba(157,146,248,0.25)',
                    borderRadius: 2,
                    alignSelf: 'flex-end',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
