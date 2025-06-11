import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Poppins } from 'next/font/google'
import './globals.css'
import './page-styles.css'
import './enhanced-styles.css'
import './responsive-styles.css'
import { ToastProvider } from '../src/components/ToastProvider'

// Основной шрифт для интерфейса - Inter (отличная читаемость, современный)
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Моноширинный шрифт для цифр и данных - JetBrains Mono
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// Шрифт для заголовков - Poppins (современный, привлекательный)
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '4X Create Your reality!',
  description: 'Professional AI-powered trading platform with 94.7% prediction accuracy. Real-time market analysis, advanced trading tools, and comprehensive financial intelligence trusted by 100,000+ traders worldwide.',
  keywords: [
    '4X Analytics',
    'AI trading platform',
    'artificial intelligence trading',
    'market analysis',
    'trading tools',
    'financial intelligence',
    'real-time data',
    'trading predictions',
    'forex trading',
    'cryptocurrency trading',
    'stock market analysis',
    'professional trading platform'
  ],
  authors: [{ name: '4X Analytics Team' }],
  creator: '4X Analytics',
  publisher: '4X Analytics',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://4xanalytics.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'tr-TR': '/tr-TR',
      'ru-RU': '/ru-RU',
    },
  },
  openGraph: {
    title: '4X Analytics - AI-Powered Trading Platform',
    description: 'Professional AI-powered trading platform with 94.7% prediction accuracy. Trusted by 100,000+ traders worldwide.',
    url: 'https://4xanalytics.com',
    siteName: '4X Analytics',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '4X Analytics - AI Trading Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '4X Analytics - AI-Powered Trading Platform',
    description: 'Professional AI-powered trading platform with 94.7% prediction accuracy.',
    images: ['/images/twitter-image.jpg'],
    creator: '@4xanalytics',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'finance',
  classification: 'Business',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': '4X Analytics',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#667eea',
    'theme-color': '#667eea',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#00d4aa" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="4X Analytics" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#00d4aa" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "4X Analytics",
              "description": "Professional AI-powered trading platform with 94.7% prediction accuracy",
              "url": "https://4xanalytics.com",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web, iOS, Android",
              "offers": {
                "@type": "Offer",
                "price": "29",
                "priceCurrency": "USD",
                "priceValidUntil": "2025-12-31"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "10000"
              },
              "author": {
                "@type": "Organization",
                "name": "4X Analytics"
              }
            })
          }}
        />
      </head>
      <body className="font-inter">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
} 