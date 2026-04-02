'use client'

// ZAWIOS Visual Effects — GrainOverlay, GridBackground, Orb

export function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]">
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}

export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  )
}

interface OrbProps {
  color?: string
  size?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  className?: string
}

export function Orb({
  color = 'var(--accent)',
  size = 400,
  top,
  left,
  right,
  bottom,
  className,
}: OrbProps) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.12,
        top,
        left,
        right,
        bottom,
        animation: 'glow-pulse 6s ease-in-out infinite',
      }}
    />
  )
}
