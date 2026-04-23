import type { CSSProperties } from 'react'

interface LogoProps {
  className?: string
  style?: CSSProperties
}

/* ── Brand constants ──────────────────────────────────────────────────────
   Light theme: left wing = currentColor (dark), right wing = var(--primary)
   Dark theme:  left wing = currentColor (light), right wing = var(--primary)
   Core:        radial gradient from white to var(--primary)                  */
const RIGHT_WING = 'var(--primary)'
const CORE_GLOW = 'var(--primary)'

/* ── Globe arcs (subtle background grid showing global reach) ─────────── */
function GlobeGrid({ opacity = 0.08 }: { opacity?: number }) {
  return (
    <g opacity={opacity} stroke="currentColor" fill="none">
      <ellipse cx="32" cy="32" rx="24" ry="24" strokeWidth="0.5" />
      <ellipse cx="32" cy="32" rx="12" ry="24" strokeWidth="0.4" />
      <path d="M8 32 Q32 24 56 32" strokeWidth="0.4" />
      <path d="M8 32 Q32 40 56 32" strokeWidth="0.4" />
    </g>
  )
}

/* Left wing signal paths — 8 convergence lines */
function LeftWing({ strokeWidth = 1.8, color = 'currentColor' }: { strokeWidth?: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <path d="M32 32 C27.8 30.4 23.6 26.6 18.4 20.2" />
      <path d="M32 32 C27.2 31.0 22.4 28.4 16.0 24.0" />
      <path d="M32 32 C26.8 31.6 21.6 30.4 13.6 28.0" />
      <path d="M32 32 C26.8 32.0 21.2 32.0 12.8 32.0" />
      <path d="M32 32 C26.8 32.4 21.6 33.6 13.6 36.0" />
      <path d="M32 32 C27.2 33.0 22.4 35.6 16.0 40.0" />
      <path d="M32 32 C27.8 33.6 23.6 37.4 18.4 43.8" />
      <path d="M32 32 C29.4 34.6 27.0 38.4 24.8 44.8" />
    </g>
  )
}

/* Right wing signal paths — 8 convergence lines */
function RightWing({ strokeWidth = 1.8, color = RIGHT_WING }: { strokeWidth?: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <path d="M32 32 C36.2 30.4 40.4 26.6 45.6 20.2" />
      <path d="M32 32 C36.8 31.0 41.6 28.4 48.0 24.0" />
      <path d="M32 32 C37.2 31.6 42.4 30.4 50.4 28.0" />
      <path d="M32 32 C37.2 32.0 42.8 32.0 51.2 32.0" />
      <path d="M32 32 C37.2 32.4 42.4 33.6 50.4 36.0" />
      <path d="M32 32 C36.8 33.0 41.6 35.6 48.0 40.0" />
      <path d="M32 32 C36.2 33.6 40.4 37.4 45.6 43.8" />
      <path d="M32 32 C34.6 34.6 37.0 38.4 39.2 44.8" />
    </g>
  )
}

/* Core convergence point — pulsing center */
function CorePoint({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const r = size === 'sm' ? 3 : size === 'lg' ? 6 : 5
  const dot = size === 'sm' ? 1 : size === 'lg' ? 2 : 1.6
  return (
    <>
      <circle cx="32" cy="32" r={r} fill={CORE_GLOW} opacity={0.15} />
      <circle cx="32" cy="32" r={dot} fill="currentColor" />
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   LOGO MARK — 64×64 — Primary logo with globe grid + signal convergence
   Fully theme-aware via currentColor + var(--primary)
   ══════════════════════════════════════════════════════════════════════════ */
export function LogoMark({ className, style }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ display: 'block', ...style }}
    >
      <GlobeGrid />
      <LeftWing />
      <RightWing />
      <CorePoint />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   LOGO TINY — 32×32 — Simplified 6-line version for small sizes
   ══════════════════════════════════════════════════════════════════════════ */
export function LogoTiny({ className, style }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ display: 'block', ...style }}
    >
      {/* Simplified globe hint */}
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="0.4" opacity={0.08} fill="none" />

      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M16 16 C13.8 15.2 11.6 13.0 9.0 9.2" />
        <path d="M16 16 C13.4 15.6 10.8 14.2 7.2 11.6" />
        <path d="M16 16 C13.4 16.0 10.6 16.0 6.0 16.0" />
        <path d="M16 16 C13.4 16.4 10.8 17.8 7.2 20.4" />
        <path d="M16 16 C13.8 16.8 11.6 19.0 9.0 22.8" />
        <path d="M16 16 C14.6 17.6 13.2 20.0 12.0 24.0" />
      </g>
      <g stroke={RIGHT_WING} strokeWidth="1.6" strokeLinecap="round">
        <path d="M16 16 C18.2 15.2 20.4 13.0 23.0 9.2" />
        <path d="M16 16 C18.6 15.6 21.2 14.2 24.8 11.6" />
        <path d="M16 16 C18.6 16.0 21.4 16.0 26.0 16.0" />
        <path d="M16 16 C18.6 16.4 21.2 17.8 24.8 20.4" />
        <path d="M16 16 C18.2 16.8 20.4 19.0 23.0 22.8" />
        <path d="M16 16 C17.4 17.6 18.8 20.0 20.0 24.0" />
      </g>
      <circle cx="16" cy="16" r="1.2" fill="currentColor" />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   LOGO MONO — all currentColor, for monochrome/loading contexts
   ══════════════════════════════════════════════════════════════════════════ */
export function LogoMono({ className, style }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ display: 'block', ...style }}
    >
      <GlobeGrid opacity={0.06} />
      <LeftWing color="currentColor" />
      <RightWing color="currentColor" />
      <CorePoint />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   LOGO APP ICON — Dark rounded square with centered mark
   Used for PWA, favicons, splash screens
   ══════════════════════════════════════════════════════════════════════════ */
export function LogoAppIcon({ size = 32, className, style }: LogoProps & { size?: number }) {
  const scale = size / 32
  const sw = Math.max(1.2, 1.6 * Math.min(1, scale))
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {/* Deep navy background */}
      <rect width="32" height="32" rx={size * 0.22 / scale} fill="#0B1020" />

      {/* Subtle radial glow */}
      <circle cx="16" cy="16" r="12" fill="#1C39BB" opacity="0.08" />

      {/* Globe hint */}
      <circle cx="16" cy="16" r="11" stroke="#FFFFFF" strokeWidth="0.3" opacity="0.06" fill="none" />

      {/* Left wing (white) */}
      <g stroke="#FFFFFF" strokeWidth={sw} strokeLinecap="round">
        <path d="M16 16 C13.8 15.2 11.6 13.0 9.0 9.2" />
        <path d="M16 16 C13.4 15.6 10.8 14.2 7.2 11.6" />
        <path d="M16 16 C13.4 16.0 10.6 16.0 6.0 16.0" />
        <path d="M16 16 C13.4 16.4 10.8 17.8 7.2 20.4" />
        <path d="M16 16 C13.8 16.8 11.6 19.0 9.0 22.8" />
        <path d="M16 16 C14.6 17.6 13.2 20.0 12.0 24.0" />
      </g>

      {/* Right wing (Royal Blue) */}
      <g stroke="#6B8EF8" strokeWidth={sw} strokeLinecap="round">
        <path d="M16 16 C18.2 15.2 20.4 13.0 23.0 9.2" />
        <path d="M16 16 C18.6 15.6 21.2 14.2 24.8 11.6" />
        <path d="M16 16 C18.6 16.0 21.4 16.0 26.0 16.0" />
        <path d="M16 16 C18.6 16.4 21.2 17.8 24.8 20.4" />
        <path d="M16 16 C18.2 16.8 20.4 19.0 23.0 22.8" />
        <path d="M16 16 C17.4 17.6 18.8 20.0 20.0 24.0" />
      </g>

      {/* Core */}
      <circle cx="16" cy="16" r="1.2" fill="#FFFFFF" />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   LOGO LOCKUP — Mark + Wordmark, fully theme-aware
   Main usage: Navbar, Footer, Auth pages
   ══════════════════════════════════════════════════════════════════════════ */
export function LogoLockup({ className, style }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className ?? ''}`}
      style={{ color: 'var(--text-strong)', ...style }}
      aria-label="ZAWIOS"
    >
      <span style={{ width: 34, height: 34, display: 'inline-block', flexShrink: 0, color: 'inherit' }}>
        <LogoMark style={{ width: '100%', height: '100%' }} />
      </span>
      <span
        style={{
          fontFamily: 'var(--display-font)',
          fontWeight: 800,
          fontSize: '1.125rem',
          letterSpacing: '-0.035em',
          lineHeight: 1,
          color: 'var(--text-strong)',
        }}
      >
        ZAWIOS
      </span>
    </span>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   LOGO ANIMATED — Subtle rotation animation for loading/splash states
   ══════════════════════════════════════════════════════════════════════════ */
export function LogoAnimated({ className, style }: LogoProps) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* Rotating globe grid */}
        <g opacity={0.06} stroke="currentColor" fill="none">
          <ellipse cx="32" cy="32" rx="24" ry="24" strokeWidth="0.5">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 32 32"
              to="360 32 32"
              dur="30s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="32" cy="32" rx="12" ry="24" strokeWidth="0.4">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 32 32"
              to="-360 32 32"
              dur="45s"
              repeatCount="indefinite"
            />
          </ellipse>
        </g>

        {/* Static wings */}
        <LeftWing />
        <RightWing />

        {/* Pulsing core */}
        <circle cx="32" cy="32" r="5" fill={CORE_GLOW} opacity={0.15}>
          <animate attributeName="r" values="4;6;4" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="32" r="1.6" fill="currentColor" />
      </svg>
    </div>
  )
}
