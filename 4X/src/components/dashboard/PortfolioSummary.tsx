import { ArrowUpRight, ArrowDownRight, DollarSign, Percent } from 'lucide-react'
import type { PortfolioSummary as PortfolioSummaryType } from '@/types/trading'

interface PortfolioSummaryProps {
  data: PortfolioSummaryType
}

export function PortfolioSummary({ data }: PortfolioSummaryProps) {
  const isPositivePnL = data.totalPnL >= 0
  const isPositiveDayPnL = data.dayPnL >= 0

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Portfolio Summary</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-2xl font-bold">${data.totalValue.toLocaleString()}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Available Balance</p>
          <p className="text-2xl font-bold">${data.availableBalance.toLocaleString()}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Total P&L</p>
          <div className="flex items-center">
            <span className={`text-xl font-bold ${isPositivePnL ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(data.totalPnL).toLocaleString()}
            </span>
            {isPositivePnL ? (
              <ArrowUpRight className="w-5 h-5 text-green-600 ml-1" />
            ) : (
              <ArrowDownRight className="w-5 h-5 text-red-600 ml-1" />
            )}
            <span className={`ml-2 ${isPositivePnL ? 'text-green-600' : 'text-red-600'}`}>
              {data.totalPnLPercent.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Day P&L</p>
          <div className="flex items-center">
            <span className={`text-xl font-bold ${isPositiveDayPnL ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(data.dayPnL).toLocaleString()}
            </span>
            {isPositiveDayPnL ? (
              <ArrowUpRight className="w-5 h-5 text-green-600 ml-1" />
            ) : (
              <ArrowDownRight className="w-5 h-5 text-red-600 ml-1" />
            )}
            <span className={`ml-2 ${isPositiveDayPnL ? 'text-green-600' : 'text-red-600'}`}>
              {data.dayPnLPercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Open Positions</p>
          <p className="text-lg font-semibold">{data.positions}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Margin Used</p>
          <p className="text-lg font-semibold">${data.marginUsed.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Margin Available</p>
          <p className="text-lg font-semibold">${data.marginAvailable.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
} 