#!/usr/bin/env node
/**
 * check-layout.mjs — QA layout check
 *
 * Scans source files for common overflow and touch-target violations.
 * Exits 1 if any FATAL issue is found (blocks CI).
 * Exits 0 if clean.
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const ROOT = new URL('..', import.meta.url).pathname
const EXTS = ['.tsx', '.ts', '.css']

let errors = 0
let warnings = 0
const issues = []

function walk(dir) {
  let files = []
  try {
    for (const entry of readdirSync(dir)) {
      if (entry.startsWith('.') || entry === 'node_modules' || entry === '.next') continue
      const full = join(dir, entry)
      if (statSync(full).isDirectory()) {
        files = files.concat(walk(full))
      } else if (EXTS.includes(extname(full))) {
        files.push(full)
      }
    }
  } catch {}
  return files
}

const files = walk(ROOT)

const FATAL_PATTERNS = [
  {
    pattern: /width:\s*100vw/,
    msg: 'width:100vw causes horizontal overflow — use width:100% instead',
    fatal: true,
  },
  {
    pattern: /min-width:\s*100vw/,
    msg: 'min-width:100vw causes horizontal overflow',
    fatal: true,
  },
]

const WARN_PATTERNS = [
  {
    pattern: /overflow-x:\s*hidden/,
    msg: 'overflow-x:hidden on containers may clip content — prefer clip on root only',
    fatal: false,
  },
  {
    pattern: /w-screen/,
    msg: 'w-screen (100vw) may cause horizontal overflow',
    fatal: false,
  },
]

// Touch target check: buttons/links with py-0.5, py-1, h-4, h-5, h-6 without explicit min-h
const TOUCH_PATTERNS = [
  {
    pattern: /(?:py-0\.5|py-1\b|h-4\b|h-5\b|h-6\b)[^{]*(?:button|Button|btn|link)/i,
    msg: 'Possible touch target < 44px — ensure min-height:44px on interactive elements',
    fatal: false,
  },
]

for (const file of files) {
  const rel = file.replace(ROOT, '')
  // skip migrations, seed files, check-layout itself
  if (rel.includes('supabase/migrations') || rel.includes('incoming-assets') || rel.includes('check-layout')) continue

  let src
  try { src = readFileSync(file, 'utf-8') } catch { continue }

  const lines = src.split('\n')

  for (const { pattern, msg, fatal } of [...FATAL_PATTERNS, ...WARN_PATTERNS, ...TOUCH_PATTERNS]) {
    for (let i = 0; i < lines.length; i++) {
      if (pattern.test(lines[i])) {
        issues.push({ rel, line: i + 1, msg, fatal })
        if (fatal) errors++
        else warnings++
      }
    }
  }
}

// Report
if (issues.length === 0) {
  console.log('✅ check-layout: 0 issues found.')
} else {
  for (const { rel, line, msg, fatal } of issues) {
    const tag = fatal ? '❌ FATAL' : '⚠️  WARN'
    console.log(`${tag}  ${rel}:${line}  →  ${msg}`)
  }
  console.log(`\n${errors > 0 ? '❌' : '✅'} check-layout: ${errors} fatal, ${warnings} warnings`)
}

if (errors > 0) process.exit(1)
