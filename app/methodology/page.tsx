import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Methodology — ZAWIOS',
  description: 'Transparent methodology and ethical framework behind ZAWIOS signal processing.',
}

export default function MethodologyPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />

      <main className="container py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <p className="section-label">Transparency</p>
          <h1
            className="text-2xl md:text-4xl font-bold text-[var(--text)] mt-1 mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Methodology
          </h1>
          <p className="text-sm text-[var(--text2)] mb-10 leading-relaxed">
            ZAWIOS is built on transparency. This page documents how signals are
            processed, ranked, and displayed — and what safeguards exist.
          </p>

          {/* Signal Ranking */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-[var(--text)] mb-3">Signal Ranking</h2>
            <div
              className="rounded-xl p-5 space-y-3"
              style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
            >
              <p className="text-sm text-[var(--text2)] leading-relaxed">
                Signals are ranked based on three factors:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text2)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--teal)] font-bold mt-0.5">1.</span>
                  <span><strong className="text-[var(--text)]">Vote volume</strong> — Total number of votes received.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--teal)] font-bold mt-0.5">2.</span>
                  <span><strong className="text-[var(--text)]">Recency</strong> — More recent signals are prioritized in trending feeds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--teal)] font-bold mt-0.5">3.</span>
                  <span><strong className="text-[var(--text)]">Category balance</strong> — Internal balancing ensures no single category dominates.</span>
                </li>
              </ul>
              <p className="text-xs text-[var(--text3)] leading-relaxed pt-2" style={{ fontFamily: 'var(--mono)' }}>
                No ideological weight is applied. No political amplification. No editorial ranking bias.
              </p>
            </div>
          </section>

          {/* Regional Display */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-[var(--text)] mb-3">Regional Display</h2>
            <div
              className="rounded-xl p-5 space-y-3"
              style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
            >
              <p className="text-sm text-[var(--text2)] leading-relaxed">
                By default, users see their region first. However:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text2)]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] mt-2 shrink-0" />
                  <span>A visible <strong className="text-[var(--text)]">&ldquo;Voir Monde&rdquo;</strong> toggle is always accessible.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] mt-2 shrink-0" />
                  <span>A <strong className="text-[var(--text)]">&ldquo;Comparer régions&rdquo;</strong> toggle enables cross-regional comparison.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] mt-2 shrink-0" />
                  <span>No country is hidden. No silent filtering occurs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] mt-2 shrink-0" />
                  <span>All regions are visible and selectable at all times.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Internal Balancing */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-[var(--text)] mb-3">Internal Balancing Agents</h2>
            <div
              className="rounded-xl p-5 space-y-3"
              style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
            >
              <p className="text-sm text-[var(--text2)] leading-relaxed">
                ZAWIOS uses internal micro-agents to maintain feed quality. These are
                system-level processes, not visible bots. Their sole purpose is to optimize
                diversity and prevent over-polarization.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  { name: 'SignalBalancingAgent', desc: 'Ensures no single category exceeds 30% of the visible feed.' },
                  { name: 'TensionDetectionAgent', desc: 'Detects highly polarized signals and flags them for additional context. Never suppresses.' },
                  { name: 'RegionalHarmonizer', desc: 'Maintains regional diversity. User region is prioritized (max 40%) but other regions are always visible.' },
                  { name: 'LifeTopicExpander', desc: 'Ensures life-relevant topics (health, education, housing) are not drowned by news or crypto.' },
                ].map((agent) => (
                  <div
                    key={agent.name}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
                  >
                    <span
                      className="text-[10px] font-bold text-[var(--teal)] mt-0.5 shrink-0"
                      style={{ fontFamily: 'var(--mono)' }}
                    >
                      ▸
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">{agent.name}</p>
                      <p className="text-xs text-[var(--text3)] mt-0.5 leading-relaxed">{agent.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--text3)] leading-relaxed pt-2" style={{ fontFamily: 'var(--mono)' }}>
                All agents are pure functions. No side effects. No user tracking. No ideological filtering.
              </p>
            </div>
          </section>

          {/* Ethical Commitments */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-[var(--text)] mb-3">Ethical Commitments</h2>
            <div
              className="rounded-xl p-5"
              style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
            >
              <p className="text-sm font-semibold text-[var(--text)] mb-3">ZAWIOS will never:</p>
              <ul className="space-y-2 text-sm text-[var(--text2)]">
                {[
                  'Hide data from any country or region.',
                  'Create invisible echo chambers.',
                  'Manipulate signal ranking for ideological purposes.',
                  'Use aggressive political amplification.',
                  'Employ non-transparent algorithmic filtering.',
                  'Monetize through predatory or manipulative practices.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[var(--zred)] font-bold mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Known Biases */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-[var(--text)] mb-3">Known Biases</h2>
            <div
              className="rounded-xl p-5 space-y-3"
              style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
            >
              <p className="text-sm text-[var(--text2)] leading-relaxed">
                All systems carry inherent biases. We document ours:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text2)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--amber)] font-bold mt-0.5">⚠</span>
                  <span><strong className="text-[var(--text)]">User base bias</strong> — Early adoption is concentrated in francophone Africa and France.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--amber)] font-bold mt-0.5">⚠</span>
                  <span><strong className="text-[var(--text)]">Language bias</strong> — Signal content is primarily in French.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--amber)] font-bold mt-0.5">⚠</span>
                  <span><strong className="text-[var(--text)]">Recency bias</strong> — Trending algorithms inherently favor recent signals.</span>
                </li>
              </ul>
              <p className="text-xs text-[var(--text3)] leading-relaxed pt-2" style={{ fontFamily: 'var(--mono)' }}>
                This section is updated as new biases are identified. Transparency is ongoing.
              </p>
            </div>
          </section>

          {/* Contact */}
          <div
            className="rounded-xl p-5 text-center"
            style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
          >
            <p className="text-sm text-[var(--text2)]">
              Questions about our methodology?{' '}
              <a href="/contact" className="text-[var(--teal)] hover:underline font-medium">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
