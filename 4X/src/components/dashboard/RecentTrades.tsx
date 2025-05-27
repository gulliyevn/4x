import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { Trade } from '@/types/trading'

interface RecentTradesProps {
  trades: Trade[]
}

export function RecentTrades({ trades }: RecentTradesProps) {
  if (trades.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Trades</h2>
        <p className="text-gray-500 text-center py-8">No recent trades</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Trades</h2>
      
      <div className="space-y-3">
        {trades.map(trade => (
          <div key={trade.id} className="flex items-center justify-between py-2 border-b last:border-0">
            <div>
              <h3 className="font-medium">{trade.symbol}</h3>
              <p className="text-sm text-gray-500">
                {new Date(trade.timestamp).toLocaleTimeString()}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold">
                ${trade.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex items-center justify-end">
                <span className={trade.side === 'BUY' ? 'text-green-600' : 'text-red-600'}>
                  {trade.quantity.toLocaleString()} {trade.side}
                </span>
                {trade.side === 'BUY' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600 ml-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600 ml-1" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-right">
        <a href="/trades" className="text-sm text-blue-600 hover:text-blue-800">
          View trade history →
        </a>
      </div>
    </div>
  )
} 