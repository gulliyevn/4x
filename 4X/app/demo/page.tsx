'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PriceDisplay from '@/components/ui/PriceDisplay'
import { NotificationCenter, useNotifications } from '@/components/ui/NotificationCenter'
import ErrorBoundary from '@/components/ErrorBoundary'
import { LineChart, AreaChart, CandlestickChart, VolumeChart, PieChart } from '@/components/ui/Charts'
import { useRealTimePrice } from '@/hooks/useRealTimePrice'
import { useMarketStore } from '@/stores/marketStore'

export default function DemoPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('EURUSD')
  const [selectedChart, setSelectedChart] = useState<'line' | 'area' | 'candlestick' | 'volume' | 'pie'>('line')
  const [priceHistory, setPriceHistory] = useState<{ x: number; y: number; label: string }[]>([])
  const [candlestickData, setCandlestickData] = useState<any[]>([])
  const [volumeData, setVolumeData] = useState<any[]>([])
  const [portfolioData, setPortfolioData] = useState<any[]>([])
  
  const { showPriceAlert, showTradeExecution, showSystemNotification } = useNotifications()
  const { symbols, marketData } = useMarketStore()
  
  // Real-time price hook
  const { price: realTimePrice, isConnected, error } = useRealTimePrice({
    symbol: selectedSymbol,
    enabled: true
  })

  // Generate demo chart data
  useEffect(() => {
    const generateChartData = () => {
      const data = []
      const candleData = []
      const volData = []
      const now = Date.now()
      let basePrice = 1.2345
      
      for (let i = 30; i >= 0; i--) {
        const time = now - (i * 60000) // 1 minute intervals
        const volatility = 0.001
        const change = (Math.random() - 0.5) * 2 * volatility
        const newPrice = basePrice * (1 + change)
        
        // Line/Area chart data
        data.push({
          x: time,
          y: Number(newPrice.toFixed(5)),
          label: new Date(time).toLocaleTimeString()
        })

        // Candlestick data
        const open = basePrice
        const close = newPrice
        const high = Math.max(open, close) * (1 + Math.random() * 0.001)
        const low = Math.min(open, close) * (1 - Math.random() * 0.001)
        const volume = Math.random() * 1000000

        candleData.push({
          time,
          open: Number(open.toFixed(5)),
          high: Number(high.toFixed(5)),
          low: Number(low.toFixed(5)),
          close: Number(close.toFixed(5)),
          volume: Math.floor(volume)
        })

        // Volume data
        volData.push({
          time,
          volume: Math.floor(volume),
          price: newPrice,
          label: new Date(time).toLocaleTimeString()
        })
        
        basePrice = newPrice
      }
      
      setPriceHistory(data)
      setCandlestickData(candleData)
      setVolumeData(volData)
    }

    generateChartData()
    const interval = setInterval(generateChartData, 5000) // Update every 5 seconds
    
    return () => clearInterval(interval)
  }, [selectedSymbol])

  // Generate portfolio data
  useEffect(() => {
    setPortfolioData([
      { label: 'EUR/USD', value: 35000, color: '#3b82f6' },
      { label: 'GBP/USD', value: 25000, color: '#ef4444' },
      { label: 'USD/JPY', value: 20000, color: '#10b981' },
      { label: 'BTC/USD', value: 15000, color: '#f59e0b' },
      { label: 'ETH/USD', value: 5000, color: '#8b5cf6' }
    ])
  }, [])

  // Demo notification triggers
  const triggerDemoNotifications = () => {
    showPriceAlert('EURUSD', 1.2350, 1.2345)
    
    setTimeout(() => {
      showTradeExecution('GBPUSD', 'buy', 0.1, 1.2678)
    }, 1000)
    
    setTimeout(() => {
      showSystemNotification('Market Update', 'Trading session has started', 'info')
    }, 2000)
    
    setTimeout(() => {
      showSystemNotification('Success!', 'Order executed successfully', 'success')
    }, 3000)
  }

  const currentPrice = realTimePrice?.price || marketData[selectedSymbol]?.price || 1.2345
  const previousPrice = realTimePrice?.previousPrice || marketData[selectedSymbol]?.prevPrice || 1.2340

  const chartTypes = [
    { id: 'line', label: 'Line Chart', icon: '📈' },
    { id: 'area', label: 'Area Chart', icon: '📊' },
    { id: 'candlestick', label: 'Candlestick', icon: '🕯️' },
    { id: 'volume', label: 'Volume', icon: '📊' },
    { id: 'pie', label: 'Portfolio', icon: '🥧' }
  ] as const

  const renderChart = () => {
    switch (selectedChart) {
      case 'line':
        return (
          <LineChart
            data={priceHistory}
            width={600}
            height={300}
            color="#3b82f6"
            showDots={true}
            showGrid={true}
            showAxes={true}
            animate={true}
          />
        )
      case 'area':
        return (
          <AreaChart
            data={priceHistory}
            width={600}
            height={300}
            color="#10b981"
            showDots={false}
            showGrid={true}
            showAxes={true}
            animate={true}
            gradient={true}
          />
        )
      case 'candlestick':
        return (
          <CandlestickChart
            data={candlestickData}
            width={600}
            height={400}
            showVolume={true}
            animate={true}
          />
        )
      case 'volume':
        return (
          <VolumeChart
            data={volumeData}
            width={600}
            height={300}
            color="#6366f1"
            showGrid={true}
            showAxes={true}
            animate={true}
          />
        )
      case 'pie':
        return (
          <PieChart
            data={portfolioData}
            width={400}
            height={400}
            innerRadius={60}
            showLabels={true}
            showLegend={true}
            animate={true}
          />
        )
      default:
        return null
    }
  }

  return (
    <ErrorBoundary enableRetry showDetails={process.env.NODE_ENV === 'development'}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  4X Trading Platform Demo
                </h1>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <NotificationCenter />
                <button
                  onClick={triggerDemoNotifications}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Demo Notifications
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Controls */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Symbol Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Trading Pair
              </label>
              <select
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {symbols.map((symbol) => (
                  <option key={symbol.symbol} value={symbol.symbol}>
                    {symbol.symbol} - {symbol.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Chart Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chart Type
              </label>
              <div className="flex flex-wrap gap-2">
                {chartTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedChart(type.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedChart === type.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {type.icon} {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Price Display Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Real-Time Price Display
              </h2>
              
              <div className="space-y-6">
                {/* Large Price Display */}
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                    {selectedSymbol}
                  </h3>
                  <PriceDisplay
                    price={currentPrice}
                    previousPrice={previousPrice}
                    currency="USD"
                    decimals={5}
                    size="lg"
                    showChange={true}
                    showPercentage={true}
                    className="justify-center"
                  />
                </div>

                {/* Different Size Examples */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Medium Size
                    </h4>
                    <PriceDisplay
                      price={currentPrice}
                      previousPrice={previousPrice}
                      currency="USD"
                      decimals={5}
                      size="md"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Small Size
                    </h4>
                    <PriceDisplay
                      price={currentPrice}
                      previousPrice={previousPrice}
                      currency="USD"
                      decimals={5}
                      size="sm"
                    />
                  </div>
                </div>

                {/* Connection Status */}
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Error: {error}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Chart Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {chartTypes.find(t => t.id === selectedChart)?.label} - {selectedChart === 'pie' ? 'Portfolio Distribution' : selectedSymbol}
              </h2>
              
              <div className="flex justify-center">
                {renderChart()}
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Chart Types */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Multiple Chart Types
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Line, Area, Candlestick, Volume, and Pie charts with smooth animations and interactions.
              </p>
            </div>

            {/* Real-time Features */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Real-time Updates
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Live price feeds with WebSocket connections, automatic reconnection, and fallback to REST API.
              </p>
            </div>

            {/* Animations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Smooth Animations
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Flash animations on price changes, smooth transitions, and professional trading platform feel.
              </p>
            </div>

            {/* Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Optimized Performance
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                React.memo, useMemo, useCallback optimizations for smooth performance even with real-time updates.
              </p>
            </div>
          </motion.div>

          {/* Demo Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
              Demo Instructions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800 dark:text-blue-200">
              <div>
                <h4 className="font-medium mb-2">Chart Features:</h4>
                <ul className="space-y-1">
                  <li>• Switch between different chart types</li>
                  <li>• Watch real-time price updates</li>
                  <li>• Hover over chart elements for details</li>
                  <li>• See smooth animations and transitions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Interactive Elements:</h4>
                <ul className="space-y-1">
                  <li>• Click "Demo Notifications" for alerts</li>
                  <li>• Check notification center (bell icon)</li>
                  <li>• Try different trading pairs</li>
                  <li>• Toggle notification sound settings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Chart Types:</h4>
                <ul className="space-y-1">
                  <li>• Line: Simple price movements</li>
                  <li>• Area: Filled area under price line</li>
                  <li>• Candlestick: OHLC with volume</li>
                  <li>• Volume: Trading volume bars</li>
                  <li>• Portfolio: Asset distribution pie chart</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  )
} 