import type { CSSProperties } from 'react'

interface LogoProps {
  className?: string
  style?: CSSProperties
}

// Canonical butterfly mark — 11 lines per fan
// Right fan = teal (primary), left fan = white
// ViewBox: 56×34, scale via CSS width/height
export function LogoMark({ className, style }: LogoProps) {
  const cx = 28, cy = 17
  const n = 11
  const ys = Array.from({ length: n }, (_, i) => (i / (n - 1)) * 34)
  return (
    <svg
      viewBox="0 0 56 34"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ display: 'block', ...style }}
    >
      {ys.map((y, i) => (
        <line key={`L${i}`} x1={cx} y1={cy} x2={0} y2={y}
          stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      ))}
      {ys.map((y, i) => (
        <line key={`R${i}`} x1={cx} y1={cy} x2={56} y2={y}
          stroke="#17D5CF" strokeWidth="1.6" strokeLinecap="round" />
      ))}
    </svg>
  )
}

// Tiny mark — 5 lines per fan, heavier strokes, readable at 16–24px
export function LogoTiny({ className, style }: LogoProps) {
  const cx = 28, cy = 17
  const n = 5
  const ys = Array.from({ length: n }, (_, i) => (i / (n - 1)) * 34)
  return (
    <svg
      viewBox="0 0 56 34"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ display: 'block', ...style }}
    >
      {ys.map((y, i) => (
        <line key={`L${i}`} x1={cx} y1={cy} x2={0} y2={y}
          stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      ))}
      {ys.map((y, i) => (
        <line key={`R${i}`} x1={cx} y1={cy} x2={56} y2={y}
          stroke="#17D5CF" strokeWidth="3.5" strokeLinecap="round" />
      ))}
    </svg>
  )
}

// App icon — dark rounded square + mark (for 32px+)
export function LogoAppIcon({ size = 32, className, style }: LogoProps & { size?: number }) {
  const cx = size / 2, cy = size / 2
  const pad = size * 0.16
  const n = 11
  const ys = Array.from({ length: n }, (_, i) => pad + (i / (n - 1)) * (size - 2 * pad))
  const sw = size * 0.028
  return (
    <svg
      width={size} height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <rect width={size} height={size} rx={size * 0.22} fill="#08080f" />
      {ys.map((y, i) => (
        <line key={`L${i}`} x1={cx} y1={cy} x2={size * 0.06} y2={y}
          stroke="white" strokeWidth={sw} strokeLinecap="round" />
      ))}
      {ys.map((y, i) => (
        <line key={`R${i}`} x1={cx} y1={cy} x2={size * 0.94} y2={y}
          stroke="#17D5CF" strokeWidth={sw} strokeLinecap="round" />
      ))}
    </svg>
  )
}

// Lockup: mark + ZAWIOS wordmark, baseline-aligned
// Usage: Navbar — pass className for font-size
export function LogoLockup({ className, style }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-bold ${className ?? ''}`}
      style={style}
      aria-label="ZAWIOS"
    >
      <span style={{ width: 38, height: 23, display: 'inline-block', flexShrink: 0 }}>
        <LogoMark style={{ width: '100%', height: '100%' }} />
      </span>
      <span
        className="gradient-text tracking-tight"
        style={{ fontFamily: 'var(--font)', letterSpacing: '-0.02em', lineHeight: 1 }}
      >
        ZAWIOS
      </span>
    </span>
  )
}
