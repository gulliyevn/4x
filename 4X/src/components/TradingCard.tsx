'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatPercentage } from '@/lib/utils'

interface TradingCardProps {
  symbol: string
  price: number
  change: number
  changePercent: number
  onClick?: () => void
}

export function TradingCard({ symbol, price, change, changePercent, onClick }: TradingCardProps) {
  const isPositive = change >= 0

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-primary/10 border border-primary/20 rounded-lg p-4 cursor-pointer hover:bg-primary/15 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-white">{symbol}</h3>
        {isPositive ? (
          <TrendingUp className="w-5 h-5 text-green-400" />
        ) : (
          <TrendingDown className="w-5 h-5 text-red-400" />
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-bold text-primary">{formatCurrency(price)}</p>
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {formatCurrency(change)}
          </span>
          <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {formatPercentage(changePercent)}
          </span>
        </div>
      </div>
    </motion.div>
  )
} 