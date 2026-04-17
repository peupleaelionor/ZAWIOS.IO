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
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(107,110,248,0.15) 0%, transparent 70%)',
          }}
        />

        <svg width="72" height="72" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 32 C27.8 30.6 23.6 26.8 18.8 20.6" />
            <path d="M32 32 C27.4 31.2 22.8 28.8 16.8 24.6" />
            <path d="M32 32 C27.2 32.0 22.0 32.0 13.0 32.0" />
            <path d="M32 32 C27.4 32.8 22.8 35.2 16.8 39.4" />
            <path d="M32 32 C27.8 33.4 23.6 37.2 18.8 43.4" />
            <path d="M32 32 C29.6 34.8 27.4 38.8 25.6 45.6" />
          </g>
          <g stroke="#6B6EF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 32 C36.2 30.6 40.4 26.8 45.2 20.6" />
            <path d="M32 32 C36.6 31.2 41.2 28.8 47.2 24.6" />
            <path d="M32 32 C36.8 32.0 42.0 32.0 51.0 32.0" />
            <path d="M32 32 C36.6 32.8 41.2 35.2 47.2 39.4" />
            <path d="M32 32 C36.2 33.4 40.4 37.2 45.2 43.4" />
            <path d="M32 32 C34.4 34.8 36.6 38.8 38.4 45.6" />
          </g>
          <path d="M31.2 32 L32.8 32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div
          style={{
            marginTop: 20,
            fontSize: 68,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#F4F4FF',
            lineHeight: 1,
          }}
        >
          ZAWIOS
        </div>

        <div
          style={{
            marginTop: 14,
            fontSize: 20,
            fontWeight: 400,
            color: '#B8BAD0',
            letterSpacing: '-0.005em',
          }}
        >
          Vote sur les signaux du monde.
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'linear-gradient(90deg, transparent, #6B6EF8 50%, transparent)',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
