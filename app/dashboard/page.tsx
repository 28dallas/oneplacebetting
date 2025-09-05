'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Wallet, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, Plus, Minus } from 'lucide-react'
import { authService, type User } from '@/lib/auth'



const activeBets = [
  {
    id: 1,
    sport: 'Football',
    match: 'Manchester City vs Liverpool',
    bet: 'Manchester City to Win',
    odds: 2.10,
    stake: 50,
    potentialWin: 105,
    status: 'active',
    time: '15:30 Today'
  },
  {
    id: 2,
    sport: 'Basketball',
    match: 'Lakers vs Warriors',
    bet: 'Over 220.5 Points',
    odds: 1.85,
    stake: 25,
    potentialWin: 46.25,
    status: 'active',
    time: '20:00 Today'
  }
]

const betHistory = [
  {
    id: 1,
    sport: 'Tennis',
    match: 'Djokovic vs Nadal',
    bet: 'Djokovic to Win',
    odds: 1.75,
    stake: 100,
    result: 'won',
    payout: 175,
    date: '2024-01-15'
  },
  {
    id: 2,
    sport: 'Football',
    match: 'Arsenal vs Chelsea',
    bet: 'Draw',
    odds: 3.20,
    stake: 30,
    result: 'lost',
    payout: 0,
    date: '2024-01-14'
  },
  {
    id: 3,
    sport: 'Basketball',
    match: 'Celtics vs Heat',
    bet: 'Celtics -5.5',
    odds: 1.90,
    stake: 75,
    result: 'won',
    payout: 142.50,
    date: '2024-01-13'
  }
]

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Welcome back, {user.fullName}
          </h1>
          <p className="text-gray-400">Manage your bets and track your performance</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="card bg-gradient-to-br from-primary-500/10 to-primary-600/5 border-primary-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current Balance</p>
                <p className="text-2xl font-bold text-white">{user.currency} {user.balance.toFixed(2)}</p>
              </div>
              <Wallet className="w-8 h-8 text-primary-500" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Winnings</p>
                <p className="text-2xl font-bold text-white">{user.currency} 0.00</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Losses</p>
                <p className="text-2xl font-bold text-white">{user.currency} 0.00</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-accent-500/10 to-accent-600/5 border-accent-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Win Rate</p>
                <p className="text-2xl font-bold text-white">0%</p>
              </div>
              <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                <span className="text-dark-900 font-bold text-sm">0</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="btn-primary flex items-center justify-center space-x-2">
              <Plus size={18} />
              <span>Deposit</span>
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2">
              <Minus size={18} />
              <span>Withdraw</span>
            </button>
            <button className="bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg transition-colors">
              View Promotions
            </button>
            <button className="bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg transition-colors">
              Live Betting
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
              Active Bets
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Bet History
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
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Active Bets ({activeBets.length})</h2>
              {activeBets.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {activeBets.map((bet) => (
                    <div key={bet.id} className="card border-accent-500/20">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-accent-500 text-sm font-medium">{bet.sport}</span>
                          <p className="text-white font-semibold">{bet.match}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock size={16} className="text-gray-400" />
                          <span className="text-gray-400 text-sm">{bet.time}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-300">Bet: <span className="text-white">{bet.bet}</span></p>
                        <p className="text-gray-300">Odds: <span className="text-primary-500 font-semibold">{bet.odds}</span></p>
                        <p className="text-gray-300">Stake: <span className="text-white">${bet.stake}</span></p>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                        <span className="text-gray-400">Potential Win:</span>
                        <span className="text-green-500 font-bold">${bet.potentialWin}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">No active bets</p>
                  <button className="btn-primary">Place Your First Bet</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Bet History</h2>
              <div className="space-y-4">
                {betHistory.map((bet) => (
                  <div key={bet.id} className="card">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            bet.result === 'won' ? 'bg-green-500/20' : 'bg-red-500/20'
                          }`}>
                            {bet.result === 'won' ? (
                              <CheckCircle size={16} className="text-green-500" />
                            ) : (
                              <XCircle size={16} className="text-red-500" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-semibold">{bet.match}</p>
                            <p className="text-gray-400 text-sm">{bet.sport} • {bet.date}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-gray-300">Bet: {bet.bet}</p>
                        <p className="text-gray-400 text-sm">Stake: ${bet.stake} @ {bet.odds}</p>
                      </div>
                      
                      <div className="text-right ml-6">
                        <p className={`font-bold ${
                          bet.result === 'won' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {bet.result === 'won' ? '+' : '-'}${bet.result === 'won' ? bet.payout : bet.stake}
                        </p>
                        <p className="text-gray-400 text-sm capitalize">{bet.result}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}