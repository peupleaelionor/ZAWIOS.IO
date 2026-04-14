/**
 * /api/insights — generates AI-powered crowd insights using OpenAI.
 * Authenticated users only.
 */
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'AI not configured' }, { status: 503 })
  }

  // Fetch recent prediction data for context
  const { data: predictions } = await supabase
    .from('predictions')
    .select('title, category, status, vote_count')
    .order('created_at', { ascending: false })
    .limit(20)

  const predictionContext = predictions?.length
    ? predictions.map((p) => `${p.category}: "${p.title}" (${p.status}, ${p.vote_count ?? 0} votes)`).join('\n')
    : 'No recent predictions available.'

  const prompt = `You are the ZAWIOS AI analyst. Based on recent prediction activity on the platform, generate exactly 4 crowd intelligence insights. Each insight should have a category, headline, description (1-2 sentences), and confidence score (0-100).

Recent activity:
${predictionContext}

Respond with valid JSON only, no markdown:
[{"category":"string","headline":"string","description":"string","confidence":number}]`

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'AI service error' }, { status: 500 })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content?.trim()

    if (!content) {
      return NextResponse.json({ error: 'Empty AI response' }, { status: 500 })
    }

    const insights = (() => {
      try {
        return JSON.parse(content)
      } catch {
        return [{ category: 'error', headline: 'Parse error', description: 'AI response was not valid JSON', confidence: 0 }]
      }
    })()
    return NextResponse.json({ insights })
  } catch {
    return NextResponse.json({ error: 'Failed to generate insights' }, { status: 500 })
  }
}
