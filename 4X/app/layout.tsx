import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'
import Navigation from '@/components/layout/Navigation'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '4X Trading Platform',
  description: 'A modern trading platform for forex, commodities, and cryptocurrencies',
  keywords: ['trading', 'forex', '4x', 'cryptocurrency', 'commodities'],
  authors: [{ name: 'Nijat Guliyev', url: 'https://github.com/gulliyevn' }],
  openGraph: {
    title: '4X Trading Platform',
    description: 'A modern trading platform for forex, commodities, and cryptocurrencies',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ErrorBoundary enableRetry showDetails={process.env.NODE_ENV === 'development'}>
          <div id="root" className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
} 