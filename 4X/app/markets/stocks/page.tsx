'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

const StocksPage = () => {
  const [selectedSector, setSelectedSector] = useState('all')
  const [selectedExchange, setSelectedExchange] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('marketCap')
  const [viewMode, setViewMode] = useState('grid')

  const sectors = ['all', 'Technology', 'Healthcare', 'Financial', 'Energy', 'Consumer', 'Industrial', 'Real Estate']
  const exchanges = ['all', 'NYSE', 'NASDAQ', 'AMEX']

  const stockData = [
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
      dividendYield: 0.51,
      sector: 'Technology',
      exchange: 'NASDAQ',
      high52w: 199.62,
      low52w: 124.17,
      beta: 1.29,
      eps: 6.73,
      revenue: '$394.3B',
      employees: '164,000',
      founded: 1976,
      description: 'Designs, manufactures and markets smartphones, personal computers, tablets, wearables and accessories.',
      isPositive: true,
      aiRating: 'A+',
      analystRating: 'Buy'
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
      dividendYield: 0.72,
      sector: 'Technology',
      exchange: 'NASDAQ',
      high52w: 384.30,
      low52w: 213.43,
      beta: 0.89,
      eps: 11.80,
      revenue: '$211.9B',
      employees: '221,000',
      founded: 1975,
      description: 'Develops, licenses, and supports software, services, devices, and solutions worldwide.',
      isPositive: false,
      aiRating: 'A',
      analystRating: 'Buy'
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
      dividendYield: 0.0,
      sector: 'Technology',
      exchange: 'NASDAQ',
      high52w: 151.55,
      low52w: 83.34,
      beta: 1.06,
      eps: 5.61,
      revenue: '$307.4B',
      employees: '190,000',
      founded: 1998,
      description: 'Provides online advertising services and cloud computing services.',
      isPositive: true,
      aiRating: 'A',
      analystRating: 'Buy'
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
      dividendYield: 0.0,
      sector: 'Consumer',
      exchange: 'NASDAQ',
      high52w: 299.29,
      low52w: 101.81,
      beta: 2.34,
      eps: 3.62,
      revenue: '$96.8B',
      employees: '140,000',
      founded: 2003,
      description: 'Designs, develops, manufactures, and sells electric vehicles and energy storage systems.',
      isPositive: true,
      aiRating: 'B+',
      analystRating: 'Hold'
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
      dividendYield: 0.04,
      sector: 'Technology',
      exchange: 'NASDAQ',
      high52w: 502.66,
      low52w: 108.13,
      beta: 1.68,
      eps: 6.68,
      revenue: '$60.9B',
      employees: '29,600',
      founded: 1993,
      description: 'Designs graphics processing units for gaming and professional markets.',
      isPositive: true,
      aiRating: 'A+',
      analystRating: 'Strong Buy'
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
      dividendYield: 2.38,
      sector: 'Financial',
      exchange: 'NYSE',
      high52w: 172.81,
      low52w: 104.40,
      beta: 1.15,
      eps: 14.98,
      revenue: '$162.4B',
      employees: '293,000',
      founded: 1799,
      description: 'Provides financial services including investment banking and asset management.',
      isPositive: false,
      aiRating: 'A-',
      analystRating: 'Buy'
    },
    {
      symbol: 'JNJ',
      name: 'Johnson & Johnson',
      price: 156.23,
      change: 0.45,
      changePercent: 0.29,
      volume: '8.9M',
      marketCap: '$412B',
      pe: 15.8,
      dividend: 4.68,
      dividendYield: 3.00,
      sector: 'Healthcare',
      exchange: 'NYSE',
      high52w: 179.92,
      low52w: 143.13,
      beta: 0.63,
      eps: 9.88,
      revenue: '$94.9B',
      employees: '152,700',
      founded: 1886,
      description: 'Researches, develops, manufactures, and sells pharmaceutical and medical devices.',
      isPositive: true,
      aiRating: 'B+',
      analystRating: 'Hold'
    },
    {
      symbol: 'XOM',
      name: 'Exxon Mobil Corporation',
      price: 102.34,
      change: -1.23,
      changePercent: -1.19,
      volume: '15.6M',
      marketCap: '$425B',
      pe: 13.4,
      dividend: 6.48,
      dividendYield: 6.33,
      sector: 'Energy',
      exchange: 'NYSE',
      high52w: 119.55,
      low52w: 85.28,
      beta: 1.34,
      eps: 7.64,
      revenue: '$413.7B',
      employees: '62,000',
      founded: 1999,
      description: 'Explores for and produces crude oil and natural gas worldwide.',
      isPositive: false,
      aiRating: 'B',
      analystRating: 'Hold'
    }
  ]

  const marketIndices = [
    { name: 'S&P 500', value: '4,567.89', change: '+1.24%', isPositive: true },
    { name: 'NASDAQ', value: '14,234.56', change: '+0.89%', isPositive: true },
    { name: 'DOW JONES', value: '35,678.90', change: '-0.15%', isPositive: false },
    { name: 'RUSSELL 2000', value: '1,987.65', change: '+0.67%', isPositive: true }
  ]

  const topMovers = {
    gainers: [
      { symbol: 'NVDA', change: '+2.80%' },
      { symbol: 'TSLA', change: '+3.95%' },
      { symbol: 'AAPL', change: '+1.25%' }
    ],
    losers: [
      { symbol: 'XOM', change: '-1.19%' },
      { symbol: 'MSFT', change: '-0.90%' },
      { symbol: 'JPM', change: '-0.53%' }
    ]
  }

  const filteredStocks = stockData.filter(stock => {
    const matchesSector = selectedSector === 'all' || stock.sector === selectedSector
    const matchesExchange = selectedExchange === 'all' || stock.exchange === selectedExchange
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSector && matchesExchange && matchesSearch
  })

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.price - a.price
      case 'change':
        return b.changePercent - a.changePercent
      case 'volume':
        return parseFloat(b.volume.replace('M', '')) - parseFloat(a.volume.replace('M', ''))
      case 'marketCap':
        const aValue = parseFloat(a.marketCap.replace(/[$TB]/g, '')) * (a.marketCap.includes('T') ? 1000 : 1)
        const bValue = parseFloat(b.marketCap.replace(/[$TB]/g, '')) * (b.marketCap.includes('T') ? 1000 : 1)
        return bValue - aValue
      default:
        return a.symbol.localeCompare(b.symbol)
    }
  })

  const getRatingColor = (rating: string) => {
    if (rating.includes('A')) return '#10b981'
    if (rating.includes('B')) return '#f59e0b'
    return '#6b7280'
  }

  const getAnalystColor = (rating: string) => {
    if (rating === 'Strong Buy') return '#10b981'
    if (rating === 'Buy') return '#06b6d4'
    if (rating === 'Hold') return '#f59e0b'
    return '#ef4444'
  }

  return (
    <>
      <Navigation />
      <div className="stocks-page">
        {/* Hero Section */}
        <section className="stocks-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">📈</span>
                <span>Stock Market</span>
              </div>
              <h1 className="hero-title">
                Global Stock Trading
                <span className="gradient-text">10,000+ Stocks, 50+ Exchanges</span>
              </h1>
              <p className="hero-description">
                Trade stocks from major global exchanges with real-time data, 
                advanced analytics, and AI-powered insights.
              </p>
              
              {/* Market Indices */}
              <div className="market-indices">
                {marketIndices.map((index, idx) => (
                  <div key={idx} className="index-card">
                    <span className="index-name">{index.name}</span>
                    <span className="index-value">{index.value}</span>
                    <span className={`index-change ${index.isPositive ? 'positive' : 'negative'}`}>
                      {index.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Market Overview */}
        <section className="market-overview">
          <div className="container">
            <div className="overview-grid">
              <div className="overview-card">
                <h3 className="card-title">Top Gainers</h3>
                <div className="movers-list">
                  {topMovers.gainers.map((stock, idx) => (
                    <div key={idx} className="mover-item">
                      <span className="mover-symbol">{stock.symbol}</span>
                      <span className="mover-change positive">{stock.change}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="overview-card">
                <h3 className="card-title">Top Losers</h3>
                <div className="movers-list">
                  {topMovers.losers.map((stock, idx) => (
                    <div key={idx} className="mover-item">
                      <span className="mover-symbol">{stock.symbol}</span>
                      <span className="mover-change negative">{stock.change}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="overview-card">
                <h3 className="card-title">Market Stats</h3>
                <div className="stats-list">
                  <div className="stat-item">
                    <span className="stat-label">Active Stocks</span>
                    <span className="stat-value">10,247</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Total Volume</span>
                    <span className="stat-value">2.8B</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Market Cap</span>
                    <span className="stat-value">$45.2T</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="filters-section">
          <div className="container">
            <div className="filters-container">
              <div className="filter-group">
                <label className="filter-label">Search</label>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Sector</label>
                <select 
                  className="filter-select"
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                >
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>
                      {sector === 'all' ? 'All Sectors' : sector}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Exchange</label>
                <select 
                  className="filter-select"
                  value={selectedExchange}
                  onChange={(e) => setSelectedExchange(e.target.value)}
                >
                  {exchanges.map(exchange => (
                    <option key={exchange} value={exchange}>
                      {exchange === 'all' ? 'All Exchanges' : exchange}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select 
                  className="filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="marketCap">Market Cap</option>
                  <option value="price">Price</option>
                  <option value="change">Change %</option>
                  <option value="volume">Volume</option>
                </select>
              </div>

              <div className="view-controls">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </button>
                <button 
                  className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stocks Display */}
        <section className="stocks-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Stock Listings</h2>
              <p className="section-description">
                {filteredStocks.length} stocks found
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="stocks-grid">
                {sortedStocks.map((stock, index) => (
                  <div key={index} className="stock-card">
                    <div className="card-header">
                      <div className="stock-info">
                        <div className="symbol-section">
                          <span className="symbol">{stock.symbol}</span>
                          <span className="exchange">{stock.exchange}</span>
                        </div>
                        <span className="company-name">{stock.name}</span>
                      </div>
                      <div className="ratings">
                        <span 
                          className="ai-rating"
                          style={{ color: getRatingColor(stock.aiRating) }}
                        >
                          AI: {stock.aiRating}
                        </span>
                        <span 
                          className="analyst-rating"
                          style={{ color: getAnalystColor(stock.analystRating) }}
                        >
                          {stock.analystRating}
                        </span>
                      </div>
                    </div>

                    <div className="price-section">
                      <div className="current-price">
                        <span className="price">${stock.price.toFixed(2)}</span>
                        <span className={`change ${stock.isPositive ? 'positive' : 'negative'}`}>
                          {stock.isPositive ? '+' : ''}${stock.change.toFixed(2)} 
                          ({stock.isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>

                    <div className="metrics-grid">
                      <div className="metric-item">
                        <span className="metric-label">Market Cap</span>
                        <span className="metric-value">{stock.marketCap}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">P/E Ratio</span>
                        <span className="metric-value">{stock.pe}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Volume</span>
                        <span className="metric-value">{stock.volume}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Dividend</span>
                        <span className="metric-value">
                          {stock.dividend > 0 ? `$${stock.dividend}` : 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div className="sector-tag">
                      <span className="sector">{stock.sector}</span>
                    </div>

                    <div className="card-actions">
                      <button className="action-btn primary">
                        View Details
                      </button>
                      <button className="action-btn secondary">
                        Add to Watchlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="stocks-table">
                <div className="table-header">
                  <div className="header-cell">Symbol</div>
                  <div className="header-cell">Price</div>
                  <div className="header-cell">Change</div>
                  <div className="header-cell">Volume</div>
                  <div className="header-cell">Market Cap</div>
                  <div className="header-cell">P/E</div>
                  <div className="header-cell">Dividend</div>
                  <div className="header-cell">Sector</div>
                  <div className="header-cell">Rating</div>
                </div>
                {sortedStocks.map((stock, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell symbol-cell">
                      <div className="symbol-info">
                        <span className="symbol">{stock.symbol}</span>
                        <span className="company-name">{stock.name}</span>
                      </div>
                    </div>
                    <div className="table-cell price-cell">
                      ${stock.price.toFixed(2)}
                    </div>
                    <div className="table-cell change-cell">
                      <span className={`change ${stock.isPositive ? 'positive' : 'negative'}`}>
                        {stock.isPositive ? '+' : ''}${stock.change.toFixed(2)}
                        <br />
                        ({stock.isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                    <div className="table-cell">{stock.volume}</div>
                    <div className="table-cell">{stock.marketCap}</div>
                    <div className="table-cell">{stock.pe}</div>
                    <div className="table-cell">
                      {stock.dividend > 0 ? `$${stock.dividend}` : 'N/A'}
                    </div>
                    <div className="table-cell">{stock.sector}</div>
                    <div className="table-cell rating-cell">
                      <span 
                        className="ai-rating"
                        style={{ color: getRatingColor(stock.aiRating) }}
                      >
                        {stock.aiRating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .stocks-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .stocks-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .stocks-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-content {
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 14px;
          margin-bottom: 24px;
          backdrop-filter: blur(10px);
        }

        .badge-icon {
          font-size: 16px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #3b82f6, #06b6d4, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 0.8em;
        }

        .hero-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .market-indices {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 40px;
        }

        .index-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .index-name {
          display: block;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4px;
        }

        .index-value {
          display: block;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .index-change {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .index-change.positive {
          color: #10b981;
        }

        .index-change.negative {
          color: #ef4444;
        }

        .market-overview {
          padding: 60px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .overview-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: #3b82f6;
        }

        .movers-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mover-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .mover-symbol {
          font-weight: 600;
          color: #06b6d4;
        }

        .mover-change {
          font-weight: 500;
        }

        .mover-change.positive {
          color: #10b981;
        }

        .mover-change.negative {
          color: #ef4444;
        }

        .stats-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .stat-value {
          font-weight: 600;
          color: #10b981;
        }

        .filters-section {
          padding: 40px 0;
        }

        .filters-container {
          display: flex;
          gap: 20px;
          align-items: end;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filter-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .search-input,
        .filter-select {
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          min-width: 150px;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .filter-select option {
          background: #1a1a2e;
          color: white;
        }

        .view-controls {
          display: flex;
          gap: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 4px;
        }

        .view-btn {
          padding: 8px 16px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-btn.active,
        .view-btn:hover {
          background: rgba(59, 130, 246, 0.2);
          color: white;
        }

        .stocks-section {
          padding: 60px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .section-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .stocks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        .stock-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .stock-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .stock-info {
          flex: 1;
        }

        .symbol-section {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .symbol {
          font-size: 1.2rem;
          font-weight: 700;
          color: #3b82f6;
        }

        .exchange {
          font-size: 0.7rem;
          padding: 2px 6px;
          background: rgba(59, 130, 246, 0.2);
          border-radius: 4px;
          color: #3b82f6;
        }

        .company-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          display: block;
        }

        .ratings {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-end;
        }

        .ai-rating,
        .analyst-rating {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
        }

        .price-section {
          margin-bottom: 20px;
          text-align: center;
        }

        .current-price {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .price {
          font-size: 1.8rem;
          font-weight: 700;
        }

        .change {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .change.positive {
          color: #10b981;
        }

        .change.negative {
          color: #ef4444;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
        }

        .metric-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .metric-value {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .sector-tag {
          margin-bottom: 16px;
          text-align: center;
        }

        .sector {
          padding: 4px 12px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 12px;
          font-size: 0.8rem;
          color: #10b981;
        }

        .card-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          flex: 1;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          border: none;
          color: white;
        }

        .action-btn.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }

        .action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .stocks-table {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.05);
          font-weight: 600;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 20px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          transition: background 0.2s ease;
        }

        .table-row:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .table-cell {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
        }

        .symbol-cell .symbol-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .symbol-cell .symbol {
          font-weight: 600;
          color: #3b82f6;
        }

        .symbol-cell .company-name {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .price-cell {
          font-weight: 600;
        }

        .change-cell .change {
          font-size: 0.8rem;
          line-height: 1.2;
        }

        .rating-cell .ai-rating {
          font-weight: 600;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .market-indices {
            grid-template-columns: repeat(2, 1fr);
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }

          .filters-container {
            flex-direction: column;
            gap: 16px;
          }

          .stocks-grid {
            grid-template-columns: 1fr;
          }

          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .table-cell {
            justify-content: space-between;
            padding: 8px 0;
          }
        }
      `}</style>
    </>
  )
}

export default StocksPage 