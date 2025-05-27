import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { MarketData } from '@/types/market'

interface MarketOverviewProps {
  data: Record<string, MarketData>
}

const POPULAR_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'AAPL', 'TSLA', 'EURUSD', 'GOLD']

export function MarketOverview({ data }: MarketOverviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Market Overview</h2>
      
      <div className="space-y-4">
        {POPULAR_SYMBOLS.map(symbol => {
          const marketData = data[symbol]
          if (!marketData) return null
          
          const isPositive = marketData.change24h >= 0
          
          return (
            <div key={symbol} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{symbol}</h3>
                <p className="text-sm text-gray-500">24h Volume: ${marketData.volume24h.toLocaleString()}</p>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-semibold">
                  ${marketData.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="flex items-center justify-end">
                  <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                    {isPositive ? '+' : ''}{marketData.changePercent24h.toFixed(2)}%
                  </span>
                  {isPositive ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600 ml-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600 ml-1" />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 text-right">
        <a href="/markets" className="text-sm text-blue-600 hover:text-blue-800">
          View all markets →
        </a>
      </div>
    </div>
  )
} 