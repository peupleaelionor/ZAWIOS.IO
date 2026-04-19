/**
 * ZAWIOS — Layout safety check (anti-overflow, anti-100vw)
 *
 * Run: node scripts/check-layout.mjs
 * CI:  npm run layout:check
 *
 * Fails the build if any component uses patterns known to cause
 * horizontal overflow on mobile devices.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const COMPONENT_DIRS = ['components', 'app']
const EXTENSIONS = new Set(['.tsx', '.jsx', '.ts', '.css'])

// Patterns that cause horizontal overflow
const FORBIDDEN_PATTERNS = [
  { pattern: /\b100vw\b/, reason: '100vw causes overflow when scrollbar is present' },
  { pattern: /\bw-screen\b/, reason: 'w-screen (100vw) causes overflow on mobile' },
  { pattern: /\bmin-w-screen\b/, reason: 'min-w-screen forces full viewport width' },
]

// CSS-specific forbidden patterns
const CSS_FORBIDDEN = [
  { pattern: /overflow-x\s*:\s*visible/, reason: 'overflow-x: visible can cause horizontal scroll' },
]

let errors = 0

function scanFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const isCss = filePath.endsWith('.css')
  const patterns = isCss ? [...FORBIDDEN_PATTERNS, ...CSS_FORBIDDEN] : FORBIDDEN_PATTERNS

  for (const { pattern, reason } of patterns) {
    const lines = content.split('\n')
    for (let i = 0; i < lines.length; i++) {
      // Skip comments
      const line = lines[i].trim()
      if (line.startsWith('//') || line.startsWith('*') || line.startsWith('/*')) continue

      // Skip `sizes` attributes (responsive image hints, not layout)
      if (line.includes('sizes=') || line.includes('sizes:')) continue

      if (pattern.test(lines[i])) {
        console.error(`  ✗ ${filePath}:${i + 1} — ${reason}`)
        console.error(`    ${lines[i].trim()}`)
        errors++
      }
    }
  }
}

function scanDir(dir) {
  try {
    const entries = readdirSync(dir)
    for (const entry of entries) {
      if (entry.startsWith('.') || entry === 'node_modules') continue
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

// Also check globals.css
try {
  scanFile('app/globals.css')
} catch {
  // Skip if not found
}

if (errors > 0) {
  console.error(`\n✗ ${errors} layout violation(s) found. Fix before deploying.`)
  process.exit(1)
} else {
  console.log('✓ No layout violations found.')
  process.exit(0)
}
