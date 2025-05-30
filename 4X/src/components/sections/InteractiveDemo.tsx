'use client'

import React, { useState, useEffect } from 'react'

interface DemoData {
  timestamp: string
  price: number
  prediction: number
  confidence: number
  volume: number
}

const InteractiveDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('predictions')
  const [selectedAsset, setSelectedAsset] = useState('EURUSD')
  const [demoData, setDemoData] = useState<DemoData[]>([])
  const [isLive, setIsLive] = useState(true)

  // Simulate real-time data
  useEffect(() => {
    const generateData = () => {
      const now = new Date()
      const basePrice = selectedAsset === 'EURUSD' ? 1.0876 : 
                       selectedAsset === 'BTCUSD' ? 43567 :
                       selectedAsset === 'AAPL' ? 185.43 : 4567.89

      return Array.from({ length: 20 }, (_, i) => {
        const timestamp = new Date(now.getTime() - (19 - i) * 60000).toLocaleTimeString()
        const variation = (Math.random() - 0.5) * 0.02
        const price = basePrice * (1 + variation * (i + 1) / 20)
        const prediction = price * (1 + (Math.random() - 0.3) * 0.01)
        
        return {
          timestamp,
          price,
          prediction,
          confidence: 85 + Math.random() * 10,
          volume: Math.floor(Math.random() * 1000000)
        }
      })
    }

    setDemoData(generateData())

    if (isLive) {
      const interval = setInterval(() => {
        setDemoData(prev => {
          const newData = [...prev.slice(1)]
          const lastPrice = prev[prev.length - 1]?.price || 0
          const variation = (Math.random() - 0.5) * 0.005
          const newPrice = lastPrice * (1 + variation)
          
          newData.push({
            timestamp: new Date().toLocaleTimeString(),
            price: newPrice,
            prediction: newPrice * (1 + (Math.random() - 0.3) * 0.01),
            confidence: 85 + Math.random() * 10,
            volume: Math.floor(Math.random() * 1000000)
          })
          
          return newData
        })
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [selectedAsset, isLive])

  const assets = [
    { symbol: 'EURUSD', name: 'Euro / US Dollar', icon: '💱' },
    { symbol: 'BTCUSD', name: 'Bitcoin / US Dollar', icon: '₿' },
    { symbol: 'AAPL', name: 'Apple Inc.', icon: '🍎' },
    { symbol: 'SPX', name: 'S&P 500 Index', icon: '📈' }
  ]

  const tabs = [
    { id: 'predictions', label: 'AI Predictions', icon: '🔮' },
    { id: 'analysis', label: 'Market Analysis', icon: '📊' },
    { id: 'signals', label: 'Trading Signals', icon: '⚡' },
    { id: 'portfolio', label: 'Portfolio Optimizer', icon: '💼' }
  ]

  const formatPrice = (price: number) => {
    if (selectedAsset === 'EURUSD') return price.toFixed(4)
    if (selectedAsset === 'BTCUSD') return `$${price.toFixed(0)}`
    return `$${price.toFixed(2)}`
  }

  const currentData = demoData[demoData.length - 1]
  const priceChange = demoData.length > 1 ? 
    ((currentData?.price || 0) - (demoData[demoData.length - 2]?.price || 0)) : 0

  return (
    <section className="interactive-demo-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-icon">🚀</span>
            Experience AI Trading Live
          </h2>
          <p className="section-subtitle">
            Watch our AI algorithms analyze real market data and generate predictions in real-time. 
            This interactive demo shows the power of our platform.
          </p>
        </div>

        <div className="demo-container">
          {/* Asset Selector */}
          <div className="asset-selector">
            <div className="selector-header">
              <h3 className="selector-title">Select Asset</h3>
              <div className="live-status">
                <button 
                  className={`live-toggle ${isLive ? 'active' : ''}`}
                  onClick={() => setIsLive(!isLive)}
                >
                  <span className="live-dot"></span>
                  {isLive ? 'LIVE' : 'PAUSED'}
                </button>
              </div>
            </div>
            <div className="asset-grid">
              {assets.map(asset => (
                <button
                  key={asset.symbol}
                  className={`asset-card ${selectedAsset === asset.symbol ? 'active' : ''}`}
                  onClick={() => setSelectedAsset(asset.symbol)}
                >
                  <span className="asset-icon">{asset.icon}</span>
                  <div className="asset-info">
                    <span className="asset-symbol">{asset.symbol}</span>
                    <span className="asset-name">{asset.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Demo Tabs */}
          <div className="demo-tabs">
            <div className="tabs-header">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === 'predictions' && (
                <div className="predictions-demo">
                  <div className="demo-header">
                    <div className="current-price">
                      <span className="price-label">Current Price</span>
                      <span className="price-value">{formatPrice(currentData?.price || 0)}</span>
                      <span className={`price-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
                        {priceChange >= 0 ? '+' : ''}{formatPrice(Math.abs(priceChange))}
                      </span>
                    </div>
                    <div className="ai-confidence">
                      <span className="confidence-label">AI Confidence</span>
                      <div className="confidence-bar">
                        <div 
                          className="confidence-fill"
                          style={{ width: `${currentData?.confidence || 0}%` }}
                        ></div>
                      </div>
                      <span className="confidence-value">{(currentData?.confidence || 0).toFixed(1)}%</span>
                    </div>
                  </div>

                  <div className="chart-container">
                    <div className="chart-header">
                      <h4 className="chart-title">Price vs AI Prediction</h4>
                      <div className="chart-legend">
                        <div className="legend-item">
                          <span className="legend-color actual"></span>
                          <span className="legend-label">Actual Price</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-color prediction"></span>
                          <span className="legend-label">AI Prediction</span>
                        </div>
                      </div>
                    </div>
                    <div className="mini-chart">
                      {demoData.map((point, index) => (
                        <div key={index} className="chart-point">
                          <div 
                            className="price-bar actual"
                            style={{ 
                              height: `${Math.max(20, (point.price / Math.max(...demoData.map(d => d.price))) * 100)}%` 
                            }}
                          ></div>
                          <div 
                            className="price-bar prediction"
                            style={{ 
                              height: `${Math.max(20, (point.prediction / Math.max(...demoData.map(d => d.prediction))) * 100)}%` 
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="prediction-details">
                    <div className="detail-card">
                      <span className="detail-icon">🎯</span>
                      <div className="detail-content">
                        <span className="detail-label">Next 5min Prediction</span>
                        <span className="detail-value">{formatPrice(currentData?.prediction || 0)}</span>
                      </div>
                    </div>
                    <div className="detail-card">
                      <span className="detail-icon">📊</span>
                      <div className="detail-content">
                        <span className="detail-label">Volume</span>
                        <span className="detail-value">{(currentData?.volume || 0).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="detail-card">
                      <span className="detail-icon">⚡</span>
                      <div className="detail-content">
                        <span className="detail-label">Signal Strength</span>
                        <span className="detail-value">Strong Buy</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analysis' && (
                <div className="analysis-demo">
                  <div className="analysis-grid">
                    <div className="analysis-card">
                      <h4 className="analysis-title">
                        <span className="analysis-icon">📈</span>
                        Technical Analysis
                      </h4>
                      <div className="analysis-indicators">
                        <div className="indicator-item">
                          <span className="indicator-name">RSI (14)</span>
                          <span className="indicator-value bullish">67.3</span>
                          <span className="indicator-signal">Bullish</span>
                        </div>
                        <div className="indicator-item">
                          <span className="indicator-name">MACD</span>
                          <span className="indicator-value bearish">-0.0023</span>
                          <span className="indicator-signal">Bearish</span>
                        </div>
                        <div className="indicator-item">
                          <span className="indicator-name">MA (20)</span>
                          <span className="indicator-value neutral">1.0854</span>
                          <span className="indicator-signal">Neutral</span>
                        </div>
                      </div>
                    </div>

                    <div className="analysis-card">
                      <h4 className="analysis-title">
                        <span className="analysis-icon">🧠</span>
                        AI Sentiment
                      </h4>
                      <div className="sentiment-gauge">
                        <div className="gauge-container">
                          <div className="gauge-fill" style={{ width: '72%' }}></div>
                        </div>
                        <div className="sentiment-details">
                          <span className="sentiment-score">72% Bullish</span>
                          <span className="sentiment-description">Strong positive sentiment detected</span>
                        </div>
                      </div>
                    </div>

                    <div className="analysis-card">
                      <h4 className="analysis-title">
                        <span className="analysis-icon">🌍</span>
                        Market Factors
                      </h4>
                      <div className="factors-list">
                        <div className="factor-item positive">
                          <span className="factor-icon">📈</span>
                          <span className="factor-text">Strong economic data</span>
                        </div>
                        <div className="factor-item negative">
                          <span className="factor-icon">📉</span>
                          <span className="factor-text">Geopolitical tensions</span>
                        </div>
                        <div className="factor-item neutral">
                          <span className="factor-icon">⚖️</span>
                          <span className="factor-text">Central bank policy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'signals' && (
                <div className="signals-demo">
                  <div className="signals-header">
                    <h4 className="signals-title">Live Trading Signals</h4>
                    <div className="signals-stats">
                      <div className="stat-item">
                        <span className="stat-value">23</span>
                        <span className="stat-label">Signals Today</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">87%</span>
                        <span className="stat-label">Success Rate</span>
                      </div>
                    </div>
                  </div>

                  <div className="signals-list">
                    <div className="signal-item buy">
                      <div className="signal-header">
                        <span className="signal-type">BUY</span>
                        <span className="signal-asset">EUR/USD</span>
                        <span className="signal-time">2 min ago</span>
                      </div>
                      <div className="signal-details">
                        <span className="signal-price">Entry: 1.0876</span>
                        <span className="signal-target">Target: 1.0895</span>
                        <span className="signal-confidence">95% confidence</span>
                      </div>
                    </div>

                    <div className="signal-item sell">
                      <div className="signal-header">
                        <span className="signal-type">SELL</span>
                        <span className="signal-asset">BTC/USD</span>
                        <span className="signal-time">5 min ago</span>
                      </div>
                      <div className="signal-details">
                        <span className="signal-price">Entry: 43,567</span>
                        <span className="signal-target">Target: 43,200</span>
                        <span className="signal-confidence">89% confidence</span>
                      </div>
                    </div>

                    <div className="signal-item hold">
                      <div className="signal-header">
                        <span className="signal-type">HOLD</span>
                        <span className="signal-asset">AAPL</span>
                        <span className="signal-time">8 min ago</span>
                      </div>
                      <div className="signal-details">
                        <span className="signal-price">Current: $185.43</span>
                        <span className="signal-target">Wait for breakout</span>
                        <span className="signal-confidence">76% confidence</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div className="portfolio-demo">
                  <div className="portfolio-header">
                    <h4 className="portfolio-title">AI Portfolio Optimization</h4>
                    <div className="portfolio-value">
                      <span className="value-label">Total Value</span>
                      <span className="value-amount">$125,847.32</span>
                      <span className="value-change positive">+2.34%</span>
                    </div>
                  </div>

                  <div className="allocation-chart">
                    <h5 className="chart-title">Recommended Allocation</h5>
                    <div className="allocation-bars">
                      <div className="allocation-item">
                        <span className="allocation-label">Forex (45%)</span>
                        <div className="allocation-bar">
                          <div className="allocation-fill" style={{ width: '45%' }}></div>
                        </div>
                        <span className="allocation-value">$56,631</span>
                      </div>
                      <div className="allocation-item">
                        <span className="allocation-label">Crypto (25%)</span>
                        <div className="allocation-bar">
                          <div className="allocation-fill" style={{ width: '25%' }}></div>
                        </div>
                        <span className="allocation-value">$31,462</span>
                      </div>
                      <div className="allocation-item">
                        <span className="allocation-label">Stocks (20%)</span>
                        <div className="allocation-bar">
                          <div className="allocation-fill" style={{ width: '20%' }}></div>
                        </div>
                        <span className="allocation-value">$25,169</span>
                      </div>
                      <div className="allocation-item">
                        <span className="allocation-label">Commodities (10%)</span>
                        <div className="allocation-bar">
                          <div className="allocation-fill" style={{ width: '10%' }}></div>
                        </div>
                        <span className="allocation-value">$12,585</span>
                      </div>
                    </div>
                  </div>

                  <div className="optimization-suggestions">
                    <h5 className="suggestions-title">AI Recommendations</h5>
                    <div className="suggestion-item">
                      <span className="suggestion-icon">💡</span>
                      <span className="suggestion-text">Increase EUR/USD position by 2% for better risk-adjusted returns</span>
                    </div>
                    <div className="suggestion-item">
                      <span className="suggestion-icon">⚠️</span>
                      <span className="suggestion-text">Consider reducing BTC exposure due to high volatility</span>
                    </div>
                    <div className="suggestion-item">
                      <span className="suggestion-icon">📈</span>
                      <span className="suggestion-text">Add defensive stocks to hedge against market uncertainty</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="demo-footer">
          <div className="demo-cta">
            <h3 className="cta-title">Ready to Experience the Full Platform?</h3>
            <p className="cta-description">
              This demo shows just a fraction of our AI capabilities. Get access to advanced features, 
              real-time alerts, and professional trading tools.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">
                <span className="btn-icon">🚀</span>
                Start Free Trial
              </button>
              <button className="btn btn-secondary">
                <span className="btn-icon">📞</span>
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveDemo 