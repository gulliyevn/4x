'use client'

import React, { useState } from 'react'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

const CommoditiesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('volume')
  const [viewMode, setViewMode] = useState('grid')

  const categories = ['all', 'metals', 'energy', 'agriculture', 'livestock']
  const timeframes = ['1H', '4H', '1D', '1W', '1M']

  const commoditiesData = [
    {
      symbol: 'GOLD',
      name: 'Gold',
      price: 2034.50,
      change: 12.30,
      changePercent: 0.61,
      volume: '$45.2B',
      unit: 'oz',
      category: 'metals',
      high24h: 2041.80,
      low24h: 2018.90,
      contract: 'GC',
      exchange: 'COMEX',
      isPositive: true,
      technicalRating: 'Buy',
      fundamentalRating: 'Bullish',
      volatility: 'Medium',
      seasonality: 'Neutral',
      inventories: 'Low',
      description: 'Precious metal safe haven asset'
    },
    {
      symbol: 'SILVER',
      name: 'Silver',
      price: 24.85,
      change: -0.45,
      changePercent: -1.78,
      volume: '$8.9B',
      unit: 'oz',
      category: 'metals',
      high24h: 25.42,
      low24h: 24.67,
      contract: 'SI',
      exchange: 'COMEX',
      isPositive: false,
      technicalRating: 'Sell',
      fundamentalRating: 'Neutral',
      volatility: 'High',
      seasonality: 'Bearish',
      inventories: 'Normal',
      description: 'Industrial and precious metal'
    },
    {
      symbol: 'CRUDE',
      name: 'Crude Oil WTI',
      price: 78.45,
      change: 1.23,
      changePercent: 1.59,
      volume: '$125.8B',
      unit: 'bbl',
      category: 'energy',
      high24h: 79.12,
      low24h: 77.23,
      contract: 'CL',
      exchange: 'NYMEX',
      isPositive: true,
      technicalRating: 'Strong Buy',
      fundamentalRating: 'Bullish',
      volatility: 'High',
      seasonality: 'Bullish',
      inventories: 'Low',
      description: 'West Texas Intermediate crude oil'
    },
    {
      symbol: 'NATGAS',
      name: 'Natural Gas',
      price: 2.89,
      change: 0.12,
      changePercent: 4.33,
      volume: '$18.7B',
      unit: 'MMBtu',
      category: 'energy',
      high24h: 2.95,
      low24h: 2.76,
      contract: 'NG',
      exchange: 'NYMEX',
      isPositive: true,
      technicalRating: 'Buy',
      fundamentalRating: 'Bullish',
      volatility: 'Very High',
      seasonality: 'Bullish',
      inventories: 'Below Average',
      description: 'Henry Hub natural gas futures'
    },
    {
      symbol: 'WHEAT',
      name: 'Wheat',
      price: 645.25,
      change: -8.75,
      changePercent: -1.34,
      volume: '$2.1B',
      unit: 'bu',
      category: 'agriculture',
      high24h: 658.50,
      low24h: 642.00,
      contract: 'W',
      exchange: 'CBOT',
      isPositive: false,
      technicalRating: 'Hold',
      fundamentalRating: 'Neutral',
      volatility: 'Medium',
      seasonality: 'Neutral',
      inventories: 'Normal',
      description: 'Chicago soft red winter wheat'
    },
    {
      symbol: 'CORN',
      name: 'Corn',
      price: 485.50,
      change: 3.25,
      changePercent: 0.67,
      volume: '$3.8B',
      unit: 'bu',
      category: 'agriculture',
      high24h: 489.75,
      low24h: 481.25,
      contract: 'C',
      exchange: 'CBOT',
      isPositive: true,
      technicalRating: 'Buy',
      fundamentalRating: 'Bullish',
      volatility: 'Medium',
      seasonality: 'Bullish',
      inventories: 'Low',
      description: 'Yellow corn futures contract'
    },
    {
      symbol: 'COPPER',
      name: 'Copper',
      price: 3.85,
      change: 0.08,
      changePercent: 2.12,
      volume: '$12.4B',
      unit: 'lb',
      category: 'metals',
      high24h: 3.89,
      low24h: 3.76,
      contract: 'HG',
      exchange: 'COMEX',
      isPositive: true,
      technicalRating: 'Strong Buy',
      fundamentalRating: 'Bullish',
      volatility: 'Medium',
      seasonality: 'Neutral',
      inventories: 'Very Low',
      description: 'Industrial metal barometer'
    },
    {
      symbol: 'CATTLE',
      name: 'Live Cattle',
      price: 175.25,
      change: -1.50,
      changePercent: -0.85,
      volume: '$890M',
      unit: 'cwt',
      category: 'livestock',
      high24h: 177.50,
      low24h: 174.75,
      contract: 'LC',
      exchange: 'CME',
      isPositive: false,
      technicalRating: 'Hold',
      fundamentalRating: 'Neutral',
      volatility: 'Low',
      seasonality: 'Neutral',
      inventories: 'Normal',
      description: 'Live cattle futures contract'
    }
  ]

  const marketStats = {
    totalVolume: '$285.6B',
    activeCommodities: '50+',
    metalsPct: '+1.2%',
    energyPct: '+2.8%',
    agriculturePct: '-0.5%',
    livestockPct: '-0.3%'
  }

  const supplyDemandData = [
    { commodity: 'Gold', supply: 'Stable', demand: 'High', outlook: 'Bullish' },
    { commodity: 'Oil', supply: 'Tight', demand: 'Strong', outlook: 'Very Bullish' },
    { commodity: 'Wheat', supply: 'Adequate', demand: 'Moderate', outlook: 'Neutral' },
    { commodity: 'Copper', supply: 'Low', demand: 'Very High', outlook: 'Bullish' }
  ]

  const seasonalTrends = [
    { period: 'Q1', metals: 'Neutral', energy: 'Strong', agriculture: 'Weak' },
    { period: 'Q2', metals: 'Weak', energy: 'Moderate', agriculture: 'Strong' },
    { period: 'Q3', metals: 'Strong', energy: 'Weak', agriculture: 'Strong' },
    { period: 'Q4', metals: 'Strong', energy: 'Strong', agriculture: 'Moderate' }
  ]

  const filteredCommodities = commoditiesData.filter(commodity => {
    const matchesCategory = selectedCategory === 'all' || commodity.category === selectedCategory
    const matchesSearch = commodity.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commodity.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedCommodities = [...filteredCommodities].sort((a, b) => {
    switch (sortBy) {
      case 'volume':
        return parseFloat(b.volume.replace(/[$BM]/g, '')) - parseFloat(a.volume.replace(/[$BM]/g, ''))
      case 'change':
        return Math.abs(b.changePercent) - Math.abs(a.changePercent)
      case 'price':
        return b.price - a.price
      case 'volatility':
        const volOrder = { 'Low': 1, 'Medium': 2, 'High': 3, 'Very High': 4 }
        return volOrder[b.volatility] - volOrder[a.volatility]
      default:
        return parseFloat(b.volume.replace(/[$BM]/g, '')) - parseFloat(a.volume.replace(/[$BM]/g, ''))
    }
  })

  const getTechnicalColor = (rating: string) => {
    if (rating === 'Strong Buy') return '#10b981'
    if (rating === 'Buy') return '#06b6d4'
    if (rating === 'Hold') return '#f59e0b'
    if (rating === 'Sell') return '#f97316'
    return '#6b7280'
  }

  const getVolatilityColor = (volatility: string) => {
    if (volatility === 'Very High') return '#ef4444'
    if (volatility === 'High') return '#f97316'
    if (volatility === 'Medium') return '#f59e0b'
    return '#10b981'
  }

  const getOutlookColor = (outlook: string) => {
    if (outlook.includes('Bullish')) return '#10b981'
    if (outlook === 'Neutral') return '#f59e0b'
    return '#ef4444'
  }

  const getInventoryColor = (inventory: string) => {
    if (inventory.includes('Low')) return '#ef4444'
    if (inventory === 'Normal') return '#f59e0b'
    return '#10b981'
  }

  return (
    <>
      <Navigation />
      <div className="commodities-page">
        {/* Hero Section */}
        <section className="commodities-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">🏗️</span>
                <span>Commodities</span>
              </div>
              <h1 className="hero-title">
                Commodity Markets
                <span className="gradient-text">50+ Commodities, Supply & Demand</span>
              </h1>
              <p className="hero-description">
                Trade metals, energy, agriculture, and livestock with real-time pricing, 
                supply/demand analytics, and seasonal trend insights.
              </p>
              
              {/* Market Stats */}
              <div className="market-stats">
                <div className="stat-card">
                  <span className="stat-label">Total Volume</span>
                  <span className="stat-value">{marketStats.totalVolume}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Metals</span>
                  <span className="stat-value positive">{marketStats.metalsPct}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Energy</span>
                  <span className="stat-value positive">{marketStats.energyPct}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Agriculture</span>
                  <span className="stat-value negative">{marketStats.agriculturePct}</span>
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
                <h3 className="card-title">Supply & Demand</h3>
                <div className="supply-demand-list">
                  {supplyDemandData.map((item, idx) => (
                    <div key={idx} className="supply-item">
                      <div className="commodity-name">{item.commodity}</div>
                      <div className="supply-details">
                        <span className="supply-label">Supply: <span className="supply-value">{item.supply}</span></span>
                        <span className="demand-label">Demand: <span className="demand-value">{item.demand}</span></span>
                        <span 
                          className="outlook"
                          style={{ color: getOutlookColor(item.outlook) }}
                        >
                          {item.outlook}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="overview-card">
                <h3 className="card-title">Seasonal Trends</h3>
                <div className="seasonal-grid">
                  {seasonalTrends.map((trend, idx) => (
                    <div key={idx} className="seasonal-item">
                      <div className="period">{trend.period}</div>
                      <div className="trend-details">
                        <div className="trend-row">
                          <span>Metals:</span>
                          <span className={`trend-value ${trend.metals.toLowerCase()}`}>
                            {trend.metals}
                          </span>
                        </div>
                        <div className="trend-row">
                          <span>Energy:</span>
                          <span className={`trend-value ${trend.energy.toLowerCase()}`}>
                            {trend.energy}
                          </span>
                        </div>
                        <div className="trend-row">
                          <span>Agriculture:</span>
                          <span className={`trend-value ${trend.agriculture.toLowerCase()}`}>
                            {trend.agriculture}
                          </span>
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
                  placeholder="Search commodities..."
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
                      {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
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
                  <option value="price">Price</option>
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

        {/* Commodities Display */}
        <section className="commodities-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Commodity Prices</h2>
              <p className="section-description">
                {filteredCommodities.length} commodities available for trading
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="commodities-grid">
                {sortedCommodities.map((commodity, index) => (
                  <div key={index} className="commodity-card">
                    <div className="card-header">
                      <div className="commodity-info">
                        <span className="commodity-symbol">{commodity.symbol}</span>
                        <span className="commodity-name">{commodity.name}</span>
                        <div className="commodity-details">
                          <span className="category-badge">{commodity.category}</span>
                          <span className="exchange">{commodity.exchange}</span>
                        </div>
                      </div>
                      <div className="ratings">
                        <span 
                          className="technical-rating"
                          style={{ color: getTechnicalColor(commodity.technicalRating) }}
                        >
                          {commodity.technicalRating}
                        </span>
                        <span 
                          className="volatility"
                          style={{ color: getVolatilityColor(commodity.volatility) }}
                        >
                          {commodity.volatility}
                        </span>
                      </div>
                    </div>

                    <div className="price-section">
                      <div className="current-price">
                        <span className="price">
                          ${commodity.price.toLocaleString()}/{commodity.unit}
                        </span>
                        <span className={`change ${commodity.isPositive ? 'positive' : 'negative'}`}>
                          {commodity.isPositive ? '+' : ''}${Math.abs(commodity.change).toFixed(2)} 
                          ({commodity.isPositive ? '+' : ''}{commodity.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>

                    <div className="metrics-grid">
                      <div className="metric-item">
                        <span className="metric-label">Volume</span>
                        <span className="metric-value">{commodity.volume}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Contract</span>
                        <span className="metric-value">{commodity.contract}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">High/Low</span>
                        <span className="metric-value">
                          {commodity.high24h}/{commodity.low24h}
                        </span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Seasonality</span>
                        <span className={`metric-value ${commodity.seasonality.toLowerCase()}`}>
                          {commodity.seasonality}
                        </span>
                      </div>
                    </div>

                    <div className="fundamental-analysis">
                      <div className="fundamental-row">
                        <span className="fundamental-label">Inventories</span>
                        <span 
                          className="fundamental-value"
                          style={{ color: getInventoryColor(commodity.inventories) }}
                        >
                          {commodity.inventories}
                        </span>
                      </div>
                      <div className="fundamental-row">
                        <span className="fundamental-label">Fundamental</span>
                        <span className={`fundamental-value ${commodity.fundamentalRating.toLowerCase()}`}>
                          {commodity.fundamentalRating}
                        </span>
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
              <div className="commodities-table">
                <div className="table-header">
                  <div className="header-cell">Commodity</div>
                  <div className="header-cell">Price</div>
                  <div className="header-cell">Change</div>
                  <div className="header-cell">Volume</div>
                  <div className="header-cell">Volatility</div>
                  <div className="header-cell">Inventories</div>
                  <div className="header-cell">Rating</div>
                  <div className="header-cell">Action</div>
                </div>
                {sortedCommodities.map((commodity, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell commodity-cell">
                      <div className="commodity-info">
                        <span className="commodity-symbol">{commodity.symbol}</span>
                        <span className="commodity-name">{commodity.name}</span>
                      </div>
                    </div>
                    <div className="table-cell price-cell">
                      ${commodity.price.toLocaleString()}/{commodity.unit}
                    </div>
                    <div className="table-cell change-cell">
                      <span className={`change ${commodity.isPositive ? 'positive' : 'negative'}`}>
                        {commodity.isPositive ? '+' : ''}{commodity.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className="table-cell">{commodity.volume}</div>
                    <div className="table-cell">
                      <span 
                        className="volatility"
                        style={{ color: getVolatilityColor(commodity.volatility) }}
                      >
                        {commodity.volatility}
                      </span>
                    </div>
                    <div className="table-cell">
                      <span 
                        className="inventories"
                        style={{ color: getInventoryColor(commodity.inventories) }}
                      >
                        {commodity.inventories}
                      </span>
                    </div>
                    <div className="table-cell rating-cell">
                      <span 
                        className="technical-rating"
                        style={{ color: getTechnicalColor(commodity.technicalRating) }}
                      >
                        {commodity.technicalRating}
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
        .commodities-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .commodities-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .commodities-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 70% 30%, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
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
          background: linear-gradient(135deg, #f59e0b, #f97316, #ef4444);
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

        .stat-value.positive {
          color: #10b981;
        }

        .stat-value.negative {
          color: #ef4444;
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
          color: #f59e0b;
        }

        .supply-demand-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .supply-item {
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .commodity-name {
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }

        .supply-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.9rem;
        }

        .supply-label,
        .demand-label {
          color: rgba(255, 255, 255, 0.7);
        }

        .supply-value,
        .demand-value {
          color: white;
          font-weight: 500;
        }

        .outlook {
          font-weight: 600;
        }

        .seasonal-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .seasonal-item {
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .period {
          font-weight: 600;
          color: #f59e0b;
          margin-bottom: 8px;
        }

        .trend-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .trend-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .trend-value {
          font-weight: 500;
        }

        .trend-value.strong {
          color: #10b981;
        }

        .trend-value.moderate {
          color: #f59e0b;
        }

        .trend-value.weak {
          color: #ef4444;
        }

        .trend-value.neutral {
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

        .commodities-section {
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

        .commodities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .commodity-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .commodity-card:hover {
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

        .commodity-info {
          flex: 1;
        }

        .commodity-symbol {
          font-size: 1.4rem;
          font-weight: 700;
          color: #f59e0b;
          display: block;
          margin-bottom: 4px;
        }

        .commodity-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          display: block;
          margin-bottom: 8px;
        }

        .commodity-details {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .category-badge {
          font-size: 0.7rem;
          padding: 2px 6px;
          background: rgba(245, 158, 11, 0.2);
          border-radius: 4px;
          color: #f59e0b;
        }

        .exchange {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.6);
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
          font-size: 1.6rem;
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

        .fundamental-analysis {
          margin-bottom: 20px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .fundamental-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .fundamental-row:last-child {
          margin-bottom: 0;
        }

        .fundamental-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .fundamental-value {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .fundamental-value.bullish {
          color: #10b981;
        }

        .fundamental-value.bearish {
          color: #ef4444;
        }

        .fundamental-value.neutral {
          color: #f59e0b;
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
          background: linear-gradient(135deg, #f59e0b, #f97316);
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

        .commodities-table {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.05);
          font-weight: 600;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

        .commodity-cell .commodity-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .commodity-cell .commodity-symbol {
          font-weight: 600;
          color: #f59e0b;
          font-size: 1rem;
        }

        .commodity-cell .commodity-name {
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
          background: linear-gradient(135deg, #f59e0b, #f97316);
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
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
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

          .seasonal-grid {
            grid-template-columns: 1fr;
          }

          .filters-container {
            flex-direction: column;
            gap: 16px;
          }

          .commodities-grid {
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

export default CommoditiesPage 