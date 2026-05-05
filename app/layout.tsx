import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BetSlip from '@/components/BetSlip'
import ErrorBoundary from '@/components/ErrorBoundary'
import { OddsProvider } from '@/lib/oddsContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SportsBet Pro - Premier Sports Betting Platform',
  description: 'Experience the best in sports betting with live odds, real-time updates, and secure transactions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OddsProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </main>
            <Footer />
            <BetSlip />
          </div>
        </OddsProvider>
      </body>
    </html>
  )
}