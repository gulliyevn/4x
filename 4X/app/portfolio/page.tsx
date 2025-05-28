'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Portfolio Interfaces
interface PortfolioAsset {
  symbol: string
  name: string
  amount: number
  avgPrice: number
  currentPrice: number
  value: number
  pnl: number
  pnlPercent: number
  allocation: number
  category: 'crypto' | 'stocks' | 'forex' | 'commodities'
}

interface PortfolioSummary {
  totalValue: number
  totalPnL: number
  totalPnLPercent: number
  dayChange: number
  dayChangePercent: number
  availableBalance: number
}

// Mock Portfolio Data
const mockPortfolioSummary: PortfolioSummary = {
  totalValue: 125430.56,
  totalPnL: 15430.56,
  totalPnLPercent: 14.05,
  dayChange: 2340.78,
  dayChangePercent: 1.90,
  availableBalance: 8750.00
}

const mockPortfolioAssets: PortfolioAsset[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: 1.2345,
    avgPrice: 45000.00,
    currentPrice: 67234.56,
    value: 83000.45,
    pnl: 27445.45,
    pnlPercent: 49.45,
    allocation: 66.2,
    category: 'crypto'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    amount: 8.5678,
    avgPrice: 2800.00,
    currentPrice: 3456.78,
    value: 29623.45,
    pnl: 5634.12,
    pnlPercent: 23.49,
    allocation: 23.6,
    category: 'crypto'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    amount: 25,
    avgPrice: 175.00,
    currentPrice: 189.45,
    value: 4736.25,
    pnl: 361.25,
    pnlPercent: 8.26,
    allocation: 3.8,
    category: 'stocks'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    amount: 10,
    avgPrice: 220.00,
    currentPrice: 234.67,
    value: 2346.70,
    pnl: 146.70,
    pnlPercent: 6.67,
    allocation: 1.9,
    category: 'stocks'
  },
  {
    symbol: 'GOLD',
    name: 'Gold',
    amount: 2.5,
    avgPrice: 1950.00,
    currentPrice: 2034.56,
    value: 5086.40,
    pnl: 211.40,
    pnlPercent: 4.33,
    allocation: 4.1,
    category: 'commodities'
  },
  {
    symbol: 'EUR/USD',
    name: 'Euro/US Dollar',
    amount: 1000,
    avgPrice: 1.0900,
    currentPrice: 1.0856,
    value: 1085.60,
    pnl: -44.00,
    pnlPercent: -4.04,
    allocation: 0.9,
    category: 'forex'
  }
]

export default function PortfolioPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'value' | 'pnl' | 'allocation'>('value')

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL']
  const categories = [
    { id: 'all', name: 'All Assets', icon: '🌐' },
    { id: 'crypto', name: 'Crypto', icon: '₿' },
    { id: 'stocks', name: 'Stocks', icon: '📈' },
    { id: 'forex', name: 'Forex', icon: '💱' },
    { id: 'commodities', name: 'Commodities', icon: '🥇' }
  ]

  // Filter assets by category
  const filteredAssets = selectedCategory === 'all' 
    ? mockPortfolioAssets 
    : mockPortfolioAssets.filter(asset => asset.category === selectedCategory)

  // Sort assets
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    switch (sortBy) {
      case 'pnl':
        return b.pnl - a.pnl
      case 'allocation':
        return b.allocation - a.allocation
      default:
        return b.value - a.value
    }
  })

  // Calculate category allocations
  const categoryAllocations = categories.slice(1).map(category => {
    const categoryAssets = mockPortfolioAssets.filter(asset => asset.category === category.id)
    const totalValue = categoryAssets.reduce((sum, asset) => sum + asset.value, 0)
    const allocation = (totalValue / mockPortfolioSummary.totalValue) * 100
    return {
      ...category,
      value: totalValue,
      allocation
    }
  }).filter(category => category.allocation > 0)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Portfolio Overview
              </h1>
              <p className="text-lg text-secondary">
                Track your investments and monitor performance across all markets
              </p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-4">
              <Link href="/markets" className="btn btn-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Asset
              </Link>
              <Link href="/charts" className="btn btn-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Trade Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Summary */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Value */}
            <div className="trading-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-secondary">Total Portfolio Value</h3>
                <div className="w-10 h-10 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                ${mockPortfolioSummary.totalValue.toLocaleString()}
              </div>
              <div className={`text-sm ${mockPortfolioSummary.dayChange >= 0 ? 'text-success' : 'text-danger'}`}>
                {mockPortfolioSummary.dayChange >= 0 ? '+' : ''}${mockPortfolioSummary.dayChange.toFixed(2)} 
                ({mockPortfolioSummary.dayChange >= 0 ? '+' : ''}{mockPortfolioSummary.dayChangePercent.toFixed(2)}%) today
              </div>
            </div>

            {/* Total P&L */}
            <div className="trading-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-secondary">Total P&L</h3>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  mockPortfolioSummary.totalPnL >= 0 ? 'bg-success' : 'bg-danger'
                }`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                      mockPortfolioSummary.totalPnL >= 0 
                        ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    } />
                  </svg>
                </div>
              </div>
              <div className={`text-3xl font-bold mb-2 ${
                mockPortfolioSummary.totalPnL >= 0 ? 'text-success' : 'text-danger'
              }`}>
                {mockPortfolioSummary.totalPnL >= 0 ? '+' : ''}${mockPortfolioSummary.totalPnL.toLocaleString()}
              </div>
              <div className={`text-sm ${
                mockPortfolioSummary.totalPnL >= 0 ? 'text-success' : 'text-danger'
              }`}>
                {mockPortfolioSummary.totalPnL >= 0 ? '+' : ''}{mockPortfolioSummary.totalPnLPercent.toFixed(2)}% all time
              </div>
            </div>

            {/* Available Balance */}
            <div className="trading-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-secondary">Available Balance</h3>
                <div className="w-10 h-10 bg-neutral-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                ${mockPortfolioSummary.availableBalance.toLocaleString()}
              </div>
              <div className="text-sm text-secondary">
                Ready to invest
              </div>
            </div>

            {/* Number of Assets */}
            <div className="trading-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-secondary">Assets</h3>
                <div className="w-10 h-10 bg-accent-tertiary rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {mockPortfolioAssets.length}
              </div>
              <div className="text-sm text-secondary">
                Diversified holdings
              </div>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <h3 className="text-xl font-semibold text-primary">Portfolio Performance</h3>
              
              {/* Timeframe Selector */}
              <div className="flex gap-2">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`btn btn-sm ${
                      selectedTimeframe === tf ? 'btn-primary' : 'btn-ghost'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-64 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Portfolio Performance Chart
                </h3>
                <p className="text-secondary">
                  Track your portfolio value over time • {selectedTimeframe}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asset Allocation & Holdings */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Asset Allocation */}
            <div>
              <h3 className="text-xl font-semibold text-primary mb-6">Asset Allocation</h3>
              
              {/* Pie Chart Placeholder */}
              <div className="h-64 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300 mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🥧</div>
                  <p className="text-secondary">Portfolio Allocation</p>
                </div>
              </div>
              
              {/* Allocation Breakdown */}
              <div className="space-y-4">
                {categoryAllocations.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <div className="font-medium text-primary">{category.name}</div>
                        <div className="text-sm text-secondary">${category.value.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">{category.allocation.toFixed(1)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Holdings Table */}
            <div className="lg:col-span-2">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <h3 className="text-xl font-semibold text-primary">Holdings</h3>
                
                {/* Filters */}
                <div className="flex gap-4">
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-neutral-300 rounded-lg focus-ring text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'value' | 'pnl' | 'allocation')}
                    className="px-3 py-2 border border-neutral-300 rounded-lg focus-ring text-sm"
                  >
                    <option value="value">Sort by Value</option>
                    <option value="pnl">Sort by P&L</option>
                    <option value="allocation">Sort by Allocation</option>
                  </select>
                </div>
              </div>
              
              {/* Holdings Table */}
              <div className="bg-neutral-50 rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="bg-neutral-100 px-6 py-4 border-b border-neutral-200">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-secondary">
                    <div className="col-span-3">Asset</div>
                    <div className="col-span-2 text-right">Amount</div>
                    <div className="col-span-2 text-right">Value</div>
                    <div className="col-span-2 text-right">P&L</div>
                    <div className="col-span-2 text-right">Allocation</div>
                    <div className="col-span-1 text-right">Action</div>
                  </div>
                </div>
                
                {/* Table Body */}
                <div className="divide-y divide-neutral-200">
                  {sortedAssets.map((asset) => (
                    <div key={asset.symbol} className="px-6 py-4 hover:bg-white transition-colors">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Asset Info */}
                        <div className="col-span-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {asset.symbol.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-primary">{asset.symbol}</div>
                              <div className="text-sm text-secondary">{asset.name}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Amount */}
                        <div className="col-span-2 text-right">
                          <div className="font-medium text-primary">{asset.amount.toFixed(4)}</div>
                          <div className="text-sm text-secondary">${asset.currentPrice.toLocaleString()}</div>
                        </div>
                        
                        {/* Value */}
                        <div className="col-span-2 text-right">
                          <div className="font-semibold text-primary">${asset.value.toLocaleString()}</div>
                        </div>
                        
                        {/* P&L */}
                        <div className="col-span-2 text-right">
                          <div className={`font-semibold ${asset.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                            {asset.pnl >= 0 ? '+' : ''}${asset.pnl.toFixed(2)}
                          </div>
                          <div className={`text-sm ${asset.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                            {asset.pnl >= 0 ? '+' : ''}{asset.pnlPercent.toFixed(2)}%
                          </div>
                        </div>
                        
                        {/* Allocation */}
                        <div className="col-span-2 text-right">
                          <div className="font-medium text-primary">{asset.allocation.toFixed(1)}%</div>
                        </div>
                        
                        {/* Action */}
                        <div className="col-span-1 text-right">
                          <Link 
                            href={`/charts?symbol=${asset.symbol}`}
                            className="btn btn-sm btn-ghost"
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
          </div>
        </div>
      </section>

      {/* Risk Analysis */}
      <section className="section">
        <div className="container">
          <h3 className="text-xl font-semibold text-primary mb-6">Risk Analysis</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Risk Metrics */}
            <div className="trading-card">
              <h4 className="font-semibold text-primary mb-4">Risk Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary">Portfolio Beta:</span>
                  <span className="font-medium text-primary">1.24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Sharpe Ratio:</span>
                  <span className="font-medium text-primary">1.85</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Max Drawdown:</span>
                  <span className="font-medium text-danger">-12.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Volatility:</span>
                  <span className="font-medium text-primary">18.3%</span>
                </div>
              </div>
            </div>
            
            {/* Diversification */}
            <div className="trading-card">
              <h4 className="font-semibold text-primary mb-4">Diversification</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary">Asset Classes:</span>
                  <span className="font-medium text-primary">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Correlation Score:</span>
                  <span className="font-medium text-success">Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Concentration Risk:</span>
                  <span className="font-medium text-warning">Medium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Rebalance Needed:</span>
                  <span className="font-medium text-success">No</span>
                </div>
              </div>
            </div>
            
            {/* Recommendations */}
            <div className="trading-card">
              <h4 className="font-semibold text-primary mb-4">Recommendations</h4>
              <div className="space-y-3">
                <div className="p-3 bg-success/10 rounded-lg">
                  <div className="text-sm font-medium text-success mb-1">✓ Well Diversified</div>
                  <div className="text-xs text-secondary">Good spread across asset classes</div>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <div className="text-sm font-medium text-warning mb-1">⚠ High Crypto Exposure</div>
                  <div className="text-xs text-secondary">Consider reducing crypto allocation</div>
                </div>
                <div className="p-3 bg-accent-primary/10 rounded-lg">
                  <div className="text-sm font-medium text-accent-primary mb-1">💡 Add Bonds</div>
                  <div className="text-xs text-secondary">Consider adding fixed income</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 