'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Broker Data Interface
interface BrokerData {
  id: string
  name: string
  logo: string
  rating: number
  reviews: number
  minDeposit: number
  spreads: string
  leverage: string
  platforms: string[]
  regulation: string[]
  assets: string[]
  features: string[]
  pros: string[]
  cons: string[]
  bonus: string
  founded: number
  headquarters: string
  isRecommended: boolean
  category: 'forex' | 'stocks' | 'crypto' | 'multi'
}

// Mock Broker Data
const mockBrokerData: BrokerData[] = [
  {
    id: 'ic-markets',
    name: 'IC Markets',
    logo: '🏆',
    rating: 4.8,
    reviews: 2847,
    minDeposit: 200,
    spreads: 'From 0.0 pips',
    leverage: 'Up to 1:500',
    platforms: ['MetaTrader 4', 'MetaTrader 5', 'cTrader'],
    regulation: ['ASIC', 'CySEC', 'FSA'],
    assets: ['Forex', 'Indices', 'Commodities', 'Crypto'],
    features: ['ECN Trading', 'Raw Spreads', 'Expert Advisors', 'Copy Trading'],
    pros: ['Ultra-low spreads', 'Fast execution', 'Multiple regulations', 'Professional tools'],
    cons: ['High minimum deposit', 'Complex for beginners'],
    bonus: 'No deposit bonus',
    founded: 2007,
    headquarters: 'Sydney, Australia',
    isRecommended: true,
    category: 'forex'
  },
  {
    id: 'etoro',
    name: 'eToro',
    logo: '🌟',
    rating: 4.6,
    reviews: 5234,
    minDeposit: 50,
    spreads: 'From 1.0 pips',
    leverage: 'Up to 1:30',
    platforms: ['eToro Platform', 'Mobile App'],
    regulation: ['CySEC', 'FCA', 'ASIC'],
    assets: ['Stocks', 'Crypto', 'ETFs', 'Forex'],
    features: ['Social Trading', 'Copy Trading', 'Zero Commission Stocks', 'CryptoPortfolio'],
    pros: ['Social trading pioneer', 'User-friendly', 'Zero commission stocks', 'Regulated'],
    cons: ['Limited research tools', 'Withdrawal fees'],
    bonus: 'Up to $1000 welcome bonus',
    founded: 2007,
    headquarters: 'Tel Aviv, Israel',
    isRecommended: true,
    category: 'multi'
  },
  {
    id: 'binance',
    name: 'Binance',
    logo: '₿',
    rating: 4.5,
    reviews: 8921,
    minDeposit: 10,
    spreads: '0.1% trading fee',
    leverage: 'Up to 1:125',
    platforms: ['Binance Platform', 'Binance Pro', 'Mobile App'],
    regulation: ['Multiple jurisdictions'],
    assets: ['Crypto', 'Futures', 'Options', 'NFTs'],
    features: ['Spot Trading', 'Futures', 'Staking', 'DeFi', 'NFT Marketplace'],
    pros: ['Largest crypto exchange', 'Low fees', 'Wide selection', 'Advanced features'],
    cons: ['Regulatory concerns', 'Complex interface', 'Limited fiat options'],
    bonus: '20% trading fee discount',
    founded: 2017,
    headquarters: 'Global',
    isRecommended: true,
    category: 'crypto'
  },
  {
    id: 'interactive-brokers',
    name: 'Interactive Brokers',
    logo: '📊',
    rating: 4.7,
    reviews: 3456,
    minDeposit: 0,
    spreads: 'From $0.005/share',
    leverage: 'Up to 1:4',
    platforms: ['Trader Workstation', 'IBKR Mobile', 'WebTrader'],
    regulation: ['SEC', 'FINRA', 'CFTC', 'FCA'],
    assets: ['Stocks', 'Options', 'Futures', 'Forex', 'Bonds'],
    features: ['Global Markets', 'Low Commissions', 'Advanced Tools', 'Portfolio Margin'],
    pros: ['Global market access', 'Low costs', 'Professional platform', 'Strong regulation'],
    cons: ['Complex for beginners', 'Inactivity fees', 'Steep learning curve'],
    bonus: 'No account fees for $100K+',
    founded: 1978,
    headquarters: 'Greenwich, USA',
    isRecommended: true,
    category: 'stocks'
  },
  {
    id: 'plus500',
    name: 'Plus500',
    logo: '⚡',
    rating: 4.2,
    reviews: 4567,
    minDeposit: 100,
    spreads: 'Variable spreads',
    leverage: 'Up to 1:30',
    platforms: ['Plus500 Platform', 'Mobile App'],
    regulation: ['FCA', 'CySEC', 'ASIC', 'MAS'],
    assets: ['CFDs', 'Forex', 'Stocks', 'Crypto', 'Commodities'],
    features: ['CFD Trading', 'Risk Management', 'Real-time Alerts', 'Demo Account'],
    pros: ['Simple platform', 'No commission', 'Good mobile app', 'Regulated'],
    cons: ['CFDs only', 'Limited research', 'Overnight fees'],
    bonus: 'Welcome bonus up to $50',
    founded: 2008,
    headquarters: 'Haifa, Israel',
    isRecommended: false,
    category: 'forex'
  },
  {
    id: 'td-ameritrade',
    name: 'TD Ameritrade',
    logo: '🇺🇸',
    rating: 4.6,
    reviews: 2890,
    minDeposit: 0,
    spreads: '$0 stock trades',
    leverage: 'Up to 1:4',
    platforms: ['thinkorswim', 'TD Ameritrade Mobile', 'Web Platform'],
    regulation: ['SEC', 'FINRA', 'SIPC'],
    assets: ['Stocks', 'ETFs', 'Options', 'Futures', 'Forex'],
    features: ['Commission-free trades', 'Advanced charting', 'Education', 'Research'],
    pros: ['No commission stocks', 'Excellent education', 'Professional tools', 'US regulated'],
    cons: ['US residents only', 'Complex platform', 'Options fees'],
    bonus: 'Free trades + $100 bonus',
    founded: 1975,
    headquarters: 'Omaha, USA',
    isRecommended: true,
    category: 'stocks'
  }
]

export default function BrokersPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'minDeposit'>('rating')
  const [showOnlyRecommended, setShowOnlyRecommended] = useState(false)

  const categories = [
    { id: 'all', name: 'All Brokers', icon: '🌐' },
    { id: 'forex', name: 'Forex', icon: '💱' },
    { id: 'stocks', name: 'Stocks', icon: '📈' },
    { id: 'crypto', name: 'Crypto', icon: '₿' },
    { id: 'multi', name: 'Multi-Asset', icon: '📊' }
  ]

  // Filter and sort data
  const filteredData = mockBrokerData
    .filter(broker => {
      const matchesCategory = selectedCategory === 'all' || broker.category === selectedCategory
      const matchesRecommended = !showOnlyRecommended || broker.isRecommended
      return matchesCategory && matchesRecommended
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'reviews':
          return b.reviews - a.reviews
        case 'minDeposit':
          return a.minDeposit - b.minDeposit
        default:
          return b.rating - a.rating
      }
    })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ))
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🏦</span>
                <h1 className="text-3xl md:text-4xl font-bold text-primary">
                  Top Rated Brokers
                </h1>
              </div>
              <p className="text-lg text-secondary">
                Compare and choose the best trading brokers with detailed reviews and ratings
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{mockBrokerData.length}</div>
                <div className="text-sm text-secondary">Brokers Listed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {mockBrokerData.filter(b => b.isRecommended).length}
                </div>
                <div className="text-sm text-secondary">Recommended</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {(mockBrokerData.reduce((sum, b) => sum + b.rating, 0) / mockBrokerData.length).toFixed(1)}
                </div>
                <div className="text-sm text-secondary">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`btn btn-sm ${
                    selectedCategory === category.id 
                      ? 'btn-primary' 
                      : 'btn-ghost border border-neutral-300'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Sort and Filter Options */}
            <div className="flex flex-col sm:flex-row gap-4 lg:ml-auto">
              {/* Recommended Filter */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showOnlyRecommended}
                  onChange={(e) => setShowOnlyRecommended(e.target.checked)}
                  className="rounded border-neutral-300 focus-ring"
                />
                <span className="text-sm">Recommended Only</span>
              </label>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'minDeposit')}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus-ring"
              >
                <option value="rating">Sort by Rating</option>
                <option value="reviews">Sort by Reviews</option>
                <option value="minDeposit">Sort by Min Deposit</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Broker Cards */}
      <section className="section">
        <div className="container">
          <div className="grid gap-6">
            {filteredData.map((broker) => (
              <div key={broker.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="grid lg:grid-cols-12 gap-6">
                    {/* Broker Info */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center text-2xl">
                          {broker.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-primary">{broker.name}</h3>
                            {broker.isRecommended && (
                              <span className="bg-success text-white text-xs px-2 py-1 rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">{renderStars(broker.rating)}</div>
                            <span className="font-semibold text-primary">{broker.rating}</span>
                            <span className="text-sm text-secondary">({broker.reviews} reviews)</span>
                          </div>
                          <p className="text-sm text-secondary">
                            Founded {broker.founded} • {broker.headquarters}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="lg:col-span-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-secondary mb-1">Min Deposit</div>
                          <div className="font-semibold text-primary">
                            ${broker.minDeposit === 0 ? 'No minimum' : broker.minDeposit.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-secondary mb-1">Spreads</div>
                          <div className="font-semibold text-primary">{broker.spreads}</div>
                        </div>
                        <div>
                          <div className="text-sm text-secondary mb-1">Leverage</div>
                          <div className="font-semibold text-primary">{broker.leverage}</div>
                        </div>
                        <div>
                          <div className="text-sm text-secondary mb-1">Regulation</div>
                          <div className="font-semibold text-primary">
                            {broker.regulation.slice(0, 2).join(', ')}
                            {broker.regulation.length > 2 && ' +more'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Assets */}
                      <div className="mt-4">
                        <div className="text-sm text-secondary mb-2">Trading Assets</div>
                        <div className="flex flex-wrap gap-1">
                          {broker.assets.map((asset) => (
                            <span key={asset} className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded">
                              {asset}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-3 flex flex-col gap-3">
                      {broker.bonus && (
                        <div className="bg-accent-primary/10 text-accent-primary text-sm p-3 rounded-lg text-center">
                          🎁 {broker.bonus}
                        </div>
                      )}
                      <Link 
                        href={`/brokers/${broker.id}`}
                        className="btn btn-primary w-full"
                      >
                        View Details
                      </Link>
                      <Link 
                        href={`/brokers/compare?brokers=${broker.id}`}
                        className="btn btn-secondary w-full"
                      >
                        Compare
                      </Link>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Pros */}
                      <div>
                        <h4 className="font-semibold text-success mb-3 flex items-center gap-2">
                          <span>✅</span> Pros
                        </h4>
                        <ul className="space-y-1">
                          {broker.pros.slice(0, 3).map((pro, index) => (
                            <li key={index} className="text-sm text-secondary">• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Cons */}
                      <div>
                        <h4 className="font-semibold text-danger mb-3 flex items-center gap-2">
                          <span>❌</span> Cons
                        </h4>
                        <ul className="space-y-1">
                          {broker.cons.slice(0, 3).map((con, index) => (
                            <li key={index} className="text-sm text-secondary">• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Broker Comparison Tool */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Compare Brokers Side by Side
            </h2>
            <p className="text-lg text-secondary">
              Get detailed comparisons of features, fees, and regulations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Compare Tool */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">⚖️</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Broker Comparison</h3>
              <p className="text-secondary mb-6">
                Compare up to 3 brokers side by side with detailed feature analysis
              </p>
              <Link href="/brokers/compare" className="btn btn-primary">
                Compare Brokers
              </Link>
            </div>

            {/* Reviews */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">User Reviews</h3>
              <p className="text-secondary mb-6">
                Read authentic reviews from real traders and share your experience
              </p>
              <Link href="/brokers/reviews" className="btn btn-primary">
                Read Reviews
              </Link>
            </div>

            {/* Educational Content */}
            <div className="trading-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Broker Guide</h3>
              <p className="text-secondary mb-6">
                Learn how to choose the right broker for your trading needs
              </p>
              <Link href="/tutorial" className="btn btn-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Find Your Perfect Broker
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Compare features, read reviews, and choose the broker that fits your trading style
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/brokers/compare" className="btn bg-white text-primary hover:bg-neutral-100 btn-lg">
              Compare Brokers
            </Link>
            <Link href="/tutorial" className="btn btn-ghost border-white text-white hover:bg-white hover:text-primary btn-lg">
              Broker Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 