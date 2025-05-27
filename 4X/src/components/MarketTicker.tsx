'use client';

import React, { useEffect, useState } from 'react';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const MarketTicker: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: 'EUR/USD', price: 1.0856, change: 0.0023, changePercent: 0.21 },
    { symbol: 'GBP/USD', price: 1.2734, change: -0.0045, changePercent: -0.35 },
    { symbol: 'USD/JPY', price: 149.82, change: 0.67, changePercent: 0.45 },
    { symbol: 'AUD/USD', price: 0.6523, change: 0.0012, changePercent: 0.18 },
    { symbol: 'USD/CAD', price: 1.3567, change: -0.0023, changePercent: -0.17 },
    { symbol: 'NZD/USD', price: 0.5987, change: 0.0034, changePercent: 0.57 },
    { symbol: 'USD/CHF', price: 0.8934, change: -0.0012, changePercent: -0.13 },
    { symbol: 'EUR/GBP', price: 0.8523, change: 0.0045, changePercent: 0.53 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prevData =>
        prevData.map(item => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * 0.01,
          change: (Math.random() - 0.5) * 0.01,
          changePercent: (Math.random() - 0.5) * 2
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="market-ticker">
      <div className="ticker-container">
        <div className="ticker">
          {marketData.map((item, index) => (
            <div key={index} className="ticker-item">
              <span style={{ fontWeight: 'bold' }}>{item.symbol}</span>
              <span style={{ margin: '0 0.5rem' }}>{item.price.toFixed(4)}</span>
              <span style={{ color: item.change >= 0 ? '#10b981' : '#ef4444' }}>
                {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker; 