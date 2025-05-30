import React, { useState } from 'react'

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      id: 1,
      question: 'How accurate are your AI trading predictions?',
      answer: 'Our AI algorithms achieve an industry-leading 94.7% accuracy rate in market predictions. This is based on extensive backtesting across multiple asset classes and real-time performance monitoring over the past 3 years.'
    },
    {
      id: 2,
      question: 'What markets and assets do you cover?',
      answer: 'We provide comprehensive coverage across stocks (10,000+ symbols), cryptocurrencies (5,000+ coins), forex (100+ pairs), commodities (50+ instruments), and indices from 150+ countries worldwide.'
    },
    {
      id: 3,
      question: 'Is the platform suitable for beginners?',
      answer: 'Absolutely! Our platform is designed for traders of all levels. We offer comprehensive educational resources, AI-guided tutorials, and a user-friendly interface that makes advanced trading accessible to beginners.'
    },
    {
      id: 4,
      question: 'How does your AI technology work?',
      answer: 'Our AI uses advanced machine learning algorithms including neural networks, natural language processing for sentiment analysis, and deep learning models that analyze millions of data points including price movements, news sentiment, social media trends, and economic indicators.'
    },
    {
      id: 5,
      question: 'What are the subscription costs?',
      answer: 'We offer flexible pricing plans starting from $29/month for basic features, $99/month for professional traders, and $299/month for institutional clients. All plans include a 14-day free trial with full access to our AI features.'
    },
    {
      id: 6,
      question: 'Is my data and funds secure?',
      answer: 'Security is our top priority. We use bank-level 256-bit SSL encryption, are SOC 2 Type II certified, PCI DSS compliant, and follow strict GDPR guidelines. We never store your trading account credentials and use read-only API connections.'
    },
    {
      id: 7,
      question: 'Can I integrate with my existing broker?',
      answer: 'Yes! We support integration with 50+ major brokers including Interactive Brokers, TD Ameritrade, E*TRADE, Robinhood, Binance, Coinbase Pro, and many others through secure API connections.'
    },
    {
      id: 8,
      question: 'Do you offer mobile apps?',
      answer: 'Yes, we have native mobile apps for both iOS and Android with full feature parity to our web platform. You can receive real-time alerts, view AI predictions, and execute trades directly from your mobile device.'
    },
    {
      id: 9,
      question: 'What kind of support do you provide?',
      answer: 'We offer 24/7 customer support via live chat, email, and phone. Premium subscribers also get access to dedicated account managers and priority support with guaranteed response times under 1 hour.'
    },
    {
      id: 10,
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time with no cancellation fees. Your access will continue until the end of your current billing period, and you can reactivate anytime without losing your historical data.'
    }
  ]

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Get answers to the most common questions about our AI-powered trading platform
          </p>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq.id} className={`faq-item ${openFAQ === faq.id ? 'open' : ''}`}>
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={openFAQ === faq.id}
                >
                  <span className="question-text">{faq.question}</span>
                  <span className="question-icon">
                    {openFAQ === faq.id ? '−' : '+'}
                  </span>
                </button>
                <div className="faq-answer">
                  <div className="answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-sidebar">
            <div className="faq-contact-card">
              <div className="contact-header">
                <span className="contact-icon">💬</span>
                <h3 className="contact-title">Still have questions?</h3>
              </div>
              <p className="contact-description">
                Our support team is available 24/7 to help you get the most out of our platform.
              </p>
              <div className="contact-actions">
                <a href="/contact" className="contact-btn primary">
                  <span className="btn-icon">📞</span>
                  Contact Support
                </a>
                <a href="/demo" className="contact-btn secondary">
                  <span className="btn-icon">🎥</span>
                  Book a Demo
                </a>
              </div>
            </div>

            <div className="faq-resources-card">
              <h3 className="resources-title">Helpful Resources</h3>
              <div className="resources-list">
                <a href="/education" className="resource-link">
                  <span className="resource-icon">📚</span>
                  <span className="resource-text">Trading Academy</span>
                </a>
                <a href="/documentation" className="resource-link">
                  <span className="resource-icon">📖</span>
                  <span className="resource-text">API Documentation</span>
                </a>
                <a href="/tutorials" className="resource-link">
                  <span className="resource-icon">🎬</span>
                  <span className="resource-text">Video Tutorials</span>
                </a>
                <a href="/community" className="resource-link">
                  <span className="resource-icon">👥</span>
                  <span className="resource-text">Community Forum</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection 