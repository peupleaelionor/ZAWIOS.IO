/**
 * /api/admin — admin-only operations using the Supabase service_role client.
 * SUPABASE_SERVICE_ROLE_KEY is never exposed to the client.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Check is_admin flag in the profiles table (more secure than metadata)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('user_id', user.id)
    .single()

  if (profileError) return null

  return profile?.is_admin ? user : null
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let adminClient
  try {
    adminClient = createAdminClient()
  } catch {
    return NextResponse.json({ error: 'Service not configured' }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const resource = searchParams.get('resource')

  if (resource === 'users') {
    const { data, error } = await adminClient.auth.admin.listUsers()
    if (error) {
      if (process.env.NODE_ENV === 'development') console.error('[api/admin] listUsers error', error)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
    return NextResponse.json({ users: data.users })
  }

  return NextResponse.json({ error: 'Unknown resource' }, { status: 400 })
}

export async function DELETE(request: NextRequest) {
  const admin = await requireAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let adminClient
  try {
    adminClient = createAdminClient()
  } catch {
    return NextResponse.json({ error: 'Service not configured' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>

  if (typeof payload.userId !== 'string' || !payload.userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  const { error } = await adminClient.auth.admin.deleteUser(payload.userId)

  if (error) {
    if (process.env.NODE_ENV === 'development') console.error('[api/admin] deleteUser error', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
