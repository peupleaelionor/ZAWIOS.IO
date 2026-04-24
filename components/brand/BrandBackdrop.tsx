import type { CSSProperties, ReactNode } from 'react'
import { BACKGROUNDS, BG_MASKS, type BgIntensity, type BgPreset } from '@/lib/brand/backgrounds'

interface BrandBackdropProps {
  preset: BgPreset
  intensity?: BgIntensity
  /** Radial mask to fade edges — key from BG_MASKS or raw CSS value */
  mask?: keyof typeof BG_MASKS | string
  /** Extra opacity override (0–1) */
  opacity?: number
  className?: string
  children?: ReactNode
}

/**
 * Renders a brand background layer as an absolute inset overlay.
 * Wrap the parent section in `relative overflow-hidden` and place this first.
 *
 * @example
 * <section className="relative overflow-hidden">
 *   <BrandBackdrop preset="heroWings" intensity="medium" mask="vignette" />
 *   <div className="relative z-10">content</div>
 * </section>
 */
export function BrandBackdrop({
  preset,
  intensity = 'soft',
  mask,
  opacity,
  className,
}: BrandBackdropProps) {
  const cfg = BACKGROUNDS[preset]
  const resolvedOpacity = opacity ?? cfg.opacity[intensity]
  const maskValue = mask ? (BG_MASKS[mask as keyof typeof BG_MASKS] ?? mask) : undefined

  const style: CSSProperties = {
    backgroundImage: `url(${cfg.src})`,
    backgroundSize: cfg.backgroundSize,
    backgroundPosition: cfg.backgroundPosition,
    backgroundRepeat: cfg.backgroundRepeat,
    mixBlendMode: cfg.blendMode as CSSProperties['mixBlendMode'],
    opacity: resolvedOpacity,
    ...(maskValue ? { WebkitMaskImage: maskValue, maskImage: maskValue } : {}),
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
      style={style}
    />
  )
}
