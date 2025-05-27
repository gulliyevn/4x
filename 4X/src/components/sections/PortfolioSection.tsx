'use client'

import React from 'react'

export default function PortfolioSection() {
  return (
    <section className="portfolio-section">
      <div className="container">
        <div className="crypto-slider">
          <div className="crypto-slide active">
            <div className="crypto-header">
              <h3>BTC</h3>
              <span className="change positive">0.84%</span>
            </div>
            <div className="crypto-price">$110 432,44</div>
            <div className="crypto-volume">24h Volume: $20.17K</div>
          </div>
          
          <div className="crypto-slide">
            <div className="crypto-header">
              <h3>ETH</h3>
              <span className="change positive">4.97%</span>
            </div>
            <div className="crypto-price">$2 673,00</div>
            <div className="crypto-volume">24h Volume: $695.16K</div>
          </div>
          
          <div className="crypto-slide">
            <div className="crypto-header">
              <h3>BNB</h3>
              <span className="change positive">2.43%</span>
            </div>
            <div className="crypto-price">$691,49</div>
            <div className="crypto-volume">24h Volume: $298.62K</div>
          </div>
          
          <div className="crypto-slide">
            <div className="crypto-header">
              <h3>BCC</h3>
              <span className="change neutral">0.00%</span>
            </div>
            <div className="crypto-price">$0,00</div>
            <div className="crypto-volume">24h Volume: $0.00</div>
          </div>
        </div>
        
        {/* Asset Categories */}
        <div className="asset-categories">
          <div className="category-card">
            <h3>Stocks</h3>
            <p>Loading...</p>
          </div>
          <div className="category-card">
            <h3>Crypto</h3>
            <p>Loading...</p>
          </div>
          <div className="category-card">
            <h3>Shares</h3>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </section>
  )
} 