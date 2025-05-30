'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const ModernMarketsSection = () => {
  const markets = [
    {
      icon: '📈',
      title: 'Фондовые Рынки',
      description: 'Комплексный анализ акций с AI-инсайтами по 50+ глобальным биржам.',
      badge: '10,000+ Акций',
      stats: [
        { label: 'Биржи', value: '50+' },
        { label: 'Акции', value: '10,000+' }
      ],
      color: 'from-blue-500 to-indigo-600',
      href: '/markets/stocks'
    },
    {
      icon: '₿',
      title: 'Криптовалюты',
      description: 'Продвинутый крипто-анализ с DeFi метриками, on-chain данными и отслеживанием настроений.',
      badge: '5,000+ Криптовалют',
      stats: [
        { label: 'Криптовалюты', value: '5,000+' },
        { label: 'DeFi Протоколы', value: '500+' }
      ],
      color: 'from-orange-500 to-yellow-600',
      href: '/markets/cryptocurrency'
    },
    {
      icon: '💱',
      title: 'Форекс Торговля',
      description: 'Профессиональный форекс анализ с данными центральных банков, экономическими индикаторами и AI прогнозами.',
      badge: '100+ Пар',
      stats: [
        { label: 'Валютные Пары', value: '100+' },
        { label: 'Центральные Банки', value: '20+' }
      ],
      color: 'from-green-500 to-emerald-600',
      href: '/markets/forex'
    },
    {
      icon: '🥇',
      title: 'Товары',
      description: 'Отслеживание драгоценных металлов, энергии и сельскохозяйственных товаров с анализом спроса и предложения.',
      badge: '50+ Товаров',
      stats: [
        { label: 'Товары', value: '50+' },
        { label: 'Фьючерсы', value: '200+' }
      ],
      color: 'from-purple-500 to-pink-600',
      href: '/markets/commodities'
    }
  ]

  return (
    <section className="modern-markets-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Покрытие Глобальных Рынков</h2>
          <p className="section-subtitle">
            Получите доступ к комплексному анализу по всем основным классам активов 
            с данными в реальном времени и AI инсайтами.
          </p>
        </motion.div>
        
        <div className="markets-grid">
          {markets.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="market-card-wrapper"
            >
              <Link href={market.href} className="market-card">
                <div className="market-background">
                  <div className={`market-gradient bg-gradient-to-br ${market.color}`}></div>
                  <div className="market-pattern"></div>
                </div>
                
                <div className="market-header">
                  <div className="market-icon">
                    <span>{market.icon}</span>
                  </div>
                  <div className="market-badge">{market.badge}</div>
                </div>
                
                <h3 className="market-title">{market.title}</h3>
                <p className="market-description">{market.description}</p>
                
                <div className="market-stats">
                  {market.stats.map((stat, idx) => (
                    <div key={idx} className="market-stat">
                      <span className="stat-label">{stat.label}</span>
                      <span className="stat-value">{stat.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="market-action">
                  <span className="action-text">Исследовать рынок</span>
                  <span className="action-arrow">→</span>
                </div>
                
                <div className="market-glow"></div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="markets-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <h3 className="cta-title">Готовы начать торговлю?</h3>
            <p className="cta-description">
              Получите доступ ко всем рынкам с единой платформы
            </p>
            <Link href="/ai-insights" className="cta-button">
              <span>Начать сейчас</span>
              <span className="btn-glow"></span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ModernMarketsSection 