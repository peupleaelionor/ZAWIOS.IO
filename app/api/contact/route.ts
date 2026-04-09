/**
 * /api/contact — receives contact form submissions and sends a
 * branded ZAWIOS notification email to the team via Resend.
 * No authentication required (public form).
 */
import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_URL = 'https://api.resend.com/emails'
const FROM_ADDRESS = 'ZAWIOS Contact <noreply@zawios.io>'
const TEAM_ADDRESS = 'contact@zawios.io'

function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

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

  if (
    typeof payload.name !== 'string' || !payload.name.trim() ||
    !isValidEmail(payload.email) ||
    typeof payload.subject !== 'string' || !payload.subject.trim() ||
    typeof payload.message !== 'string' || !payload.message.trim()
  ) {
    return NextResponse.json(
      { error: 'name, email, subject, and message are required' },
      { status: 400 }
    )
  }

  const name = payload.name.trim()
  const email = payload.email
  const subject = payload.subject.trim()
  const message = payload.message.trim()

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0C0D10;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:24px;">
      <h1 style="color:#17D5CF;font-size:24px;font-weight:800;margin:0;">ZAWIOS</h1>
      <p style="color:#5c5c78;font-size:12px;margin:4px 0 0;">New contact form submission</p>
    </div>
    <div style="background:#13141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="color:#5c5c78;font-size:12px;padding:6px 0;vertical-align:top;width:80px;">From</td>
          <td style="color:#eaeaf0;font-size:14px;padding:6px 0;">${name}</td>
        </tr>
        <tr>
          <td style="color:#5c5c78;font-size:12px;padding:6px 0;vertical-align:top;">Email</td>
          <td style="color:#eaeaf0;font-size:14px;padding:6px 0;">
            <a href="mailto:${email}" style="color:#17D5CF;text-decoration:none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="color:#5c5c78;font-size:12px;padding:6px 0;vertical-align:top;">Subject</td>
          <td style="color:#eaeaf0;font-size:14px;padding:6px 0;">${subject}</td>
        </tr>
      </table>
      <div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);">
        <p style="color:#5c5c78;font-size:12px;margin:0 0 8px;">Message</p>
        <p style="color:#a0a0b8;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${message}</p>
      </div>
    </div>
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
      to: TEAM_ADDRESS,
      reply_to: email,
      subject: `[ZAWIOS Contact] ${subject}`,
      html,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/contact] Resend error', response.status, text)
    }
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }

  const data = await response.json()
  return NextResponse.json({ id: data.id })
}
