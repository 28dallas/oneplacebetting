import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const withdrawals = await db.transaction.findMany({
      where: { type: 'withdrawal' },
      include: {
        user: {
          select: {
            fullName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ withdrawals })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch withdrawals' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { withdrawalId, action } = await request.json()

    if (!withdrawalId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const withdrawal = await db.transaction.findUnique({
      where: { id: withdrawalId },
      include: { user: true }
    })

    if (!withdrawal) {
      return NextResponse.json({ error: 'Withdrawal not found' }, { status: 404 })
    }

    if (action === 'approve') {
      // Deduct balance and mark as completed
      await db.user.update({
        where: { id: withdrawal.userId },
        data: { balance: { decrement: withdrawal.amount } }
      })

      await db.transaction.update({
        where: { id: withdrawalId },
        data: { status: 'completed' }
      })
    } else if (action === 'reject') {
      await db.transaction.update({
        where: { id: withdrawalId },
        data: { status: 'failed' }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Action failed' }, { status: 500 })
  }
}