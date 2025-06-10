'use client'

import React, { useState } from 'react'
import Navigation from '../../src/components/Navigation'
import Footer from '../../src/components/Footer'

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('today')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const categories = ['all', 'markets', 'crypto', 'forex', 'commodities', 'economics', 'earnings']
  const timeframes = ['today', 'week', 'month']

  const newsData = [
    {
      id: 1,
      title: 'Federal Reserve Signals Potential Rate Cuts in 2024',
      summary: 'Fed Chair Jerome Powell hints at possible monetary policy easing as inflation shows signs of cooling across major economies.',
      content: 'In a highly anticipated speech at the Jackson Hole Economic Symposium, Federal Reserve Chair Jerome Powell indicated that the central bank may consider cutting interest rates in 2024 if inflation continues its downward trajectory...',
      category: 'economics',
      source: 'Reuters',
      author: 'Sarah Johnson',
      publishedAt: '2024-01-15T14:30:00Z',
      readTime: 4,
      image: '/api/placeholder/400/250',
      tags: ['Federal Reserve', 'Interest Rates', 'Monetary Policy'],
      impact: 'high',
      sentiment: 'positive',
      views: 15420,
      isBreaking: true,
      relatedSymbols: ['SPY', 'QQQ', 'DXY']
    },
    {
      id: 2,
      title: 'Bitcoin Surges Past $45,000 on ETF Approval Hopes',
      summary: 'Cryptocurrency markets rally as investors anticipate potential approval of spot Bitcoin ETFs by the SEC.',
      content: 'Bitcoin has broken through the $45,000 resistance level following renewed optimism about the Securities and Exchange Commission approving spot Bitcoin exchange-traded funds...',
      category: 'crypto',
      source: 'CoinDesk',
      author: 'Michael Chen',
      publishedAt: '2024-01-15T12:15:00Z',
      readTime: 3,
      image: '/api/placeholder/400/250',
      tags: ['Bitcoin', 'ETF', 'SEC', 'Cryptocurrency'],
      impact: 'high',
      sentiment: 'positive',
      views: 12850,
      isBreaking: false,
      relatedSymbols: ['BTC', 'ETH', 'COIN']
    },
    {
      id: 3,
      title: 'Oil Prices Jump 3% on Middle East Tensions',
      summary: 'Crude oil futures spike as geopolitical tensions in the Middle East raise concerns about supply disruptions.',
      content: 'West Texas Intermediate crude oil futures surged more than 3% in early trading as escalating tensions in the Middle East sparked concerns about potential supply disruptions...',
      category: 'commodities',
      source: 'Bloomberg',
      author: 'David Rodriguez',
      publishedAt: '2024-01-15T10:45:00Z',
      readTime: 5,
      image: '/api/placeholder/400/250',
      tags: ['Oil', 'Geopolitics', 'Energy', 'Supply Chain'],
      impact: 'medium',
      sentiment: 'negative',
      views: 8930,
      isBreaking: false,
      relatedSymbols: ['CL', 'XOM', 'CVX']
    },
    {
      id: 4,
      title: 'Tesla Reports Record Q4 Deliveries, Stock Soars',
      summary: 'Electric vehicle giant Tesla exceeds delivery expectations for the fourth quarter, sending shares higher in pre-market trading.',
      content: 'Tesla Inc. reported record quarterly deliveries of 484,507 vehicles in Q4 2023, surpassing analyst expectations and demonstrating strong demand for electric vehicles...',
      category: 'earnings',
      source: 'CNBC',
      author: 'Lisa Wang',
      publishedAt: '2024-01-15T09:20:00Z',
      readTime: 6,
      image: '/api/placeholder/400/250',
      tags: ['Tesla', 'Earnings', 'Electric Vehicles', 'Deliveries'],
      impact: 'high',
      sentiment: 'positive',
      views: 18750,
      isBreaking: false,
      relatedSymbols: ['TSLA', 'NIO', 'RIVN']
    },
    {
      id: 5,
      title: 'EUR/USD Reaches 6-Month High on ECB Hawkish Stance',
      summary: 'The euro strengthens against the dollar as European Central Bank officials signal continued monetary tightening.',
      content: 'The EUR/USD currency pair climbed to its highest level in six months following hawkish comments from European Central Bank officials who indicated that interest rates may remain elevated...',
      category: 'forex',
      source: 'Financial Times',
      author: 'Emma Thompson',
      publishedAt: '2024-01-15T08:00:00Z',
      readTime: 4,
      image: '/api/placeholder/400/250',
      tags: ['EUR/USD', 'ECB', 'Forex', 'Monetary Policy'],
      impact: 'medium',
      sentiment: 'neutral',
      views: 6420,
      isBreaking: false,
      relatedSymbols: ['EURUSD', 'DXY', 'GBP/USD']
    },
    {
      id: 6,
      title: 'S&P 500 Hits New All-Time High on Tech Rally',
      summary: 'Major stock indices reach record levels as technology stocks lead broad market gains amid optimism about AI developments.',
      content: 'The S&P 500 index closed at a new all-time high yesterday, driven by strong performance in technology stocks as investors remain optimistic about artificial intelligence developments...',
      category: 'markets',
      source: 'MarketWatch',
      author: 'Robert Kim',
      publishedAt: '2024-01-14T21:30:00Z',
      readTime: 5,
      image: '/api/placeholder/400/250',
      tags: ['S&P 500', 'Technology', 'AI', 'Stock Market'],
      impact: 'high',
      sentiment: 'positive',
      views: 22100,
      isBreaking: false,
      relatedSymbols: ['SPY', 'QQQ', 'NVDA', 'MSFT']
    }
  ]

  const marketSentiment = {
    overall: 'Bullish',
    score: 72,
    change: '+5.2',
    indicators: [
      { name: 'Fear & Greed Index', value: 68, status: 'Greed' },
      { name: 'VIX', value: 14.2, status: 'Low Volatility' },
      { name: 'Put/Call Ratio', value: 0.85, status: 'Neutral' },
      { name: 'News Sentiment', value: 75, status: 'Positive' }
    ]
  }

  const breakingNews = newsData.filter(news => news.isBreaking)
  const topStories = newsData.filter(news => !news.isBreaking).slice(0, 3)

  const filteredNews = newsData.filter(news => {
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const now = new Date()
    const newsDate = new Date(news.publishedAt)
    const timeDiff = now.getTime() - newsDate.getTime()
    
    let matchesTimeframe = true
    if (selectedTimeframe === 'today') {
      matchesTimeframe = timeDiff <= 24 * 60 * 60 * 1000
    } else if (selectedTimeframe === 'week') {
      matchesTimeframe = timeDiff <= 7 * 24 * 60 * 60 * 1000
    } else if (selectedTimeframe === 'month') {
      matchesTimeframe = timeDiff <= 30 * 24 * 60 * 60 * 1000
    }
    
    return matchesCategory && matchesSearch && matchesTimeframe
  })

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '#10b981'
      case 'negative': return '#ef4444'
      case 'neutral': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <>
      <Navigation />
      <div className="news-page">
        {/* Hero Section */}
        <section className="news-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">📰</span>
                <span>News & Analysis</span>
              </div>
              <h1 className="hero-title">
                Financial News & Market Analysis
                <span className="gradient-text">Real-time Updates, Expert Insights</span>
              </h1>
              <p className="hero-description">
                Stay informed with breaking financial news, market analysis, and expert commentary 
                from leading sources worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Market Sentiment */}
        <section className="market-sentiment">
          <div className="container">
            <div className="sentiment-card">
              <div className="sentiment-header">
                <h3 className="sentiment-title">Market Sentiment</h3>
                <div className="sentiment-score">
                  <span className="score-value">{marketSentiment.score}</span>
                  <span className="score-label">{marketSentiment.overall}</span>
                  <span className="score-change positive">{marketSentiment.change}</span>
                </div>
              </div>
              <div className="sentiment-indicators">
                {marketSentiment.indicators.map((indicator, idx) => (
                  <div key={idx} className="indicator-item">
                    <span className="indicator-name">{indicator.name}</span>
                    <span className="indicator-value">{indicator.value}</span>
                    <span className="indicator-status">{indicator.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Breaking News */}
        {breakingNews.length > 0 && (
          <section className="breaking-news">
            <div className="container">
              <h2 className="section-title">
                <span className="breaking-badge">🔴 BREAKING</span>
                Breaking News
              </h2>
              <div className="breaking-grid">
                {breakingNews.map((news) => (
                  <div key={news.id} className="breaking-card">
                    <div className="breaking-content">
                      <div className="breaking-meta">
                        <span className="breaking-source">{news.source}</span>
                        <span className="breaking-time">{formatTimeAgo(news.publishedAt)}</span>
                      </div>
                      <h3 className="breaking-title">{news.title}</h3>
                      <p className="breaking-summary">{news.summary}</p>
                      <div className="breaking-tags">
                        {news.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="news-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="filters-section">
          <div className="container">
            <div className="filters-container">
              <div className="filter-group">
                <label className="filter-label">Search</label>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search news..."
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
                <label className="filter-label">Time</label>
                <div className="filter-buttons">
                  {timeframes.map(tf => (
                    <button
                      key={tf}
                      className={`filter-btn ${selectedTimeframe === tf ? 'active' : ''}`}
                      onClick={() => setSelectedTimeframe(tf)}
                    >
                      {tf.charAt(0).toUpperCase() + tf.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="view-controls">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* News Content */}
        <section className="news-content">
          <div className="container">
            <div className="content-layout">
              {/* Main News */}
              <div className="main-news">
                <div className="section-header">
                  <h2 className="section-title">Latest News</h2>
                  <p className="section-description">
                    {filteredNews.length} articles found
                  </p>
                </div>

                {viewMode === 'grid' ? (
                  <div className="news-grid">
                    {filteredNews.map((news) => (
                      <article key={news.id} className="news-card">
                        <div className="news-image">
                          <img src={news.image} alt={news.title} />
                          <div className="news-category">{news.category}</div>
                        </div>
                        <div className="news-content">
                          <div className="news-meta">
                            <span className="news-source">{news.source}</span>
                            <span className="news-time">{formatTimeAgo(news.publishedAt)}</span>
                            <span className="news-read-time">{news.readTime} min read</span>
                          </div>
                          <h3 className="news-title">{news.title}</h3>
                          <p className="news-summary">{news.summary}</p>
                          <div className="news-footer">
                            <div className="news-tags">
                              {news.tags.slice(0, 2).map((tag, idx) => (
                                <span key={idx} className="news-tag">{tag}</span>
                              ))}
                            </div>
                            <div className="news-metrics">
                              <span 
                                className="news-impact"
                                style={{ color: getImpactColor(news.impact) }}
                              >
                                {news.impact} impact
                              </span>
                              <span className="news-views">{news.views.toLocaleString()} views</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="news-list">
                    {filteredNews.map((news) => (
                      <article key={news.id} className="news-list-item">
                        <div className="list-image">
                          <img src={news.image} alt={news.title} />
                        </div>
                        <div className="list-content">
                          <div className="list-header">
                            <div className="list-meta">
                              <span className="news-source">{news.source}</span>
                              <span className="news-category">{news.category}</span>
                              <span className="news-time">{formatTimeAgo(news.publishedAt)}</span>
                            </div>
                            <div className="list-metrics">
                              <span 
                                className="news-impact"
                                style={{ color: getImpactColor(news.impact) }}
                              >
                                {news.impact}
                              </span>
                              <span 
                                className="news-sentiment"
                                style={{ color: getSentimentColor(news.sentiment) }}
                              >
                                {news.sentiment}
                              </span>
                            </div>
                          </div>
                          <h3 className="list-title">{news.title}</h3>
                          <p className="list-summary">{news.summary}</p>
                          <div className="list-footer">
                            <div className="news-tags">
                              {news.tags.slice(0, 3).map((tag, idx) => (
                                <span key={idx} className="news-tag">{tag}</span>
                              ))}
                            </div>
                            <span className="news-views">{news.views.toLocaleString()} views</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="news-sidebar">
                {/* Top Stories */}
                <div className="sidebar-card">
                  <h3 className="sidebar-title">Top Stories</h3>
                  <div className="top-stories">
                    {topStories.map((story, idx) => (
                      <div key={story.id} className="story-item">
                        <span className="story-rank">{idx + 1}</span>
                        <div className="story-content">
                          <h4 className="story-title">{story.title}</h4>
                          <div className="story-meta">
                            <span className="story-source">{story.source}</span>
                            <span className="story-time">{formatTimeAgo(story.publishedAt)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending Topics */}
                <div className="sidebar-card">
                  <h3 className="sidebar-title">Trending Topics</h3>
                  <div className="trending-topics">
                    {['Federal Reserve', 'Bitcoin ETF', 'AI Stocks', 'Oil Prices', 'Tesla Earnings', 'EUR/USD'].map((topic, idx) => (
                      <span key={idx} className="trending-tag">#{topic}</span>
                    ))}
                  </div>
                </div>

                {/* Market Movers */}
                <div className="sidebar-card">
                  <h3 className="sidebar-title">Market Movers</h3>
                  <div className="market-movers">
                    <div className="mover-item">
                      <span className="mover-symbol">TSLA</span>
                      <span className="mover-change positive">+8.5%</span>
                    </div>
                    <div className="mover-item">
                      <span className="mover-symbol">BTC</span>
                      <span className="mover-change positive">+12.3%</span>
                    </div>
                    <div className="mover-item">
                      <span className="mover-symbol">CL</span>
                      <span className="mover-change positive">+3.2%</span>
                    </div>
                    <div className="mover-item">
                      <span className="mover-symbol">NVDA</span>
                      <span className="mover-change negative">-2.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .news-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .news-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .news-hero::before {
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

        .market-sentiment {
          padding: 40px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .sentiment-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .sentiment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .sentiment-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #3b82f6;
        }

        .sentiment-score {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .score-value {
          font-size: 2rem;
          font-weight: 700;
          color: #10b981;
        }

        .score-label {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .score-change {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .score-change.positive {
          color: #10b981;
        }

        .sentiment-indicators {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .indicator-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .indicator-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .indicator-value {
          font-size: 1.2rem;
          font-weight: 600;
          color: #3b82f6;
        }

        .indicator-status {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .breaking-news {
          padding: 40px 0;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .breaking-badge {
          font-size: 0.8rem;
          padding: 4px 8px;
          background: rgba(239, 68, 68, 0.2);
          border-radius: 4px;
          color: #ef4444;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .breaking-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .breaking-card {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .breaking-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 0.9rem;
        }

        .breaking-source {
          font-weight: 600;
          color: #ef4444;
        }

        .breaking-time {
          color: rgba(255, 255, 255, 0.7);
        }

        .breaking-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .breaking-summary {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .breaking-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filters-section {
          padding: 40px 0;
          background: rgba(0, 0, 0, 0.2);
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

        .search-input {
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          min-width: 200px;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
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
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.4);
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
          background: rgba(59, 130, 246, 0.2);
          color: white;
        }

        .news-content {
          padding: 60px 0;
        }

        .content-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 40px;
        }

        .main-news {
          min-width: 0;
        }

        .section-header {
          margin-bottom: 32px;
        }

        .section-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 8px;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        .news-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .news-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .news-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .news-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .news-category {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 4px 8px;
          background: rgba(59, 130, 246, 0.8);
          color: white;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .news-content {
          padding: 20px;
        }

        .news-meta {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .news-source {
          font-weight: 600;
          color: #3b82f6;
        }

        .news-title {
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .news-summary {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          margin-bottom: 16px;
          font-size: 0.9rem;
        }

        .news-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .news-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .news-tag {
          padding: 2px 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .news-metrics {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-end;
          font-size: 0.8rem;
        }

        .news-impact {
          font-weight: 500;
          text-transform: capitalize;
        }

        .news-views {
          color: rgba(255, 255, 255, 0.6);
        }

        .news-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .news-list-item {
          display: flex;
          gap: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .news-list-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .list-image {
          width: 120px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .list-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .list-content {
          flex: 1;
          min-width: 0;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .list-meta {
          display: flex;
          gap: 12px;
          font-size: 0.8rem;
        }

        .list-metrics {
          display: flex;
          gap: 8px;
          font-size: 0.8rem;
        }

        .list-title {
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .list-summary {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          margin-bottom: 12px;
          font-size: 0.9rem;
        }

        .list-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .news-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sidebar-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          backdrop-filter: blur(10px);
        }

        .sidebar-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: #3b82f6;
        }

        .top-stories {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .story-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .story-rank {
          width: 24px;
          height: 24px;
          background: #3b82f6;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        .story-content {
          flex: 1;
          min-width: 0;
        }

        .story-title {
          font-size: 0.9rem;
          font-weight: 500;
          line-height: 1.3;
          margin-bottom: 4px;
        }

        .story-meta {
          display: flex;
          gap: 8px;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .trending-topics {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .trending-tag {
          padding: 6px 10px;
          background: rgba(59, 130, 246, 0.2);
          border-radius: 6px;
          font-size: 0.8rem;
          color: #3b82f6;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .trending-tag:hover {
          background: rgba(59, 130, 246, 0.3);
        }

        .market-movers {
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
          border-radius: 6px;
        }

        .mover-symbol {
          font-weight: 600;
          color: #3b82f6;
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

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .sentiment-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .sentiment-indicators {
            grid-template-columns: repeat(2, 1fr);
          }

          .breaking-grid {
            grid-template-columns: 1fr;
          }

          .filters-container {
            flex-direction: column;
            gap: 16px;
          }

          .content-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .news-grid {
            grid-template-columns: 1fr;
          }

          .news-list-item {
            flex-direction: column;
          }

          .list-image {
            width: 100%;
            height: 150px;
          }
        }
      `}</style>
    </>
  )
}

export default NewsPage 