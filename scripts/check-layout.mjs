#!/usr/bin/env node
/**
 * ZAWIOS — Layout safety check (anti-overflow + touch targets)
 *
 * Run: node scripts/check-layout.mjs
 * CI:  npm run layout:check
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'

const COMPONENT_DIRS = ['components', 'app']
const EXTENSIONS = new Set(['.tsx', '.jsx', '.ts', '.css'])

const FATAL_PATTERNS = [
  { pattern: /\b100vw\b/, reason: '100vw causes overflow when scrollbar is present' },
  { pattern: /\bw-screen\b/, reason: 'w-screen (100vw) causes overflow on mobile' },
  { pattern: /\bmin-w-screen\b/, reason: 'min-w-screen forces full viewport width' },
]

const CSS_FATAL_PATTERNS = [
  { pattern: /overflow-x\s*:\s*visible/, reason: 'overflow-x: visible can cause horizontal scroll' },
]

const WARN_PATTERNS = [
  { pattern: /overflow-x\s*:\s*hidden/, reason: 'overflow-x: hidden may clip content (prefer root-only clip)' },
  {
    pattern: /(?:py-0\.5|py-1\b|h-4\b|h-5\b|h-6\b)[^{]*(?:button|Button|btn|link)/i,
    reason: 'possible touch target < 44px; ensure min-height: 44px on interactive elements',
  },
]

let errors = 0
let warnings = 0

function report(level, filePath, lineNumber, reason, line) {
  const prefix = level === 'error' ? '✗' : '⚠'
  const out = level === 'error' ? console.error : console.warn
  out(`  ${prefix} ${filePath}:${lineNumber} — ${reason}`)
  out(`    ${line.trim()}`)
}

function scanFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const isCss = filePath.endsWith('.css')
  const fatalPatterns = isCss ? [...FATAL_PATTERNS, ...CSS_FATAL_PATTERNS] : FATAL_PATTERNS

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) continue
    if (trimmed.includes('sizes=') || trimmed.includes('sizes:')) continue

    for (const { pattern, reason } of fatalPatterns) {
      if (pattern.test(line)) {
        report('error', filePath, i + 1, reason, line)
        errors++
      }
    }

    for (const { pattern, reason } of WARN_PATTERNS) {
      if (pattern.test(line)) {
        report('warn', filePath, i + 1, reason, line)
        warnings++
      }
    }
  }
}

function scanDir(dir) {
  try {
    for (const entry of readdirSync(dir)) {
      if (entry.startsWith('.') || entry === 'node_modules' || entry === '.next') continue
      const fullPath = join(dir, entry)
      const stat = statSync(fullPath)
      if (stat.isDirectory()) {
        scanDir(fullPath)
      } else if (EXTENSIONS.has(extname(entry))) {
        scanFile(fullPath)
      }
    }
  } catch {
    // Directory doesn't exist, skip
  }
}

console.log('ZAWIOS Layout Safety Check')
console.log('══════════════════════════')

for (const dir of COMPONENT_DIRS) {
  scanDir(dir)
}

if (errors > 0) {
  console.error(`\n✗ ${errors} fatal layout violation(s) found (${warnings} warning(s)).`)
  process.exit(1)
}

console.log(`✓ No fatal layout violations found (${warnings} warning(s)).`)
process.exit(0)
