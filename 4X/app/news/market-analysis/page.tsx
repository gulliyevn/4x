'use client'

import React, { useState } from 'react'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

const MarketAnalysisPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [selectedSector, setSelectedSector] = useState('all')
  const [analysisType, setAnalysisType] = useState('technical')

  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y']
  const sectors = ['all', 'technology', 'healthcare', 'finance', 'energy', 'consumer', 'industrial']
  const analysisTypes = ['technical', 'fundamental', 'sentiment']

  const marketOverview = {
    indices: [
      { name: 'S&P 500', value: 4785.32, change: 1.24, changePercent: 2.65 },
      { name: 'NASDAQ', value: 15234.87, change: 89.45, changePercent: 1.89 },
      { name: 'DOW JONES', value: 37845.12, change: -45.23, changePercent: -0.12 },
      { name: 'RUSSELL 2000', value: 2087.45, change: 15.67, changePercent: 0.76 }
    ],
    vix: { value: 14.2, change: -1.8, status: 'Low Volatility' },
    breadth: { advancing: 1247, declining: 856, ratio: 1.46 }
  }

  const sectorPerformance = [
    { name: 'Technology', performance: 3.2, volume: 2.8, momentum: 'Strong', outlook: 'Bullish' },
    { name: 'Healthcare', performance: 1.8, volume: 1.2, momentum: 'Moderate', outlook: 'Neutral' },
    { name: 'Finance', performance: 2.1, volume: 1.9, momentum: 'Strong', outlook: 'Bullish' },
    { name: 'Energy', performance: -0.8, volume: 2.1, momentum: 'Weak', outlook: 'Bearish' },
    { name: 'Consumer Discretionary', performance: 1.5, volume: 1.4, momentum: 'Moderate', outlook: 'Neutral' },
    { name: 'Industrial', performance: 0.9, volume: 1.1, momentum: 'Weak', outlook: 'Neutral' },
    { name: 'Materials', performance: -0.3, volume: 0.8, momentum: 'Weak', outlook: 'Bearish' },
    { name: 'Utilities', performance: 0.4, volume: 0.6, momentum: 'Weak', outlook: 'Neutral' },
    { name: 'Real Estate', performance: 1.2, volume: 0.9, momentum: 'Moderate', outlook: 'Neutral' },
    { name: 'Communication', performance: 2.8, volume: 2.2, momentum: 'Strong', outlook: 'Bullish' }
  ]

  const technicalAnalysis = {
    spx: {
      price: 4785.32,
      support: [4720, 4680, 4620],
      resistance: [4820, 4880, 4950],
      rsi: 68.4,
      macd: { value: 12.5, signal: 8.3, histogram: 4.2 },
      movingAverages: {
        sma20: 4742.1,
        sma50: 4698.7,
        sma200: 4521.3
      },
      trend: 'Bullish',
      strength: 'Strong'
    }
  }

  const expertInsights = [
    {
      id: 1,
      analyst: 'Sarah Johnson',
      firm: 'Goldman Sachs',
      title: 'Tech Sector Outlook Remains Positive Despite Valuation Concerns',
      summary: 'Despite elevated valuations, the technology sector continues to show strong fundamentals driven by AI adoption and cloud migration trends.',
      rating: 'Overweight',
      target: 5200,
      confidence: 85,
      timeframe: '12 months',
      keyPoints: [
        'AI revolution driving unprecedented growth',
        'Cloud adoption accelerating post-pandemic',
        'Strong earnings visibility for mega-cap tech',
        'Valuation concerns may limit near-term upside'
      ]
    },
    {
      id: 2,
      analyst: 'Michael Chen',
      firm: 'JPMorgan',
      title: 'Federal Reserve Policy Shift Creates Opportunities',
      summary: 'Anticipated Fed policy easing in 2024 could provide tailwinds for risk assets, particularly growth stocks and emerging markets.',
      rating: 'Neutral',
      target: 4900,
      confidence: 72,
      timeframe: '6 months',
      keyPoints: [
        'Fed pivot likely in H2 2024',
        'Lower rates benefit growth stocks',
        'Dollar weakness supports commodities',
        'Geopolitical risks remain elevated'
      ]
    },
    {
      id: 3,
      analyst: 'Emma Rodriguez',
      firm: 'Morgan Stanley',
      title: 'Emerging Market Equities Poised for Outperformance',
      summary: 'Improving economic fundamentals and attractive valuations make emerging markets an compelling investment opportunity.',
      rating: 'Overweight',
      target: 1250,
      confidence: 78,
      timeframe: '18 months',
      keyPoints: [
        'Attractive relative valuations',
        'Improving economic fundamentals',
        'Currency stabilization trends',
        'Commodity exposure benefits'
      ]
    }
  ]

  const marketThemes = [
    {
      theme: 'Artificial Intelligence Revolution',
      impact: 'High',
      timeframe: 'Long-term',
      description: 'AI adoption across industries driving productivity gains and new business models',
      beneficiaries: ['NVDA', 'MSFT', 'GOOGL', 'META'],
      risks: ['Regulatory concerns', 'Valuation bubbles', 'Competition']
    },
    {
      theme: 'Energy Transition',
      impact: 'Medium',
      timeframe: 'Medium-term',
      description: 'Shift towards renewable energy and electric vehicles reshaping energy sector',
      beneficiaries: ['TSLA', 'ENPH', 'NEE', 'ICLN'],
      risks: ['Policy changes', 'Technology disruption', 'Commodity volatility']
    },
    {
      theme: 'Deglobalization Trends',
      impact: 'Medium',
      timeframe: 'Long-term',
      description: 'Supply chain reshoring and geopolitical tensions affecting global trade',
      beneficiaries: ['Domestic manufacturers', 'Infrastructure', 'Defense'],
      risks: ['Higher costs', 'Reduced efficiency', 'Trade wars']
    }
  ]

  const getPerformanceColor = (value: number) => {
    if (value > 2) return '#10b981'
    if (value > 0) return '#3b82f6'
    if (value > -1) return '#f59e0b'
    return '#ef4444'
  }

  const getMomentumColor = (momentum: string) => {
    switch (momentum) {
      case 'Strong': return '#10b981'
      case 'Moderate': return '#3b82f6'
      case 'Weak': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getOutlookColor = (outlook: string) => {
    switch (outlook) {
      case 'Bullish': return '#10b981'
      case 'Neutral': return '#f59e0b'
      case 'Bearish': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <>
      <Navigation />
      <div className="market-analysis-page">
        {/* Hero Section */}
        <section className="analysis-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">📊</span>
                <span>Market Analysis</span>
              </div>
              <h1 className="hero-title">
                Professional Market Analysis
                <span className="gradient-text">Technical • Fundamental • Sentiment</span>
              </h1>
              <p className="hero-description">
                Comprehensive market analysis combining technical indicators, fundamental research, 
                and sentiment analysis from leading financial institutions.
              </p>
            </div>
          </div>
        </section>

        {/* Market Overview */}
        <section className="market-overview">
          <div className="container">
            <h2 className="section-title">Market Overview</h2>
            <div className="overview-grid">
              {/* Major Indices */}
              <div className="overview-card">
                <h3 className="card-title">Major Indices</h3>
                <div className="indices-list">
                  {marketOverview.indices.map((index, idx) => (
                    <div key={idx} className="index-item">
                      <div className="index-info">
                        <span className="index-name">{index.name}</span>
                        <span className="index-value">{index.value.toLocaleString()}</span>
                      </div>
                      <div className="index-change">
                        <span className={`change-value ${index.change >= 0 ? 'positive' : 'negative'}`}>
                          {index.change >= 0 ? '+' : ''}{index.change}
                        </span>
                        <span className={`change-percent ${index.changePercent >= 0 ? 'positive' : 'negative'}`}>
                          ({index.changePercent >= 0 ? '+' : ''}{index.changePercent}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Breadth */}
              <div className="overview-card">
                <h3 className="card-title">Market Breadth</h3>
                <div className="breadth-content">
                  <div className="breadth-ratio">
                    <span className="ratio-value">{marketOverview.breadth.ratio}</span>
                    <span className="ratio-label">Advance/Decline Ratio</span>
                  </div>
                  <div className="breadth-details">
                    <div className="breadth-item">
                      <span className="breadth-label">Advancing</span>
                      <span className="breadth-value positive">{marketOverview.breadth.advancing}</span>
                    </div>
                    <div className="breadth-item">
                      <span className="breadth-label">Declining</span>
                      <span className="breadth-value negative">{marketOverview.breadth.declining}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* VIX */}
              <div className="overview-card">
                <h3 className="card-title">Volatility Index (VIX)</h3>
                <div className="vix-content">
                  <div className="vix-value">{marketOverview.vix.value}</div>
                  <div className="vix-change">
                    <span className={`change-value ${marketOverview.vix.change >= 0 ? 'positive' : 'negative'}`}>
                      {marketOverview.vix.change >= 0 ? '+' : ''}{marketOverview.vix.change}
                    </span>
                  </div>
                  <div className="vix-status">{marketOverview.vix.status}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analysis Controls */}
        <section className="analysis-controls">
          <div className="container">
            <div className="controls-container">
              <div className="control-group">
                <label className="control-label">Analysis Type</label>
                <div className="control-buttons">
                  {analysisTypes.map(type => (
                    <button
                      key={type}
                      className={`control-btn ${analysisType === type ? 'active' : ''}`}
                      onClick={() => setAnalysisType(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">Timeframe</label>
                <div className="control-buttons">
                  {timeframes.map(tf => (
                    <button
                      key={tf}
                      className={`control-btn ${selectedTimeframe === tf ? 'active' : ''}`}
                      onClick={() => setSelectedTimeframe(tf)}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">Sector Focus</label>
                <select 
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="sector-select"
                >
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>
                      {sector === 'all' ? 'All Sectors' : sector.charAt(0).toUpperCase() + sector.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Sector Performance */}
        <section className="sector-performance">
          <div className="container">
            <h2 className="section-title">Sector Performance Analysis</h2>
            <div className="sector-grid">
              {sectorPerformance.map((sector, idx) => (
                <div key={idx} className="sector-card">
                  <div className="sector-header">
                    <h3 className="sector-name">{sector.name}</h3>
                    <span 
                      className="sector-performance"
                      style={{ color: getPerformanceColor(sector.performance) }}
                    >
                      {sector.performance >= 0 ? '+' : ''}{sector.performance}%
                    </span>
                  </div>
                  <div className="sector-metrics">
                    <div className="metric-item">
                      <span className="metric-label">Volume</span>
                      <span className="metric-value">{sector.volume}x</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Momentum</span>
                      <span 
                        className="metric-value"
                        style={{ color: getMomentumColor(sector.momentum) }}
                      >
                        {sector.momentum}
                      </span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Outlook</span>
                      <span 
                        className="metric-value"
                        style={{ color: getOutlookColor(sector.outlook) }}
                      >
                        {sector.outlook}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Analysis */}
        {analysisType === 'technical' && (
          <section className="technical-analysis">
            <div className="container">
              <h2 className="section-title">Technical Analysis - S&P 500</h2>
              <div className="technical-grid">
                {/* Price Action */}
                <div className="technical-card">
                  <h3 className="card-title">Price Action</h3>
                  <div className="price-info">
                    <div className="current-price">
                      <span className="price-value">{technicalAnalysis.spx.price}</span>
                      <span className="price-trend">{technicalAnalysis.spx.trend}</span>
                    </div>
                    <div className="support-resistance">
                      <div className="sr-section">
                        <h4 className="sr-title">Support Levels</h4>
                        {technicalAnalysis.spx.support.map((level, idx) => (
                          <span key={idx} className="sr-level support">{level}</span>
                        ))}
                      </div>
                      <div className="sr-section">
                        <h4 className="sr-title">Resistance Levels</h4>
                        {technicalAnalysis.spx.resistance.map((level, idx) => (
                          <span key={idx} className="sr-level resistance">{level}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Indicators */}
                <div className="technical-card">
                  <h3 className="card-title">Technical Indicators</h3>
                  <div className="indicators-list">
                    <div className="indicator-item">
                      <span className="indicator-name">RSI (14)</span>
                      <span className="indicator-value">{technicalAnalysis.spx.rsi}</span>
                      <div className="rsi-bar">
                        <div 
                          className="rsi-fill"
                          style={{ width: `${technicalAnalysis.spx.rsi}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="indicator-item">
                      <span className="indicator-name">MACD</span>
                      <span className="indicator-value">{technicalAnalysis.spx.macd.value}</span>
                      <span className="indicator-signal">Signal: {technicalAnalysis.spx.macd.signal}</span>
                    </div>
                  </div>
                </div>

                {/* Moving Averages */}
                <div className="technical-card">
                  <h3 className="card-title">Moving Averages</h3>
                  <div className="ma-list">
                    <div className="ma-item">
                      <span className="ma-name">SMA 20</span>
                      <span className="ma-value">{technicalAnalysis.spx.movingAverages.sma20}</span>
                      <span className="ma-status bullish">Above</span>
                    </div>
                    <div className="ma-item">
                      <span className="ma-name">SMA 50</span>
                      <span className="ma-value">{technicalAnalysis.spx.movingAverages.sma50}</span>
                      <span className="ma-status bullish">Above</span>
                    </div>
                    <div className="ma-item">
                      <span className="ma-name">SMA 200</span>
                      <span className="ma-value">{technicalAnalysis.spx.movingAverages.sma200}</span>
                      <span className="ma-status bullish">Above</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Expert Insights */}
        <section className="expert-insights">
          <div className="container">
            <h2 className="section-title">Expert Insights & Analysis</h2>
            <div className="insights-grid">
              {expertInsights.map((insight) => (
                <div key={insight.id} className="insight-card">
                  <div className="insight-header">
                    <div className="analyst-info">
                      <h3 className="analyst-name">{insight.analyst}</h3>
                      <span className="analyst-firm">{insight.firm}</span>
                    </div>
                    <div className="insight-rating">
                      <span className={`rating-badge ${insight.rating.toLowerCase()}`}>
                        {insight.rating}
                      </span>
                    </div>
                  </div>
                  <h4 className="insight-title">{insight.title}</h4>
                  <p className="insight-summary">{insight.summary}</p>
                  
                  <div className="insight-metrics">
                    <div className="metric-item">
                      <span className="metric-label">Price Target</span>
                      <span className="metric-value">{insight.target}</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Confidence</span>
                      <span className="metric-value">{insight.confidence}%</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Timeframe</span>
                      <span className="metric-value">{insight.timeframe}</span>
                    </div>
                  </div>

                  <div className="key-points">
                    <h5 className="points-title">Key Points:</h5>
                    <ul className="points-list">
                      {insight.keyPoints.map((point, idx) => (
                        <li key={idx} className="point-item">{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Themes */}
        <section className="market-themes">
          <div className="container">
            <h2 className="section-title">Key Market Themes</h2>
            <div className="themes-grid">
              {marketThemes.map((theme, idx) => (
                <div key={idx} className="theme-card">
                  <div className="theme-header">
                    <h3 className="theme-title">{theme.theme}</h3>
                    <div className="theme-meta">
                      <span className={`impact-badge ${theme.impact.toLowerCase()}`}>
                        {theme.impact} Impact
                      </span>
                      <span className="timeframe-badge">{theme.timeframe}</span>
                    </div>
                  </div>
                  <p className="theme-description">{theme.description}</p>
                  
                  <div className="theme-details">
                    <div className="detail-section">
                      <h4 className="detail-title">Key Beneficiaries</h4>
                      <div className="beneficiaries-list">
                        {theme.beneficiaries.map((beneficiary, idx) => (
                          <span key={idx} className="beneficiary-tag">{beneficiary}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="detail-section">
                      <h4 className="detail-title">Key Risks</h4>
                      <ul className="risks-list">
                        {theme.risks.map((risk, idx) => (
                          <li key={idx} className="risk-item">{risk}</li>
                        ))}
                      </ul>
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
        .market-analysis-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .analysis-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .analysis-hero::before {
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

        .market-overview {
          padding: 60px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 32px;
          color: #3b82f6;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

        .indices-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .index-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .index-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .index-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .index-value {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .index-change {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .change-value, .change-percent {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .change-value.positive, .change-percent.positive {
          color: #10b981;
        }

        .change-value.negative, .change-percent.negative {
          color: #ef4444;
        }

        .breadth-content {
          text-align: center;
        }

        .breadth-ratio {
          margin-bottom: 20px;
        }

        .ratio-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #10b981;
          margin-bottom: 4px;
        }

        .ratio-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .breadth-details {
          display: flex;
          justify-content: space-around;
        }

        .breadth-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .breadth-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .breadth-value {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .breadth-value.positive {
          color: #10b981;
        }

        .breadth-value.negative {
          color: #ef4444;
        }

        .vix-content {
          text-align: center;
        }

        .vix-value {
          font-size: 3rem;
          font-weight: 700;
          color: #f59e0b;
          margin-bottom: 8px;
        }

        .vix-change {
          margin-bottom: 12px;
        }

        .vix-status {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .analysis-controls {
          padding: 40px 0;
          background: rgba(0, 0, 0, 0.3);
        }

        .controls-container {
          display: flex;
          gap: 32px;
          align-items: end;
          flex-wrap: wrap;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .control-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .control-btn {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .control-btn:hover,
        .control-btn.active {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.4);
        }

        .sector-select {
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          min-width: 150px;
        }

        .sector-select option {
          background: #1a1a2e;
          color: white;
        }

        .sector-performance {
          padding: 60px 0;
        }

        .sector-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .sector-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .sector-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .sector-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .sector-name {
          font-size: 1rem;
          font-weight: 600;
        }

        .sector-performance {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .sector-metrics {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .metric-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }

        .metric-label {
          color: rgba(255, 255, 255, 0.7);
        }

        .metric-value {
          font-weight: 500;
        }

        .technical-analysis {
          padding: 60px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .technical-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        .technical-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .price-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .current-price {
          text-align: center;
        }

        .price-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #10b981;
          margin-bottom: 8px;
        }

        .price-trend {
          font-size: 1rem;
          color: #3b82f6;
          font-weight: 600;
        }

        .support-resistance {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .sr-section {
          text-align: center;
        }

        .sr-title {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 12px;
        }

        .sr-level {
          display: block;
          padding: 4px 8px;
          margin: 4px 0;
          border-radius: 4px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .sr-level.support {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .sr-level.resistance {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .indicators-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .indicator-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .indicator-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .indicator-value {
          font-size: 1.2rem;
          font-weight: 600;
          color: #3b82f6;
        }

        .indicator-signal {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .rsi-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .rsi-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #f59e0b, #ef4444);
          transition: width 0.3s ease;
        }

        .ma-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ma-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
        }

        .ma-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .ma-value {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .ma-status {
          font-size: 0.8rem;
          font-weight: 500;
        }

        .ma-status.bullish {
          color: #10b981;
        }

        .expert-insights {
          padding: 60px 0;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .insight-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .insight-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .analyst-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .analyst-name {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .analyst-firm {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .rating-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .rating-badge.overweight {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .rating-badge.neutral {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .insight-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .insight-summary {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .insight-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 20px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .key-points {
          margin-top: 20px;
        }

        .points-title {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #3b82f6;
        }

        .points-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .point-item {
          padding: 6px 0;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          position: relative;
          padding-left: 16px;
        }

        .point-item::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #3b82f6;
        }

        .market-themes {
          padding: 60px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .themes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .theme-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .theme-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .theme-title {
          font-size: 1.2rem;
          font-weight: 600;
          flex: 1;
        }

        .theme-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-end;
        }

        .impact-badge {
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .impact-badge.high {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .impact-badge.medium {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .timeframe-badge {
          padding: 2px 6px;
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .theme-description {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .theme-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .detail-section {
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .detail-title {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #3b82f6;
        }

        .beneficiaries-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .beneficiary-tag {
          padding: 4px 8px;
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .risks-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .risk-item {
          padding: 4px 0;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          position: relative;
          padding-left: 16px;
        }

        .risk-item::before {
          content: '⚠';
          position: absolute;
          left: 0;
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

          .overview-grid {
            grid-template-columns: 1fr;
          }

          .controls-container {
            flex-direction: column;
            gap: 16px;
          }

          .sector-grid {
            grid-template-columns: 1fr;
          }

          .technical-grid {
            grid-template-columns: 1fr;
          }

          .support-resistance {
            grid-template-columns: 1fr;
          }

          .insights-grid {
            grid-template-columns: 1fr;
          }

          .insight-metrics {
            grid-template-columns: 1fr;
          }

          .themes-grid {
            grid-template-columns: 1fr;
          }

          .theme-header {
            flex-direction: column;
            gap: 12px;
          }

          .theme-meta {
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  )
}

export default MarketAnalysisPage 