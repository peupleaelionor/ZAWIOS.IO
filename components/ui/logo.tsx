import Image from 'next/image'
import type { CSSProperties } from 'react'

interface LogoProps {
  className?: string
  style?: CSSProperties
}

/* Right wing: Royal Signal Blue via CSS var (adapts to both themes) */
const ACCENT = 'var(--primary)'

/* ── Mark 64×64 — inline SVG, adapts to theme ─────────────────────────────
   Left wing:  currentColor (dark in light mode, light in dark mode)
   Right wing: var(--primary) = Royal Signal Blue / indigo in dark */
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
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 32 C27.8 30.6 23.6 26.8 18.8 20.6"/>
        <path d="M32 32 C27.4 31.2 22.8 28.8 16.8 24.6"/>
        <path d="M32 32 C27.2 32.0 22.0 32.0 13.0 32.0"/>
        <path d="M32 32 C27.4 32.8 22.8 35.2 16.8 39.4"/>
        <path d="M32 32 C27.8 33.4 23.6 37.2 18.8 43.4"/>
        <path d="M32 32 C29.6 34.8 27.4 38.8 25.6 45.6"/>
        <path d="M32 32 C30.4 34.2 29.2 37.0 28.2 40.8"/>
        <path d="M32 32 C31.0 33.4 30.2 35.2 29.6 37.6"/>
      </g>
      <g stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 32 C36.2 30.6 40.4 26.8 45.2 20.6"/>
        <path d="M32 32 C36.6 31.2 41.2 28.8 47.2 24.6"/>
        <path d="M32 32 C36.8 32.0 42.0 32.0 51.0 32.0"/>
        <path d="M32 32 C36.6 32.8 41.2 35.2 47.2 39.4"/>
        <path d="M32 32 C36.2 33.4 40.4 37.2 45.2 43.4"/>
        <path d="M32 32 C34.4 34.8 36.6 38.8 38.4 45.6"/>
        <path d="M32 32 C33.6 34.2 34.8 37.0 35.8 40.8"/>
        <path d="M32 32 C33.0 33.4 33.8 35.2 34.4 37.6"/>
      </g>
      <path d="M31.2 32 L32.8 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Mark 32×32 — 6 curves, optimized for small sizes ─────────────────── */
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
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16 C13.8 15.2 11.6 13.0 9.0 9.2"/>
        <path d="M16 16 C13.6 15.8 11.0 14.4 7.8 12.0"/>
        <path d="M16 16 C13.6 16.0 10.8 16.0 6.2 16.0"/>
        <path d="M16 16 C13.6 16.2 11.0 17.6 7.8 20.0"/>
        <path d="M16 16 C13.8 16.8 11.6 19.0 9.0 22.8"/>
        <path d="M16 16 C14.6 17.6 13.2 20.0 12.0 24.0"/>
      </g>
      <g stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16 C18.2 15.2 20.4 13.0 23.0 9.2"/>
        <path d="M16 16 C18.4 15.8 21.0 14.4 24.2 12.0"/>
        <path d="M16 16 C18.4 16.0 21.2 16.0 25.8 16.0"/>
        <path d="M16 16 C18.4 16.2 21.0 17.6 24.2 20.0"/>
        <path d="M16 16 C18.2 16.8 20.4 19.0 23.0 22.8"/>
        <path d="M16 16 C17.4 17.6 18.8 20.0 20.0 24.0"/>
      </g>
      <path d="M15.5 16 L16.5 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Mono mark — all currentColor, for monochrome contexts ─────────────── */
export function LogoMono({ className, style }: LogoProps) {
  return (
    <Image
      src="/brand/logo/zawios-mark-mono.svg"
      alt=""
      width={64}
      height={64}
      aria-hidden
      className={className}
      style={{ display: 'block', ...style }}
    />
  )
}

/* ── App icon — dark rounded square background + Royal Signal Blue wing ─── */
export function LogoAppIcon({ size = 32, className, style }: LogoProps & { size?: number }) {
  const scale = size / 32
  const sw = Math.max(1.2, 1.8 * Math.min(1, scale))
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
      <rect width="32" height="32" rx={size * 0.22 / scale} fill="#0F172A"/>
      <g stroke="#FFFFFF" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16 C13.8 15.2 11.6 13.0 9.0 9.2"/>
        <path d="M16 16 C13.6 15.8 11.0 14.4 7.8 12.0"/>
        <path d="M16 16 C13.6 16.0 10.8 16.0 6.2 16.0"/>
        <path d="M16 16 C13.6 16.2 11.0 17.6 7.8 20.0"/>
        <path d="M16 16 C13.8 16.8 11.6 19.0 9.0 22.8"/>
        <path d="M16 16 C14.6 17.6 13.2 20.0 12.0 24.0"/>
      </g>
      <g stroke="#1C39BB" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16 C18.2 15.2 20.4 13.0 23.0 9.2"/>
        <path d="M16 16 C18.4 15.8 21.0 14.4 24.2 12.0"/>
        <path d="M16 16 C18.4 16.0 21.2 16.0 25.8 16.0"/>
        <path d="M16 16 C18.4 16.2 21.0 17.6 24.2 20.0"/>
        <path d="M16 16 C18.2 16.8 20.4 19.0 23.0 22.8"/>
        <path d="M16 16 C17.4 17.6 18.8 20.0 20.0 24.0"/>
      </g>
      <path d="M15.5 16 L16.5 16" stroke="#FFFFFF" strokeWidth={sw} strokeLinecap="round"/>
    </svg>
  )
}

/* ── Lockup: inline mark + wordmark, fully theme-aware ─────────────────── */
export function LogoLockup({ className, style }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className ?? ''}`}
      style={{ color: 'var(--text-strong)', ...style }}
      aria-label="ZAWIOS"
    >
      <span style={{ width: 28, height: 28, display: 'inline-block', flexShrink: 0, color: 'inherit' }}>
        <LogoMark style={{ width: '100%', height: '100%' }} />
      </span>
      <span
        style={{
          fontFamily: 'var(--display-font)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: 'var(--text-strong)',
        }}
      >
        ZAWIOS
      </span>
    </span>
  )
}
