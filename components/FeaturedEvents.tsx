'use client'

import { motion } from 'framer-motion'
import { Clock, Users, TrendingUp } from 'lucide-react'

const featuredEvents = [
  {
    id: 1,
    sport: 'Football',
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    homeOdds: '2.10',
    drawOdds: '3.40',
    awayOdds: '3.20',
    time: '15:30',
    date: 'Today',
    viewers: '45.2K'
  },
  {
    id: 2,
    sport: 'Basketball',
    league: 'NBA',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    homeOdds: '1.85',
    drawOdds: null,
    awayOdds: '1.95',
    time: '20:00',
    date: 'Today',
    viewers: '32.1K'
  },
  {
    id: 3,
    sport: 'Tennis',
    league: 'ATP Masters',
    homeTeam: 'Djokovic',
    awayTeam: 'Nadal',
    homeOdds: '1.75',
    drawOdds: null,
    awayOdds: '2.05',
    time: '14:00',
    date: 'Tomorrow',
    viewers: '28.5K'
  }
]

export default function FeaturedEvents() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Featured Events
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Don't miss out on today's biggest matches with the best odds
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {featuredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card hover:border-primary-500/50 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-primary-500 text-sm font-medium">{event.sport}</span>
                <p className="text-gray-400 text-xs">{event.league}</p>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock size={12} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users size={12} />
                  <span>{event.viewers}</span>
                </div>
              </div>
            </div>

            {/* Teams */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{event.homeTeam}</span>
                <span className="text-sm text-gray-400">vs</span>
                <span className="text-white font-medium">{event.awayTeam}</span>
              </div>
            </div>

            {/* Odds */}
            <div className="grid grid-cols-3 gap-2">
              <button className="odds-button text-center">
                <div className="text-xs text-gray-400 mb-1">1</div>
                <div className="font-semibold">{event.homeOdds}</div>
              </button>
              
              {event.drawOdds && (
                <button className="odds-button text-center">
                  <div className="text-xs text-gray-400 mb-1">X</div>
                  <div className="font-semibold">{event.drawOdds}</div>
                </button>
              )}
              
              <button className="odds-button text-center">
                <div className="text-xs text-gray-400 mb-1">2</div>
                <div className="font-semibold">{event.awayOdds}</div>
              </button>
            </div>

            {/* Live indicator */}
            {event.date === 'Today' && (
              <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2 text-primary-500">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Soon</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}