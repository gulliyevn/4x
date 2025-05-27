'use client'

import React from 'react'

export default function NewsSection() {
  return (
    <section className="news-section">
      <div className="container">
        <h2 className="section-title">News</h2>
        
        <div className="news-grid">
          <article className="news-card">
            <div className="news-date">21 мая 2025 г.</div>
            <h3>JPMorgan launches 'special forces' unit to protect investors from political...</h3>
            <p>The launch comes after JPMorgan Chase Chief Executive Jamie Dimon said in his most recent annual letter to shareholders that investors face...</p>
            <button className="read-more-btn">Читать дальше →</button>
          </article>
          
          <article className="news-card">
            <div className="news-date">21 мая 2025 г.</div>
            <h3>When exactly should I file for Social Security if I want to max out my...</h3>
            <p>"I don't want to wait a day longer than I have to."</p>
            <button className="read-more-btn">Читать дальше →</button>
          </article>
          
          <article className="news-card">
            <div className="news-date">21 мая 2025 г.</div>
            <h3>Three bank stocks to avoid — and 18 to buy — from analysts at Jefferies</h3>
            <p>Analysts at the firm rolled out their coverage of 32 regional banks ahead of annual regulatory stress tests in June.</p>
            <button className="read-more-btn">Читать дальше →</button>
          </article>
        </div>
        
        <div className="read-more-section">
          <div style={{ display: 'flex', alignItems: 'center', margin: '3rem 0' }}>
            <hr style={{ flex: 1, border: 'none', height: '1px', background: '#ddd' }} />
            <h3 style={{ margin: '0 2rem', color: '#162A2C' }}>Read More</h3>
            <hr style={{ flex: 1, border: 'none', height: '1px', background: '#ddd' }} />
          </div>
        </div>
      </div>
    </section>
  )
} 