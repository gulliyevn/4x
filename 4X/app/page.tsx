import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import MarketTicker from '@/components/MarketTicker';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      {/* MARKET TICKER */}
      <MarketTicker />
      
      {/* HERO SECTION */}
      <HeroSection />
      
      {/* SERVICES SECTION */}
      <ServicesSection />
      
      {/* MARKET SECTION */}
      <section className="market-section">
        <div className="container">
          <h2 className="section-title">Market</h2>
          <div className="market-grid">
            <div className="market-info">
              <div className="crypto-item">
                <h3>BTC</h3>
                <div className="price-info">
                  <span className="open-price">Цена открытия: $109 535,52</span>
                  <span className="current-price">Текущая цена: $110 432,44</span>
                </div>
                <div className="price-range">
                  <span>Максимум 24ч: $110 718,00</span>
                  <span>Минимум 24ч: $107 516,57</span>
                </div>
              </div>
            </div>
            <div className="market-chart">
              {/* Interactive Chart Component */}
              <canvas id="marketChart"></canvas>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="portfolio-section">
        <div className="container">
          <h2 className="section-title">Portfolio Performance</h2>
          <div className="portfolio-grid">
            <div className="portfolio-chart">
              {/* Portfolio Performance Chart */}
            </div>
            <div className="asset-allocation">
              {/* Pie Chart for Asset Allocation */}
            </div>
          </div>
        </div>
      </section>

      {/* CRYPTO PRICES SLIDER */}
      <section className="crypto-slider">
        <div className="slider-container">
          <div className="crypto-card">
            <h3>BTC</h3>
            <span className="price positive">$110 432,44</span>
            <span className="change">0.84%</span>
            <span className="volume">24h Volume: $20.17K</span>
          </div>
          <div className="crypto-card">
            <h3>ETH</h3>
            <span className="price positive">$2 673,00</span>
            <span className="change">4.97%</span>
            <span className="volume">24h Volume: $695.16K</span>
          </div>
          <div className="crypto-card">
            <h3>BNB</h3>
            <span className="price positive">$691,49</span>
            <span className="change">2.43%</span>
            <span className="volume">24h Volume: $298.62K</span>
          </div>
          <div className="crypto-card">
            <h3>BCC</h3>
            <span className="price neutral">$0,00</span>
            <span className="change">0.00%</span>
            <span className="volume">24h Volume: $0.00</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-grid">
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

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="container">
          <h2 className="cta-title">Create Your Reality with 4X</h2>
          <p className="cta-subtitle">Real-time insights powered by AI-driven trading strategies.</p>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">10.3k</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">65%</span>
              <span className="stat-label">AI Accuracy</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2.2k</span>
              <span className="stat-label">Signals Processed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">137$</span>
              <span className="stat-label">Avg Profit per Trade</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">🔥</div>
            <h2>Dominate the Market.</h2>
            <h3 className="cta-subtitle-green">Start Winning Today</h3>
            <p>Your AI assistant for smarter trades and better results.</p>
            <div className="cta-buttons">
              <button className="btn-primary">Get Started</button>
              <button className="btn-dark">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS SECTION */}
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

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <h2>Don't take our word for it, take theirs...</h2>
          <p>Join thousands of traders who trust AI for success</p>
          <div className="testimonial-card">
            <h4>Noah Fischer</h4>
            <p>"Super product! The team clearly knows what they're doing. Support was quick and efficient."</p>
            <div className="stars">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </section>
    </>
  );
} 