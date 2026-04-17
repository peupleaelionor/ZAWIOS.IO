#!/usr/bin/env node
/**
 * check-404.mjs — fetch critical URL paths, fail if any 404
 * Usage: BASE_URL=https://zawios.netlify.app node scripts/check-404.mjs
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const CRITICAL_PATHS = [
  '/',
  '/signals',
  '/leaderboard',
  '/profil',
  '/brand-kit',
  '/manifest.webmanifest',
  '/favicons/logo-mark.svg',
  '/app-icons/icon-192.png',
  '/app-icons/icon-512.png',
]

let failed = 0

for (const path of CRITICAL_PATHS) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { method: 'HEAD' })
    const ok = res.status < 400
    console.log(`${ok ? '✓' : '✗'} ${res.status} ${path}`)
    if (!ok) failed++
  } catch (err) {
    console.log(`✗ ERR ${path} — ${err.message}`)
    failed++
  }
}

if (failed > 0) {
  console.error(`\n${failed} critical path(s) returned 4xx/5xx.`)
  process.exit(1)
} else {
  console.log(`\nAll ${CRITICAL_PATHS.length} paths OK.`)
}
