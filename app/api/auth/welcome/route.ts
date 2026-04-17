/**
 * /api/auth/welcome — sends a branded ZAWIOS welcome email via Resend.
 * Called internally after auth callback confirms a new user.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const RESEND_API_URL = 'https://api.resend.com/emails'
const FROM_ADDRESS = 'ZAWIOS <noreply@zawios.io>'

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>
  const userId = typeof payload.userId === 'string' ? payload.userId : ''
  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  // Fetch user details from Supabase
  const admin = createAdminClient()
  const { data: { user }, error: userError } = await admin.auth.admin.getUserById(userId)
  if (userError || !user?.email) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Check if welcome email was already sent (using user metadata)
  if (user.user_metadata?.welcome_email_sent) {
    return NextResponse.json({ skipped: true })
  }

  const fullName = user.user_metadata?.full_name || 'there'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zawios.netlify.app'

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0C0D10;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#17D5CF;font-size:28px;font-weight:800;margin:0;letter-spacing:-0.02em;">ZAWIOS</h1>
    </div>
    <div style="background:#13141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;">
      <h2 style="color:#eaeaf0;font-size:20px;font-weight:700;margin:0 0 12px;">
        Welcome, ${fullName}!
      </h2>
      <p style="color:#a0a0b8;font-size:14px;line-height:1.6;margin:0 0 20px;">
        Your ZAWIOS account is confirmed. You're now part of a global community of predictors who use collective intelligence to anticipate what's next.
      </p>
      <p style="color:#a0a0b8;font-size:14px;line-height:1.6;margin:0 0 24px;">
        Here's how to get started:
      </p>
      <ul style="color:#a0a0b8;font-size:14px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
        <li><strong style="color:#eaeaf0;">Vote on live signals</strong> — YES or NO, it takes 2 seconds</li>
        <li><strong style="color:#eaeaf0;">Build your reputation</strong> — every correct prediction earns points</li>
        <li><strong style="color:#eaeaf0;">Climb the leaderboard</strong> — compete with predictors worldwide</li>
      </ul>
      <div style="text-align:center;margin-top:28px;">
        <a href="${appUrl}/dashboard"
           style="display:inline-block;background:#17D5CF;color:#0C0D10;font-weight:700;font-size:14px;padding:12px 32px;border-radius:12px;text-decoration:none;">
          Open your Dashboard
        </a>
      </div>
    </div>
    <p style="text-align:center;color:#5c5c78;font-size:11px;margin-top:24px;">
      ZAWIOS — Collective Intelligence Platform<br/>
      <a href="${appUrl}" style="color:#5c5c78;text-decoration:underline;">zawios.io</a>
    </p>
  </div>
</body>
</html>`

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: user.email,
      subject: `Welcome to ZAWIOS, ${fullName}!`,
      html,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/auth/welcome] Resend error', response.status, text)
    }
    return NextResponse.json({ error: 'Email sending failed' }, { status: 500 })
  }

  // Mark welcome email as sent
  await admin.auth.admin.updateUserById(userId, {
    user_metadata: { ...user.user_metadata, welcome_email_sent: true },
  })

  const data = await response.json()
  return NextResponse.json({ id: data.id })
}
