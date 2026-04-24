export type BgIntensity = 'soft' | 'medium' | 'strong'
export type BgPreset = keyof typeof BACKGROUNDS

export interface BackgroundConfig {
  src: string
  opacity: Record<BgIntensity, number>
  blendMode: string
  backgroundSize: string
  backgroundPosition: string
  backgroundRepeat: string
  description: string
}

export const BACKGROUNDS = {
  /** Full-bleed hero wings — large bowtie with blue side glows */
  heroWings: {
    src: '/brand/backgrounds/mesh/bg-wings-hero.svg',
    opacity: { soft: 0.55, medium: 0.80, strong: 1.0 },
    blendMode: 'multiply',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    description: 'Hero backdrop: large ZAWIOS wings with blue side gradients',
  },

  /** Multi-cluster constellation network */
  constellation: {
    src: '/brand/backgrounds/mesh/bg-constellation.svg',
    opacity: { soft: 0.40, medium: 0.65, strong: 0.90 },
    blendMode: 'multiply',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    description: 'Network visualization: 5 node clusters with arcs — for sections',
  },

  /** Circular rose / spiral pattern — centered decoration */
  rose: {
    src: '/brand/backgrounds/patterns/bg-rose.svg',
    opacity: { soft: 0.35, medium: 0.55, strong: 0.80 },
    blendMode: 'multiply',
    backgroundSize: 'min(600px, 80vw)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    description: 'Rose spiral: centered circular pattern for section accents',
  },

  /** Diamond grid with convergence nodes — section tile */
  gridDiamond: {
    src: '/brand/backgrounds/patterns/bg-grid-diamond.svg',
    opacity: { soft: 0.45, medium: 0.70, strong: 0.95 },
    blendMode: 'multiply',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    description: 'Diamond grid: 5-node convergence on grid — for methodology/pillars',
  },

  /** Scattered ZAWIOS watermarks — subtle branding layer */
  scatter: {
    src: '/brand/backgrounds/patterns/bg-scatter.svg',
    opacity: { soft: 0.30, medium: 0.50, strong: 0.75 },
    blendMode: 'multiply',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    description: 'Scattered mini bowtie marks — footer / subtle branding',
  },

  /** Existing signal rays — hero right panel */
  signalRays: {
    src: '/brand/pattern-signal-rays.svg',
    opacity: { soft: 0.30, medium: 0.55, strong: 0.80 },
    blendMode: 'normal',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    description: 'Signal rays: 72 rays from center — hero/CTA accents',
  },
} as const satisfies Record<string, BackgroundConfig>

/** CSS radial mask presets for fading backgrounds toward edges */
export const BG_MASKS = {
  fadeCenter: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%)',
  fadeLeft:   'radial-gradient(ellipse 70% 90% at 0% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 75%)',
  fadeRight:  'radial-gradient(ellipse 70% 90% at 100% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 75%)',
  fadeTopRight: 'radial-gradient(ellipse 55% 65% at 100% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 80%)',
  fadeBottom: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 75%)',
  vignette:   'radial-gradient(ellipse 75% 80% at 50% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 100%)',
} as const
