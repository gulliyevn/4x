'use client'

import React, { useState, useEffect, useRef } from 'react';

// TypeScript интерфейс для данных рынка
interface MarketItem {
  symbol: string;           // BTC, ETH, USDT
  name: string;            // Bitcoin, Ethereum
  price: number;           // 50626.47
  change: number;          // 0.03 (в процентах)
  volume24h: string;       // "20.17K"
  isPositive: boolean;     // true для зеленого, false для красного
}

// Props для компонента
interface MarketTickerProps {
  className?: string;
  speed?: number; // скорость анимации в секундах
}

const MarketTicker: React.FC<MarketTickerProps> = React.memo(({ 
  className = '', 
  speed = 60 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const tickerRef = useRef<HTMLDivElement>(null);

  // Mock данные для тикера
  const marketData: MarketItem[] = [
    { symbol: "USDT", name: "Tether", price: 50626.47, change: 0.03, volume24h: "20.17K", isPositive: true },
    { symbol: "LINK", name: "Chainlink", price: 14.51, change: 2.08, volume24h: "695.16K", isPositive: true },
    { symbol: "LTC", name: "Litecoin", price: 72.37, change: -3.10, volume24h: "298.62K", isPositive: false },
    { symbol: "BTC", name: "Bitcoin", price: 110432.44, change: 0.84, volume24h: "20.17K", isPositive: true },
    { symbol: "ETH", name: "Ethereum", price: 2673.00, change: 4.97, volume24h: "695.16K", isPositive: true },
    { symbol: "BNB", name: "Binance", price: 691.49, change: 2.43, volume24h: "298.62K", isPositive: true },
    { symbol: "ADA", name: "Cardano", price: 1.23, change: -1.45, volume24h: "156.34K", isPositive: false },
    { symbol: "SOL", name: "Solana", price: 245.67, change: 3.21, volume24h: "423.12K", isPositive: true }
  ];

  // Дублируем данные для бесконечного скролла
  const duplicatedData = [...marketData, ...marketData, ...marketData];

  // Форматирование цены
  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      });
    }
    return price.toFixed(4);
  };

  // Форматирование изменения в процентах
  const formatChange = (change: number): string => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  // Обработка видимости при скролле (опционально)
  useEffect(() => {
    const handleScroll = () => {
      if (tickerRef.current) {
        const rect = tickerRef.current.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={tickerRef}
      className={`market-ticker ${className}`}
      role="marquee"
      aria-label="Live market prices ticker"
    >
      <div 
        className="ticker-wrapper"
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isVisible ? 'running' : 'paused'
        }}
      >
        <div className="ticker-content">
          {duplicatedData.map((item, index) => (
            <div 
              key={`${item.symbol}-${index}`}
              className="ticker-item"
              role="group"
              aria-label={`${item.name} market data`}
            >
              {/* Symbol */}
              <div className="ticker-symbol">
                <span className="symbol-text">{item.symbol}</span>
                <span className="symbol-name">{item.name}</span>
              </div>

              {/* Price */}
              <div className="ticker-price">
                <span className="price-value">${formatPrice(item.price)}</span>
              </div>

              {/* Change */}
              <div className={`ticker-change ${item.isPositive ? 'positive' : 'negative'}`}>
                <span className="change-icon">
                  {item.isPositive ? '▲' : '▼'}
                </span>
                <span className="change-value">{formatChange(item.change)}</span>
              </div>

              {/* Volume */}
              <div className="ticker-volume">
                <span className="volume-label">Vol:</span>
                <span className="volume-value">{item.volume24h}</span>
              </div>

              {/* Separator */}
              <div className="ticker-separator">|</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="ticker-gradient-left" aria-hidden="true"></div>
      <div className="ticker-gradient-right" aria-hidden="true"></div>
    </div>
  );
});

MarketTicker.displayName = 'MarketTicker';

export default MarketTicker; 