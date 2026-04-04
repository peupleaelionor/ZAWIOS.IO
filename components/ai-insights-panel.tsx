import { cn } from '@/lib/utils'
import { IconZap, IconTrending, IconChart } from '@/components/ui/icons'
import { Badge } from '@/components/ui/badge'

interface Insight {
  category: string
  headline: string
  description: string
  confidence: number
  borderColor: string
  badgeVariant: 'default' | 'success' | 'warning' | 'outline'
}

const insights: Insight[] = [
  {
    category: 'Market',
    headline: 'Fed Rate Sentiment Shifting',
    description:
      'Crowd consensus shifted 12 points toward pause. Historical accuracy of similar shifts: 78%.',
    confidence: 78,
    borderColor: 'var(--accent)',
    badgeVariant: 'default',
  },
  {
    category: 'Technology',
    headline: 'AI Regulation Consensus Forming',
    description:
      '73% of predictors now expect major regulatory action in 2025. Confidence rising steadily.',
    confidence: 73,
    borderColor: 'var(--teal)',
    badgeVariant: 'success',
  },
  {
    category: 'Geopolitics',
    headline: 'Trade Tension Signal Detected',
    description:
      'Unusual prediction volume on trade-related topics. Signal strength: high.',
    confidence: 85,
    borderColor: 'var(--amber)',
    badgeVariant: 'warning',
  },
  {
    category: 'Finance',
    headline: 'Equity Market Divergence',
    description:
      'Crowd positioning shows rare disconnect between tech and energy sentiment.',
    confidence: 68,
    borderColor: 'var(--blue)',
    badgeVariant: 'outline',
  },
  {
    category: 'Science',
    headline: 'Climate Milestone Tracker',
    description:
      'Prediction accuracy on climate targets trending 8% above platform average.',
    confidence: 82,
    borderColor: 'var(--teal)',
    badgeVariant: 'success',
  },
]

interface AiInsightsPanelProps {
  className?: string
}

export function AiInsightsPanel({ className }: AiInsightsPanelProps) {
  return (
    <section className={cn('surface rounded-2xl p-6', className)}>
      <div className="flex items-center gap-2 mb-1">
        <IconZap size={16} style={{ color: 'var(--accent2)' }} />
        <h2
          className="text-sm font-semibold text-[var(--text)]"
          style={{ fontFamily: 'var(--font)' }}
        >
          AI Insights
        </h2>
      </div>

      <p
        className="text-[11px] text-[var(--text3)] mb-5"
        style={{ fontFamily: 'var(--mono)', letterSpacing: '0.03em' }}
      >
        Crowd signal analysis &middot; Updated 12 min ago
      </p>

      <div className="flex flex-col gap-3">
        {insights.map((insight) => (
          <div
            key={insight.headline}
            className="rounded-xl px-4 py-3.5 border border-[var(--border)] bg-[var(--surface2)] transition-colors duration-200 hover:border-[var(--border2)]"
            style={{ borderLeftWidth: 3, borderLeftColor: insight.borderColor }}
          >
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <Badge variant={insight.badgeVariant} className="badge-mono">
                {insight.category}
              </Badge>
              <ConfidenceIndicator value={insight.confidence} />
            </div>

            <h3 className="text-[13px] font-semibold text-[var(--text)] leading-snug mb-1">
              {insight.headline}
            </h3>
            <p className="text-xs text-[var(--text2)] leading-relaxed">
              {insight.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center gap-2 text-[var(--text3)]">
        <IconTrending size={13} />
        <span
          className="text-[10px]"
          style={{
            fontFamily: 'var(--mono)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          5 active signals
        </span>
        <span className="ml-auto">
          <IconChart size={13} />
        </span>
      </div>
    </section>
  )
}

function ConfidenceIndicator({ value }: { value: number }) {
  const color =
    value >= 80
      ? 'var(--teal)'
      : value >= 70
        ? 'var(--accent2)'
        : 'var(--text3)'

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-[3px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full"
            style={{
              height: 8 + i * 2,
              background:
                value >= 25 * (i + 1) ? color : 'var(--border2)',
            }}
          />
        ))}
      </div>
      <span
        className="text-[10px] font-semibold"
        style={{ fontFamily: 'var(--mono)', color }}
      >
        {value}%
      </span>
    </div>
  )
}
