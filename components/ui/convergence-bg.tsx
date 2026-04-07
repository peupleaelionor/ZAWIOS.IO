/**
 * ConvergenceBg — SVG-based ZAWIOS brand background pattern.
 * Fine lines converging at center, matching the official background system.
 * Lightweight, no images needed.
 */
export function ConvergenceBg({ className, opacity = 0.04 }: { className?: string; opacity?: number }) {
  const n = 24
  const w = 800
  const h = 600
  const cx = w / 2
  const cy = h / 2

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{ opacity }}
      >
        {/* Left convergence */}
        {Array.from({ length: n }, (_, i) => {
          const y = (i / (n - 1)) * h
          const alpha = 0.3 + 0.7 * (1 - Math.abs(i - (n - 1) / 2) / ((n - 1) / 2))
          return (
            <line
              key={`L${i}`}
              x1={cx}
              y1={cy}
              x2={0}
              y2={y}
              stroke="#EBEBEB"
              strokeWidth="0.5"
              opacity={alpha}
            />
          )
        })}
        {/* Right convergence */}
        {Array.from({ length: n }, (_, i) => {
          const y = (i / (n - 1)) * h
          const alpha = 0.3 + 0.7 * (1 - Math.abs(i - (n - 1) / 2) / ((n - 1) / 2))
          return (
            <line
              key={`R${i}`}
              x1={cx}
              y1={cy}
              x2={w}
              y2={y}
              stroke="#EBEBEB"
              strokeWidth="0.5"
              opacity={alpha}
            />
          )
        })}
        {/* Center glow */}
        <circle cx={cx} cy={cy} r="20" fill="#17D5CF" opacity="0.15" />
        <circle cx={cx} cy={cy} r="4" fill="#EBEBEB" opacity="0.3" />
      </svg>
    </div>
  )
}
