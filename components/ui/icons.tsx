// ZAWIOS Production Icon System
// Monoline 0.75pt weight · 24px bounding box · Pure Vector
// Optimized for Dark Mode UI · Zero emojis

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

// ═══ ZAWIOS PRODUCTION ICONS ═══

/** Vote — ballot box with hand */
export function IconVote(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
      <path d="M12 15v3" />
      <path d="M9 11l3-5 3 5" />
    </svg>
  )
}

/** Signal — the ZAWIOS butterfly convergence mark */
export function IconSignal(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M2 6c4 3 6 5.5 10 6" />
      <path d="M2 18c4-3 6-5.5 10-6" />
      <path d="M22 6c-4 3-6 5.5-10 6" />
      <path d="M22 18c-4-3-6-5.5-10-6" />
      <path d="M2 12c4 1 6 0 10 0" />
      <path d="M22 12c-4 1-6 0-10 0" />
    </svg>
  )
}

/** Score — gauge with value */
export function IconScore(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

/** Reputation — shield with upward arrow */
export function IconReputation(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v6" />
      <path d="M9 11l3-3 3 3" />
    </svg>
  )
}

/** Trend — rising line chart */
export function IconTrend(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

/** Comparison — balance scale */
export function IconComparison(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 3v18" />
      <path d="M5 7l7-4 7 4" />
      <path d="M2 17l3-10 3 10" />
      <path d="M16 17l3-10 3 10" />
      <path d="M2 17h6" />
      <path d="M16 17h6" />
    </svg>
  )
}

/** Share — document with arrow */
export function IconShare(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  )
}

/** Profile — person silhouette */
export function IconProfile(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

/** Create — circle with plus */
export function IconCreate(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

/** Leaderboard — trophy on podium */
export function IconLeaderboard(props: IconProps) {
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

/** Notification — bell */
export function IconNotification(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  )
}

/** Search — magnifying glass */
export function IconSearch(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

/** Category — grid of squares */
export function IconCategory(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

/** Region — globe with pin */
export function IconRegion(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 000 20M12 2a14.5 14.5 0 010 20" />
      <path d="M2 12h20" />
    </svg>
  )
}

// ═══ NAVIGATION ICONS (mobile bottom nav) ═══

/** Home — house outline */
export function IconHome(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

/** Activity — pulse line */
export function IconActivity(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

// ═══ LEGACY COMPATIBLE EXPORTS ═══

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

export const IconTrophy = IconLeaderboard

export const IconGlobe = IconRegion

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

export const IconUsers = IconProfile

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

export const IconTrending = IconTrend

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

export const IconAward = IconMedal

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

export function IconX(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
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

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function IconEdit(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  )
}

export function IconCheckCircle(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

// ═══ ZAWIOS BRAND MARK & LOGO ═══

/**
 * IconMark — ZAWIOS butterfly mark (no background).
 * Symmetrical monoline construction. Both sides white on dark.
 * Subtle teal glow at convergence center.
 */
export function IconMark({
  className,
  width = 56,
  leftColor = '#EBEBEB',
  rightColor = '#EBEBEB',
  centerGlow = true,
  style,
}: {
  className?: string
  width?: number
  leftColor?: string
  rightColor?: string
  centerGlow?: boolean
  style?: React.CSSProperties
}) {
  const n = 13
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
      {/* Center glow */}
      {centerGlow && (
        <circle cx="28" cy="17" r="3" fill="#17D5CF" opacity="0.25" />
      )}
      {ys.map((y, i) => (
        <line key={`L${i}`} x1={28} y1={17} x2={0} y2={y} stroke={leftColor} strokeWidth="0.7" strokeLinecap="round" opacity={0.6 + 0.4 * (1 - Math.abs(i - (n - 1) / 2) / ((n - 1) / 2))} />
      ))}
      {ys.map((y, i) => (
        <line key={`R${i}`} x1={28} y1={17} x2={56} y2={y} stroke={rightColor} strokeWidth="0.7" strokeLinecap="round" opacity={0.6 + 0.4 * (1 - Math.abs(i - (n - 1) / 2) / ((n - 1) / 2))} />
      ))}
    </svg>
  )
}

/**
 * IconLogo — square app icon: dark background + butterfly mark.
 * Follows brand spec: rounded corners 22%, monoline mark, teal center glow.
 */
export function IconLogo({ className, size = 32, style }: IconProps) {
  const n = 13
  const pad = size * 0.2
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
      <rect width={size} height={size} rx={size * 0.22} fill="#0C0D10" />
      {/* Center glow */}
      <circle cx={cx} cy={cy} r={size * 0.06} fill="#17D5CF" opacity="0.3" />
      {ys.map((y, i) => {
        const alpha = 0.5 + 0.5 * (1 - Math.abs(i - (n - 1) / 2) / ((n - 1) / 2))
        return (
          <line key={`L${i}`} x1={cx} y1={cy} x2={xL} y2={y} stroke="#EBEBEB" strokeWidth={size * 0.022} strokeLinecap="round" opacity={alpha} />
        )
      })}
      {ys.map((y, i) => {
        const alpha = 0.5 + 0.5 * (1 - Math.abs(i - (n - 1) / 2) / ((n - 1) / 2))
        return (
          <line key={`R${i}`} x1={cx} y1={cy} x2={xR} y2={y} stroke="#EBEBEB" strokeWidth={size * 0.022} strokeLinecap="round" opacity={alpha} />
        )
      })}
    </svg>
  )
}
