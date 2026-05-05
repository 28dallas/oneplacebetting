import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { amount, userId } = await request.json()

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-07-30.basil',
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: { userId },
      automatic_payment_methods: { enabled: true },
    })

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    })
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to create payment intent' }, 
      { status: 500 }
    )
  }
}