/**
 * GET /api/cron/agents
 * Vercel Cron endpoint — triggers nightly agent orchestration.
 * Configure in vercel.json: { "crons": [{ "path": "/api/cron/agents", "schedule": "0 3 * * *" }] }
 */
import { NextRequest, NextResponse } from 'next/server'
import { runNightly } from '@/lib/agents/orchestrator'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 503 })
  }

  try {
    const report = await runNightly({ supabaseUrl, supabaseKey, dryRun: false })
    return NextResponse.json(report)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
