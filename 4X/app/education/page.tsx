import Link from 'next/link';
import Navigation from '../../src/components/Navigation';

export default function EducationPage() {
  return (
    <div className="page-container">
      <Navigation />
      
      {/* Education Header */}
      <section className="education-header">
        <div className="container">
          <div className="education-title-section">
            <h1 className="education-title">
              📚 Trading Academy
            </h1>
            <p className="education-subtitle">
              Master trading and market analysis with our comprehensive educational platform featuring AI-powered learning, expert courses, and hands-on practice
            </p>
            <div className="education-stats">
              <div className="stat-item">
                <span className="stat-number">50,000+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Choose Your Learning Path</h2>
            <p className="section-subtitle">
              Structured learning paths designed for different experience levels
            </p>
          </div>

          <div className="learning-paths-grid">
            {/* Beginner Path */}
            <Link href="/education/beginner" className="learning-path-card">
              <div className="path-header">
                <div className="path-level beginner">Beginner</div>
                <div className="path-duration">4-6 weeks</div>
              </div>
              <h3 className="path-title">Trading Fundamentals</h3>
              <p className="path-description">
                Start your trading journey with essential concepts, market basics, and risk management principles.
              </p>
              <div className="path-curriculum">
                <div className="curriculum-item">
                  <span className="curriculum-icon">📖</span>
                  <span className="curriculum-text">Market Basics & Terminology</span>
                </div>
                <div className="curriculum-item">
                  <span className="curriculum-icon">📊</span>
                  <span className="curriculum-text">Chart Reading Fundamentals</span>
                </div>
                <div className="curriculum-item">
                  <span className="curriculum-icon">🛡️</span>
                  <span className="curriculum-text">Risk Management Essentials</span>
                </div>
                <div className="curriculum-item">
                  <span className="curriculum-icon">🧠</span>
                  <span className="curriculum-text">Trading Psychology</span>
                </div>
              </div>
              <div className="path-stats">
                <div className="path-stat">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Courses</span>
                </div>
                <div className="path-stat">
                  <span className="stat-value">24h</span>
                  <span className="stat-label">Content</span>
                </div>
                <div className="path-stat">
                  <span className="stat-value">Free</span>
                  <span className="stat-label">Access</span>
                </div>
              </div>
            </Link>

            {/* Intermediate Path */}
            <Link href="/education/intermediate" className="learning-path-card">
              <div className="path-header">
                <div className="path-level intermediate">Intermediate</div>
                <div className="path-duration">6-8 weeks</div>
              </div>
              <h3 className="path-title">Technical Analysis Mastery</h3>
              <p className="path-description">
                Deep dive into technical analysis, chart patterns, indicators, and advanced trading strategies.
              </p>
              <div className="path-curriculum">
                <div className="curriculum-item">
                  <span className="curriculum-icon">📈</span>
                  <span className="curriculum-text">Advanced Chart Patterns</span>
                </div>
                <div className="curriculum-item">
                  <span className="curriculum-icon">🔢</span>
                  <span className="curriculum-text">Technical Indicators</span>
                </div>
                <div className="curriculum-item">
                  <span className="curriculum-icon">📊</span>
                  <span className="curriculum-text">Volume Analysis</span>
                </div>
                <div className="curriculum-item">
                  <span className="curriculum-icon">🎯</span>
                  <span className="curriculum-text">Trading Strategies</span>
                </div>
              </div>
              <div className="path-stats">
                <div className="path-stat">
                  <span className="stat-value">18</span>
                  <span className="stat-label">Courses</span>
                </div>
                <div className="path-stat">
                  <span className="stat-value">36h</span>
                  <span className="stat-label">Content</span>
                </div>
                <div className="path-stat">
                  <span className="stat-value">$49</span>
                  <span className="stat-label">Monthly</span>
                </div>
              </div>
            </Link>

            {/* Advanced Path */}
            <Link href="/education/advanced" className="learning-path-card">
              <div className="path-header">
                <div className="path-level advanced">Advanced</div>
                <div className="path-duration">8-12 weeks</div>
              </div>
              <h3 className="path-title">Professional Trading</h3>
              <p className="path-description">
                Master advanced concepts including options, derivatives, portfolio management, and institutional strategies.
              </p>
              <div className="path-curriculum">
                <div className="curriculum-item">
                  <span className="curriculum-icon">📋</span>
                  <span className="curriculum-text">Options & Derivatives</span>
                </div>
                <div className="curriculum-item">
                  <span className="curriculum-icon">💼</span>
                  <span className="curriculum-text">Portfolio Management</span>
                </div>
                <div className="curriculum-item">
                  <span className="curriculum-icon">🏛️</span>
                  <span className="curriculum-text">Institutional Strategies</span>
                </div>
                <div className="curriculum-item">
                  <span className="curriculum-icon">⚖️</span>
                  <span className="curriculum-text">Risk Models</span>
                </div>
              </div>
              <div className="path-stats">
                <div className="path-stat">
                  <span className="stat-value">25</span>
                  <span className="stat-label">Courses</span>
                </div>
                <div className="path-stat">
                  <span className="stat-value">50h</span>
                  <span className="stat-label">Content</span>
                </div>
                <div className="path-stat">
                  <span className="stat-value">$99</span>
                  <span className="stat-label">Monthly</span>
                </div>
              </div>
            </Link>

            {/* AI Trading Path */}
            <Link href="/education/ai-trading" className="learning-path-card featured">
              <div className="path-header">
                <div className="path-level ai">AI Trading</div>
                <div className="path-duration">10-14 weeks</div>
              </div>
              <h3 className="path-title">AI & Algorithmic Trading</h3>
              <p className="path-description">
                Learn cutting-edge AI trading techniques, machine learning models, and algorithmic strategy development.
              </p>
              <div className="path-curriculum">
                <div className="curriculum-item">
                  <span className="curriculum-icon">🤖</span>
                  <span className="curriculum-text">Machine Learning for Trading</span>
                </div>
                <div className="curriculum-item">
                  <span className="curriculum-icon">🧠</span>
                  <span className="curriculum-text">Neural Networks</span>
                </div>
                <div className="curriculum-item">
                  <span className="curriculum-icon">📊</span>
                  <span className="curriculum-text">Quantitative Analysis</span>
                </div>
                <div className="curriculum-item">
                  <span className="curriculum-icon">⚡</span>
                  <span className="curriculum-text">Algorithm Development</span>
                </div>
              </div>
              <div className="path-stats">
                <div className="path-stat">
                  <span className="stat-value">30</span>
                  <span className="stat-label">Courses</span>
                </div>
                <div className="path-stat">
                  <span className="stat-value">60h</span>
                  <span className="stat-label">Content</span>
                </div>
                <div className="path-stat">
                  <span className="stat-value">$149</span>
                  <span className="stat-label">Monthly</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Courses</h2>
            <p className="section-subtitle">
              Popular courses chosen by our community
            </p>
          </div>

          <div className="courses-grid">
            <div className="course-card">
              <div className="course-image">
                <div className="course-badge">Bestseller</div>
                <div className="course-icon">📊</div>
              </div>
              <div className="course-content">
                <h3 className="course-title">Complete Technical Analysis</h3>
                <p className="course-instructor">By Sarah Johnson, CFA</p>
                <p className="course-description">
                  Master technical analysis from basics to advanced patterns and indicators.
                </p>
                <div className="course-meta">
                  <div className="course-rating">
                    <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating-score">4.9 (2,341)</span>
                  </div>
                  <div className="course-duration">12 hours</div>
                </div>
                <div className="course-price">
                  <span className="price-current">$79</span>
                  <span className="price-original">$129</span>
                </div>
              </div>
            </div>

            <div className="course-card">
              <div className="course-image">
                <div className="course-badge">New</div>
                <div className="course-icon">🤖</div>
              </div>
              <div className="course-content">
                <h3 className="course-title">AI Trading Strategies</h3>
                <p className="course-instructor">By Dr. Michael Chen</p>
                <p className="course-description">
                  Learn to build and deploy AI-powered trading algorithms.
                </p>
                <div className="course-meta">
                  <div className="course-rating">
                    <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating-score">4.8 (856)</span>
                  </div>
                  <div className="course-duration">18 hours</div>
                </div>
                <div className="course-price">
                  <span className="price-current">$149</span>
                  <span className="price-original">$199</span>
                </div>
              </div>
            </div>

            <div className="course-card">
              <div className="course-image">
                <div className="course-badge">Popular</div>
                <div className="course-icon">💰</div>
              </div>
              <div className="course-content">
                <h3 className="course-title">Risk Management Mastery</h3>
                <p className="course-instructor">By Robert Williams</p>
                <p className="course-description">
                  Essential risk management techniques for consistent profitability.
                </p>
                <div className="course-meta">
                  <div className="course-rating">
                    <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating-score">4.9 (1,567)</span>
                  </div>
                  <div className="course-duration">8 hours</div>
                </div>
                <div className="course-price">
                  <span className="price-current">$59</span>
                  <span className="price-original">$99</span>
                </div>
              </div>
            </div>

            <div className="course-card">
              <div className="course-image">
                <div className="course-badge">Expert</div>
                <div className="course-icon">📈</div>
              </div>
              <div className="course-content">
                <h3 className="course-title">Options Trading Strategies</h3>
                <p className="course-instructor">By Lisa Thompson</p>
                <p className="course-description">
                  Advanced options strategies for income generation and hedging.
                </p>
                <div className="course-meta">
                  <div className="course-rating">
                    <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating-score">4.7 (923)</span>
                  </div>
                  <div className="course-duration">15 hours</div>
                </div>
                <div className="course-price">
                  <span className="price-current">$119</span>
                  <span className="price-original">$179</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Learning */}
      <section className="ai-learning-section">
        <div className="container">
          <div className="ai-learning-content">
            <div className="ai-learning-text">
              <h2 className="section-title">🤖 AI-Powered Personalized Learning</h2>
              <p className="section-subtitle">
                Our AI tutor adapts to your learning style and pace for optimal results
              </p>
              <div className="ai-features">
                <div className="ai-feature">
                  <div className="ai-feature-icon">🎯</div>
                  <div className="ai-feature-content">
                    <h3 className="ai-feature-title">Personalized Curriculum</h3>
                    <p className="ai-feature-description">
                      AI analyzes your progress and customizes learning paths
                    </p>
                  </div>
                </div>
                <div className="ai-feature">
                  <div className="ai-feature-icon">💬</div>
                  <div className="ai-feature-content">
                    <h3 className="ai-feature-title">24/7 AI Tutor</h3>
                    <p className="ai-feature-description">
                      Get instant answers and explanations anytime
                    </p>
                  </div>
                </div>
                <div className="ai-feature">
                  <div className="ai-feature-icon">📊</div>
                  <div className="ai-feature-content">
                    <h3 className="ai-feature-title">Progress Analytics</h3>
                    <p className="ai-feature-description">
                      Track your learning with detailed performance metrics
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/education/ai-tutor" className="btn btn-primary btn-lg">
                Try AI Tutor
              </Link>
            </div>
            <div className="ai-learning-visual">
              <div className="ai-chat-demo">
                <div className="chat-header">
                  <div className="chat-avatar">🤖</div>
                  <div className="chat-info">
                    <div className="chat-name">AI Trading Tutor</div>
                    <div className="chat-status">Online</div>
                  </div>
                </div>
                <div className="chat-messages">
                  <div className="chat-message ai">
                    <div className="message-content">
                      Hi! I noticed you're learning about support and resistance. Would you like me to explain how to identify these levels on a chart?
                    </div>
                  </div>
                  <div className="chat-message user">
                    <div className="message-content">
                      Yes, please! I'm having trouble spotting them.
                    </div>
                  </div>
                  <div className="chat-message ai">
                    <div className="message-content">
                      Great! Support levels are price points where buying interest is strong enough to prevent further decline. Let me show you with a visual example...
                    </div>
                  </div>
                </div>
                <div className="chat-input">
                  <input type="text" placeholder="Ask me anything about trading..." />
                  <button>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Learning */}
      <section className="live-learning-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Live Learning Events</h2>
            <p className="section-subtitle">
              Join live webinars, workshops, and trading sessions
            </p>
          </div>

          <div className="live-events-grid">
            <div className="live-event-card">
              <div className="event-header">
                <div className="event-type">Live Webinar</div>
                <div className="event-time">Today, 3:00 PM EST</div>
              </div>
              <h3 className="event-title">Market Analysis: Fed Decision Impact</h3>
              <p className="event-speaker">with Chief Analyst John Smith</p>
              <p className="event-description">
                Analyze the potential market impact of the upcoming Federal Reserve decision.
              </p>
              <div className="event-stats">
                <span className="event-attendees">1,247 registered</span>
                <span className="event-duration">60 minutes</span>
              </div>
              <button className="btn btn-primary">Join Live</button>
            </div>

            <div className="live-event-card">
              <div className="event-header">
                <div className="event-type">Workshop</div>
                <div className="event-time">Tomorrow, 2:00 PM EST</div>
              </div>
              <h3 className="event-title">AI Trading Bot Development</h3>
              <p className="event-speaker">with Dr. Sarah Chen</p>
              <p className="event-description">
                Hands-on workshop building your first AI trading algorithm.
              </p>
              <div className="event-stats">
                <span className="event-attendees">89 registered</span>
                <span className="event-duration">120 minutes</span>
              </div>
              <button className="btn btn-secondary">Register</button>
            </div>

            <div className="live-event-card">
              <div className="event-header">
                <div className="event-type">Trading Session</div>
                <div className="event-time">Friday, 9:30 AM EST</div>
              </div>
              <h3 className="event-title">Live Trading: Market Open</h3>
              <p className="event-speaker">with Pro Trader Mike Johnson</p>
              <p className="event-description">
                Watch and learn from live trading during market opening.
              </p>
              <div className="event-stats">
                <span className="event-attendees">567 registered</span>
                <span className="event-duration">90 minutes</span>
              </div>
              <button className="btn btn-secondary">Register</button>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="learning-resources-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Learning Resources</h2>
            <p className="section-subtitle">
              Comprehensive resources to support your trading education
            </p>
          </div>

          <div className="resources-grid">
            <Link href="/education/ebooks" className="resource-card">
              <div className="resource-icon">📚</div>
              <h3 className="resource-title">E-Books & Guides</h3>
              <p className="resource-description">
                Comprehensive trading guides and strategy books
              </p>
              <div className="resource-count">50+ Books</div>
            </Link>

            <Link href="/education/videos" className="resource-card">
              <div className="resource-icon">🎥</div>
              <h3 className="resource-title">Video Library</h3>
              <p className="resource-description">
                Extensive collection of trading tutorials and analysis
              </p>
              <div className="resource-count">500+ Videos</div>
            </Link>

            <Link href="/education/podcasts" className="resource-card">
              <div className="resource-icon">🎧</div>
              <h3 className="resource-title">Trading Podcasts</h3>
              <p className="resource-description">
                Weekly podcasts with market experts and traders
              </p>
              <div className="resource-count">100+ Episodes</div>
            </Link>

            <Link href="/education/glossary" className="resource-card">
              <div className="resource-icon">📖</div>
              <h3 className="resource-title">Trading Glossary</h3>
              <p className="resource-description">
                Complete dictionary of trading terms and concepts
              </p>
              <div className="resource-count">1000+ Terms</div>
            </Link>

            <Link href="/tools/calculators" className="resource-card">
              <div className="resource-icon">🧮</div>
              <h3 className="resource-title">Trading Calculators</h3>
              <p className="resource-description">
                Essential calculators for risk and position sizing
              </p>
              <div className="resource-count">15+ Tools</div>
            </Link>

            <Link href="/tools/backtesting" className="resource-card">
              <div className="resource-icon">⏮️</div>
              <h3 className="resource-title">Strategy Tester</h3>
              <p className="resource-description">
                Test your strategies with historical market data
              </p>
              <div className="resource-count">10+ Years Data</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="certifications-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Professional Certifications</h2>
            <p className="section-subtitle">
              Earn recognized certifications to advance your trading career
            </p>
          </div>

          <div className="certifications-grid">
            <div className="certification-card">
              <div className="cert-badge">
                <div className="cert-icon">🏆</div>
              </div>
              <h3 className="cert-title">Certified Technical Analyst</h3>
              <p className="cert-description">
                Master technical analysis and earn industry recognition
              </p>
              <div className="cert-requirements">
                <div className="cert-requirement">Complete 15 courses</div>
                <div className="cert-requirement">Pass final exam (80%+)</div>
                <div className="cert-requirement">Submit portfolio analysis</div>
              </div>
              <div className="cert-stats">
                <span className="cert-duration">3-4 months</span>
                <span className="cert-holders">2,341 certified</span>
              </div>
            </div>

            <div className="certification-card">
              <div className="cert-badge">
                <div className="cert-icon">🤖</div>
              </div>
              <h3 className="cert-title">AI Trading Specialist</h3>
              <p className="cert-description">
                Become certified in AI and algorithmic trading strategies
              </p>
              <div className="cert-requirements">
                <div className="cert-requirement">Complete AI trading path</div>
                <div className="cert-requirement">Build working algorithm</div>
                <div className="cert-requirement">Demonstrate proficiency</div>
              </div>
              <div className="cert-stats">
                <span className="cert-duration">4-6 months</span>
                <span className="cert-holders">567 certified</span>
              </div>
            </div>

            <div className="certification-card">
              <div className="cert-badge">
                <div className="cert-icon">💼</div>
              </div>
              <h3 className="cert-title">Risk Management Professional</h3>
              <p className="cert-description">
                Specialize in professional risk management techniques
              </p>
              <div className="cert-requirements">
                <div className="cert-requirement">Complete risk courses</div>
                <div className="cert-requirement">Case study analysis</div>
                <div className="cert-requirement">Practical assessment</div>
              </div>
              <div className="cert-stats">
                <span className="cert-duration">2-3 months</span>
                <span className="cert-holders">1,234 certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Start Your Trading Education Journey</h2>
            <p className="cta-subtitle">
              Join thousands of successful traders who learned with our platform
            </p>
            <div className="cta-buttons">
              <Link href="/auth/register" className="btn btn-primary btn-lg">
                Start Learning Free
              </Link>
              <Link href="/education/courses" className="btn btn-secondary btn-lg">
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 