import React from 'react'

const TrustIndicators = () => {
  const trustBadges = [
    {
      icon: '🛡️',
      title: 'SEC Regulated',
      description: 'Fully compliant with financial regulations'
    },
    {
      icon: '🔒',
      title: 'Bank-Level Security',
      description: '256-bit SSL encryption & cold storage'
    },
    {
      icon: '⭐',
      title: '4.9/5 Rating',
      description: 'Trusted by 100,000+ traders worldwide'
    },
    {
      icon: '🏆',
      title: 'Award Winning',
      description: 'Best AI Trading Platform 2024'
    }
  ]

  const certifications = [
    { name: 'ISO 27001', logo: '🔐' },
    { name: 'SOC 2 Type II', logo: '✅' },
    { name: 'PCI DSS', logo: '💳' },
    { name: 'GDPR Compliant', logo: '🇪🇺' }
  ]

  return (
    <section className="trust-indicators-section">
      <div className="container">
        <div className="trust-content">
          <div className="trust-badges">
            {trustBadges.map((badge, index) => (
              <div key={index} className="trust-badge">
                <div className="trust-icon">{badge.icon}</div>
                <div className="trust-info">
                  <h4 className="trust-title">{badge.title}</h4>
                  <p className="trust-description">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="certifications">
            <h3 className="certifications-title">Certified & Compliant</h3>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <span className="cert-logo">{cert.logo}</span>
                  <span className="cert-name">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustIndicators 