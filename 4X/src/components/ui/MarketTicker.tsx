'use client'

import React, { useState, useEffect } from 'react'
import { mockMarketData, mockSymbols } from '@/lib/mockData'

interface TickerItem {
  symbol: string
  price: number
  change24h: number
}

export default function MarketTicker() {
  const [tickerData, setTickerData] = useState<TickerItem[]>([])

  useEffect(() => {
    // Initialize ticker data from mockMarketData
    const initialData: TickerItem[] = mockSymbols.slice(0, 10).map(symbol => {
      const marketData = mockMarketData[symbol.symbol]
      return {
        symbol: symbol.symbol,
        price: marketData?.price || 0,
        change24h: marketData?.changePercent24h || 0
      }
    })
    
    setTickerData(initialData)

    const interval = setInterval(() => {
      setTickerData(prev => 
        prev.map(item => ({
          ...item,
          price: item.price * (0.98 + Math.random() * 0.04),
          change24h: (Math.random() - 0.5) * 10
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      className="bg-gradient-to-r from-[#98b5a4] to-[#162A2C] overflow-hidden"
      role="region"
      aria-label="Market Ticker"
    >
      <div 
        className="market-ticker items-center relative w-full"
        data-testid="market-ticker"
      >
        <div 
          className="ticker-container"
          data-testid="ticker-container"
        >
          <div 
            id="ticker"
            className="ticker h-[30px]"
            data-testid="ticker"
          >
            {tickerData.map((item, index) => (
              <div 
                key={`${item.symbol}-${index}`} 
                className="ticker-item"
                data-testid={`ticker-item-${item.symbol}`}
              >
                <span className="font-semibold text-white">{item.symbol}</span>
                <span className="ml-2 text-white">
                  ${item.price.toFixed(2)}
                </span>
                <span className={`ml-2 ${item.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {tickerData.map((item, index) => (
              <div 
                key={`${item.symbol}-duplicate-${index}`} 
                className="ticker-item"
                data-testid={`ticker-item-${item.symbol}-duplicate`}
              >
                <span className="font-semibold text-white">{item.symbol}</span>
                <span className="ml-2 text-white">
                  ${item.price.toFixed(2)}
                </span>
                <span className={`ml-2 ${item.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 