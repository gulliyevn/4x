'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PriceDisplay from '@/components/ui/PriceDisplay'
import { LineChart, AreaChart, PieChart } from '@/components/ui/Charts'
import { useRealTimePrice } from '@/hooks/useRealTimePrice'
import { useMarketStore } from '@/stores/marketStore'
import { 
  mockPortfolioSummary, 
  mockPositions, 
  mockRecentTrades, 
  mockNewsArticles,
  mockMarketData,
  mockSymbols
} from '@/lib/mockData'
import { PositionStatus, OrderSide } from '@/types/trading'
import { OrderBookSide } from '@/types/market'
import type { Trade, NewsArticle } from '@/types'

export default function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [portfolioChartData, setPortfolioChartData] = useState<any[]>([])
  const [marketChartData, setMarketChartData] = useState<any[]>([])
  
  const { marketData } = useMarketStore()
  
  // Generate portfolio performance chart data
  useEffect(() => {
    const generatePortfolioData = () => {
      const data = []
      const now = Date.now()
      let baseValue = mockPortfolioSummary.totalValue
      
      for (let i = 30; i >= 0; i--) {
        const time = now - (i * 24 * 60 * 60 * 1000)
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

    const generateMarketData = () => {
      const data = []
      const now = Date.now()
      let basePrice = 45000 // BTC base price
      
      for (let i = 24; i >= 0; i--) {
        const time = now - (i * 60 * 60 * 1000) // Hourly data
        const change = (Math.random() - 0.5) * 0.03
        basePrice = basePrice * (1 + change)
        
        data.push({
          x: time,
          y: basePrice,
          label: new Date(time).toLocaleTimeString()
        })
      }
      
      setMarketChartData(data)
    }

    generatePortfolioData()
    generateMarketData()
  }, [])

  const topSymbols = mockSymbols.slice(0, 6)
  const recentTrades = mockRecentTrades.slice(0, 5)
  const activePositions = mockPositions.slice(0, 4)
  const latestNews = mockNewsArticles.slice(0, 4)

  const portfolioDistribution = [
    { label: 'BTC', value: 35000, color: '#f7931a' },
    { label: 'ETH', value: 25000, color: '#627eea' },
    { label: 'Stocks', value: 20000, color: '#10b981' },
    { label: 'Forex', value: 15000, color: '#3b82f6' },
    { label: 'Cash', value: 5000, color: '#6b7280' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trading Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's your trading overview for today.
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
                  Total Portfolio Value
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
                  Available Balance
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
                  Active Positions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activePositions.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Open trades
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
        </div>

        {/* Main Content Grid */}
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
              Portfolio Distribution
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
          </motion.div>
        </div>

        {/* Market Overview & Active Positions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Market Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Market Overview
            </h2>
            
            <div className="space-y-4">
              {topSymbols.map((symbol, index) => {
                const marketPrice = mockMarketData[symbol.symbol]
                if (!marketPrice) return null
                
                return (
                  <div key={symbol.symbol} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {symbol.baseAsset.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {symbol.symbol}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {symbol.name}
                        </p>
                      </div>
                    </div>
                    
                    <PriceDisplay
                      price={marketPrice.price}
                      previousPrice={marketPrice.prevPrice}
                      currency="USD"
                      decimals={symbol.pricePrecision}
                      size="sm"
                      showChange={true}
                      showPercentage={true}
                    />
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Active Positions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Active Positions
            </h2>
            
            <div className="space-y-4">
              {activePositions.map((position) => (
                <div key={position.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {position.symbol}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        position.side === OrderSide.BUY 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {position.side}
                      </span>
                    </div>
                    <span className={`font-medium ${
                      position.pnl >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {position.pnl >= 0 ? '+' : ''}
                      ${position.pnl.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="block">Size: {position.size}</span>
                      <span className="block">Entry: ${position.entryPrice.toFixed(4)}</span>
                    </div>
                    <div>
                      <span className="block">Current: ${position.currentPrice.toFixed(4)}</span>
                      <span className="block">P&L%: {position.pnlPercent.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Trades & Market News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Trades */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Trades
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Symbol</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Side</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Size</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Price</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map((trade: Trade) => (
                    <tr key={trade.id} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 font-medium text-gray-900 dark:text-white">
                        {trade.symbol}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          trade.side === OrderBookSide.BUY 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {trade.side}
                        </span>
                      </td>
                      <td className="py-3 text-gray-600 dark:text-gray-400">
                        {trade.quantity}
                      </td>
                      <td className="py-3 text-gray-600 dark:text-gray-400">
                        ${trade.price.toFixed(4)}
                      </td>
                      <td className="py-3 text-gray-600 dark:text-gray-400">
                        {new Date(trade.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Market News */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Market News
            </h2>
            
            <div className="space-y-4">
              {latestNews.map((article: NewsArticle) => (
                <div key={article.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                    <span>{article.source.name}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 