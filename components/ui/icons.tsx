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

/**
 * IconMark — the raw ZAWIOS butterfly mark (no background).
 * Two fans of lines converging at center: left = light, right = accent.
 * viewBox 56×34, aspect ratio preserved. Pass `width` to control size.
 */
export function IconMark({
  className,
  width = 56,
  leftColor = '#F2F2F7', // Blanc légèrement grisé
  rightColor = '#4169E1', // Bleu Roi (Royal Blue)
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
 * IconLogo — carré app icon : fond sombre + mark ailes courbes.
 * Utilisé en navbar, footer, auth, favicon placeholder.
 */
export function IconLogo({ className, size = 32, style }: IconProps) {
  const sw = Math.max(1.2, 1.8 * Math.min(1, size / 32))
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      style={style}
    >
      <rect width="32" height="32" rx={Math.round(32 * 0.22)} fill="#08080F"/>
      {/* Aile gauche — blanc */}
      <g stroke="#FFFFFF" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16 C13.8 15.2 11.6 13.0 9.0 9.2"/>
        <path d="M16 16 C13.6 15.8 11.0 14.4 7.8 12.0"/>
        <path d="M16 16 C13.6 16.0 10.8 16.0 6.2 16.0"/>
        <path d="M16 16 C13.6 16.2 11.0 17.6 7.8 20.0"/>
        <path d="M16 16 C13.8 16.8 11.6 19.0 9.0 22.8"/>
        <path d="M16 16 C14.6 17.6 13.2 20.0 12.0 24.0"/>
      </g>
      {/* Aile droite — indigo */}
      <g stroke="#6B6EF8" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16 C18.2 15.2 20.4 13.0 23.0 9.2"/>
        <path d="M16 16 C18.4 15.8 21.0 14.4 24.2 12.0"/>
        <path d="M16 16 C18.4 16.0 21.2 16.0 25.8 16.0"/>
        <path d="M16 16 C18.4 16.2 21.0 17.6 24.2 20.0"/>
        <path d="M16 16 C18.2 16.8 20.4 19.0 23.0 22.8"/>
        <path d="M16 16 C17.4 17.6 18.8 20.0 20.0 24.0"/>
      </g>
      <path d="M15.5 16 L16.5 16" stroke="#FFFFFF" strokeWidth={sw} strokeLinecap="round"/>
    </svg>
  )
}

// ─── Production Icons ───

export function IconVote(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M7 11l5-5 5 5" />
      <path d="M12 6v13" />
    </svg>
  )
}

export function IconSignal(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 4v16" />
    </svg>
  )
}

export function IconScore(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export function IconReputation(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

export function IconComparison(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  )
}

export function IconShare(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98" />
      <path d="M15.41 6.51l-6.82 3.98" />
    </svg>
  )
}

export function IconProfile(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function IconCreate(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  )
}

export function IconLeaderboard(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M8 21V11" />
      <path d="M12 21V3" />
      <path d="M16 21v-6" />
      <path d="M4 21h16" />
    </svg>
  )
}

export function IconNotification(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  )
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

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

export function IconRegion(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 000 20M12 2a14.5 14.5 0 010 20" />
      <path d="M2 12h20" />
    </svg>
  )
}

export function IconHome(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
