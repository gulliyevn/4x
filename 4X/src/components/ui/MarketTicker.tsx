'use client'

import React, { useState, useEffect } from 'react'
import { mockMarketData, mockSymbols } from '@/lib/mockData'

interface TickerItem {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export default function MarketTicker() {
  const [tickerData, setTickerData] = useState<TickerItem[]>([])

  useEffect(() => {
    // Generate ticker data from mock data
    const generateTickerData = () => {
      const data: TickerItem[] = []
      
      mockSymbols.slice(0, 20).forEach(symbol => {
        const marketPrice = mockMarketData[symbol.symbol]
        if (marketPrice) {
          const change = marketPrice.price - marketPrice.prevPrice
          const changePercent = (change / marketPrice.prevPrice) * 100
          
          data.push({
            symbol: symbol.symbol,
            price: marketPrice.price,
            change,
            changePercent
          })
        }
      })
      
      setTickerData(data)
    }

    generateTickerData()
    
    // Update ticker data every 10 seconds
    const interval = setInterval(generateTickerData, 10000)
    
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return price.toFixed(2)
    } else {
      return price.toFixed(6)
    }
  }

  const formatChange = (change: number) => {
    return change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2)
  }

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
            className="ticker h-[30px]"
            data-testid="ticker"
          >
            {tickerData.map((item, index) => (
              <div 
                key={`${item.symbol}-${index}`} 
                className="ticker-item"
                data-testid={`ticker-item-${item.symbol}`}
              >
                <span className="font-semibold mr-2">{item.symbol}</span>
                <span className="mr-2">${formatPrice(item.price)}</span>
                <span className={`mr-4 ${
                  item.change >= 0 ? 'text-green-300' : 'text-red-300'
                }`}>
                  {formatChange(item.change)} ({item.changePercent.toFixed(2)}%)
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
                <span className="font-semibold mr-2">{item.symbol}</span>
                <span className="mr-2">${formatPrice(item.price)}</span>
                <span className={`mr-4 ${
                  item.change >= 0 ? 'text-green-300' : 'text-red-300'
                }`}>
                  {formatChange(item.change)} ({item.changePercent.toFixed(2)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 