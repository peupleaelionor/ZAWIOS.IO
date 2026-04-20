import type { Config } from 'tailwindcss'
import { tokens, SHADOWS } from './lib/tokens'

const c = tokens.colors
const r = tokens.radii

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:           c.background,
        surface:      c.surface,
        border:       c.border,
        royal:        c.primary,
        'royal-hover': c.primaryHover,
        'royal-soft':  c.primarySoft,
        positive:     c.positive,
        negative:     c.negative,
        warn:         c.warn,
        'text-primary':   c.textStrong,
        'text-secondary': c.textMuted,
        'text-muted':     c.textSubtle,
      },
      boxShadow: {
        xs:    SHADOWS.xs,
        sm:    SHADOWS.sm,
        md:    SHADOWS.md,
        lg:    SHADOWS.lg,
        xl:    SHADOWS.xl,
        royal: SHADOWS.royal,
      },
      borderRadius: {
        sm: r.sm,
        md: r.md,
        lg: r.lg,
        xl: '20px',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'Sora', 'system-ui', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', '"Fira Code"', 'monospace'],
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}

export default config
