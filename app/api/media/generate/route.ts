/**
 * /api/media/generate — AI-powered image generation for prediction questions.
 * Uses OpenAI DALL-E 3 to create contextual images for signals/predictions.
 * Requires admin approval before public display.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const OPENAI_API_URL = 'https://api.openai.com/v1/images/generations'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'AI media generation not configured' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>
  const title = typeof payload.title === 'string' ? payload.title.trim() : ''
  const category = typeof payload.category === 'string' ? payload.category : 'general'
  const style = typeof payload.style === 'string' ? payload.style : 'editorial'

  if (!title || title.length < 5) {
    return NextResponse.json({ error: 'Title must be at least 5 characters' }, { status: 400 })
  }

  // Sanitize user inputs to prevent prompt injection
  const sanitize = (s: string) =>
    s.replace(/["""'`\n\r\t\\]/g, ' ').replace(/\s+/g, ' ').trim()

  const safeTitle = sanitize(title).slice(0, 200)
  const safeCategory = sanitize(category).slice(0, 50)

  // Build a safe, editorial-quality prompt
  const styleGuide: Record<string, string> = {
    editorial: 'Clean editorial illustration style, minimalist, professional news graphics aesthetic',
    abstract: 'Abstract geometric art, data visualization inspired, dark background with accent colors',
    infographic: 'Infographic style with clean icons and data elements, flat design',
    photorealistic: 'Photorealistic stock photography style, professional, well-lit',
  }

  const prompt = `Create a visual for this prediction topic: "${safeTitle}" (category: ${safeCategory}).
Style: ${styleGuide[style] ?? styleGuide.editorial}.
Requirements: No text, no watermarks, no logos. Safe for all audiences. 16:9 aspect ratio feel. Dark-themed background (#0C0D10) with royal blue (#4169E1) accents.`

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1792x1024',
        quality: 'standard',
        response_format: 'url',
      }),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      if (process.env.NODE_ENV === 'development') {
        console.error('[api/media/generate] OpenAI error', errData)
      }
      return NextResponse.json({ error: 'Image generation failed' }, { status: 500 })
    }

    const data = await response.json()
    const imageUrl = data.data?.[0]?.url
    const revisedPrompt = data.data?.[0]?.revised_prompt

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image generated' }, { status: 500 })
    }

    // Store in generated_media table for admin review
    if (typeof payload.prediction_id === 'string') {
      try {
        await supabase
          .from('generated_media')
          .insert({
            prediction_id: payload.prediction_id,
            generated_by: user.id,
            media_type: 'image',
            url: imageUrl,
            prompt: prompt.slice(0, 500),
            revised_prompt: revisedPrompt?.slice(0, 500) ?? null,
            status: 'pending_review',
          })
      } catch {
        /* table may not exist yet — non-blocking */
      }
    }

    return NextResponse.json({
      image_url: imageUrl,
      revised_prompt: revisedPrompt,
      status: 'pending_review',
    })
  } catch {
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}
