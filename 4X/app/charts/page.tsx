'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, AreaChart, CandlestickChart, VolumeChart, PieChart } from '@/components/ui/Charts'
import PriceDisplay from '@/components/ui/PriceDisplay'
import { useMarketStore } from '@/stores/marketStore'
import { 
  mockSymbols,
  mockMarketData
} from '@/lib/mockData'

type ChartType = 'line' | 'area' | 'candlestick' | 'volume' | 'pie'
type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w'

export default function ChartsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT')
  const [selectedChart, setSelectedChart] = useState<ChartType>('candlestick')
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1h')
  const [chartData, setChartData] = useState<any[]>([])
  const [candlestickData, setCandlestickData] = useState<any[]>([])
  const [volumeData, setVolumeData] = useState<any[]>([])
  
  const { marketData } = useMarketStore()

  // Generate chart data based on timeframe
  useEffect(() => {
    const generateChartData = () => {
      const data = []
      const candleData = []
      const volData = []
      const now = Date.now()
      
      // Determine time interval based on timeframe
      const intervals = {
        '1m': 60 * 1000,
        '5m': 5 * 60 * 1000,
        '15m': 15 * 60 * 1000,
        '1h': 60 * 60 * 1000,
        '4h': 4 * 60 * 60 * 1000,
        '1d': 24 * 60 * 60 * 1000,
        '1w': 7 * 24 * 60 * 60 * 1000
      }
      
      const interval = intervals[selectedTimeframe]
      const periods = selectedTimeframe === '1w' ? 52 : selectedTimeframe === '1d' ? 30 : 100
      
      const basePrice = mockMarketData[selectedSymbol]?.price || 45000
      let currentPrice = basePrice
      
      for (let i = periods; i >= 0; i--) {
        const time = now - (i * interval)
        const volatility = 0.02
        
        // Generate OHLC data
        const open = currentPrice
        const change = (Math.random() - 0.5) * volatility
        const close = open * (1 + change)
        const high = Math.max(open, close) * (1 + Math.random() * 0.01)
        const low = Math.min(open, close) * (1 - Math.random() * 0.01)
        const volume = Math.floor(Math.random() * 1000000 + 100000)
        
        currentPrice = close
        
        // Line/Area chart data
        data.push({
          x: time,
          y: close,
          label: new Date(time).toLocaleString()
        })
        
        // Candlestick data
        candleData.push({
          time,
          open,
          high,
          low,
          close,
          volume
        })
        
        // Volume data
        volData.push({
          x: time,
          y: volume,
          label: new Date(time).toLocaleString()
        })
      }
      
      setChartData(data)
      setCandlestickData(candleData)
      setVolumeData(volData)
    }

    generateChartData()
  }, [selectedSymbol, selectedTimeframe])

  const chartTypes = [
    { id: 'line', name: 'Line Chart', icon: '📈' },
    { id: 'area', name: 'Area Chart', icon: '📊' },
    { id: 'candlestick', name: 'Candlestick', icon: '🕯️' },
    { id: 'volume', name: 'Volume', icon: '📶' },
    { id: 'pie', name: 'Portfolio', icon: '🥧' }
  ]

  const timeframes = [
    { id: '1m', name: '1m' },
    { id: '5m', name: '5m' },
    { id: '15m', name: '15m' },
    { id: '1h', name: '1h' },
    { id: '4h', name: '4h' },
    { id: '1d', name: '1d' },
    { id: '1w', name: '1w' }
  ]

  const portfolioData = [
    { label: 'BTC', value: 35000, color: '#f7931a' },
    { label: 'ETH', value: 25000, color: '#627eea' },
    { label: 'Stocks', value: 20000, color: '#10b981' },
    { label: 'Forex', value: 15000, color: '#3b82f6' },
    { label: 'Cash', value: 5000, color: '#6b7280' }
  ]

  const renderChart = () => {
    const commonProps = {
      width: 800,
      height: 400,
      animate: true,
      showGrid: true,
      showAxes: true
    }

    switch (selectedChart) {
      case 'line':
        return (
          <LineChart
            {...commonProps}
            data={chartData}
            color="#3b82f6"
          />
        )
      case 'area':
        return (
          <AreaChart
            {...commonProps}
            data={chartData}
            color="#10b981"
            gradient={true}
          />
        )
      case 'candlestick':
        return (
          <CandlestickChart
            {...commonProps}
            data={candlestickData}
            showVolume={true}
          />
        )
      case 'volume':
        return (
          <VolumeChart
            {...commonProps}
            data={volumeData}
            color="#8b5cf6"
          />
        )
      case 'pie':
        return (
          <PieChart
            width={400}
            height={400}
            data={portfolioData}
            innerRadius={80}
            showLegend={true}
            showLabels={true}
            animate={true}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Advanced Charts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Professional trading charts with multiple visualization options and real-time data.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Symbol Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trading Pair
              </label>
              <select
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {mockSymbols.slice(0, 10).map(symbol => (
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
                {chartTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedChart(type.id as ChartType)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedChart === type.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="mr-1">{type.icon}</span>
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timeframe
              </label>
              <div className="flex flex-wrap gap-2">
                {timeframes.map(timeframe => (
                  <button
                    key={timeframe.id}
                    onClick={() => setSelectedTimeframe(timeframe.id as Timeframe)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedTimeframe === timeframe.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    disabled={selectedChart === 'pie'}
                  >
                    {timeframe.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Price Display */}
        {selectedChart !== 'pie' && mockMarketData[selectedSymbol] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedSymbol}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {mockSymbols.find(s => s.symbol === selectedSymbol)?.name}
                </p>
              </div>
              <PriceDisplay
                price={mockMarketData[selectedSymbol].price}
                previousPrice={mockMarketData[selectedSymbol].prevPrice}
                currency="USD"
                decimals={mockSymbols.find(s => s.symbol === selectedSymbol)?.pricePrecision || 2}
                size="lg"
                showChange={true}
                showPercentage={true}
              />
            </div>
          </motion.div>
        )}

        {/* Chart Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {chartTypes.find(t => t.id === selectedChart)?.name}
              {selectedChart !== 'pie' && ` - ${selectedTimeframe.toUpperCase()}`}
            </h3>
            
            {selectedChart !== 'pie' && (
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Live Data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Real-time Updates</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            {renderChart()}
          </div>

          {/* Chart Info */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              {selectedChart !== 'pie' ? (
                <>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Data Points:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {chartData.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Timeframe:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {selectedTimeframe.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Last Update:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Total Value:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      ${portfolioData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Assets:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {portfolioData.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Largest Position:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {portfolioData.reduce((max, item) => item.value > max.value ? item : max).label}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Chart Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Chart Features
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">📊</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Real-time Data</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Live market updates</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">🎯</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Interactive</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Zoom & pan support</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400">⚡</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Fast Rendering</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Optimized performance</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 dark:text-yellow-400">🎨</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Customizable</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Multiple themes</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 