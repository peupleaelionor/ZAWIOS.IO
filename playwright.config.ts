import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['github'], ['html']] : 'list',

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    /* Mobile — iPhone SE (375×667) */
    {
      name: 'iphone-se',
      use: { ...devices['iPhone SE'], viewport: { width: 375, height: 667 } },
    },
    /* Mobile — iPhone 13 (390×844) */
    {
      name: 'iphone-13',
      use: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } },
    },
    /* Mobile — iPhone 15 Pro Max (430×932) */
    {
      name: 'iphone-15-max',
      use: { ...devices['iPhone 15 Pro Max'], viewport: { width: 430, height: 932 } },
    },
    /* Mobile — Android (412×915) */
    {
      name: 'android',
      use: { ...devices['Pixel 7'], viewport: { width: 412, height: 915 } },
    },
    /* Tablet — iPad (820×1180) */
    {
      name: 'ipad',
      use: { ...devices['iPad Pro'], viewport: { width: 820, height: 1180 } },
    },
    /* Desktop 1440×900 */
    {
      name: 'desktop',
      use: { viewport: { width: 1440, height: 900 } },
    },
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
