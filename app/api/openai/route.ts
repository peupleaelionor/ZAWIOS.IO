/**
 * /api/openai — server-side proxy for all OpenAI calls.
 * OPENAI_API_KEY is never exposed to the client.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

export async function POST(request: NextRequest) {
  // Require authenticated user
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenAI not configured' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Validate shape: must have messages array
  if (
    typeof body !== 'object' ||
    body === null ||
    !Array.isArray((body as Record<string, unknown>).messages)
  ) {
    return NextResponse.json(
      { error: 'messages array is required' },
      { status: 400 }
    )
  }

  const payload = body as Record<string, unknown>

  // Enforce safe defaults
  const upstream = {
    model: typeof payload.model === 'string' ? payload.model : 'gpt-4o-mini',
    messages: payload.messages,
    max_tokens:
      typeof payload.max_tokens === 'number' ? payload.max_tokens : 1024,
  }

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(upstream),
  })

  if (!response.ok) {
    const text = await response.text()
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/openai] upstream error', response.status, text)
    }
    return NextResponse.json(
      { error: 'AI service error' },
      { status: response.status }
    )
  }

  const data = await response.json()
  return NextResponse.json(data)
}
