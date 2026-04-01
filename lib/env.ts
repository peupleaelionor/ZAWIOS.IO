// Environment variable validation
// Client-safe vars: NEXT_PUBLIC_* only
// Server-only vars: never exposed to client bundle

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

// Server-only — never import this object in client components
const serverOnly = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
} as const

export function getClientEnv() {
  return { ...requiredClient, ...optionalClient }
}

export function getServerEnv() {
  if (typeof window !== 'undefined') {
    throw new Error('getServerEnv() called on client — secrets must stay server-side')
  }
  return { ...requiredClient, ...optionalClient, ...serverOnly }
}

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
