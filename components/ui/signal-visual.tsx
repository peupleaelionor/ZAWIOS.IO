import type { CSSProperties, ReactElement } from 'react'
import type { Category } from '@/types'

interface SignalVisualProps {
  category?: Category | string
  className?: string
  style?: CSSProperties
}

// Config: color + label + pattern per category
const CFG: Record<string, { color: string; label: string; pattern: 'grid' | 'waves' | 'arcs' | 'fan' | 'slash' }> = {
  technology: { color: '#7c6ef0', label: 'TECH',       pattern: 'grid'  },
  finance:    { color: '#34d0b6', label: 'FINANCE',    pattern: 'waves' },
  politics:   { color: '#f06070', label: 'POLITIQUE',  pattern: 'slash' },
  science:    { color: '#60a8f0', label: 'SCIENCE',    pattern: 'arcs'  },
  work:       { color: '#f0c050', label: 'TRAVAIL',    pattern: 'grid'  },
  education:  { color: '#34d0b6', label: 'ÉDUCATION',  pattern: 'arcs'  },
  africa:     { color: '#f0c050', label: 'AFRIQUE',    pattern: 'fan'   },
  lifestyle:  { color: '#9d92f8', label: 'SOCIÉTÉ',    pattern: 'waves' },
  future:     { color: '#34d0b6', label: 'FUTUR',      pattern: 'fan'   },
  sports:     { color: '#f06070', label: 'SPORT',      pattern: 'slash' },
  business:   { color: '#f0c050', label: 'BUSINESS',   pattern: 'grid'  },
  culture:    { color: '#9d92f8', label: 'CULTURE',    pattern: 'waves' },
  world:      { color: '#60a8f0', label: 'MONDE',      pattern: 'arcs'  },
}

const W = 320, H = 80

function PatternGrid({ color }: { color: string }) {
  const dots: ReactElement[] = []
  for (let x = 0; x <= W; x += 20) {
    for (let y = 0; y <= H; y += 20) {
      dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={1.2} fill={color} opacity={0.22} />)
    }
  }
  return <>{dots}</>
}

function PatternWaves({ color }: { color: string }) {
  const paths = Array.from({ length: 5 }, (_, i) => {
    const y = (H / 6) * (i + 1)
    const amp = 10 - i * 0.5
    return `M0,${y} Q${W/4},${y - amp} ${W/2},${y} Q${W * 3/4},${y + amp} ${W},${y}`
  })
  return (
    <>
      {paths.map((d, i) => (
        <path key={i} d={d} stroke={color} strokeWidth={0.6} fill="none" opacity={0.15 + i * 0.02} />
      ))}
    </>
  )
}

function PatternArcs({ color }: { color: string }) {
  return (
    <>
      {[50, 100, 150, 200, 250].map((r) => (
        <circle key={r} cx={0} cy={H} r={r} stroke={color} strokeWidth={0.5} fill="none" opacity={0.18} />
      ))}
    </>
  )
}

function PatternFan({ color }: { color: string }) {
  const cx = W * 0.88, cy = H * 0.92
  const n = 11
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const a = ((110 + (85 * i) / (n - 1)) * Math.PI) / 180
        const len = W * 0.85
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={cx + Math.cos(a) * len}
            y2={cy + Math.sin(a) * len}
            stroke={color} strokeWidth={0.8} opacity={0.16} strokeLinecap="round"
          />
        )
      })}
    </>
  )
}

function PatternSlash({ color }: { color: string }) {
  const lines: ReactElement[] = []
  for (let x = -H; x < W + H; x += 24) {
    lines.push(
      <line key={x} x1={x} y1={0} x2={x + H * 1.2} y2={H} stroke={color} strokeWidth={0.6} opacity={0.16} />
    )
  }
  return <>{lines}</>
}

export function SignalVisual({ category = 'world', className, style }: SignalVisualProps) {
  const cfg = CFG[category] ?? { color: '#7c6ef0', label: category.toUpperCase(), pattern: 'fan' as const }
  const { color, label, pattern } = cfg
  const gradId = `sv-grad-${category}`
  const maskId = `sv-mask-${category}`

  const PatternEl =
    pattern === 'grid'  ? <PatternGrid color={color} /> :
    pattern === 'waves' ? <PatternWaves color={color} /> :
    pattern === 'arcs'  ? <PatternArcs color={color} /> :
    pattern === 'fan'   ? <PatternFan color={color} /> :
    <PatternSlash color={color} />

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#050508" />
          <stop offset="55%"  stopColor="#0e0e16" />
          <stop offset="100%" stopColor={color} stopOpacity={0.18} />
        </linearGradient>
        <clipPath id={maskId}>
          <rect width={W} height={H} />
        </clipPath>
      </defs>

      {/* Background */}
      <rect width={W} height={H} fill={`url(#${gradId})`} />

      {/* Pattern — clipped */}
      <g clipPath={`url(#${maskId})`}>{PatternEl}</g>

      {/* Large watermark label */}
      <text
        x={W - 10} y={H * 0.72}
        textAnchor="end"
        fontSize={28}
        fontFamily="IBM Plex Mono, monospace"
        fontWeight="700"
        fill={color}
        opacity={0.07}
        letterSpacing={-1}
      >
        {label}
      </text>

      {/* Category chip — bottom left */}
      <rect x={10} y={H - 22} width={label.length * 7 + 12} height={14} rx={3} fill={color} opacity={0.14} />
      <text
        x={16} y={H - 11}
        fontSize={7.5}
        fontFamily="IBM Plex Mono, monospace"
        fontWeight="600"
        fill={color}
        opacity={0.85}
        letterSpacing={1}
      >
        {label}
      </text>

      {/* Top accent line */}
      <line x1={0} y1={0} x2={W} y2={0} stroke={color} strokeWidth={1.5} opacity={0.35} />
    </svg>
  )
}
