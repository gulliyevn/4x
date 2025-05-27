import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { Position } from '@/types/trading'

interface ActivePositionsProps {
  positions: Position[]
}

export function ActivePositions({ positions }: ActivePositionsProps) {
  if (positions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Active Positions</h2>
        <p className="text-gray-500 text-center py-8">No active positions</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Active Positions</h2>
      
      <div className="space-y-4">
        {positions.map(position => {
          const isPositive = position.pnl >= 0
          
          return (
            <div key={position.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium">{position.symbol}</h3>
                  <p className="text-sm text-gray-500">
                    {position.side} × {position.leverage}x
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold">
                    ${position.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center justify-end">
                    <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                      {isPositive ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                    </span>
                    {isPositive ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600 ml-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600 ml-1" />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                <div>
                  <p className="text-gray-500">Size</p>
                  <p>{position.size}</p>
                </div>
                <div>
                  <p className="text-gray-500">Entry Price</p>
                  <p>${position.entryPrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">PnL</p>
                  <p className={isPositive ? 'text-green-600' : 'text-red-600'}>
                    ${Math.abs(position.pnl).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="mt-3 flex justify-end space-x-2">
                <button className="px-3 py-1 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50">
                  Close
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 