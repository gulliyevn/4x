import React, { useState, useEffect } from 'react'
import { usePerformanceMonitor } from '../../utils/performance'

const PerformanceDashboard = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    apiResponseTime: 45,
    dataProcessingSpeed: 1.2,
    predictionAccuracy: 94.7,
    systemUptime: 99.98,
    activeConnections: 12847,
    dataPointsProcessed: 2847392,
    predictionsGenerated: 15847,
    alertsSent: 3247
  })

  const [realtimeStats, setRealtimeStats] = useState({
    currentUsers: 12847,
    tradesExecuted: 8934,
    volumeProcessed: 2.4,
    aiPredictions: 1247,
    marketAlerts: 89,
    newsAnalyzed: 456
  })

  const { startTiming, getMetrics } = usePerformanceMonitor('dashboard-render')

  useEffect(() => {
    const endTiming = startTiming()
    
    const interval = setInterval(() => {
      // Simulate real-time metric updates
      setSystemMetrics(prev => ({
        ...prev,
        apiResponseTime: Math.max(20, prev.apiResponseTime + (Math.random() - 0.5) * 10),
        dataProcessingSpeed: Math.max(0.5, prev.dataProcessingSpeed + (Math.random() - 0.5) * 0.2),
        predictionAccuracy: Math.max(90, Math.min(99, prev.predictionAccuracy + (Math.random() - 0.5) * 0.5)),
        activeConnections: Math.max(10000, prev.activeConnections + Math.floor((Math.random() - 0.5) * 200)),
        dataPointsProcessed: prev.dataPointsProcessed + Math.floor(Math.random() * 1000),
        predictionsGenerated: prev.predictionsGenerated + Math.floor(Math.random() * 50),
        alertsSent: prev.alertsSent + Math.floor(Math.random() * 10)
      }))

      setRealtimeStats(prev => ({
        ...prev,
        currentUsers: Math.max(8000, prev.currentUsers + Math.floor((Math.random() - 0.5) * 100)),
        tradesExecuted: prev.tradesExecuted + Math.floor(Math.random() * 20),
        volumeProcessed: Math.max(1, prev.volumeProcessed + (Math.random() - 0.5) * 0.1),
        aiPredictions: prev.aiPredictions + Math.floor(Math.random() * 15),
        marketAlerts: prev.marketAlerts + Math.floor(Math.random() * 5),
        newsAnalyzed: prev.newsAnalyzed + Math.floor(Math.random() * 10)
      }))
    }, 2000)

    return () => {
      clearInterval(interval)
      endTiming()
    }
  }, [startTiming])

  const formatNumber = (num: number, decimals: number = 0) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toFixed(decimals)
  }

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return '#10b981'
    if (value >= thresholds.warning) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <section className="performance-dashboard-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Platform Performance
            <span className="live-indicator">
              <span className="live-dot"></span>
              LIVE
            </span>
          </h2>
          <p className="section-subtitle">
            Real-time monitoring of our AI trading platform's performance and user engagement
          </p>
        </div>

        <div className="performance-grid">
          {/* System Health Metrics */}
          <div className="performance-category">
            <h3 className="category-title">
              <span className="category-icon">⚡</span>
              System Health
            </h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-header">
                  <span className="metric-icon">🚀</span>
                  <span className="metric-label">API Response</span>
                </div>
                <div className="metric-value">
                  <span className="value-number">{systemMetrics.apiResponseTime.toFixed(0)}</span>
                  <span className="value-unit">ms</span>
                </div>
                <div className="metric-status">
                  <div 
                    className="status-bar"
                    style={{ 
                      backgroundColor: getStatusColor(100 - systemMetrics.apiResponseTime, { good: 50, warning: 30 })
                    }}
                  ></div>
                  <span className="status-text">Excellent</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <span className="metric-icon">⚙️</span>
                  <span className="metric-label">Processing Speed</span>
                </div>
                <div className="metric-value">
                  <span className="value-number">{systemMetrics.dataProcessingSpeed.toFixed(1)}</span>
                  <span className="value-unit">GB/s</span>
                </div>
                <div className="metric-status">
                  <div 
                    className="status-bar"
                    style={{ 
                      backgroundColor: getStatusColor(systemMetrics.dataProcessingSpeed, { good: 1.0, warning: 0.7 })
                    }}
                  ></div>
                  <span className="status-text">Optimal</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <span className="metric-icon">🎯</span>
                  <span className="metric-label">AI Accuracy</span>
                </div>
                <div className="metric-value">
                  <span className="value-number">{systemMetrics.predictionAccuracy.toFixed(1)}</span>
                  <span className="value-unit">%</span>
                </div>
                <div className="metric-status">
                  <div 
                    className="status-bar"
                    style={{ 
                      backgroundColor: getStatusColor(systemMetrics.predictionAccuracy, { good: 90, warning: 80 })
                    }}
                  ></div>
                  <span className="status-text">Outstanding</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <span className="metric-icon">🔄</span>
                  <span className="metric-label">Uptime</span>
                </div>
                <div className="metric-value">
                  <span className="value-number">{systemMetrics.systemUptime.toFixed(2)}</span>
                  <span className="value-unit">%</span>
                </div>
                <div className="metric-status">
                  <div 
                    className="status-bar"
                    style={{ 
                      backgroundColor: getStatusColor(systemMetrics.systemUptime, { good: 99.5, warning: 99.0 })
                    }}
                  ></div>
                  <span className="status-text">Excellent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Activity */}
          <div className="performance-category">
            <h3 className="category-title">
              <span className="category-icon">📊</span>
              Real-time Activity
            </h3>
            <div className="activity-grid">
              <div className="activity-card">
                <div className="activity-icon">👥</div>
                <div className="activity-content">
                  <div className="activity-value">{formatNumber(realtimeStats.currentUsers)}</div>
                  <div className="activity-label">Active Users</div>
                </div>
                <div className="activity-trend positive">+2.3%</div>
              </div>

              <div className="activity-card">
                <div className="activity-icon">💹</div>
                <div className="activity-content">
                  <div className="activity-value">{formatNumber(realtimeStats.tradesExecuted)}</div>
                  <div className="activity-label">Trades Today</div>
                </div>
                <div className="activity-trend positive">+15.7%</div>
              </div>

              <div className="activity-card">
                <div className="activity-icon">💰</div>
                <div className="activity-content">
                  <div className="activity-value">${realtimeStats.volumeProcessed.toFixed(1)}B</div>
                  <div className="activity-label">Volume Processed</div>
                </div>
                <div className="activity-trend positive">+8.9%</div>
              </div>

              <div className="activity-card">
                <div className="activity-icon">🤖</div>
                <div className="activity-content">
                  <div className="activity-value">{formatNumber(realtimeStats.aiPredictions)}</div>
                  <div className="activity-label">AI Predictions</div>
                </div>
                <div className="activity-trend positive">+12.4%</div>
              </div>

              <div className="activity-card">
                <div className="activity-icon">🔔</div>
                <div className="activity-content">
                  <div className="activity-value">{formatNumber(realtimeStats.marketAlerts)}</div>
                  <div className="activity-label">Market Alerts</div>
                </div>
                <div className="activity-trend neutral">+0.8%</div>
              </div>

              <div className="activity-card">
                <div className="activity-icon">📰</div>
                <div className="activity-content">
                  <div className="activity-value">{formatNumber(realtimeStats.newsAnalyzed)}</div>
                  <div className="activity-label">News Analyzed</div>
                </div>
                <div className="activity-trend positive">+5.2%</div>
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="performance-category">
            <h3 className="category-title">
              <span className="category-icon">💡</span>
              Performance Insights
            </h3>
            <div className="insights-list">
              <div className="insight-item">
                <div className="insight-icon success">✅</div>
                <div className="insight-content">
                  <div className="insight-title">Peak Performance Achieved</div>
                  <div className="insight-description">
                    AI prediction accuracy reached 94.7%, exceeding industry standards by 15%
                  </div>
                </div>
              </div>

              <div className="insight-item">
                <div className="insight-icon info">ℹ️</div>
                <div className="insight-content">
                  <div className="insight-title">High User Engagement</div>
                  <div className="insight-description">
                    12.8K active users with average session time of 47 minutes
                  </div>
                </div>
              </div>

              <div className="insight-item">
                <div className="insight-icon warning">⚠️</div>
                <div className="insight-content">
                  <div className="insight-title">Server Load Optimization</div>
                  <div className="insight-description">
                    Implementing auto-scaling to handle 23% increase in traffic
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="performance-footer">
          <div className="footer-stats">
            <div className="footer-stat">
              <span className="stat-icon">📈</span>
              <span className="stat-text">
                <strong>{formatNumber(systemMetrics.dataPointsProcessed)}</strong> data points processed today
              </span>
            </div>
            <div className="footer-stat">
              <span className="stat-icon">🔮</span>
              <span className="stat-text">
                <strong>{formatNumber(systemMetrics.predictionsGenerated)}</strong> AI predictions generated
              </span>
            </div>
            <div className="footer-stat">
              <span className="stat-icon">🚨</span>
              <span className="stat-text">
                <strong>{formatNumber(systemMetrics.alertsSent)}</strong> trading alerts sent
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PerformanceDashboard 