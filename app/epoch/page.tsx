import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { createAdminClient } from '@/lib/supabase/admin'

export const metadata: Metadata = {
  title: 'Signal d\'époque — ZAWIOS',
  description: 'Série de 60 signaux thématiques : un signal par jour, une lecture du monde.',
}

export const revalidate = 3600

async function getEpochSeries() {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('epoch_series')
      .select('id, name, day_index, published_at, signals(id, title_fr, title_en, category, yes_percent, no_percent, vote_count)')
      .not('published_at', 'is', null)
      .lte('published_at', new Date().toISOString().slice(0, 10))
      .order('day_index', { ascending: true })
      .limit(60)
    return data ?? []
  } catch {
    return []
  }
}

export default async function EpochPage() {
  const series = await getEpochSeries()

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navbar />

      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 20px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--primary)',
              background: 'var(--primary-soft)',
              padding: '4px 10px',
              borderRadius: '100px',
              marginBottom: '16px',
            }}
          >
            Série 60 jours
          </span>

          <h1
            style={{
              fontFamily: 'var(--display-font)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: 'var(--text-strong)',
              marginBottom: '12px',
            }}
          >
            Signal d&apos;époque
          </h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: '560px' }}>
            Un signal par jour. Une lecture structurée du monde contemporain — sans bruit, sans raccourci.
          </p>
        </div>

        {/* Timeline */}
        {series.length === 0 ? (
          <div
            style={{
              padding: '48px 24px',
              textAlign: 'center',
              background: 'var(--surface)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              color: 'var(--text-subtle)',
            }}
          >
            <p style={{ fontFamily: 'var(--mono)', fontSize: '14px' }}>
              La série démarrera prochainement.
            </p>
          </div>
        ) : (
          <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {series.map((item: Record<string, unknown>, idx: number) => {
              const signal = item.signals as Record<string, unknown> | null
              const isToday = item.published_at === new Date().toISOString().slice(0, 10)

              return (
                <li
                  key={String(item.id)}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    padding: '16px',
                    background: isToday ? 'var(--primary-soft)' : 'var(--surface)',
                    borderRadius: 'var(--radius)',
                    border: `1px solid ${isToday ? 'var(--primary)' : 'var(--border)'}`,
                    boxShadow: isToday ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isToday ? 'var(--primary)' : 'var(--surface-alt)',
                      color: isToday ? '#fff' : 'var(--text-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--mono)',
                      fontWeight: 700,
                      fontSize: '12px',
                    }}
                  >
                    {idx + 1}
                  </span>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p
                      style={{
                        fontFamily: 'var(--display-font)',
                        fontWeight: 600,
                        fontSize: '15px',
                        color: 'var(--text-strong)',
                        lineHeight: 1.4,
                        marginBottom: '4px',
                      }}
                    >
                      {signal ? String(signal.title_fr ?? '') : String(item.name ?? '')}
                    </p>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-subtle)' }}>
                      Jour {Number(item.day_index)} · {String(item.published_at ?? '')}
                      {isToday && (
                        <span style={{ marginLeft: '8px', color: 'var(--primary)', fontWeight: 600 }}>
                          ← Aujourd&apos;hui
                        </span>
                      )}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        )}
      </main>

      <Footer />
    </div>
  )
}
