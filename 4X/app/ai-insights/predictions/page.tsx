'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

const PricePredictions = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [selectedAsset, setSelectedAsset] = useState('all')
  const [sortBy, setSortBy] = useState('confidence')

  const timeframes = ['1H', '4H', '1D', '1W', '1M']
  const assetTypes = ['all', 'stocks', 'crypto', 'forex', 'commodities']

  const predictions = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 182.45,
      predictedPrice: 195.20,
      confidence: 94,
      direction: 'bullish',
      timeframe: '5 days',
      change: 6.99,
      changePercent: 3.83,
      volume: '45.2M',
      aiScore: 'A+',
      factors: ['Strong earnings', 'Product launch', 'Market sentiment'],
      lastUpdated: '2 min ago'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      currentPrice: 245.80,
      predictedPrice: 228.50,
      confidence: 87,
      direction: 'bearish',
      timeframe: '3 days',
      change: -17.30,
      changePercent: -7.04,
      volume: '89.1M',
      aiScore: 'A',
      factors: ['Production concerns', 'Competition', 'Regulatory issues'],
      lastUpdated: '5 min ago'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      currentPrice: 445.20,
      predictedPrice: 485.75,
      confidence: 92,
      direction: 'bullish',
      timeframe: '7 days',
      change: 40.55,
      changePercent: 9.11,
      volume: '52.8M',
      aiScore: 'A+',
      factors: ['AI demand', 'Data center growth', 'Strong guidance'],
      lastUpdated: '1 min ago'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      currentPrice: 342.15,
      predictedPrice: 338.90,
      confidence: 78,
      direction: 'neutral',
      timeframe: '10 days',
      change: -3.25,
      changePercent: -0.95,
      volume: '28.4M',
      aiScore: 'B+',
      factors: ['Cloud growth', 'Mixed signals', 'Market uncertainty'],
      lastUpdated: '3 min ago'
    },
    {
      symbol: 'BTC-USD',
      name: 'Bitcoin',
      currentPrice: 43250.00,
      predictedPrice: 47800.00,
      confidence: 89,
      direction: 'bullish',
      timeframe: '14 days',
      change: 4550.00,
      changePercent: 10.52,
      volume: '2.1B',
      aiScore: 'A',
      factors: ['Institutional adoption', 'ETF approval', 'Technical breakout'],
      lastUpdated: '1 min ago'
    },
    {
      symbol: 'ETH-USD',
      name: 'Ethereum',
      currentPrice: 2580.50,
      predictedPrice: 2420.00,
      confidence: 83,
      direction: 'bearish',
      timeframe: '5 days',
      change: -160.50,
      changePercent: -6.22,
      volume: '1.8B',
      aiScore: 'B+',
      factors: ['Network congestion', 'Competition', 'Regulatory concerns'],
      lastUpdated: '4 min ago'
    }
  ]

  const filteredPredictions = predictions.filter(pred => {
    if (selectedAsset === 'all') return true
    if (selectedAsset === 'stocks') return !pred.symbol.includes('-USD')
    if (selectedAsset === 'crypto') return pred.symbol.includes('-USD')
    return false
  })

  const sortedPredictions = [...filteredPredictions].sort((a, b) => {
    switch (sortBy) {
      case 'confidence':
        return b.confidence - a.confidence
      case 'change':
        return Math.abs(b.changePercent) - Math.abs(a.changePercent)
      case 'symbol':
        return a.symbol.localeCompare(b.symbol)
      default:
        return 0
    }
  })

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case 'bullish': return '#10b981'
      case 'bearish': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getAIScoreColor = (score: string) => {
    if (score.includes('A')) return '#10b981'
    if (score.includes('B')) return '#f59e0b'
    return '#6b7280'
  }

  return (
    <>
      <Navigation />
      <div className="predictions-page">
        {/* Hero Section */}
        <section className="predictions-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">🔮</span>
                <span>AI Price Predictions</span>
              </div>
              <h1 className="hero-title">
                Advanced Price Forecasting
                <span className="gradient-text">94.7% Accuracy Rate</span>
              </h1>
              <p className="hero-description">
                Our neural network models analyze millions of data points to predict 
                price movements with unprecedented accuracy across all major asset classes.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">1.2M+</span>
                  <span className="stat-label">Predictions Made</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">94.7%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Real-time Updates</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
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
                <label className="filter-label">Asset Type</label>
                <select 
                  className="filter-select"
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                >
                  <option value="all">All Assets</option>
                  <option value="stocks">Stocks</option>
                  <option value="crypto">Cryptocurrency</option>
                  <option value="forex">Forex</option>
                  <option value="commodities">Commodities</option>
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
                  <option value="change">Price Change</option>
                  <option value="symbol">Symbol</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Predictions Grid */}
        <section className="predictions-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">AI Predictions</h2>
              <p className="section-description">
                Real-time price forecasts powered by machine learning
              </p>
            </div>

            <div className="predictions-grid">
              {sortedPredictions.map((prediction, index) => (
                <div key={index} className="prediction-card">
                  <div className="card-header">
                    <div className="asset-info">
                      <div className="symbol-container">
                        <span className="symbol">{prediction.symbol}</span>
                        <span className={`ai-score ${prediction.aiScore.replace('+', '')}`}>
                          {prediction.aiScore}
                        </span>
                      </div>
                      <span className="asset-name">{prediction.name}</span>
                    </div>
                    <div className="last-updated">
                      {prediction.lastUpdated}
                    </div>
                  </div>

                  <div className="price-section">
                    <div className="current-price">
                      <span className="price-label">Current</span>
                      <span className="price-value">
                        ${prediction.currentPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="predicted-price">
                      <span className="price-label">Predicted</span>
                      <span className="price-value predicted">
                        ${prediction.predictedPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="change-section">
                    <div className={`price-change ${prediction.direction}`}>
                      <span className="change-arrow">
                        {prediction.direction === 'bullish' ? '↗' : 
                         prediction.direction === 'bearish' ? '↘' : '→'}
                      </span>
                      <span className="change-value">
                        {prediction.change > 0 ? '+' : ''}
                        ${Math.abs(prediction.change).toFixed(2)}
                      </span>
                      <span className="change-percent">
                        ({prediction.changePercent > 0 ? '+' : ''}
                        {prediction.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>

                  <div className="confidence-section">
                    <div className="confidence-header">
                      <span className="confidence-label">Confidence</span>
                      <span className="confidence-value">{prediction.confidence}%</span>
                    </div>
                    <div className="confidence-bar">
                      <div 
                        className="confidence-fill"
                        style={{ 
                          width: `${prediction.confidence}%`,
                          backgroundColor: getDirectionColor(prediction.direction)
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="details-section">
                    <div className="detail-item">
                      <span className="detail-label">Timeframe</span>
                      <span className="detail-value">{prediction.timeframe}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Volume</span>
                      <span className="detail-value">{prediction.volume}</span>
                    </div>
                  </div>

                  <div className="factors-section">
                    <span className="factors-label">Key Factors</span>
                    <div className="factors-list">
                      {prediction.factors.map((factor, idx) => (
                        <span key={idx} className="factor-tag">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="card-actions">
                    <button className="action-btn primary">
                      View Details
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

        {/* How It Works */}
        <section className="how-it-works-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">How Our AI Predictions Work</h2>
              <p className="section-description">
                Understanding the technology behind our forecasting models
              </p>
            </div>
            
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">01</div>
                <div className="step-icon">📊</div>
                <h3 className="step-title">Data Collection</h3>
                <p className="step-description">
                  We analyze millions of data points including price history, 
                  volume, news sentiment, and market indicators.
                </p>
              </div>
              
              <div className="step-card">
                <div className="step-number">02</div>
                <div className="step-icon">🧠</div>
                <h3 className="step-title">Neural Processing</h3>
                <p className="step-description">
                  Advanced neural networks process patterns and correlations 
                  that human analysts might miss.
                </p>
              </div>
              
              <div className="step-card">
                <div className="step-number">03</div>
                <div className="step-icon">🔮</div>
                <h3 className="step-title">Prediction Generation</h3>
                <p className="step-description">
                  AI models generate price forecasts with confidence scores 
                  and key supporting factors.
                </p>
              </div>
              
              <div className="step-card">
                <div className="step-number">04</div>
                <div className="step-icon">📈</div>
                <h3 className="step-title">Continuous Learning</h3>
                <p className="step-description">
                  Models continuously learn from new data and outcomes 
                  to improve accuracy over time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .predictions-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .predictions-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .predictions-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
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
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
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
          background: linear-gradient(135deg, #8b5cf6, #06b6d4, #10b981);
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
          color: #8b5cf6;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .filters-section {
          padding: 40px 0;
          background: rgba(0, 0, 0, 0.2);
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
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.4);
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

        .predictions-section {
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

        .predictions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .prediction-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .prediction-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          border-color: rgba(139, 92, 246, 0.3);
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

        .symbol-container {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .symbol {
          font-size: 1.2rem;
          font-weight: 700;
          color: #8b5cf6;
        }

        .ai-score {
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .ai-score.A {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .ai-score.B {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .asset-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .last-updated {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .price-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .current-price,
        .predicted-price {
          text-align: center;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .price-label {
          display: block;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4px;
        }

        .price-value {
          display: block;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .price-value.predicted {
          color: #8b5cf6;
        }

        .change-section {
          text-align: center;
          margin-bottom: 20px;
        }

        .price-change {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          font-weight: 600;
        }

        .price-change.bullish {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .price-change.bearish {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .price-change.neutral {
          background: rgba(156, 163, 175, 0.1);
          color: #9ca3af;
        }

        .change-arrow {
          font-size: 1.2rem;
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
          color: #8b5cf6;
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

        .details-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .detail-value {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .factors-section {
          margin-bottom: 20px;
        }

        .factors-label {
          display: block;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
        }

        .factors-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .factor-tag {
          padding: 4px 8px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 12px;
          font-size: 0.7rem;
          color: #8b5cf6;
        }

        .card-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          flex: 1;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          border: none;
          color: white;
        }

        .action-btn.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }

        .action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .how-it-works-section {
          padding: 80px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 32px;
        }

        .step-card {
          text-align: center;
          position: relative;
        }

        .step-number {
          position: absolute;
          top: -10px;
          right: 20px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .step-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .step-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .step-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
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

          .predictions-grid {
            grid-template-columns: 1fr;
          }

          .steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

export default PricePredictions 