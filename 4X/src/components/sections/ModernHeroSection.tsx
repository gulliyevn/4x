'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ModernHeroSection = () => {
  return (
    <section className="modern-hero">
      <div className="hero-background">
        <div className="gradient-overlay"></div>
        <div className="floating-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="badge-icon">🚀</span>
              <span className="badge-text">AI-Powered Trading Platform</span>
              <span className="badge-pulse"></span>
            </motion.div>
            
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Торгуйте с
              <span className="gradient-text"> Искусственным Интеллектом</span>
              <br />
              <span className="highlight-text">Создайте Свою Реальность</span>
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Используйте силу искусственного интеллекта с точностью прогнозов 94.7%, 
              анализом рынка в реальном времени и продвинутыми торговыми инструментами, 
              которым доверяют более 100,000+ профессионалов по всему миру.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Link href="/ai-insights" className="btn btn-primary btn-lg">
                <span className="btn-icon">🤖</span>
                <span>Начать AI Анализ</span>
                <span className="btn-glow"></span>
              </Link>
              <Link href="/education" className="btn btn-secondary btn-lg">
                <span className="btn-icon">📚</span>
                <span>Изучить Торговлю</span>
              </Link>
            </motion.div>
            
            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="stat-item">
                <span className="stat-number">94.7%</span>
                <span className="stat-label">Точность AI</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100K+</span>
                <span className="stat-label">Активных Пользователей</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$2.5B+</span>
                <span className="stat-label">Объем Анализа</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">AI Мониторинг</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="trading-dashboard-preview">
              <div className="dashboard-header">
                <div className="dashboard-controls">
                  <div className="control-dot red"></div>
                  <div className="control-dot yellow"></div>
                  <div className="control-dot green"></div>
                </div>
                <div className="dashboard-title">AI Trading Dashboard</div>
              </div>
              <div className="dashboard-content">
                <div className="chart-preview">
                  <div className="chart-line"></div>
                  <div className="chart-bars">
                    <div className="bar" style={{height: '60%'}}></div>
                    <div className="bar" style={{height: '80%'}}></div>
                    <div className="bar" style={{height: '45%'}}></div>
                    <div className="bar" style={{height: '90%'}}></div>
                    <div className="bar" style={{height: '70%'}}></div>
                  </div>
                </div>
                <div className="ai-insights-preview">
                  <div className="insight-item">
                    <div className="insight-icon">🎯</div>
                    <div className="insight-text">BUY Signal: AAPL</div>
                  </div>
                  <div className="insight-item">
                    <div className="insight-icon">📈</div>
                    <div className="insight-text">Trend: Bullish</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ModernHeroSection 