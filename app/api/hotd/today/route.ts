import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = createAdminClient()
  const today = new Date().toISOString().slice(0, 10)

  const { data, error } = await supabase
    .from('hotd_items')
    .select('*, signals(*)')
    .eq('date', today)
    .single()

  if (error || !data) {
    return NextResponse.json({ hotd: null }, { status: 200 })
  }

  return NextResponse.json({ hotd: data }, { status: 200 })
}
