'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../../src/components/Navigation'

interface ChartData {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface TechnicalIndicator {
  id: string
  name: string
  category: string
  description: string
  parameters: string[]
  isActive: boolean
}

export default function ChartsPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['SMA', 'RSI'])
  const [chartType, setChartType] = useState('candlestick')
  const [drawingTool, setDrawingTool] = useState('none')

  const [chartData, setChartData] = useState<ChartData[]>([
    { time: '09:30', open: 189.45, high: 191.20, low: 188.90, close: 190.75, volume: 1.2 },
    { time: '10:00', open: 190.75, high: 192.30, low: 189.80, close: 191.45, volume: 1.5 },
    { time: '10:30', open: 191.45, high: 193.10, low: 190.20, close: 192.80, volume: 1.8 },
    { time: '11:00', open: 192.80, high: 194.50, low: 191.90, close: 193.25, volume: 2.1 },
    { time: '11:30', open: 193.25, high: 195.00, low: 192.40, close: 194.60, volume: 2.3 },
    { time: '12:00', open: 194.60, high: 196.20, low: 193.80, close: 195.40, volume: 1.9 },
    { time: '12:30', open: 195.40, high: 197.10, low: 194.50, close: 196.25, volume: 2.0 },
    { time: '13:00', open: 196.25, high: 198.00, low: 195.30, close: 197.15, volume: 2.2 }
  ])

  const technicalIndicators: TechnicalIndicator[] = [
    { id: 'SMA', name: 'Simple Moving Average', category: 'Trend', description: 'Average price over specified periods', parameters: ['Period: 20'], isActive: true },
    { id: 'EMA', name: 'Exponential Moving Average', category: 'Trend', description: 'Weighted average giving more importance to recent prices', parameters: ['Period: 12'], isActive: false },
    { id: 'RSI', name: 'Relative Strength Index', category: 'Momentum', description: 'Measures speed and magnitude of price changes', parameters: ['Period: 14'], isActive: true },
    { id: 'MACD', name: 'MACD', category: 'Momentum', description: 'Moving Average Convergence Divergence', parameters: ['Fast: 12', 'Slow: 26', 'Signal: 9'], isActive: false },
    { id: 'BB', name: 'Bollinger Bands', category: 'Volatility', description: 'Price channels based on standard deviation', parameters: ['Period: 20', 'Deviation: 2'], isActive: false },
    { id: 'STOCH', name: 'Stochastic', category: 'Momentum', description: 'Compares closing price to price range', parameters: ['%K: 14', '%D: 3'], isActive: false },
    { id: 'ATR', name: 'Average True Range', category: 'Volatility', description: 'Measures market volatility', parameters: ['Period: 14'], isActive: false },
    { id: 'VWAP', name: 'Volume Weighted Average Price', category: 'Volume', description: 'Average price weighted by volume', parameters: ['Intraday'], isActive: false }
  ]

  const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'BTC/USD', 'ETH/USD', 'EUR/USD']
  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M']
  const chartTypes = ['candlestick', 'line', 'area', 'bars', 'heikin-ashi']
  const drawingTools = ['none', 'trendline', 'horizontal', 'rectangle', 'fibonacci', 'text']

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      
      // Simulate real-time chart updates
      setChartData(prev => {
        const newData = [...prev]
        const lastCandle = newData[newData.length - 1]
        const newPrice = lastCandle.close + (Math.random() - 0.5) * 2
        
        newData[newData.length - 1] = {
          ...lastCandle,
          close: newPrice,
          high: Math.max(lastCandle.high, newPrice),
          low: Math.min(lastCandle.low, newPrice),
          volume: lastCandle.volume + (Math.random() - 0.5) * 0.5
        }
        
        return newData
      })
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  const toggleIndicator = (indicatorId: string) => {
    setActiveIndicators(prev => 
      prev.includes(indicatorId) 
        ? prev.filter(id => id !== indicatorId)
        : [...prev, indicatorId]
    )
  }

  const getCurrentPrice = () => {
    return chartData[chartData.length - 1]?.close || 0
  }

  const getPriceChange = () => {
    if (chartData.length < 2) return { value: 0, percent: 0 }
    const current = chartData[chartData.length - 1].close
    const previous = chartData[0].open
    const change = current - previous
    const percent = (change / previous) * 100
    return { value: change, percent }
  }

  return (
    <div className="page-container">
      <Navigation />
      
      {/* Charts Header */}
      <section className="charts-header">
        <div className="container">
          <div className="charts-title-section">
            <h1 className="charts-title">
              📊 Advanced Charts & Tools
            </h1>
            <p className="charts-subtitle">
              Professional-grade charting platform with 100+ technical indicators, 
              drawing tools, and AI-powered pattern recognition for comprehensive market analysis.
            </p>
            <div className="charts-status">
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span className="status-text">Real-time Data</span>
              </div>
              <div className="last-updated">
                Last Updated: <span className="timestamp">{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Chart Demo */}
      <section className="chart-demo-section">
        <div className="container">
          <div className="chart-demo-container">
            {/* Chart Controls */}
            <div className="chart-demo-header">
              <div className="chart-controls">
                <div className="symbol-controls">
                  <label className="control-label">Symbol:</label>
                  <select
                    value={selectedSymbol}
                    onChange={(e) => setSelectedSymbol(e.target.value)}
                    className="symbol-select"
                  >
                    {symbols.map(symbol => (
                      <option key={symbol} value={symbol}>{symbol}</option>
                    ))}
                  </select>
                </div>

                <div className="timeframe-controls">
                  <label className="control-label">Timeframe:</label>
                  <div className="timeframe-selector">
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

                <div className="chart-type-controls">
                  <label className="control-label">Chart Type:</label>
                  <select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                    className="chart-type-select"
                  >
                    {chartTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="drawing-tools">
                  <label className="control-label">Drawing:</label>
                  <div className="tool-buttons">
                    {drawingTools.map(tool => (
                      <button
                        key={tool}
                        className={`tool-btn ${drawingTool === tool ? 'active' : ''}`}
                        onClick={() => setDrawingTool(tool)}
                        title={tool.charAt(0).toUpperCase() + tool.slice(1)}
                      >
                        {tool === 'none' && '🚫'}
                        {tool === 'trendline' && '📈'}
                        {tool === 'horizontal' && '➖'}
                        {tool === 'rectangle' && '⬜'}
                        {tool === 'fibonacci' && '🌀'}
                        {tool === 'text' && '📝'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="chart-demo-area">
              <div className="chart-main">
                <div className="chart-header">
                  <div className="price-info">
                    <span className="chart-symbol">{selectedSymbol}</span>
                    <span className="chart-price">${getCurrentPrice().toFixed(2)}</span>
                    <span className={`chart-change ${getPriceChange().value >= 0 ? 'positive' : 'negative'}`}>
                      {getPriceChange().value >= 0 ? '+' : ''}{getPriceChange().value.toFixed(2)} 
                      ({getPriceChange().value >= 0 ? '+' : ''}{getPriceChange().percent.toFixed(2)}%)
                    </span>
                  </div>
                  <div className="chart-info">
                    <span className="timeframe-info">{selectedTimeframe}</span>
                    <span className="chart-type-info">{chartType}</span>
                  </div>
                </div>

                <div className="chart-canvas">
                  <div className="chart-grid">
                    {/* Price Levels */}
                    <div className="price-levels">
                      {[200, 195, 190, 185, 180].map(price => (
                        <div key={price} className="price-level">${price}</div>
                      ))}
                    </div>

                    {/* Candlestick Chart */}
                    <div className="candlesticks">
                      {chartData.map((candle, index) => {
                        const isGreen = candle.close > candle.open
                        const bodyHeight = Math.abs(candle.close - candle.open) * 2
                        const wickTop = (candle.high - Math.max(candle.open, candle.close)) * 2
                        const wickBottom = (Math.min(candle.open, candle.close) - candle.low) * 2
                        
                        return (
                          <div key={index} className="candlestick-container">
                            <div 
                              className={`candlestick ${isGreen ? 'bullish' : 'bearish'}`}
                              style={{ 
                                height: `${Math.max(bodyHeight, 2)}px`,
                                marginTop: `${wickTop}px`,
                                marginBottom: `${wickBottom}px`
                              }}
                            ></div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Volume Bars */}
                    <div className="volume-bars">
                      {chartData.map((candle, index) => (
                        <div 
                          key={index} 
                          className="volume-bar"
                          style={{ height: `${candle.volume * 20}px` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Sidebar */}
              <div className="chart-sidebar">
                <div className="sidebar-section">
                  <h3 className="sidebar-title">Market Data</h3>
                  <div className="market-data">
                    <div className="data-item">
                      <span className="data-label">Open:</span>
                      <span className="data-value">${chartData[0]?.open.toFixed(2)}</span>
                    </div>
                    <div className="data-item">
                      <span className="data-label">High:</span>
                      <span className="data-value">${Math.max(...chartData.map(d => d.high)).toFixed(2)}</span>
                    </div>
                    <div className="data-item">
                      <span className="data-label">Low:</span>
                      <span className="data-value">${Math.min(...chartData.map(d => d.low)).toFixed(2)}</span>
                    </div>
                    <div className="data-item">
                      <span className="data-label">Volume:</span>
                      <span className="data-value">{chartData.reduce((sum, d) => sum + d.volume, 0).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>

                <div className="sidebar-section">
                  <h3 className="sidebar-title">Technical Indicators</h3>
                  <div className="indicators-list">
                    {technicalIndicators.map(indicator => (
                      <div key={indicator.id} className="indicator-item">
                        <div className="indicator-header">
                          <label className="indicator-checkbox">
                            <input
                              type="checkbox"
                              checked={activeIndicators.includes(indicator.id)}
                              onChange={() => toggleIndicator(indicator.id)}
                            />
                            <span className="indicator-name">{indicator.name}</span>
                          </label>
                          <span className="indicator-category">{indicator.category}</span>
                        </div>
                        {activeIndicators.includes(indicator.id) && (
                          <div className="indicator-params">
                            {indicator.parameters.map((param, index) => (
                              <span key={index} className="param">{param}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sidebar-section">
                  <h3 className="sidebar-title">AI Insights</h3>
                  <div className="ai-insights">
                    <div className="insight-item">
                      <div className="insight-icon">🎯</div>
                      <div className="insight-content">
                        <div className="insight-title">Pattern Detected</div>
                        <div className="insight-description">Bullish Flag Formation</div>
                      </div>
                    </div>
                    <div className="insight-item">
                      <div className="insight-icon">📈</div>
                      <div className="insight-content">
                        <div className="insight-title">Support Level</div>
                        <div className="insight-description">Strong at $189.50</div>
                      </div>
                    </div>
                    <div className="insight-item">
                      <div className="insight-icon">⚠️</div>
                      <div className="insight-content">
                        <div className="insight-title">Resistance</div>
                        <div className="insight-description">Key level at $198.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Features */}
      <section className="chart-features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Professional Charting Features</h2>
            <p className="section-subtitle">
              Everything you need for comprehensive technical analysis
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">100+ Technical Indicators</h3>
              <p className="feature-description">
                Complete library of technical indicators including trend, momentum, volatility, and volume indicators.
              </p>
              <div className="feature-list">
                <span className="feature-item">Moving Averages</span>
                <span className="feature-item">Oscillators</span>
                <span className="feature-item">Bollinger Bands</span>
                <span className="feature-item">Fibonacci Tools</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✏️</div>
              <h3 className="feature-title">Advanced Drawing Tools</h3>
              <p className="feature-description">
                Professional drawing tools for technical analysis including trend lines, channels, and geometric patterns.
              </p>
              <div className="feature-list">
                <span className="feature-item">Trend Lines</span>
                <span className="feature-item">Channels</span>
                <span className="feature-item">Fibonacci Retracements</span>
                <span className="feature-item">Geometric Shapes</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">AI Pattern Recognition</h3>
              <p className="feature-description">
                Automated pattern detection using machine learning to identify trading opportunities and key levels.
              </p>
              <div className="feature-list">
                <span className="feature-item">Chart Patterns</span>
                <span className="feature-item">Support/Resistance</span>
                <span className="feature-item">Breakout Signals</span>
                <span className="feature-item">Trend Analysis</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3 className="feature-title">Multi-Timeframe Analysis</h3>
              <p className="feature-description">
                Analyze markets across multiple timeframes from 1-minute to monthly charts for comprehensive analysis.
              </p>
              <div className="feature-list">
                <span className="feature-item">1m - 1M Timeframes</span>
                <span className="feature-item">Synchronized Analysis</span>
                <span className="feature-item">Time-based Alerts</span>
                <span className="feature-item">Historical Data</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Types */}
      <section className="chart-types-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Chart Types</h2>
            <p className="section-subtitle">
              Choose from various chart types to suit your analysis style
            </p>
          </div>
          
          <div className="chart-types-grid">
            <div className="chart-type-card">
              <div className="chart-type-preview">
                <div className="preview-candlesticks">
                  <div className="preview-candle bullish"></div>
                  <div className="preview-candle bearish"></div>
                  <div className="preview-candle bullish"></div>
                  <div className="preview-candle bullish"></div>
                </div>
              </div>
              <h3 className="chart-type-title">Candlestick</h3>
              <p className="chart-type-description">
                Traditional Japanese candlestick charts showing open, high, low, and close prices.
              </p>
            </div>

            <div className="chart-type-card">
              <div className="chart-type-preview">
                <div className="preview-line"></div>
              </div>
              <h3 className="chart-type-title">Line Chart</h3>
              <p className="chart-type-description">
                Simple line chart connecting closing prices for clear trend visualization.
              </p>
            </div>

            <div className="chart-type-card">
              <div className="chart-type-preview">
                <div className="preview-area"></div>
              </div>
              <h3 className="chart-type-title">Area Chart</h3>
              <p className="chart-type-description">
                Filled area chart highlighting price movements and trends over time.
              </p>
            </div>

            <div className="chart-type-card">
              <div className="chart-type-preview">
                <div className="preview-bars">
                  <div className="preview-bar"></div>
                  <div className="preview-bar"></div>
                  <div className="preview-bar"></div>
                  <div className="preview-bar"></div>
                </div>
              </div>
              <h3 className="chart-type-title">OHLC Bars</h3>
              <p className="chart-type-description">
                Traditional bar charts showing open, high, low, and close with horizontal ticks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Start Professional Chart Analysis
            </h2>
            <p className="cta-subtitle">
              Access advanced charting tools, technical indicators, and AI-powered insights 
              for superior market analysis and trading decisions.
            </p>
            <div className="cta-buttons">
              <Link href="/ai-insights" className="btn btn-primary btn-lg">
                <span className="btn-icon">🤖</span>
                Get AI Analysis
              </Link>
              <Link href="/markets" className="btn btn-ghost btn-lg">
                <span className="btn-icon">📊</span>
                View Markets
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 