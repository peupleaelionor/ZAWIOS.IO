/**
 * /api/predictions — CRUD for predictions (Supabase-backed).
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>

  if (
    typeof payload.title !== 'string' || !payload.title.trim() ||
    typeof payload.description !== 'string' || !payload.description.trim() ||
    typeof payload.category !== 'string' || !payload.category.trim() ||
    typeof payload.type !== 'string' ||
    typeof payload.resolution_date !== 'string' || !payload.resolution_date
  ) {
    return NextResponse.json(
      { error: 'title, description, category, type, and resolution_date are required' },
      { status: 400 }
    )
  }

  const options = Array.isArray(payload.options) ? payload.options as string[] : []
  const tags = Array.isArray(payload.tags) ? payload.tags as string[] : []

  // Insert prediction
  const { data: prediction, error: predError } = await supabase
    .from('predictions')
    .insert({
      title: payload.title.trim(),
      description: payload.description.trim(),
      category: payload.category.trim(),
      type: payload.type,
      resolution_date: payload.resolution_date,
      created_by: user.id,
      status: 'open',
      tags,
    })
    .select()
    .single()

  if (predError) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/predictions] insert error', predError)
    }
    return NextResponse.json({ error: 'Failed to create prediction' }, { status: 500 })
  }

  // Insert options
  if (options.length > 0 && prediction) {
    const optionRows = options
      .filter((o: string) => typeof o === 'string' && o.trim())
      .map((label: string) => ({
        prediction_id: prediction.id,
        label: label.trim(),
      }))

    if (optionRows.length > 0) {
      const { error: optError } = await supabase
        .from('prediction_options')
        .insert(optionRows)

      if (optError && process.env.NODE_ENV === 'development') {
        console.error('[api/predictions] options insert error', optError)
      }
    }
  }

  return NextResponse.json({ prediction }, { status: 201 })
}

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const status = searchParams.get('status')
  const limit = Math.min(Number(searchParams.get('limit')) || 20, 100)
  const offset = Number(searchParams.get('offset')) || 0

  let query = supabase
    .from('predictions')
    .select(`
      *,
      prediction_options (*),
      profiles:created_by (user_id, username, full_name, avatar_url)
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }
  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/predictions] fetch error', error)
    }
    return NextResponse.json({ error: 'Failed to fetch predictions' }, { status: 500 })
  }

  return NextResponse.json({ predictions: data })
}
