'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Clock, Users, DollarSign } from 'lucide-react'

interface WithdrawalRequest {
  id: string
  userId: string
  amount: number
  provider: string
  phoneNumber: string
  status: string
  createdAt: string
  user: {
    fullName: string
    email: string
  }
}

export default function AdminPage() {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWithdrawals()
  }, [])

  const fetchWithdrawals = async () => {
    try {
      const response = await fetch('/api/admin/withdrawals')
      const data = await response.json()
      setWithdrawals(data.withdrawals || [])
    } catch (error) {
      console.error('Failed to fetch withdrawals')
    }
    setLoading(false)
  }

  const handleApproval = async (withdrawalId: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch('/api/admin/withdrawals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ withdrawalId, action })
      })

      if (response.ok) {
        fetchWithdrawals() // Refresh list
        alert(`Withdrawal ${action}d successfully`)
      }
    } catch (error) {
      alert('Action failed')
    }
  }

  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending_approval')
  const totalPending = pendingWithdrawals.reduce((sum, w) => sum + w.amount, 0)

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage withdrawal requests</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center space-x-4">
              <Clock className="text-yellow-500" size={32} />
              <div>
                <div className="text-2xl font-bold text-white">{pendingWithdrawals.length}</div>
                <div className="text-gray-400">Pending Requests</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-4">
              <DollarSign className="text-green-500" size={32} />
              <div>
                <div className="text-2xl font-bold text-white">${totalPending.toLocaleString()}</div>
                <div className="text-gray-400">Total Pending</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-4">
              <Users className="text-blue-500" size={32} />
              <div>
                <div className="text-2xl font-bold text-white">{withdrawals.length}</div>
                <div className="text-gray-400">Total Requests</div>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-xl font-bold text-white mb-6">Withdrawal Requests</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-400">Loading requests...</div>
            </div>
          ) : withdrawals.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400">No withdrawal requests</div>
            </div>
          ) : (
            <div className="space-y-4">
              {withdrawals.map((withdrawal) => (
                <div key={withdrawal.id} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <div>
                          <div className="font-semibold text-white">{withdrawal.user.fullName}</div>
                          <div className="text-sm text-gray-400">{withdrawal.user.email}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-white">${withdrawal.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">{withdrawal.provider.toUpperCase()}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        Account: {withdrawal.phoneNumber} • {new Date(withdrawal.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {withdrawal.status === 'pending_approval' ? (
                        <>
                          <button
                            onClick={() => handleApproval(withdrawal.id, 'approve')}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center space-x-2"
                          >
                            <CheckCircle size={16} />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleApproval(withdrawal.id, 'reject')}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center space-x-2"
                          >
                            <XCircle size={16} />
                            <span>Reject</span>
                          </button>
                        </>
                      ) : (
                        <div className={`px-4 py-2 rounded-lg ${
                          withdrawal.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          withdrawal.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {withdrawal.status.replace('_', ' ').toUpperCase()}
                        </div>
                      )}
                    </div>
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