#!/usr/bin/env node
/**
 * ZAWIOS Vocabulary Guard
 * Fails if banned terms appear in public UI files.
 * 
 * Banned in user-facing text: prediction(s), predictor(s), bet(s), wager(s), gamble/gambling
 * Use instead: signal(s), analyst(s), vote
 * 
 * Skips: code variables, imports, types, comments, internal routes (api/, admin/, dashboard/predictions/)
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()

// Banned patterns (word-boundary, case-insensitive)
const BANNED = [
  /\bpredictions?\b/i,
  /\bpredictors?\b/i,
  /\bbets?\b/i,
  /\bwagers?\b/i,
  /\bgambl(?:e|ing)\b/i,
]

// Directories to scan (public UI)
const SCAN_DIRS = [
  'app/about',
  'app/business',
  'app/contact',
  'app/creator',
  'app/faq',
  'app/premium',
  'app/pricing',
  'app/pro',
  'app/terms',
  'app/privacy',
  'app/methodology',
  'app/signals',
  'components/layout',
  'components/landing',
  'components/home',
  'components/signals',
  'components/comments',
]

// Skip these path segments (internal code, legacy routes kept deliberately)
const SKIP_SEGMENTS = [
  'app/api/',
  'app/admin/',
  'app/dashboard/',
  'app/predictions/',        // legacy route — kept but not linked
  'components/predictions/',  // legacy component dir
  'node_modules/',
]

// Lines to skip (code, not UI text)
function isCodeLine(line) {
  const t = line.trim()
  return (
    t.startsWith('import ') ||
    t.startsWith('export ') ||
    t.startsWith('//') ||
    t.startsWith('*') ||
    t.startsWith('/*') ||
    // React component names, variable names
    /\b(PredictionCard|mockPredictions|prediction_count|predictionId|allPredictions|prediction\.(id|title|status|category|description))\b/.test(t) ||
    // Type annotations / interfaces
    /:\s*(Prediction|PredictionType)/.test(t) ||
    // Variable declarations referencing code
    /const\s+(prediction|predictions)\s*=/.test(t)
  )
}

function walk(dir) {
  const files = []
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) {
        files.push(...walk(full))
      } else if (/\.(tsx?|jsx?|html)$/.test(entry.name)) {
        files.push(full)
      }
    }
  } catch { /* dir doesn't exist */ }
  return files
}

let violations = 0
const report = []

for (const scanDir of SCAN_DIRS) {
  const absDir = join(ROOT, scanDir)
  for (const file of walk(absDir)) {
    const rel = relative(ROOT, file)
    if (SKIP_SEGMENTS.some(s => rel.includes(s))) continue

    const lines = readFileSync(file, 'utf-8').split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (isCodeLine(line)) continue

      for (const pat of BANNED) {
        const match = line.match(pat)
        if (match) {
          violations++
          report.push(`  ${rel}:${i + 1} → "${match[0]}"`)
        }
      }
    }
  }
}

if (violations > 0) {
  console.error(`\n❌ VOCABULARY GUARD: ${violations} banned term(s) found in public UI:\n`)
  report.forEach(r => console.error(r))
  console.error(`\nBanned: prediction(s), predictor(s), bet(s), wager(s), gamble/gambling`)
  console.error(`Use instead: signal(s), analyst(s), vote\n`)
  process.exit(1)
} else {
  console.log('✅ Vocabulary guard: no banned terms in public UI.')
}
