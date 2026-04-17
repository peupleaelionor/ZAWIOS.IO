/**
 * ZAWIOS — Signal Analytics Tests
 * Run with: npx vitest or npx jest
 */

import {
  polarizationIndex,
  decisivenessRate,
  regionalDivergenceScore,
  regionalDivergenceDetail,
  consensusScore,
  precisionRate,
  signalReputationWeight,
} from '../lib/signal-analytics'

// ── Polarization Index ─────────────────────────────────────────────────────

describe('polarizationIndex', () => {
  test('fully polarized signal (0% neutral) returns 1.0', () => {
    const dist = { yes: 60, no: 40, neutral: 0, total: 10000 }
    expect(polarizationIndex(dist)).toBe(1.0)
  })

  test('all neutral returns 0', () => {
    const dist = { yes: 0, no: 0, neutral: 100, total: 10000 }
    expect(polarizationIndex(dist)).toBe(0)
  })

  test('9% neutral gives ~0.91', () => {
    const dist = { yes: 55, no: 36, neutral: 9, total: 10000 }
    expect(polarizationIndex(dist)).toBeCloseTo(0.91, 1)
  })

  test('returns 0 for empty signal', () => {
    const dist = { yes: 0, no: 0, neutral: 0, total: 0 }
    expect(polarizationIndex(dist)).toBe(0)
  })
})

// ── Decisiveness Rate ──────────────────────────────────────────────────────

describe('decisivenessRate', () => {
  test('100% committed votes returns 1', () => {
    expect(decisivenessRate(100, 100)).toBe(1)
  })

  test('0 committed votes returns 0', () => {
    expect(decisivenessRate(0, 50)).toBe(0)
  })

  test('50/80 committed returns 0.625', () => {
    expect(decisivenessRate(50, 80)).toBeCloseTo(0.625, 3)
  })

  test('handles zero total votes', () => {
    expect(decisivenessRate(0, 0)).toBe(0)
  })
})

// ── Regional Divergence Score ──────────────────────────────────────────────

describe('regionalDivergenceScore', () => {
  test('identical regions return 0', () => {
    expect(regionalDivergenceScore({ africa: 60, europe: 60, usa: 60 })).toBe(0)
  })

  test('returns max-min spread', () => {
    expect(regionalDivergenceScore({ africa: 80, europe: 45, usa: 60 })).toBe(35)
  })

  test('single region returns 0', () => {
    expect(regionalDivergenceScore({ africa: 60 })).toBe(0)
  })
})

describe('regionalDivergenceDetail', () => {
  test('correctly identifies most and least YES regions', () => {
    const result = regionalDivergenceDetail({ africa: 80, europe: 45, usa: 60 })
    expect(result.mostYes).toBe('africa')
    expect(result.leastYes).toBe('europe')
    expect(result.score).toBe(35)
  })
})

// ── Consensus Score ────────────────────────────────────────────────────────

describe('consensusScore', () => {
  test('50/50 split returns 0 (no consensus)', () => {
    expect(consensusScore(50)).toBe(0)
  })

  test('90% YES returns 0.8 (high consensus)', () => {
    expect(consensusScore(90)).toBeCloseTo(0.8, 3)
  })

  test('100% YES returns 1 (total consensus)', () => {
    expect(consensusScore(100)).toBe(1)
  })
})

// ── Precision Rate ─────────────────────────────────────────────────────────

describe('precisionRate', () => {
  test('7/10 correct returns 0.7', () => {
    expect(precisionRate(7, 10)).toBeCloseTo(0.7, 3)
  })

  test('0 committed returns 0', () => {
    expect(precisionRate(0, 0)).toBe(0)
  })

  test('clamps to 1 max', () => {
    expect(precisionRate(15, 10)).toBe(1)
  })
})

// ── Signal Reputation Weight ───────────────────────────────────────────────

describe('signalReputationWeight', () => {
  test('<1000 votes returns 0.5', () => {
    expect(signalReputationWeight(500)).toBe(0.5)
  })

  test('10000 votes returns 1.0', () => {
    expect(signalReputationWeight(10000)).toBe(1.0)
  })

  test('>50000 votes returns 2.0', () => {
    expect(signalReputationWeight(100000)).toBe(2.0)
  })
})
