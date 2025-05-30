'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const FeaturesSection = () => {
  const features = [
    {
      icon: '🔮',
      title: 'Прогнозы Цен',
      description: 'Продвинутые модели машинного обучения предсказывают движения цен с лидирующей в отрасли точностью.',
      accuracy: '94.7%',
      highlights: [
        'Прогнозы в реальном времени',
        'Множественные временные рамки',
        'Оценка рисков'
      ],
      stats: [
        { value: '1M+', label: 'Прогнозов' },
        { value: '50+', label: 'Активов' }
      ],
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: '📊',
      title: 'Анализ Настроений',
      description: 'Мониторинг настроений рынка через новости, социальные сети и торговые данные для принятия обоснованных решений.',
      accuracy: 'Real-time',
      highlights: [
        'Анализ новостей',
        'Анализ социальных сетей',
        'Психология рынка'
      ],
      stats: [
        { value: '1M+', label: 'Источников' },
        { value: '24/7', label: 'Мониторинг' }
      ],
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: '🎯',
      title: 'Распознавание Паттернов',
      description: 'Выявление сложных графических паттернов и торговых возможностей с помощью AI-распознавания паттернов.',
      accuracy: 'Advanced',
      highlights: [
        '50+ паттернов',
        'Авто-обнаружение',
        'Вероятность успеха'
      ],
      stats: [
        { value: '87%', label: 'Винрейт' },
        { value: '50+', label: 'Паттернов' }
      ],
      color: 'from-orange-500 to-red-600'
    }
  ]

  return (
    <section className="features-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Работает на <span className="gradient-text">Искусственном Интеллекте</span>
          </h2>
          <p className="section-subtitle">
            Наши продвинутые AI алгоритмы анализируют миллионы точек данных в реальном времени, 
            чтобы предоставить вам самые точные рыночные инсайты и торговые возможности.
          </p>
        </motion.div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="feature-background">
                <div className={`feature-gradient bg-gradient-to-br ${feature.color}`}></div>
              </div>
              
              <div className="feature-header">
                <div className="feature-icon">
                  <span>{feature.icon}</span>
                </div>
                <div className="feature-badge">{feature.accuracy}</div>
              </div>
              
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              
              <div className="feature-highlights">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span className="highlight-text">{highlight}</span>
                  </div>
                ))}
              </div>
              
              <div className="feature-stats">
                {feature.stats.map((stat, idx) => (
                  <div key={idx} className="stat-item">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="feature-action">
                <Link href="/ai-insights" className="feature-btn">
                  Узнать больше
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection 