import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-dark-900 font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-white">SportsBet Pro</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your premier destination for sports betting with competitive odds, live betting, and secure transactions.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-primary-500 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-primary-500 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-primary-500 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-primary-500">About Us</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-primary-500">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-primary-500">Privacy Policy</Link></li>
              <li><Link href="/responsible-gaming" className="text-gray-400 hover:text-primary-500">Responsible Gaming</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={16} />
                <span>support@sportsbet.pro</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 SportsBet Pro. All rights reserved. | 18+ Only | Gamble Responsibly
          </p>
        </div>
      </div>
    </footer>
  )
}