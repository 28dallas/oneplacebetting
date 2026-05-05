'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Play, TrendingUp, TrendingDown } from 'lucide-react'

const liveMatches = [
  {
    id: 1,
    sport: 'Football',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    homeScore: 2,
    awayScore: 1,
    time: '67\'',
    homeOdds: 1.45,
    awayOdds: 2.85,
    status: 'live'
  },
  {
    id: 2,
    sport: 'Basketball',
    homeTeam: 'Celtics',
    awayTeam: 'Heat',
    homeScore: 89,
    awayScore: 92,
    time: 'Q3 8:45',
    homeOdds: 2.10,
    awayOdds: 1.75,
    status: 'live'
  },
  {
    id: 3,
    sport: 'Tennis',
    homeTeam: 'Sinner',
    awayTeam: 'Alcaraz',
    homeScore: 2,
    awayScore: 1,
    time: 'Set 4',
    homeOdds: 1.65,
    awayOdds: 2.25,
    status: 'live'
  }
]

export default function LiveBetting() {
  const [odds, setOdds] = useState(liveMatches)

  // Simulate live odds updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOdds(prevOdds => 
        prevOdds.map(match => ({
          ...match,
          homeOdds: +(match.homeOdds + (Math.random() - 0.5) * 0.1).toFixed(2),
          awayOdds: +(match.awayOdds + (Math.random() - 0.5) * 0.1).toFixed(2)
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section>
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Live Betting
          </h2>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Bet on live matches with real-time odds updates
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {odds.map((match, index) => (
          <motion.div
            key={match.id}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card border-red-500/20 bg-gradient-to-br from-dark-800 to-dark-900"
          >
            {/* Live indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-500 text-sm font-medium">LIVE</span>
                <span className="text-gray-400 text-sm">{match.sport}</span>
              </div>
              <span className="text-accent-500 font-bold">{match.time}</span>
            </div>

            {/* Score */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{match.homeTeam}</span>
                <span className="text-2xl font-bold text-white">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="text-white font-medium">{match.awayTeam}</span>
              </div>
            </div>

            {/* Live odds */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="odds-button bg-dark-700/50 hover:bg-primary-600/20 border-primary-500/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{match.homeTeam}</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold">{match.homeOdds}</span>
                    <TrendingUp size={12} className="text-green-500" />
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="odds-button bg-dark-700/50 hover:bg-primary-600/20 border-primary-500/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{match.awayTeam}</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold">{match.awayOdds}</span>
                    <TrendingDown size={12} className="text-red-500" />
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Watch live */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <button className="w-full flex items-center justify-center space-x-2 text-primary-500 hover:text-primary-400 transition-colors">
                <Play size={16} />
                <span className="text-sm font-medium">Watch Live</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
