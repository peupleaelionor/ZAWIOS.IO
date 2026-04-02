/**
 * Environment variable validation — runs at startup (server-side only).
 * Client env: NEXT_PUBLIC_* only. Server env: never exposed to browser.
 */

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

// ─── Client (browser-safe) ────────────────────────────────────────────────────
export const clientEnv = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? '',
} as const

// ─── Server (never sent to browser) ──────────────────────────────────────────
function getServerEnv() {
  if (typeof window !== 'undefined') {
    throw new Error('serverEnv must not be accessed on the client')
  }
  return {
    SUPABASE_SERVICE_ROLE_KEY: requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
    OPENAI_API_KEY: requireEnv('OPENAI_API_KEY'),
    RESEND_API_KEY: requireEnv('RESEND_API_KEY'),
    CLOUDINARY_CLOUD_NAME: requireEnv('CLOUDINARY_CLOUD_NAME'),
    CLOUDINARY_API_KEY: requireEnv('CLOUDINARY_API_KEY'),
    CLOUDINARY_API_SECRET: requireEnv('CLOUDINARY_API_SECRET'),
    SENTRY_DSN: process.env.SENTRY_DSN ?? '',
  } as const
}

export { getServerEnv }
