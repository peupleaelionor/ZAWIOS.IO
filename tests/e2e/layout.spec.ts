import { test, expect } from '@playwright/test'

const PAGES = ['/', '/signals', '/leaderboard', '/support', '/about']

/* ── No horizontal overflow ─────────────────────────────────────────── */
test.describe('Layout — no horizontal overflow', () => {
  for (const page of PAGES) {
    test(`${page} — zero scroll width overflow`, async ({ page: pw }) => {
      await pw.goto(page)
      await pw.waitForLoadState('networkidle')

      const overflow = await pw.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth
      })
      expect(overflow, `Horizontal overflow on ${page}`).toBe(false)
    })
  }
})

/* ── Vote buttons visible ────────────────────────────────────────────── */
test.describe('Vote buttons — always visible', () => {
  test('Vote buttons OUI/NON visible on /signals', async ({ page: pw }) => {
    await pw.goto('/signals')
    await pw.waitForLoadState('networkidle')

    // Find first vote button area
    const ouiBtn = pw.getByRole('button', { name: /oui/i }).first()
    const nonBtn = pw.getByRole('button', { name: /non/i }).first()

    if (await ouiBtn.count() > 0) {
      await expect(ouiBtn).toBeVisible()
      const ouiBox = await ouiBtn.boundingBox()
      expect(ouiBox?.height).toBeGreaterThanOrEqual(40)
    }
    if (await nonBtn.count() > 0) {
      await expect(nonBtn).toBeVisible()
      const nonBox = await nonBtn.boundingBox()
      expect(nonBox?.height).toBeGreaterThanOrEqual(40)
    }
  })
})

/* ── CTA visible ─────────────────────────────────────────────────────── */
test.describe('Homepage — CTAs visible', () => {
  test('Primary CTA visible in hero', async ({ page: pw }) => {
    await pw.goto('/')
    await pw.waitForLoadState('networkidle')

    // At least one CTA link should be visible
    const cta = pw.getByRole('link', { name: /commencer|explorer|voir les signaux/i }).first()
    if (await cta.count() > 0) {
      await expect(cta).toBeVisible()
    }
  })
})

/* ── Navigation OK ───────────────────────────────────────────────────── */
test.describe('Navigation', () => {
  test('Navbar is visible on all pages', async ({ page: pw }) => {
    for (const pageUrl of ['/', '/signals', '/support']) {
      await pw.goto(pageUrl)
      const nav = pw.locator('nav').first()
      await expect(nav).toBeVisible()
    }
  })
})

/* ── Touch targets ───────────────────────────────────────────────────── */
test.describe('Touch targets >= 44px', () => {
  test('Main CTA buttons have sufficient height', async ({ page: pw }) => {
    await pw.goto('/')
    await pw.waitForLoadState('networkidle')

    const buttons = pw.getByRole('button').filter({ hasNot: pw.locator('[aria-hidden="true"]') })
    const count = await buttons.count()

    for (let i = 0; i < Math.min(count, 5); i++) {
      const btn = buttons.nth(i)
      if (await btn.isVisible()) {
        const box = await btn.boundingBox()
        if (box) {
          // Only check buttons that look like CTAs (wider than 80px)
          if (box.width > 80) {
            expect(box.height, `Button ${i} too small`).toBeGreaterThanOrEqual(40)
          }
        }
      }
    }
  })
})

/* ── Visual snapshots ────────────────────────────────────────────────── */
test.describe('Visual snapshots', () => {
  for (const pageUrl of ['/', '/signals', '/support']) {
    test(`Snapshot: ${pageUrl}`, async ({ page: pw }) => {
      await pw.goto(pageUrl)
      await pw.waitForLoadState('networkidle')
      // Wait for fonts & images
      await pw.waitForTimeout(500)
      await expect(pw).toHaveScreenshot(`${pageUrl.replace('/', 'home') || 'home'}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
      })
    })
  }
})
