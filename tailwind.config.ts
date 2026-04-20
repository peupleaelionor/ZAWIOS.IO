import type { Config } from 'tailwindcss'
import { COLORS, SHADOWS, RADIUS } from './lib/tokens'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Map tokens → Tailwind utilities */
        bg:       COLORS.bg,
        surface:  COLORS.surface,
        border:   COLORS.border,
        royal:    COLORS.royal,
        'royal-hover': COLORS.royalHover,
        'royal-soft':  COLORS.royalSoft,
        teal:     COLORS.teal,
        positive: COLORS.positive,
        negative: COLORS.negative,
        warn:     COLORS.warn,
        /* Text */
        'text-primary':   COLORS.text,
        'text-secondary': COLORS.text2,
        'text-muted':     COLORS.text3,
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
        sm: RADIUS.sm,
        md: RADIUS.md,
        lg: RADIUS.lg,
        xl: RADIUS.xl,
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
