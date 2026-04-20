/**
 * ZAWIOS — Data Integrity Check
 * Usage: npx ts-node scripts/checkDataIntegrity.ts
 *
 * Validates all mock signals:
 * - yes + no + neutral = 100
 * - required fields present
 * - valid category/region values
 */

import { mockSignals, SIGNAL_CATEGORIES, SIGNAL_REGIONS } from '../lib/signals-data'

const validCategories = new Set(SIGNAL_CATEGORIES.map((c) => c.id))
const validRegions    = new Set(SIGNAL_REGIONS.map((r) => r.id))

let errors = 0
let warnings = 0

for (const signal of mockSignals) {
  const prefix = `[${signal.id}]`

  // Check vote sum
  const total = (signal.yesPercent ?? 0) + (signal.noPercent ?? 0) + (signal.neutralPercent ?? 0)
  if (total !== 100) {
    console.error(`${prefix} Vote sum is ${total} (expected 100): yes=${signal.yesPercent} no=${signal.noPercent} neutral=${signal.neutralPercent}`)
    errors++
  }

  // Check category
  if (!validCategories.has(signal.category)) {
    console.error(`${prefix} Invalid category: "${signal.category}"`)
    errors++
  }

  // Check region
  if (!validRegions.has(signal.region)) {
    console.error(`${prefix} Invalid region: "${signal.region}"`)
    errors++
  }

  // Check required fields
  if (!signal.title || signal.title.trim() === '') {
    console.error(`${prefix} Missing title`)
    errors++
  }

  // Check totalVotes
  if (typeof signal.totalVotes !== 'number' || signal.totalVotes < 0) {
    console.error(`${prefix} Invalid totalVotes: ${signal.totalVotes}`)
    errors++
  }

  // Warn on high neutral
  if ((signal.neutralPercent ?? 0) > 25) {
    console.warn(`${prefix} High neutral rate: ${signal.neutralPercent}%`)
    warnings++
  }

  // Warn on very low vote count
  if (signal.totalVotes < 100) {
    console.warn(`${prefix} Low vote count: ${signal.totalVotes}`)
    warnings++
  }
}

console.log(`\n[check] ${mockSignals.length} signals checked`)
console.log(`[check] ${errors} errors, ${warnings} warnings`)

if (errors > 0) {
  process.exit(1)
} else {
  console.log('[check] All signals valid.')
}
