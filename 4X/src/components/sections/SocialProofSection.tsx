import React from 'react'

const SocialProofSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Professional Trader',
      company: 'Goldman Sachs',
      avatar: '👩‍💼',
      rating: 5,
      text: 'The AI predictions have increased my trading accuracy by 40%. This platform is a game-changer for professional traders.',
      profit: '+$127K',
      timeframe: '6 months'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Portfolio Manager',
      company: 'BlackRock',
      avatar: '👨‍💼',
      rating: 5,
      text: 'Real-time market analysis and AI insights have transformed how we make investment decisions. Absolutely incredible.',
      profit: '+$89K',
      timeframe: '4 months'
    },
    {
      id: 3,
      name: 'Emily Johnson',
      role: 'Crypto Investor',
      company: 'Independent',
      avatar: '👩‍💻',
      rating: 5,
      text: 'The cryptocurrency analysis is spot-on. I\'ve never seen such accurate predictions for volatile markets.',
      profit: '+$234K',
      timeframe: '8 months'
    }
  ]

  const stats = [
    {
      icon: '👥',
      value: '100,000+',
      label: 'Active Traders',
      description: 'Professional traders worldwide'
    },
    {
      icon: '💰',
      value: '$2.5B+',
      label: 'Volume Analyzed',
      description: 'Daily trading volume processed'
    },
    {
      icon: '🎯',
      value: '94.7%',
      label: 'AI Accuracy',
      description: 'Prediction accuracy rate'
    },
    {
      icon: '🌍',
      value: '150+',
      label: 'Countries',
      description: 'Global market coverage'
    }
  ]

  const companies = [
    { name: 'Goldman Sachs', logo: '🏦' },
    { name: 'JPMorgan', logo: '🏛️' },
    { name: 'BlackRock', logo: '⚫' },
    { name: 'Vanguard', logo: '🔺' },
    { name: 'Fidelity', logo: '💎' },
    { name: 'Charles Schwab', logo: '📊' }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ⭐
      </span>
    ))
  }

  return (
    <section className="social-proof-section">
      <div className="container">
        {/* Stats Section */}
        <div className="stats-showcase">
          <div className="stats-header">
            <h2 className="stats-title">Trusted by Professionals Worldwide</h2>
            <p className="stats-subtitle">
              Join thousands of successful traders who rely on our AI-powered platform
            </p>
          </div>
          
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-description">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-showcase">
          <div className="testimonials-header">
            <h2 className="testimonials-title">What Our Traders Say</h2>
            <p className="testimonials-subtitle">
              Real results from real traders using our AI-powered platform
            </p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    <span className="avatar-emoji">{testimonial.avatar}</span>
                  </div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                    <p className="testimonial-company">{testimonial.company}</p>
                  </div>
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <blockquote className="testimonial-text">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="testimonial-results">
                  <div className="result-item">
                    <span className="result-label">Profit:</span>
                    <span className="result-value profit">{testimonial.profit}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Timeframe:</span>
                    <span className="result-value">{testimonial.timeframe}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Companies Section */}
        <div className="companies-showcase">
          <h3 className="companies-title">Trusted by Leading Financial Institutions</h3>
          <div className="companies-grid">
            {companies.map((company, index) => (
              <div key={index} className="company-item">
                <span className="company-logo">{company.logo}</span>
                <span className="company-name">{company.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Awards Section */}
        <div className="awards-showcase">
          <h3 className="awards-title">Industry Recognition</h3>
          <div className="awards-grid">
            <div className="award-item">
              <span className="award-icon">🏆</span>
              <div className="award-content">
                <h4 className="award-name">Best AI Trading Platform 2024</h4>
                <p className="award-organization">FinTech Awards</p>
              </div>
            </div>
            <div className="award-item">
              <span className="award-icon">🥇</span>
              <div className="award-content">
                <h4 className="award-name">Innovation in Financial Technology</h4>
                <p className="award-organization">TechCrunch Disrupt</p>
              </div>
            </div>
            <div className="award-item">
              <span className="award-icon">⭐</span>
              <div className="award-content">
                <h4 className="award-name">Top Rated Trading Platform</h4>
                <p className="award-organization">Trustpilot Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialProofSection 