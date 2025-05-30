'use client'

import React from 'react'
import { motion } from 'framer-motion'

const TestimonialsAndStatsSection = () => {
  const testimonials = [
    {
      name: 'Александр Петров',
      role: 'Профессиональный Трейдер',
      company: 'FinTech Solutions',
      avatar: '👨‍💼',
      rating: 5,
      text: 'AI анализ 4X Analytics увеличил мою прибыльность на 340%. Точность прогнозов просто невероятная!'
    },
    {
      name: 'Мария Иванова',
      role: 'Портфельный Менеджер',
      company: 'Investment Group',
      avatar: '👩‍💼',
      rating: 5,
      text: 'Лучшая платформа для анализа рынков. AI инсайты помогают принимать правильные решения каждый день.'
    },
    {
      name: 'Дмитрий Козлов',
      role: 'Криптотрейдер',
      company: 'Crypto Capital',
      avatar: '👨‍💻',
      rating: 5,
      text: 'Революционная технология! Анализ настроений и паттернов работает безупречно.'
    }
  ]

  const stats = [
    {
      icon: '🎯',
      value: '94.7%',
      label: 'Точность AI',
      description: 'Прогнозов'
    },
    {
      icon: '👥',
      value: '100K+',
      label: 'Активных',
      description: 'Пользователей'
    },
    {
      icon: '💰',
      value: '$2.5B+',
      label: 'Объем',
      description: 'Анализа'
    },
    {
      icon: '🌍',
      value: '50+',
      label: 'Стран',
      description: 'Покрытие'
    },
    {
      icon: '📊',
      value: '10,000+',
      label: 'Активов',
      description: 'Анализируем'
    },
    {
      icon: '⚡',
      value: '24/7',
      label: 'Мониторинг',
      description: 'Рынков'
    }
  ]

  return (
    <section className="testimonials-stats-section">
      <div className="container">
        {/* Statistics Grid */}
        <motion.div 
          className="stats-showcase"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="stats-header">
            <h2 className="stats-title">
              Доверяют <span className="gradient-text">Профессионалы</span>
            </h2>
            <p className="stats-subtitle">
              Цифры, которые говорят о нашем качестве и надежности
            </p>
          </div>
          
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          className="testimonials-showcase"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="testimonials-header">
            <h2 className="testimonials-title">
              Что говорят <span className="gradient-text">Наши Клиенты</span>
            </h2>
            <p className="testimonials-subtitle">
              Реальные отзывы от профессиональных трейдеров и инвесторов
            </p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="testimonial-content">
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                  
                  <blockquote className="testimonial-text">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="testimonial-author">
                    <div className="author-avatar">{testimonial.avatar}</div>
                    <div className="author-info">
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-role">{testimonial.role}</div>
                      <div className="author-company">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
                
                <div className="testimonial-glow"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="trust-indicators"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="badge-icon">🔒</div>
              <div className="badge-text">
                <div className="badge-title">Безопасность</div>
                <div className="badge-subtitle">SSL Шифрование</div>
              </div>
            </div>
            
            <div className="trust-badge">
              <div className="badge-icon">🏆</div>
              <div className="badge-text">
                <div className="badge-title">Награды</div>
                <div className="badge-subtitle">Best AI Platform 2024</div>
              </div>
            </div>
            
            <div className="trust-badge">
              <div className="badge-icon">📜</div>
              <div className="badge-text">
                <div className="badge-title">Лицензия</div>
                <div className="badge-subtitle">Регулируется CySEC</div>
              </div>
            </div>
            
            <div className="trust-badge">
              <div className="badge-icon">🛡️</div>
              <div className="badge-text">
                <div className="badge-title">Защита</div>
                <div className="badge-subtitle">Страхование до $1M</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsAndStatsSection 