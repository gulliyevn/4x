'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

const CryptocurrencyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('marketCap')
  const [viewMode, setViewMode] = useState('grid')

  const categories = ['all', 'Layer 1', 'DeFi', 'NFT', 'Gaming', 'Metaverse', 'AI', 'Meme']
  const timeframes = ['1h', '24h', '7d', '30d', '1y']

  const cryptoData = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 43250.00,
      change24h: 1250.00,
      changePercent24h: 2.98,
      volume24h: '$28.5B',
      marketCap: '$845.2B',
      circulatingSupply: '19.5M',
      totalSupply: '21M',
      category: 'Layer 1',
      rank: 1,
      high24h: 44100.00,
      low24h: 42800.00,
      ath: 69045.00,
      athDate: '2021-11-10',
      dominance: 52.3,
      fearGreedIndex: 72,
      hashRate: '450 EH/s',
      description: 'The first and largest cryptocurrency by market capitalization.',
      isPositive: true,
      aiRating: 'A+',
      technicalRating: 'Strong Buy',
      socialScore: 85
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2580.50,
      change24h: -125.30,
      changePercent24h: -4.63,
      volume24h: '$15.2B',
      marketCap: '$310.4B',
      circulatingSupply: '120.3M',
      totalSupply: '120.3M',
      category: 'Layer 1',
      rank: 2,
      high24h: 2720.00,
      low24h: 2550.00,
      ath: 4878.26,
      athDate: '2021-11-10',
      dominance: 19.2,
      fearGreedIndex: 68,
      gasPrice: '25 Gwei',
      description: 'Decentralized platform for smart contracts and DApps.',
      isPositive: false,
      aiRating: 'A',
      technicalRating: 'Buy',
      socialScore: 92
    },
    {
      symbol: 'BNB',
      name: 'BNB',
      price: 315.80,
      change24h: 8.90,
      changePercent24h: 2.90,
      volume24h: '$1.8B',
      marketCap: '$47.2B',
      circulatingSupply: '149.5M',
      totalSupply: '149.5M',
      category: 'Layer 1',
      rank: 3,
      high24h: 320.50,
      low24h: 305.20,
      ath: 686.31,
      athDate: '2021-05-10',
      dominance: 2.9,
      fearGreedIndex: 75,
      burnRate: '2.1M BNB',
      description: 'Native token of Binance ecosystem and BSC blockchain.',
      isPositive: true,
      aiRating: 'B+',
      technicalRating: 'Hold',
      socialScore: 78
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 98.45,
      change24h: 12.30,
      changePercent24h: 14.28,
      volume24h: '$3.2B',
      marketCap: '$42.8B',
      circulatingSupply: '434.8M',
      totalSupply: '548.1M',
      category: 'Layer 1',
      rank: 4,
      high24h: 102.80,
      low24h: 85.20,
      ath: 259.96,
      athDate: '2021-11-06',
      dominance: 2.6,
      fearGreedIndex: 82,
      tps: '65,000',
      description: 'High-performance blockchain for decentralized applications.',
      isPositive: true,
      aiRating: 'A-',
      technicalRating: 'Strong Buy',
      socialScore: 88
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      price: 6.85,
      change24h: 0.45,
      changePercent24h: 7.03,
      volume24h: '$180M',
      marketCap: '$4.1B',
      circulatingSupply: '598.5M',
      totalSupply: '1B',
      category: 'DeFi',
      rank: 15,
      high24h: 7.20,
      low24h: 6.30,
      ath: 44.97,
      athDate: '2021-05-03',
      dominance: 0.25,
      fearGreedIndex: 70,
      tvl: '$3.8B',
      description: 'Leading decentralized exchange protocol on Ethereum.',
      isPositive: true,
      aiRating: 'B+',
      technicalRating: 'Buy',
      socialScore: 85
    },
    {
      symbol: 'LINK',
      name: 'Chainlink',
      price: 14.25,
      change24h: -0.85,
      changePercent24h: -5.63,
      volume24h: '$420M',
      marketCap: '$8.1B',
      circulatingSupply: '568.1M',
      totalSupply: '1B',
      category: 'DeFi',
      rank: 12,
      high24h: 15.40,
      low24h: 13.90,
      ath: 52.70,
      athDate: '2021-05-10',
      dominance: 0.5,
      fearGreedIndex: 65,
      oracles: '1,500+',
      description: 'Decentralized oracle network connecting blockchains to real-world data.',
      isPositive: false,
      aiRating: 'A-',
      technicalRating: 'Hold',
      socialScore: 82
    }
  ]

  const marketStats = {
    totalMarketCap: '$1.62T',
    total24hVolume: '$89.5B',
    btcDominance: 52.3,
    ethDominance: 19.2,
    defiTvl: '$45.8B',
    activeCoins: 5247
  }

  const fearGreedData = {
    value: 72,
    label: 'Greed',
    description: 'Market sentiment is showing greed, indicating potential buying opportunities'
  }

  const topGainers = [
    { symbol: 'SOL', change: '+14.28%' },
    { symbol: 'UNI', change: '+7.03%' },
    { symbol: 'BTC', change: '+2.98%' }
  ]

  const topLosers = [
    { symbol: 'LINK', change: '-5.63%' },
    { symbol: 'ETH', change: '-4.63%' },
    { symbol: 'ADA', change: '-3.21%' }
  ]

  const filteredCryptos = cryptoData.filter(crypto => {
    const matchesCategory = selectedCategory === 'all' || crypto.category === selectedCategory
    const matchesSearch = crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedCryptos = [...filteredCryptos].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.price - a.price
      case 'change':
        return b.changePercent24h - a.changePercent24h
      case 'volume':
        return parseFloat(b.volume24h.replace(/[$B]/g, '')) - parseFloat(a.volume24h.replace(/[$B]/g, ''))
      case 'marketCap':
        const aValue = parseFloat(a.marketCap.replace(/[$TB]/g, '')) * (a.marketCap.includes('T') ? 1000 : 1)
        const bValue = parseFloat(b.marketCap.replace(/[$TB]/g, '')) * (b.marketCap.includes('T') ? 1000 : 1)
        return bValue - aValue
      case 'rank':
        return a.rank - b.rank
      default:
        return a.rank - b.rank
    }
  })

  const getRatingColor = (rating: string) => {
    if (rating.includes('A')) return '#10b981'
    if (rating.includes('B')) return '#f59e0b'
    return '#6b7280'
  }

  const getTechnicalColor = (rating: string) => {
    if (rating === 'Strong Buy') return '#10b981'
    if (rating === 'Buy') return '#06b6d4'
    if (rating === 'Hold') return '#f59e0b'
    return '#ef4444'
  }

  const getFearGreedColor = (value: number) => {
    if (value >= 75) return '#ef4444' // Extreme Greed
    if (value >= 55) return '#f59e0b' // Greed
    if (value >= 45) return '#06b6d4' // Neutral
    if (value >= 25) return '#8b5cf6' // Fear
    return '#ef4444' // Extreme Fear
  }

  return (
    <>
      <Navigation />
      <div className="crypto-page">
        {/* Hero Section */}
        <section className="crypto-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">₿</span>
                <span>Cryptocurrency</span>
              </div>
              <h1 className="hero-title">
                Digital Asset Trading
                <span className="gradient-text">5,000+ Cryptos, DeFi Analytics</span>
              </h1>
              <p className="hero-description">
                Trade cryptocurrencies and DeFi tokens with advanced analytics, 
                real-time market data, and comprehensive blockchain insights.
              </p>
              
              {/* Market Stats */}
              <div className="market-stats">
                <div className="stat-card">
                  <span className="stat-label">Total Market Cap</span>
                  <span className="stat-value">{marketStats.totalMarketCap}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">24h Volume</span>
                  <span className="stat-value">{marketStats.total24hVolume}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">BTC Dominance</span>
                  <span className="stat-value">{marketStats.btcDominance}%</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">DeFi TVL</span>
                  <span className="stat-value">{marketStats.defiTvl}</span>
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
                <h3 className="card-title">Fear & Greed Index</h3>
                <div className="fear-greed-meter">
                  <div className="meter-container">
                    <div className="meter-arc">
                      <div 
                        className="meter-fill"
                        style={{ 
                          width: `${fearGreedData.value}%`,
                          backgroundColor: getFearGreedColor(fearGreedData.value)
                        }}
                      ></div>
                    </div>
                    <div className="meter-center">
                      <span className="meter-value">{fearGreedData.value}</span>
                      <span className="meter-label">{fearGreedData.label}</span>
                    </div>
                  </div>
                  <p className="meter-description">{fearGreedData.description}</p>
                </div>
              </div>
              
              <div className="overview-card">
                <h3 className="card-title">Top Gainers</h3>
                <div className="movers-list">
                  {topGainers.map((crypto, idx) => (
                    <div key={idx} className="mover-item">
                      <span className="mover-symbol">{crypto.symbol}</span>
                      <span className="mover-change positive">{crypto.change}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="overview-card">
                <h3 className="card-title">Top Losers</h3>
                <div className="movers-list">
                  {topLosers.map((crypto, idx) => (
                    <div key={idx} className="mover-item">
                      <span className="mover-symbol">{crypto.symbol}</span>
                      <span className="mover-change negative">{crypto.change}</span>
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
                  placeholder="Search cryptocurrencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <select 
                  className="filter-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
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
                  <option value="rank">Market Cap Rank</option>
                  <option value="marketCap">Market Cap</option>
                  <option value="price">Price</option>
                  <option value="change">24h Change</option>
                  <option value="volume">24h Volume</option>
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

        {/* Crypto Display */}
        <section className="crypto-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Cryptocurrency Listings</h2>
              <p className="section-description">
                {filteredCryptos.length} cryptocurrencies found
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="crypto-grid">
                {sortedCryptos.map((crypto, index) => (
                  <div key={index} className="crypto-card">
                    <div className="card-header">
                      <div className="crypto-info">
                        <div className="symbol-section">
                          <span className="rank">#{crypto.rank}</span>
                          <span className="symbol">{crypto.symbol}</span>
                          <span className="category">{crypto.category}</span>
                        </div>
                        <span className="crypto-name">{crypto.name}</span>
                      </div>
                      <div className="ratings">
                        <span 
                          className="ai-rating"
                          style={{ color: getRatingColor(crypto.aiRating) }}
                        >
                          AI: {crypto.aiRating}
                        </span>
                        <span 
                          className="technical-rating"
                          style={{ color: getTechnicalColor(crypto.technicalRating) }}
                        >
                          {crypto.technicalRating}
                        </span>
                      </div>
                    </div>

                    <div className="price-section">
                      <div className="current-price">
                        <span className="price">${crypto.price.toLocaleString()}</span>
                        <span className={`change ${crypto.isPositive ? 'positive' : 'negative'}`}>
                          {crypto.isPositive ? '+' : ''}${Math.abs(crypto.change24h).toFixed(2)} 
                          ({crypto.isPositive ? '+' : ''}{crypto.changePercent24h.toFixed(2)}%)
                        </span>
                      </div>
                    </div>

                    <div className="metrics-grid">
                      <div className="metric-item">
                        <span className="metric-label">Market Cap</span>
                        <span className="metric-value">{crypto.marketCap}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">24h Volume</span>
                        <span className="metric-value">{crypto.volume24h}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Circulating</span>
                        <span className="metric-value">{crypto.circulatingSupply}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Dominance</span>
                        <span className="metric-value">{crypto.dominance}%</span>
                      </div>
                    </div>

                    <div className="additional-metrics">
                      <div className="metric-row">
                        <span className="metric-label">24h High/Low</span>
                        <span className="metric-value">
                          ${crypto.high24h.toLocaleString()} / ${crypto.low24h.toLocaleString()}
                        </span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label">ATH</span>
                        <span className="metric-value">
                          ${crypto.ath.toLocaleString()}
                        </span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label">Social Score</span>
                        <span className="metric-value">{crypto.socialScore}/100</span>
                      </div>
                    </div>

                    <div className="card-actions">
                      <button className="action-btn primary">
                        Trade Now
                      </button>
                      <button className="action-btn secondary">
                        Add to Portfolio
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="crypto-table">
                <div className="table-header">
                  <div className="header-cell">Rank</div>
                  <div className="header-cell">Name</div>
                  <div className="header-cell">Price</div>
                  <div className="header-cell">24h Change</div>
                  <div className="header-cell">24h Volume</div>
                  <div className="header-cell">Market Cap</div>
                  <div className="header-cell">Dominance</div>
                  <div className="header-cell">Rating</div>
                </div>
                {sortedCryptos.map((crypto, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell rank-cell">
                      #{crypto.rank}
                    </div>
                    <div className="table-cell name-cell">
                      <div className="crypto-info">
                        <span className="symbol">{crypto.symbol}</span>
                        <span className="crypto-name">{crypto.name}</span>
                      </div>
                    </div>
                    <div className="table-cell price-cell">
                      ${crypto.price.toLocaleString()}
                    </div>
                    <div className="table-cell change-cell">
                      <span className={`change ${crypto.isPositive ? 'positive' : 'negative'}`}>
                        {crypto.isPositive ? '+' : ''}{crypto.changePercent24h.toFixed(2)}%
                      </span>
                    </div>
                    <div className="table-cell">{crypto.volume24h}</div>
                    <div className="table-cell">{crypto.marketCap}</div>
                    <div className="table-cell">{crypto.dominance}%</div>
                    <div className="table-cell rating-cell">
                      <span 
                        className="ai-rating"
                        style={{ color: getRatingColor(crypto.aiRating) }}
                      >
                        {crypto.aiRating}
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
        .crypto-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .crypto-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .crypto-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 60% 40%, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
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
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
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
          background: linear-gradient(135deg, #f59e0b, #ef4444, #8b5cf6);
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
          color: #f59e0b;
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
          color: #f59e0b;
        }

        .fear-greed-meter {
          text-align: center;
        }

        .meter-container {
          margin-bottom: 16px;
        }

        .meter-arc {
          width: 100%;
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .meter-fill {
          height: 100%;
          border-radius: 6px;
          transition: width 0.3s ease;
        }

        .meter-center {
          text-align: center;
        }

        .meter-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #f59e0b;
          margin-bottom: 4px;
        }

        .meter-label {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .meter-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
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
          color: #f59e0b;
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
          background: rgba(245, 158, 11, 0.2);
          border-color: rgba(245, 158, 11, 0.4);
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
          background: rgba(245, 158, 11, 0.2);
          color: white;
        }

        .crypto-section {
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

        .crypto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 24px;
        }

        .crypto-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .crypto-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          border-color: rgba(245, 158, 11, 0.3);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .crypto-info {
          flex: 1;
        }

        .symbol-section {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .rank {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }

        .symbol {
          font-size: 1.2rem;
          font-weight: 700;
          color: #f59e0b;
        }

        .category {
          font-size: 0.7rem;
          padding: 2px 6px;
          background: rgba(245, 158, 11, 0.2);
          border-radius: 4px;
          color: #f59e0b;
        }

        .crypto-name {
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
        .technical-rating {
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

        .additional-metrics {
          margin-bottom: 20px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .metric-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .metric-row:last-child {
          margin-bottom: 0;
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
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          border: none;
          color: white;
        }

        .action-btn.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }

        .action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .crypto-table {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.05);
          font-weight: 600;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .table-row {
          display: grid;
          grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

        .rank-cell {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
        }

        .name-cell .crypto-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .name-cell .symbol {
          font-weight: 600;
          color: #f59e0b;
        }

        .name-cell .crypto-name {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .price-cell {
          font-weight: 600;
        }

        .change-cell .change {
          font-weight: 500;
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

          .crypto-grid {
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

export default CryptocurrencyPage 