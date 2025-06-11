'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToastContext } from './ToastProvider'
import { TrendingUp, TrendingDown, AlertTriangle, Target, Zap } from 'lucide-react'

interface TradingSignal {
  id: string
  type: 'buy' | 'sell' | 'alert'
  asset: string
  price: number
  confidence: number
  timestamp: Date
  message: string
}

export function TradingNotifications() {
  const { success, warning, info } = useToastContext()
  const [signals, setSignals] = useState<TradingSignal[]>([])

  // Simulate trading signals
  useEffect(() => {
    const generateSignal = (): TradingSignal => {
      const assets = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'GBP/USD', 'AAPL', 'TSLA', 'GOOGL']
      const types: ('buy' | 'sell' | 'alert')[] = ['buy', 'sell', 'alert']
      const messages = {
        buy: [
          'Strong bullish momentum detected',
          'Technical indicators suggest upward trend',
          'Support level confirmed, good entry point',
          'Volume spike indicates buying pressure'
        ],
        sell: [
          'Resistance level reached, consider taking profits',
          'Bearish divergence detected',
          'Overbought conditions, potential reversal',
          'Stop loss triggered for risk management'
        ],
        alert: [
          'High volatility detected',
          'Important news event approaching',
          'Unusual trading volume observed',
          'Key support/resistance level approaching'
        ]
      }

      const type = types[Math.floor(Math.random() * types.length)]
      const asset = assets[Math.floor(Math.random() * assets.length)]
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        type,
        asset,
        price: Math.random() * 1000 + 100,
        confidence: Math.random() * 30 + 70, // 70-100%
        timestamp: new Date(),
        message: messages[type][Math.floor(Math.random() * messages[type].length)]
      }
    }

    const showTradingSignal = (signal: TradingSignal) => {
      const icon = signal.type === 'buy' ? '📈' : signal.type === 'sell' ? '📉' : '⚠️'
      const title = `${icon} ${signal.type.toUpperCase()} Signal - ${signal.asset}`
      const message = `${signal.message} (${signal.confidence.toFixed(1)}% confidence)`

      if (signal.type === 'buy') {
        success(title, message, {
          duration: 8000,
          action: {
            label: 'View Details',
            onClick: () => console.log('View signal details:', signal)
          }
        })
      } else if (signal.type === 'sell') {
        warning(title, message, {
          duration: 8000,
          action: {
            label: 'View Details',
            onClick: () => console.log('View signal details:', signal)
          }
        })
      } else {
        info(title, message, {
          duration: 6000,
          action: {
            label: 'View Details',
            onClick: () => console.log('View signal details:', signal)
          }
        })
      }
    }

    // Generate signals every 15-30 seconds
    const interval = setInterval(() => {
      const signal = generateSignal()
      setSignals(prev => [signal, ...prev.slice(0, 9)]) // Keep last 10 signals
      showTradingSignal(signal)
    }, Math.random() * 15000 + 15000) // 15-30 seconds

    // Generate initial signal after 5 seconds
    const initialTimer = setTimeout(() => {
      const signal = generateSignal()
      setSignals([signal])
      showTradingSignal(signal)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(initialTimer)
    }
  }, [success, warning, info])

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm">
      <AnimatePresence>
        {signals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Live Signals
                </h3>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">LIVE</span>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {signals.slice(0, 3).map((signal, index) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${
                    signal.type === 'buy' 
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                      : signal.type === 'sell'
                      ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                      : 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      {signal.type === 'buy' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : signal.type === 'sell' ? (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      )}
                      <span className="font-medium text-sm text-gray-900 dark:text-white">
                        {signal.asset}
                      </span>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      signal.type === 'buy' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        : signal.type === 'sell'
                        ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                    }`}>
                      {signal.type.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    {signal.message}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      <Target className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400">
                        {signal.confidence.toFixed(1)}% confidence
                      </span>
                    </div>
                    <span className="text-gray-400">
                      {signal.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {signals.length > 3 && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  View all {signals.length} signals
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 