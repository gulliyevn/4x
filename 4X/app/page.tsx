'use client'

import Link from 'next/link'
import { Button } from '../src/components/ui/Button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#162A2C] to-[#98b5a4] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20">
          <h1 className="text-6xl font-bold text-white mb-6">
            4X Trading Platform
          </h1>
          
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Experience next-generation trading with our modern platform. 
            Trade forex, commodities, and cryptocurrencies with advanced analytics and real-time data.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="min-w-[160px]">
                Get Started
              </Button>
            </Link>
            
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="min-w-[160px] bg-white/10 text-white border-white/30 hover:bg-white/20">
                View Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Data</h3>
              <p className="text-white/70">Live market data and advanced charting tools</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure Trading</h3>
              <p className="text-white/70">Bank-level security and encrypted transactions</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Fast Execution</h3>
              <p className="text-white/70">Lightning-fast order execution and processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 