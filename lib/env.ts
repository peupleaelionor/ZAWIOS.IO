/**
 * Environment variable validation — runs at startup (server-side only).
 * Client env: NEXT_PUBLIC_* only. Server env: never exposed to browser.
 */

// ─── Client (browser-safe) ────────────────────────────────────────────────────
const requiredClient = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const

const optionalClient = {
  NEXT_PUBLIC_CRISP_WEBSITE_ID: process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
} as const

export function getClientEnv() {
  return { ...requiredClient, ...optionalClient }
}

// ─── Server (never sent to browser) ──────────────────────────────────────────
function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function getServerEnv() {
  if (typeof window !== 'undefined') {
    throw new Error('getServerEnv() called on client — secrets must stay server-side')
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

// ─── Startup validation ───────────────────────────────────────────────────────
export function validateEnv() {
  const missing: string[] = []

  for (const [key, value] of Object.entries(requiredClient)) {
    if (!value) missing.push(key)
  }

  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required env variables: ${missing.join(', ')}`)
  }

  if (missing.length > 0 && process.env.NODE_ENV === 'development') {
    console.warn(`[env] Missing variables (non-fatal in dev): ${missing.join(', ')}`)
  }
}
