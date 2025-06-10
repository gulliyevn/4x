'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

const SentimentAnalysis = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [selectedSource, setSelectedSource] = useState('all')

  const timeframes = ['1h', '4h', '24h', '7d', '30d']
  const sources = ['all', 'news', 'social', 'analyst', 'insider']

  const overallSentiment = {
    score: 72,
    trend: 'bullish',
    change: '+5.2',
    description: 'Market sentiment is moderately bullish with increasing optimism'
  }

  const sentimentData = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      sentiment: 85,
      trend: 'bullish',
      change: '+12.3',
      volume: 45200,
      mentions: 8420,
      newsCount: 156,
      socialBuzz: 'High',
      keyTopics: ['iPhone 15', 'AI Integration', 'Services Growth'],
      lastUpdate: '2 min ago'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      sentiment: 34,
      trend: 'bearish',
      change: '-18.7',
      volume: 89100,
      mentions: 12340,
      newsCount: 203,
      socialBuzz: 'Very High',
      keyTopics: ['Production Issues', 'Competition', 'Musk Twitter'],
      lastUpdate: '1 min ago'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      sentiment: 91,
      trend: 'bullish',
      change: '+8.9',
      volume: 52800,
      mentions: 6780,
      newsCount: 124,
      socialBuzz: 'High',
      keyTopics: ['AI Boom', 'Data Centers', 'Gaming'],
      lastUpdate: '3 min ago'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      sentiment: 68,
      trend: 'neutral',
      change: '+2.1',
      volume: 28400,
      mentions: 4560,
      newsCount: 89,
      socialBuzz: 'Medium',
      keyTopics: ['Cloud Growth', 'AI Copilot', 'Enterprise'],
      lastUpdate: '5 min ago'
    },
    {
      symbol: 'BTC-USD',
      name: 'Bitcoin',
      sentiment: 78,
      trend: 'bullish',
      change: '+15.6',
      volume: 2100000,
      mentions: 23450,
      newsCount: 312,
      socialBuzz: 'Very High',
      keyTopics: ['ETF Approval', 'Institutional Adoption', 'Halving'],
      lastUpdate: '1 min ago'
    },
    {
      symbol: 'ETH-USD',
      name: 'Ethereum',
      sentiment: 62,
      trend: 'neutral',
      change: '-3.4',
      volume: 1800000,
      mentions: 18920,
      newsCount: 245,
      socialBuzz: 'High',
      keyTopics: ['Layer 2 Solutions', 'DeFi', 'Staking'],
      lastUpdate: '2 min ago'
    }
  ]

  const newsAnalysis = [
    {
      headline: 'Apple Reports Strong Q4 Earnings, iPhone Sales Exceed Expectations',
      source: 'Reuters',
      sentiment: 'Positive',
      impact: 'High',
      timestamp: '15 min ago',
      relevantSymbols: ['AAPL']
    },
    {
      headline: 'Tesla Faces Production Challenges at Gigafactory Berlin',
      source: 'Bloomberg',
      sentiment: 'Negative',
      impact: 'Medium',
      timestamp: '32 min ago',
      relevantSymbols: ['TSLA']
    },
    {
      headline: 'NVIDIA Partners with Major Cloud Providers for AI Infrastructure',
      source: 'TechCrunch',
      sentiment: 'Positive',
      impact: 'High',
      timestamp: '1 hour ago',
      relevantSymbols: ['NVDA']
    },
    {
      headline: 'Bitcoin ETF Approval Speculation Drives Market Optimism',
      source: 'CoinDesk',
      sentiment: 'Positive',
      impact: 'Very High',
      timestamp: '2 hours ago',
      relevantSymbols: ['BTC-USD']
    }
  ]

  const socialTrends = [
    {
      platform: 'Twitter',
      mentions: 45200,
      sentiment: 'Bullish',
      trending: ['#AI', '#Bitcoin', '#TechStocks'],
      change: '+23%'
    },
    {
      platform: 'Reddit',
      mentions: 12800,
      sentiment: 'Mixed',
      trending: ['r/investing', 'r/stocks', 'r/cryptocurrency'],
      change: '+8%'
    },
    {
      platform: 'Discord',
      mentions: 8900,
      sentiment: 'Bullish',
      trending: ['Trading Channels', 'AI Discussion', 'Crypto Talk'],
      change: '+15%'
    }
  ]

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 70) return '#10b981'
    if (sentiment >= 40) return '#f59e0b'
    return '#ef4444'
  }

  const getSentimentLabel = (sentiment: number) => {
    if (sentiment >= 80) return 'Very Bullish'
    if (sentiment >= 60) return 'Bullish'
    if (sentiment >= 40) return 'Neutral'
    if (sentiment >= 20) return 'Bearish'
    return 'Very Bearish'
  }

  const getBuzzLevel = (buzz: string) => {
    const levels = {
      'Very High': '#ef4444',
      'High': '#f59e0b',
      'Medium': '#06b6d4',
      'Low': '#6b7280'
    }
    return levels[buzz as keyof typeof levels] || '#6b7280'
  }

  return (
    <>
      <Navigation />
      <div className="sentiment-page">
        {/* Hero Section */}
        <section className="sentiment-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">📊</span>
                <span>Real-time Market Sentiment</span>
              </div>
              <h1 className="hero-title">
                AI Sentiment Analysis
                <span className="gradient-text">Real-time Market Pulse</span>
              </h1>
              <p className="hero-description">
                Monitor market sentiment across news, social media, and analyst reports 
                with our advanced AI-powered sentiment analysis engine.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">50M+</span>
                  <span className="stat-label">Daily Sources</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Monitoring</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overall Sentiment */}
        <section className="overall-sentiment-section">
          <div className="container">
            <div className="overall-card">
              <div className="overall-header">
                <h2 className="overall-title">Overall Market Sentiment</h2>
                <div className="overall-change">
                  <span className={`change-indicator ${overallSentiment.trend}`}>
                    {overallSentiment.change}
                  </span>
                  <span className="change-period">24h</span>
                </div>
              </div>
              
              <div className="sentiment-gauge">
                <div className="gauge-container">
                  <div className="gauge-track">
                    <div 
                      className="gauge-fill"
                      style={{ 
                        width: `${overallSentiment.score}%`,
                        backgroundColor: getSentimentColor(overallSentiment.score)
                      }}
                    ></div>
                  </div>
                  <div className="gauge-labels">
                    <span className="gauge-label bearish">Bearish</span>
                    <span className="gauge-label neutral">Neutral</span>
                    <span className="gauge-label bullish">Bullish</span>
                  </div>
                </div>
                <div className="sentiment-score">
                  <span className="score-value">{overallSentiment.score}</span>
                  <span className="score-label">{getSentimentLabel(overallSentiment.score)}</span>
                </div>
              </div>
              
              <p className="sentiment-description">
                {overallSentiment.description}
              </p>
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
                <label className="filter-label">Source</label>
                <select 
                  className="filter-select"
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                >
                  <option value="all">All Sources</option>
                  <option value="news">News</option>
                  <option value="social">Social Media</option>
                  <option value="analyst">Analyst Reports</option>
                  <option value="insider">Insider Trading</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Sentiment Grid */}
        <section className="sentiment-grid-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Asset Sentiment Analysis</h2>
              <p className="section-description">
                Real-time sentiment tracking for major assets
              </p>
            </div>

            <div className="sentiment-grid">
              {sentimentData.map((asset, index) => (
                <div key={index} className="sentiment-card">
                  <div className="card-header">
                    <div className="asset-info">
                      <span className="symbol">{asset.symbol}</span>
                      <span className="asset-name">{asset.name}</span>
                    </div>
                    <div className="last-update">{asset.lastUpdate}</div>
                  </div>

                  <div className="sentiment-meter">
                    <div className="meter-header">
                      <span className="meter-label">Sentiment Score</span>
                      <span className="meter-value">{asset.sentiment}</span>
                    </div>
                    <div className="meter-bar">
                      <div 
                        className="meter-fill"
                        style={{ 
                          width: `${asset.sentiment}%`,
                          backgroundColor: getSentimentColor(asset.sentiment)
                        }}
                      ></div>
                    </div>
                    <div className="sentiment-change">
                      <span className={`change-value ${asset.trend}`}>
                        {asset.change}
                      </span>
                      <span className="sentiment-label">
                        {getSentimentLabel(asset.sentiment)}
                      </span>
                    </div>
                  </div>

                  <div className="metrics-row">
                    <div className="metric-item">
                      <span className="metric-label">Volume</span>
                      <span className="metric-value">
                        {asset.volume.toLocaleString()}
                      </span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Mentions</span>
                      <span className="metric-value">
                        {asset.mentions.toLocaleString()}
                      </span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">News</span>
                      <span className="metric-value">{asset.newsCount}</span>
                    </div>
                  </div>

                  <div className="buzz-section">
                    <div className="buzz-header">
                      <span className="buzz-label">Social Buzz</span>
                      <span 
                        className="buzz-level"
                        style={{ color: getBuzzLevel(asset.socialBuzz) }}
                      >
                        {asset.socialBuzz}
                      </span>
                    </div>
                  </div>

                  <div className="topics-section">
                    <span className="topics-label">Key Topics</span>
                    <div className="topics-list">
                      {asset.keyTopics.map((topic, idx) => (
                        <span key={idx} className="topic-tag">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* News Analysis */}
        <section className="news-analysis-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Latest News Analysis</h2>
              <p className="section-description">
                AI-powered sentiment analysis of breaking news
              </p>
            </div>

            <div className="news-grid">
              {newsAnalysis.map((news, index) => (
                <div key={index} className="news-card">
                  <div className="news-header">
                    <div className="news-source">{news.source}</div>
                    <div className="news-timestamp">{news.timestamp}</div>
                  </div>
                  
                  <h3 className="news-headline">{news.headline}</h3>
                  
                  <div className="news-metrics">
                    <div className="news-sentiment">
                      <span className="sentiment-label">Sentiment</span>
                      <span className={`sentiment-value ${news.sentiment.toLowerCase()}`}>
                        {news.sentiment}
                      </span>
                    </div>
                    <div className="news-impact">
                      <span className="impact-label">Impact</span>
                      <span className={`impact-value ${news.impact.toLowerCase().replace(' ', '-')}`}>
                        {news.impact}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relevant-symbols">
                    {news.relevantSymbols.map((symbol, idx) => (
                      <span key={idx} className="symbol-tag">
                        {symbol}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Trends */}
        <section className="social-trends-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Social Media Trends</h2>
              <p className="section-description">
                Real-time social sentiment across platforms
              </p>
            </div>

            <div className="social-grid">
              {socialTrends.map((platform, index) => (
                <div key={index} className="social-card">
                  <div className="social-header">
                    <h3 className="platform-name">{platform.platform}</h3>
                    <div className="mentions-change">
                      <span className="change-value positive">
                        {platform.change}
                      </span>
                    </div>
                  </div>
                  
                  <div className="social-metrics">
                    <div className="mentions-count">
                      <span className="count-value">
                        {platform.mentions.toLocaleString()}
                      </span>
                      <span className="count-label">Mentions</span>
                    </div>
                    <div className="platform-sentiment">
                      <span className="sentiment-value">
                        {platform.sentiment}
                      </span>
                      <span className="sentiment-label">Sentiment</span>
                    </div>
                  </div>
                  
                  <div className="trending-topics">
                    <span className="trending-label">Trending</span>
                    <div className="trending-list">
                      {platform.trending.map((trend, idx) => (
                        <span key={idx} className="trending-tag">
                          {trend}
                        </span>
                      ))}
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
        .sentiment-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .sentiment-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .sentiment-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
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
          background: linear-gradient(135deg, #06b6d4, #10b981, #f59e0b);
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
          color: #06b6d4;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .overall-sentiment-section {
          padding: 40px 0;
        }

        .overall-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 32px;
          backdrop-filter: blur(10px);
          max-width: 600px;
          margin: 0 auto;
        }

        .overall-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .overall-title {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .overall-change {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .change-indicator {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .change-indicator.bullish {
          color: #10b981;
        }

        .change-indicator.bearish {
          color: #ef4444;
        }

        .change-period {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .sentiment-gauge {
          margin-bottom: 20px;
        }

        .gauge-container {
          margin-bottom: 16px;
        }

        .gauge-track {
          width: 100%;
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .gauge-fill {
          height: 100%;
          border-radius: 6px;
          transition: width 0.3s ease;
        }

        .gauge-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .sentiment-score {
          text-align: center;
          margin-bottom: 16px;
        }

        .score-value {
          display: block;
          font-size: 3rem;
          font-weight: 700;
          color: #06b6d4;
          margin-bottom: 4px;
        }

        .score-label {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .sentiment-description {
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
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
          background: rgba(6, 182, 212, 0.2);
          border-color: rgba(6, 182, 212, 0.4);
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

        .sentiment-grid-section {
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

        .sentiment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        .sentiment-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .sentiment-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
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
          color: #06b6d4;
          margin-bottom: 4px;
        }

        .asset-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .last-update {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .sentiment-meter {
          margin-bottom: 20px;
        }

        .meter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .meter-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .meter-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #06b6d4;
        }

        .meter-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .meter-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .sentiment-change {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .change-value {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .change-value.bullish {
          color: #10b981;
        }

        .change-value.bearish {
          color: #ef4444;
        }

        .change-value.neutral {
          color: #f59e0b;
        }

        .sentiment-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .metrics-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .metric-item {
          text-align: center;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .metric-label {
          display: block;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4px;
        }

        .metric-value {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .buzz-section {
          margin-bottom: 20px;
        }

        .buzz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .buzz-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .buzz-level {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .topics-section {
          margin-bottom: 20px;
        }

        .topics-label {
          display: block;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
        }

        .topics-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .topic-tag {
          padding: 4px 8px;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 12px;
          font-size: 0.7rem;
          color: #06b6d4;
        }

        .news-analysis-section {
          padding: 80px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .news-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .news-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .news-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .news-source {
          font-size: 0.9rem;
          font-weight: 600;
          color: #06b6d4;
        }

        .news-timestamp {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .news-headline {
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 16px;
          color: rgba(255, 255, 255, 0.9);
        }

        .news-metrics {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
        }

        .news-sentiment,
        .news-impact {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sentiment-label,
        .impact-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .sentiment-value {
          font-size: 0.9rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .sentiment-value.positive {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .sentiment-value.negative {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .impact-value {
          font-size: 0.9rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .impact-value.high,
        .impact-value.very-high {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .impact-value.medium {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .relevant-symbols {
          display: flex;
          gap: 6px;
        }

        .symbol-tag {
          padding: 4px 8px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          font-size: 0.7rem;
          color: #3b82f6;
          font-weight: 600;
        }

        .social-trends-section {
          padding: 80px 0;
        }

        .social-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .social-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .social-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
        }

        .social-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .platform-name {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .mentions-change {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .change-value.positive {
          color: #10b981;
        }

        .social-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        .mentions-count,
        .platform-sentiment {
          text-align: center;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .count-value,
        .sentiment-value {
          display: block;
          font-size: 1.1rem;
          font-weight: 600;
          color: #06b6d4;
          margin-bottom: 4px;
        }

        .count-label,
        .sentiment-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .trending-topics {
          margin-top: 16px;
        }

        .trending-label {
          display: block;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
        }

        .trending-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .trending-tag {
          padding: 4px 8px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 12px;
          font-size: 0.7rem;
          color: #f59e0b;
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

          .sentiment-grid {
            grid-template-columns: 1fr;
          }

          .news-grid {
            grid-template-columns: 1fr;
          }

          .social-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

export default SentimentAnalysis 