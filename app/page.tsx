'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import FeaturedEvents from '@/components/FeaturedEvents'
import PopularSports from '@/components/PopularSports'
import LiveBetting from '@/components/LiveBetting'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <FeaturedEvents />
        <PopularSports />
        <LiveBetting />
      </div>
    </div>
  )
}