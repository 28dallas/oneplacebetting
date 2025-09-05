'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, Shield, Clock, AlertTriangle } from 'lucide-react'
import { authService, type User } from '@/lib/auth'

export default function WithdrawalPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [amount, setAmount] = useState('')
  const [accountInfo, setAccountInfo] = useState('')
  const [provider, setProvider] = useState('mpesa')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !amount || !accountInfo) {
      alert('Please fill in all fields')
      return
    }

    const withdrawAmount = parseFloat(amount)
    if (withdrawAmount < 28000) {
      alert('Minimum withdrawal amount is $28,000')
      return
    }

    if (withdrawAmount > user.balance) {
      alert('Insufficient balance')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/withdrawal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          amount: withdrawAmount,
          provider,
          accountInfo
        })
      })

      const result = await response.json()

      if (result.success) {
        alert('Withdrawal request submitted! Awaiting admin approval.')
        setAmount('')
        setAccountInfo('')
      } else {
        alert('Withdrawal failed: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      alert('Withdrawal failed. Please try again.')
    }

    setLoading(false)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Withdraw Funds</h1>
          <p className="text-gray-400">Request withdrawal from your account</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h2 className="text-xl font-bold text-white mb-6">Withdrawal Request</h2>
              
              <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="text-yellow-500" size={20} />
                  <h3 className="font-bold text-yellow-400">Important Notice</h3>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• All withdrawals require admin approval</li>
                  <li>• Processing time: 10-15 mins</li>
                  <li>• Funds will be deducted after approval</li>
                </ul>
              </div>

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
                    <div className="font-bold text-white">Bank</div>
                  </div>
                </button>

                <button
                  onClick={() => setProvider('crypto')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    provider === 'crypto'
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">₿</div>
                    <div className="font-bold text-white">Crypto</div>
                  </div>
                </button>
              </div>

              <form onSubmit={handleWithdrawal} className="space-y-6">
                <div>
                  <label className="block text-white mb-2">
                    {provider === 'mpesa' ? 'Phone Number' : 
                     provider === 'paypal' ? 'PayPal Email' :
                     provider === 'bank' ? 'Account Number' : 'Wallet Address'}
                  </label>
                  <input
                    type="text"
                    value={accountInfo}
                    onChange={(e) => setAccountInfo(e.target.value)}
                    placeholder={
                      provider === 'mpesa' ? '254712345678' :
                      provider === 'paypal' ? 'your@email.com' :
                      provider === 'bank' ? '1234567890' : 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Amount ($)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="28000"
                    step="1"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                  <p className="text-sm text-gray-400 mt-1">Minimum: $28,000</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <ArrowUpRight size={20} />
                  <span>{loading ? 'Processing...' : `Request Withdrawal of $${amount || '0'}`}</span>
                </button>
              </form>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h3 className="text-lg font-bold text-white mb-4">Available Balance</h3>
                <p className="text-2xl font-bold text-primary-500">
                  ${user.balance.toFixed(2)}
                </p>
              </div>

              <div className="card">
                <h3 className="text-lg font-bold text-white mb-4">Withdrawal Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="text-green-500" size={16} />
                    <span className="text-gray-400">Admin Approved</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="text-blue-500" size={16} />
                    <span className="text-gray-400">10-15 mins</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="text-yellow-500" size={16} />
                    <span className="text-gray-400">$28,000 Minimum</span>
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