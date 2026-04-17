/**
 * /api/leaderboard — Top users ranked by reputation score
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'

const querySchema = z.object({
  limit:  z.coerce.number().int().min(1).max(100).default(25),
  offset: z.coerce.number().int().min(0).default(0),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const parsed = querySchema.safeParse({
      limit:  searchParams.get('limit')  ?? undefined,
      offset: searchParams.get('offset') ?? undefined,
    })

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid params' },
        { status: 400 },
      )
    }

    const { limit, offset } = parsed.data
    const supabase = await createClient()

    const { data, error } = await supabase.rpc('get_leaderboard', {
      p_limit:  limit,
      p_offset: offset,
    })

    if (error) {
      captureException(error, { route: 'GET /api/leaderboard' })
      // RPC not yet available → empty array (client falls back to mock)
      return NextResponse.json({ leaderboard: [], source: 'fallback' })
    }

    return NextResponse.json({ leaderboard: data ?? [], source: 'db' })
  } catch (err) {
    captureException(err, { route: 'GET /api/leaderboard' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
