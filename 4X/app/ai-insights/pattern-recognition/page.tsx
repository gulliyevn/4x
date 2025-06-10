'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

const PatternRecognition = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [selectedPattern, setSelectedPattern] = useState('all')
  const [sortBy, setSortBy] = useState('confidence')

  const timeframes = ['1H', '4H', '1D', '1W', '1M']
  const patternTypes = ['all', 'bullish', 'bearish', 'neutral', 'reversal', 'continuation']

  const detectedPatterns = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      pattern: 'Bull Flag',
      type: 'bullish',
      confidence: 94,
      timeframe: '1D',
      target: 195.20,
      currentPrice: 182.45,
      potentialGain: 6.99,
      potentialGainPercent: 3.83,
      riskReward: '1:3.2',
      stopLoss: 178.90,
      formation: 'Complete',
      volume: 'Confirming',
      lastDetected: '15 min ago',
      description: 'Strong bullish continuation pattern with high volume confirmation'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      pattern: 'Head & Shoulders',
      type: 'bearish',
      confidence: 89,
      timeframe: '4H',
      target: 228.50,
      currentPrice: 245.80,
      potentialGain: -17.30,
      potentialGainPercent: -7.04,
      riskReward: '1:2.8',
      stopLoss: 252.10,
      formation: 'Forming',
      volume: 'Declining',
      lastDetected: '8 min ago',
      description: 'Classic reversal pattern indicating potential downward movement'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      pattern: 'Ascending Triangle',
      type: 'bullish',
      confidence: 92,
      timeframe: '1D',
      target: 485.75,
      currentPrice: 445.20,
      potentialGain: 40.55,
      potentialGainPercent: 9.11,
      riskReward: '1:4.1',
      stopLoss: 435.80,
      formation: 'Complete',
      volume: 'Increasing',
      lastDetected: '5 min ago',
      description: 'Bullish breakout pattern with strong volume support'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      pattern: 'Symmetrical Triangle',
      type: 'neutral',
      confidence: 76,
      timeframe: '1W',
      target: 355.40,
      currentPrice: 342.15,
      potentialGain: 13.25,
      potentialGainPercent: 3.87,
      riskReward: '1:2.1',
      stopLoss: 335.90,
      formation: 'Developing',
      volume: 'Average',
      lastDetected: '22 min ago',
      description: 'Neutral pattern awaiting directional breakout'
    },
    {
      symbol: 'BTC-USD',
      name: 'Bitcoin',
      pattern: 'Cup & Handle',
      type: 'bullish',
      confidence: 87,
      timeframe: '1D',
      target: 48500.00,
      currentPrice: 43250.00,
      potentialGain: 5250.00,
      potentialGainPercent: 12.14,
      riskReward: '1:3.8',
      stopLoss: 41800.00,
      formation: 'Handle Forming',
      volume: 'Strong',
      lastDetected: '12 min ago',
      description: 'Long-term bullish pattern with excellent risk-reward ratio'
    },
    {
      symbol: 'ETH-USD',
      name: 'Ethereum',
      pattern: 'Double Top',
      type: 'bearish',
      confidence: 83,
      timeframe: '4H',
      target: 2420.00,
      currentPrice: 2580.50,
      potentialGain: -160.50,
      potentialGainPercent: -6.22,
      riskReward: '1:2.5',
      stopLoss: 2640.00,
      formation: 'Complete',
      volume: 'Confirming',
      lastDetected: '18 min ago',
      description: 'Bearish reversal pattern with volume confirmation'
    }
  ]

  const patternStats = {
    totalDetected: 156,
    bullishPatterns: 89,
    bearishPatterns: 45,
    neutralPatterns: 22,
    avgConfidence: 85.2,
    successRate: 78.9
  }

  const patternLibrary = [
    {
      name: 'Bull Flag',
      type: 'Bullish Continuation',
      description: 'A brief consolidation after a strong upward move',
      successRate: 82,
      avgDuration: '3-5 days',
      icon: '🚩'
    },
    {
      name: 'Head & Shoulders',
      type: 'Bearish Reversal',
      description: 'Three peaks with the middle peak being the highest',
      successRate: 79,
      avgDuration: '2-4 weeks',
      icon: '👤'
    },
    {
      name: 'Ascending Triangle',
      type: 'Bullish Continuation',
      description: 'Higher lows with resistance at same level',
      successRate: 75,
      avgDuration: '1-3 weeks',
      icon: '📈'
    },
    {
      name: 'Double Top',
      type: 'Bearish Reversal',
      description: 'Two peaks at approximately the same level',
      successRate: 73,
      avgDuration: '2-6 weeks',
      icon: '⛰️'
    },
    {
      name: 'Cup & Handle',
      type: 'Bullish Continuation',
      description: 'U-shaped pattern followed by small consolidation',
      successRate: 85,
      avgDuration: '1-6 months',
      icon: '☕'
    },
    {
      name: 'Wedge',
      type: 'Reversal',
      description: 'Converging trend lines with declining volume',
      successRate: 71,
      avgDuration: '2-8 weeks',
      icon: '📐'
    }
  ]

  const filteredPatterns = detectedPatterns.filter(pattern => {
    if (selectedPattern === 'all') return true
    return pattern.type === selectedPattern
  })

  const sortedPatterns = [...filteredPatterns].sort((a, b) => {
    switch (sortBy) {
      case 'confidence':
        return b.confidence - a.confidence
      case 'potential':
        return Math.abs(b.potentialGainPercent) - Math.abs(a.potentialGainPercent)
      case 'symbol':
        return a.symbol.localeCompare(b.symbol)
      default:
        return 0
    }
  })

  const getPatternColor = (type: string) => {
    switch (type) {
      case 'bullish': return '#10b981'
      case 'bearish': return '#ef4444'
      case 'neutral': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const getFormationStatus = (formation: string) => {
    const statuses = {
      'Complete': '#10b981',
      'Forming': '#f59e0b',
      'Developing': '#06b6d4',
      'Handle Forming': '#8b5cf6'
    }
    return statuses[formation as keyof typeof statuses] || '#6b7280'
  }

  return (
    <>
      <Navigation />
      <div className="pattern-page">
        {/* Hero Section */}
        <section className="pattern-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">🎯</span>
                <span>AI Pattern Recognition</span>
              </div>
              <h1 className="hero-title">
                Advanced Chart Patterns
                <span className="gradient-text">50+ Pattern Detection</span>
              </h1>
              <p className="hero-description">
                Our AI engine automatically detects and analyzes chart patterns across 
                all timeframes, providing you with actionable trading opportunities.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">{patternStats.totalDetected}</span>
                  <span className="stat-label">Patterns Detected</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{patternStats.avgConfidence}%</span>
                  <span className="stat-label">Avg Confidence</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{patternStats.successRate}%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pattern Stats */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card bullish">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <span className="stat-number">{patternStats.bullishPatterns}</span>
                  <span className="stat-label">Bullish Patterns</span>
                </div>
              </div>
              <div className="stat-card bearish">
                <div className="stat-icon">📉</div>
                <div className="stat-content">
                  <span className="stat-number">{patternStats.bearishPatterns}</span>
                  <span className="stat-label">Bearish Patterns</span>
                </div>
              </div>
              <div className="stat-card neutral">
                <div className="stat-icon">➡️</div>
                <div className="stat-content">
                  <span className="stat-number">{patternStats.neutralPatterns}</span>
                  <span className="stat-label">Neutral Patterns</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="filters-section">
          <div className="container">
            <div className="filters-container">
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
                <label className="filter-label">Pattern Type</label>
                <select 
                  className="filter-select"
                  value={selectedPattern}
                  onChange={(e) => setSelectedPattern(e.target.value)}
                >
                  <option value="all">All Patterns</option>
                  <option value="bullish">Bullish</option>
                  <option value="bearish">Bearish</option>
                  <option value="neutral">Neutral</option>
                  <option value="reversal">Reversal</option>
                  <option value="continuation">Continuation</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select 
                  className="filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="confidence">Confidence</option>
                  <option value="potential">Potential Gain</option>
                  <option value="symbol">Symbol</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Detected Patterns */}
        <section className="patterns-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Detected Patterns</h2>
              <p className="section-description">
                Real-time pattern detection across all monitored assets
              </p>
            </div>

            <div className="patterns-grid">
              {sortedPatterns.map((pattern, index) => (
                <div key={index} className="pattern-card">
                  <div className="card-header">
                    <div className="asset-info">
                      <span className="symbol">{pattern.symbol}</span>
                      <span className="asset-name">{pattern.name}</span>
                    </div>
                    <div className="last-detected">{pattern.lastDetected}</div>
                  </div>

                  <div className="pattern-info">
                    <div className="pattern-name-section">
                      <h3 className="pattern-name">{pattern.pattern}</h3>
                      <span 
                        className={`pattern-type ${pattern.type}`}
                        style={{ color: getPatternColor(pattern.type) }}
                      >
                        {pattern.type.charAt(0).toUpperCase() + pattern.type.slice(1)}
                      </span>
                    </div>
                    <p className="pattern-description">{pattern.description}</p>
                  </div>

                  <div className="confidence-section">
                    <div className="confidence-header">
                      <span className="confidence-label">Confidence</span>
                      <span className="confidence-value">{pattern.confidence}%</span>
                    </div>
                    <div className="confidence-bar">
                      <div 
                        className="confidence-fill"
                        style={{ 
                          width: `${pattern.confidence}%`,
                          backgroundColor: getPatternColor(pattern.type)
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="price-targets">
                    <div className="price-row">
                      <div className="price-item">
                        <span className="price-label">Current</span>
                        <span className="price-value">
                          ${pattern.currentPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="price-item">
                        <span className="price-label">Target</span>
                        <span className="price-value target">
                          ${pattern.target.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="price-row">
                      <div className="price-item">
                        <span className="price-label">Stop Loss</span>
                        <span className="price-value stop-loss">
                          ${pattern.stopLoss.toLocaleString()}
                        </span>
                      </div>
                      <div className="price-item">
                        <span className="price-label">Risk/Reward</span>
                        <span className="price-value risk-reward">
                          {pattern.riskReward}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="potential-section">
                    <div className={`potential-gain ${pattern.type}`}>
                      <span className="gain-label">Potential</span>
                      <div className="gain-values">
                        <span className="gain-amount">
                          {pattern.potentialGain > 0 ? '+' : ''}
                          ${Math.abs(pattern.potentialGain).toFixed(2)}
                        </span>
                        <span className="gain-percent">
                          ({pattern.potentialGainPercent > 0 ? '+' : ''}
                          {pattern.potentialGainPercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pattern-status">
                    <div className="status-item">
                      <span className="status-label">Formation</span>
                      <span 
                        className="status-value"
                        style={{ color: getFormationStatus(pattern.formation) }}
                      >
                        {pattern.formation}
                      </span>
                    </div>
                    <div className="status-item">
                      <span className="status-label">Volume</span>
                      <span className="status-value">{pattern.volume}</span>
                    </div>
                    <div className="status-item">
                      <span className="status-label">Timeframe</span>
                      <span className="status-value">{pattern.timeframe}</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button className="action-btn primary">
                      View Chart
                    </button>
                    <button className="action-btn secondary">
                      Set Alert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pattern Library */}
        <section className="library-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Pattern Library</h2>
              <p className="section-description">
                Learn about the patterns our AI can detect
              </p>
            </div>

            <div className="library-grid">
              {patternLibrary.map((pattern, index) => (
                <div key={index} className="library-card">
                  <div className="library-header">
                    <div className="pattern-icon">{pattern.icon}</div>
                    <div className="success-rate">
                      <span className="rate-value">{pattern.successRate}%</span>
                      <span className="rate-label">Success</span>
                    </div>
                  </div>
                  
                  <div className="library-content">
                    <h3 className="library-pattern-name">{pattern.name}</h3>
                    <span className="library-pattern-type">{pattern.type}</span>
                    <p className="library-description">{pattern.description}</p>
                  </div>
                  
                  <div className="library-stats">
                    <div className="library-stat">
                      <span className="stat-label">Avg Duration</span>
                      <span className="stat-value">{pattern.avgDuration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .pattern-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .pattern-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .pattern-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 60% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
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
          background: linear-gradient(135deg, #10b981, #06b6d4, #8b5cf6);
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

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin-top: 40px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #10b981;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .stats-section {
          padding: 40px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }

        .stat-card.bullish {
          border-color: rgba(16, 185, 129, 0.3);
        }

        .stat-card.bearish {
          border-color: rgba(239, 68, 68, 0.3);
        }

        .stat-card.neutral {
          border-color: rgba(245, 158, 11, 0.3);
        }

        .stat-icon {
          font-size: 2rem;
          margin-bottom: 12px;
        }

        .stat-content .stat-number {
          font-size: 2rem;
          margin-bottom: 4px;
        }

        .stat-card.bullish .stat-number {
          color: #10b981;
        }

        .stat-card.bearish .stat-number {
          color: #ef4444;
        }

        .stat-card.neutral .stat-number {
          color: #f59e0b;
        }

        .filters-section {
          padding: 40px 0;
        }

        .filters-container {
          display: flex;
          gap: 40px;
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
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.4);
        }

        .filter-select {
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          min-width: 150px;
        }

        .filter-select option {
          background: #1a1a2e;
          color: white;
        }

        .patterns-section {
          padding: 80px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .section-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .patterns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .pattern-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .pattern-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .asset-info {
          flex: 1;
        }

        .symbol {
          display: block;
          font-size: 1.2rem;
          font-weight: 700;
          color: #10b981;
          margin-bottom: 4px;
        }

        .asset-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .last-detected {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .pattern-info {
          margin-bottom: 20px;
        }

        .pattern-name-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .pattern-name {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0;
        }

        .pattern-type {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
        }

        .pattern-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
        }

        .confidence-section {
          margin-bottom: 20px;
        }

        .confidence-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .confidence-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .confidence-value {
          font-weight: 600;
          color: #10b981;
        }

        .confidence-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .confidence-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .price-targets {
          margin-bottom: 20px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .price-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 12px;
        }

        .price-row:last-child {
          margin-bottom: 0;
        }

        .price-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .price-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .price-value {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .price-value.target {
          color: #10b981;
        }

        .price-value.stop-loss {
          color: #ef4444;
        }

        .price-value.risk-reward {
          color: #06b6d4;
        }

        .potential-section {
          margin-bottom: 20px;
        }

        .potential-gain {
          padding: 12px;
          border-radius: 8px;
          text-align: center;
        }

        .potential-gain.bullish {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .potential-gain.bearish {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .potential-gain.neutral {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .gain-label {
          display: block;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4px;
        }

        .gain-values {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .gain-amount {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .gain-percent {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .potential-gain.bullish .gain-amount,
        .potential-gain.bullish .gain-percent {
          color: #10b981;
        }

        .potential-gain.bearish .gain-amount,
        .potential-gain.bearish .gain-percent {
          color: #ef4444;
        }

        .potential-gain.neutral .gain-amount,
        .potential-gain.neutral .gain-percent {
          color: #f59e0b;
        }

        .pattern-status {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .status-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: center;
        }

        .status-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .status-value {
          font-size: 0.9rem;
          font-weight: 500;
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
          background: linear-gradient(135deg, #10b981, #06b6d4);
          border: none;
          color: white;
        }

        .action-btn.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }

        .action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .library-section {
          padding: 80px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .library-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .library-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .library-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
        }

        .library-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .pattern-icon {
          font-size: 2.5rem;
        }

        .success-rate {
          text-align: right;
        }

        .rate-value {
          display: block;
          font-size: 1.2rem;
          font-weight: 600;
          color: #10b981;
        }

        .rate-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .library-content {
          margin-bottom: 16px;
        }

        .library-pattern-name {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .library-pattern-type {
          font-size: 0.9rem;
          color: #06b6d4;
          font-weight: 500;
          margin-bottom: 8px;
          display: block;
        }

        .library-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
        }

        .library-stats {
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .library-stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .library-stat .stat-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .library-stat .stat-value {
          font-size: 0.9rem;
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

          .hero-stats {
            flex-direction: column;
            gap: 24px;
          }

          .filters-container {
            flex-direction: column;
            gap: 20px;
          }

          .patterns-grid {
            grid-template-columns: 1fr;
          }

          .library-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

export default PatternRecognition 