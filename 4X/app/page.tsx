'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../src/components/Navigation'
import TrustIndicators from '../src/components/sections/TrustIndicators'
import LiveDataSection from '../src/components/sections/LiveDataSection'
import NewsSection from '../src/components/sections/NewsSection'
import SocialProofSection from '../src/components/sections/SocialProofSection'
import FAQSection from '../src/components/sections/FAQSection'
import PerformanceDashboard from '../src/components/sections/PerformanceDashboard'
import MobileAppSection from '../src/components/sections/MobileAppSection'
import InteractiveDemo from '../src/components/sections/InteractiveDemo'
import EducationCenter from '../src/components/sections/EducationCenter'
import './page-styles.css'
import './enhanced-styles.css'

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [marketStatus, setMarketStatus] = useState('OPEN')
  const [liveData, setLiveData] = useState({
    sp500: { price: 4567.89, change: 1.23, changePercent: 0.027 },
    nasdaq: { price: 14234.56, change: -23.45, changePercent: -0.164 },
    bitcoin: { price: 43567.89, change: 567.23, changePercent: 1.32 },
    eurusd: { price: 1.0876, change: 0.0023, changePercent: 0.21 }
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate live data updates
      setLiveData(prev => ({
        sp500: { 
          ...prev.sp500, 
          price: prev.sp500.price + (Math.random() - 0.5) * 2,
          change: prev.sp500.change + (Math.random() - 0.5) * 0.5
        },
        nasdaq: { 
          ...prev.nasdaq, 
          price: prev.nasdaq.price + (Math.random() - 0.5) * 10,
          change: prev.nasdaq.change + (Math.random() - 0.5) * 2
        },
        bitcoin: { 
          ...prev.bitcoin, 
          price: prev.bitcoin.price + (Math.random() - 0.5) * 100,
          change: prev.bitcoin.change + (Math.random() - 0.5) * 50
        },
        eurusd: { 
          ...prev.eurusd, 
          price: prev.eurusd.price + (Math.random() - 0.5) * 0.001,
          change: prev.eurusd.change + (Math.random() - 0.5) * 0.0005
        }
      }))
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const formatPrice = (price: number, decimals: number = 2) => {
    return price.toFixed(decimals)
  }

  const formatChange = (change: number, percent: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)} (${sign}${percent.toFixed(2)}%)`
  }

  return (
    <div className="page-container">
      <Navigation />
      
      {/* Market Ticker */}
      <div className="market-ticker">
        <div className="ticker-container">
          <div className="ticker-scroll">
            <div className="ticker-item">
              <span className="ticker-symbol">S&P 500</span>
              <span className="ticker-price">{formatPrice(liveData.sp500.price)}</span>
              <span className={`ticker-change ${liveData.sp500.change >= 0 ? 'positive' : 'negative'}`}>
                {formatChange(liveData.sp500.change, liveData.sp500.changePercent)}
              </span>
            </div>
            <div className="ticker-item">
              <span className="ticker-symbol">NASDAQ</span>
              <span className="ticker-price">{formatPrice(liveData.nasdaq.price)}</span>
              <span className={`ticker-change ${liveData.nasdaq.change >= 0 ? 'positive' : 'negative'}`}>
                {formatChange(liveData.nasdaq.change, liveData.nasdaq.changePercent)}
              </span>
            </div>
            <div className="ticker-item">
              <span className="ticker-symbol">BTC/USD</span>
              <span className="ticker-price">${formatPrice(liveData.bitcoin.price)}</span>
              <span className={`ticker-change ${liveData.bitcoin.change >= 0 ? 'positive' : 'negative'}`}>
                {formatChange(liveData.bitcoin.change, liveData.bitcoin.changePercent)}
              </span>
            </div>
            <div className="ticker-item">
              <span className="ticker-symbol">EUR/USD</span>
              <span className="ticker-price">{formatPrice(liveData.eurusd.price, 4)}</span>
              <span className={`ticker-change ${liveData.eurusd.change >= 0 ? 'positive' : 'negative'}`}>
                {formatChange(liveData.eurusd.change, liveData.eurusd.changePercent)}
              </span>
            </div>
          </div>
          <div className="market-status">
            <span className="status-dot"></span>
            <span className="status-text">Markets {marketStatus}</span>
            <span className="status-time">{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Video Background */}
        <div className="hero-video-container">
          <video 
            className="hero-video"
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
            <source src="/videos/hero-background.webm" type="video/webm" />
            {/* Fallback for browsers that don't support video */}
            Your browser does not support the video tag.
          </video>
          <div className="hero-video-overlay"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-icon">🚀</span>
                <span className="badge-text">Next-Generation Trading Platform</span>
              </div>
              
              <h1 className="hero-title">
                Create Your Reality
                <br />
                <span className="gradient-text hero-subtitle-text">AI-Powered Financial Intelligence</span>
              </h1>
              
              <div className="hero-buttons">
                <Link href="/ai-insights" className="btn btn-primary btn-lg">
                  <span className="btn-icon">🤖</span>
                  Start AI Analysis
                </Link>
                <Link href="/education" className="btn btn-secondary btn-lg">
                  <span className="btn-icon">📚</span>
                  Learn Trading
                </Link>
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">94.7%</span>
                  <span className="stat-label">AI Accuracy</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100K+</span>
                  <span className="stat-label">Active Users</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">$2.5B+</span>
                  <span className="stat-label">Volume Analyzed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">AI Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Trust Indicators Section */}
      <TrustIndicators />

      {/* NEW: Live Data Section */}
      <LiveDataSection />

      {/* AI Features Section */}
      <section className="ai-features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Powered by <span className="gradient-text">Artificial Intelligence</span>
            </h2>
            <p className="section-subtitle">
              Our advanced AI algorithms analyze millions of data points in real-time to provide 
              you with the most accurate market insights and trading opportunities.
            </p>
          </div>
          
          <div className="ai-features-grid">
            <div className="ai-feature-card">
              <div className="feature-header">
                <div className="feature-icon">🔮</div>
                <div className="feature-badge">94.7% Accuracy</div>
              </div>
              <h3 className="feature-title">Price Predictions</h3>
              <p className="feature-description">
                Advanced machine learning models predict price movements with industry-leading accuracy.
              </p>
              <div className="feature-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span className="highlight-text">Real-time predictions</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span className="highlight-text">Multiple timeframes</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span className="highlight-text">Risk assessment</span>
                </div>
              </div>
              <div className="feature-stats">
                <div className="stat-item">
                  <span className="stat-value">1M+</span>
                  <span className="stat-label">Predictions</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">50+</span>
                  <span className="stat-label">Assets</span>
                </div>
              </div>
            </div>

            <div className="ai-feature-card">
              <div className="feature-header">
                <div className="feature-icon">📊</div>
                <div className="feature-badge">Real-time</div>
              </div>
              <h3 className="feature-title">Sentiment Analysis</h3>
              <p className="feature-description">
                Monitor market sentiment across news, social media, and trading data for informed decisions.
              </p>
              <div className="feature-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span className="highlight-text">News sentiment</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span className="highlight-text">Social media analysis</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span className="highlight-text">Market psychology</span>
                </div>
              </div>
              <div className="feature-stats">
                <div className="stat-item">
                  <span className="stat-value">1M+</span>
                  <span className="stat-label">Sources</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">24/7</span>
                  <span className="stat-label">Monitoring</span>
                </div>
              </div>
            </div>

            <div className="ai-feature-card">
              <div className="feature-header">
                <div className="feature-icon">🎯</div>
                <div className="feature-badge">Advanced</div>
              </div>
              <h3 className="feature-title">Pattern Recognition</h3>
              <p className="feature-description">
                Identify complex chart patterns and trading opportunities with AI-powered pattern recognition.
              </p>
              <div className="feature-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span className="highlight-text">50+ patterns</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span className="highlight-text">Auto-detection</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span className="highlight-text">Success probability</span>
                </div>
              </div>
              <div className="feature-stats">
                <div className="stat-item">
                  <span className="stat-value">87%</span>
                  <span className="stat-label">Win Rate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">50+</span>
                  <span className="stat-label">Patterns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <InteractiveDemo />

      {/* Markets Section */}
      <section className="markets-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Global Markets Coverage</h2>
            <p className="section-subtitle">
              Access comprehensive analysis across all major asset classes with real-time data and AI insights.
            </p>
          </div>
          
          <div className="markets-grid">
            <Link href="/markets/stocks" className="market-card">
              <div className="market-header">
                <div className="market-icon">📈</div>
                <div className="market-badge">10,000+ Stocks</div>
              </div>
              <h3 className="market-title">Stock Markets</h3>
              <p className="market-description">
                Comprehensive stock analysis with AI-powered insights across 50+ global exchanges.
              </p>
              <div className="market-stats">
                <div className="market-stat">
                  <span className="stat-label">Exchanges</span>
                  <span className="stat-value">50+</span>
                </div>
                <div className="market-stat">
                  <span className="stat-label">Stocks</span>
                  <span className="stat-value">10,000+</span>
                </div>
              </div>
            </Link>

            <Link href="/markets/cryptocurrency" className="market-card">
              <div className="market-header">
                <div className="market-icon">₿</div>
                <div className="market-badge">5,000+ Cryptos</div>
              </div>
              <h3 className="market-title">Cryptocurrency</h3>
              <p className="market-description">
                Advanced crypto analysis with DeFi metrics, on-chain data, and sentiment tracking.
              </p>
              <div className="market-stats">
                <div className="market-stat">
                  <span className="stat-label">Cryptocurrencies</span>
                  <span className="stat-value">5,000+</span>
                </div>
                <div className="market-stat">
                  <span className="stat-label">DeFi Protocols</span>
                  <span className="stat-value">500+</span>
                </div>
              </div>
            </Link>

            <Link href="/markets/forex" className="market-card">
              <div className="market-header">
                <div className="market-icon">💱</div>
                <div className="market-badge">100+ Pairs</div>
              </div>
              <h3 className="market-title">Forex Trading</h3>
              <p className="market-description">
                Professional forex analysis with central bank data, economic indicators, and AI predictions.
              </p>
              <div className="market-stats">
                <div className="market-stat">
                  <span className="stat-label">Currency Pairs</span>
                  <span className="stat-value">100+</span>
                </div>
                <div className="market-stat">
                  <span className="stat-label">Central Banks</span>
                  <span className="stat-value">20+</span>
                </div>
              </div>
            </Link>

            <Link href="/markets/commodities" className="market-card">
              <div className="market-header">
                <div className="market-icon">🥇</div>
                <div className="market-badge">50+ Commodities</div>
              </div>
              <h3 className="market-title">Commodities</h3>
              <p className="market-description">
                Track precious metals, energy, and agricultural commodities with supply-demand analysis.
              </p>
              <div className="market-stats">
                <div className="market-stat">
                  <span className="stat-label">Commodities</span>
                  <span className="stat-value">50+</span>
                </div>
                <div className="market-stat">
                  <span className="stat-label">Futures</span>
                  <span className="stat-value">200+</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* NEW: News Section */}
      <NewsSection />

      {/* NEW: Social Proof Section */}
      <SocialProofSection />

      {/* NEW: Performance Dashboard */}
      <PerformanceDashboard />

      {/* NEW: Mobile App Section */}
      <MobileAppSection />

      {/* NEW: Education Center */}
      <EducationCenter />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Transform Your Trading?
            </h2>
            <p className="cta-subtitle">
              Join over 100,000 professional traders who trust our AI-powered platform 
              for superior market insights and trading performance.
            </p>
            <div className="cta-buttons">
              <Link href="/ai-insights" className="btn btn-primary btn-lg">
                <span className="btn-icon">🚀</span>
                Start Free Trial
              </Link>
              <Link href="/education" className="btn btn-ghost btn-lg">
                <span className="btn-icon">📞</span>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">4X Analytics</h3>
              <p className="footer-description">
                Professional AI-powered trading platform trusted by traders worldwide.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link">📧</a>
                <a href="#" className="social-link">📱</a>
                <a href="#" className="social-link">🐦</a>
                <a href="#" className="social-link">💼</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-title">Platform</h4>
              <ul className="footer-links">
                <li><Link href="/ai-insights">AI Intelligence</Link></li>
                <li><Link href="/markets">Markets</Link></li>
                <li><Link href="/charts">Charts & Tools</Link></li>
                <li><Link href="/news">News & Analysis</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-title">Education</h4>
              <ul className="footer-links">
                <li><Link href="/education">Trading Academy</Link></li>
                <li><Link href="/education/webinars">Live Webinars</Link></li>
                <li><Link href="/education/ai-trading">AI Trading Course</Link></li>
                <li><Link href="/education/strategies">Strategies</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/press">Press</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 4X Analytics Professional Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 