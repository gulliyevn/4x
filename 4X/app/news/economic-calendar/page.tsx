'use client'

import React, { useState } from 'react'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

const EconomicCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState('today')
  const [selectedImpact, setSelectedImpact] = useState('all')
  const [selectedCurrency, setSelectedCurrency] = useState('all')
  const [viewMode, setViewMode] = useState('list')

  const dateFilters = ['today', 'tomorrow', 'week', 'month']
  const impactLevels = ['all', 'high', 'medium', 'low']
  const currencies = ['all', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF']

  const economicEvents = [
    {
      id: 1,
      date: '2024-01-16',
      time: '08:30',
      currency: 'USD',
      event: 'Non-Farm Payrolls',
      description: 'Monthly employment data showing job creation in the US economy',
      impact: 'high',
      forecast: '180K',
      previous: '175K',
      actual: '185K',
      category: 'Employment',
      importance: 95,
      volatility: 'Very High',
      affectedPairs: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CAD'],
      marketExpectation: 'Positive surprise expected to strengthen USD'
    },
    {
      id: 2,
      date: '2024-01-16',
      time: '08:30',
      currency: 'USD',
      event: 'Unemployment Rate',
      description: 'Percentage of labor force that is unemployed',
      impact: 'high',
      forecast: '3.7%',
      previous: '3.7%',
      actual: '3.6%',
      category: 'Employment',
      importance: 85,
      volatility: 'High',
      affectedPairs: ['EUR/USD', 'GBP/USD', 'USD/JPY'],
      marketExpectation: 'Slight improvement expected'
    },
    {
      id: 3,
      date: '2024-01-17',
      time: '12:45',
      currency: 'EUR',
      event: 'ECB Interest Rate Decision',
      description: 'European Central Bank monetary policy decision and press conference',
      impact: 'high',
      forecast: '4.50%',
      previous: '4.50%',
      actual: null,
      category: 'Monetary Policy',
      importance: 98,
      volatility: 'Extreme',
      affectedPairs: ['EUR/USD', 'EUR/GBP', 'EUR/JPY', 'EUR/CHF'],
      marketExpectation: 'Rate hold expected, focus on forward guidance'
    },
    {
      id: 4,
      date: '2024-01-17',
      time: '13:30',
      currency: 'EUR',
      event: 'ECB Press Conference',
      description: 'ECB President Christine Lagarde press conference',
      impact: 'high',
      forecast: null,
      previous: null,
      actual: null,
      category: 'Monetary Policy',
      importance: 90,
      volatility: 'Very High',
      affectedPairs: ['EUR/USD', 'EUR/GBP', 'EUR/JPY'],
      marketExpectation: 'Hawkish tone expected to support EUR'
    },
    {
      id: 5,
      date: '2024-01-18',
      time: '07:00',
      currency: 'GBP',
      event: 'UK GDP Growth Rate (QoQ)',
      description: 'Quarterly gross domestic product growth rate for the United Kingdom',
      impact: 'medium',
      forecast: '0.2%',
      previous: '0.1%',
      actual: null,
      category: 'GDP',
      importance: 75,
      volatility: 'Medium',
      affectedPairs: ['GBP/USD', 'EUR/GBP', 'GBP/JPY'],
      marketExpectation: 'Modest growth expected'
    },
    {
      id: 6,
      date: '2024-01-18',
      time: '09:30',
      currency: 'GBP',
      event: 'UK Retail Sales (MoM)',
      description: 'Monthly change in the total value of sales at the retail level',
      impact: 'medium',
      forecast: '0.3%',
      previous: '-0.2%',
      actual: null,
      category: 'Consumer Spending',
      importance: 65,
      volatility: 'Medium',
      affectedPairs: ['GBP/USD', 'EUR/GBP'],
      marketExpectation: 'Recovery in consumer spending'
    },
    {
      id: 7,
      date: '2024-01-19',
      time: '23:30',
      currency: 'JPY',
      event: 'Japan CPI Inflation (YoY)',
      description: 'Consumer Price Index inflation data for Japan',
      impact: 'medium',
      forecast: '2.8%',
      previous: '2.9%',
      actual: null,
      category: 'Inflation',
      importance: 80,
      volatility: 'Medium',
      affectedPairs: ['USD/JPY', 'EUR/JPY', 'GBP/JPY'],
      marketExpectation: 'Slight cooling in inflation expected'
    },
    {
      id: 8,
      date: '2024-01-19',
      time: '14:00',
      currency: 'USD',
      event: 'Existing Home Sales',
      description: 'Number of existing homes sold during the previous month',
      impact: 'low',
      forecast: '3.95M',
      previous: '3.82M',
      actual: null,
      category: 'Housing',
      importance: 45,
      volatility: 'Low',
      affectedPairs: ['USD/CAD'],
      marketExpectation: 'Gradual improvement in housing market'
    },
    {
      id: 9,
      date: '2024-01-20',
      time: '13:30',
      currency: 'CAD',
      event: 'Canada CPI Inflation (YoY)',
      description: 'Consumer Price Index inflation data for Canada',
      impact: 'medium',
      forecast: '3.1%',
      previous: '3.4%',
      actual: null,
      category: 'Inflation',
      importance: 70,
      volatility: 'Medium',
      affectedPairs: ['USD/CAD', 'CAD/JPY'],
      marketExpectation: 'Continued disinflation trend'
    }
  ]

  const centralBankMeetings = [
    {
      bank: 'Federal Reserve',
      date: '2024-01-31',
      decision: 'Rate Decision',
      currentRate: '5.50%',
      expectedChange: 'Hold',
      probability: 85,
      nextMeeting: '2024-03-20'
    },
    {
      bank: 'European Central Bank',
      date: '2024-01-25',
      decision: 'Rate Decision',
      currentRate: '4.50%',
      expectedChange: 'Hold',
      probability: 92,
      nextMeeting: '2024-03-07'
    },
    {
      bank: 'Bank of England',
      date: '2024-02-01',
      decision: 'Rate Decision',
      currentRate: '5.25%',
      expectedChange: 'Hold',
      probability: 78,
      nextMeeting: '2024-03-21'
    },
    {
      bank: 'Bank of Japan',
      date: '2024-01-23',
      decision: 'Rate Decision',
      currentRate: '-0.10%',
      expectedChange: 'Hold',
      probability: 95,
      nextMeeting: '2024-03-19'
    }
  ]

  const marketImpactAnalysis = {
    highImpact: economicEvents.filter(event => event.impact === 'high').length,
    mediumImpact: economicEvents.filter(event => event.impact === 'medium').length,
    lowImpact: economicEvents.filter(event => event.impact === 'low').length,
    totalEvents: economicEvents.length,
    volatilityForecast: 'Elevated',
    keyRisks: [
      'ECB policy divergence',
      'US employment data surprises',
      'Geopolitical tensions',
      'Inflation persistence'
    ]
  }

  const filteredEvents = economicEvents.filter(event => {
    const matchesImpact = selectedImpact === 'all' || event.impact === selectedImpact
    const matchesCurrency = selectedCurrency === 'all' || event.currency === selectedCurrency
    
    const eventDate = new Date(event.date)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    let matchesDate = true
    if (selectedDate === 'today') {
      matchesDate = eventDate.toDateString() === today.toDateString()
    } else if (selectedDate === 'tomorrow') {
      matchesDate = eventDate.toDateString() === tomorrow.toDateString()
    } else if (selectedDate === 'week') {
      const weekFromNow = new Date(today)
      weekFromNow.setDate(weekFromNow.getDate() + 7)
      matchesDate = eventDate >= today && eventDate <= weekFromNow
    } else if (selectedDate === 'month') {
      const monthFromNow = new Date(today)
      monthFromNow.setMonth(monthFromNow.getMonth() + 1)
      matchesDate = eventDate >= today && eventDate <= monthFromNow
    }
    
    return matchesImpact && matchesCurrency && matchesDate
  })

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return '🔴'
      case 'medium': return '🟡'
      case 'low': return '🟢'
      default: return '⚪'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getActualColor = (actual: string | null, forecast: string | null) => {
    if (!actual || !forecast) return '#6b7280'
    
    const actualNum = parseFloat(actual.replace(/[^\d.-]/g, ''))
    const forecastNum = parseFloat(forecast.replace(/[^\d.-]/g, ''))
    
    if (actualNum > forecastNum) return '#10b981'
    if (actualNum < forecastNum) return '#ef4444'
    return '#f59e0b'
  }

  return (
    <>
      <Navigation />
      <div className="economic-calendar-page">
        {/* Hero Section */}
        <section className="calendar-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">📅</span>
                <span>Economic Calendar</span>
              </div>
              <h1 className="hero-title">
                Economic Events Calendar
                <span className="gradient-text">Track Market-Moving Events</span>
              </h1>
              <p className="hero-description">
                Stay ahead of market volatility with our comprehensive economic calendar featuring 
                high-impact events, central bank meetings, and market forecasts.
              </p>
            </div>
          </div>
        </section>

        {/* Market Impact Overview */}
        <section className="impact-overview">
          <div className="container">
            <div className="overview-grid">
              <div className="impact-card">
                <h3 className="impact-title">This Week's Events</h3>
                <div className="impact-stats">
                  <div className="stat-item">
                    <span className="stat-value high">{marketImpactAnalysis.highImpact}</span>
                    <span className="stat-label">High Impact</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value medium">{marketImpactAnalysis.mediumImpact}</span>
                    <span className="stat-label">Medium Impact</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value low">{marketImpactAnalysis.lowImpact}</span>
                    <span className="stat-label">Low Impact</span>
                  </div>
                </div>
              </div>

              <div className="impact-card">
                <h3 className="impact-title">Volatility Forecast</h3>
                <div className="volatility-meter">
                  <div className="volatility-value">{marketImpactAnalysis.volatilityForecast}</div>
                  <div className="volatility-bar">
                    <div className="volatility-fill" style={{ width: '75%' }}></div>
                  </div>
                  <div className="volatility-scale">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                    <span>Extreme</span>
                  </div>
                </div>
              </div>

              <div className="impact-card">
                <h3 className="impact-title">Key Risks</h3>
                <div className="risks-list">
                  {marketImpactAnalysis.keyRisks.map((risk, idx) => (
                    <div key={idx} className="risk-item">
                      <span className="risk-icon">⚠️</span>
                      <span className="risk-text">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Central Bank Meetings */}
        <section className="central-banks">
          <div className="container">
            <h2 className="section-title">Upcoming Central Bank Meetings</h2>
            <div className="banks-grid">
              {centralBankMeetings.map((meeting, idx) => (
                <div key={idx} className="bank-card">
                  <div className="bank-header">
                    <h3 className="bank-name">{meeting.bank}</h3>
                    <span className="bank-date">{formatDate(meeting.date)}</span>
                  </div>
                  <div className="bank-details">
                    <div className="detail-item">
                      <span className="detail-label">Current Rate</span>
                      <span className="detail-value">{meeting.currentRate}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Expected</span>
                      <span className="detail-value">{meeting.expectedChange}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Probability</span>
                      <span className="detail-value">{meeting.probability}%</span>
                    </div>
                  </div>
                  <div className="probability-bar">
                    <div 
                      className="probability-fill"
                      style={{ width: `${meeting.probability}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="calendar-filters">
          <div className="container">
            <div className="filters-container">
              <div className="filter-group">
                <label className="filter-label">Time Period</label>
                <div className="filter-buttons">
                  {dateFilters.map(date => (
                    <button
                      key={date}
                      className={`filter-btn ${selectedDate === date ? 'active' : ''}`}
                      onClick={() => setSelectedDate(date)}
                    >
                      {date.charAt(0).toUpperCase() + date.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Impact Level</label>
                <div className="filter-buttons">
                  {impactLevels.map(impact => (
                    <button
                      key={impact}
                      className={`filter-btn ${selectedImpact === impact ? 'active' : ''}`}
                      onClick={() => setSelectedImpact(impact)}
                    >
                      {impact === 'all' ? 'All' : impact.charAt(0).toUpperCase() + impact.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Currency</label>
                <select 
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="currency-select"
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>
                      {currency === 'all' ? 'All Currencies' : currency}
                    </option>
                  ))}
                </select>
              </div>

              <div className="view-controls">
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
                <button 
                  className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                  onClick={() => setViewMode('calendar')}
                >
                  Calendar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Economic Events */}
        <section className="economic-events">
          <div className="container">
            <div className="events-header">
              <h2 className="section-title">Economic Events</h2>
              <p className="events-count">{filteredEvents.length} events found</p>
            </div>

            {viewMode === 'list' ? (
              <div className="events-list">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="event-card">
                    <div className="event-time">
                      <div className="event-date">{formatDate(event.date)}</div>
                      <div className="event-hour">{event.time}</div>
                    </div>

                    <div className="event-info">
                      <div className="event-header">
                        <div className="event-currency">{event.currency}</div>
                        <div className="event-impact">
                          <span className="impact-icon">{getImpactIcon(event.impact)}</span>
                          <span 
                            className="impact-text"
                            style={{ color: getImpactColor(event.impact) }}
                          >
                            {event.impact.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <h3 className="event-title">{event.event}</h3>
                      <p className="event-description">{event.description}</p>

                      <div className="event-data">
                        <div className="data-item">
                          <span className="data-label">Forecast</span>
                          <span className="data-value">{event.forecast || 'N/A'}</span>
                        </div>
                        <div className="data-item">
                          <span className="data-label">Previous</span>
                          <span className="data-value">{event.previous || 'N/A'}</span>
                        </div>
                        <div className="data-item">
                          <span className="data-label">Actual</span>
                          <span 
                            className="data-value"
                            style={{ color: getActualColor(event.actual, event.forecast) }}
                          >
                            {event.actual || 'Pending'}
                          </span>
                        </div>
                      </div>

                      <div className="event-details">
                        <div className="detail-section">
                          <span className="detail-label">Importance:</span>
                          <span className="detail-value">{event.importance}/100</span>
                        </div>
                        <div className="detail-section">
                          <span className="detail-label">Volatility:</span>
                          <span className="detail-value">{event.volatility}</span>
                        </div>
                        <div className="detail-section">
                          <span className="detail-label">Category:</span>
                          <span className="detail-value">{event.category}</span>
                        </div>
                      </div>

                      <div className="affected-pairs">
                        <span className="pairs-label">Affected Pairs:</span>
                        <div className="pairs-list">
                          {event.affectedPairs.map((pair, idx) => (
                            <span key={idx} className="pair-tag">{pair}</span>
                          ))}
                        </div>
                      </div>

                      <div className="market-expectation">
                        <span className="expectation-label">Market Expectation:</span>
                        <span className="expectation-text">{event.marketExpectation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="calendar-view">
                <div className="calendar-grid">
                  {/* Calendar implementation would go here */}
                  <div className="calendar-placeholder">
                    <div className="placeholder-icon">📅</div>
                    <h3>Calendar View</h3>
                    <p>Interactive calendar view coming soon</p>
                  </div>
                </div>
              </div>
            )}

            {filteredEvents.length === 0 && (
              <div className="no-events">
                <div className="no-events-icon">📅</div>
                <h3>No Events Found</h3>
                <p>Try adjusting your filters to see more events</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .economic-calendar-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .calendar-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .calendar-hero::before {
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

        .impact-overview {
          padding: 60px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .impact-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .impact-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: #3b82f6;
        }

        .impact-stats {
          display: flex;
          justify-content: space-around;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
        }

        .stat-value.high {
          color: #ef4444;
        }

        .stat-value.medium {
          color: #f59e0b;
        }

        .stat-value.low {
          color: #10b981;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .volatility-meter {
          text-align: center;
        }

        .volatility-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: #f59e0b;
          margin-bottom: 16px;
        }

        .volatility-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .volatility-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #f59e0b, #ef4444);
          transition: width 0.3s ease;
        }

        .volatility-scale {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .risks-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .risk-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
        }

        .risk-icon {
          font-size: 1rem;
        }

        .risk-text {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .central-banks {
          padding: 60px 0;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 32px;
          color: #3b82f6;
        }

        .banks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .bank-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          backdrop-filter: blur(10px);
        }

        .bank-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .bank-name {
          font-size: 1rem;
          font-weight: 600;
        }

        .bank-date {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .bank-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }

        .detail-label {
          color: rgba(255, 255, 255, 0.7);
        }

        .detail-value {
          font-weight: 500;
        }

        .probability-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .probability-fill {
          height: 100%;
          background: #3b82f6;
          transition: width 0.3s ease;
        }

        .calendar-filters {
          padding: 40px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .filters-container {
          display: flex;
          gap: 24px;
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

        .currency-select {
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          min-width: 150px;
        }

        .currency-select option {
          background: #1a1a2e;
          color: white;
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

        .economic-events {
          padding: 60px 0;
        }

        .events-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .events-count {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .event-card {
          display: flex;
          gap: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .event-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .event-time {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          min-width: 80px;
          text-align: center;
        }

        .event-date {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .event-hour {
          font-size: 1.1rem;
          font-weight: 600;
          color: #3b82f6;
        }

        .event-info {
          flex: 1;
          min-width: 0;
        }

        .event-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .event-currency {
          padding: 4px 8px;
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .event-impact {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .impact-icon {
          font-size: 0.9rem;
        }

        .impact-text {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .event-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .event-description {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
          margin-bottom: 16px;
          font-size: 0.9rem;
        }

        .event-data {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 16px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .data-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: center;
        }

        .data-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .data-value {
          font-size: 1rem;
          font-weight: 600;
        }

        .event-details {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .detail-section {
          display: flex;
          gap: 4px;
          font-size: 0.9rem;
        }

        .detail-label {
          color: rgba(255, 255, 255, 0.7);
        }

        .detail-value {
          font-weight: 500;
        }

        .affected-pairs {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .pairs-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          white-space: nowrap;
        }

        .pairs-list {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .pair-tag {
          padding: 2px 6px;
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .market-expectation {
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }

        .expectation-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          white-space: nowrap;
        }

        .expectation-text {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
          font-style: italic;
        }

        .calendar-view {
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .calendar-placeholder {
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
        }

        .placeholder-icon {
          font-size: 4rem;
          margin-bottom: 16px;
        }

        .no-events {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 255, 255, 0.6);
        }

        .no-events-icon {
          font-size: 4rem;
          margin-bottom: 16px;
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

          .overview-grid {
            grid-template-columns: 1fr;
          }

          .banks-grid {
            grid-template-columns: 1fr;
          }

          .filters-container {
            flex-direction: column;
            gap: 16px;
          }

          .events-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .event-card {
            flex-direction: column;
            gap: 16px;
          }

          .event-time {
            flex-direction: row;
            justify-content: space-between;
            min-width: auto;
            width: 100%;
          }

          .event-data {
            grid-template-columns: 1fr;
          }

          .event-details {
            flex-direction: column;
            gap: 8px;
          }

          .affected-pairs {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .market-expectation {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </>
  )
}

export default EconomicCalendarPage 