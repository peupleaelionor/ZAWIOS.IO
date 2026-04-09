/**
 * /api/email — server-side email sending via Resend.
 * RESEND_API_KEY is never exposed to the client.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const RESEND_API_URL = 'https://api.resend.com/emails'
const FROM_ADDRESS = 'ZAWIOS <noreply@zawios.io>'

type EmailPayload = {
  to: string
  subject: string
  html: string
}

function isValidEmail(email: unknown): email is string {
  if (typeof email !== 'string' || email.length > 254) return false
  const parts = email.split('@')
  if (parts.length !== 2) return false
  const [local, domain] = parts
  if (!local || local.length > 64 || !domain || domain.length > 253) return false
  if (local.includes(' ') || domain.includes(' ')) return false
  if (!domain.includes('.')) return false
  return true
}

export async function POST(request: NextRequest) {
  // Require authenticated user
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>

  if (
    !isValidEmail(payload.to) ||
    typeof payload.subject !== 'string' ||
    !payload.subject.trim() ||
    typeof payload.html !== 'string' ||
    !payload.html.trim()
  ) {
    return NextResponse.json(
      { error: 'to, subject, and html are required' },
      { status: 400 }
    )
  }

  const email: EmailPayload = {
    to: payload.to,
    subject: payload.subject.trim(),
    html: payload.html,
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from: FROM_ADDRESS, ...email }),
  })

  if (!response.ok) {
    const text = await response.text()
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/email] upstream error', response.status, text)
    }
    return NextResponse.json(
      { error: 'Email service error' },
      { status: response.status }
    )
  }

  const data = await response.json()
  return NextResponse.json({ id: data.id })
}
