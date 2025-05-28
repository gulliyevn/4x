'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Forex Pair Interface
interface ForexPair {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  spread: number
  volume: string
  high: number
  low: number
  category: 'major' | 'minor' | 'exotic'
  isPositive: boolean
}

// Mock Forex Data
const mockForexData: ForexPair[] = [
  {
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    price: 1.0856,
    change: 0.0023,
    changePercent: 0.21,
    spread: 0.8,
    volume: '2.1B',
    high: 1.0889,
    low: 1.0834,
    category: 'major',
    isPositive: true
  },
  {
    symbol: 'GBP/USD',
    name: 'British Pound / US Dollar',
    price: 1.2734,
    change: -0.0045,
    changePercent: -0.35,
    spread: 1.2,
    volume: '1.8B',
    high: 1.2789,
    low: 1.2712,
    category: 'major',
    isPositive: false
  },
  {
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    price: 149.67,
    change: 0.89,
    changePercent: 0.60,
    spread: 0.9,
    volume: '1.9B',
    high: 150.12,
    low: 148.95,
    category: 'major',
    isPositive: true
  },
  {
    symbol: 'USD/CHF',
    name: 'US Dollar / Swiss Franc',
    price: 0.8923,
    change: 0.0012,
    changePercent: 0.13,
    spread: 1.1,
    volume: '456M',
    high: 0.8945,
    low: 0.8901,
    category: 'major',
    isPositive: true
  },
  {
    symbol: 'AUD/USD',
    name: 'Australian Dollar / US Dollar',
    price: 0.6567,
    change: -0.0034,
    changePercent: -0.51,
    spread: 1.3,
    volume: '789M',
    high: 0.6612,
    low: 0.6545,
    category: 'major',
    isPositive: false
  },
  {
    symbol: 'USD/CAD',
    name: 'US Dollar / Canadian Dollar',
    price: 1.3678,
    change: 0.0023,
    changePercent: 0.17,
    spread: 1.4,
    volume: '567M',
    high: 1.3701,
    low: 1.3645,
    category: 'major',
    isPositive: true
  },
  {
    symbol: 'NZD/USD',
    name: 'New Zealand Dollar / US Dollar',
    price: 0.6123,
    change: -0.0019,
    changePercent: -0.31,
    spread: 1.8,
    volume: '234M',
    high: 0.6156,
    low: 0.6098,
    category: 'major',
    isPositive: false
  },
  {
    symbol: 'EUR/GBP',
    name: 'Euro / British Pound',
    price: 0.8523,
    change: 0.0015,
    changePercent: 0.18,
    spread: 1.5,
    volume: '345M',
    high: 0.8545,
    low: 0.8501,
    category: 'minor',
    isPositive: true
  },
  {
    symbol: 'EUR/JPY',
    name: 'Euro / Japanese Yen',
    price: 162.45,
    change: 0.67,
    changePercent: 0.41,
    spread: 1.6,
    volume: '456M',
    high: 163.12,
    low: 161.89,
    category: 'minor',
    isPositive: true
  },
  {
    symbol: 'GBP/JPY',
    name: 'British Pound / Japanese Yen',
    price: 190.56,
    change: -0.89,
    changePercent: -0.47,
    spread: 2.1,
    volume: '234M',
    high: 191.78,
    low: 189.67,
    category: 'minor',
    isPositive: false
  },
  {
    symbol: 'USD/TRY',
    name: 'US Dollar / Turkish Lira',
    price: 28.45,
    change: 0.23,
    changePercent: 0.81,
    spread: 15.0,
    volume: '123M',
    high: 28.67,
    low: 28.12,
    category: 'exotic',
    isPositive: true
  },
  {
    symbol: 'USD/ZAR',
    name: 'US Dollar / South African Rand',
    price: 18.67,
    change: -0.12,
    changePercent: -0.64,
    spread: 8.5,
    volume: '89M',
    high: 18.89,
    low: 18.45,
    category: 'exotic',
    isPositive: false
  }
]

export default function ForexPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change' | 'volume'>('name')

  const categories = [
    { id: 'all', name: 'All Pairs', icon: '🌐' },
    { id: 'major', name: 'Major Pairs', icon: '💰' },
    { id: 'minor', name: 'Minor Pairs', icon: '📊' },
    { id: 'exotic', name: 'Exotic Pairs', icon: '🌍' }
  ]

  // Filter and sort data
  const filteredData = mockForexData
    .filter(pair => {
      const matchesCategory = selectedCategory === 'all' || pair.category === selectedCategory
      const matchesSearch = pair.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pair.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price
        case 'change':
          return b.changePercent - a.changePercent
        case 'volume':
          return parseFloat(b.volume.replace(/[BM]/g, '')) - parseFloat(a.volume.replace(/[BM]/g, ''))
        default:
          return a.symbol.localeCompare(b.symbol)
      }
    })

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">💱</span>
                <h1 className="text-3xl md:text-4xl font-bold text-primary">
                  Forex Trading
                </h1>
              </div>
              <p className="text-lg text-secondary">
                Trade major, minor, and exotic currency pairs with tight spreads and fast execution
              </p>
            </div>
            
            {/* Market Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$7.5T</div>
                <div className="text-sm text-secondary">Daily Volume</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">0.8</div>
                <div className="text-sm text-secondary">Avg Spread</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/5</div>
                <div className="text-sm text-secondary">Trading Hours</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`btn btn-sm ${
                    selectedCategory === category.id 
                      ? 'btn-primary' 
                      : 'btn-ghost border border-neutral-300'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 lg:ml-auto">
              {/* Search */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search pairs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus-ring w-full sm:w-64"
                />
              </div>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'change' | 'volume')}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus-ring"
              >
                <option value="name">Sort by Pair</option>
                <option value="price">Sort by Price</option>
                <option value="change">Sort by Change</option>
                <option value="volume">Sort by Volume</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Forex Pairs Table */}
      <section className="section">
        <div className="container">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-secondary">
                <div className="col-span-3">Currency Pair</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Change</div>
                <div className="col-span-1 text-right hidden md:block">Spread</div>
                <div className="col-span-2 text-right hidden lg:block">High/Low</div>
                <div className="col-span-1 text-right hidden lg:block">Volume</div>
                <div className="col-span-1 text-right">Action</div>
              </div>
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-neutral-200">
              {filteredData.map((pair) => (
                <div key={pair.symbol} className="px-6 py-4 hover:bg-neutral-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Pair Info */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {pair.symbol.split('/')[0].charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-primary">{pair.symbol}</div>
                          <div className="text-sm text-secondary">{pair.name}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-2 text-right">
                      <div className="font-semibold text-primary">
                        {pair.price.toFixed(4)}
                      </div>
                    </div>
                    
                    {/* Change */}
                    <div className="col-span-2 text-right">
                      <div className={`font-semibold ${pair.isPositive ? 'text-success' : 'text-danger'}`}>
                        {pair.isPositive ? '+' : ''}{pair.change.toFixed(4)}
                      </div>
                      <div className={`text-sm ${pair.isPositive ? 'text-success' : 'text-danger'}`}>
                        {pair.isPositive ? '+' : ''}{pair.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    
                    {/* Spread */}
                    <div className="col-span-1 text-right hidden md:block">
                      <div className="font-medium text-secondary">{pair.spread.toFixed(1)}</div>
                    </div>
                    
                    {/* High/Low */}
                    <div className="col-span-2 text-right hidden lg:block">
                      <div className="text-sm">
                        <div className="text-success">{pair.high.toFixed(4)}</div>
                        <div className="text-danger">{pair.low.toFixed(4)}</div>
                      </div>
                    </div>
                    
                    {/* Volume */}
                    <div className="col-span-1 text-right hidden lg:block">
                      <div className="font-medium text-secondary">{pair.volume}</div>
                    </div>
                    
                    {/* Action */}
                    <div className="col-span-1 text-right">
                      <Link 
                        href={`/charts?symbol=${pair.symbol}`}
                        className="btn btn-sm btn-primary"
                      >
                        Trade
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Forex Categories */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-2xl font-bold text-primary mb-8">Currency Categories</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Major Pairs */}
            <div className="trading-card">
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-semibold text-primary mb-2">Major Pairs</h3>
                <p className="text-sm text-secondary mb-4">
                  Most traded currency pairs with highest liquidity and lowest spreads
                </p>
                <div className="space-y-2">
                  {mockForexData
                    .filter(pair => pair.category === 'major')
                    .slice(0, 4)
                    .map((pair) => (
                      <div key={pair.symbol} className="flex justify-between text-sm">
                        <span>{pair.symbol}</span>
                        <span className={pair.isPositive ? 'text-success' : 'text-danger'}>
                          {pair.isPositive ? '+' : ''}{pair.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Minor Pairs */}
            <div className="trading-card">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-semibold text-primary mb-2">Minor Pairs</h3>
                <p className="text-sm text-secondary mb-4">
                  Cross-currency pairs without USD, offering diverse trading opportunities
                </p>
                <div className="space-y-2">
                  {mockForexData
                    .filter(pair => pair.category === 'minor')
                    .map((pair) => (
                      <div key={pair.symbol} className="flex justify-between text-sm">
                        <span>{pair.symbol}</span>
                        <span className={pair.isPositive ? 'text-success' : 'text-danger'}>
                          {pair.isPositive ? '+' : ''}{pair.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Exotic Pairs */}
            <div className="trading-card">
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="font-semibold text-primary mb-2">Exotic Pairs</h3>
                <p className="text-sm text-secondary mb-4">
                  Emerging market currencies with higher volatility and potential returns
                </p>
                <div className="space-y-2">
                  {mockForexData
                    .filter(pair => pair.category === 'exotic')
                    .map((pair) => (
                      <div key={pair.symbol} className="flex justify-between text-sm">
                        <span>{pair.symbol}</span>
                        <span className={pair.isPositive ? 'text-success' : 'text-danger'}>
                          {pair.isPositive ? '+' : ''}{pair.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forex Features */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-bold text-primary mb-8">Advanced Forex Features</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tight Spreads */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Tight Spreads</h3>
              <p className="text-secondary mb-6">
                Competitive spreads starting from 0.8 pips on major currency pairs
              </p>
              <div className="text-2xl font-bold text-accent-primary">0.8 pips</div>
            </div>

            {/* High Leverage */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">High Leverage</h3>
              <p className="text-secondary mb-6">
                Trade with leverage up to 1:500 for maximum capital efficiency
              </p>
              <div className="text-2xl font-bold text-accent-primary">1:500</div>
            </div>

            {/* 24/5 Trading */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">24/5 Trading</h3>
              <p className="text-secondary mb-6">
                Trade around the clock from Sunday 5 PM to Friday 5 PM EST
              </p>
              <div className="text-2xl font-bold text-accent-primary">24/5</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Forex Trading Today
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Access the world's largest financial market with professional tools and tight spreads
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn bg-white text-primary hover:bg-neutral-100 btn-lg">
              Open Account
            </Link>
            <Link href="/charts" className="btn btn-ghost border-white text-white hover:bg-white hover:text-primary btn-lg">
              Start Trading
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 