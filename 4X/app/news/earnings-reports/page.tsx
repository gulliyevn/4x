'use client'

import React, { useState } from 'react'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

const EarningsReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-week')
  const [selectedSector, setSelectedSector] = useState('all')
  const [viewMode, setViewMode] = useState('upcoming')

  const periods = ['this-week', 'next-week', 'this-month']
  const sectors = ['all', 'technology', 'healthcare', 'finance', 'energy', 'consumer']
  const viewModes = ['upcoming', 'recent', 'calendar']

  const upcomingEarnings = [
    {
      id: 1,
      symbol: 'AAPL',
      company: 'Apple Inc.',
      date: '2024-01-25',
      time: 'After Market Close',
      quarter: 'Q1 2024',
      sector: 'technology',
      marketCap: '2.9T',
      estimates: {
        eps: { estimate: 2.18, previous: 1.88, growth: 15.96 },
        revenue: { estimate: 117.91, previous: 89.50, growth: 31.73 }
      },
      guidance: 'Strong',
      analystRating: 'Buy',
      priceTarget: 195.50,
      volatility: 'High',
      keyMetrics: ['iPhone Sales', 'Services Revenue', 'China Performance'],
      consensus: { buy: 28, hold: 8, sell: 2 }
    },
    {
      id: 2,
      symbol: 'MSFT',
      company: 'Microsoft Corporation',
      date: '2024-01-24',
      time: 'After Market Close',
      quarter: 'Q2 2024',
      sector: 'technology',
      marketCap: '2.8T',
      estimates: {
        eps: { estimate: 2.78, previous: 2.32, growth: 19.83 },
        revenue: { estimate: 60.82, previous: 56.52, growth: 7.61 }
      },
      guidance: 'Strong',
      analystRating: 'Buy',
      priceTarget: 420.00,
      volatility: 'Medium',
      keyMetrics: ['Azure Growth', 'Office 365', 'AI Integration'],
      consensus: { buy: 32, hold: 6, sell: 1 }
    },
    {
      id: 3,
      symbol: 'TSLA',
      company: 'Tesla Inc.',
      date: '2024-01-24',
      time: 'After Market Close',
      quarter: 'Q4 2023',
      sector: 'consumer',
      marketCap: '790B',
      estimates: {
        eps: { estimate: 0.74, previous: 1.05, growth: -29.52 },
        revenue: { estimate: 25.87, previous: 24.32, growth: 6.37 }
      },
      guidance: 'Mixed',
      analystRating: 'Hold',
      priceTarget: 220.00,
      volatility: 'Very High',
      keyMetrics: ['Vehicle Deliveries', 'Energy Business', 'FSD Progress'],
      consensus: { buy: 15, hold: 18, sell: 8 }
    }
  ]

  const recentEarnings = [
    {
      id: 1,
      symbol: 'NFLX',
      company: 'Netflix Inc.',
      date: '2024-01-23',
      quarter: 'Q4 2023',
      sector: 'technology',
      results: {
        eps: { actual: 2.11, estimate: 2.22, surprise: -4.95 },
        revenue: { actual: 8.83, estimate: 8.72, surprise: 1.26 }
      },
      reaction: { preMarket: -8.5, afterHours: -12.3 },
      keyHighlights: [
        'Subscriber growth missed expectations',
        'Password sharing crackdown impact',
        'Content spending increased'
      ],
      guidance: 'Lowered',
      analystUpdates: 5
    },
    {
      id: 2,
      symbol: 'GOOGL',
      company: 'Alphabet Inc.',
      date: '2024-01-22',
      quarter: 'Q4 2023',
      sector: 'technology',
      results: {
        eps: { actual: 1.64, estimate: 1.59, surprise: 3.14 },
        revenue: { actual: 86.25, estimate: 85.33, surprise: 1.08 }
      },
      reaction: { preMarket: 4.2, afterHours: 6.8 },
      keyHighlights: [
        'YouTube ad revenue growth',
        'Cloud segment acceleration',
        'AI investments paying off'
      ],
      guidance: 'Raised',
      analystUpdates: 12
    }
  ]

  const earningsCalendar = {
    'Monday': [
      { symbol: 'IBM', time: 'After Close', importance: 'Medium' },
      { symbol: 'HAL', time: 'Before Open', importance: 'Low' }
    ],
    'Tuesday': [
      { symbol: 'NFLX', time: 'After Close', importance: 'High' },
      { symbol: 'JNJ', time: 'Before Open', importance: 'Medium' }
    ],
    'Wednesday': [
      { symbol: 'TSLA', time: 'After Close', importance: 'Very High' },
      { symbol: 'MSFT', time: 'After Close', importance: 'Very High' }
    ],
    'Thursday': [
      { symbol: 'AAPL', time: 'After Close', importance: 'Very High' },
      { symbol: 'META', time: 'After Close', importance: 'High' }
    ],
    'Friday': [
      { symbol: 'AMZN', time: 'After Close', importance: 'Very High' }
    ]
  }

  const filteredUpcoming = upcomingEarnings.filter(earning => {
    return selectedSector === 'all' || earning.sector === selectedSector
  })

  const filteredRecent = recentEarnings.filter(earning => {
    return selectedSector === 'all' || earning.sector === selectedSector
  })

  const getReactionColor = (value: number) => {
    return value >= 0 ? '#10b981' : '#ef4444'
  }

  const getSurpriseColor = (value: number) => {
    if (value > 5) return '#10b981'
    if (value > 0) return '#3b82f6'
    if (value > -5) return '#f59e0b'
    return '#ef4444'
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'Very High': return '#ef4444'
      case 'High': return '#f59e0b'
      case 'Medium': return '#3b82f6'
      case 'Low': return '#10b981'
      default: return '#6b7280'
    }
  }

  return (
    <>
      <Navigation />
      <div className="earnings-page">
        {/* Hero Section */}
        <section className="earnings-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">📊</span>
                <span>Earnings Reports</span>
              </div>
              <h1 className="hero-title">
                Corporate Earnings Center
                <span className="gradient-text">Track Results & Forecasts</span>
              </h1>
              <p className="hero-description">
                Comprehensive earnings analysis with forecasts, results, and market reactions 
                for all major publicly traded companies.
              </p>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="earnings-controls">
          <div className="container">
            <div className="controls-container">
              <div className="control-group">
                <label className="control-label">View</label>
                <div className="control-buttons">
                  {viewModes.map(mode => (
                    <button
                      key={mode}
                      className={`control-btn ${viewMode === mode ? 'active' : ''}`}
                      onClick={() => setViewMode(mode)}
                    >
                      {mode === 'upcoming' ? 'Upcoming' : mode === 'recent' ? 'Recent' : 'Calendar'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">Period</label>
                <div className="control-buttons">
                  {periods.map(period => (
                    <button
                      key={period}
                      className={`control-btn ${selectedPeriod === period ? 'active' : ''}`}
                      onClick={() => setSelectedPeriod(period)}
                    >
                      {period.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">Sector</label>
                <select 
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="sector-select"
                >
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>
                      {sector === 'all' ? 'All Sectors' : sector.charAt(0).toUpperCase() + sector.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Earnings */}
        {viewMode === 'upcoming' && (
          <section className="upcoming-earnings">
            <div className="container">
              <h2 className="section-title">Upcoming Earnings</h2>
              <div className="earnings-grid">
                {filteredUpcoming.map((earning) => (
                  <div key={earning.id} className="earning-card">
                    <div className="earning-header">
                      <div className="company-info">
                        <div className="symbol">{earning.symbol}</div>
                        <div className="company-name">{earning.company}</div>
                      </div>
                      <div className="earning-meta">
                        <div className="market-cap">{earning.marketCap}</div>
                        <div className="sector">{earning.sector}</div>
                      </div>
                    </div>

                    <div className="earning-schedule">
                      <div className="schedule-item">
                        <span className="schedule-label">Date:</span>
                        <span className="schedule-value">{earning.date}</span>
                      </div>
                      <div className="schedule-item">
                        <span className="schedule-label">Time:</span>
                        <span className="schedule-value">{earning.time}</span>
                      </div>
                      <div className="schedule-item">
                        <span className="schedule-label">Quarter:</span>
                        <span className="schedule-value">{earning.quarter}</span>
                      </div>
                    </div>

                    <div className="estimates-section">
                      <h4 className="estimates-title">Estimates</h4>
                      <div className="estimates-grid">
                        <div className="estimate-item">
                          <span className="estimate-label">EPS</span>
                          <span className="estimate-value">${earning.estimates.eps.estimate}</span>
                          <span className="estimate-growth">
                            {earning.estimates.eps.growth >= 0 ? '+' : ''}{earning.estimates.eps.growth.toFixed(1)}%
                          </span>
                        </div>
                        <div className="estimate-item">
                          <span className="estimate-label">Revenue (B)</span>
                          <span className="estimate-value">${earning.estimates.revenue.estimate}B</span>
                          <span className="estimate-growth">
                            {earning.estimates.revenue.growth >= 0 ? '+' : ''}{earning.estimates.revenue.growth.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="analyst-section">
                      <div className="analyst-rating">
                        <span className="rating-label">Rating:</span>
                        <span className={`rating-value ${earning.analystRating.toLowerCase()}`}>
                          {earning.analystRating}
                        </span>
                      </div>
                      <div className="price-target">
                        <span className="target-label">Target:</span>
                        <span className="target-value">${earning.priceTarget}</span>
                      </div>
                    </div>

                    <div className="consensus-section">
                      <h5 className="consensus-title">Analyst Consensus</h5>
                      <div className="consensus-bars">
                        <div className="consensus-bar">
                          <span className="consensus-label">Buy</span>
                          <div className="consensus-progress">
                            <div 
                              className="consensus-fill buy"
                              style={{ width: `${(earning.consensus.buy / (earning.consensus.buy + earning.consensus.hold + earning.consensus.sell)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="consensus-count">{earning.consensus.buy}</span>
                        </div>
                        <div className="consensus-bar">
                          <span className="consensus-label">Hold</span>
                          <div className="consensus-progress">
                            <div 
                              className="consensus-fill hold"
                              style={{ width: `${(earning.consensus.hold / (earning.consensus.buy + earning.consensus.hold + earning.consensus.sell)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="consensus-count">{earning.consensus.hold}</span>
                        </div>
                        <div className="consensus-bar">
                          <span className="consensus-label">Sell</span>
                          <div className="consensus-progress">
                            <div 
                              className="consensus-fill sell"
                              style={{ width: `${(earning.consensus.sell / (earning.consensus.buy + earning.consensus.hold + earning.consensus.sell)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="consensus-count">{earning.consensus.sell}</span>
                        </div>
                      </div>
                    </div>

                    <div className="key-metrics">
                      <h5 className="metrics-title">Key Metrics to Watch</h5>
                      <div className="metrics-list">
                        {earning.keyMetrics.map((metric, idx) => (
                          <span key={idx} className="metric-tag">{metric}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Earnings */}
        {viewMode === 'recent' && (
          <section className="recent-earnings">
            <div className="container">
              <h2 className="section-title">Recent Earnings Results</h2>
              <div className="results-grid">
                {filteredRecent.map((result) => (
                  <div key={result.id} className="result-card">
                    <div className="result-header">
                      <div className="company-info">
                        <div className="symbol">{result.symbol}</div>
                        <div className="company-name">{result.company}</div>
                      </div>
                      <div className="result-date">{result.date}</div>
                    </div>

                    <div className="results-section">
                      <h4 className="results-title">Results vs Estimates</h4>
                      <div className="results-grid-inner">
                        <div className="result-item">
                          <span className="result-label">EPS</span>
                          <div className="result-values">
                            <span className="actual-value">${result.results.eps.actual}</span>
                            <span className="vs">vs</span>
                            <span className="estimate-value">${result.results.eps.estimate}</span>
                          </div>
                          <span 
                            className="surprise-value"
                            style={{ color: getSurpriseColor(result.results.eps.surprise) }}
                          >
                            {result.results.eps.surprise >= 0 ? '+' : ''}{result.results.eps.surprise.toFixed(1)}%
                          </span>
                        </div>
                        <div className="result-item">
                          <span className="result-label">Revenue (B)</span>
                          <div className="result-values">
                            <span className="actual-value">${result.results.revenue.actual}B</span>
                            <span className="vs">vs</span>
                            <span className="estimate-value">${result.results.revenue.estimate}B</span>
                          </div>
                          <span 
                            className="surprise-value"
                            style={{ color: getSurpriseColor(result.results.revenue.surprise) }}
                          >
                            {result.results.revenue.surprise >= 0 ? '+' : ''}{result.results.revenue.surprise.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="reaction-section">
                      <h5 className="reaction-title">Market Reaction</h5>
                      <div className="reaction-values">
                        <div className="reaction-item">
                          <span className="reaction-label">Pre-Market:</span>
                          <span 
                            className="reaction-value"
                            style={{ color: getReactionColor(result.reaction.preMarket) }}
                          >
                            {result.reaction.preMarket >= 0 ? '+' : ''}{result.reaction.preMarket}%
                          </span>
                        </div>
                        <div className="reaction-item">
                          <span className="reaction-label">After Hours:</span>
                          <span 
                            className="reaction-value"
                            style={{ color: getReactionColor(result.reaction.afterHours) }}
                          >
                            {result.reaction.afterHours >= 0 ? '+' : ''}{result.reaction.afterHours}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="highlights-section">
                      <h5 className="highlights-title">Key Highlights</h5>
                      <ul className="highlights-list">
                        {result.keyHighlights.map((highlight, idx) => (
                          <li key={idx} className="highlight-item">{highlight}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="updates-section">
                      <div className="guidance-update">
                        <span className="update-label">Guidance:</span>
                        <span className={`update-value ${result.guidance.toLowerCase()}`}>
                          {result.guidance}
                        </span>
                      </div>
                      <div className="analyst-updates">
                        <span className="update-label">Analyst Updates:</span>
                        <span className="update-count">{result.analystUpdates}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <section className="earnings-calendar">
            <div className="container">
              <h2 className="section-title">This Week's Earnings Calendar</h2>
              <div className="calendar-grid">
                {Object.entries(earningsCalendar).map(([day, earnings]) => (
                  <div key={day} className="calendar-day">
                    <h3 className="day-title">{day}</h3>
                    <div className="day-earnings">
                      {earnings.map((earning, idx) => (
                        <div key={idx} className="calendar-earning">
                          <div className="calendar-symbol">{earning.symbol}</div>
                          <div className="calendar-time">{earning.time}</div>
                          <div 
                            className="calendar-importance"
                            style={{ color: getImportanceColor(earning.importance) }}
                          >
                            {earning.importance}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />

      <style jsx>{`
        .earnings-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .earnings-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .earnings-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
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
          background: linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6);
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

        .earnings-controls {
          padding: 40px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .controls-container {
          display: flex;
          gap: 24px;
          align-items: end;
          flex-wrap: wrap;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .control-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .control-btn {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .control-btn:hover,
        .control-btn.active {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.4);
        }

        .sector-select {
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          min-width: 150px;
        }

        .upcoming-earnings, .recent-earnings {
          padding: 60px 0;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 32px;
          color: #3b82f6;
        }

        .earnings-grid, .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .earning-card, .result-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .earning-header, .result-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .symbol {
          font-size: 1.5rem;
          font-weight: 700;
          color: #3b82f6;
        }

        .company-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 4px;
        }

        .earning-meta {
          text-align: right;
        }

        .market-cap {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .sector {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          text-transform: capitalize;
        }

        .earning-schedule {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .schedule-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .schedule-label {
          color: rgba(255, 255, 255, 0.7);
        }

        .estimates-section, .results-section {
          margin-bottom: 20px;
        }

        .estimates-title, .results-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #3b82f6;
        }

        .estimates-grid, .results-grid-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .estimate-item, .result-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
        }

        .estimate-label, .result-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .estimate-value {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .estimate-growth {
          font-size: 0.8rem;
          color: #10b981;
        }

        .result-values {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 4px 0;
        }

        .actual-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #3b82f6;
        }

        .vs {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .estimate-value {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .surprise-value {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .analyst-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .rating-value.buy {
          color: #10b981;
        }

        .rating-value.hold {
          color: #f59e0b;
        }

        .consensus-section {
          margin-bottom: 20px;
        }

        .consensus-title {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #3b82f6;
        }

        .consensus-bars {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .consensus-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
        }

        .consensus-label {
          width: 40px;
          color: rgba(255, 255, 255, 0.7);
        }

        .consensus-progress {
          flex: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .consensus-fill {
          height: 100%;
          transition: width 0.3s ease;
        }

        .consensus-fill.buy {
          background: #10b981;
        }

        .consensus-fill.hold {
          background: #f59e0b;
        }

        .consensus-fill.sell {
          background: #ef4444;
        }

        .consensus-count {
          width: 20px;
          text-align: right;
          font-weight: 500;
        }

        .key-metrics {
          margin-bottom: 20px;
        }

        .metrics-title {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #3b82f6;
        }

        .metrics-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .metric-tag {
          padding: 4px 8px;
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          border-radius: 4px;
          font-size: 0.8rem;
        }

        .reaction-section {
          margin-bottom: 20px;
        }

        .reaction-title {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #3b82f6;
        }

        .reaction-values {
          display: flex;
          gap: 20px;
        }

        .reaction-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .reaction-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .reaction-value {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .highlights-section {
          margin-bottom: 20px;
        }

        .highlights-title {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #3b82f6;
        }

        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .highlight-item {
          padding: 6px 0;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          position: relative;
          padding-left: 16px;
        }

        .highlight-item::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #3b82f6;
        }

        .updates-section {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .update-value.raised {
          color: #10b981;
        }

        .update-value.lowered {
          color: #ef4444;
        }

        .earnings-calendar {
          padding: 60px 0;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }

        .calendar-day {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          backdrop-filter: blur(10px);
        }

        .day-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: #3b82f6;
          text-align: center;
        }

        .day-earnings {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .calendar-earning {
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .calendar-symbol {
          font-size: 1rem;
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 4px;
        }

        .calendar-time {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4px;
        }

        .calendar-importance {
          font-size: 0.8rem;
          font-weight: 500;
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

          .controls-container {
            flex-direction: column;
            gap: 16px;
          }

          .earnings-grid, .results-grid {
            grid-template-columns: 1fr;
          }

          .estimates-grid, .results-grid-inner {
            grid-template-columns: 1fr;
          }

          .analyst-section {
            flex-direction: column;
            gap: 8px;
          }

          .reaction-values {
            flex-direction: column;
            gap: 8px;
          }

          .updates-section {
            flex-direction: column;
            gap: 8px;
          }

          .calendar-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

export default EarningsReportsPage 