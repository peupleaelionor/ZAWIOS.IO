import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    return NextResponse.json(
      { error: 'Stripe non configuré. Ajoutez STRIPE_SECRET_KEY dans les variables d\'environnement.' },
      { status: 503 },
    )
  }

  let body: { amount?: number; frequency?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 })
  }

  const { amount, frequency } = body
  if (!amount || amount < 1 || amount > 10000) {
    return NextResponse.json({ error: 'Montant invalide (1–10 000 €).' }, { status: 400 })
  }

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(stripeKey)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zawios.io'
  const isMonthly = frequency === 'monthly'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: isMonthly ? 'subscription' : 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: Math.round(amount * 100),
            ...(isMonthly
              ? { recurring: { interval: 'month' }, product_data: { name: 'Soutien mensuel ZAWIOS', description: 'Contribution mensuelle à l\'infrastructure ZAWIOS.' } }
              : { product_data: { name: 'Soutien ZAWIOS', description: 'Contribution unique à l\'infrastructure ZAWIOS.' } }),
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/support/merci`,
      cancel_url:  `${appUrl}/support`,
      metadata: { source: 'zawios-support' },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur Stripe inconnue.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
