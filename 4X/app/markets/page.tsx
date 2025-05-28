'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../../src/components/Navigation'

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap?: number
  category: string
}

interface MarketCategory {
  id: string
  name: string
  icon: string
  description: string
  count: number
  totalValue: string
  change24h: number
}

export default function MarketsPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('marketCap')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')

  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 189.45, change: 2.34, changePercent: 1.25, volume: 45.2, marketCap: 2980.5, category: 'stocks' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90, change: -1.23, changePercent: -0.32, volume: 32.1, marketCap: 2810.3, category: 'stocks' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.30, change: 3.45, changePercent: 2.48, volume: 28.7, marketCap: 1780.2, category: 'stocks' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 234.56, change: -5.67, changePercent: -2.36, volume: 67.8, marketCap: 745.6, category: 'stocks' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 498.32, change: 12.45, changePercent: 2.56, volume: 41.3, marketCap: 1230.4, category: 'stocks' },
    { symbol: 'BTC', name: 'Bitcoin', price: 43567.89, change: 567.23, changePercent: 1.32, volume: 15.4, marketCap: 854.2, category: 'crypto' },
    { symbol: 'ETH', name: 'Ethereum', price: 2678.45, change: -23.45, changePercent: -0.87, volume: 8.9, marketCap: 321.5, category: 'crypto' },
    { symbol: 'BNB', name: 'Binance Coin', price: 312.67, change: 8.90, changePercent: 2.93, volume: 2.1, marketCap: 48.2, category: 'crypto' },
    { symbol: 'EUR/USD', name: 'Euro/US Dollar', price: 1.0876, change: 0.0023, changePercent: 0.21, volume: 145.2, category: 'forex' },
    { symbol: 'GBP/USD', name: 'British Pound/US Dollar', price: 1.2543, change: -0.0034, changePercent: -0.27, volume: 89.7, category: 'forex' },
    { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen', price: 149.85, change: 0.45, changePercent: 0.30, volume: 112.3, category: 'forex' },
    { symbol: 'GOLD', name: 'Gold Futures', price: 2034.50, change: 12.30, changePercent: 0.61, volume: 234.5, category: 'commodities' },
    { symbol: 'OIL', name: 'Crude Oil WTI', price: 78.45, change: -1.23, changePercent: -1.54, volume: 456.7, category: 'commodities' },
    { symbol: 'SILVER', name: 'Silver Futures', price: 24.67, change: 0.34, changePercent: 1.40, volume: 123.4, category: 'commodities' }
  ])

  const categories: MarketCategory[] = [
    { id: 'all', name: 'All Markets', icon: '🌍', description: 'Complete market overview', count: 14, totalValue: '$12.5T', change24h: 0.85 },
    { id: 'stocks', name: 'Stocks', icon: '📈', description: 'Global equity markets', count: 5, totalValue: '$8.2T', change24h: 1.12 },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿', description: 'Digital assets', count: 3, totalValue: '$1.2T', change24h: 2.45 },
    { id: 'forex', name: 'Forex', icon: '💱', description: 'Currency pairs', count: 3, totalValue: '$7.5T', change24h: -0.23 },
    { id: 'commodities', name: 'Commodities', icon: '🥇', description: 'Raw materials & futures', count: 3, totalValue: '$2.1T', change24h: 0.67 }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      
      // Simulate real-time price updates
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * (item.price * 0.001),
        change: item.change + (Math.random() - 0.5) * 0.5,
        volume: item.volume + (Math.random() - 0.5) * (item.volume * 0.1)
      })))
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const filteredData = marketData
    .filter(item => 
      (activeCategory === 'all' || item.category === activeCategory) &&
      (item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      let aValue = a[sortBy as keyof MarketData] as number
      let bValue = b[sortBy as keyof MarketData] as number
      
      if (sortBy === 'marketCap') {
        aValue = a.marketCap || 0
        bValue = b.marketCap || 0
      }
      
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
    })

  const formatPrice = (price: number, symbol: string) => {
    if (symbol.includes('/')) return price.toFixed(4)
    if (symbol === 'BTC') return `$${price.toLocaleString()}`
    if (symbol === 'ETH') return `$${price.toLocaleString()}`
    return `$${price.toFixed(2)}`
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}T`
    return `${volume.toFixed(1)}B`
  }

  const formatMarketCap = (marketCap?: number) => {
    if (!marketCap) return 'N/A'
    if (marketCap >= 1000) return `$${(marketCap / 1000).toFixed(1)}T`
    return `$${marketCap.toFixed(1)}B`
  }

  return (
    <div className="page-container">
      <Navigation />
      
      {/* Markets Header */}
      <section className="markets-header">
        <div className="container">
          <div className="markets-title-section">
            <h1 className="markets-title">
              📊 Global Markets
            </h1>
            <p className="markets-subtitle">
              Real-time market data, analysis, and insights across stocks, cryptocurrency, 
              forex, and commodities with AI-powered intelligence.
            </p>
            <div className="markets-status">
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span className="status-text">Markets Open</span>
              </div>
              <div className="last-updated">
                Last Updated: <span className="timestamp">{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Categories */}
      <section className="market-categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Market Categories</h2>
            <p className="section-subtitle">
              Explore different asset classes and market segments
            </p>
          </div>
          
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <span className={`category-change ${category.change24h >= 0 ? 'positive' : 'negative'}`}>
                    {category.change24h >= 0 ? '+' : ''}{category.change24h.toFixed(2)}%
                  </span>
                </div>
                <h3 className="category-title">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <div className="category-stats">
                  <div className="category-stat">
                    <span className="stat-label">Assets</span>
                    <span className="stat-value">{category.count}</span>
                  </div>
                  <div className="category-stat">
                    <span className="stat-label">Total Value</span>
                    <span className="stat-value">{category.totalValue}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Market Data Table */}
      <section className="market-data-section">
        <div className="container">
          <div className="data-controls">
            <div className="search-controls">
              <input
                type="text"
                placeholder="Search markets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="search-button">
                <span className="search-icon">🔍</span>
              </button>
            </div>
            
            <div className="sort-controls">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="marketCap">Market Cap</option>
                <option value="price">Price</option>
                <option value="changePercent">Change %</option>
                <option value="volume">Volume</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                className="sort-order-btn"
              >
                {sortOrder === 'desc' ? '↓' : '↑'}
              </button>
            </div>
          </div>

          <div className="market-table-container">
            <div className="market-table">
              <div className="table-header">
                <div className="header-cell symbol">Symbol</div>
                <div className="header-cell name">Name</div>
                <div className="header-cell price">Price</div>
                <div className="header-cell change">24h Change</div>
                <div className="header-cell volume">Volume</div>
                <div className="header-cell market-cap">Market Cap</div>
                <div className="header-cell actions">Actions</div>
              </div>
              
              <div className="table-body">
                {filteredData.map((item, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell symbol">
                      <div className="symbol-info">
                        <span className="symbol-text">{item.symbol}</span>
                        <span className="category-badge">{item.category}</span>
                      </div>
                    </div>
                    <div className="table-cell name">
                      <span className="name-text">{item.name}</span>
                    </div>
                    <div className="table-cell price">
                      <span className="price-text">{formatPrice(item.price, item.symbol)}</span>
                    </div>
                    <div className="table-cell change">
                      <div className={`change-info ${item.changePercent >= 0 ? 'positive' : 'negative'}`}>
                        <span className="change-value">
                          {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                        </span>
                        <span className="change-amount">
                          {item.changePercent >= 0 ? '+' : ''}{item.change.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="table-cell volume">
                      <span className="volume-text">{formatVolume(item.volume)}</span>
                    </div>
                    <div className="table-cell market-cap">
                      <span className="market-cap-text">{formatMarketCap(item.marketCap)}</span>
                    </div>
                    <div className="table-cell actions">
                      <div className="action-buttons">
                        <Link href={`/charts/${item.symbol}`} className="action-btn chart">
                          📊
                        </Link>
                        <Link href={`/ai-insights?symbol=${item.symbol}`} className="action-btn ai">
                          🤖
                        </Link>
                        <button className="action-btn favorite">
                          ⭐
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="market-insights-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Market Insights</h2>
            <p className="section-subtitle">
              AI-powered analysis and market intelligence
            </p>
          </div>
          
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-header">
                <span className="insight-icon">📈</span>
                <h3 className="insight-title">Top Gainers</h3>
              </div>
              <div className="insight-content">
                {filteredData
                  .filter(item => item.changePercent > 0)
                  .sort((a, b) => b.changePercent - a.changePercent)
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="insight-item">
                      <span className="item-symbol">{item.symbol}</span>
                      <span className="item-change positive">+{item.changePercent.toFixed(2)}%</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-header">
                <span className="insight-icon">📉</span>
                <h3 className="insight-title">Top Losers</h3>
              </div>
              <div className="insight-content">
                {filteredData
                  .filter(item => item.changePercent < 0)
                  .sort((a, b) => a.changePercent - b.changePercent)
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="insight-item">
                      <span className="item-symbol">{item.symbol}</span>
                      <span className="item-change negative">{item.changePercent.toFixed(2)}%</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-header">
                <span className="insight-icon">🔥</span>
                <h3 className="insight-title">High Volume</h3>
              </div>
              <div className="insight-content">
                {filteredData
                  .sort((a, b) => b.volume - a.volume)
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="insight-item">
                      <span className="item-symbol">{item.symbol}</span>
                      <span className="item-volume">{formatVolume(item.volume)}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-header">
                <span className="insight-icon">🤖</span>
                <h3 className="insight-title">AI Recommendations</h3>
              </div>
              <div className="insight-content">
                <div className="insight-item">
                  <span className="item-symbol">AAPL</span>
                  <span className="item-recommendation buy">Strong Buy</span>
                </div>
                <div className="insight-item">
                  <span className="item-symbol">BTC</span>
                  <span className="item-recommendation hold">Hold</span>
                </div>
                <div className="insight-item">
                  <span className="item-symbol">TSLA</span>
                  <span className="item-recommendation sell">Sell</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Start Trading with AI Intelligence
            </h2>
            <p className="cta-subtitle">
              Access advanced market analysis, real-time data, and AI-powered insights 
              to make informed trading decisions.
            </p>
            <div className="cta-buttons">
              <Link href="/ai-insights" className="btn btn-primary btn-lg">
                <span className="btn-icon">🤖</span>
                Get AI Analysis
              </Link>
              <Link href="/charts" className="btn btn-ghost btn-lg">
                <span className="btn-icon">📊</span>
                View Charts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 