/**
 * /api/media/sign — server-side Cloudinary signed upload parameters.
 * CLOUDINARY_API_SECRET is never exposed to the client.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  // Require authenticated user
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: 'Media service not configured' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  const payload = (body ?? {}) as Record<string, unknown>
  const folder =
    typeof payload.folder === 'string' ? payload.folder : 'zawios'

  const timestamp = Math.round(Date.now() / 1000)
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`

  const signature = crypto
    .createHash('sha256')
    .update(paramsToSign + apiSecret)
    .digest('hex')

  return NextResponse.json({
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder,
  })
}
