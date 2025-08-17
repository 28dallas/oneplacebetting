'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const sports = [
  {
    name: 'Football',
    icon: '⚽',
    matches: 156,
    color: 'from-green-500 to-green-600'
  },
  {
    name: 'Basketball',
    icon: '🏀',
    matches: 89,
    color: 'from-orange-500 to-orange-600'
  },
  {
    name: 'Tennis',
    icon: '🎾',
    matches: 67,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    name: 'Baseball',
    icon: '⚾',
    matches: 45,
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Hockey',
    icon: '🏒',
    matches: 34,
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Boxing',
    icon: '🥊',
    matches: 23,
    color: 'from-red-500 to-red-600'
  }
]

export default function PopularSports() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Popular Sports
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore betting opportunities across all major sports
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sports.map((sport, index) => (
          <motion.div
            key={sport.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Link href={`/sports/${sport.name.toLowerCase()}`}>
              <div className="card hover:border-primary-500/50 transition-all duration-300 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${sport.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl`}>
                  {sport.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{sport.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{sport.matches} matches</p>
                <div className="flex items-center justify-center text-primary-500 group-hover:text-primary-400 transition-colors">
                  <span className="text-sm font-medium mr-1">View All</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}