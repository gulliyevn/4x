'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PriceDisplay from '@/components/ui/PriceDisplay'
import { LineChart, AreaChart } from '@/components/ui/Charts'
import { useRealTimePrice } from '@/hooks/useRealTimePrice'
import { useMarketStore } from '@/stores/marketStore'
import { 
  mockSymbols,
  mockMarketData
} from '@/lib/mockData'

export default function MarketsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT')
  const [sortBy, setSortBy] = useState('symbol')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [chartData, setChartData] = useState<any[]>([])
  
  const { marketData } = useMarketStore()
  
  // Generate chart data for selected symbol
  useEffect(() => {
    const generateChartData = () => {
      const data = []
      const now = Date.now()
      const basePrice = mockMarketData[selectedSymbol]?.price || 45000
      let currentPrice = basePrice
      
      for (let i = 24; i >= 0; i--) {
        const time = now - (i * 60 * 60 * 1000) // Hourly data
        const change = (Math.random() - 0.5) * 0.02
        currentPrice = currentPrice * (1 + change)
        
        data.push({
          x: time,
          y: currentPrice,
          label: new Date(time).toLocaleTimeString()
        })
      }
      
      setChartData(data)
    }

    generateChartData()
  }, [selectedSymbol])

  // Filter and sort symbols
  const filteredSymbols = mockSymbols
    .filter(symbol => {
      const matchesSearch = symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           symbol.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || symbol.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'symbol':
          aValue = a.symbol
          bValue = b.symbol
          break
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'price':
          aValue = mockMarketData[a.symbol]?.price || 0
          bValue = mockMarketData[b.symbol]?.price || 0
          break
        case 'change':
          aValue = mockMarketData[a.symbol]?.change24h || 0
          bValue = mockMarketData[b.symbol]?.change24h || 0
          break
        default:
          aValue = a.symbol
          bValue = b.symbol
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const categories = ['All', ...Array.from(new Set(mockSymbols.map(s => s.category)))]

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Markets
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Real-time market data and trading opportunities across all asset classes.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Markets
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by symbol or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredSymbols.length} of {mockSymbols.length} markets
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Markets Table */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Market Data
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => handleSort('symbol')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Symbol</span>
                          {sortBy === 'symbol' && (
                            <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Name</span>
                          {sortBy === 'name' && (
                            <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => handleSort('price')}
                      >
                        <div className="flex items-center justify-end space-x-1">
                          <span>Price</span>
                          {sortBy === 'price' && (
                            <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => handleSort('change')}
                      >
                        <div className="flex items-center justify-end space-x-1">
                          <span>24h Change</span>
                          {sortBy === 'change' && (
                            <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredSymbols.map((symbol, index) => {
                      const marketPrice = mockMarketData[symbol.symbol]
                      if (!marketPrice) return null

                      return (
                        <motion.tr
                          key={symbol.symbol}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                            selectedSymbol === symbol.symbol ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => setSelectedSymbol(symbol.symbol)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-xs">
                                  {symbol.baseAsset.slice(0, 2)}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {symbol.symbol}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {symbol.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {symbol.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <PriceDisplay
                              price={marketPrice.price}
                              previousPrice={marketPrice.prevPrice}
                              currency="USD"
                              decimals={symbol.pricePrecision}
                              size="sm"
                              showChange={false}
                              showPercentage={false}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className={`text-sm font-medium ${
                              marketPrice.change24h >= 0 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              {marketPrice.change24h >= 0 ? '+' : ''}
                              {marketPrice.change24h.toFixed(2)}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                              Trade
                            </button>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Chart Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedSymbol}
                </h3>
                <div className="flex items-center space-x-4">
                  {mockMarketData[selectedSymbol] && (
                    <PriceDisplay
                      price={mockMarketData[selectedSymbol].price}
                      previousPrice={mockMarketData[selectedSymbol].prevPrice}
                      currency="USD"
                      decimals={mockSymbols.find(s => s.symbol === selectedSymbol)?.pricePrecision || 2}
                      size="md"
                      showChange={true}
                      showPercentage={true}
                    />
                  )}
                </div>
              </div>

              <div className="mb-4">
                <AreaChart
                  data={chartData}
                  width={300}
                  height={200}
                  color="#3b82f6"
                  gradient={true}
                  showGrid={true}
                  showAxes={false}
                  animate={true}
                />
              </div>

              <div className="space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Buy {selectedSymbol}
                </button>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Sell {selectedSymbol}
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Add to Watchlist
                </button>
              </div>

              {/* Market Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Market Statistics
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">24h Volume:</span>
                    <span className="text-gray-900 dark:text-white">
                      {mockMarketData[selectedSymbol]?.volume24h?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">24h High:</span>
                    <span className="text-gray-900 dark:text-white">
                      ${mockMarketData[selectedSymbol]?.high24h?.toFixed(2) || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">24h Low:</span>
                    <span className="text-gray-900 dark:text-white">
                      ${mockMarketData[selectedSymbol]?.low24h?.toFixed(2) || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 