/**
 * Supabase admin client — service_role key.
 * SERVER-SIDE ONLY. Never import this in client components.
 */
import { createClient } from '@supabase/supabase-js'

if (typeof window !== 'undefined') {
  throw new Error('supabase/admin must not be imported on the client')
}

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
    )
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
