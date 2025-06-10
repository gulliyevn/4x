'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../../src/components/Navigation'
import Footer from '../../src/components/Footer'

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

const AIDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('predictions')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [activeMetric, setActiveMetric] = useState('accuracy')
  const [isLoading, setIsLoading] = useState(true)
  
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

  const metrics = [
    {
      id: 'accuracy',
      title: 'Prediction Accuracy',
      value: '94.7%',
      change: '+2.3%',
      trend: 'up',
      icon: '🎯',
      description: 'AI model accuracy over the last 30 days'
    },
    {
      id: 'signals',
      title: 'Active Signals',
      value: '1,247',
      change: '+156',
      trend: 'up',
      icon: '📡',
      description: 'Currently active trading signals'
    },
    {
      id: 'patterns',
      title: 'Patterns Detected',
      value: '89',
      change: '+12',
      trend: 'up',
      icon: '🔍',
      description: 'Chart patterns identified today'
    },
    {
      id: 'sentiment',
      title: 'Market Sentiment',
      value: 'Bullish',
      change: 'Strong',
      trend: 'up',
      icon: '📊',
      description: 'Overall market sentiment analysis'
    }
  ]

  const aiFeatures = [
    {
      title: 'Neural Network Analysis',
      description: 'Deep learning models analyze market patterns with unprecedented accuracy',
      icon: '🧠',
      status: 'Active',
      performance: '96.2%'
    },
    {
      title: 'Sentiment Processing',
      description: 'Real-time analysis of news, social media, and market sentiment',
      icon: '💭',
      status: 'Active',
      performance: '91.8%'
    },
    {
      title: 'Risk Modeling',
      description: 'Advanced VaR and stress testing for portfolio protection',
      icon: '🛡️',
      status: 'Active',
      performance: '94.5%'
    },
    {
      title: 'Pattern Recognition',
      description: 'Automated detection of 50+ technical analysis patterns',
      icon: '🎯',
      status: 'Active',
      performance: '89.3%'
    }
  ]

  const recentPredictions = [
    {
      symbol: 'AAPL',
      prediction: 'Bullish',
      confidence: 94,
      target: '$185.50',
      timeframe: '5 days',
      status: 'Active'
    },
    {
      symbol: 'TSLA',
      prediction: 'Bearish',
      confidence: 87,
      target: '$220.00',
      timeframe: '3 days',
      status: 'Active'
    },
    {
      symbol: 'NVDA',
      prediction: 'Bullish',
      confidence: 92,
      target: '$480.00',
      timeframe: '7 days',
      status: 'Active'
    },
    {
      symbol: 'MSFT',
      prediction: 'Neutral',
      confidence: 78,
      target: '$340.00',
      timeframe: '10 days',
      status: 'Monitoring'
    }
  ]

  return (
    <>
      <Navigation />
      <div className="ai-dashboard-page">
        {/* Hero Section */}
        <section className="ai-hero">
          <div className="container">
            <div className="ai-hero-content">
              <div className="ai-hero-badge">
                <span className="badge-icon">🤖</span>
                <span>AI Intelligence Dashboard</span>
              </div>
              <h1 className="ai-hero-title">
                Comprehensive AI Analytics
                <span className="gradient-text">Powered by Machine Learning</span>
              </h1>
              <p className="ai-hero-description">
                Monitor your AI-powered trading systems with real-time analytics, 
                performance metrics, and intelligent insights that drive profitable decisions.
              </p>
              <div className="ai-hero-stats">
                <div className="stat-item">
                  <span className="stat-number">94.7%</span>
                  <span className="stat-label">Accuracy Rate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1.2M+</span>
                  <span className="stat-label">Predictions Made</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Market Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Overview */}
        <section className="metrics-section">
          <div className="container">
            <div className="metrics-grid">
              {metrics.map((metric) => (
                <div 
                  key={metric.id}
                  className={`metric-card ${activeMetric === metric.id ? 'active' : ''}`}
                  onClick={() => setActiveMetric(metric.id)}
                >
                  <div className="metric-header">
                    <span className="metric-icon">{metric.icon}</span>
                    <div className="metric-trend">
                      <span className={`trend-indicator ${metric.trend}`}>
                        {metric.trend === 'up' ? '↗' : '↘'}
                      </span>
                      <span className="trend-value">{metric.change}</span>
                    </div>
                  </div>
                  <div className="metric-content">
                    <h3 className="metric-value">{metric.value}</h3>
                    <p className="metric-title">{metric.title}</p>
                    <p className="metric-description">{metric.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Features */}
        <section className="ai-features-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">AI Engine Status</h2>
              <p className="section-description">
                Real-time monitoring of our advanced AI systems
              </p>
            </div>
            <div className="features-grid">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-header">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-status">
                      <span className={`status-indicator ${feature.status.toLowerCase()}`}>
                        {feature.status}
                      </span>
                      <span className="performance-score">{feature.performance}</span>
                    </div>
                  </div>
                  <div className="feature-content">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                  <div className="feature-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: feature.performance }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Predictions */}
        <section className="predictions-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Recent AI Predictions</h2>
              <p className="section-description">
                Latest predictions from our neural network models
              </p>
            </div>
            <div className="predictions-table">
              <div className="table-header">
                <div className="header-cell">Symbol</div>
                <div className="header-cell">Prediction</div>
                <div className="header-cell">Confidence</div>
                <div className="header-cell">Target</div>
                <div className="header-cell">Timeframe</div>
                <div className="header-cell">Status</div>
              </div>
              {recentPredictions.map((prediction, index) => (
                <div key={index} className="table-row">
                  <div className="table-cell symbol-cell">
                    <span className="symbol">{prediction.symbol}</span>
                  </div>
                  <div className="table-cell">
                    <span className={`prediction ${prediction.prediction.toLowerCase()}`}>
                      {prediction.prediction}
                    </span>
                  </div>
                  <div className="table-cell">
                    <div className="confidence-bar">
                      <div 
                        className="confidence-fill" 
                        style={{ width: `${prediction.confidence}%` }}
                      ></div>
                      <span className="confidence-text">{prediction.confidence}%</span>
                    </div>
                  </div>
                  <div className="table-cell target-cell">
                    {prediction.target}
                  </div>
                  <div className="table-cell">
                    {prediction.timeframe}
                  </div>
                  <div className="table-cell">
                    <span className={`status ${prediction.status.toLowerCase()}`}>
                      {prediction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Quick Actions</h2>
              <p className="section-description">
                Access key AI features and tools
              </p>
            </div>
            <div className="actions-grid">
              <a href="/ai-insights/predictions" className="action-card">
                <div className="action-icon">🔮</div>
                <h3 className="action-title">Price Predictions</h3>
                <p className="action-description">View detailed price forecasts</p>
                <span className="action-arrow">→</span>
              </a>
              <a href="/ai-insights/sentiment-analysis" className="action-card">
                <div className="action-icon">📊</div>
                <h3 className="action-title">Sentiment Analysis</h3>
                <p className="action-description">Real-time market sentiment</p>
                <span className="action-arrow">→</span>
              </a>
              <a href="/ai-insights/pattern-recognition" className="action-card">
                <div className="action-icon">🎯</div>
                <h3 className="action-title">Pattern Recognition</h3>
                <p className="action-description">Detect chart patterns</p>
                <span className="action-arrow">→</span>
              </a>
              <a href="/ai-insights/trading-signals" className="action-card">
                <div className="action-icon">📡</div>
                <h3 className="action-title">Trading Signals</h3>
                <p className="action-description">AI-generated signals</p>
                <span className="action-arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .ai-dashboard-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .ai-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .ai-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .ai-hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .ai-hero-badge {
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

        .ai-hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 0.8em;
        }

        .ai-hero-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .ai-hero-stats {
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
          color: #3b82f6;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .metrics-section {
          padding: 80px 0;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .metric-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .metric-card:hover,
        .metric-card.active {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
          transform: translateY(-4px);
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .metric-icon {
          font-size: 2rem;
        }

        .metric-trend {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .trend-indicator {
          font-size: 1.2rem;
        }

        .trend-indicator.up {
          color: #10b981;
        }

        .trend-indicator.down {
          color: #ef4444;
        }

        .trend-value {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .metric-value {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #3b82f6;
        }

        .metric-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .metric-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
        }

        .ai-features-section {
          padding: 80px 0;
          background: rgba(0, 0, 0, 0.2);
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

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
        }

        .feature-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .feature-icon {
          font-size: 2rem;
        }

        .feature-status {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .status-indicator {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-indicator.active {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .performance-score {
          font-size: 0.9rem;
          font-weight: 600;
          color: #3b82f6;
        }

        .feature-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .feature-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .feature-progress {
          margin-top: 16px;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .predictions-section {
          padding: 80px 0;
        }

        .predictions-table {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.05);
          font-weight: 600;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr 1fr;
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
        }

        .symbol {
          font-weight: 600;
          color: #3b82f6;
        }

        .prediction {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .prediction.bullish {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .prediction.bearish {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .prediction.neutral {
          background: rgba(156, 163, 175, 0.2);
          color: #9ca3af;
        }

        .confidence-bar {
          position: relative;
          width: 100%;
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .confidence-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
          transition: width 0.3s ease;
        }

        .confidence-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
        }

        .target-cell {
          font-weight: 600;
          color: #06b6d4;
        }

        .status {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status.active {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .status.monitoring {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .quick-actions-section {
          padding: 80px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .action-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          text-decoration: none;
          color: white;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .action-card:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
          transform: translateY(-4px);
        }

        .action-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .action-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .action-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 16px;
        }

        .action-arrow {
          position: absolute;
          top: 24px;
          right: 24px;
          font-size: 1.2rem;
          color: #3b82f6;
          transition: transform 0.3s ease;
        }

        .action-card:hover .action-arrow {
          transform: translateX(4px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (max-width: 768px) {
          .ai-hero-title {
            font-size: 2.5rem;
          }

          .ai-hero-stats {
            flex-direction: column;
            gap: 24px;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .features-grid {
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

          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

export default AIDashboard 