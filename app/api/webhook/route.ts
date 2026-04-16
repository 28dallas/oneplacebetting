import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  try {
    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-07-30.basil',
    })

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object
      const userId = paymentIntent.metadata.userId
      const amount = paymentIntent.amount / 100 // Convert from cents

      await db.user.update({
        where: { id: userId },
        data: { balance: { increment: amount } }
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook error' }, 
      { status: 400 }
    )
  }
}