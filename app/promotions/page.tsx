'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, Clock3, Coins, Flame, Gift, Search, ShieldCheck, Sparkles, Ticket } from 'lucide-react'
import { authService, type User } from '@/lib/auth'

type PromoCategory = 'All' | 'Welcome' | 'Cashback' | 'Odds Boost' | 'Reload' | 'VIP'

interface Promotion {
  id: string
  title: string
  category: PromoCategory
  subtitle: string
  code: string
  accent: string
  cta: string
  expires: string
  requirement: string
  description: string
}

const categories: PromoCategory[] = ['All', 'Welcome', 'Cashback', 'Odds Boost', 'Reload', 'VIP']

const promotions: Promotion[] = [
  {
    id: 'promo-welcome-1',
    title: '100% First Deposit Bonus',
    category: 'Welcome',
    subtitle: 'New players',
    code: 'START100',
    accent: 'from-emerald-500/25 to-lime-400/10',
    cta: 'Claim Bonus',
    expires: 'Ends in 2 days',
    requirement: 'Min deposit $10',
    description: 'A strong front-door offer for new registrations that ties directly into the deposit flow.',
  },
  {
    id: 'promo-cashback-1',
    title: 'Weekend Cashback 15%',
    category: 'Cashback',
    subtitle: 'Every Saturday',
    code: 'WEEKEND15',
    accent: 'from-sky-500/25 to-cyan-400/10',
    cta: 'Activate Cashback',
    expires: 'Saturday only',
    requirement: 'Opt in before placing bets',
    description: 'Useful for keeping existing users active and giving them a reason to come back on weekends.',
  },
  {
    id: 'promo-boost-1',
    title: 'Premier League Odds Boost',
    category: 'Odds Boost',
    subtitle: 'Top football picks',
    code: 'BOOSTGOAL',
    accent: 'from-amber-500/25 to-orange-400/10',
    cta: 'View Boosted Odds',
    expires: 'Matchday special',
    requirement: 'Selected fixtures only',
    description: 'This type of offer belongs close to live sports browsing because it supports quick conversion.',
  },
  {
    id: 'promo-reload-1',
    title: 'Midweek Reload Bonus',
    category: 'Reload',
    subtitle: 'Existing players',
    code: 'RELOAD50',
    accent: 'from-violet-500/25 to-indigo-400/10',
    cta: 'Reload Wallet',
    expires: 'Every Wednesday',
    requirement: 'Deposit $20 or more',
    description: 'A good retention offer that turns low-activity weekdays into a deposit opportunity.',
  },
  {
    id: 'promo-vip-1',
    title: 'VIP Priority Rewards',
    category: 'VIP',
    subtitle: 'High-value users',
    code: 'VIPACCESS',
    accent: 'from-rose-500/25 to-fuchsia-400/10',
    cta: 'Unlock VIP',
    expires: 'Invite only',
    requirement: 'By account status',
    description: 'Reserved for top-tier users with tailored limits, private offers, and faster support access.',
  },
]

const promoBenefits = [
  {
    title: 'Deposit-linked offers',
    description: 'Promotions should move users toward a clear next step such as funding the wallet or exploring sports.',
    icon: Coins,
  },
  {
    title: 'Clear rules',
    description: 'Show codes, timelines, and eligibility in the card itself so users understand the offer instantly.',
    icon: Ticket,
  },
  {
    title: 'Safer promotions',
    description: 'Promotional copy still needs balance, clarity, and visible responsible gaming access.',
    icon: ShieldCheck,
  },
]

export default function PromotionsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [activeCategory, setActiveCategory] = useState<PromoCategory>('All')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setUser(authService.getCurrentUser())
  }, [])

  const visiblePromotions = promotions.filter((promotion) => {
    const matchesCategory = activeCategory === 'All' || promotion.category === activeCategory
    const normalizedSearch = searchTerm.trim().toLowerCase()
    const matchesSearch =
      normalizedSearch.length === 0 ||
      promotion.title.toLowerCase().includes(normalizedSearch) ||
      promotion.code.toLowerCase().includes(normalizedSearch) ||
      promotion.category.toLowerCase().includes(normalizedSearch)

    return matchesCategory && matchesSearch
  })

  const featuredPromotion = visiblePromotions[0] || promotions[0]

  const handleClaim = (promotion: Promotion) => {
    if (!user) {
      router.push('/signup')
      return
    }

    if (promotion.category === 'Odds Boost') {
      router.push('/sports')
      return
    }

    router.push(`/deposit?promo=${encodeURIComponent(promotion.code)}`)
  }

  return (
    <div className="bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-800 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.14),_transparent_24%),radial-gradient(circle_at_80%_10%,_rgba(59,130,246,0.14),_transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)]">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                <Sparkles size={16} />
                Promotions Hub
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Real promo cards, clear terms, and actions that actually lead somewhere.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                This page now works like a real promotions center: browse offer types, search for codes, and jump
                straight into signup, deposit, or sports depending on the campaign.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => router.push(user ? '/deposit' : '/signup')}
                  className="btn-primary"
                >
                  {user ? 'Fund Account' : 'Join and Claim'}
                </button>
                <Link
                  href="/sports"
                  className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-100 transition-colors hover:border-slate-500 hover:text-white"
                >
                  View Sports
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Gift size={18} />
                    <span className="text-sm font-semibold">Active Offers</span>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-white">{visiblePromotions.length} promos</p>
                  <p className="mt-2 text-sm text-slate-400">The list below now changes with your selected filter and search.</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Flame size={18} />
                    <span className="text-sm font-semibold">Best Conversion</span>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-white">Welcome + reload</p>
                  <p className="mt-2 text-sm text-slate-400">These usually deserve the most prominent placement on the page.</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Clock3 size={18} />
                    <span className="text-sm font-semibold">Fast Actions</span>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-white">One-click paths</p>
                  <p className="mt-2 text-sm text-slate-400">Each promo now points users toward signup, deposit, or sports.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
              <div className={`rounded-3xl border border-emerald-400/20 bg-gradient-to-br ${featuredPromotion.accent} p-6`}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-slate-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                    Featured Campaign
                  </span>
                  <span className="text-sm text-slate-300">{featuredPromotion.category}</span>
                </div>

                <h2 className="mt-6 text-3xl font-bold text-white">{featuredPromotion.title}</h2>
                <p className="mt-3 text-slate-100/90">{featuredPromotion.description}</p>

                <div className="mt-6 rounded-2xl border border-slate-700/80 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Promo code</span>
                    <span className="font-semibold text-emerald-300">{featuredPromotion.code}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                    <span>Requirement</span>
                    <span className="font-semibold text-white">{featuredPromotion.requirement}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                    <span>Timing</span>
                    <span className="font-semibold text-white">{featuredPromotion.expires}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-700/80 px-4 py-3">
                  <div>
                    <p className="text-sm text-slate-300/80">Audience</p>
                    <p className="font-semibold text-white">{featuredPromotion.subtitle}</p>
                  </div>
                  <button
                    onClick={() => handleClaim(featuredPromotion)}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                  >
                    {featuredPromotion.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search title or code"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Offer Board</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Claimable promo cards with real next steps</h2>
          </div>
          <p className="text-sm text-slate-400">
            Showing <span className="font-semibold text-white">{visiblePromotions.length}</span> offer{visiblePromotions.length === 1 ? '' : 's'}
          </p>
        </div>

        {visiblePromotions.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visiblePromotions.map((promotion) => (
              <article key={promotion.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/20">
                <div className={`bg-gradient-to-br ${promotion.accent} p-6`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                      {promotion.category}
                    </span>
                    <span className="rounded-full bg-slate-950/60 px-3 py-1 text-xs font-semibold text-emerald-200">
                      {promotion.subtitle}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">{promotion.title}</h3>
                  <p className="mt-3 text-slate-100/90">{promotion.description}</p>
                </div>

                <div className="p-6">
                  <div className="space-y-3 text-sm text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>Code</span>
                      <span className="font-semibold text-emerald-300">{promotion.code}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Requirement</span>
                      <span className="font-semibold text-white">{promotion.requirement}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Availability</span>
                      <span className="font-semibold text-white">{promotion.expires}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleClaim(promotion)}
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                    >
                      {promotion.cta}
                    </button>
                    <button
                      onClick={() => setActiveCategory(promotion.category)}
                      className="text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
                    >
                      More {promotion.category}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
            <h3 className="text-2xl font-semibold text-white">No promotions match that search yet</h3>
            <p className="mt-3 text-slate-400">Try a different code or reset the category filter.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setActiveCategory('All')
              }}
              className="mt-6 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {promoBenefits.map((item) => {
            const Icon = item.icon

            return (
              <article key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
                <div className="mb-5 inline-flex rounded-2xl bg-slate-950 p-3 text-emerald-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{item.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Promo Rules</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Offers look better when the terms are easy to trust.</h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-300">
                Keep expiry, eligibility, and minimum requirements visible. Clear promo language makes the page feel
                much more credible and reduces confusion at deposit time.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <ul className="space-y-4 text-slate-300">
                <li>Show code, timeline, and minimum action directly on the card.</li>
                <li>Route sports-specific campaigns to the sportsbook, not the wallet.</li>
                <li>Keep responsible gaming access visible even on high-conversion promo pages.</li>
              </ul>
              <Link href="/responsible-gaming" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
                Review responsible gaming page
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
