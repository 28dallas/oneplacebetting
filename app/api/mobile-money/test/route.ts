import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Test endpoint for mobile money without external API
export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount, provider, userId } = await request.json()

    if (!phoneNumber || !amount || !provider || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Simulate mobile money transaction
    const transaction = await db.transaction.create({
      data: {
        userId,
        type: 'deposit',
        amount,
        provider,
        phoneNumber,
        transactionId: `TEST_${Date.now()}`,
        status: 'completed'
      }
    })

    // Update user balance
    await db.user.update({
      where: { id: userId },
      data: { balance: { increment: amount } }
    })

    return NextResponse.json({ 
      success: true, 
      transactionId: transaction.transactionId,
      status: 'completed',
      message: 'Test deposit successful'
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Test deposit failed' }, 
      { status: 500 }
    )
  }
}