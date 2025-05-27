import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../src/styles/globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '4X Create Your Reality!',
  description: 'Experience next-generation trading with our modern platform. Trade forex, commodities, and cryptocurrencies with advanced analytics and real-time data.',
  keywords: ['trading', 'forex', '4x', 'cryptocurrency', 'commodities', 'AI trading', 'real-time charts'],
  authors: [{ name: 'Nijat Guliyev', url: 'https://github.com/gulliyevn' }],
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/apple-touch-icon.png',
  },
  openGraph: {
    title: '4X Create Your Reality!',
    description: 'Experience next-generation trading with our modern platform.',
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
      <head>
        {/* Font Awesome */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Google Fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" 
          rel="stylesheet"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body 
        className={`${inter.className} dark-mode font-open-sans`} 
        suppressHydrationWarning={true}
      >
        <ErrorBoundary>
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
        
        {/* TradingView Widget Script */}
        <Script 
          src="https://s3.tradingview.com/tv.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
} 