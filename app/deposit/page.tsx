'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Smartphone, Shield, Clock, DollarSign } from 'lucide-react'
import { authService, type User } from '@/lib/auth'

export default function DepositPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [amount, setAmount] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [provider, setProvider] = useState('mpesa')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let currentUser = authService.getCurrentUser()
    
    // Create test user if none exists
    if (!currentUser) {
      try {
        currentUser = authService.signup({
          email: 'test@example.com',
          fullName: 'Test User',
          phone: '254712345678',
          country: 'Kenya',
          currency: 'KES'
        })
      } catch (error) {
        // User might already exist, try to login
        try {
          currentUser = authService.login('test@example.com', 'password')
        } catch (loginError) {
          console.error('Auth error:', loginError)
        }
      }
    }
    
    setUser(currentUser)
  }, [])

  const handleMobileMoneyDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !amount || !phoneNumber) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/mobile-money/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          amount: parseFloat(amount),
          provider,
          userId: user.id
        })
      })

      const result = await response.json()

      if (result.success) {
        alert(`Test deposit successful! KES ${amount} added to your account.`)
        
        // Update user balance in localStorage
        const updatedUser = { ...user, balance: user.balance + parseFloat(amount) }
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
        setUser(updatedUser)
        
        setAmount('')
        setPhoneNumber('')
      } else {
        alert('Payment failed: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    }

    setLoading(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Deposit Funds</h1>
          <p className="text-gray-400">Add money using Mobile Money</p>
        </motion.div>

        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => router.push('/transactions')}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              View History
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h2 className="text-xl font-bold text-white mb-6">Mobile Money Payment</h2>
              
              {/* Provider Selection */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <button
                  onClick={() => setProvider('mpesa')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    provider === 'mpesa'
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">📱</div>
                    <div className="font-bold text-white">M-Pesa</div>
                    <div className="text-sm text-gray-400">Safaricom</div>
                  </div>
                </button>

                <button
                  onClick={() => setProvider('airtel')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    provider === 'airtel'
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">💰</div>
                    <div className="font-bold text-white">Airtel Money</div>
                    <div className="text-sm text-gray-400">Airtel</div>
                  </div>
                </button>

                <button
                  onClick={() => setProvider('paypal')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    provider === 'paypal'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">💳</div>
                    <div className="font-bold text-white">PayPal</div>
                    <div className="text-sm text-gray-400">Worldwide</div>
                  </div>
                </button>

                <button
                  onClick={() => setProvider('bank')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    provider === 'bank'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏦</div>
                    <div className="font-bold text-white">Bank Transfer</div>
                    <div className="text-sm text-gray-400">Direct</div>
                  </div>
                </button>
              </div>

              <form onSubmit={handleMobileMoneyDeposit} className="space-y-6">
                {(provider === 'mpesa' || provider === 'airtel') && (
                  <div>
                    <label className="block text-white mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="254712345678"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                    <p className="text-sm text-gray-400 mt-1">Enter your {provider.toUpperCase()} number</p>
                  </div>
                )}

                {provider === 'paypal' && (
                  <div>
                    <label className="block text-white mb-2">PayPal Email</label>
                    <input
                      type="email"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                    <p className="text-sm text-gray-400 mt-1">Enter your PayPal email address</p>
                  </div>
                )}

                {provider === 'bank' && (
                  <div>
                    <label className="block text-white mb-2">Account Number</label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="1234567890"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                    <p className="text-sm text-gray-400 mt-1">Enter your bank account number</p>
                  </div>
                )}

                <div>
                  <label className="block text-white mb-2">Amount (KES)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="28"
                    step="1"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                  <p className="text-sm text-gray-400 mt-1">Minimum: $28</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <Smartphone size={20} />
                  <span>{loading ? 'Processing...' : `Pay ${provider === 'paypal' ? 'USD' : 'KES'} ${amount || '0'} via ${provider.toUpperCase()}`}</span>
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="font-bold text-blue-400 mb-2">Test Mode Active:</h3>
                <ol className="text-sm text-gray-300 space-y-1">
                  {(provider === 'mpesa' || provider === 'airtel') && (
                    <>
                      <li>1. Enter any phone number (e.g., 254712345678)</li>
                      <li>2. Enter amount (minimum $28)</li>
                    </>
                  )}
                  {provider === 'paypal' && (
                    <>
                      <li>1. Enter any email (e.g., test@example.com)</li>
                      <li>2. Enter amount (minimum $28)</li>
                    </>
                  )}
                  {provider === 'bank' && (
                    <>
                      <li>1. Enter any account number (e.g., 1234567890)</li>
                      <li>2. Enter amount (minimum $28)</li>
                    </>
                  )}
                  <li>3. Click "Pay" to simulate deposit</li>
                  <li>4. Balance will update instantly</li>
                </ol>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h3 className="text-lg font-bold text-white mb-4">Current Balance</h3>
                <p className="text-2xl font-bold text-primary-500">
                  KES {user.balance.toFixed(2)}
                </p>
              </div>

              <div className="card">
                <h3 className="text-lg font-bold text-white mb-4">User Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-400">Name: <span className="text-white">{user.fullName}</span></div>
                  <div className="text-gray-400">Email: <span className="text-white">{user.email}</span></div>
                  <div className="text-gray-400">Phone: <span className="text-white">{user.phone}</span></div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-bold text-white mb-4">Security Features</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="text-green-500" size={16} />
                    <span className="text-gray-400">Secure Mobile Money</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="text-blue-500" size={16} />
                    <span className="text-gray-400">Instant Processing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="text-accent-500" size={16} />
                    <span className="text-gray-400">No Hidden Fees</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}