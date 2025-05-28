'use client'

import React from 'react'
import Link from 'next/link'

// Team Member Interface
interface TeamMember {
  name: string
  position: string
  avatar: string
  bio: string
  linkedin?: string
  twitter?: string
}

// Company Stats Interface
interface CompanyStat {
  value: string
  label: string
  icon: string
}

export default function AboutPage() {
  // Company Statistics
  const companyStats: CompanyStat[] = [
    { value: '500K+', label: 'Active Traders', icon: '👥' },
    { value: '$2.5B+', label: 'Trading Volume', icon: '💰' },
    { value: '150+', label: 'Countries', icon: '🌍' },
    { value: '99.9%', label: 'Uptime', icon: '⚡' },
    { value: '24/7', label: 'Support', icon: '🛟' },
    { value: '2019', label: 'Founded', icon: '🏢' }
  ]

  // Team Members
  const teamMembers: TeamMember[] = [
    {
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      avatar: '👩‍💼',
      bio: 'Former Goldman Sachs executive with 15+ years in financial markets and fintech innovation.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Michael Chen',
      position: 'CTO',
      avatar: '👨‍💻',
      bio: 'Ex-Google engineer specializing in high-frequency trading systems and blockchain technology.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'David Rodriguez',
      position: 'Head of Trading',
      avatar: '👨‍💼',
      bio: 'Professional trader with 20+ years experience in forex, commodities, and cryptocurrency markets.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Emily Watson',
      position: 'Head of Compliance',
      avatar: '👩‍⚖️',
      bio: 'Former SEC attorney ensuring regulatory compliance and investor protection across all markets.',
      linkedin: '#',
      twitter: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About 4X Trading Platform
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Empowering traders worldwide with cutting-edge technology, 
              comprehensive market access, and professional-grade tools since 2019.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn bg-white text-primary hover:bg-neutral-100 btn-lg">
                Start Trading
              </Link>
              <Link href="/tutorial" className="btn btn-ghost border-white text-white hover:bg-white hover:text-primary btn-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Trusted by Traders Worldwide
            </h2>
            <p className="text-lg text-secondary">
              Our platform serves hundreds of thousands of traders across the globe
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-lg text-secondary mb-6">
                To democratize access to global financial markets by providing 
                professional-grade trading tools, education, and support to traders 
                of all experience levels.
              </p>
              <p className="text-secondary mb-8">
                We believe that everyone should have access to the same powerful 
                trading technologies and market insights that were once exclusive 
                to institutional investors. Our platform bridges this gap by 
                combining cutting-edge technology with user-friendly design.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-secondary">Transparent pricing with no hidden fees</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-secondary">Advanced security and regulatory compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-secondary">24/7 customer support and education</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-neutral-200">
                <h3 className="text-xl font-semibold text-primary mb-6">Our Vision</h3>
                <p className="text-secondary mb-6">
                  To become the world's most trusted and innovative trading platform, 
                  empowering millions of traders to achieve their financial goals.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-accent-primary">500K+</div>
                    <div className="text-sm text-secondary">Happy Traders</div>
                  </div>
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-accent-primary">150+</div>
                    <div className="text-sm text-secondary">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-secondary">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Innovation */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Innovation</h3>
              <p className="text-secondary">
                Continuously pushing the boundaries of trading technology 
                to provide cutting-edge solutions.
              </p>
            </div>

            {/* Security */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Security</h3>
              <p className="text-secondary">
                Protecting our users' funds and data with bank-level 
                security and regulatory compliance.
              </p>
            </div>

            {/* Transparency */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Transparency</h3>
              <p className="text-secondary">
                Clear pricing, honest communication, and open about 
                our processes and policies.
              </p>
            </div>

            {/* Excellence */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Excellence</h3>
              <p className="text-secondary">
                Striving for perfection in every aspect of our platform 
                and customer experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-secondary">
              Meet the experienced professionals leading 4X Trading Platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="trading-card text-center">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                <div className="text-accent-primary font-medium mb-4">{member.position}</div>
                <p className="text-sm text-secondary mb-6">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  {member.linkedin && (
                    <Link href={member.linkedin} className="text-accent-primary hover:text-accent-secondary">
                      <span className="text-xl">💼</span>
                    </Link>
                  )}
                  {member.twitter && (
                    <Link href={member.twitter} className="text-accent-primary hover:text-accent-secondary">
                      <span className="text-xl">🐦</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Security */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Advanced Technology & Security
              </h2>
              <p className="text-lg text-secondary mb-6">
                Our platform is built on cutting-edge technology infrastructure 
                designed for speed, reliability, and security.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Ultra-Fast Execution</h4>
                    <p className="text-sm text-secondary">
                      Sub-millisecond order execution with direct market access 
                      and co-located servers.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🔐</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Bank-Level Security</h4>
                    <p className="text-sm text-secondary">
                      256-bit SSL encryption, two-factor authentication, 
                      and cold storage for digital assets.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Real-Time Analytics</h4>
                    <p className="text-sm text-secondary">
                      Advanced charting tools, technical indicators, 
                      and AI-powered market insights.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🌐</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Global Infrastructure</h4>
                    <p className="text-sm text-secondary">
                      Distributed servers worldwide ensuring 99.9% uptime 
                      and low-latency connections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="trading-card text-center">
                <div className="text-3xl mb-3">⚡</div>
                <div className="text-2xl font-bold text-primary mb-2">0.1ms</div>
                <div className="text-sm text-secondary">Average Execution</div>
              </div>
              <div className="trading-card text-center">
                <div className="text-3xl mb-3">🔒</div>
                <div className="text-2xl font-bold text-primary mb-2">256-bit</div>
                <div className="text-sm text-secondary">SSL Encryption</div>
              </div>
              <div className="trading-card text-center">
                <div className="text-3xl mb-3">🌍</div>
                <div className="text-2xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-secondary">Uptime SLA</div>
              </div>
              <div className="trading-card text-center">
                <div className="text-3xl mb-3">🛡️</div>
                <div className="text-2xl font-bold text-primary mb-2">$100M</div>
                <div className="text-sm text-secondary">Insurance Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Compliance */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Regulatory Compliance
            </h2>
            <p className="text-lg text-secondary">
              Licensed and regulated by leading financial authorities worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="trading-card text-center">
              <div className="text-4xl mb-4">🇺🇸</div>
              <h4 className="font-semibold text-primary mb-2">United States</h4>
              <p className="text-sm text-secondary">SEC, FINRA, CFTC</p>
            </div>
            <div className="trading-card text-center">
              <div className="text-4xl mb-4">🇬🇧</div>
              <h4 className="font-semibold text-primary mb-2">United Kingdom</h4>
              <p className="text-sm text-secondary">FCA</p>
            </div>
            <div className="trading-card text-center">
              <div className="text-4xl mb-4">🇪🇺</div>
              <h4 className="font-semibold text-primary mb-2">European Union</h4>
              <p className="text-sm text-secondary">CySEC, BaFin</p>
            </div>
            <div className="trading-card text-center">
              <div className="text-4xl mb-4">🇦🇺</div>
              <h4 className="font-semibold text-primary mb-2">Australia</h4>
              <p className="text-sm text-secondary">ASIC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & CTA */}
      <section className="section bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join hundreds of thousands of traders who trust 4X Trading Platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/register" className="btn bg-white text-primary hover:bg-neutral-100 btn-lg">
              Create Free Account
            </Link>
            <Link href="/demo" className="btn btn-ghost border-white text-white hover:bg-white hover:text-primary btn-lg">
              Try Demo
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <h4 className="font-semibold mb-2">📧 Email Support</h4>
              <p className="opacity-90">support@4xtrading.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📞 Phone Support</h4>
              <p className="opacity-90">+1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">💬 Live Chat</h4>
              <p className="opacity-90">24/7 Available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 