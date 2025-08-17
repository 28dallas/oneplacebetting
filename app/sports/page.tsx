'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Filter, Clock, Users } from 'lucide-react'

const sportsData = [
  {
    category: 'Football',
    matches: [
      {
        id: 1,
        league: 'Premier League',
        homeTeam: 'Manchester United',
        awayTeam: 'Arsenal',
        time: '16:30',
        date: 'Today',
        homeOdds: '2.45',
        drawOdds: '3.20',
        awayOdds: '2.90',
        viewers: '67.2K'
      },
      {
        id: 2,
        league: 'La Liga',
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        time: '21:00',
        date: 'Today',
        homeOdds: '2.10',
        drawOdds: '3.40',
        awayOdds: '3.50',
        viewers: '89.1K'
      }
    ]
  },
  {
    category: 'Basketball',
    matches: [
      {
        id: 3,
        league: 'NBA',
        homeTeam: 'Boston Celtics',
        awayTeam: 'Miami Heat',
        time: '20:00',
        date: 'Today',
        homeOdds: '1.85',
        drawOdds: null,
        awayOdds: '1.95',
        viewers: '45.3K'
      }
    ]
  },
  {
    category: 'Tennis',
    matches: [
      {
        id: 4,
        league: 'ATP Masters',
        homeTeam: 'Novak Djokovic',
        awayTeam: 'Rafael Nadal',
        time: '14:00',
        date: 'Tomorrow',
        homeOdds: '1.75',
        drawOdds: null,
        awayOdds: '2.05',
        viewers: '32.7K'
      }
    ]
  }
]

export default function SportsPage() {
  const [selectedSport, setSelectedSport] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const sportCategories = ['All', 'Football', 'Basketball', 'Tennis', 'Baseball', 'Hockey']

  const filteredData = selectedSport === 'All' 
    ? sportsData 
    : sportsData.filter(sport => sport.category === selectedSport)

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Sports Betting</h1>
          <p className="text-gray-400 text-lg">Find the best odds on all your favorite sports</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search teams, leagues, or matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Sport Categories */}
          <div className="flex flex-wrap gap-2">
            {sportCategories.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSport === sport
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Sports Sections */}
        <div className="space-y-8">
          {filteredData.map((sportCategory, categoryIndex) => (
            <motion.div
              key={sportCategory.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                {sportCategory.category}
                <span className="ml-3 text-sm bg-primary-600 text-white px-2 py-1 rounded-full">
                  {sportCategory.matches.length} matches
                </span>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sportCategory.matches.map((match, matchIndex) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: matchIndex * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="card hover:border-primary-500/50 transition-all duration-300"
                  >
                    {/* Match Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-primary-500 text-sm font-medium">{match.league}</span>
                        <p className="text-gray-400 text-xs">{match.date}</p>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock size={12} />
                          <span>{match.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={12} />
                          <span>{match.viewers}</span>
                        </div>
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium text-lg">{match.homeTeam}</span>
                        <span className="text-gray-400 text-sm">vs</span>
                        <span className="text-white font-medium text-lg">{match.awayTeam}</span>
                      </div>
                    </div>

                    {/* Odds */}
                    <div className={`grid ${match.drawOdds ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                      <button className="odds-button text-center">
                        <div className="text-xs text-gray-400 mb-1">Home</div>
                        <div className="font-semibold text-lg">{match.homeOdds}</div>
                      </button>
                      
                      {match.drawOdds && (
                        <button className="odds-button text-center">
                          <div className="text-xs text-gray-400 mb-1">Draw</div>
                          <div className="font-semibold text-lg">{match.drawOdds}</div>
                        </button>
                      )}
                      
                      <button className="odds-button text-center">
                        <div className="text-xs text-gray-400 mb-1">Away</div>
                        <div className="font-semibold text-lg">{match.awayOdds}</div>
                      </button>
                    </div>

                    {/* More Markets */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <button className="w-full text-primary-500 hover:text-primary-400 text-sm font-medium transition-colors">
                        +25 More Markets
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}