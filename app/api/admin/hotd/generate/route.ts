import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'
export const maxDuration = 30

/**
 * POST /api/admin/hotd/generate
 * Selects and stores the HOTD for the given date.
 * Requires service-role auth (called by cron or admin).
 *
 * Body: { date?: string (ISO), force_signal_id?: string }
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { date?: string; force_signal_id?: string } = {}
  try { body = await req.json() } catch {}

  const supabase = createAdminClient()
  const date = body.date ?? new Date().toISOString().slice(0, 10)

  // If a signal is forced by admin, use it directly
  if (body.force_signal_id) {
    const { error } = await supabase.from('hotd_items').upsert({
      date,
      signal_id: body.force_signal_id,
      score: 0,
      reasons: { forced: true },
    }, { onConflict: 'date' })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ date, signal_id: body.force_signal_id, forced: true })
  }

  // Select top signal by score formula:
  // score = 5*vote_velocity_2h + 3*comment_rate + 2*share_intent
  //         + 3*divergence + 2*impact
  // We approximate using available columns in signals table
  const { data: signals, error: sigErr } = await supabase
    .from('signals')
    .select('id, vote_count, yes_percent, no_percent')
    .eq('status', 'active')
    .order('vote_count', { ascending: false })
    .limit(50)

  if (sigErr || !signals?.length) {
    return NextResponse.json({ error: 'No active signals', details: sigErr?.message }, { status: 503 })
  }

  // Compute divergence: how close to 50/50 is the split
  // divergence = 10 - |yes_percent - no_percent| / 10  (max 10 when 50/50)
  const scored = signals.map((s) => {
    const yes = s.yes_percent ?? 50
    const no = s.no_percent ?? 50
    const divergence = Math.max(0, 10 - Math.abs(yes - no) / 10)
    const velocity = Math.min(500, s.vote_count ?? 0) / 50  // normalize to 0-10
    const score = 5 * velocity + 3 * divergence + 2 * divergence
    return { id: s.id, score, divergence, velocity }
  })

  const best = scored.reduce((a, b) => (b.score > a.score ? b : a))

  const { error: upsertErr } = await supabase.from('hotd_items').upsert({
    date,
    signal_id: best.id,
    score: Math.round(best.score),
    region_scope: 'global',
    reasons: {
      divergence: best.divergence,
      velocity: best.velocity,
      formula: '5*velocity + 3*divergence + 2*divergence',
    },
  }, { onConflict: 'date' })

  if (upsertErr) return NextResponse.json({ error: upsertErr.message }, { status: 500 })

  return NextResponse.json({ date, signal_id: best.id, score: Math.round(best.score) })
}
