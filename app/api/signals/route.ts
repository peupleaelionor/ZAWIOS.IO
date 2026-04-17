/**
 * /api/signals — ZAWIOS signal feed (GET) + create signal (POST)
 * Backed by Supabase with RLS. Falls back to mock data if DB unavailable.
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'

// ── Schemas ──────────────────────────────────────────────────────────────────

const feedQuerySchema = z.object({
  category: z.string().optional(),
  region:   z.string().optional(),
  sort:     z.enum(['trending', 'latest', 'popular']).default('trending'),
  limit:    z.coerce.number().int().min(1).max(100).default(20),
  offset:   z.coerce.number().int().min(0).default(0),
})

const createSignalSchema = z.object({
  title:       z.string().min(5).max(280),
  description: z.string().max(1000).default(''),
  category:    z.enum([
    'worldview','news','tech','business','crypto','sports',
    'culture','society','entertainment','trends','fun',
  ]),
  region: z.enum([
    'global','africa','france','europe','usa','rdc','belgique',
  ]).default('global'),
})

// ── GET /api/signals ──────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const parsed = feedQuerySchema.safeParse({
      category: searchParams.get('category') ?? undefined,
      region:   searchParams.get('region')   ?? undefined,
      sort:     searchParams.get('sort')      ?? undefined,
      limit:    searchParams.get('limit')     ?? undefined,
      offset:   searchParams.get('offset')    ?? undefined,
    })

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid query params' },
        { status: 400 },
      )
    }

    const { category, region, sort, limit, offset } = parsed.data

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Use RPC for feed (handles sort + user_vote join in one query)
    const { data, error } = await supabase.rpc('get_signal_feed', {
      p_category: category ?? null,
      p_region:   region   ?? null,
      p_sort:     sort,
      p_limit:    limit,
      p_offset:   offset,
      p_user_id:  user?.id ?? null,
    })

    if (error) {
      captureException(error, { route: 'GET /api/signals', params: parsed.data })
      // RPC not available yet → return empty array (mock data fills the gap client-side)
      return NextResponse.json({ signals: [], source: 'fallback' })
    }

    return NextResponse.json({ signals: data ?? [], source: 'db' })
  } catch (err) {
    captureException(err, { route: 'GET /api/signals' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── POST /api/signals ─────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const parsed = createSignalSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Validation failed' },
        { status: 400 },
      )
    }

    // Fetch creator name from profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, username')
      .eq('user_id', user.id)
      .single()

    const { data: signal, error } = await supabase
      .from('signals')
      .insert({
        title:           parsed.data.title,
        description:     parsed.data.description,
        category:        parsed.data.category,
        region:          parsed.data.region,
        created_by:      user.id,
        creator_name:    profile?.full_name || profile?.username || null,
        status:          'active',
        yes_percent:     50,
        no_percent:      50,
        neutral_percent: 0,
        total_votes:     0,
      })
      .select()
      .single()

    if (error) {
      captureException(error, { route: 'POST /api/signals', userId: user.id })
      return NextResponse.json({ error: 'Failed to create signal' }, { status: 500 })
    }

    return NextResponse.json({ signal }, { status: 201 })
  } catch (err) {
    captureException(err, { route: 'POST /api/signals' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
