'use client'

import React from 'react'

export default function MarketSection() {
  return (
    <section className="market-section">
      <div className="container">
        <h2 className="section-title">Market</h2>
        
        {/* BTC Card */}
        <div className="market-card">
          <div className="market-info">
            <h3 className="crypto-name">BTC</h3>
            <div className="price-info">
              <div className="price-item">
                <span className="label">Цена открытия</span>
                <span className="value">$109 535,52</span>
              </div>
              <div className="price-item">
                <span className="label">Текущая цена</span>
                <span className="value positive">$110 432,44</span>
              </div>
              <div className="price-item">
                <span className="label">Максимум 24ч</span>
                <span className="value">$110 718,00</span>
              </div>
              <div className="price-item">
                <span className="label">Минимум 24ч</span>
                <span className="value">$107 516,57</span>
              </div>
            </div>
          </div>
          <div className="chart-container">
            <canvas id="btcChart" width="600" height="300"></canvas>
          </div>
        </div>
        
        {/* Price History */}
        <div className="price-history">
          <h3>История цены</h3>
          <div className="history-item">
            <span className="time">20:42:07 27.05.2025</span>
            <span className="price positive">$110 432,44 +Infinity%</span>
          </div>
        </div>
        
        {/* Избранное и Новости */}
        <div className="market-bottom">
          <div className="favorites">
            <h3>Избранное</h3>
            <p>Обновляется каждые 10 секунд</p>
            <div className="add-pair">
              <input placeholder="Введите пару (например, BTCUSDT)" />
              <button className="btn-add">ADD</button>
            </div>
            <div className="pair-list">
              <div className="pair-item">BTCUSDT <span className="positive">110432.44 USD (0.84%)</span></div>
              <div className="pair-item">ETHUSDT <span className="positive">2673.00 USD (4.97%)</span></div>
            </div>
          </div>
          
          <div className="news-widget">
            <h3>Новости</h3>
            <p>Обновляется каждые 5 минут</p>
            <div className="news-item">
              <h4>State of Mantle Q1 2025</h4>
              <p>Key Insights Mantle maintained a leading position...</p>
              <span className="news-date">27.05.2025, 20:30:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 