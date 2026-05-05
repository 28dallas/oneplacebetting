'use client'

import { motion } from 'framer-motion'
import { X, Trash2, Calculator } from 'lucide-react'
import { useBetSlip } from '@/lib/betSlip'
import { useBetting } from '@/lib/betting'
import { authService } from '@/lib/auth'
import { validateBet } from '@/lib/validation'
import { useEffect, useState } from 'react'
import { useOdds } from '@/lib/oddsContext'

export default function BetSlip() {
  const { bets, removeBet, updateStake, clearAll, getTotalStake, getTotalPayout, isOpen, toggleBetSlip } = useBetSlip()
  const { placeBet } = useBetting()
  const { convert } = useOdds()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<ReturnType<typeof authService.getCurrentUser>>(null)

  useEffect(() => {
    setUser(authService.getCurrentUser())
  }, [])
  
  const handlePlaceBets = async () => {
    if (!user) {
      setError('Please login to place bets')
      return
    }
    
    const validBets = bets.filter(bet => bet.stake > 0)
    if (validBets.length === 0) {
      setError('Please add stakes to your bets')
      return
    }
    
    // Validate all bets
    const totalStake = validBets.reduce((sum, bet) => sum + bet.stake, 0)
    const validation = validateBet(totalStake, user.balance)
    if (!validation.isValid) {
      setError(validation.errors[0])
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      for (const bet of validBets) {
        const betValidation = validateBet(bet.stake, user.balance)
        if (!betValidation.isValid) {
          setError(betValidation.errors[0])
          return
        }
        
        await placeBet({
          eventId: bet.eventId,
          selection: bet.selection,
          odds: bet.odds,
          stake: bet.stake,
          potentialWin: bet.stake * bet.odds,
          match: bet.match,
          sport: bet.sport
        })
      }
      clearAll()
      alert('Bets placed successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place bets')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed right-0 top-0 h-full w-80 bg-dark-900 border-l border-gray-700 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-lg font-bold text-white">Bet Slip</h3>
        <button onClick={toggleBetSlip} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Bets */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {bets.length === 0 ? (
          <div className="text-center py-8">
            <Calculator className="mx-auto mb-2 text-gray-500" size={32} />
            <p className="text-gray-400">No bets selected</p>
          </div>
        ) : (
          bets.map((bet) => (
            <motion.div
              key={bet.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800 rounded-lg p-3"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{bet.match}</p>
                  <p className="text-gray-400 text-xs">{bet.selection}</p>
                </div>
                <button
                  onClick={() => removeBet(bet.id)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary-500 font-semibold">{convert(bet.odds)}</span>
                <span className="text-xs text-gray-400">{bet.sport}</span>
              </div>

              <input
                type="number"
                placeholder="Stake ($1 - $10,000)"
                min="1"
                max="10000"
                step="0.01"
                value={bet.stake || ''}
                onChange={(e) => updateStake(bet.id, parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1 bg-dark-700 border border-gray-600 rounded text-white text-sm"
              />
              
              {bet.stake > 0 && (
                <p className="text-green-500 text-xs mt-1">
                  Win: ${(bet.stake * bet.odds).toFixed(2)}
                </p>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      {bets.length > 0 && (
        <div className="p-4 border-t border-gray-700">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Stake:</span>
              <span className="text-white">${getTotalStake().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Potential Win:</span>
              <span className="text-green-500 font-semibold">${getTotalPayout().toFixed(2)}</span>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-3 py-2 rounded text-sm mb-3">
              {error}
            </div>
          )}
          
          {user && (
            <div className="text-sm text-gray-400 mb-3">
              Balance: ${user.balance.toFixed(2)}
            </div>
          )}
          
          <div className="space-y-2">
            <button 
              onClick={handlePlaceBets}
              disabled={loading || getTotalStake() === 0}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Placing Bets...' : 'Place Bet'}
            </button>
            <button
              onClick={clearAll}
              className="w-full text-gray-400 hover:text-white text-sm"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
