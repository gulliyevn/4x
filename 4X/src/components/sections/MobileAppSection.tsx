import React, { useState } from 'react'
import Link from 'next/link'

const MobileAppSection = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  const mobileFeatures = [
    {
      id: 0,
      title: 'Real-Time Trading',
      description: 'Execute trades instantly with our lightning-fast mobile interface. Get real-time quotes, charts, and market data wherever you are.',
      icon: '⚡',
      benefits: [
        'Instant order execution',
        'Real-time price alerts',
        'Advanced charting tools',
        'One-tap trading'
      ]
    },
    {
      id: 1,
      title: 'AI-Powered Insights',
      description: 'Access our full suite of AI predictions and market analysis directly on your mobile device with the same accuracy as desktop.',
      icon: '🤖',
      benefits: [
        '94.7% prediction accuracy',
        'Smart notifications',
        'Personalized insights',
        'Voice-activated commands'
      ]
    },
    {
      id: 2,
      title: 'Biometric Security',
      description: 'Advanced security features including Face ID, Touch ID, and encrypted data storage to keep your investments safe.',
      icon: '🔐',
      benefits: [
        'Face ID / Touch ID login',
        'End-to-end encryption',
        'Secure PIN backup',
        'Device authentication'
      ]
    },
    {
      id: 3,
      title: 'Offline Mode',
      description: 'Continue monitoring your portfolio and accessing key features even when you\'re offline or have poor connectivity.',
      icon: '📱',
      benefits: [
        'Offline portfolio view',
        'Cached market data',
        'Sync when connected',
        'Emergency trading mode'
      ]
    }
  ]

  const appStats = [
    { label: 'App Store Rating', value: '4.9', unit: '⭐' },
    { label: 'Downloads', value: '500K+', unit: '📱' },
    { label: 'Daily Active Users', value: '85K+', unit: '👥' },
    { label: 'Countries Available', value: '150+', unit: '🌍' }
  ]

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Day Trader',
      avatar: '👨‍💼',
      text: 'The mobile app is incredibly fast and reliable. I can trade on the go without missing any opportunities.',
      rating: 5
    },
    {
      name: 'Sarah Williams',
      role: 'Portfolio Manager',
      avatar: '👩‍💼',
      text: 'AI insights on mobile are game-changing. I get the same quality analysis as the desktop platform.',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'Crypto Investor',
      avatar: '👨‍💻',
      text: 'Biometric security gives me peace of mind. The app is both secure and user-friendly.',
      rating: 5
    }
  ]

  return (
    <section className="mobile-app-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Trade Anywhere with Our
            <span className="gradient-text"> Mobile App</span>
          </h2>
          <p className="section-subtitle">
            Experience the full power of our AI trading platform on your mobile device. 
            Available for iOS and Android with all desktop features included.
          </p>
        </div>

        <div className="mobile-content">
          {/* App Preview */}
          <div className="app-preview">
            <div className="phone-mockup">
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="app-interface">
                    <div className="app-header">
                      <div className="status-bar">
                        <span className="time">9:41</span>
                        <div className="indicators">
                          <span className="signal">📶</span>
                          <span className="wifi">📶</span>
                          <span className="battery">🔋</span>
                        </div>
                      </div>
                      <div className="app-nav">
                        <h3 className="app-title">4X Analytics</h3>
                        <div className="nav-icons">
                          <span className="nav-icon">🔔</span>
                          <span className="nav-icon">⚙️</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="app-content">
                      <div className="portfolio-summary">
                        <div className="portfolio-value">
                          <span className="value-label">Portfolio Value</span>
                          <span className="value-amount">$127,450.89</span>
                          <span className="value-change positive">+$2,340.56 (+1.87%)</span>
                        </div>
                      </div>
                      
                      <div className="quick-actions">
                        <div className="action-btn">
                          <span className="action-icon">💹</span>
                          <span className="action-text">Trade</span>
                        </div>
                        <div className="action-btn">
                          <span className="action-icon">📊</span>
                          <span className="action-text">Charts</span>
                        </div>
                        <div className="action-btn">
                          <span className="action-icon">🤖</span>
                          <span className="action-text">AI Insights</span>
                        </div>
                        <div className="action-btn">
                          <span className="action-icon">📰</span>
                          <span className="action-text">News</span>
                        </div>
                      </div>
                      
                      <div className="market-overview">
                        <div className="market-item">
                          <span className="symbol">BTC/USD</span>
                          <span className="price">$43,567</span>
                          <span className="change positive">+2.34%</span>
                        </div>
                        <div className="market-item">
                          <span className="symbol">ETH/USD</span>
                          <span className="price">$2,678</span>
                          <span className="change negative">-1.23%</span>
                        </div>
                        <div className="market-item">
                          <span className="symbol">S&P 500</span>
                          <span className="price">4,567</span>
                          <span className="change positive">+0.89%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Showcase */}
          <div className="features-showcase">
            <div className="features-tabs">
              {mobileFeatures.map((feature, index) => (
                <button
                  key={feature.id}
                  className={`feature-tab ${activeFeature === index ? 'active' : ''}`}
                  onClick={() => setActiveFeature(index)}
                >
                  <span className="tab-icon">{feature.icon}</span>
                  <span className="tab-title">{feature.title}</span>
                </button>
              ))}
            </div>

            <div className="feature-content">
              <div className="feature-details">
                <h3 className="feature-title">
                  <span className="feature-icon">{mobileFeatures[activeFeature].icon}</span>
                  {mobileFeatures[activeFeature].title}
                </h3>
                <p className="feature-description">
                  {mobileFeatures[activeFeature].description}
                </p>
                <ul className="feature-benefits">
                  {mobileFeatures[activeFeature].benefits.map((benefit, index) => (
                    <li key={index} className="benefit-item">
                      <span className="benefit-icon">✓</span>
                      <span className="benefit-text">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* App Statistics */}
        <div className="app-stats">
          <h3 className="stats-title">Trusted by Traders Worldwide</h3>
          <div className="stats-grid">
            {appStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.unit}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="download-section">
          <div className="download-content">
            <h3 className="download-title">Download Now</h3>
            <p className="download-subtitle">
              Get started with our mobile app and take your trading to the next level
            </p>
            <div className="download-buttons">
              <Link href="#" className="download-btn ios">
                <div className="btn-icon">🍎</div>
                <div className="btn-content">
                  <span className="btn-subtitle">Download on the</span>
                  <span className="btn-title">App Store</span>
                </div>
              </Link>
              <Link href="#" className="download-btn android">
                <div className="btn-icon">🤖</div>
                <div className="btn-content">
                  <span className="btn-subtitle">Get it on</span>
                  <span className="btn-title">Google Play</span>
                </div>
              </Link>
            </div>
            <div className="qr-code-section">
              <div className="qr-code">
                <div className="qr-placeholder">
                  <span className="qr-icon">📱</span>
                  <span className="qr-text">QR Code</span>
                </div>
              </div>
              <p className="qr-description">Scan to download</p>
            </div>
          </div>
        </div>

        {/* Mobile Testimonials */}
        <div className="mobile-testimonials">
          <h3 className="testimonials-title">What Mobile Users Say</h3>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div className="testimonial-info">
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role}</div>
                  </div>
                  <div className="testimonial-rating">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileAppSection 