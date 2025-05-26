import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../src/app/globals.css'

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
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
} 