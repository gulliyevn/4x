'use client';

import React, { useEffect, useState } from 'react';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: string;
  color: string;
}

const StatsSection: React.FC = () => {
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);

  const stats: StatItem[] = [
    {
      label: 'Active Users',
      value: 10.3,
      suffix: 'k',
      icon: 'fas fa-users',
      color: 'var(--brand-primary)'
    },
    {
      label: 'AI Accuracy',
      value: 65,
      suffix: '%',
      icon: 'fas fa-brain',
      color: 'var(--brand-accent)'
    },
    {
      label: 'Signals Processed',
      value: 2.2,
      suffix: 'k',
      icon: 'fas fa-chart-line',
      color: 'var(--brand-success)'
    },
    {
      label: 'Avg Profit per Trade',
      value: 137,
      suffix: '$',
      icon: 'fas fa-dollar-sign',
      color: 'var(--brand-warning)'
    }
  ];

  useEffect(() => {
    const animateCounters = () => {
      stats.forEach((stat, index) => {
        let current = 0;
        const increment = stat.value / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = current;
            return newValues;
          });
        }, 20);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="stats-section">
      <div className="container">
        <h2 className="section-title">Create Your Reality with 4X</h2>
        <p className="section-subtitle">Real-time insights powered by AI-driven trading strategies.</p>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">
                {stat.value < 10 
                  ? animatedValues[index].toFixed(1)
                  : Math.floor(animatedValues[index]).toLocaleString()
                }
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="cta-section">
          <div className="cta-icon">🔥</div>
          <h2>Dominate the Market.</h2>
          <h3 className="cta-subtitle">Start Winning Today</h3>
          <p>Your AI assistant for smarter trades and better results.</p>
          <div className="cta-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 