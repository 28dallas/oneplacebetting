'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react'
import { useBetting } from '@/lib/betting'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [users, setUsers] = useState<any[]>([])
  const { userBets, settleBet } = useBetting()

  useEffect(() => {
    const storedUsers = window.localStorage.getItem('users')
    setUsers(storedUsers ? JSON.parse(storedUsers) : [])
  }, [])

  const totalUsers = users.length
  const totalBets = userBets.length
  const totalStakes = userBets.reduce((sum, bet) => sum + bet.stake, 0)
  const pendingBets = userBets.filter(bet => bet.status === 'pending')

  const handleSettleBet = (betId: string, result: 'won' | 'lost') => {
    settleBet(betId, result)
  }

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage users, bets, and platform settings</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="card bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Bets</p>
                <p className="text-2xl font-bold text-white">{totalBets}</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Stakes</p>
                <p className="text-2xl font-bold text-white">${totalStakes.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Bets</p>
                <p className="text-2xl font-bold text-white">{pendingBets.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-dark-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Pending Bets
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Users
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Pending Bets ({pendingBets.length})</h2>
              {pendingBets.map((bet) => (
                <div key={bet.id} className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-white font-semibold">{bet.match}</p>
                          <p className="text-gray-400 text-sm">{bet.sport} • {bet.selection}</p>
                          <p className="text-gray-400 text-sm">Stake: ${bet.stake} @ {bet.odds}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-gray-300">Potential Win: ${bet.potentialWin.toFixed(2)}</p>
                      <p className="text-gray-400 text-sm">{new Date(bet.placedAt).toLocaleString()}</p>
                    </div>
                    
                    <div className="ml-6 space-x-2">
                      <button
                        onClick={() => handleSettleBet(bet.id, 'won')}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Win
                      </button>
                      <button
                        onClick={() => handleSettleBet(bet.id, 'lost')}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Lose
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Users ({totalUsers})</h2>
              {users.map((user: any) => (
                <div key={user.id} className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">{user.fullName}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white">Balance: {user.currency} {user.balance.toFixed(2)}</p>
                      <p className="text-gray-400 text-sm">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
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
