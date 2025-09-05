'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { X, ChevronDown } from 'lucide-react'
import { authService } from '@/lib/auth'

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    country: 'United Kingdom',
    currency: 'EUR',
    email: '',
    promoCode: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })

  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)
  const [currentFlag, setCurrentFlag] = useState('🇬🇧')

  const countryFlags: { [key: string]: string } = {
    '1': '🇺🇸', // US/Canada
    '44': '🇬🇧', // UK
    '254': '🇰🇪', // Kenya
    '234': '🇳🇬', // Nigeria
    '27': '🇿🇦', // South Africa
    '233': '🇬🇭', // Ghana
    '256': '🇺🇬', // Uganda
    '49': '🇩🇪', // Germany
    '33': '🇫🇷', // France
    '34': '🇪🇸', // Spain
    '39': '🇮🇹', // Italy
    '31': '🇳🇱', // Netherlands
    '91': '🇮🇳', // India
    '86': '🇨🇳', // China
    '81': '🇯🇵', // Japan
    '61': '🇦🇺', // Australia
    '55': '🇧🇷', // Brazil
  }

  const detectCountryFromPhone = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '')
    
    // Check for common country codes
    for (const [code, flag] of Object.entries(countryFlags)) {
      if (cleanPhone.startsWith(code)) {
        return flag
      }
    }
    
    // Default to UK flag
    return '🇬🇧'
  }

  const countries = [
    'United Kingdom', 'Ireland', 'Malta', 'Gibraltar', 'Australia', 'New Zealand',
    'Canada', 'Germany', 'Austria', 'Netherlands', 'Belgium', 'Denmark', 'Sweden',
    'Norway', 'Finland', 'Spain', 'Italy', 'France', 'Portugal', 'Switzerland',
    'Czech Republic', 'Poland', 'Hungary', 'Romania', 'Bulgaria', 'Croatia',
    'Slovenia', 'Slovakia', 'Estonia', 'Latvia', 'Lithuania', 'Cyprus',
    'South Africa', 'Kenya', 'Nigeria', 'Ghana', 'Uganda', 'Tanzania',
    'Zambia', 'Zimbabwe', 'Botswana', 'Namibia', 'India', 'Philippines',
    'Malaysia', 'Singapore', 'Thailand', 'Vietnam', 'Indonesia', 'Japan',
    'South Korea', 'Hong Kong', 'Macau', 'Taiwan', 'Brazil', 'Argentina',
    'Chile', 'Colombia', 'Peru', 'Uruguay', 'Paraguay', 'Ecuador', 'Mexico'
  ]
  const currencies = ['EUR', 'USD', 'GBP', 'AUD', 'CAD', 'SEK', 'NOK', 'DKK', 'CHF', 'ZAR', 'KES', 'NGN', 'INR', 'PHP', 'MYR', 'SGD', 'THB', 'BRL', 'ARS', 'CLP', 'COP', 'PEN', 'MXN']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      await authService.signup({
        email: formData.email,
        fullName: formData.fullName,
        phone: formData.phone,
        country: formData.country,
        currency: formData.currency
      })
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    
    // Update flag when phone number changes
    if (name === 'phone') {
      const newFlag = detectCountryFromPhone(value)
      setCurrentFlag(newFlag)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
      >
        {/* Close Button */}
        <Link href="/" className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign Up</h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              name="fullName"
              type="text"
              required
              placeholder="Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Phone Number */}
          <div className="flex">
            <div className="flex items-center bg-gray-100 rounded-l-lg px-3 border-r border-gray-300">
              <span className="text-sm">{currentFlag}</span>
              <ChevronDown size={16} className="ml-1 text-gray-500" />
            </div>
            <input
              name="phone"
              type="tel"
              required
              placeholder="Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-r-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Country Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center justify-between"
            >
              <span>{formData.country}</span>
              <div className="flex items-center">
                <ChevronDown size={16} className="text-gray-500" />
                <div className="w-8 h-6 bg-primary-500 rounded ml-2"></div>
              </div>
            </button>
            {showCountryDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, country })
                      setShowCountryDropdown(false)
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-900"
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center justify-between"
            >
              <span>{formData.currency}</span>
              <div className="flex items-center">
                <ChevronDown size={16} className="text-gray-500" />
                <div className="w-8 h-6 bg-primary-500 rounded ml-2"></div>
              </div>
            </button>
            {showCurrencyDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {currencies.map((currency) => (
                  <button
                    key={currency}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, currency })
                      setShowCurrencyDropdown(false)
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-900"
                  >
                    {currency}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Promo Code */}
          <div>
            <input
              name="promoCode"
              type="text"
              placeholder="Promo"
              value={formData.promoCode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Password */}
          <div>
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              name="confirmPassword"
              type="password"
              required
              placeholder="New Password Confirmation"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3 mt-6">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              required
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-600">
              I accept{' '}
              <Link href="/terms" className="text-blue-500 hover:text-blue-600 underline">
                terms of use
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.acceptTerms || loading}
            className="w-full mt-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-500 hover:text-primary-600 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}