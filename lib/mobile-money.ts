const AfricasTalking = require('africastalking')

const africastalking = AfricasTalking({
  apiKey: process.env.AFRICASTALKING_API_KEY!,
  username: process.env.AFRICASTALKING_USERNAME!,
})

export const mobileMoneyService = {
  // M-Pesa deposit
  async mpesaDeposit(phoneNumber: string, amount: number, userId: string) {
    try {
      const response = await africastalking.PAYMENTS.mobileCheckout({
        productName: 'SportsBet',
        phoneNumber: phoneNumber,
        currencyCode: 'KES',
        amount: amount,
        metadata: { userId }
      })
      return response
    } catch (error) {
      throw new Error('M-Pesa payment failed')
    }
  },

  // Airtel Money deposit
  async airtelDeposit(phoneNumber: string, amount: number, userId: string) {
    try {
      const response = await africastalking.PAYMENTS.mobileCheckout({
        productName: 'SportsBet',
        phoneNumber: phoneNumber,
        currencyCode: 'KES',
        amount: amount,
        providerChannel: 'athena',
        metadata: { userId }
      })
      return response
    } catch (error) {
      throw new Error('Airtel Money payment failed')
    }
  },

  // Business payout (winnings to user)
  async payout(phoneNumber: string, amount: number) {
    try {
      const response = await africastalking.PAYMENTS.mobileB2C({
        productName: 'SportsBet',
        recipients: [{
          phoneNumber: phoneNumber,
          currencyCode: 'KES',
          amount: amount,
          reason: 'Betting winnings'
        }]
      })
      return response
    } catch (error) {
      throw new Error('Payout failed')
    }
  }
}