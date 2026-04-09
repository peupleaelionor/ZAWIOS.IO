import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Avatar } from '@/components/ui/avatar'
import { SignalCard } from '@/components/signals/signal-card'
import { WorldViewComparison } from '@/components/signals/world-view-comparison'
import { ReputationBadge } from '@/components/viral-loop/reputation-badge'
import {
  mockLeaderboard,
  PLATFORM_STATS,
} from '@/lib/mock-data'
import {
  getTrendingSignals,
  getWorldViewSignals,
  REPUTATION_TIERS,
  CATEGORY_COLORS,
  SIGNAL_CATEGORIES,
  getReputationTier,
} from '@/lib/signals-data'
import { formatNumber } from '@/lib/utils'
import {
  IconMark,
  IconVote,
  IconSignal,
  IconScore,
  IconReputation,
  IconComparison,
  IconShare,
  IconProfile,
  IconCreate,
  IconLeaderboard,
  IconNotification,
  IconSearch,
  IconCategory,
  IconRegion,
  IconTrending,
  IconTrophy,
  IconChart,
  IconMedal,
} from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Système produit | ZAWIOS',
  description: 'Architecture complète du système de design ZAWIOS — composants, tokens, icônes.',
}

// ── Section label component ────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <p className="section-label">{label}</p>
  )
}

// ── Token preview ──────────────────────────────────────────────────────────
function TokenSwatch({ bg, label, mono }: { bg: string; label: string; mono?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="w-full h-10 rounded-lg" style={{ background: bg, border: '1px solid var(--border2)' }} />
      <p className="text-[11px] font-semibold text-[var(--text)]">{label}</p>
      {mono && (
        <p className="text-[10px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>{mono}</p>
      )}
    </div>
  )
}

// ── Icon grid item ─────────────────────────────────────────────────────────
function IconItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
      <div className="text-[var(--text2)]">{children}</div>
      <p className="text-[9px] text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>{label}</p>
    </div>
  )
}

export default function ProductSystemPage() {
  const trendingSignals = getTrendingSignals(2)
  const worldViewSignals = getWorldViewSignals(1)
  const sampleTier = getReputationTier(4200)
  const nextTier = REPUTATION_TIERS[REPUTATION_TIERS.findIndex(t => t.name === sampleTier.name) + 1]
  const tierProgress = nextTier ? ((4200 - sampleTier.minScore) / (nextTier.minScore - sampleTier.minScore)) * 100 : 100
  const rankColors = ['var(--amber)', 'var(--text3)', '#cd7f32']

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />

      <main>
        {/* ── HERO ── */}
        <section className="py-16 md:py-24" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <IconMark width={40} leftColor="rgba(255,255,255,0.8)" rightColor="#17d5cf" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                  Système Produit
                </p>
                <p className="text-xs text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>v2.0 · 2026</p>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--text)] mb-4" style={{ letterSpacing: '-0.03em' }}>
              Architecture<br />visuelle ZAWIOS
            </h1>
            <p className="text-base text-[var(--text2)] max-w-xl leading-relaxed">
              Tous les composants, tokens de design, icônes et patterns
              qui forment l&apos;intelligence collective de ZAWIOS.
            </p>
            <div className="flex items-center gap-4 mt-6 flex-wrap">
              {[
                { value: formatNumber(PLATFORM_STATS.total_users), label: 'Votants' },
                { value: formatNumber(PLATFORM_STATS.total_votes), label: 'Votes' },
                { value: `${PLATFORM_STATS.avg_accuracy}%`, label: 'Précision moy.' },
                { value: '94', label: 'Pays' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>{s.value}</p>
                  <p className="text-[10px] text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DESIGN TOKENS ── */}
        <section className="py-14" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div className="container">
            <SectionLabel label="Tokens de design" />
            <h2 className="text-2xl font-bold text-[var(--text)] mt-1 mb-8" style={{ letterSpacing: '-0.02em' }}>
              Palette & variables CSS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <TokenSwatch bg="var(--bg)" label="--bg" mono="#0C0D10" />
              <TokenSwatch bg="var(--surface)" label="--surface" mono="#13141a" />
              <TokenSwatch bg="var(--surface2)" label="--surface2" mono="#191a22" />
              <TokenSwatch bg="var(--teal)" label="--teal" mono="#17D5CF" />
              <TokenSwatch bg="var(--accent)" label="--accent" mono="#5A4BFF" />
              <TokenSwatch bg="var(--accent2)" label="--accent2" mono="#7b6fff" />
              <TokenSwatch bg="var(--zred)" label="--zred" mono="#f06070" />
              <TokenSwatch bg="var(--amber)" label="--amber" mono="#f0c050" />
              <TokenSwatch bg="var(--text)" label="--text" mono="#eaeaf0" />
              <TokenSwatch bg="var(--text2)" label="--text2" mono="#a0a0b8" />
              <TokenSwatch bg="var(--text3)" label="--text3" mono="#5c5c78" />
              <TokenSwatch bg="var(--border2)" label="--border2" mono="rgba(w,9%)" />
            </div>

            {/* Spacing rhythm */}
            <div className="mt-8">
              <p className="text-xs font-semibold text-[var(--text3)] uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--mono)' }}>
                Rythme d'espacement — base 8px
              </p>
              <div className="flex items-end gap-3 flex-wrap">
                {[4, 8, 12, 16, 20, 24, 32, 40, 48].map((size) => (
                  <div key={size} className="flex flex-col items-center gap-1">
                    <div style={{ width: size, height: size, background: 'var(--teal)', opacity: 0.3, borderRadius: 2 }} />
                    <p className="text-[9px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>{size}px</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Radius */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              {[4, 8, 12, 16, 24].map((r) => (
                <div key={r} className="flex flex-col items-center gap-1">
                  <div
                    style={{
                      width: 48, height: 48,
                      borderRadius: r,
                      background: 'var(--surface3)',
                      border: '1px solid var(--border2)',
                    }}
                  />
                  <p className="text-[9px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>{r}px</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ICON SYSTEM ── */}
        <section className="py-14" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <SectionLabel label="Système d'icônes" />
            <h2 className="text-2xl font-bold text-[var(--text)] mt-1 mb-8" style={{ letterSpacing: '-0.02em' }}>
              SVG monoligne · 24px grid
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              <IconItem label="Vote"><IconVote size={22} /></IconItem>
              <IconItem label="Signal"><IconSignal size={22} /></IconItem>
              <IconItem label="Score"><IconScore size={22} /></IconItem>
              <IconItem label="Réputation"><IconReputation size={22} /></IconItem>
              <IconItem label="Tendance"><IconChart size={22} /></IconItem>
              <IconItem label="Comparaison"><IconComparison size={22} /></IconItem>
              <IconItem label="Partage"><IconShare size={22} /></IconItem>
              <IconItem label="Profil"><IconProfile size={22} /></IconItem>
              <IconItem label="Créer"><IconCreate size={22} /></IconItem>
              <IconItem label="Classement"><IconLeaderboard size={22} /></IconItem>
              <IconItem label="Notif"><IconNotification size={22} /></IconItem>
              <IconItem label="Recherche"><IconSearch size={22} /></IconItem>
              <IconItem label="Catégorie"><IconCategory size={22} /></IconItem>
              <IconItem label="Région"><IconRegion size={22} /></IconItem>
              <IconItem label="Trending"><IconTrending size={22} /></IconItem>
              <IconItem label="Trophée"><IconTrophy size={22} /></IconItem>
              <IconItem label="Chart"><IconChart size={22} /></IconItem>
              <IconItem label="Médaille"><IconMedal size={22} /></IconItem>
            </div>
          </div>
        </section>

        {/* ── SIGNAL CARDS ── */}
        <section className="py-14" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div className="container">
            <SectionLabel label="Signal Cards" />
            <h2 className="text-2xl font-bold text-[var(--text)] mt-1 mb-8" style={{ letterSpacing: '-0.02em' }}>
              Vote interface
            </h2>
            <div className="grid gap-4 md:grid-cols-2 max-w-2xl">
              {trendingSignals.map((s) => (
                <SignalCard key={s.id} signal={s} />
              ))}
            </div>
          </div>
        </section>

        {/* ── WORLD VIEW ── */}
        <section className="py-14" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-2xl">
            <SectionLabel label="World View" />
            <h2 className="text-2xl font-bold text-[var(--text)] mt-1 mb-8" style={{ letterSpacing: '-0.02em' }}>
              Comparaison régionale
            </h2>
            {worldViewSignals[0]?.regionalBreakdown && (
              <div
                className="rounded-xl p-5"
                style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
              >
                <p className="text-sm font-semibold text-[var(--text)] mb-4">{worldViewSignals[0].title}</p>
                <WorldViewComparison breakdown={worldViewSignals[0].regionalBreakdown} />
              </div>
            )}
          </div>
        </section>

        {/* ── LEADERBOARD ── */}
        <section className="py-14" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div className="container max-w-2xl">
            <SectionLabel label="Classement" />
            <h2 className="text-2xl font-bold text-[var(--text)] mt-1 mb-2" style={{ letterSpacing: '-0.02em' }}>
              Classement mondial
            </h2>
            <p className="text-sm text-[var(--text2)] mb-6">Top analystes par précision</p>

            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border2)' }}>
              {/* Header */}
              <div
                className="grid grid-cols-12 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border2)', fontFamily: 'var(--mono)', color: 'var(--text3)' }}
              >
                <div className="col-span-1">#</div>
                <div className="col-span-6">Analyste</div>
                <div className="col-span-3 text-right">Score</div>
                <div className="col-span-2 text-right">Précis.</div>
              </div>

              {mockLeaderboard.slice(0, 7).map((entry, index) => (
                <div
                  key={entry.user.id}
                  className="grid grid-cols-12 items-center px-4 py-3 hover:bg-white/[0.02] transition-colors"
                  style={{
                    background: 'var(--surface)',
                    borderBottom: index < 6 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div className="col-span-1">
                    {index < 3 ? (
                      <IconMedal size={16} style={{ color: rankColors[index] }} />
                    ) : (
                      <span className="text-xs font-bold text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <div className="col-span-6 flex items-center gap-2">
                    <Avatar src={entry.user.avatar_url} name={entry.user.full_name} size="xs" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--text)] truncate">{entry.user.full_name}</p>
                      <p className="text-[10px] text-[var(--text3)] truncate" style={{ fontFamily: 'var(--mono)' }}>
                        {entry.user.location}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className="text-sm font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>
                      {formatNumber(entry.score)}
                    </span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span
                      className="text-sm font-semibold"
                      style={{
                        fontFamily: 'var(--mono)',
                        color: entry.accuracy_rate >= 70 ? 'var(--teal)' : entry.accuracy_rate >= 60 ? 'var(--amber)' : 'var(--text2)',
                      }}
                    >
                      {entry.accuracy_rate}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/leaderboard"
              className="flex items-center justify-center gap-1 mt-4 text-xs font-semibold hover:underline"
              style={{ fontFamily: 'var(--mono)', color: 'var(--teal)' }}
            >
              Voir le classement complet →
            </Link>
          </div>
        </section>

        {/* ── REPUTATION ── */}
        <section className="py-14" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-2xl">
            <SectionLabel label="Réputation" />
            <h2 className="text-2xl font-bold text-[var(--text)] mt-1 mb-8" style={{ letterSpacing: '-0.02em' }}>
              Système de niveaux
            </h2>

            {/* Tiers list */}
            <div className="space-y-2 mb-8">
              {REPUTATION_TIERS.slice().reverse().map((tier, i) => {
                const isActive = tier.name === sampleTier.name
                return (
                  <div
                    key={tier.name}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all"
                    style={{
                      background: isActive ? `color-mix(in srgb, ${tier.color} 8%, var(--surface))` : 'var(--surface)',
                      border: isActive ? `1px solid ${tier.color}30` : '1px solid var(--border)',
                    }}
                  >
                    <div
                      className="w-2 h-8 rounded-full shrink-0"
                      style={{ background: tier.color, opacity: isActive ? 1 : 0.3 }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className="text-sm font-bold"
                          style={{ color: isActive ? tier.color : 'var(--text2)' }}
                        >
                          {tier.nameFr}
                        </p>
                        {isActive && (
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                            style={{ background: `${tier.color}20`, color: tier.color, fontFamily: 'var(--mono)' }}
                          >
                            ACTUEL
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[var(--text3)] mt-0.5" style={{ fontFamily: 'var(--mono)' }}>
                        À partir de {formatNumber(tier.minScore)} pts
                      </p>
                    </div>
                    {isActive && nextTier && (
                      <div className="w-24">
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface3)' }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${tierProgress}%`, background: tier.color }}
                          />
                        </div>
                        <p className="text-[9px] text-[var(--text3)] mt-1 text-right" style={{ fontFamily: 'var(--mono)' }}>
                          {Math.round(tierProgress)}%
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Sample reputation badge */}
            <ReputationBadge score={4200} accuracy={67} totalVotes={89} streak={5} />
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="py-14" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div className="container">
            <SectionLabel label="Catégories" />
            <h2 className="text-2xl font-bold text-[var(--text)] mt-1 mb-8" style={{ letterSpacing: '-0.02em' }}>
              Palette catégories
            </h2>
            <div className="flex flex-wrap gap-2">
              {SIGNAL_CATEGORIES.map((cat) => {
                const c = CATEGORY_COLORS[cat.id]
                return (
                  <span
                    key={cat.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                    style={{ background: c.bg, color: c.text, border: `1px solid ${c.text}25`, fontFamily: 'var(--mono)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.text }} />
                    {cat.labelFr}
                  </span>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <section className="py-16">
          <div className="container max-w-xl text-center">
            <IconMark width={48} leftColor="rgba(255,255,255,0.8)" rightColor="#17d5cf" className="mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-3" style={{ letterSpacing: '-0.025em' }}>
              Prêt à voter ?
            </h2>
            <p className="text-sm text-[var(--text2)] mb-6">
              Rejoins 47K+ analystes qui décryptent l&apos;actualité mondiale.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all hover:brightness-110"
              style={{ background: 'var(--teal)', color: 'var(--bg)', fontFamily: 'var(--font)' }}
            >
              Commencer — c&apos;est gratuit
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
