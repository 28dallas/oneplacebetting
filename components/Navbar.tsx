'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X, User, Wallet, LogOut, ChevronDown, CreditCard, History, Settings } from 'lucide-react'
import { authService, type User as UserType } from '@/lib/auth'

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    setUser(authService.getCurrentUser())
  }, [])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    setShowProfileMenu(false)
    router.push('/')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showProfileMenu && !target.closest('.profile-dropdown')) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showProfileMenu])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Sports', href: '/sports' },
    { name: 'Live', href: '/live' },
    { name: 'Casino', href: '/casino' },
    { name: 'Promotions', href: '/promotions' },
  ]

  return (
    <nav className="bg-dark-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-dark-900 font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-white">SportsBet Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <Wallet size={18} />
                  <span>{user.currency} {user.balance.toFixed(2)}</span>
                </button>
                <div className="relative profile-dropdown">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowProfileMenu(!showProfileMenu)
                    }}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <User size={16} />
                    <span>{user.fullName}</span>
                    <ChevronDown size={16} />
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-lg shadow-xl border border-gray-700" style={{zIndex: 9999}}>
                      <Link href="/profile" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors">
                        <User size={16} />
                        <span>My Profile</span>
                      </Link>
                      <Link href="/deposit" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors">
                        <CreditCard size={16} />
                        <span>Deposit</span>
                      </Link>
                      <Link href="/withdrawal" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors">
                        <Wallet size={16} />
                        <span>Withdrawal</span>
                      </Link>
                      <Link href="/dashboard" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors">
                        <History size={16} />
                        <span>Bet History</span>
                      </Link>
                      <button className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors w-full text-left">
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                      <div className="border-t border-gray-700">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center space-x-2 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-dark-700 transition-colors w-full text-left"
                        >
                          <LogOut size={16} />
                          <span>Log out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                  <User size={16} />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-800"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-800 mt-4 space-y-2">
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-gray-300 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium block">
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-full text-center block"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-gray-300 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium block">
                      Login
                    </Link>
                    <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-full text-center block">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}