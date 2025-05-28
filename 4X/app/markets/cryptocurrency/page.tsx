'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Crypto Data Interface
interface CryptoData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  rank: number
  supply: string
  category: 'major' | 'altcoin' | 'defi' | 'meme'
  isPositive: boolean
}

// Mock Crypto Data
const mockCryptoData: CryptoData[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67234.56,
    change: 1567.23,
    changePercent: 2.34,
    volume: '$28.5B',
    marketCap: '$1.31T',
    rank: 1,
    supply: '19.7M',
    category: 'major',
    isPositive: true
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3456.78,
    change: 63.45,
    changePercent: 1.87,
    volume: '$15.2B',
    marketCap: '$415B',
    rank: 2,
    supply: '120.4M',
    category: 'major',
    isPositive: true
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    price: 591.23,
    change: -12.34,
    changePercent: -2.05,
    volume: '$1.8B',
    marketCap: '$88.5B',
    rank: 3,
    supply: '149.5M',
    category: 'major',
    isPositive: false
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 156.78,
    change: 8.92,
    changePercent: 6.03,
    volume: '$3.2B',
    marketCap: '$70.2B',
    rank: 4,
    supply: '447.8M',
    category: 'altcoin',
    isPositive: true
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.6234,
    change: 0.0234,
    changePercent: 3.91,
    volume: '$456M',
    marketCap: '$22.1B',
    rank: 8,
    supply: '35.4B',
    category: 'altcoin',
    isPositive: true
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 42.56,
    change: -1.23,
    changePercent: -2.81,
    volume: '$234M',
    marketCap: '$16.8B',
    rank: 12,
    supply: '394.8M',
    category: 'altcoin',
    isPositive: false
  },
  {
    symbol: 'UNI',
    name: 'Uniswap',
    price: 8.92,
    change: 0.45,
    changePercent: 5.31,
    volume: '$189M',
    marketCap: '$5.4B',
    rank: 18,
    supply: '605.2M',
    category: 'defi',
    isPositive: true
  },
  {
    symbol: 'AAVE',
    name: 'Aave',
    price: 156.78,
    change: 12.34,
    changePercent: 8.54,
    volume: '$123M',
    marketCap: '$2.3B',
    rank: 45,
    supply: '14.7M',
    category: 'defi',
    isPositive: true
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.1234,
    change: -0.0045,
    changePercent: -3.52,
    volume: '$567M',
    marketCap: '$17.8B',
    rank: 9,
    supply: '144.3B',
    category: 'meme',
    isPositive: false
  },
  {
    symbol: 'SHIB',
    name: 'Shiba Inu',
    price: 0.000024,
    change: 0.000001,
    changePercent: 4.35,
    volume: '$234M',
    marketCap: '$14.2B',
    rank: 11,
    supply: '589.7T',
    category: 'meme',
    isPositive: true
  }
]

export default function CryptocurrencyPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'rank' | 'price' | 'change' | 'volume'>('rank')

  const categories = [
    { id: 'all', name: 'All Crypto', icon: '🌐' },
    { id: 'major', name: 'Major Coins', icon: '₿' },
    { id: 'altcoin', name: 'Altcoins', icon: '🪙' },
    { id: 'defi', name: 'DeFi', icon: '🏦' },
    { id: 'meme', name: 'Meme Coins', icon: '🐕' }
  ]

  // Filter and sort data
  const filteredData = mockCryptoData
    .filter(crypto => {
      const matchesCategory = selectedCategory === 'all' || crypto.category === selectedCategory
      const matchesSearch = crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price
        case 'change':
          return b.changePercent - a.changePercent
        case 'volume':
          return parseFloat(b.volume.replace(/[$B]/g, '')) - parseFloat(a.volume.replace(/[$B]/g, ''))
        default:
          return a.rank - b.rank
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
                <span className="text-3xl">₿</span>
                <h1 className="text-3xl md:text-4xl font-bold text-primary">
                  Cryptocurrency Market
                </h1>
              </div>
              <p className="text-lg text-secondary">
                Trade Bitcoin, Ethereum, and thousands of altcoins with advanced crypto tools
              </p>
            </div>
            
            {/* Crypto Market Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$2.1T</div>
                <div className="text-sm text-secondary">Total Market Cap</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">+2.34%</div>
                <div className="text-sm text-secondary">24h Change</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">45.2%</div>
                <div className="text-sm text-secondary">BTC Dominance</div>
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
                  placeholder="Search crypto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus-ring w-full sm:w-64"
                />
              </div>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rank' | 'price' | 'change' | 'volume')}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus-ring"
              >
                <option value="rank">Sort by Rank</option>
                <option value="price">Sort by Price</option>
                <option value="change">Sort by Change</option>
                <option value="volume">Sort by Volume</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Data Table */}
      <section className="section">
        <div className="container">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-secondary">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-3">Cryptocurrency</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">24h Change</div>
                <div className="col-span-2 text-right hidden lg:block">Market Cap</div>
                <div className="col-span-1 text-right hidden md:block">Volume</div>
                <div className="col-span-1 text-right">Action</div>
              </div>
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-neutral-200">
              {filteredData.map((crypto) => (
                <div key={crypto.symbol} className="px-6 py-4 hover:bg-neutral-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Rank */}
                    <div className="col-span-1 text-center">
                      <div className="font-semibold text-secondary">#{crypto.rank}</div>
                    </div>
                    
                    {/* Crypto Info */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {crypto.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-primary">{crypto.symbol}</div>
                          <div className="text-sm text-secondary">{crypto.name}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-2 text-right">
                      <div className="font-semibold text-primary">
                        ${crypto.price < 1 ? crypto.price.toFixed(6) : crypto.price.toLocaleString()}
                      </div>
                    </div>
                    
                    {/* 24h Change */}
                    <div className="col-span-2 text-right">
                      <div className={`font-semibold ${crypto.isPositive ? 'text-success' : 'text-danger'}`}>
                        {crypto.isPositive ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                      </div>
                      <div className={`text-sm ${crypto.isPositive ? 'text-success' : 'text-danger'}`}>
                        {crypto.isPositive ? '+' : ''}${Math.abs(crypto.change).toFixed(crypto.change < 1 ? 6 : 2)}
                      </div>
                    </div>
                    
                    {/* Market Cap */}
                    <div className="col-span-2 text-right hidden lg:block">
                      <div className="font-medium text-secondary">{crypto.marketCap}</div>
                      <div className="text-sm text-tertiary">Supply: {crypto.supply}</div>
                    </div>
                    
                    {/* Volume */}
                    <div className="col-span-1 text-right hidden md:block">
                      <div className="font-medium text-secondary">{crypto.volume}</div>
                    </div>
                    
                    {/* Action */}
                    <div className="col-span-1 text-right">
                      <Link 
                        href={`/charts?symbol=${crypto.symbol}`}
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

      {/* Crypto Categories */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-2xl font-bold text-primary mb-8">Crypto Categories</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Major Cryptocurrencies */}
            <div className="trading-card">
              <div className="text-center">
                <div className="text-4xl mb-4">₿</div>
                <h3 className="font-semibold text-primary mb-2">Major Coins</h3>
                <p className="text-sm text-secondary mb-4">
                  Bitcoin, Ethereum, and other established cryptocurrencies
                </p>
                <div className="space-y-2">
                  {mockCryptoData
                    .filter(crypto => crypto.category === 'major')
                    .slice(0, 3)
                    .map((crypto) => (
                      <div key={crypto.symbol} className="flex justify-between text-sm">
                        <span>{crypto.symbol}</span>
                        <span className={crypto.isPositive ? 'text-success' : 'text-danger'}>
                          {crypto.isPositive ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* DeFi Tokens */}
            <div className="trading-card">
              <div className="text-center">
                <div className="text-4xl mb-4">🏦</div>
                <h3 className="font-semibold text-primary mb-2">DeFi Tokens</h3>
                <p className="text-sm text-secondary mb-4">
                  Decentralized finance protocols and governance tokens
                </p>
                <div className="space-y-2">
                  {mockCryptoData
                    .filter(crypto => crypto.category === 'defi')
                    .map((crypto) => (
                      <div key={crypto.symbol} className="flex justify-between text-sm">
                        <span>{crypto.symbol}</span>
                        <span className={crypto.isPositive ? 'text-success' : 'text-danger'}>
                          {crypto.isPositive ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Altcoins */}
            <div className="trading-card">
              <div className="text-center">
                <div className="text-4xl mb-4">🪙</div>
                <h3 className="font-semibold text-primary mb-2">Altcoins</h3>
                <p className="text-sm text-secondary mb-4">
                  Alternative cryptocurrencies with unique features
                </p>
                <div className="space-y-2">
                  {mockCryptoData
                    .filter(crypto => crypto.category === 'altcoin')
                    .slice(0, 3)
                    .map((crypto) => (
                      <div key={crypto.symbol} className="flex justify-between text-sm">
                        <span>{crypto.symbol}</span>
                        <span className={crypto.isPositive ? 'text-success' : 'text-danger'}>
                          {crypto.isPositive ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Meme Coins */}
            <div className="trading-card">
              <div className="text-center">
                <div className="text-4xl mb-4">🐕</div>
                <h3 className="font-semibold text-primary mb-2">Meme Coins</h3>
                <p className="text-sm text-secondary mb-4">
                  Community-driven cryptocurrencies and viral tokens
                </p>
                <div className="space-y-2">
                  {mockCryptoData
                    .filter(crypto => crypto.category === 'meme')
                    .map((crypto) => (
                      <div key={crypto.symbol} className="flex justify-between text-sm">
                        <span>{crypto.symbol}</span>
                        <span className={crypto.isPositive ? 'text-success' : 'text-danger'}>
                          {crypto.isPositive ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Features */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-bold text-primary mb-8">Advanced Crypto Features</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Spot Trading */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">💱</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Spot Trading</h3>
              <p className="text-secondary mb-6">
                Trade cryptocurrencies with instant settlement and competitive fees
              </p>
              <Link href="/charts" className="btn btn-primary">
                Start Trading
              </Link>
            </div>

            {/* Futures Trading */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Futures Trading</h3>
              <p className="text-secondary mb-6">
                Trade crypto futures with leverage up to 100x and advanced risk management
              </p>
              <Link href="/charts" className="btn btn-primary">
                Trade Futures
              </Link>
            </div>

            {/* Staking */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Crypto Staking</h3>
              <p className="text-secondary mb-6">
                Earn passive income by staking your cryptocurrencies with competitive APY
              </p>
              <Link href="/staking" className="btn btn-primary">
                Start Staking
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Crypto Journey
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Trade Bitcoin, Ethereum, and thousands of altcoins with advanced tools and security
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn bg-white text-primary hover:bg-neutral-100 btn-lg">
              Create Account
            </Link>
            <Link href="/charts" className="btn btn-ghost border-white text-white hover:bg-white hover:text-primary btn-lg">
              Explore Markets
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 