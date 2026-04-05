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

export function IconPin(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

export function IconAward(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

export function IconLink(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  )
}

export function IconSettings(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  )
}

export function IconSignOut(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

/**
 * IconMark — the raw ZAWIOS butterfly mark (no background).
 * Two fans of lines converging at center: left = light, right = accent.
 * viewBox 56×34, aspect ratio preserved. Pass `width` to control size.
 */
export function IconMark({
  className,
  width = 56,
  leftColor = '#ffffff',
  rightColor = '#7c6ef0',
  style,
}: {
  className?: string
  width?: number
  leftColor?: string
  rightColor?: string
  style?: React.CSSProperties
}) {
  const n = 11
  const ys = Array.from({ length: n }, (_, i) => (i / (n - 1)) * 34)
  const h = (width * 34) / 56
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={h}
      viewBox="0 0 56 34"
      fill="none"
      className={className}
      style={style}
    >
      {ys.map((y, i) => (
        <line key={`L${i}`} x1={28} y1={17} x2={0} y2={y} stroke={leftColor} strokeWidth="0.9" strokeLinecap="round" />
      ))}
      {ys.map((y, i) => (
        <line key={`R${i}`} x1={28} y1={17} x2={56} y2={y} stroke={rightColor} strokeWidth="0.9" strokeLinecap="round" />
      ))}
    </svg>
  )
}

/**
 * IconLogo — square app icon: dark background + butterfly mark.
 * Used in navbar, footer, auth pages, and as the favicon placeholder.
 */
export function IconLogo({ className, size = 32, style }: IconProps) {
  const n = 11
  // y positions for mark endpoints, centered vertically in the icon with padding
  const pad = size * 0.23
  const ys = Array.from({ length: n }, (_, i) => pad + (i / (n - 1)) * (size - 2 * pad))
  const cx = size / 2
  const cy = size / 2
  const xL = size * 0.06
  const xR = size * 0.94
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
      style={style}
    >
      <rect width={size} height={size} rx={size * 0.22} fill="#08080f" />
      {ys.map((y, i) => (
        <line key={`L${i}`} x1={cx} y1={cy} x2={xL} y2={y} stroke="#ffffff" strokeWidth={size * 0.026} strokeLinecap="round" />
      ))}
      {ys.map((y, i) => (
        <line key={`R${i}`} x1={cx} y1={cy} x2={xR} y2={y} stroke="#7c6ef0" strokeWidth={size * 0.026} strokeLinecap="round" />
      ))}
    </svg>
  )
}
