import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId, amount, provider, accountInfo } = await request.json()

    if (!userId || !amount || !provider || !accountInfo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (amount < 28000) {
      return NextResponse.json({ error: 'Minimum withdrawal is $28,000' }, { status: 400 })
    }

    // Check user balance
    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user || user.balance < amount) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 })
    }

    // Create withdrawal request (pending admin approval)
    const withdrawal = await db.transaction.create({
      data: {
        userId,
        type: 'withdrawal',
        amount,
        provider,
        phoneNumber: accountInfo,
        status: 'pending_approval'
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Withdrawal request submitted for admin approval',
      withdrawalId: withdrawal.id
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Withdrawal request failed' }, 
      { status: 500 }
    )
  }
}