import { NextRequest, NextResponse } from 'next/server'
import { getStripeClient } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const stripe = getStripeClient()

  if (!stripe) {
    return NextResponse.json(
      {
        error:
          'Online donations are not yet configured. Please use the e-transfer instructions below or contact the school directly.',
      },
      { status: 503 },
    )
  }

  const { amount } = await req.json()
  const amountInCents = Math.round(Number(amount) * 100)

  if (!amountInCents || amountInCents < 100) {
    return NextResponse.json({ error: 'Please enter a valid donation amount.' }, { status: 400 })
  }

  const origin = req.nextUrl.origin

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: { name: 'Donation to Toronto Islamic Academy' },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/donate/success`,
      cancel_url: `${origin}/donate/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout session creation failed:', error)
    return NextResponse.json(
      { error: 'Unable to start checkout right now. Please try again shortly.' },
      { status: 500 },
    )
  }
}
