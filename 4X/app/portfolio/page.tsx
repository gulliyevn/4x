'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PriceDisplay from '@/components/ui/PriceDisplay'
import { PieChart, AreaChart } from '@/components/ui/Charts'
import { useMarketStore } from '@/stores/marketStore'
import { 
  mockPortfolioSummary, 
  mockPositions, 
  mockRecentTrades, 
  mockSymbols,
  mockMarketData
} from '@/lib/mockData'

export default function PortfolioPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M')
  const [portfolioChartData, setPortfolioChartData] = useState<any[]>([])
  const [showClosedPositions, setShowClosedPositions] = useState(false)
  
  const { marketData } = useMarketStore()

  // Generate portfolio performance chart data
  useEffect(() => {
    const generatePortfolioData = () => {
      const data = []
      const now = Date.now()
      let baseValue = mockPortfolioSummary.totalValue
      
      const periods = selectedTimeframe === '1D' ? 24 : selectedTimeframe === '1W' ? 7 : 30
      const interval = selectedTimeframe === '1D' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000
      
      for (let i = periods; i >= 0; i--) {
        const time = now - (i * interval)
        const change = (Math.random() - 0.5) * 0.02
        baseValue = baseValue * (1 + change)
        
        data.push({
          x: time,
          y: baseValue,
          label: new Date(time).toLocaleDateString()
        })
      }
      
      setPortfolioChartData(data)
    }

    generatePortfolioData()
  }, [selectedTimeframe])

  const portfolioDistribution = [
    { label: 'Bitcoin (BTC)', value: 35000, color: '#f7931a' },
    { label: 'Ethereum (ETH)', value: 25000, color: '#627eea' },
    { label: 'Stocks', value: 20000, color: '#10b981' },
    { label: 'Forex', value: 15000, color: '#3b82f6' },
    { label: 'Cash', value: 5000, color: '#6b7280' }
  ]

  const openPositions = mockPositions.slice(0, 6)
  const recentTrades = mockRecentTrades.slice(0, 8)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your investments, performance, and trading activity.
          </p>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Value
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${mockPortfolioSummary.totalValue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                mockPortfolioSummary.totalPnL >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {mockPortfolioSummary.totalPnL >= 0 ? '+' : ''}
                ${mockPortfolioSummary.totalPnL.toLocaleString()} 
                ({mockPortfolioSummary.totalPnLPercent.toFixed(2)}%)
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Available Cash
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${mockPortfolioSummary.availableBalance.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Ready for trading
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Today's P&L
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${mockPortfolioSummary.dayPnL.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                mockPortfolioSummary.dayPnL >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {mockPortfolioSummary.dayPnL >= 0 ? '+' : ''}
                {mockPortfolioSummary.dayPnLPercent.toFixed(2)}%
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Open Positions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {openPositions.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Active trades
              </span>
            </div>
          </motion.div>
        </div>

        {/* Portfolio Performance & Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Portfolio Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Portfolio Performance
              </h2>
              <div className="flex space-x-2">
                {['1D', '1W', '1M', '3M', '1Y'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      selectedTimeframe === timeframe
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>
            
            <AreaChart
              data={portfolioChartData}
              width={600}
              height={300}
              color="#10b981"
              gradient={true}
              showGrid={true}
              showAxes={true}
              animate={true}
            />
          </motion.div>

          {/* Portfolio Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Asset Allocation
            </h2>
            
            <PieChart
              data={portfolioDistribution}
              width={300}
              height={250}
              innerRadius={50}
              showLegend={true}
              showLabels={true}
              animate={true}
            />

            <div className="mt-6 space-y-2">
              {portfolioDistribution.map((asset, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: asset.color }}
                    ></div>
                    <span className="text-gray-600 dark:text-gray-400">{asset.label}</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${asset.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Positions & Trading History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Positions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Active Positions
              </h2>
              <button
                onClick={() => setShowClosedPositions(!showClosedPositions)}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {showClosedPositions ? 'Show Open' : 'Show Closed'}
              </button>
            </div>
            
            <div className="space-y-4">
              {openPositions.map((position) => (
                <div key={position.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                          {position.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {position.symbol}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Size: {position.size}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        position.pnl >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {position.pnlPercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Entry:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${position.entryPrice.toFixed(4)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Current:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${position.currentPrice.toFixed(4)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Margin:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${position.margin.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trading History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Trading Activity
            </h2>
            
            <div className="space-y-3">
              {recentTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {trade.symbol.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {trade.symbol}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(trade.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        trade.side === 'BUY' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {trade.side}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {trade.quantity} @ ${trade.price.toFixed(4)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                View All Trading History
              </button>
            </div>
          </motion.div>
        </div>

        {/* Portfolio Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Portfolio Statistics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockPortfolioSummary.equity.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Equity</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockPortfolioSummary.marginUsed.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Margin Used</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockPortfolioSummary.marginAvailable.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Margin Available</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {openPositions.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Positions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 