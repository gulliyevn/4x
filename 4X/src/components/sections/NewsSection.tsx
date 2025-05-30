'use client'

import React from 'react'
import Link from 'next/link'

const NewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: 'AI Predicts Major Market Movement in Tech Stocks',
      excerpt: 'Our advanced AI algorithms have identified significant patterns suggesting a potential 15% movement in major tech stocks over the next 48 hours.',
      category: 'AI Analysis',
      readTime: '3 min read',
      timestamp: '2 hours ago',
      image: '🤖',
      sentiment: 'bullish',
      confidence: 94.7
    },
    {
      id: 2,
      title: 'Federal Reserve Decision Impact on Cryptocurrency Markets',
      excerpt: 'Analysis of how the latest Federal Reserve interest rate decision is affecting Bitcoin, Ethereum, and other major cryptocurrencies.',
      category: 'Market Analysis',
      readTime: '5 min read',
      timestamp: '4 hours ago',
      image: '🏛️',
      sentiment: 'neutral',
      confidence: 87.3
    },
    {
      id: 3,
      title: 'Breaking: Major Oil Discovery Affects Energy Sector',
      excerpt: 'A significant oil discovery in the North Sea is causing ripple effects across energy stocks and commodity markets worldwide.',
      category: 'Breaking News',
      readTime: '2 min read',
      timestamp: '6 hours ago',
      image: '⚡',
      sentiment: 'bullish',
      confidence: 91.2
    },
    {
      id: 4,
      title: 'Forex Market Volatility: EUR/USD Analysis',
      excerpt: 'Deep dive into the current EUR/USD volatility patterns and what our AI models predict for the coming week.',
      category: 'Forex',
      readTime: '4 min read',
      timestamp: '8 hours ago',
      image: '💱',
      sentiment: 'bearish',
      confidence: 89.5
    }
  ]

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return '#10b981'
      case 'bearish': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return '📈'
      case 'bearish': return '📉'
      default: return '➡️'
    }
  }

  return (
    <section className="news-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Latest Market Intelligence
            <span className="ai-badge">
              <span className="ai-icon">🧠</span>
              AI-Powered
            </span>
          </h2>
          <p className="section-subtitle">
            Stay ahead with real-time market news, AI-driven analysis, and expert insights
          </p>
        </div>
        
        <div className="news-grid">
          {newsItems.map((item) => (
            <article key={item.id} className="news-card">
              <div className="news-header">
                <div className="news-image">
                  <span className="news-emoji">{item.image}</span>
                </div>
                <div className="news-meta">
                  <span className="news-category">{item.category}</span>
                  <span className="news-timestamp">{item.timestamp}</span>
                </div>
              </div>

              <div className="news-content">
                <h3 className="news-title">
                  <Link href={`/news/${item.id}`}>
                    {item.title}
                  </Link>
                </h3>
                <p className="news-excerpt">{item.excerpt}</p>
              </div>

              <div className="news-footer">
                <div className="news-stats">
                  <span className="read-time">
                    <span className="stat-icon">⏱️</span>
                    {item.readTime}
                  </span>
                  <div className="sentiment-indicator">
                    <span className="sentiment-icon">{getSentimentIcon(item.sentiment)}</span>
                    <span 
                      className="sentiment-text"
                      style={{ color: getSentimentColor(item.sentiment) }}
                    >
                      {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="ai-confidence">
                  <span className="confidence-label">AI Confidence:</span>
                  <div className="confidence-bar">
                    <div 
                      className="confidence-fill"
                      style={{ 
                        width: `${item.confidence}%`,
                        backgroundColor: getSentimentColor(item.sentiment)
                      }}
                    ></div>
                  </div>
                  <span className="confidence-value">{item.confidence}%</span>
                </div>
              </div>
          </article>
          ))}
        </div>

        <div className="news-actions">
          <Link href="/news" className="btn btn-primary">
            <span className="btn-icon">📰</span>
            View All News
          </Link>
          <Link href="/ai-insights" className="btn btn-secondary">
            <span className="btn-icon">🔮</span>
            AI Market Predictions
          </Link>
        </div>
        
        <div className="news-sources">
          <p className="sources-title">Trusted News Sources:</p>
          <div className="sources-list">
            <span className="source-item">📊 Bloomberg</span>
            <span className="source-item">📈 Reuters</span>
            <span className="source-item">💼 Financial Times</span>
            <span className="source-item">🌐 MarketWatch</span>
            <span className="source-item">📱 Yahoo Finance</span>
          </div>
        </div>
      </div>
    </section>
  )
} 

export default NewsSection 