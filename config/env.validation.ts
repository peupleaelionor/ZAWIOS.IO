/**
 * ZAWIOS — Environment variable validation
 * Fail fast at boot if required vars are missing.
 * Call validateEnv() in middleware or instrumentation.
 */

interface EnvVar {
  key: string
  required: boolean
  description: string
}

const ENV_VARS: EnvVar[] = [
  { key: 'NEXT_PUBLIC_SUPABASE_URL',      required: true,  description: 'Supabase project URL' },
  { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', required: true,  description: 'Supabase anonymous key' },
  { key: 'NEXT_PUBLIC_APP_URL',           required: false, description: 'Public application URL (defaults to localhost)' },
  { key: 'NEXT_PUBLIC_PLAUSIBLE_DOMAIN',  required: false, description: 'Plausible analytics domain' },
]

export interface EnvValidationResult {
  valid: boolean
  missing: string[]
  warnings: string[]
}

export function validateEnv(): EnvValidationResult {
  const missing: string[] = []
  const warnings: string[] = []

  for (const envVar of ENV_VARS) {
    const value = process.env[envVar.key]
    if (!value || value.trim() === '') {
      if (envVar.required) {
        missing.push(`${envVar.key} — ${envVar.description}`)
      } else {
        warnings.push(`${envVar.key} not set (optional) — ${envVar.description}`)
      }
    }
  }

  return {
    valid: missing.length === 0,
    missing,
    warnings,
  }
}

/**
 * Validate and log — does NOT throw in production to avoid
 * crashing on Netlify preview deploys with missing vars.
 */
export function assertEnv(): void {
  const result = validateEnv()

  if (result.warnings.length > 0 && process.env.NODE_ENV === 'development') {
    result.warnings.forEach((w) => console.warn('[ENV]', w))
  }

  if (!result.valid) {
    const msg = `[ZAWIOS] Missing required environment variables:\n${result.missing.map((m) => `  - ${m}`).join('\n')}`
    if (process.env.NODE_ENV === 'development') {
      console.error(msg)
    }
    // In production: warn but don't throw — Supabase client handles gracefully
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(msg)
    } else {
      console.error(msg)
    }
  }
}
