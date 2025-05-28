'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Stock Data Interface
interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  pe: number
  dividend: number
  sector: string
  isPositive: boolean
}

// Mock Stock Data
const mockStockData: StockData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.45,
    change: 2.34,
    changePercent: 1.25,
    volume: '45.2M',
    marketCap: '$2.9T',
    pe: 28.5,
    dividend: 0.96,
    sector: 'Technology',
    isPositive: true
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.92,
    change: -3.45,
    changePercent: -0.90,
    volume: '32.1M',
    marketCap: '$2.8T',
    pe: 32.1,
    dividend: 2.72,
    sector: 'Technology',
    isPositive: false
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.56,
    change: 1.78,
    changePercent: 1.27,
    volume: '28.5M',
    marketCap: '$1.8T',
    pe: 25.3,
    dividend: 0.0,
    sector: 'Technology',
    isPositive: true
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 234.67,
    change: 8.92,
    changePercent: 3.95,
    volume: '67.3M',
    marketCap: '$745B',
    pe: 65.2,
    dividend: 0.0,
    sector: 'Automotive',
    isPositive: true
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 145.23,
    change: -1.23,
    changePercent: -0.84,
    volume: '41.2M',
    marketCap: '$1.5T',
    pe: 45.8,
    dividend: 0.0,
    sector: 'E-commerce',
    isPositive: false
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 456.78,
    change: 12.45,
    changePercent: 2.80,
    volume: '52.1M',
    marketCap: '$1.1T',
    pe: 68.4,
    dividend: 0.16,
    sector: 'Technology',
    isPositive: true
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 325.67,
    change: 5.23,
    changePercent: 1.63,
    volume: '18.9M',
    marketCap: '$825B',
    pe: 22.7,
    dividend: 0.0,
    sector: 'Technology',
    isPositive: true
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 167.89,
    change: -0.89,
    changePercent: -0.53,
    volume: '12.4M',
    marketCap: '$485B',
    pe: 11.2,
    dividend: 4.0,
    sector: 'Financial',
    isPositive: false
  }
]

export default function StocksPage() {
  const [selectedSector, setSelectedSector] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change' | 'volume'>('name')

  // Get unique sectors
  const sectors = ['all', ...Array.from(new Set(mockStockData.map(stock => stock.sector)))]

  // Filter and sort data
  const filteredData = mockStockData
    .filter(stock => {
      const matchesSector = selectedSector === 'all' || stock.sector === selectedSector
      const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSector && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price
        case 'change':
          return b.changePercent - a.changePercent
        case 'volume':
          return parseFloat(b.volume) - parseFloat(a.volume)
        default:
          return a.name.localeCompare(b.name)
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
                <span className="text-3xl">📈</span>
                <h1 className="text-3xl md:text-4xl font-bold text-primary">
                  Stock Market
                </h1>
              </div>
              <p className="text-lg text-secondary">
                Trade US and international stocks with real-time data and advanced analytics
              </p>
            </div>
            
            {/* Market Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">+1.24%</div>
                <div className="text-sm text-secondary">S&P 500</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">+0.89%</div>
                <div className="text-sm text-secondary">NASDAQ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-danger">-0.15%</div>
                <div className="text-sm text-secondary">DOW</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sector Filters */}
            <div className="flex flex-wrap gap-2">
              {sectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`btn btn-sm ${
                    selectedSector === sector 
                      ? 'btn-primary' 
                      : 'btn-ghost border border-neutral-300'
                  }`}
                >
                  {sector === 'all' ? 'All Sectors' : sector}
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
                  placeholder="Search stocks..."
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
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="change">Sort by Change</option>
                <option value="volume">Sort by Volume</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Data Table */}
      <section className="section">
        <div className="container">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-secondary">
                <div className="col-span-3">Stock</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Change</div>
                <div className="col-span-1 text-right hidden md:block">P/E</div>
                <div className="col-span-1 text-right hidden lg:block">Dividend</div>
                <div className="col-span-2 text-right hidden lg:block">Market Cap</div>
                <div className="col-span-1 text-right">Action</div>
              </div>
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-neutral-200">
              {filteredData.map((stock) => (
                <div key={stock.symbol} className="px-6 py-4 hover:bg-neutral-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Stock Info */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {stock.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-primary">{stock.symbol}</div>
                          <div className="text-sm text-secondary">{stock.name}</div>
                          <div className="text-xs text-tertiary">{stock.sector}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-2 text-right">
                      <div className="font-semibold text-primary">
                        ${stock.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-secondary">
                        Vol: {stock.volume}
                      </div>
                    </div>
                    
                    {/* Change */}
                    <div className="col-span-2 text-right">
                      <div className={`font-semibold ${stock.isPositive ? 'text-success' : 'text-danger'}`}>
                        {stock.isPositive ? '+' : ''}${stock.change.toFixed(2)}
                      </div>
                      <div className={`text-sm ${stock.isPositive ? 'text-success' : 'text-danger'}`}>
                        {stock.isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    
                    {/* P/E Ratio */}
                    <div className="col-span-1 text-right hidden md:block">
                      <div className="font-medium text-secondary">{stock.pe.toFixed(1)}</div>
                    </div>
                    
                    {/* Dividend */}
                    <div className="col-span-1 text-right hidden lg:block">
                      <div className="font-medium text-secondary">
                        {stock.dividend > 0 ? `${stock.dividend.toFixed(2)}%` : '-'}
                      </div>
                    </div>
                    
                    {/* Market Cap */}
                    <div className="col-span-2 text-right hidden lg:block">
                      <div className="font-medium text-secondary">{stock.marketCap}</div>
                    </div>
                    
                    {/* Action */}
                    <div className="col-span-1 text-right">
                      <Link 
                        href={`/charts?symbol=${stock.symbol}`}
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

      {/* Market Insights */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-2xl font-bold text-primary mb-8">Market Insights</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Top Gainers */}
            <div className="trading-card">
              <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                <span className="text-success">📈</span>
                Top Gainers
              </h3>
              <div className="space-y-3">
                {mockStockData
                  .filter(stock => stock.isPositive)
                  .sort((a, b) => b.changePercent - a.changePercent)
                  .slice(0, 3)
                  .map((stock) => (
                    <div key={stock.symbol} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-primary">{stock.symbol}</div>
                        <div className="text-sm text-secondary">${stock.price.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-success font-semibold">+{stock.changePercent.toFixed(2)}%</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            {/* Top Losers */}
            <div className="trading-card">
              <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                <span className="text-danger">📉</span>
                Top Losers
              </h3>
              <div className="space-y-3">
                {mockStockData
                  .filter(stock => !stock.isPositive)
                  .sort((a, b) => a.changePercent - b.changePercent)
                  .slice(0, 3)
                  .map((stock) => (
                    <div key={stock.symbol} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-primary">{stock.symbol}</div>
                        <div className="text-sm text-secondary">${stock.price.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-danger font-semibold">{stock.changePercent.toFixed(2)}%</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            {/* Most Active */}
            <div className="trading-card">
              <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                <span>🔥</span>
                Most Active
              </h3>
              <div className="space-y-3">
                {mockStockData
                  .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume))
                  .slice(0, 3)
                  .map((stock) => (
                    <div key={stock.symbol} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-primary">{stock.symbol}</div>
                        <div className="text-sm text-secondary">${stock.price.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-accent font-semibold">{stock.volume}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Trading Stocks Today
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Access thousands of stocks with competitive commissions and advanced tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn bg-white text-primary hover:bg-neutral-100 btn-lg">
              Open Account
            </Link>
            <Link href="/charts" className="btn btn-ghost border-white text-white hover:bg-white hover:text-primary btn-lg">
              View Charts
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 