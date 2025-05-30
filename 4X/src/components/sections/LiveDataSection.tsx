import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const LiveDataSection = () => {
  const [marketData, setMarketData] = useState([
    {
      symbol: 'BTC/USD',
      name: 'Bitcoin',
      price: 43567.89,
      change: 1234.56,
      changePercent: 2.91,
      volume: '24.5B',
      icon: '₿'
    },
    {
      symbol: 'ETH/USD',
      name: 'Ethereum',
      price: 2678.45,
      change: -45.23,
      changePercent: -1.66,
      volume: '12.8B',
      icon: '⟠'
    },
    {
      symbol: 'S&P 500',
      name: 'S&P 500 Index',
      price: 4567.89,
      change: 23.45,
      changePercent: 0.52,
      volume: '3.2T',
      icon: '📈'
    },
    {
      symbol: 'EUR/USD',
      name: 'Euro Dollar',
      price: 1.0876,
      change: 0.0023,
      changePercent: 0.21,
      volume: '156B',
      icon: '💱'
    },
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 189.45,
      change: 2.34,
      changePercent: 1.25,
      volume: '45.2M',
      icon: '🍎'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 234.67,
      change: -5.43,
      changePercent: -2.26,
      volume: '78.9M',
      icon: '🚗'
    }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * (item.price * 0.001),
        change: item.change + (Math.random() - 0.5) * 0.5,
        changePercent: item.changePercent + (Math.random() - 0.5) * 0.1
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number, symbol: string) => {
    if (symbol.includes('/')) {
      return price.toFixed(symbol.includes('USD') && !symbol.includes('BTC') && !symbol.includes('ETH') ? 4 : 2)
    }
    return price.toFixed(2)
  }

  const formatChange = (change: number, percent: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)} (${sign}${percent.toFixed(2)}%)`
  }

  return (
    <section className="live-data-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Live Market Data
            <span className="live-indicator">
              <span className="live-dot"></span>
              LIVE
            </span>
          </h2>
          <p className="section-subtitle">
            Real-time market data powered by our AI algorithms with millisecond precision
          </p>
        </div>

        <div className="market-data-grid">
          {marketData.map((item, index) => (
            <div key={index} className="market-data-card">
              <div className="market-header">
                <div className="market-icon">{item.icon}</div>
                <div className="market-info">
                  <h3 className="market-symbol">{item.symbol}</h3>
                  <p className="market-name">{item.name}</p>
                </div>
              </div>
              
              <div className="market-price">
                <span className="price-value">
                  {item.symbol.includes('USD') && !item.symbol.includes('/') ? '$' : ''}
                  {formatPrice(item.price, item.symbol)}
                </span>
                <span className={`price-change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                  {formatChange(item.change, item.changePercent)}
                </span>
              </div>
              
              <div className="market-volume">
                <span className="volume-label">24h Volume:</span>
                <span className="volume-value">{item.volume}</span>
              </div>
              
              <div className="market-actions">
                <Link href={`/charts?symbol=${item.symbol}`} className="action-btn chart-btn">
                  📊 Chart
                </Link>
                <Link href={`/ai-insights?symbol=${item.symbol}`} className="action-btn ai-btn">
                  🤖 AI Analysis
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="data-disclaimer">
          <p>
            <span className="disclaimer-icon">ℹ️</span>
            Data provided by leading financial data providers. Prices are indicative and may not reflect actual trading prices.
          </p>
        </div>
      </div>
    </section>
  )
}

export default LiveDataSection 