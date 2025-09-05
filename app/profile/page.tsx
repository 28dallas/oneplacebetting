'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, MapPin, DollarSign, Calendar, Edit } from 'lucide-react'
import { authService, type User as UserType } from '@/lib/auth'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
    setLoading(false)
  }, [router])

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your account information</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card text-center">
              <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={40} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{user.fullName}</h2>
              <p className="text-gray-400 mb-4">{user.email}</p>
              <div className="text-sm text-gray-400">
                <p>Member since {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Account Information</h3>
                <button className="btn-secondary flex items-center space-x-2">
                  <Edit size={16} />
                  <span>Edit Profile</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="text-primary-500" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Full Name</p>
                      <p className="text-white">{user.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="text-primary-500" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="text-primary-500" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white">{user.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-primary-500" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Country</p>
                      <p className="text-white">{user.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <DollarSign className="text-primary-500" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Currency</p>
                      <p className="text-white">{user.currency}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="text-primary-500" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Member Since</p>
                      <p className="text-white">{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Account Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <div className="card">
            <h3 className="text-xl font-bold text-white mb-6">Account Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-500">{user.currency} {user.balance.toFixed(2)}</p>
                <p className="text-gray-400 text-sm">Current Balance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">0</p>
                <p className="text-gray-400 text-sm">Total Bets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-500">0%</p>
                <p className="text-gray-400 text-sm">Win Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">{user.currency} 0.00</p>
                <p className="text-gray-400 text-sm">Total Winnings</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}