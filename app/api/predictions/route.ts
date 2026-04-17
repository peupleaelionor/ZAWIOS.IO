/**
 * /api/predictions — CRUD for predictions (Supabase-backed).
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { captureException } from '@/lib/sentry'

const createPredictionSchema = z.object({
  title:           z.string().min(5).max(500),
  description:     z.string().min(10).max(2000),
  category:        z.string().min(1),
  type:            z.enum(['yes_no', 'multiple_choice', 'probability']),
  resolution_date: z.string().min(1),
  options:         z.array(z.string().min(1)).optional().default([]),
  tags:            z.array(z.string()).optional().default([]),
})

const listQuerySchema = z.object({
  category: z.string().optional(),
  status:   z.string().optional(),
  limit:    z.coerce.number().int().min(1).max(100).default(20),
  offset:   z.coerce.number().int().min(0).default(0),
})

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
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const parsed = createPredictionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Validation failed' },
        { status: 400 },
      )
    }

    const { title, description, category, type, resolution_date, options, tags } = parsed.data

    const { data: prediction, error: predError } = await supabase
      .from('predictions')
      .insert({ title, description, category, type, resolution_date, created_by: user.id, status: 'open', tags })
      .select()
      .single()

    if (predError) {
      captureException(predError, { route: 'POST /api/predictions', userId: user.id })
      return NextResponse.json({ error: 'Failed to create prediction' }, { status: 500 })
    }

    if (options.length > 0 && prediction) {
      const optionRows = options
        .filter((o) => o.trim())
        .map((label) => ({ prediction_id: prediction.id, label: label.trim() }))

      if (optionRows.length > 0) {
        const { error: optError } = await supabase.from('prediction_options').insert(optionRows)
        if (optError) {
          captureException(optError, { route: 'POST /api/predictions/options', predictionId: prediction.id })
        }
      }
    }

    return NextResponse.json({ prediction }, { status: 201 })
  } catch (err) {
    captureException(err, { route: 'POST /api/predictions' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const parsed = listQuerySchema.safeParse({
      category: searchParams.get('category') ?? undefined,
      status:   searchParams.get('status')   ?? undefined,
      limit:    searchParams.get('limit')    ?? undefined,
      offset:   searchParams.get('offset')   ?? undefined,
    })

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid params' },
        { status: 400 },
      )
    }

    const { category, status, limit, offset } = parsed.data
    const supabase = await createClient()

    let query = supabase
      .from('predictions')
      .select('*, prediction_options (*), profiles:created_by (user_id, username, full_name, avatar_url)')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (category && category !== 'all') query = query.eq('category', category)
    if (status) query = query.eq('status', status)

    const { data, error } = await query

    if (error) {
      captureException(error, { route: 'GET /api/predictions' })
      return NextResponse.json({ error: 'Failed to fetch predictions' }, { status: 500 })
    }

    return NextResponse.json({ predictions: data })
  } catch (err) {
    captureException(err, { route: 'GET /api/predictions' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
