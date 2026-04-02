// ZAWIOS SVG Icon System — Zero emojis, all custom inline SVG
// Consistent 24x24 viewBox, strokeWidth 1.5, currentColor

interface IconProps {
  className?: string
  size?: number
  style?: React.CSSProperties
}

function iconProps({ className, size = 24, style }: IconProps) {
  return {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    style,
  }
}

export function IconTarget(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

export function IconChart(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M3 20h18" />
      <path d="M7 20V10" />
      <path d="M12 20V4" />
      <path d="M17 20V14" />
    </svg>
  )
}

export function IconTrophy(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
      <path d="M4 22h16" />
      <path d="M10 22V18a2 2 0 012-2v0a2 2 0 012 2v4" />
      <path d="M18 2H6v7a6 6 0 0012 0V2z" />
    </svg>
  )
}

export function IconGlobe(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 000 20M12 2a14.5 14.5 0 010 20" />
      <path d="M2 12h20" />
    </svg>
  )
}

export function IconShield(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function IconEye(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

export function IconDatabase(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

export function IconZap(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconMedal(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

export function IconUpvote(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  )
}

export function IconComment(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
    </svg>
  )
}

export function IconTrending(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function IconArrows(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

export function IconLogo({ className, size = 32 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
      <path
        d="M8 22L12 10h2l4 8 4-8h2l4 12"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#7c6ef0" />
          <stop offset="1" stopColor="#34d0b6" />
        </linearGradient>
      </defs>
    </svg>
  )
}
