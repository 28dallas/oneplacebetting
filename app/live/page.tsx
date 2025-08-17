'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Play, Pause, Volume2, BarChart3, Users, Clock } from 'lucide-react'

const liveMatches = [
  {
    id: 1,
    sport: 'Football',
    league: 'Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    homeScore: 2,
    awayScore: 1,
    time: '67\'',
    homeOdds: 1.45,
    drawOdds: 4.20,
    awayOdds: 6.50,
    viewers: '89.2K',
    stats: {
      possession: [65, 35],
      shots: [8, 4],
      corners: [5, 2]
    }
  },
  {
    id: 2,
    sport: 'Basketball',
    league: 'NBA',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    homeScore: 89,
    awayScore: 92,
    time: 'Q3 8:45',
    homeOdds: 2.10,
    drawOdds: null,
    awayOdds: 1.75,
    viewers: '67.5K',
    stats: {
      fieldGoals: [45, 48],
      rebounds: [32, 28],
      assists: [18, 22]
    }
  },
  {
    id: 3,
    sport: 'Tennis',
    league: 'ATP Masters',
    homeTeam: 'Djokovic',
    awayTeam: 'Federer',
    homeScore: 2,
    awayScore: 1,
    time: 'Set 4',
    homeOdds: 1.30,
    drawOdds: null,
    awayOdds: 3.50,
    viewers: '45.8K',
    stats: {
      aces: [12, 8],
      winners: [28, 22],
      unforced: [15, 18]
    }
  }
]

export default function LivePage() {
  const [selectedMatch, setSelectedMatch] = useState(liveMatches[0])
  const [odds, setOdds] = useState(liveMatches)

  // Simulate live odds updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOdds(prevOdds => 
        prevOdds.map(match => ({
          ...match,
          homeOdds: +(match.homeOdds + (Math.random() - 0.5) * 0.1).toFixed(2),
          drawOdds: match.drawOdds ? +(match.drawOdds + (Math.random() - 0.5) * 0.2).toFixed(2) : null,
          awayOdds: +(match.awayOdds + (Math.random() - 0.5) * 0.1).toFixed(2)
        }))
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">Live Betting</h1>
          </div>
          <p className="text-gray-400 text-lg">Real-time odds and live match statistics</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Matches List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-white mb-6">Live Matches</h2>
            <div className="space-y-4">
              {odds.map((match) => (
                <motion.div
                  key={match.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedMatch(match)}
                  className={`card cursor-pointer transition-all duration-300 ${
                    selectedMatch.id === match.id 
                      ? 'border-primary-500 bg-primary-500/5' 
                      : 'hover:border-primary-500/50'
                  }`}
                >
                  {/* Live indicator */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-500 text-sm font-medium">LIVE</span>
                      <span className="text-gray-400 text-sm">{match.sport}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Users size={12} />
                      <span>{match.viewers}</span>
                    </div>
                  </div>

                  {/* Teams and Score */}
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{match.homeTeam}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-white">
                          {match.homeScore} - {match.awayScore}
                        </span>
                        <span className="text-accent-500 text-sm font-medium">{match.time}</span>
                      </div>
                      <span className="text-white font-medium text-sm">{match.awayTeam}</span>
                    </div>
                  </div>

                  {/* Quick Odds */}
                  <div className={`grid ${match.drawOdds ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
                    <div className="text-center bg-dark-700/50 rounded p-2">
                      <div className="text-xs text-gray-400">Home</div>
                      <div className="font-semibold text-primary-500">{match.homeOdds}</div>
                    </div>
                    {match.drawOdds && (
                      <div className="text-center bg-dark-700/50 rounded p-2">
                        <div className="text-xs text-gray-400">Draw</div>
                        <div className="font-semibold text-primary-500">{match.drawOdds}</div>
                      </div>
                    )}
                    <div className="text-center bg-dark-700/50 rounded p-2">
                      <div className="text-xs text-gray-400">Away</div>
                      <div className="font-semibold text-primary-500">{match.awayOdds}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Match View */}
          <div className="lg:col-span-2">
            <motion.div
              key={selectedMatch.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Match Header */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-500 font-medium">LIVE</span>
                      <span className="text-gray-400">{selectedMatch.league}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                      <Play size={20} className="text-primary-500" />
                    </button>
                    <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                      <Volume2 size={20} className="text-gray-400" />
                    </button>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users size={16} />
                      <span>{selectedMatch.viewers}</span>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">{selectedMatch.homeScore}</div>
                      <div className="text-lg text-gray-300">{selectedMatch.homeTeam}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-gray-400 mb-2">-</div>
                      <div className="text-accent-500 font-bold">{selectedMatch.time}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">{selectedMatch.awayScore}</div>
                      <div className="text-lg text-gray-300">{selectedMatch.awayTeam}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Odds */}
              <div className="card">
                <h3 className="text-xl font-bold text-white mb-4">Live Odds</h3>
                <div className={`grid ${selectedMatch.drawOdds ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="odds-button bg-dark-700/50 hover:bg-primary-600/20 border-primary-500/30 p-4"
                  >
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-2">{selectedMatch.homeTeam}</div>
                      <div className="text-2xl font-bold text-primary-500">{selectedMatch.homeOdds}</div>
                    </div>
                  </motion.button>

                  {selectedMatch.drawOdds && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="odds-button bg-dark-700/50 hover:bg-primary-600/20 border-primary-500/30 p-4"
                    >
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-2">Draw</div>
                        <div className="text-2xl font-bold text-primary-500">{selectedMatch.drawOdds}</div>
                      </div>
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="odds-button bg-dark-700/50 hover:bg-primary-600/20 border-primary-500/30 p-4"
                  >
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-2">{selectedMatch.awayTeam}</div>
                      <div className="text-2xl font-bold text-primary-500">{selectedMatch.awayOdds}</div>
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Match Statistics */}
              <div className="card">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <BarChart3 className="mr-2" size={20} />
                  Live Statistics
                </h3>
                <div className="space-y-4">
                  {Object.entries(selectedMatch.stats).map(([stat, values]) => (
                    <div key={stat} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 capitalize">{stat}</span>
                        <div className="flex space-x-4">
                          <span className="text-white font-semibold">{values[0]}</span>
                          <span className="text-white font-semibold">{values[1]}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${(values[0] / (values[0] + values[1])) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-accent-500 h-2 rounded-full"
                          style={{ width: `${(values[1] / (values[0] + values[1])) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}