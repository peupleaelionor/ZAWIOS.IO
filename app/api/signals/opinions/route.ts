import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

const MAX_OPINIONS_PER_USER_PER_DAY = 3
const MAX_CONTENT_LENGTH = 240

/**
 * GET /api/signals/opinions?signal_id=xxx&limit=10
 * Returns public opinions for a signal.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const signal_id = searchParams.get('signal_id')
  const limit = Math.min(50, parseInt(searchParams.get('limit') ?? '10', 10))

  if (!signal_id) return NextResponse.json({ error: 'signal_id required' }, { status: 400 })

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('signal_opinions')
    .select('id, content, lang, helpful_count, created_at')
    .eq('signal_id', signal_id)
    .eq('hidden', false)
    .order('helpful_count', { ascending: false })
    .limit(limit)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ opinions: data ?? [] })
}

/**
 * POST /api/signals/opinions
 * Submit a mini-avis (max 240 chars) after voting.
 * Requires auth. Rate-limited: 3 per user per signal per day.
 */
export async function POST(req: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 })

  let body: { signal_id?: string; content?: string; lang?: string }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Corps invalide.' }, { status: 400 }) }

  const { signal_id, content, lang = 'fr' } = body

  if (!signal_id || typeof signal_id !== 'string') {
    return NextResponse.json({ error: 'signal_id requis.' }, { status: 400 })
  }
  if (!content || typeof content !== 'string') {
    return NextResponse.json({ error: 'Contenu requis.' }, { status: 400 })
  }
  const trimmed = content.trim()
  if (trimmed.length === 0 || trimmed.length > MAX_CONTENT_LENGTH) {
    return NextResponse.json({ error: `Mini-avis : 1 à ${MAX_CONTENT_LENGTH} caractères.` }, { status: 400 })
  }
  if (!['fr', 'en'].includes(lang)) {
    return NextResponse.json({ error: 'Langue invalide.' }, { status: 400 })
  }

  const admin = createAdminClient()
  const today = new Date().toISOString().slice(0, 10)

  // Rate limit check
  const { data: rateRow } = await admin
    .from('opinion_rate_limits')
    .select('count')
    .eq('user_id', user.id)
    .eq('signal_id', signal_id)
    .eq('day', today)
    .single()

  if (rateRow && rateRow.count >= MAX_OPINIONS_PER_USER_PER_DAY) {
    return NextResponse.json(
      { error: `Limite atteinte : ${MAX_OPINIONS_PER_USER_PER_DAY} avis par signal par jour.` },
      { status: 429 }
    )
  }

  // Basic anti-spam: reject if content is suspiciously repetitive or empty meaning
  const words = trimmed.split(/\s+/).filter(Boolean)
  const uniqueWords = new Set(words.map((w) => w.toLowerCase()))
  if (words.length > 5 && uniqueWords.size / words.length < 0.4) {
    return NextResponse.json({ error: 'Contenu répétitif détecté.' }, { status: 400 })
  }

  const { error: insertErr } = await admin.from('signal_opinions').insert({
    signal_id,
    user_id: user.id,
    content: trimmed,
    lang,
  })

  if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 })

  // Update or insert rate limit row
  await admin.from('opinion_rate_limits').upsert(
    { user_id: user.id, signal_id, day: today, count: (rateRow?.count ?? 0) + 1 },
    { onConflict: 'user_id,signal_id,day' }
  )

  return NextResponse.json({ ok: true }, { status: 201 })
}
