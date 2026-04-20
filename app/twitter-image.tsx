import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ZAWIOS — Intelligence Collective'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function TwitterImage() {
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
        {/* Ambient glow — royal blue */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 650,
            height: 650,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(28,57,187,0.18) 0%, rgba(107,142,248,0.05) 40%, transparent 70%)',
          }}
        />

        {/* Logo mark v2 */}
        <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <circle cx="32" cy="32" r="5" fill="#1C39BB" opacity="0.2" />
          <circle cx="32" cy="32" r="1.8" fill="#FFFFFF" />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
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
            marginTop: 16,
            fontSize: 21,
            fontWeight: 400,
            color: '#B8BAD0',
            letterSpacing: '-0.005em',
          }}
        >
          Vote sur les signaux du monde. 94 pays connectés.
        </div>

        {/* Accent line */}
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
      </div>
    ),
    { ...size },
  )
}
