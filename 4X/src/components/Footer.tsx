'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Trading Platform', href: '/platform' },
      { label: 'Mobile App', href: '/mobile' },
      { label: 'API Documentation', href: '/api' },
      { label: 'System Status', href: '/status' }
    ],
    trading: [
      { label: 'Forex', href: '/forex' },
      { label: 'Cryptocurrencies', href: '/crypto' },
      { label: 'Commodities', href: '/commodities' },
      { label: 'Indices', href: '/indices' }
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Live Chat', href: '/chat' },
      { label: 'Tutorials', href: '/tutorials' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Partners', href: '/partners' }
    ]
  };

  const socialLinks = [
    { icon: 'fab fa-twitter', href: 'https://twitter.com/4xtrading', label: 'Twitter' },
    { icon: 'fab fa-linkedin', href: 'https://linkedin.com/company/4xtrading', label: 'LinkedIn' },
    { icon: 'fab fa-facebook', href: 'https://facebook.com/4xtrading', label: 'Facebook' },
    { icon: 'fab fa-instagram', href: 'https://instagram.com/4xtrading', label: 'Instagram' },
    { icon: 'fab fa-youtube', href: 'https://youtube.com/4xtrading', label: 'YouTube' }
  ];

  return (
    <footer style={{
      background: 'linear-gradient(135deg, var(--brand-secondary) 0%, #0a1a1c 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(2, 209, 254, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(152, 181, 164, 0.05) 0%, transparent 50%)
        `,
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Main Footer Content */}
        <div style={{
          padding: 'var(--space-20) 0 var(--space-12)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-12)'
        }}>
          {/* Company Info */}
          <div>
            <div style={{
              fontSize: '2rem',
              fontWeight: '800',
              marginBottom: 'var(--space-6)',
              background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              4X Trading
            </div>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: 'var(--space-6)',
              maxWidth: '300px'
            }}>
              The world's most advanced trading platform. Trade with confidence using our cutting-edge technology and professional-grade tools.
            </p>
            
            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-6)'
            }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.25rem',
                    transition: 'all var(--transition-normal)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--brand-primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(2, 209, 254, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              <div style={{ marginBottom: 'var(--space-2)' }}>
                <i className="fas fa-envelope" style={{ marginRight: 'var(--space-2)' }} />
                support@4xtrading.com
              </div>
              <div>
                <i className="fas fa-phone" style={{ marginRight: 'var(--space-2)' }} />
                +1 (555) 123-4567
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: 'var(--space-6)',
              color: 'white'
            }}>
              Platform
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {footerLinks.platform.map((link, index) => (
                <li key={index} style={{ marginBottom: 'var(--space-3)' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'all var(--transition-fast)',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--brand-accent)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trading Links */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: 'var(--space-6)',
              color: 'white'
            }}>
              Markets
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {footerLinks.trading.map((link, index) => (
                <li key={index} style={{ marginBottom: 'var(--space-3)' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'all var(--transition-fast)',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--brand-accent)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: 'var(--space-6)',
              color: 'white'
            }}>
              Support
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {footerLinks.support.map((link, index) => (
                <li key={index} style={{ marginBottom: 'var(--space-3)' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'all var(--transition-fast)',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--brand-accent)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 'var(--space-8)',
          paddingBottom: 'var(--space-8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)'
        }}>
          <div style={{
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            © {currentYear} 4X Trading Platform. All rights reserved.
          </div>
          
          <div style={{
            display: 'flex',
            gap: 'var(--space-6)',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/privacy"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--brand-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--brand-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
              }}
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--brand-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
              }}
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 