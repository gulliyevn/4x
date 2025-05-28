'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../../src/components/Navigation'

interface PredictionData {
  symbol: string
  price: number
  prediction: number
  confidence: number
  direction: 'up' | 'down' | 'neutral'
  timeframe: string
}

interface SentimentData {
  symbol: string
  sentiment: number
  volume: number
  mentions: number
  trend: 'bullish' | 'bearish' | 'neutral'
}

export default function AIInsightsPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('predictions')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  
  const [predictions, setPredictions] = useState<PredictionData[]>([
    { symbol: 'AAPL', price: 189.45, prediction: 195.20, confidence: 87, direction: 'up', timeframe: '1D' },
    { symbol: 'TSLA', price: 234.56, prediction: 228.90, confidence: 92, direction: 'down', timeframe: '1D' },
    { symbol: 'MSFT', price: 378.90, prediction: 385.40, confidence: 78, direction: 'up', timeframe: '1D' },
    { symbol: 'GOOGL', price: 142.30, prediction: 145.80, confidence: 83, direction: 'up', timeframe: '1D' },
    { symbol: 'AMZN', price: 156.78, prediction: 152.40, confidence: 76, direction: 'down', timeframe: '1D' },
    { symbol: 'NVDA', price: 498.32, prediction: 510.75, confidence: 89, direction: 'up', timeframe: '1D' }
  ])

  const [sentimentData, setSentimentData] = useState<SentimentData[]>([
    { symbol: 'BTC', sentiment: 0.75, volume: 2.4, mentions: 15420, trend: 'bullish' },
    { symbol: 'ETH', sentiment: 0.62, volume: 1.8, mentions: 8930, trend: 'bullish' },
    { symbol: 'AAPL', sentiment: 0.45, volume: 3.2, mentions: 12340, trend: 'neutral' },
    { symbol: 'TSLA', sentiment: -0.32, volume: 2.1, mentions: 9870, trend: 'bearish' },
    { symbol: 'SPY', sentiment: 0.28, volume: 4.5, mentions: 6540, trend: 'neutral' },
    { symbol: 'QQQ', sentiment: 0.51, volume: 2.9, mentions: 4320, trend: 'bullish' }
  ])

  const [aiMetrics, setAiMetrics] = useState({
    accuracy: 94.7,
    totalPredictions: 1247893,
    successfulTrades: 87.3,
    riskScore: 23.4,
    marketCoverage: 98.2,
    dataPoints: 2.5
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      
      // Simulate real-time updates
      setPredictions(prev => prev.map(p => ({
        ...p,
        price: p.price + (Math.random() - 0.5) * 2,
        confidence: Math.max(60, Math.min(95, p.confidence + (Math.random() - 0.5) * 5))
      })))

      setSentimentData(prev => prev.map(s => ({
        ...s,
        sentiment: Math.max(-1, Math.min(1, s.sentiment + (Math.random() - 0.5) * 0.1)),
        mentions: s.mentions + Math.floor((Math.random() - 0.5) * 100)
      })))
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const formatPrice = (price: number) => price.toFixed(2)
  const formatChange = (current: number, predicted: number) => {
    const change = predicted - current
    const percent = (change / current) * 100
    return {
      value: change.toFixed(2),
      percent: percent.toFixed(2),
      isPositive: change >= 0
    }
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.3) return 'text-green-500'
    if (sentiment < -0.3) return 'text-red-500'
    return 'text-yellow-500'
  }

  const getSentimentLabel = (sentiment: number) => {
    if (sentiment > 0.3) return 'Bullish'
    if (sentiment < -0.3) return 'Bearish'
    return 'Neutral'
  }

  return (
    <div className="page-container">
      <Navigation />
      
      {/* AI Dashboard Header */}
      <section className="ai-dashboard-header">
        <div className="container">
          <div className="dashboard-title-section">
            <h1 className="dashboard-title">
              🧠 AI Intelligence Dashboard
            </h1>
            <p className="dashboard-subtitle">
              Advanced artificial intelligence providing real-time market analysis, 
              price predictions, and sentiment insights with industry-leading accuracy.
            </p>
            <div className="dashboard-status">
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span className="status-text">AI Systems Online</span>
              </div>
              <div className="last-updated">
                Last Updated: <span className="timestamp">{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Metrics Overview */}
      <section className="ai-metrics-section">
        <div className="container">
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">🎯</span>
                <h3 className="metric-title">Prediction Accuracy</h3>
              </div>
              <div className="metric-value">{aiMetrics.accuracy}%</div>
              <div className="metric-change positive">+0.3% this week</div>
              <p className="metric-description">
                Industry-leading accuracy across all asset classes
              </p>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">📊</span>
                <h3 className="metric-title">Total Predictions</h3>
              </div>
              <div className="metric-value">{aiMetrics.totalPredictions.toLocaleString()}</div>
              <div className="metric-change positive">+2,847 today</div>
              <p className="metric-description">
                Predictions generated across all markets
              </p>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">💰</span>
                <h3 className="metric-title">Successful Trades</h3>
              </div>
              <div className="metric-value">{aiMetrics.successfulTrades}%</div>
              <div className="metric-change positive">+1.2% this month</div>
              <p className="metric-description">
                Win rate for AI-recommended trades
              </p>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">⚠️</span>
                <h3 className="metric-title">Risk Score</h3>
              </div>
              <div className="metric-value">{aiMetrics.riskScore}</div>
              <div className="metric-change neutral">Stable</div>
              <p className="metric-description">
                Current market risk assessment (0-100)
              </p>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">🌍</span>
                <h3 className="metric-title">Market Coverage</h3>
              </div>
              <div className="metric-value">{aiMetrics.marketCoverage}%</div>
              <div className="metric-change positive">+0.8% expansion</div>
              <p className="metric-description">
                Global markets under AI analysis
              </p>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">📈</span>
                <h3 className="metric-title">Data Points</h3>
              </div>
              <div className="metric-value">{aiMetrics.dataPoints}B+</div>
              <div className="metric-change positive">Real-time</div>
              <p className="metric-description">
                Data points processed daily
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Tabs */}
      <section className="ai-features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">AI Analysis Tools</h2>
            <p className="section-subtitle">
              Comprehensive AI-powered analysis across multiple dimensions
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'predictions' ? 'active' : ''}`}
              onClick={() => setActiveTab('predictions')}
            >
              <span className="tab-icon">🔮</span>
              Price Predictions
            </button>
            <button 
              className={`tab-button ${activeTab === 'sentiment' ? 'active' : ''}`}
              onClick={() => setActiveTab('sentiment')}
            >
              <span className="tab-icon">📊</span>
              Sentiment Analysis
            </button>
            <button 
              className={`tab-button ${activeTab === 'patterns' ? 'active' : ''}`}
              onClick={() => setActiveTab('patterns')}
            >
              <span className="tab-icon">🎯</span>
              Pattern Recognition
            </button>
            <button 
              className={`tab-button ${activeTab === 'risk' ? 'active' : ''}`}
              onClick={() => setActiveTab('risk')}
            >
              <span className="tab-icon">⚠️</span>
              Risk Assessment
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'predictions' && (
              <div className="predictions-panel">
                <div className="panel-header">
                  <h3 className="panel-title">AI Price Predictions</h3>
                  <div className="timeframe-selector">
                    {['1H', '4H', '1D', '1W', '1M'].map(tf => (
                      <button
                        key={tf}
                        className={`timeframe-btn ${selectedTimeframe === tf ? 'active' : ''}`}
                        onClick={() => setSelectedTimeframe(tf)}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="predictions-grid">
                  {predictions.map((prediction, index) => {
                    const change = formatChange(prediction.price, prediction.prediction)
                    return (
                      <div key={index} className="prediction-card">
                        <div className="prediction-header">
                          <div className="symbol-info">
                            <span className="symbol">{prediction.symbol}</span>
                            <span className="current-price">${formatPrice(prediction.price)}</span>
                          </div>
                          <div className={`confidence-badge ${prediction.direction}`}>
                            {prediction.confidence}%
                          </div>
                        </div>
                        
                        <div className="prediction-details">
                          <div className="predicted-price">
                            <span className="label">Predicted Price:</span>
                            <span className="value">${formatPrice(prediction.prediction)}</span>
                          </div>
                          
                          <div className={`price-change ${change.isPositive ? 'positive' : 'negative'}`}>
                            <span className="change-value">
                              {change.isPositive ? '+' : ''}${change.value}
                            </span>
                            <span className="change-percent">
                              ({change.isPositive ? '+' : ''}{change.percent}%)
                            </span>
                          </div>
                          
                          <div className="prediction-direction">
                            <span className={`direction-indicator ${prediction.direction}`}>
                              {prediction.direction === 'up' ? '📈' : prediction.direction === 'down' ? '📉' : '➡️'}
                            </span>
                            <span className="direction-text">
                              {prediction.direction === 'up' ? 'Bullish' : prediction.direction === 'down' ? 'Bearish' : 'Neutral'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === 'sentiment' && (
              <div className="sentiment-panel">
                <div className="panel-header">
                  <h3 className="panel-title">Market Sentiment Analysis</h3>
                  <div className="sentiment-legend">
                    <span className="legend-item bullish">Bullish</span>
                    <span className="legend-item neutral">Neutral</span>
                    <span className="legend-item bearish">Bearish</span>
                  </div>
                </div>
                
                <div className="sentiment-grid">
                  {sentimentData.map((item, index) => (
                    <div key={index} className="sentiment-card">
                      <div className="sentiment-header">
                        <span className="symbol">{item.symbol}</span>
                        <span className={`sentiment-badge ${item.trend}`}>
                          {getSentimentLabel(item.sentiment)}
                        </span>
                      </div>
                      
                      <div className="sentiment-meter">
                        <div className="meter-track">
                          <div 
                            className={`meter-fill ${item.trend}`}
                            style={{ width: `${Math.abs(item.sentiment) * 50 + 50}%` }}
                          ></div>
                        </div>
                        <span className="sentiment-score">
                          {(item.sentiment * 100).toFixed(0)}
                        </span>
                      </div>
                      
                      <div className="sentiment-stats">
                        <div className="stat-item">
                          <span className="stat-label">Volume</span>
                          <span className="stat-value">{item.volume}B</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Mentions</span>
                          <span className="stat-value">{item.mentions.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'patterns' && (
              <div className="patterns-panel">
                <div className="panel-header">
                  <h3 className="panel-title">Pattern Recognition</h3>
                  <p className="panel-subtitle">AI-detected chart patterns and formations</p>
                </div>
                
                <div className="patterns-grid">
                  <div className="pattern-card">
                    <div className="pattern-icon">📈</div>
                    <h4 className="pattern-name">Bull Flag</h4>
                    <p className="pattern-symbol">AAPL</p>
                    <div className="pattern-confidence">
                      <span className="confidence-label">Confidence:</span>
                      <span className="confidence-value">89%</span>
                    </div>
                    <div className="pattern-target">
                      <span className="target-label">Target:</span>
                      <span className="target-value">$195.20</span>
                    </div>
                  </div>

                  <div className="pattern-card">
                    <div className="pattern-icon">📉</div>
                    <h4 className="pattern-name">Head & Shoulders</h4>
                    <p className="pattern-symbol">TSLA</p>
                    <div className="pattern-confidence">
                      <span className="confidence-label">Confidence:</span>
                      <span className="confidence-value">92%</span>
                    </div>
                    <div className="pattern-target">
                      <span className="target-label">Target:</span>
                      <span className="target-value">$228.90</span>
                    </div>
                  </div>

                  <div className="pattern-card">
                    <div className="pattern-icon">🔺</div>
                    <h4 className="pattern-name">Ascending Triangle</h4>
                    <p className="pattern-symbol">NVDA</p>
                    <div className="pattern-confidence">
                      <span className="confidence-label">Confidence:</span>
                      <span className="confidence-value">85%</span>
                    </div>
                    <div className="pattern-target">
                      <span className="target-label">Target:</span>
                      <span className="target-value">$510.75</span>
                    </div>
                  </div>

                  <div className="pattern-card">
                    <div className="pattern-icon">💎</div>
                    <h4 className="pattern-name">Diamond Top</h4>
                    <p className="pattern-symbol">MSFT</p>
                    <div className="pattern-confidence">
                      <span className="confidence-label">Confidence:</span>
                      <span className="confidence-value">78%</span>
                    </div>
                    <div className="pattern-target">
                      <span className="target-label">Target:</span>
                      <span className="target-value">$385.40</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'risk' && (
              <div className="risk-panel">
                <div className="panel-header">
                  <h3 className="panel-title">AI Risk Assessment</h3>
                  <p className="panel-subtitle">Advanced risk analysis and portfolio protection</p>
                </div>
                
                <div className="risk-overview">
                  <div className="risk-gauge">
                    <div className="gauge-container">
                      <div className="gauge-arc">
                        <div className="gauge-needle" style={{ transform: `rotate(${aiMetrics.riskScore * 1.8}deg)` }}></div>
                      </div>
                      <div className="gauge-center">
                        <span className="gauge-value">{aiMetrics.riskScore}</span>
                        <span className="gauge-label">Risk Score</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="risk-factors">
                    <h4 className="factors-title">Key Risk Factors</h4>
                    <div className="factors-list">
                      <div className="factor-item">
                        <span className="factor-icon">📊</span>
                        <span className="factor-name">Market Volatility</span>
                        <span className="factor-level moderate">Moderate</span>
                      </div>
                      <div className="factor-item">
                        <span className="factor-icon">🏛️</span>
                        <span className="factor-name">Economic Events</span>
                        <span className="factor-level low">Low</span>
                      </div>
                      <div className="factor-item">
                        <span className="factor-icon">🌍</span>
                        <span className="factor-name">Geopolitical Risk</span>
                        <span className="factor-level high">High</span>
                      </div>
                      <div className="factor-item">
                        <span className="factor-icon">💱</span>
                        <span className="factor-name">Currency Risk</span>
                        <span className="factor-level low">Low</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Trade with AI Intelligence?
            </h2>
            <p className="cta-subtitle">
              Join thousands of traders using our AI-powered insights to make smarter trading decisions.
            </p>
            <div className="cta-buttons">
              <Link href="/markets" className="btn btn-primary btn-lg">
                <span className="btn-icon">📊</span>
                Explore Markets
              </Link>
              <Link href="/education" className="btn btn-ghost btn-lg">
                <span className="btn-icon">📚</span>
                Learn AI Trading
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 