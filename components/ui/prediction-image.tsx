'use client'
/**
 * PredictionImage — AI-generated image via Pollinations.ai with SignalVisual fallback.
 * Images are seeded by predictionId so the same prediction always shows the same visual.
 * Fades in smoothly once loaded; falls back silently to SVG pattern on error.
 */
import { useState } from 'react'
import Image from 'next/image'
import { SignalVisual } from '@/components/ui/signal-visual'
import { getPredictionImageUrl, getHeroImageUrl } from '@/lib/image-generator'

interface PredictionImageProps {
  predictionId: string
  title: string
  category: string
  /** px height of the container */
  height?: number
  /** Add a bottom-to-top gradient overlay (for text readability) */
  gradient?: boolean
  /** Use larger hero-size image (1200×630) */
  hero?: boolean
  className?: string
}

export function PredictionImage({
  predictionId,
  title,
  category,
  height = 220,
  gradient = false,
  hero = false,
  className,
}: PredictionImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  const imageUrl = hero
    ? getHeroImageUrl(predictionId, title, category)
    : getPredictionImageUrl(predictionId, title, category)

  return (
    <div
      className={className}
      style={{ position: 'relative', height, overflow: 'hidden', background: 'var(--surface2)' }}
    >
      {/* Always-visible SVG fallback underneath */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <SignalVisual category={category} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* AI image — fades in once loaded */}
      {status !== 'error' && (
        <Image
          src={imageUrl}
          alt=""
          aria-hidden="true"
          fill
          unoptimized
          sizes={hero ? '(max-width: 768px) 100vw, 1200px' : '(max-width: 768px) 100vw, 800px'}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: status === 'loaded' ? 1 : 0,
            transition: 'opacity 500ms ease',
          }}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}

      {/* Gradient overlay for text legibility */}
      {gradient && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, var(--bg) 0%, rgba(5,5,8,0.75) 40%, rgba(5,5,8,0.2) 100%)',
          }}
        />
      )}
    </div>
  )
}
