import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconArrows } from '@/components/ui/icons'
import { worldViewSignals } from '@/lib/mock-data'
import { PredictionImage } from '@/components/ui/prediction-image'

const REGIONS = [
  { key: 'Africa',  label: 'Afrique',    color: '#f0c050' },
  { key: 'Europe',  label: 'Europe',     color: '#9d92f8' },
  { key: 'USA',     label: 'États-Unis', color: '#60a8f0' },
  { key: 'France',  label: 'France',     color: '#7c6ef0' },
  { key: 'Global',  label: 'Mondial',    color: '#34d0b6' },
]

export function WorldViewPreview() {
  const preview = worldViewSignals.filter((s) => s.featured && s.status !== 'resolved').slice(0, 4)

  // Compute average yes_percent per region across all wv signals
  const regionAverages = REGIONS.map((r) => {
    const items = worldViewSignals
      .flatMap((s) => s.regional_data ?? [])
      .filter((rd) => rd.region === r.key)
    const avg = items.length ? Math.round(items.reduce((sum, rd) => sum + rd.yes_percent, 0) / items.length) : 0
    return { ...r, avg }
  }).sort((a, b) => b.avg - a.avg)

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: intro */}
          <div>
            <p className="section-label">World View</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-1 mb-5" style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}>
              100 questions.<br />5 régions.<br />1 signal.
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text2)' }}>
              Le module World View compare les intuitions de communautés à travers le monde — Afrique, France, Europe, États-Unis, Global. Où pense-t-on OUI ? Où pense-t-on NON ?
            </p>

            {/* Region consensus bars */}
            <div className="space-y-3 mb-8">
              {regionAverages.map((r, i) => (
                <div key={r.key}>
                  <div className="flex justify-between text-xs mb-1" style={{ fontFamily: 'var(--mono)' }}>
                    <span style={{ color: i === 0 ? 'var(--text)' : 'var(--text3)' }}>{r.label}</span>
                    <span style={{ color: i === 0 ? r.color : 'var(--text3)' }}>{r.avg}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--surface2)' }}>
                    <div
                      className="h-full rounded-full bar-settle"
                      style={{ width: `${r.avg}%`, background: i === 0 ? r.color : 'rgba(255,255,255,0.08)' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link href="/predictions">
              <Button size="sm" className="gap-1.5">
                Explorer World View <IconArrows size={14} />
              </Button>
            </Link>
          </div>

          {/* Right: signal cards preview */}
          <div className="space-y-3">
            {preview.map((signal) => (
              <Link key={signal.id} href={`/predictions/${signal.id}`} className="block group">
                <div
                  className="rounded-xl overflow-hidden card-hover"
                  style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
                >
                  <div style={{ height: 56, overflow: 'hidden' }}>
                    <PredictionImage predictionId={signal.id} title={signal.title} category={signal.category} height={56} />
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between gap-3">
                    <p className="text-xs font-medium line-clamp-1" style={{ color: 'var(--text)' }}>
                      {signal.title}
                    </p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-xs font-bold" style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}>
                        {signal.options?.[0]?.percentage}%
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>OUI</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
