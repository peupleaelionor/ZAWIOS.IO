import Image from 'next/image'
import type { CSSProperties } from 'react'

interface LogoProps {
  className?: string
  style?: CSSProperties
}

// ── Mark 64×64 — canonical ZAWIOS mark (from zawios-mark.svg) ───────────────
export function LogoMark({ className, style }: LogoProps) {
  return (
    <Image
      src="/brand/logo/zawios-mark.svg"
      alt=""
      width={64}
      height={64}
      aria-hidden
      className={className}
      style={{ display: 'block', ...style }}
    />
  )
}

// ── Mark 32×32 simplifié — optimized for small sizes (from zawios-tiny.svg) ─
export function LogoTiny({ className, style }: LogoProps) {
  return (
    <Image
      src="/brand/logo/zawios-tiny.svg"
      alt=""
      width={32}
      height={32}
      aria-hidden
      className={className}
      style={{ display: 'block', ...style }}
    />
  )
}

// ── Mono mark — uses currentColor for dynamic theming ───────────────────────
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

// ── Lockup : mark + wordmark ────────────────────────────────────────────────
export function LogoLockup({ className, style }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-bold ${className ?? ''}`}
      style={style}
      aria-label="ZAWIOS"
    >
      <span style={{ width: 28, height: 28, display: 'inline-block', flexShrink: 0 }}>
        <LogoMark style={{ width: '100%', height: '100%' }} />
      </span>
      <span
        style={{
          fontFamily: 'var(--font)',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          lineHeight: 1,
          color: 'var(--text)',
        }}
      >
        ZAWIOS
      </span>
    </span>
  )
}
