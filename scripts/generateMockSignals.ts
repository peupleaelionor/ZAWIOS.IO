/**
 * ZAWIOS — Mock Signal Generator
 * Usage: npx ts-node scripts/generateMockSignals.ts
 *
 * Generates N signals with realistic vote distributions
 * and regional divergence. Output: JSON to stdout.
 */

const CATEGORIES = ['news', 'tech', 'business', 'crypto', 'sports', 'culture', 'society', 'entertainment', 'trends', 'fun', 'worldview'] as const
const REGIONS = ['global', 'africa', 'france', 'europe', 'usa', 'rdc', 'belgique'] as const
const STATUSES = ['active', 'resolved'] as const

interface GeneratedSignal {
  id: string
  title: string
  category: string
  region: string
  status: string
  yesPercent: number
  noPercent: number
  neutralPercent: number
  totalVotes: number
  trending: boolean
  hot: boolean
  timeAgo: string
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateVoteDistribution(): { yes: number; no: number; neutral: number } {
  const neutral = randomInt(4, 18)
  const remaining = 100 - neutral
  const yes = randomInt(Math.floor(remaining * 0.2), Math.floor(remaining * 0.8))
  const no = remaining - yes
  return { yes, no, neutral }
}

function generateRegionalBreakdown(): Record<string, number> {
  const base = randomInt(35, 75)
  return {
    global: base,
    africa: Math.min(95, Math.max(5, base + randomInt(-20, 20))),
    france: Math.min(95, Math.max(5, base + randomInt(-15, 15))),
    europe: Math.min(95, Math.max(5, base + randomInt(-18, 18))),
    usa:    Math.min(95, Math.max(5, base + randomInt(-25, 25))),
  }
}

function generate(count: number): GeneratedSignal[] {
  const signals: GeneratedSignal[] = []

  for (let i = 0; i < count; i++) {
    const { yes, no, neutral } = generateVoteDistribution()
    const totalVotes = randomInt(1000, 100000)
    const isActive = Math.random() > 0.2

    signals.push({
      id: `gen_${i.toString().padStart(4, '0')}`,
      title: `Signal généré #${i + 1} — catégorie ${pick(CATEGORIES)}`,
      category: pick(CATEGORIES),
      region: pick(REGIONS),
      status: isActive ? 'active' : 'resolved',
      yesPercent: yes,
      noPercent: no,
      neutralPercent: neutral,
      totalVotes,
      trending: Math.random() > 0.7,
      hot: totalVotes > 50000,
      timeAgo: `il y a ${randomInt(1, 72)}h`,
    })
  }

  return signals
}

// CLI entrypoint
const count = parseInt(process.argv[2] ?? '100', 10)
const signals = generate(count)
process.stdout.write(JSON.stringify(signals, null, 2))
process.stderr.write(`\n[generator] Generated ${signals.length} signals\n`)
