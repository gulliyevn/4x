'use client'

import React, { useState } from 'react'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

const ResearchReportsPage = () => {
  const [selectedFirm, setSelectedFirm] = useState('all')
  const [selectedRating, setSelectedRating] = useState('all')
  const [selectedSector, setSelectedSector] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const firms = ['all', 'goldman-sachs', 'morgan-stanley', 'jpmorgan', 'bank-of-america', 'citi']
  const ratings = ['all', 'buy', 'overweight', 'neutral', 'underweight', 'sell']
  const sectors = ['all', 'technology', 'healthcare', 'finance', 'energy', 'consumer']
  const sortOptions = ['date', 'rating', 'target', 'firm']

  const researchReports = [
    {
      id: 1,
      firm: 'Goldman Sachs',
      analyst: 'Sarah Johnson',
      date: '2024-01-24',
      symbol: 'AAPL',
      company: 'Apple Inc.',
      sector: 'technology',
      rating: 'Buy',
      previousRating: 'Neutral',
      priceTarget: 195.50,
      previousTarget: 175.00,
      currentPrice: 182.31,
      upside: 7.24,
      title: 'iPhone 15 Cycle Driving Stronger Than Expected Demand',
      summary: 'We are upgrading AAPL to Buy from Neutral with a new 12-month price target of $195.50, up from $175.00. The iPhone 15 cycle is showing stronger momentum than anticipated, particularly in China.',
      keyPoints: [
        'iPhone 15 Pro demand exceeding expectations',
        'Services revenue growth accelerating',
        'China market showing resilience',
        'AI integration creating new opportunities'
      ],
      risks: [
        'Regulatory pressure in EU',
        'China geopolitical tensions',
        'Supply chain disruptions'
      ],
      confidence: 85,
      timeHorizon: '12 months',
      reportType: 'Upgrade'
    },
    {
      id: 2,
      firm: 'Morgan Stanley',
      analyst: 'Michael Chen',
      date: '2024-01-23',
      symbol: 'TSLA',
      company: 'Tesla Inc.',
      sector: 'consumer',
      rating: 'Underweight',
      previousRating: 'Underweight',
      priceTarget: 180.00,
      previousTarget: 200.00,
      currentPrice: 210.73,
      upside: -14.58,
      title: 'EV Competition Intensifying, Margin Pressure Expected',
      summary: 'We maintain our Underweight rating on TSLA but lower our price target to $180 from $200. Increasing EV competition and price cuts are pressuring margins more than expected.',
      keyPoints: [
        'Intensifying EV competition globally',
        'Price cuts impacting margins',
        'FSD progress slower than expected',
        'Energy business growth slowing'
      ],
      risks: [
        'Faster than expected FSD rollout',
        'Energy business acceleration',
        'New model launches'
      ],
      confidence: 78,
      timeHorizon: '12 months',
      reportType: 'Target Cut'
    },
    {
      id: 3,
      firm: 'JPMorgan',
      analyst: 'Emma Rodriguez',
      date: '2024-01-22',
      symbol: 'NVDA',
      company: 'NVIDIA Corporation',
      sector: 'technology',
      rating: 'Overweight',
      previousRating: 'Overweight',
      priceTarget: 650.00,
      previousTarget: 600.00,
      currentPrice: 598.12,
      upside: 8.67,
      title: 'AI Revolution Accelerating, Raising Price Target',
      summary: 'We raise our price target on NVDA to $650 from $600 while maintaining our Overweight rating. The AI revolution is accelerating faster than expected, driving unprecedented demand for GPUs.',
      keyPoints: [
        'Data center revenue exceeding forecasts',
        'AI chip demand outstripping supply',
        'New product launches driving growth',
        'Competitive moat strengthening'
      ],
      risks: [
        'Regulatory restrictions on China sales',
        'Competition from custom chips',
        'Cyclical downturn in semiconductors'
      ],
      confidence: 92,
      timeHorizon: '18 months',
      reportType: 'Target Raise'
    },
    {
      id: 4,
      firm: 'Bank of America',
      analyst: 'David Kim',
      date: '2024-01-21',
      symbol: 'MSFT',
      company: 'Microsoft Corporation',
      sector: 'technology',
      rating: 'Buy',
      previousRating: 'Buy',
      priceTarget: 420.00,
      previousTarget: 400.00,
      currentPrice: 388.47,
      upside: 8.12,
      title: 'Azure AI Services Driving Accelerated Cloud Growth',
      summary: 'We raise our price target on MSFT to $420 from $400, maintaining our Buy rating. Azure AI services are driving accelerated cloud adoption and expanding margins.',
      keyPoints: [
        'Azure growth reaccelerating',
        'AI integration across product suite',
        'Office 365 Copilot gaining traction',
        'Strong enterprise demand'
      ],
      risks: [
        'Cloud competition intensifying',
        'Regulatory scrutiny increasing',
        'Economic slowdown impact'
      ],
      confidence: 88,
      timeHorizon: '12 months',
      reportType: 'Target Raise'
    },
    {
      id: 5,
      firm: 'Citi',
      analyst: 'Lisa Wang',
      date: '2024-01-20',
      symbol: 'AMZN',
      company: 'Amazon.com Inc.',
      sector: 'consumer',
      rating: 'Neutral',
      previousRating: 'Buy',
      priceTarget: 145.00,
      previousTarget: 165.00,
      currentPrice: 152.83,
      upside: -5.12,
      title: 'E-commerce Headwinds Outweighing AWS Strength',
      summary: 'We downgrade AMZN to Neutral from Buy and lower our price target to $145 from $165. E-commerce headwinds are outweighing AWS strength in the near term.',
      keyPoints: [
        'E-commerce growth slowing',
        'Increased competition in retail',
        'AWS growth moderating',
        'Cost optimization efforts ongoing'
      ],
      risks: [
        'AWS reacceleration',
        'Advertising business growth',
        'International expansion success'
      ],
      confidence: 72,
      timeHorizon: '12 months',
      reportType: 'Downgrade'
    }
  ]

  const firmStats = {
    'Goldman Sachs': { reports: 45, accuracy: 78, avgTarget: 12.5 },
    'Morgan Stanley': { reports: 52, accuracy: 82, avgTarget: 8.3 },
    'JPMorgan': { reports: 48, accuracy: 85, avgTarget: 15.2 },
    'Bank of America': { reports: 41, accuracy: 79, avgTarget: 11.7 },
    'Citi': { reports: 38, accuracy: 76, avgTarget: 9.8 }
  }

  const sectorCoverage = [
    { sector: 'Technology', reports: 89, avgRating: 'Buy', consensus: 'Bullish' },
    { sector: 'Healthcare', reports: 67, avgRating: 'Overweight', consensus: 'Neutral' },
    { sector: 'Finance', reports: 54, avgRating: 'Neutral', consensus: 'Neutral' },
    { sector: 'Energy', reports: 43, avgRating: 'Underweight', consensus: 'Bearish' },
    { sector: 'Consumer', reports: 71, avgRating: 'Neutral', consensus: 'Mixed' }
  ]

  const filteredReports = researchReports.filter(report => {
    const matchesFirm = selectedFirm === 'all' || report.firm.toLowerCase().replace(/\s+/g, '-') === selectedFirm
    const matchesRating = selectedRating === 'all' || report.rating.toLowerCase() === selectedRating
    const matchesSector = selectedSector === 'all' || report.sector === selectedSector
    return matchesFirm && matchesRating && matchesSector
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'rating':
        const ratingOrder = { 'Buy': 5, 'Overweight': 4, 'Neutral': 3, 'Underweight': 2, 'Sell': 1 }
        return ratingOrder[b.rating] - ratingOrder[a.rating]
      case 'target':
        return Math.abs(b.upside) - Math.abs(a.upside)
      case 'firm':
        return a.firm.localeCompare(b.firm)
      default:
        return 0
    }
  })

  const getRatingColor = (rating: string) => {
    switch (rating.toLowerCase()) {
      case 'buy':
      case 'overweight':
        return '#10b981'
      case 'neutral':
        return '#f59e0b'
      case 'underweight':
      case 'sell':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  const getUpsideColor = (upside: number) => {
    return upside >= 0 ? '#10b981' : '#ef4444'
  }

  const getReportTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'upgrade':
      case 'target raise':
        return '#10b981'
      case 'downgrade':
      case 'target cut':
        return '#ef4444'
      default:
        return '#3b82f6'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <>
      <Navigation />
      <div className="research-page">
        {/* Hero Section */}
        <section className="research-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">📋</span>
                <span>Research Reports</span>
              </div>
              <h1 className="hero-title">
                Analyst Research Center
                <span className="gradient-text">Professional Investment Research</span>
              </h1>
              <p className="hero-description">
                Access comprehensive research reports from top investment banks and brokerage firms 
                with detailed analysis, price targets, and investment recommendations.
              </p>
            </div>
          </div>
        </section>

        {/* Research Overview */}
        <section className="research-overview">
          <div className="container">
            <div className="overview-grid">
              {/* Firm Performance */}
              <div className="overview-card">
                <h3 className="card-title">Top Research Firms</h3>
                <div className="firms-list">
                  {Object.entries(firmStats).map(([firm, stats]) => (
                    <div key={firm} className="firm-item">
                      <div className="firm-info">
                        <span className="firm-name">{firm}</span>
                        <span className="firm-reports">{stats.reports} reports</span>
                      </div>
                      <div className="firm-stats">
                        <span className="accuracy">{stats.accuracy}% accuracy</span>
                        <span className="avg-target">{stats.avgTarget}% avg target</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sector Coverage */}
              <div className="overview-card">
                <h3 className="card-title">Sector Coverage</h3>
                <div className="sectors-list">
                  {sectorCoverage.map((sector, idx) => (
                    <div key={idx} className="sector-item">
                      <div className="sector-info">
                        <span className="sector-name">{sector.sector}</span>
                        <span className="sector-reports">{sector.reports} reports</span>
                      </div>
                      <div className="sector-consensus">
                        <span 
                          className="avg-rating"
                          style={{ color: getRatingColor(sector.avgRating) }}
                        >
                          {sector.avgRating}
                        </span>
                        <span className="consensus">{sector.consensus}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="research-filters">
          <div className="container">
            <div className="filters-container">
              <div className="filter-group">
                <label className="filter-label">Research Firm</label>
                <select 
                  value={selectedFirm}
                  onChange={(e) => setSelectedFirm(e.target.value)}
                  className="filter-select"
                >
                  {firms.map(firm => (
                    <option key={firm} value={firm}>
                      {firm === 'all' ? 'All Firms' : firm.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Rating</label>
                <div className="filter-buttons">
                  {ratings.map(rating => (
                    <button
                      key={rating}
                      className={`filter-btn ${selectedRating === rating ? 'active' : ''}`}
                      onClick={() => setSelectedRating(rating)}
                    >
                      {rating === 'all' ? 'All' : rating.charAt(0).toUpperCase() + rating.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Sector</label>
                <select 
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="filter-select"
                >
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>
                      {sector === 'all' ? 'All Sectors' : sector.charAt(0).toUpperCase() + sector.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Research Reports */}
        <section className="research-reports">
          <div className="container">
            <div className="reports-header">
              <h2 className="section-title">Research Reports</h2>
              <p className="reports-count">{filteredReports.length} reports found</p>
            </div>

            <div className="reports-grid">
              {filteredReports.map((report) => (
                <div key={report.id} className="report-card">
                  <div className="report-header">
                    <div className="report-meta">
                      <div className="firm-info">
                        <span className="firm-name">{report.firm}</span>
                        <span className="analyst-name">{report.analyst}</span>
                      </div>
                      <div className="report-date">{formatDate(report.date)}</div>
                    </div>
                    <div className="report-type">
                      <span 
                        className="type-badge"
                        style={{ backgroundColor: `${getReportTypeColor(report.reportType)}20`, color: getReportTypeColor(report.reportType) }}
                      >
                        {report.reportType}
                      </span>
                    </div>
                  </div>

                  <div className="company-section">
                    <div className="company-info">
                      <div className="symbol">{report.symbol}</div>
                      <div className="company-name">{report.company}</div>
                    </div>
                    <div className="sector-tag">{report.sector}</div>
                  </div>

                  <div className="rating-section">
                    <div className="rating-change">
                      <span className="current-rating" style={{ color: getRatingColor(report.rating) }}>
                        {report.rating}
                      </span>
                      {report.previousRating !== report.rating && (
                        <span className="rating-arrow">
                          ← {report.previousRating}
                        </span>
                      )}
                    </div>
                    <div className="confidence-score">
                      <span className="confidence-label">Confidence:</span>
                      <span className="confidence-value">{report.confidence}%</span>
                    </div>
                  </div>

                  <div className="price-section">
                    <div className="price-targets">
                      <div className="target-item">
                        <span className="target-label">Current:</span>
                        <span className="target-value">${report.currentPrice}</span>
                      </div>
                      <div className="target-item">
                        <span className="target-label">Target:</span>
                        <span className="target-value">${report.priceTarget}</span>
                        {report.previousTarget !== report.priceTarget && (
                          <span className="target-change">
                            (${report.previousTarget})
                          </span>
                        )}
                      </div>
                      <div className="target-item">
                        <span className="target-label">Upside:</span>
                        <span 
                          className="upside-value"
                          style={{ color: getUpsideColor(report.upside) }}
                        >
                          {report.upside >= 0 ? '+' : ''}{report.upside.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="report-content">
                    <h4 className="report-title">{report.title}</h4>
                    <p className="report-summary">{report.summary}</p>
                  </div>

                  <div className="key-points">
                    <h5 className="points-title">Key Investment Points</h5>
                    <ul className="points-list">
                      {report.keyPoints.slice(0, 3).map((point, idx) => (
                        <li key={idx} className="point-item">{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="risks-section">
                    <h5 className="risks-title">Key Risks</h5>
                    <ul className="risks-list">
                      {report.risks.slice(0, 2).map((risk, idx) => (
                        <li key={idx} className="risk-item">{risk}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="report-footer">
                    <div className="time-horizon">
                      <span className="horizon-label">Time Horizon:</span>
                      <span className="horizon-value">{report.timeHorizon}</span>
                    </div>
                    <button className="read-more-btn">Read Full Report</button>
                  </div>
                </div>
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="no-reports">
                <div className="no-reports-icon">📋</div>
                <h3>No Reports Found</h3>
                <p>Try adjusting your filters to see more research reports</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .research-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .research-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .research-hero::before {
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

        .research-overview {
          padding: 60px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .overview-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: #3b82f6;
        }

        .firms-list, .sectors-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .firm-item, .sector-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .firm-info, .sector-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .firm-name, .sector-name {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .firm-reports, .sector-reports {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .firm-stats, .sector-consensus {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-end;
        }

        .accuracy, .avg-target, .avg-rating, .consensus {
          font-size: 0.8rem;
        }

        .research-filters {
          padding: 40px 0;
          background: rgba(0, 0, 0, 0.3);
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

        .research-reports {
          padding: 60px 0;
        }

        .reports-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #3b82f6;
        }

        .reports-count {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 24px;
        }

        .report-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .report-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .report-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .firm-name {
          font-size: 1rem;
          font-weight: 600;
          color: #3b82f6;
        }

        .analyst-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .report-date {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .type-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .company-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .symbol {
          font-size: 1.5rem;
          font-weight: 700;
          color: #3b82f6;
        }

        .company-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 4px;
        }

        .sector-tag {
          padding: 4px 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
          text-transform: capitalize;
        }

        .rating-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .rating-change {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .current-rating {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .rating-arrow {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .confidence-score {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .confidence-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .confidence-value {
          font-size: 1rem;
          font-weight: 600;
          color: #3b82f6;
        }

        .price-section {
          margin-bottom: 16px;
        }

        .price-targets {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .target-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: center;
          padding: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
        }

        .target-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .target-value {
          font-size: 1rem;
          font-weight: 600;
        }

        .target-change {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .upside-value {
          font-size: 1rem;
          font-weight: 600;
        }

        .report-content {
          margin-bottom: 16px;
        }

        .report-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .report-summary {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          font-size: 0.9rem;
        }

        .key-points, .risks-section {
          margin-bottom: 16px;
        }

        .points-title, .risks-title {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #3b82f6;
        }

        .points-list, .risks-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .point-item, .risk-item {
          padding: 4px 0;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          position: relative;
          padding-left: 16px;
        }

        .point-item::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #10b981;
        }

        .risk-item::before {
          content: '⚠';
          position: absolute;
          left: 0;
          color: #f59e0b;
        }

        .report-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .time-horizon {
          display: flex;
          gap: 4px;
          font-size: 0.9rem;
        }

        .horizon-label {
          color: rgba(255, 255, 255, 0.7);
        }

        .horizon-value {
          font-weight: 500;
        }

        .read-more-btn {
          padding: 8px 16px;
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.4);
          border-radius: 6px;
          color: #3b82f6;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .read-more-btn:hover {
          background: rgba(59, 130, 246, 0.3);
        }

        .no-reports {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 255, 255, 0.6);
        }

        .no-reports-icon {
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

          .filters-container {
            flex-direction: column;
            gap: 16px;
          }

          .reports-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .reports-grid {
            grid-template-columns: 1fr;
          }

          .price-targets {
            grid-template-columns: 1fr;
          }

          .report-footer {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  )
}

export default ResearchReportsPage 