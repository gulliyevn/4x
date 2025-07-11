'use client'

import React, { useState } from 'react'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

const ForexPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('major')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('volume')
  const [viewMode, setViewMode] = useState('grid')

  const categories = ['major', 'minor', 'exotic', 'commodities']
  const timeframes = ['1H', '4H', '1D', '1W', '1M']

  const forexPairs = [
    {
      pair: 'EUR/USD',
      name: 'Euro / US Dollar',
      price: 1.0845,
      change: 0.0023,
      changePercent: 0.21,
      volume: '$1.2T',
      spread: 0.8,
      category: 'major',
      high24h: 1.0867,
      low24h: 1.0821,
      volatility: 'Low',
      trend: 'Bullish',
      support: 1.0820,
      resistance: 1.0870,
      isPositive: true,
      technicalRating: 'Buy',
      fundamentalRating: 'Neutral',
      rsi: 58.2,
      macd: 'Bullish',
      description: 'Most traded currency pair globally'
    },
    {
      pair: 'GBP/USD',
      name: 'British Pound / US Dollar',
      price: 1.2634,
      change: -0.0045,
      changePercent: -0.35,
      volume: '$350B',
      spread: 1.2,
      category: 'major',
      high24h: 1.2689,
      low24h: 1.2615,
      volatility: 'Medium',
      trend: 'Bearish',
      support: 1.2600,
      resistance: 1.2700,
      isPositive: false,
      technicalRating: 'Sell',
      fundamentalRating: 'Bearish',
      rsi: 42.8,
      macd: 'Bearish',
      description: 'Cable - highly volatile major pair'
    },
    {
      pair: 'USD/JPY',
      name: 'US Dollar / Japanese Yen',
      price: 149.85,
      change: 0.67,
      changePercent: 0.45,
      volume: '$280B',
      spread: 0.9,
      category: 'major',
      high24h: 150.12,
      low24h: 149.23,
      volatility: 'Low',
      trend: 'Bullish',
      support: 149.00,
      resistance: 150.50,
      isPositive: true,
      technicalRating: 'Strong Buy',
      fundamentalRating: 'Bullish',
      rsi: 65.4,
      macd: 'Bullish',
      description: 'Safe haven pair with BoJ intervention risk'
    },
    {
      pair: 'AUD/USD',
      name: 'Australian Dollar / US Dollar',
      price: 0.6523,
      change: 0.0012,
      changePercent: 0.18,
      volume: '$180B',
      spread: 1.1,
      category: 'major',
      high24h: 0.6545,
      low24h: 0.6501,
      volatility: 'Medium',
      trend: 'Neutral',
      support: 0.6500,
      resistance: 0.6550,
      isPositive: true,
      technicalRating: 'Hold',
      fundamentalRating: 'Neutral',
      rsi: 52.1,
      macd: 'Neutral',
      description: 'Commodity currency sensitive to China'
    },
    {
      pair: 'USD/CAD',
      name: 'US Dollar / Canadian Dollar',
      price: 1.3567,
      change: -0.0023,
      changePercent: -0.17,
      volume: '$120B',
      spread: 1.3,
      category: 'major',
      high24h: 1.3598,
      low24h: 1.3542,
      volatility: 'Low',
      trend: 'Bearish',
      support: 1.3540,
      resistance: 1.3600,
      isPositive: false,
      technicalRating: 'Sell',
      fundamentalRating: 'Neutral',
      rsi: 45.7,
      macd: 'Bearish',
      description: 'Loonie - oil-correlated currency'
    },
    {
      pair: 'EUR/GBP',
      name: 'Euro / British Pound',
      price: 0.8589,
      change: 0.0034,
      changePercent: 0.40,
      volume: '$95B',
      spread: 1.5,
      category: 'minor',
      high24h: 0.8612,
      low24h: 0.8567,
      volatility: 'Medium',
      trend: 'Bullish',
      support: 0.8560,
      resistance: 0.8620,
      isPositive: true,
      technicalRating: 'Buy',
      fundamentalRating: 'Bullish',
      rsi: 61.3,
      macd: 'Bullish',
      description: 'Cross pair affected by Brexit developments'
    }
  ]

  const marketStats = {
    dailyVolume: '$7.5T',
    activePairs: '180+',
    majorPairs: 8,
    minorPairs: 25,
    exoticPairs: '150+',
    avgSpread: '0.9 pips'
  }

  const centralBankData = [
    { bank: 'Federal Reserve', rate: '5.50%', nextMeeting: '2024-03-20', bias: 'Hawkish' },
    { bank: 'ECB', rate: '4.50%', nextMeeting: '2024-03-14', bias: 'Neutral' },
    { bank: 'Bank of England', rate: '5.25%', nextMeeting: '2024-03-21', bias: 'Dovish' },
    { bank: 'Bank of Japan', rate: '-0.10%', nextMeeting: '2024-03-19', bias: 'Ultra Dovish' }
  ]

  const economicEvents = [
    { time: '08:30', event: 'US Non-Farm Payrolls', impact: 'High', forecast: '200K', previous: '199K' },
    { time: '10:00', event: 'EUR CPI Flash Estimate', impact: 'High', forecast: '2.8%', previous: '2.9%' },
    { time: '14:00', event: 'USD Fed Chair Speech', impact: 'Medium', forecast: '-', previous: '-' },
    { time: '23:50', event: 'JPY BoJ Meeting Minutes', impact: 'Medium', forecast: '-', previous: '-' }
  ]

  const filteredPairs = forexPairs.filter(pair => {
    const matchesCategory = selectedCategory === 'all' || pair.category === selectedCategory
    const matchesSearch = pair.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pair.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedPairs = [...filteredPairs].sort((a, b) => {
    switch (sortBy) {
      case 'volume':
        return parseFloat(b.volume.replace(/[$TB]/g, '')) - parseFloat(a.volume.replace(/[$TB]/g, ''))
      case 'change':
        return Math.abs(b.changePercent) - Math.abs(a.changePercent)
      case 'spread':
        return a.spread - b.spread
      case 'volatility':
        const volOrder = { 'Low': 1, 'Medium': 2, 'High': 3 }
        return volOrder[b.volatility] - volOrder[a.volatility]
      default:
        return parseFloat(b.volume.replace(/[$TB]/g, '')) - parseFloat(a.volume.replace(/[$TB]/g, ''))
    }
  })

  const getTechnicalColor = (rating: string) => {
    if (rating === 'Strong Buy') return '#10b981'
    if (rating === 'Buy') return '#06b6d4'
    if (rating === 'Hold') return '#f59e0b'
    if (rating === 'Sell') return '#f97316'
    if (rating === 'Strong Sell') return '#ef4444'
    return '#6b7280'
  }

  const getVolatilityColor = (volatility: string) => {
    if (volatility === 'High') return '#ef4444'
    if (volatility === 'Medium') return '#f59e0b'
    return '#10b981'
  }

  const getBiasColor = (bias: string) => {
    if (bias.includes('Hawkish')) return '#ef4444'
    if (bias.includes('Dovish')) return '#06b6d4'
    return '#f59e0b'
  }

  return (
    <>
      <Navigation />
      <div className="forex-page">
        {/* Hero Section */}
        <section className="forex-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">💱</span>
                <span>Forex Trading</span>
              </div>
              <h1 className="hero-title">
                Foreign Exchange Markets
                <span className="gradient-text">100+ Pairs, Central Bank Data</span>
              </h1>
              <p className="hero-description">
                Trade major, minor, and exotic currency pairs with real-time spreads, 
                central bank insights, and comprehensive market analysis.
              </p>
              
              {/* Market Stats */}
              <div className="market-stats">
                <div className="stat-card">
                  <span className="stat-label">Daily Volume</span>
                  <span className="stat-value">{marketStats.dailyVolume}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Active Pairs</span>
                  <span className="stat-value">{marketStats.activePairs}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Avg Spread</span>
                  <span className="stat-value">{marketStats.avgSpread}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Major Pairs</span>
                  <span className="stat-value">{marketStats.majorPairs}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Overview */}
        <section className="market-overview">
          <div className="container">
            <div className="overview-grid">
              <div className="overview-card">
                <h3 className="card-title">Central Bank Rates</h3>
                <div className="bank-rates">
                  {centralBankData.map((bank, idx) => (
                    <div key={idx} className="bank-item">
                      <div className="bank-info">
                        <span className="bank-name">{bank.bank}</span>
                        <span className="bank-rate">{bank.rate}</span>
                      </div>
                      <div className="bank-details">
                        <span className="next-meeting">{bank.nextMeeting}</span>
                        <span 
                          className="bias"
                          style={{ color: getBiasColor(bank.bias) }}
                        >
                          {bank.bias}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="overview-card">
                <h3 className="card-title">Economic Calendar</h3>
                <div className="events-list">
                  {economicEvents.map((event, idx) => (
                    <div key={idx} className="event-item">
                      <div className="event-time">{event.time}</div>
                      <div className="event-details">
                        <span className="event-name">{event.event}</span>
                        <div className="event-data">
                          <span className={`impact ${event.impact.toLowerCase()}`}>
                            {event.impact}
                          </span>
                          <span className="forecast">F: {event.forecast}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  placeholder="Search currency pairs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <div className="filter-buttons">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Timeframe</label>
                <div className="filter-buttons">
                  {timeframes.map(tf => (
                    <button
                      key={tf}
                      className={`filter-btn ${selectedTimeframe === tf ? 'active' : ''}`}
                      onClick={() => setSelectedTimeframe(tf)}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select 
                  className="filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="volume">Volume</option>
                  <option value="change">Change</option>
                  <option value="spread">Spread</option>
                  <option value="volatility">Volatility</option>
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

        {/* Forex Pairs Display */}
        <section className="forex-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Currency Pairs</h2>
              <p className="section-description">
                {filteredPairs.length} currency pairs available for trading
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="forex-grid">
                {sortedPairs.map((pair, index) => (
                  <div key={index} className="forex-card">
                    <div className="card-header">
                      <div className="pair-info">
                        <span className="pair-symbol">{pair.pair}</span>
                        <span className="pair-name">{pair.name}</span>
                        <span className="category-badge">{pair.category}</span>
                      </div>
                      <div className="ratings">
                        <span 
                          className="technical-rating"
                          style={{ color: getTechnicalColor(pair.technicalRating) }}
                        >
                          {pair.technicalRating}
                        </span>
                        <span 
                          className="volatility"
                          style={{ color: getVolatilityColor(pair.volatility) }}
                        >
                          {pair.volatility} Vol
                        </span>
                      </div>
                    </div>

                    <div className="price-section">
                      <div className="current-price">
                        <span className="price">{pair.price}</span>
                        <span className={`change ${pair.isPositive ? 'positive' : 'negative'}`}>
                          {pair.isPositive ? '+' : ''}{pair.change.toFixed(4)} 
                          ({pair.isPositive ? '+' : ''}{pair.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>

                    <div className="metrics-grid">
                      <div className="metric-item">
                        <span className="metric-label">Volume</span>
                        <span className="metric-value">{pair.volume}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Spread</span>
                        <span className="metric-value">{pair.spread} pips</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">High/Low</span>
                        <span className="metric-value">
                          {pair.high24h}/{pair.low24h}
                        </span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Trend</span>
                        <span className={`metric-value ${pair.trend.toLowerCase()}`}>
                          {pair.trend}
                        </span>
                      </div>
                    </div>

                    <div className="technical-indicators">
                      <div className="indicator-row">
                        <span className="indicator-label">RSI</span>
                        <span className="indicator-value">{pair.rsi}</span>
                      </div>
                      <div className="indicator-row">
                        <span className="indicator-label">MACD</span>
                        <span className={`indicator-value ${pair.macd.toLowerCase()}`}>
                          {pair.macd}
                        </span>
                      </div>
                      <div className="indicator-row">
                        <span className="indicator-label">Support</span>
                        <span className="indicator-value">{pair.support}</span>
                      </div>
                      <div className="indicator-row">
                        <span className="indicator-label">Resistance</span>
                        <span className="indicator-value">{pair.resistance}</span>
                      </div>
                    </div>

                    <div className="card-actions">
                      <button className="action-btn primary">
                        Trade Now
                      </button>
                      <button className="action-btn secondary">
                        View Chart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="forex-table">
                <div className="table-header">
                  <div className="header-cell">Pair</div>
                  <div className="header-cell">Price</div>
                  <div className="header-cell">Change</div>
                  <div className="header-cell">Volume</div>
                  <div className="header-cell">Spread</div>
                  <div className="header-cell">Volatility</div>
                  <div className="header-cell">Rating</div>
                  <div className="header-cell">Action</div>
                </div>
                {sortedPairs.map((pair, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell pair-cell">
                      <div className="pair-info">
                        <span className="pair-symbol">{pair.pair}</span>
                        <span className="pair-name">{pair.name}</span>
                      </div>
                    </div>
                    <div className="table-cell price-cell">
                      {pair.price}
                    </div>
                    <div className="table-cell change-cell">
                      <span className={`change ${pair.isPositive ? 'positive' : 'negative'}`}>
                        {pair.isPositive ? '+' : ''}{pair.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className="table-cell">{pair.volume}</div>
                    <div className="table-cell">{pair.spread} pips</div>
                    <div className="table-cell">
                      <span 
                        className="volatility"
                        style={{ color: getVolatilityColor(pair.volatility) }}
                      >
                        {pair.volatility}
                      </span>
                    </div>
                    <div className="table-cell rating-cell">
                      <span 
                        className="technical-rating"
                        style={{ color: getTechnicalColor(pair.technicalRating) }}
                      >
                        {pair.technicalRating}
                      </span>
                    </div>
                    <div className="table-cell action-cell">
                      <button className="trade-btn">Trade</button>
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
        .forex-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .forex-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .forex-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
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
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.3);
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
          background: linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6);
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

        .market-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 40px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .stat-label {
          display: block;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4px;
        }

        .stat-value {
          display: block;
          font-size: 1.2rem;
          font-weight: 600;
          color: #06b6d4;
        }

        .market-overview {
          padding: 60px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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
          color: #06b6d4;
        }

        .bank-rates {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bank-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .bank-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .bank-name {
          font-weight: 600;
          color: white;
        }

        .bank-rate {
          font-size: 0.9rem;
          color: #06b6d4;
          font-weight: 500;
        }

        .bank-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
          align-items: flex-end;
        }

        .next-meeting {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .bias {
          font-size: 0.8rem;
          font-weight: 500;
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .event-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .event-time {
          font-weight: 600;
          color: #06b6d4;
          min-width: 50px;
        }

        .event-details {
          flex: 1;
        }

        .event-name {
          display: block;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .event-data {
          display: flex;
          gap: 12px;
          font-size: 0.8rem;
        }

        .impact {
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 500;
        }

        .impact.high {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .impact.medium {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .impact.low {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .forecast {
          color: rgba(255, 255, 255, 0.7);
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

        .filter-buttons {
          display: flex;
          gap: 8px;
        }

        .filter-btn {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: rgba(6, 182, 212, 0.2);
          border-color: rgba(6, 182, 212, 0.4);
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
          background: rgba(6, 182, 212, 0.2);
          color: white;
        }

        .forex-section {
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

        .forex-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .forex-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .forex-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          border-color: rgba(6, 182, 212, 0.3);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .pair-info {
          flex: 1;
        }

        .pair-symbol {
          font-size: 1.4rem;
          font-weight: 700;
          color: #06b6d4;
          display: block;
          margin-bottom: 4px;
        }

        .pair-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          display: block;
          margin-bottom: 8px;
        }

        .category-badge {
          font-size: 0.7rem;
          padding: 2px 6px;
          background: rgba(6, 182, 212, 0.2);
          border-radius: 4px;
          color: #06b6d4;
        }

        .ratings {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-end;
        }

        .technical-rating,
        .volatility {
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

        .metric-value.bullish {
          color: #10b981;
        }

        .metric-value.bearish {
          color: #ef4444;
        }

        .metric-value.neutral {
          color: #f59e0b;
        }

        .technical-indicators {
          margin-bottom: 20px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .indicator-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .indicator-row:last-child {
          margin-bottom: 0;
        }

        .indicator-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .indicator-value {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .indicator-value.bullish {
          color: #10b981;
        }

        .indicator-value.bearish {
          color: #ef4444;
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
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          border: none;
          color: white;
        }

        .action-btn.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }

        .action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .forex-table {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.05);
          font-weight: 600;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

        .pair-cell .pair-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .pair-cell .pair-symbol {
          font-weight: 600;
          color: #06b6d4;
          font-size: 1rem;
        }

        .pair-cell .pair-name {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .price-cell {
          font-weight: 600;
        }

        .change-cell .change {
          font-weight: 500;
        }

        .rating-cell .technical-rating {
          font-weight: 600;
        }

        .action-cell {
          justify-content: center;
        }

        .trade-btn {
          padding: 6px 12px;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .trade-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(6, 182, 212, 0.3);
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

          .market-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }

          .filters-container {
            flex-direction: column;
            gap: 16px;
          }

          .forex-grid {
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

export default ForexPage 