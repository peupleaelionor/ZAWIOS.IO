import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ZAWIOS — Intelligence Collective'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#05050A',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow — royal blue radial */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(28,57,187,0.2) 0%, rgba(107,142,248,0.06) 40%, transparent 70%)',
          }}
        />

        {/* Globe grid (subtle background) */}
        <svg width="200" height="200" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', opacity: 0.04 }}>
          <ellipse cx="32" cy="32" rx="28" ry="28" stroke="#FFFFFF" strokeWidth="0.5" />
          <ellipse cx="32" cy="32" rx="14" ry="28" stroke="#FFFFFF" strokeWidth="0.4" />
          <path d="M4 32 Q32 22 60 32" stroke="#FFFFFF" strokeWidth="0.4" />
          <path d="M4 32 Q32 42 60 32" stroke="#FFFFFF" strokeWidth="0.4" />
        </svg>

        {/* Logo mark — v2 globe convergence */}
        <svg width="88" height="88" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left wing (white → silver) */}
          <g stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round">
            <path d="M32 32 C27.8 30.4 23.6 26.6 18.4 20.2" />
            <path d="M32 32 C27.2 31.0 22.4 28.4 16.0 24.0" />
            <path d="M32 32 C26.8 31.6 21.6 30.4 13.6 28.0" />
            <path d="M32 32 C26.8 32.0 21.2 32.0 12.8 32.0" />
            <path d="M32 32 C26.8 32.4 21.6 33.6 13.6 36.0" />
            <path d="M32 32 C27.2 33.0 22.4 35.6 16.0 40.0" />
            <path d="M32 32 C27.8 33.6 23.6 37.4 18.4 43.8" />
            <path d="M32 32 C29.4 34.6 27.0 38.4 24.8 44.8" />
          </g>
          {/* Right wing (Royal Blue) */}
          <g stroke="#6B8EF8" strokeWidth="1.8" strokeLinecap="round">
            <path d="M32 32 C36.2 30.4 40.4 26.6 45.6 20.2" />
            <path d="M32 32 C36.8 31.0 41.6 28.4 48.0 24.0" />
            <path d="M32 32 C37.2 31.6 42.4 30.4 50.4 28.0" />
            <path d="M32 32 C37.2 32.0 42.8 32.0 51.2 32.0" />
            <path d="M32 32 C37.2 32.4 42.4 33.6 50.4 36.0" />
            <path d="M32 32 C36.8 33.0 41.6 35.6 48.0 40.0" />
            <path d="M32 32 C36.2 33.6 40.4 37.4 45.6 43.8" />
            <path d="M32 32 C34.6 34.6 37.0 38.4 39.2 44.8" />
          </g>
          {/* Core */}
          <circle cx="32" cy="32" r="5" fill="#1C39BB" opacity="0.2" />
          <circle cx="32" cy="32" r="1.8" fill="#FFFFFF" />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            marginTop: 28,
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#F4F4FF',
            lineHeight: 1,
          }}
        >
          ZAWIOS
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 18,
            fontSize: 22,
            fontWeight: 400,
            color: '#B8BAD0',
            letterSpacing: '-0.005em',
            maxWidth: 640,
            textAlign: 'center',
          }}
        >
          Intelligence Collective · Vote · Réputation
        </div>

        {/* Accent line — gradient bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'linear-gradient(90deg, transparent 10%, #1C39BB 35%, #6B8EF8 50%, #1C39BB 65%, transparent 90%)',
          }}
        />

        {/* Corner globe indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 28,
            fontSize: 13,
            fontWeight: 500,
            color: '#7C7E96',
            letterSpacing: '0.04em',
          }}
        >
          94 PAYS · GLOBAL SIGNAL PLATFORM
        </div>
      </div>
    ),
    { ...size },
  )
}
