'use client'

import React, { useState } from 'react'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

const RiskAssessmentPage = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState('balanced')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M')
  const [selectedModel, setSelectedModel] = useState('var')
  const [confidenceLevel, setConfidenceLevel] = useState(95)

  const portfolioTypes = ['conservative', 'balanced', 'aggressive', 'custom']
  const timeframes = ['1W', '1M', '3M', '6M', '1Y']
  const riskModels = ['var', 'cvar', 'montecarlo', 'stress']

  const portfolioData = {
    conservative: {
      name: 'Conservative Portfolio',
      totalValue: 250000,
      var95: 8500,
      cvar95: 12300,
      sharpeRatio: 0.85,
      maxDrawdown: 5.2,
      volatility: 8.5,
      beta: 0.65,
      riskScore: 3.2,
      allocation: [
        { asset: 'Bonds', percentage: 60, value: 150000, risk: 'Low' },
        { asset: 'Large Cap Stocks', percentage: 25, value: 62500, risk: 'Medium' },
        { asset: 'Cash', percentage: 10, value: 25000, risk: 'Very Low' },
        { asset: 'REITs', percentage: 5, value: 12500, risk: 'Medium' }
      ]
    },
    balanced: {
      name: 'Balanced Portfolio',
      totalValue: 500000,
      var95: 22500,
      cvar95: 31200,
      sharpeRatio: 1.15,
      maxDrawdown: 12.8,
      volatility: 15.2,
      beta: 0.85,
      riskScore: 5.8,
      allocation: [
        { asset: 'Large Cap Stocks', percentage: 40, value: 200000, risk: 'Medium' },
        { asset: 'Bonds', percentage: 30, value: 150000, risk: 'Low' },
        { asset: 'International Stocks', percentage: 15, value: 75000, risk: 'High' },
        { asset: 'Small Cap Stocks', percentage: 10, value: 50000, risk: 'High' },
        { asset: 'Commodities', percentage: 5, value: 25000, risk: 'Very High' }
      ]
    },
    aggressive: {
      name: 'Aggressive Portfolio',
      totalValue: 750000,
      var95: 45000,
      cvar95: 67500,
      sharpeRatio: 1.35,
      maxDrawdown: 25.6,
      volatility: 28.4,
      beta: 1.25,
      riskScore: 8.5,
      allocation: [
        { asset: 'Growth Stocks', percentage: 50, value: 375000, risk: 'High' },
        { asset: 'Small Cap Stocks', percentage: 20, value: 150000, risk: 'High' },
        { asset: 'Crypto', percentage: 15, value: 112500, risk: 'Very High' },
        { asset: 'Emerging Markets', percentage: 10, value: 75000, risk: 'Very High' },
        { asset: 'Options', percentage: 5, value: 37500, risk: 'Extreme' }
      ]
    }
  }

  const riskMetrics = [
    {
      metric: 'Value at Risk (95%)',
      value: portfolioData[selectedPortfolio].var95,
      description: 'Maximum expected loss over 1 month with 95% confidence',
      status: 'normal',
      trend: 'stable'
    },
    {
      metric: 'Conditional VaR (95%)',
      value: portfolioData[selectedPortfolio].cvar95,
      description: 'Expected loss beyond VaR threshold',
      status: 'warning',
      trend: 'increasing'
    },
    {
      metric: 'Sharpe Ratio',
      value: portfolioData[selectedPortfolio].sharpeRatio,
      description: 'Risk-adjusted return measure',
      status: 'good',
      trend: 'improving'
    },
    {
      metric: 'Maximum Drawdown',
      value: portfolioData[selectedPortfolio].maxDrawdown,
      description: 'Largest peak-to-trough decline',
      status: 'normal',
      trend: 'stable'
    }
  ]

  const stressTestScenarios = [
    {
      scenario: '2008 Financial Crisis',
      impact: -35.2,
      probability: 2.5,
      timeframe: '6 months',
      description: 'Severe market downturn similar to 2008',
      severity: 'extreme'
    },
    {
      scenario: 'COVID-19 Market Crash',
      impact: -28.7,
      probability: 5.0,
      timeframe: '3 months',
      description: 'Pandemic-induced market volatility',
      severity: 'high'
    },
    {
      scenario: 'Interest Rate Shock',
      impact: -15.3,
      probability: 15.0,
      timeframe: '1 month',
      description: 'Sudden central bank policy changes',
      severity: 'medium'
    },
    {
      scenario: 'Geopolitical Crisis',
      impact: -22.1,
      probability: 8.0,
      timeframe: '2 months',
      description: 'Major international conflict or crisis',
      severity: 'high'
    }
  ]

  const correlationMatrix = [
    { asset1: 'Stocks', asset2: 'Bonds', correlation: -0.15, strength: 'Weak Negative' },
    { asset1: 'Stocks', asset2: 'Commodities', correlation: 0.35, strength: 'Moderate Positive' },
    { asset1: 'Stocks', asset2: 'Crypto', correlation: 0.65, strength: 'Strong Positive' },
    { asset1: 'Bonds', asset2: 'Commodities', correlation: -0.25, strength: 'Weak Negative' },
    { asset1: 'Bonds', asset2: 'Crypto', correlation: -0.05, strength: 'No Correlation' },
    { asset1: 'Commodities', asset2: 'Crypto', correlation: 0.28, strength: 'Weak Positive' }
  ]

  const riskAlerts = [
    {
      type: 'High Volatility',
      severity: 'warning',
      message: 'Portfolio volatility has increased by 15% over the past week',
      timestamp: '2 hours ago',
      action: 'Consider rebalancing'
    },
    {
      type: 'Correlation Spike',
      severity: 'critical',
      message: 'Asset correlations have increased significantly during market stress',
      timestamp: '4 hours ago',
      action: 'Review diversification'
    },
    {
      type: 'VaR Breach',
      severity: 'info',
      message: 'Daily VaR was exceeded yesterday but within normal limits',
      timestamp: '1 day ago',
      action: 'Monitor closely'
    }
  ]

  const currentPortfolio = portfolioData[selectedPortfolio]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Very Low': return '#10b981'
      case 'Low': return '#06b6d4'
      case 'Medium': return '#f59e0b'
      case 'High': return '#f97316'
      case 'Very High': return '#ef4444'
      case 'Extreme': return '#dc2626'
      default: return '#6b7280'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return '#10b981'
      case 'normal': return '#06b6d4'
      case 'warning': return '#f59e0b'
      case 'critical': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'high': return '#f97316'
      case 'extreme': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getCorrelationColor = (correlation: number) => {
    const abs = Math.abs(correlation)
    if (abs >= 0.7) return '#ef4444'
    if (abs >= 0.5) return '#f97316'
    if (abs >= 0.3) return '#f59e0b'
    return '#10b981'
  }

  return (
    <>
      <Navigation />
      <div className="risk-page">
        {/* Hero Section */}
        <section className="risk-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">⚠️</span>
                <span>Risk Assessment</span>
              </div>
              <h1 className="hero-title">
                Advanced Risk Management
                <span className="gradient-text">VaR Models, Stress Testing, Portfolio Analysis</span>
              </h1>
              <p className="hero-description">
                Comprehensive risk assessment using advanced quantitative models, 
                stress testing scenarios, and real-time portfolio monitoring.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Selection */}
        <section className="portfolio-selection">
          <div className="container">
            <div className="selection-header">
              <h2 className="section-title">Portfolio Analysis</h2>
              <div className="controls">
                <div className="control-group">
                  <label>Portfolio Type</label>
                  <select 
                    value={selectedPortfolio}
                    onChange={(e) => setSelectedPortfolio(e.target.value)}
                    className="control-select"
                  >
                    {portfolioTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="control-group">
                  <label>Timeframe</label>
                  <div className="timeframe-buttons">
                    {timeframes.map(tf => (
                      <button
                        key={tf}
                        className={`timeframe-btn ${selectedTimeframe === tf ? 'active' : ''}`}
                        onClick={() => setSelectedTimeframe(tf)}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Overview */}
            <div className="portfolio-overview">
              <div className="overview-card main-metrics">
                <h3 className="card-title">{currentPortfolio.name}</h3>
                <div className="main-stats">
                  <div className="stat-item">
                    <span className="stat-label">Total Value</span>
                    <span className="stat-value">${currentPortfolio.totalValue.toLocaleString()}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Risk Score</span>
                    <span className="stat-value risk-score">{currentPortfolio.riskScore}/10</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Beta</span>
                    <span className="stat-value">{currentPortfolio.beta}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Volatility</span>
                    <span className="stat-value">{currentPortfolio.volatility}%</span>
                  </div>
                </div>
              </div>

              <div className="overview-card allocation-chart">
                <h3 className="card-title">Asset Allocation</h3>
                <div className="allocation-list">
                  {currentPortfolio.allocation.map((asset, idx) => (
                    <div key={idx} className="allocation-item">
                      <div className="asset-info">
                        <span className="asset-name">{asset.asset}</span>
                        <span className="asset-percentage">{asset.percentage}%</span>
                      </div>
                      <div className="asset-details">
                        <span className="asset-value">${asset.value.toLocaleString()}</span>
                        <span 
                          className="asset-risk"
                          style={{ color: getRiskColor(asset.risk) }}
                        >
                          {asset.risk}
                        </span>
                      </div>
                      <div className="allocation-bar">
                        <div 
                          className="allocation-fill"
                          style={{ 
                            width: `${asset.percentage}%`,
                            backgroundColor: getRiskColor(asset.risk)
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Metrics */}
        <section className="risk-metrics">
          <div className="container">
            <h2 className="section-title">Risk Metrics</h2>
            <div className="metrics-grid">
              {riskMetrics.map((metric, idx) => (
                <div key={idx} className="metric-card">
                  <div className="metric-header">
                    <span className="metric-name">{metric.metric}</span>
                    <span 
                      className="metric-status"
                      style={{ color: getStatusColor(metric.status) }}
                    >
                      {metric.trend}
                    </span>
                  </div>
                  <div className="metric-value">
                    {typeof metric.value === 'number' && metric.value > 100 
                      ? `$${metric.value.toLocaleString()}`
                      : typeof metric.value === 'number' && metric.value < 1
                      ? metric.value.toFixed(2)
                      : typeof metric.value === 'number'
                      ? `${metric.value}%`
                      : metric.value
                    }
                  </div>
                  <div className="metric-description">{metric.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stress Testing */}
        <section className="stress-testing">
          <div className="container">
            <h2 className="section-title">Stress Test Scenarios</h2>
            <div className="scenarios-grid">
              {stressTestScenarios.map((scenario, idx) => (
                <div key={idx} className="scenario-card">
                  <div className="scenario-header">
                    <span className="scenario-name">{scenario.scenario}</span>
                    <span 
                      className="scenario-severity"
                      style={{ color: getSeverityColor(scenario.severity) }}
                    >
                      {scenario.severity}
                    </span>
                  </div>
                  <div className="scenario-impact">
                    <span className="impact-label">Potential Impact</span>
                    <span className="impact-value negative">{scenario.impact}%</span>
                  </div>
                  <div className="scenario-details">
                    <div className="detail-row">
                      <span>Probability:</span>
                      <span>{scenario.probability}%</span>
                    </div>
                    <div className="detail-row">
                      <span>Timeframe:</span>
                      <span>{scenario.timeframe}</span>
                    </div>
                  </div>
                  <div className="scenario-description">{scenario.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Correlation Analysis */}
        <section className="correlation-analysis">
          <div className="container">
            <div className="analysis-grid">
              <div className="analysis-card">
                <h3 className="card-title">Asset Correlations</h3>
                <div className="correlation-matrix">
                  {correlationMatrix.map((corr, idx) => (
                    <div key={idx} className="correlation-row">
                      <div className="correlation-pair">
                        {corr.asset1} vs {corr.asset2}
                      </div>
                      <div className="correlation-value">
                        <span 
                          className="correlation-number"
                          style={{ color: getCorrelationColor(corr.correlation) }}
                        >
                          {corr.correlation.toFixed(2)}
                        </span>
                        <span className="correlation-strength">{corr.strength}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analysis-card">
                <h3 className="card-title">Risk Alerts</h3>
                <div className="alerts-list">
                  {riskAlerts.map((alert, idx) => (
                    <div key={idx} className="alert-item">
                      <div className="alert-header">
                        <span 
                          className="alert-type"
                          style={{ color: getStatusColor(alert.severity) }}
                        >
                          {alert.type}
                        </span>
                        <span className="alert-time">{alert.timestamp}</span>
                      </div>
                      <div className="alert-message">{alert.message}</div>
                      <div className="alert-action">
                        <strong>Recommended Action:</strong> {alert.action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Management Tools */}
        <section className="risk-tools">
          <div className="container">
            <h2 className="section-title">Risk Management Tools</h2>
            <div className="tools-grid">
              <div className="tool-card">
                <div className="tool-icon">📊</div>
                <h3 className="tool-title">Monte Carlo Simulation</h3>
                <p className="tool-description">
                  Run thousands of scenarios to model potential portfolio outcomes
                </p>
                <button className="tool-button">Run Simulation</button>
              </div>
              
              <div className="tool-card">
                <div className="tool-icon">🎯</div>
                <h3 className="tool-title">Portfolio Optimization</h3>
                <p className="tool-description">
                  Optimize asset allocation for maximum risk-adjusted returns
                </p>
                <button className="tool-button">Optimize Portfolio</button>
              </div>
              
              <div className="tool-card">
                <div className="tool-icon">🛡️</div>
                <h3 className="tool-title">Hedging Strategies</h3>
                <p className="tool-description">
                  Implement hedging strategies to protect against downside risk
                </p>
                <button className="tool-button">View Strategies</button>
              </div>
              
              <div className="tool-card">
                <div className="tool-icon">📈</div>
                <h3 className="tool-title">Backtesting</h3>
                <p className="tool-description">
                  Test portfolio performance against historical market conditions
                </p>
                <button className="tool-button">Start Backtest</button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .risk-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
        }

        .risk-hero {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .risk-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 70%);
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
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
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
          background: linear-gradient(135deg, #ef4444, #f97316, #f59e0b);
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

        .portfolio-selection {
          padding: 60px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .selection-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
        }

        .controls {
          display: flex;
          gap: 24px;
          align-items: end;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-group label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .control-select {
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          min-width: 150px;
        }

        .control-select option {
          background: #1a1a2e;
          color: white;
        }

        .timeframe-buttons {
          display: flex;
          gap: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 4px;
        }

        .timeframe-btn {
          padding: 8px 16px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }

        .timeframe-btn.active,
        .timeframe-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: white;
        }

        .portfolio-overview {
          display: grid;
          grid-template-columns: 1fr 1fr;
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
          color: #ef4444;
        }

        .main-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .stat-value {
          font-size: 1.4rem;
          font-weight: 700;
        }

        .risk-score {
          color: #f59e0b;
        }

        .allocation-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .allocation-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .asset-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .asset-name {
          font-weight: 600;
        }

        .asset-percentage {
          font-weight: 600;
          color: #ef4444;
        }

        .asset-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }

        .asset-value {
          color: rgba(255, 255, 255, 0.8);
        }

        .asset-risk {
          font-weight: 500;
        }

        .allocation-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .allocation-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .risk-metrics {
          padding: 60px 0;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .metric-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .metric-name {
          font-weight: 600;
          color: white;
        }

        .metric-status {
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .metric-value {
          font-size: 2rem;
          font-weight: 700;
          color: #ef4444;
          margin-bottom: 8px;
        }

        .metric-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
        }

        .stress-testing {
          padding: 60px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .scenarios-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .scenario-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .scenario-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .scenario-name {
          font-weight: 600;
          color: white;
        }

        .scenario-severity {
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: capitalize;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
        }

        .scenario-impact {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .impact-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .impact-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .impact-value.negative {
          color: #ef4444;
        }

        .scenario-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .detail-row span:first-child {
          color: rgba(255, 255, 255, 0.7);
        }

        .scenario-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
        }

        .correlation-analysis {
          padding: 60px 0;
        }

        .analysis-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .analysis-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .correlation-matrix {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .correlation-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .correlation-pair {
          font-weight: 500;
        }

        .correlation-value {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .correlation-number {
          font-weight: 700;
          font-size: 1.1rem;
        }

        .correlation-strength {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .alerts-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .alert-item {
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border-left: 4px solid #ef4444;
        }

        .alert-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .alert-type {
          font-weight: 600;
        }

        .alert-time {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .alert-message {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .alert-action {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .risk-tools {
          padding: 60px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .tool-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .tool-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .tool-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .tool-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #ef4444;
        }

        .tool-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
          margin-bottom: 20px;
        }

        .tool-button {
          padding: 10px 20px;
          background: linear-gradient(135deg, #ef4444, #f97316);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tool-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
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

          .selection-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .controls {
            flex-direction: column;
            gap: 16px;
            width: 100%;
          }

          .portfolio-overview {
            grid-template-columns: 1fr;
          }

          .main-stats {
            grid-template-columns: 1fr;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .scenarios-grid {
            grid-template-columns: 1fr;
          }

          .analysis-grid {
            grid-template-columns: 1fr;
          }

          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  )
}

export default RiskAssessmentPage 