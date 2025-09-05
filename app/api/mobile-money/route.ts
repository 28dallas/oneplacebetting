import { NextRequest, NextResponse } from 'next/server'
import { mobileMoneyService } from '@/lib/mobile-money'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount, provider, userId } = await request.json()

    if (!phoneNumber || !amount || !provider || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create transaction record
    const transaction = await db.transaction.create({
      data: {
        userId,
        type: 'deposit',
        amount,
        provider,
        phoneNumber,
        status: 'pending'
      }
    })

    let response
    try {
      if (provider === 'mpesa') {
        response = await mobileMoneyService.mpesaDeposit(phoneNumber, amount, userId)
      } else if (provider === 'airtel') {
        response = await mobileMoneyService.airtelDeposit(phoneNumber, amount, userId)
      } else {
        throw new Error('Invalid provider')
      }

      // Update transaction with external ID
      await db.transaction.update({
        where: { id: transaction.id },
        data: { 
          transactionId: response.transactionId,
          status: response.status === 'PendingConfirmation' ? 'pending' : 'failed'
        }
      })

      // Update user balance if successful
      if (response.status === 'PendingConfirmation') {
        await db.user.update({
          where: { id: userId },
          data: { balance: { increment: amount } }
        })

        await db.transaction.update({
          where: { id: transaction.id },
          data: { status: 'completed' }
        })
      }

      return NextResponse.json({ 
        success: true, 
        transactionId: response.transactionId,
        status: response.status 
      })

    } catch (error) {
      // Mark transaction as failed
      await db.transaction.update({
        where: { id: transaction.id },
        data: { status: 'failed' }
      })
      throw error
    }

  } catch (error) {
    return NextResponse.json(
      { error: 'Mobile money payment failed' }, 
      { status: 500 }
    )
  }
}