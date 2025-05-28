import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './page-styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '4X Trading Professional Platform',
  description: 'Professional trading platform with advanced analytics, real-time data, and comprehensive market access',
  keywords: 'trading, forex, stocks, cryptocurrency, charts, market analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 