'use client'

import { motion } from 'framer-motion'
import { Play, TrendingUp, Shield, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2"
              >
                <Zap className="w-4 h-4 text-primary-500" />
                <span className="text-primary-500 text-sm font-medium">Live Betting Available</span>
              </motion.div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Bet on Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
                  {' '}Favorite Sports
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-lg">
                Experience the thrill of sports betting with competitive odds, live updates, and secure transactions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Start Betting</span>
              </button>
              <button className="btn-secondary flex items-center justify-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>View Live Odds</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-primary-500" />
                </div>
                <p className="text-sm text-gray-300">Secure & Licensed</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-accent-500" />
                </div>
                <p className="text-sm text-gray-300">Instant Payouts</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-primary-500" />
                </div>
                <p className="text-sm text-gray-300">Best Odds</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="card bg-gradient-to-br from-primary-500/10 to-primary-600/5 border-primary-500/20"
              >
                <h3 className="text-2xl font-bold text-primary-500">50K+</h3>
                <p className="text-gray-300">Active Users</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="card bg-gradient-to-br from-accent-500/10 to-accent-600/5 border-accent-500/20"
              >
                <h3 className="text-2xl font-bold text-accent-500">$2M+</h3>
                <p className="text-gray-300">Daily Volume</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="card bg-gradient-to-br from-primary-500/10 to-primary-600/5 border-primary-500/20"
              >
                <h3 className="text-2xl font-bold text-primary-500">25+</h3>
                <p className="text-gray-300">Sports Available</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="card bg-gradient-to-br from-accent-500/10 to-accent-600/5 border-accent-500/20"
              >
                <h3 className="text-2xl font-bold text-accent-500">24/7</h3>
                <p className="text-gray-300">Live Support</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}