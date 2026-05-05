'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import { RefreshCw, Wifi, WifiOff } from 'lucide-react'
import { useOdds } from '@/lib/oddsContext'
import { useBetSlip } from '@/lib/betSlip'

interface LiveMatch {
  id: string
  sport: string
  league: string
  homeTeam: string
  awayTeam: string
  startTime: string
  status: string
  homeOdds: number
  drawOdds: number | null
  awayOdds: number
}

// Static fallback for when no API key is set
const FALLBACK: LiveMatch[] = [
  { id: 'l1', sport: 'Football', league: 'Premier League', homeTeam: 'Arsenal', awayTeam: 'Chelsea', startTime: "67'", status: 'live', homeOdds: 1.45, drawOdds: 4.20, awayOdds: 6.50 },
  { id: 'l2', sport: 'Basketball', league: 'NBA', homeTeam: 'Lakers', awayTeam: 'Warriors', startTime: 'Q3 8:45', status: 'live', homeOdds: 2.10, drawOdds: null, awayOdds: 1.75 },
  { id: 'l3', sport: 'Tennis', league: 'ATP Masters 1000', homeTeam: 'Djokovic', awayTeam: 'Alcaraz', startTime: 'Set 4', status: 'live', homeOdds: 1.85, drawOdds: null, awayOdds: 1.95 },
]

const POLL_INTERVAL = 30_000

export default function LivePage() {
  const [matches, setMatches] = useState<LiveMatch[]>(FALLBACK)
  const [selected, setSelected] = useState<LiveMatch>(FALLBACK[0])
  const [flash, setFlash] = useState<Record<string, 'up' | 'down' | null>>({})
  const [isLive, setIsLive] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const prevOdds = useRef<Record<string, { home: number; away: number }>>({})
  const { convert } = useOdds()
  const { addBet, toggleBetSlip, bets } = useBetSlip()

  const fetchLive = useCallback(async () => {
    try {
      const res = await fetch('/api/odds/live', { cache: 'no-store' })
      if (!res.ok) throw new Error()
      const data = await res.json()

      if (data.matches && data.matches.length > 0) {
        const live: LiveMatch[] = data.matches.map((m: any) => ({
          id: m.id,
          sport: m.sport,
          league: m.league,
          homeTeam: m.homeTeam,
          awayTeam: m.awayTeam,
          startTime: m.startTime,
          status: 'live',
          homeOdds: m.odds.home,
          drawOdds: m.odds.draw ?? null,
          awayOdds: m.odds.away,
        }))

        // Detect odds changes and flash
        const newFlash: Record<string, 'up' | 'down' | null> = {}
        live.forEach(m => {
          const prev = prevOdds.current[m.id]
          if (prev) {
            if (m.homeOdds !== prev.home) newFlash[`${m.id}-home`] = m.homeOdds > prev.home ? 'up' : 'down'
            if (m.awayOdds !== prev.away) newFlash[`${m.id}-away`] = m.awayOdds > prev.away ? 'up' : 'down'
          }
          prevOdds.current[m.id] = { home: m.homeOdds, away: m.awayOdds }
        })

        if (Object.keys(newFlash).length > 0) {
          setFlash(newFlash)
          setTimeout(() => setFlash({}), 1000)
        }

        setMatches(live)
        setIsLive(true)
        setLastUpdated(new Date())
        setSelected(prev => live.find(m => m.id === prev.id) ?? live[0])
      } else {
        setMatches(FALLBACK)
        setIsLive(false)
      }
    } catch {
      setMatches(FALLBACK)
      setIsLive(false)
    }
  }, [])

  useEffect(() => {
    fetchLive()
    const id = setInterval(fetchLive, POLL_INTERVAL)
    return () => clearInterval(id)
  }, [fetchLive])

  const oddsColor = (key: string) =>
    flash[key] === 'up' ? 'text-green-400' : flash[key] === 'down' ? 'text-red-400' : 'text-primary-500'

  const handleAddBet = (match: LiveMatch, selection: string, odds: number) => {
    addBet({
      id: `live-${match.id}-${selection}`,
      match: `${match.homeTeam} vs ${match.awayTeam}`,
      selection,
      odds,
      sport: match.sport,
      eventId: match.id,
    })
  }

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white">Live Betting</h1>
            <div className="flex items-center gap-1.5 ml-2">
              {isLive
                ? <><Wifi size={14} className="text-green-400" /><span className="text-green-400 text-xs">Live</span></>
                : <><WifiOff size={14} className="text-gray-500" /><span className="text-gray-500 text-xs">Demo</span></>
              }
              <button onClick={fetchLive} className="ml-1 p-1 rounded bg-dark-800 hover:bg-dark-700 text-gray-400 hover:text-white">
                <RefreshCw size={12} />
              </button>
            </div>
          </div>
          <p className="text-gray-400">Real-time odds and live match statistics</p>
          {lastUpdated && <p className="text-gray-600 text-xs mt-1">Updated {lastUpdated.toLocaleTimeString()}</p>}
        </div>

        {matches.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No live matches right now</p>
            <p className="text-gray-600 text-sm mt-2">Check back soon or browse upcoming matches in Sports</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Match list */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-bold text-white">Live Now ({matches.length})</h2>
              {matches.map(match => (
                <motion.div
                  key={match.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelected(match)}
                  className={`card cursor-pointer transition-all duration-300 ${
                    selected.id === match.id ? 'border-primary-500 bg-primary-500/5' : 'hover:border-primary-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-red-500 text-xs font-medium">LIVE</span>
                      <span className="text-gray-400 text-xs">{match.sport}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="text-white font-medium truncate flex-1">{match.homeTeam}</span>
                    <span className="text-gray-400 px-2">vs</span>
                    <span className="text-white font-medium truncate flex-1 text-right">{match.awayTeam}</span>
                  </div>

                  <div className={`grid ${match.drawOdds ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
                    <div className="text-center bg-dark-700/50 rounded p-2">
                      <div className="text-xs text-gray-400">1</div>
                      <div className={`font-semibold text-sm transition-colors duration-300 ${oddsColor(`${match.id}-home`)}`}>
                        {convert(match.homeOdds)}
                      </div>
                    </div>
                    {match.drawOdds && (
                      <div className="text-center bg-dark-700/50 rounded p-2">
                        <div className="text-xs text-gray-400">X</div>
                        <div className="font-semibold text-sm text-primary-500">{convert(match.drawOdds)}</div>
                      </div>
                    )}
                    <div className="text-center bg-dark-700/50 rounded p-2">
                      <div className="text-xs text-gray-400">2</div>
                      <div className={`font-semibold text-sm transition-colors duration-300 ${oddsColor(`${match.id}-away`)}`}>
                        {convert(match.awayOdds)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Selected match detail */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div key={selected.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-red-500 font-medium">LIVE</span>
                  <span className="text-gray-400">{selected.league}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {selected.homeTeam} vs {selected.awayTeam}
                </h2>

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-12">
                    <div className="text-center">
                      <div className="text-lg text-gray-300">{selected.homeTeam}</div>
                    </div>
                    <div className="text-gray-400 text-sm">{selected.startTime}</div>
                    <div className="text-center">
                      <div className="text-lg text-gray-300">{selected.awayTeam}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Live odds */}
              <div className="card">
                <h3 className="text-xl font-bold text-white mb-4">Live Odds</h3>
                <div className={`grid ${selected.drawOdds ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddBet(selected, selected.homeTeam, selected.homeOdds)}
                    className="odds-button bg-dark-700/50 hover:bg-primary-600/20 border-primary-500/30 p-4"
                  >
                    <div className="text-sm text-gray-400 mb-2">{selected.homeTeam}</div>
                    <div className={`text-2xl font-bold transition-colors duration-300 ${oddsColor(`${selected.id}-home`)}`}>
                      {convert(selected.homeOdds)}
                    </div>
                  </motion.button>

                  {selected.drawOdds && (
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddBet(selected, 'Draw', selected.drawOdds!)}
                      className="odds-button bg-dark-700/50 hover:bg-primary-600/20 border-primary-500/30 p-4"
                    >
                      <div className="text-sm text-gray-400 mb-2">Draw</div>
                      <div className="text-2xl font-bold text-primary-500">{convert(selected.drawOdds)}</div>
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddBet(selected, selected.awayTeam, selected.awayOdds)}
                    className="odds-button bg-dark-700/50 hover:bg-primary-600/20 border-primary-500/30 p-4"
                  >
                    <div className="text-sm text-gray-400 mb-2">{selected.awayTeam}</div>
                    <div className={`text-2xl font-bold transition-colors duration-300 ${oddsColor(`${selected.id}-away`)}`}>
                      {convert(selected.awayOdds)}
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Betslip shortcut */}
              {bets.length > 0 && (
                <button
                  onClick={toggleBetSlip}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  View Bet Slip ({bets.length} selection{bets.length > 1 ? 's' : ''})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
