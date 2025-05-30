'use client'

import React, { useState } from 'react'

interface Course {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  lessons: number
  rating: number
  students: number
  price: string
  category: string
  icon: string
  features: string[]
  instructor: {
    name: string
    avatar: string
    expertise: string
  }
}

interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'interactive' | 'quiz' | 'practice'
  completed: boolean
  locked: boolean
}

const EducationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('courses')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚' },
    { id: 'forex', name: 'Forex Trading', icon: '💱' },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿' },
    { id: 'stocks', name: 'Stock Market', icon: '📈' },
    { id: 'ai', name: 'AI Trading', icon: '🤖' },
    { id: 'risk', name: 'Risk Management', icon: '🛡️' }
  ]

  const courses: Course[] = [
    {
      id: 'forex-basics',
      title: 'Forex Trading Fundamentals',
      description: 'Master the basics of foreign exchange trading with our comprehensive beginner course.',
      level: 'Beginner',
      duration: '6 weeks',
      lessons: 24,
      rating: 4.8,
      students: 12450,
      price: 'Free',
      category: 'forex',
      icon: '💱',
      features: ['Live trading sessions', 'Practice account', 'Certificate', '24/7 support'],
      instructor: {
        name: 'Sarah Johnson',
        avatar: '👩‍💼',
        expertise: 'Senior Forex Analyst'
      }
    },
    {
      id: 'ai-trading',
      title: 'AI-Powered Trading Strategies',
      description: 'Learn how to leverage artificial intelligence for smarter trading decisions.',
      level: 'Advanced',
      duration: '8 weeks',
      lessons: 32,
      rating: 4.9,
      students: 8750,
      price: '$299',
      category: 'ai',
      icon: '🤖',
      features: ['AI algorithm training', 'Backtesting tools', 'Real-time signals', 'Expert mentorship'],
      instructor: {
        name: 'Dr. Michael Chen',
        avatar: '👨‍🔬',
        expertise: 'AI Trading Specialist'
      }
    },
    {
      id: 'crypto-mastery',
      title: 'Cryptocurrency Trading Mastery',
      description: 'Complete guide to trading Bitcoin, Ethereum, and other cryptocurrencies.',
      level: 'Intermediate',
      duration: '5 weeks',
      lessons: 20,
      rating: 4.7,
      students: 15200,
      price: '$199',
      category: 'crypto',
      icon: '₿',
      features: ['DeFi protocols', 'NFT trading', 'Yield farming', 'Portfolio management'],
      instructor: {
        name: 'Alex Rodriguez',
        avatar: '👨‍💻',
        expertise: 'Crypto Trading Expert'
      }
    },
    {
      id: 'risk-management',
      title: 'Advanced Risk Management',
      description: 'Protect your capital with professional risk management techniques.',
      level: 'Intermediate',
      duration: '4 weeks',
      lessons: 16,
      rating: 4.9,
      students: 9800,
      price: '$149',
      category: 'risk',
      icon: '🛡️',
      features: ['Position sizing', 'Stop-loss strategies', 'Portfolio hedging', 'Psychology'],
      instructor: {
        name: 'Emma Thompson',
        avatar: '👩‍🎓',
        expertise: 'Risk Management Consultant'
      }
    }
  ]

  const sampleLessons: Lesson[] = [
    { id: '1', title: 'Introduction to Forex Markets', duration: '15 min', type: 'video', completed: true, locked: false },
    { id: '2', title: 'Currency Pairs Explained', duration: '20 min', type: 'interactive', completed: true, locked: false },
    { id: '3', title: 'Reading Forex Charts', duration: '25 min', type: 'video', completed: false, locked: false },
    { id: '4', title: 'Practice: Identify Trends', duration: '10 min', type: 'practice', completed: false, locked: false },
    { id: '5', title: 'Quiz: Market Basics', duration: '5 min', type: 'quiz', completed: false, locked: true },
    { id: '6', title: 'Advanced Chart Patterns', duration: '30 min', type: 'video', completed: false, locked: true }
  ]

  const webinars = [
    {
      id: '1',
      title: 'Live Market Analysis',
      instructor: 'Sarah Johnson',
      date: 'Today, 3:00 PM EST',
      duration: '60 min',
      attendees: 1250,
      status: 'live',
      topic: 'EUR/USD Technical Analysis'
    },
    {
      id: '2',
      title: 'AI Trading Signals Workshop',
      instructor: 'Dr. Michael Chen',
      date: 'Tomorrow, 2:00 PM EST',
      duration: '90 min',
      attendees: 890,
      status: 'upcoming',
      topic: 'Building Custom AI Indicators'
    },
    {
      id: '3',
      title: 'Crypto Market Outlook',
      instructor: 'Alex Rodriguez',
      date: 'Dec 15, 4:00 PM EST',
      duration: '45 min',
      attendees: 2100,
      status: 'upcoming',
      topic: 'Bitcoin & Altcoin Predictions'
    }
  ]

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'var(--success)'
      case 'Intermediate': return 'var(--warning)'
      case 'Advanced': return 'var(--danger)'
      default: return 'var(--text-tertiary)'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥'
      case 'interactive': return '🎮'
      case 'quiz': return '❓'
      case 'practice': return '💪'
      default: return '📄'
    }
  }

  return (
    <section className="education-center-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-icon">🎓</span>
            Trading Education Center
          </h2>
          <p className="section-subtitle">
            Master the markets with our comprehensive courses, live webinars, and interactive learning tools. 
            From beginner basics to advanced AI strategies.
          </p>
        </div>

        {/* Education Navigation */}
        <div className="education-nav">
          <button
            className={`nav-tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <span className="tab-icon">📚</span>
            <span className="tab-label">Courses</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'webinars' ? 'active' : ''}`}
            onClick={() => setActiveTab('webinars')}
          >
            <span className="tab-icon">📡</span>
            <span className="tab-label">Live Webinars</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            <span className="tab-icon">📊</span>
            <span className="tab-label">My Progress</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            <span className="tab-icon">📖</span>
            <span className="tab-label">Resources</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="education-content">
          {activeTab === 'courses' && (
            <div className="courses-section">
              {/* Category Filter */}
              <div className="category-filter">
                <h3 className="filter-title">Browse by Category</h3>
                <div className="category-grid">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-name">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Courses Grid */}
              <div className="courses-grid">
                {filteredCourses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-header">
                      <div className="course-icon">{course.icon}</div>
                      <div className="course-meta">
                        <span 
                          className="course-level"
                          style={{ color: getLevelColor(course.level) }}
                        >
                          {course.level}
                        </span>
                        <span className="course-price">{course.price}</span>
                      </div>
                    </div>

                    <div className="course-content">
                      <h4 className="course-title">{course.title}</h4>
                      <p className="course-description">{course.description}</p>

                      <div className="course-stats">
                        <div className="stat-item">
                          <span className="stat-icon">⭐</span>
                          <span className="stat-value">{course.rating}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-icon">👥</span>
                          <span className="stat-value">{course.students.toLocaleString()}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-icon">📚</span>
                          <span className="stat-value">{course.lessons} lessons</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-icon">⏱️</span>
                          <span className="stat-value">{course.duration}</span>
                        </div>
                      </div>

                      <div className="course-features">
                        {course.features.slice(0, 2).map((feature, index) => (
                          <span key={index} className="feature-tag">
                            ✓ {feature}
                          </span>
                        ))}
                      </div>

                      <div className="course-instructor">
                        <span className="instructor-avatar">{course.instructor.avatar}</span>
                        <div className="instructor-info">
                          <span className="instructor-name">{course.instructor.name}</span>
                          <span className="instructor-expertise">{course.instructor.expertise}</span>
                        </div>
                      </div>
                    </div>

                    <div className="course-actions">
                      <button 
                        className="btn btn-primary"
                        onClick={() => setSelectedCourse(course.id)}
                      >
                        <span className="btn-icon">🚀</span>
                        {course.price === 'Free' ? 'Start Free' : 'Enroll Now'}
                      </button>
                      <button className="btn btn-secondary">
                        <span className="btn-icon">👁️</span>
                        Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'webinars' && (
            <div className="webinars-section">
              <div className="webinars-header">
                <h3 className="webinars-title">Live & Upcoming Webinars</h3>
                <p className="webinars-subtitle">
                  Join our expert traders for live market analysis and Q&A sessions
                </p>
              </div>

              <div className="webinars-list">
                {webinars.map(webinar => (
                  <div key={webinar.id} className={`webinar-card ${webinar.status}`}>
                    <div className="webinar-status">
                      {webinar.status === 'live' && (
                        <span className="status-badge live">
                          <span className="live-dot"></span>
                          LIVE NOW
                        </span>
                      )}
                      {webinar.status === 'upcoming' && (
                        <span className="status-badge upcoming">UPCOMING</span>
                      )}
                    </div>

                    <div className="webinar-content">
                      <h4 className="webinar-title">{webinar.title}</h4>
                      <p className="webinar-topic">{webinar.topic}</p>

                      <div className="webinar-details">
                        <div className="detail-item">
                          <span className="detail-icon">👨‍🏫</span>
                          <span className="detail-text">{webinar.instructor}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">📅</span>
                          <span className="detail-text">{webinar.date}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">⏱️</span>
                          <span className="detail-text">{webinar.duration}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">👥</span>
                          <span className="detail-text">{webinar.attendees} attending</span>
                        </div>
                      </div>
                    </div>

                    <div className="webinar-actions">
                      {webinar.status === 'live' ? (
                        <button className="btn btn-primary">
                          <span className="btn-icon">📡</span>
                          Join Live
                        </button>
                      ) : (
                        <button className="btn btn-secondary">
                          <span className="btn-icon">🔔</span>
                          Set Reminder
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="progress-section">
              <div className="progress-overview">
                <h3 className="progress-title">Your Learning Journey</h3>
                <div className="progress-stats">
                  <div className="progress-stat">
                    <span className="stat-value">3</span>
                    <span className="stat-label">Courses Enrolled</span>
                  </div>
                  <div className="progress-stat">
                    <span className="stat-value">67%</span>
                    <span className="stat-label">Average Progress</span>
                  </div>
                  <div className="progress-stat">
                    <span className="stat-value">24</span>
                    <span className="stat-label">Lessons Completed</span>
                  </div>
                  <div className="progress-stat">
                    <span className="stat-value">2</span>
                    <span className="stat-label">Certificates Earned</span>
                  </div>
                </div>
              </div>

              <div className="current-course">
                <h4 className="current-title">Continue Learning</h4>
                <div className="course-progress-card">
                  <div className="progress-header">
                    <span className="course-icon">💱</span>
                    <div className="progress-info">
                      <h5 className="progress-course-title">Forex Trading Fundamentals</h5>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '75%' }}></div>
                      </div>
                      <span className="progress-text">18 of 24 lessons completed (75%)</span>
                    </div>
                  </div>

                  <div className="lessons-list">
                    {sampleLessons.map(lesson => (
                      <div 
                        key={lesson.id} 
                        className={`lesson-item ${lesson.completed ? 'completed' : ''} ${lesson.locked ? 'locked' : ''}`}
                      >
                        <div className="lesson-info">
                          <span className="lesson-type">{getTypeIcon(lesson.type)}</span>
                          <div className="lesson-details">
                            <span className="lesson-title">{lesson.title}</span>
                            <span className="lesson-duration">{lesson.duration}</span>
                          </div>
                        </div>
                        <div className="lesson-status">
                          {lesson.completed && <span className="status-icon completed">✓</span>}
                          {lesson.locked && <span className="status-icon locked">🔒</span>}
                          {!lesson.completed && !lesson.locked && (
                            <button className="btn btn-sm btn-primary">Start</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="resources-section">
              <div className="resources-grid">
                <div className="resource-category">
                  <h4 className="resource-title">
                    <span className="resource-icon">📊</span>
                    Trading Tools
                  </h4>
                  <div className="resource-list">
                    <a href="#" className="resource-link">
                      <span className="link-icon">🧮</span>
                      <span className="link-text">Position Size Calculator</span>
                    </a>
                    <a href="#" className="resource-link">
                      <span className="link-icon">📈</span>
                      <span className="link-text">Risk/Reward Calculator</span>
                    </a>
                    <a href="#" className="resource-link">
                      <span className="link-icon">💰</span>
                      <span className="link-text">Profit/Loss Calculator</span>
                    </a>
                    <a href="#" className="resource-link">
                      <span className="link-icon">📊</span>
                      <span className="link-text">Economic Calendar</span>
                    </a>
                  </div>
                </div>

                <div className="resource-category">
                  <h4 className="resource-title">
                    <span className="resource-icon">📚</span>
                    Study Materials
                  </h4>
                  <div className="resource-list">
                    <a href="#" className="resource-link">
                      <span className="link-icon">📖</span>
                      <span className="link-text">Trading Glossary</span>
                    </a>
                    <a href="#" className="resource-link">
                      <span className="link-icon">📋</span>
                      <span className="link-text">Cheat Sheets</span>
                    </a>
                    <a href="#" className="resource-link">
                      <span className="link-icon">📄</span>
                      <span className="link-text">Market Reports</span>
                    </a>
                    <a href="#" className="resource-link">
                      <span className="link-icon">🎯</span>
                      <span className="link-text">Strategy Templates</span>
                    </a>
                  </div>
                </div>

                <div className="resource-category">
                  <h4 className="resource-title">
                    <span className="resource-icon">🤝</span>
                    Community
                  </h4>
                  <div className="resource-list">
                    <a href="#" className="resource-link">
                      <span className="link-icon">💬</span>
                      <span className="link-text">Trading Forum</span>
                    </a>
                    <a href="#" className="resource-link">
                      <span className="link-icon">📱</span>
                      <span className="link-text">Discord Community</span>
                    </a>
                    <a href="#" className="resource-link">
                      <span className="link-icon">📺</span>
                      <span className="link-text">YouTube Channel</span>
                    </a>
                    <a href="#" className="resource-link">
                      <span className="link-icon">📧</span>
                      <span className="link-text">Newsletter</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="education-cta">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Start Your Trading Journey?</h3>
            <p className="cta-description">
              Join thousands of successful traders who started with our education platform. 
              Get access to premium courses, live mentorship, and exclusive trading tools.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-lg">
                <span className="btn-icon">🎓</span>
                Start Learning Free
              </button>
              <button className="btn btn-secondary btn-lg">
                <span className="btn-icon">💎</span>
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationCenter 