'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react'
import { authService, type User } from '@/lib/auth'

interface Transaction {
  id: string
  type: string
  amount: number
  provider?: string
  phoneNumber?: string
  status: string
  createdAt: string
}

export default function TransactionsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
    fetchTransactions(currentUser.id)
  }, [router])

  const fetchTransactions = async (userId: string) => {
    try {
      const response = await fetch(`/api/transactions?userId=${userId}`)
      const data = await response.json()
      setTransactions(data.transactions || [])
    } catch (error) {
      console.error('Failed to fetch transactions')
    }
    setLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-500" size={20} />
      case 'failed': return <XCircle className="text-red-500" size={20} />
      default: return <Clock className="text-yellow-500" size={20} />
    }
  }

  const getTypeIcon = (type: string) => {
    return type === 'deposit' ? 
      <ArrowDownLeft className="text-green-500" size={20} /> : 
      <ArrowUpRight className="text-red-500" size={20} />
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
          <h1 className="text-3xl font-bold text-white mb-2">Transaction History</h1>
          <p className="text-gray-400">View all your deposits and withdrawals</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-400">Loading transactions...</div>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400">No transactions found</div>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getTypeIcon(transaction.type)}
                    <div>
                      <div className="font-semibold text-white capitalize">
                        {transaction.type} - {transaction.provider?.toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-400">
                        {transaction.phoneNumber} • {new Date(transaction.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-bold text-white">
                        KES {transaction.amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400 capitalize">
                        {transaction.status}
                      </div>
                    </div>
                    {getStatusIcon(transaction.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}