'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// News Interfaces
interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  author: string
  source: string
  publishedAt: string
  imageUrl?: string
  category: 'market' | 'crypto' | 'forex' | 'stocks' | 'commodities' | 'economy'
  impact: 'high' | 'medium' | 'low'
  tags: string[]
  readTime: number
}

interface EconomicEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  currency: string
  impact: 'high' | 'medium' | 'low'
  forecast?: string
  previous?: string
  actual?: string
}

// Mock News Data
const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Federal Reserve Announces Interest Rate Decision',
    description: 'The Federal Reserve has announced its latest interest rate decision, maintaining rates at current levels while signaling potential changes ahead.',
    content: 'In a highly anticipated announcement, the Federal Reserve has decided to maintain interest rates at their current levels...',
    author: 'Sarah Johnson',
    source: 'Financial Times',
    publishedAt: '2024-01-15T10:30:00Z',
    imageUrl: '/assets/news/fed-announcement.jpg',
    category: 'economy',
    impact: 'high',
    tags: ['Federal Reserve', 'Interest Rates', 'Monetary Policy'],
    readTime: 5
  },
  {
    id: '2',
    title: 'Bitcoin Reaches New All-Time High Above $70,000',
    description: 'Bitcoin has surged to a new all-time high, breaking through the $70,000 resistance level amid institutional adoption.',
    content: 'Bitcoin has achieved a historic milestone, reaching a new all-time high above $70,000...',
    author: 'Michael Chen',
    source: 'CoinDesk',
    publishedAt: '2024-01-15T08:15:00Z',
    imageUrl: '/assets/news/bitcoin-ath.jpg',
    category: 'crypto',
    impact: 'high',
    tags: ['Bitcoin', 'Cryptocurrency', 'All-Time High'],
    readTime: 3
  },
  {
    id: '3',
    title: 'Apple Reports Strong Q4 Earnings, Stock Surges',
    description: 'Apple Inc. has reported better-than-expected Q4 earnings, with strong iPhone sales driving revenue growth.',
    content: 'Apple Inc. delivered impressive fourth-quarter results, beating analyst expectations...',
    author: 'Jennifer Davis',
    source: 'Bloomberg',
    publishedAt: '2024-01-15T06:45:00Z',
    imageUrl: '/assets/news/apple-earnings.jpg',
    category: 'stocks',
    impact: 'medium',
    tags: ['Apple', 'Earnings', 'Technology'],
    readTime: 4
  },
  {
    id: '4',
    title: 'EUR/USD Reaches Parity as ECB Signals Rate Cuts',
    description: 'The Euro has weakened against the US Dollar, reaching parity levels as the European Central Bank signals potential rate cuts.',
    content: 'The EUR/USD currency pair has reached parity for the first time in months...',
    author: 'Robert Wilson',
    source: 'Reuters',
    publishedAt: '2024-01-15T05:20:00Z',
    imageUrl: '/assets/news/eur-usd-parity.jpg',
    category: 'forex',
    impact: 'medium',
    tags: ['EUR/USD', 'ECB', 'Currency'],
    readTime: 3
  },
  {
    id: '5',
    title: 'Gold Prices Surge Amid Global Economic Uncertainty',
    description: 'Gold prices have surged to multi-month highs as investors seek safe-haven assets amid global economic uncertainty.',
    content: 'Gold has emerged as the preferred safe-haven asset as global economic uncertainty continues...',
    author: 'Lisa Thompson',
    source: 'MarketWatch',
    publishedAt: '2024-01-15T04:10:00Z',
    imageUrl: '/assets/news/gold-surge.jpg',
    category: 'commodities',
    impact: 'medium',
    tags: ['Gold', 'Safe Haven', 'Commodities'],
    readTime: 4
  },
  {
    id: '6',
    title: 'Tesla Stock Jumps on Record Delivery Numbers',
    description: 'Tesla shares have jumped following the announcement of record quarterly delivery numbers, exceeding analyst expectations.',
    content: 'Tesla Inc. has announced record quarterly delivery numbers, sending shares higher in pre-market trading...',
    author: 'David Martinez',
    source: 'CNBC',
    publishedAt: '2024-01-15T03:30:00Z',
    imageUrl: '/assets/news/tesla-deliveries.jpg',
    category: 'stocks',
    impact: 'medium',
    tags: ['Tesla', 'Electric Vehicles', 'Deliveries'],
    readTime: 3
  }
]

// Mock Economic Events
const mockEconomicEvents: EconomicEvent[] = [
  {
    id: '1',
    title: 'US Non-Farm Payrolls',
    description: 'Monthly employment data release showing job creation in the US economy',
    date: '2024-01-16',
    time: '08:30',
    currency: 'USD',
    impact: 'high',
    forecast: '180K',
    previous: '175K',
    actual: '185K'
  },
  {
    id: '2',
    title: 'ECB Interest Rate Decision',
    description: 'European Central Bank monetary policy decision and press conference',
    date: '2024-01-17',
    time: '12:45',
    currency: 'EUR',
    impact: 'high',
    forecast: '4.50%',
    previous: '4.50%'
  },
  {
    id: '3',
    title: 'UK GDP Growth Rate',
    description: 'Quarterly gross domestic product growth rate for the United Kingdom',
    date: '2024-01-18',
    time: '07:00',
    currency: 'GBP',
    impact: 'medium',
    forecast: '0.2%',
    previous: '0.1%'
  },
  {
    id: '4',
    title: 'Japan CPI Inflation',
    description: 'Consumer Price Index inflation data for Japan',
    date: '2024-01-19',
    time: '23:30',
    currency: 'JPY',
    impact: 'medium',
    forecast: '2.8%',
    previous: '2.9%'
  }
]

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImpact, setSelectedImpact] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'news' | 'calendar'>('news')

  const categories = [
    { id: 'all', name: 'All News', icon: '🌐' },
    { id: 'market', name: 'Market', icon: '📊' },
    { id: 'crypto', name: 'Crypto', icon: '₿' },
    { id: 'forex', name: 'Forex', icon: '💱' },
    { id: 'stocks', name: 'Stocks', icon: '📈' },
    { id: 'commodities', name: 'Commodities', icon: '🥇' },
    { id: 'economy', name: 'Economy', icon: '🏛️' }
  ]

  const impactLevels = [
    { id: 'all', name: 'All Impact' },
    { id: 'high', name: 'High Impact' },
    { id: 'medium', name: 'Medium Impact' },
    { id: 'low', name: 'Low Impact' }
  ]

  // Filter news articles
  const filteredNews = mockNewsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesImpact = selectedImpact === 'all' || article.impact === selectedImpact
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesImpact && matchesSearch
  })

  // Get time ago string
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Financial News & Analysis
              </h1>
              <p className="text-lg text-secondary">
                Stay informed with the latest market news and economic events
              </p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('news')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'news'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                📰 News
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'calendar'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                📅 Economic Calendar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Tab */}
      {activeTab === 'news' && (
        <>
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
                
                {/* Search and Impact Filter */}
                <div className="flex flex-col sm:flex-row gap-4 lg:ml-auto">
                  {/* Search */}
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search news..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus-ring w-full sm:w-64"
                    />
                  </div>
                  
                  {/* Impact Filter */}
                  <select
                    value={selectedImpact}
                    onChange={(e) => setSelectedImpact(e.target.value)}
                    className="px-4 py-2 border border-neutral-300 rounded-lg focus-ring"
                  >
                    {impactLevels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* News Articles */}
          <section className="section">
            <div className="container">
              {/* Featured Article */}
              {filteredNews.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">Featured Story</h2>
                  <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="h-64 lg:h-auto bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">📰</div>
                          <p className="text-secondary">Featured Image</p>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            filteredNews[0].impact === 'high' ? 'bg-danger/10 text-danger' :
                            filteredNews[0].impact === 'medium' ? 'bg-warning/10 text-warning' :
                            'bg-neutral-100 text-neutral-600'
                          }`}>
                            {filteredNews[0].impact.toUpperCase()} IMPACT
                          </span>
                          <span className="text-sm text-tertiary">{getTimeAgo(filteredNews[0].publishedAt)}</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-primary mb-4">
                          {filteredNews[0].title}
                        </h3>
                        
                        <p className="text-secondary mb-6 leading-relaxed">
                          {filteredNews[0].description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-tertiary">
                            <span>By {filteredNews[0].author}</span>
                            <span>•</span>
                            <span>{filteredNews[0].source}</span>
                            <span>•</span>
                            <span>{filteredNews[0].readTime} min read</span>
                          </div>
                          
                          <button className="btn btn-primary">
                            Read Full Article
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* News Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.slice(1).map((article) => (
                  <div key={article.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
                    {/* Article Image */}
                    <div className="h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">
                          {article.category === 'crypto' ? '₿' :
                           article.category === 'forex' ? '💱' :
                           article.category === 'stocks' ? '📈' :
                           article.category === 'commodities' ? '🥇' :
                           article.category === 'economy' ? '🏛️' : '📊'}
                        </div>
                        <p className="text-xs text-secondary">{article.category}</p>
                      </div>
                    </div>
                    
                    {/* Article Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          article.impact === 'high' ? 'bg-danger/10 text-danger' :
                          article.impact === 'medium' ? 'bg-warning/10 text-warning' :
                          'bg-neutral-100 text-neutral-600'
                        }`}>
                          {article.impact.toUpperCase()}
                        </span>
                        <span className="text-xs text-tertiary">{getTimeAgo(article.publishedAt)}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-primary mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-secondary text-sm mb-4 line-clamp-3">
                        {article.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-tertiary">
                        <span>{article.source}</span>
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredNews.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-primary mb-2">No news found</h3>
                  <p className="text-secondary">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Economic Calendar Tab */}
      {activeTab === 'calendar' && (
        <section className="section">
          <div className="container">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-secondary">
                  <div className="col-span-2">Time</div>
                  <div className="col-span-1">Currency</div>
                  <div className="col-span-1">Impact</div>
                  <div className="col-span-4">Event</div>
                  <div className="col-span-1 text-center">Forecast</div>
                  <div className="col-span-1 text-center">Previous</div>
                  <div className="col-span-2 text-center">Actual</div>
                </div>
              </div>
              
              {/* Calendar Events */}
              <div className="divide-y divide-neutral-200">
                {mockEconomicEvents.map((event) => (
                  <div key={event.id} className="px-6 py-4 hover:bg-neutral-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Time */}
                      <div className="col-span-2">
                        <div className="font-medium text-primary">{event.time}</div>
                        <div className="text-sm text-secondary">{new Date(event.date).toLocaleDateString()}</div>
                      </div>
                      
                      {/* Currency */}
                      <div className="col-span-1">
                        <span className="px-2 py-1 text-xs font-bold bg-neutral-100 text-neutral-700 rounded">
                          {event.currency}
                        </span>
                      </div>
                      
                      {/* Impact */}
                      <div className="col-span-1">
                        <div className={`w-3 h-3 rounded-full ${
                          event.impact === 'high' ? 'bg-danger' :
                          event.impact === 'medium' ? 'bg-warning' :
                          'bg-neutral-400'
                        }`}></div>
                      </div>
                      
                      {/* Event */}
                      <div className="col-span-4">
                        <div className="font-semibold text-primary">{event.title}</div>
                        <div className="text-sm text-secondary">{event.description}</div>
                      </div>
                      
                      {/* Forecast */}
                      <div className="col-span-1 text-center">
                        <span className="text-sm text-secondary">{event.forecast || '-'}</span>
                      </div>
                      
                      {/* Previous */}
                      <div className="col-span-1 text-center">
                        <span className="text-sm text-secondary">{event.previous || '-'}</span>
                      </div>
                      
                      {/* Actual */}
                      <div className="col-span-2 text-center">
                        {event.actual ? (
                          <span className={`text-sm font-medium ${
                            event.forecast && parseFloat(event.actual) > parseFloat(event.forecast) 
                              ? 'text-success' 
                              : event.forecast && parseFloat(event.actual) < parseFloat(event.forecast)
                              ? 'text-danger'
                              : 'text-primary'
                          }`}>
                            {event.actual}
                          </span>
                        ) : (
                          <span className="text-sm text-tertiary">Pending</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Calendar Legend */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h3 className="font-semibold text-primary mb-4">Impact Legend</h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-danger"></div>
                  <span className="text-sm text-secondary">High Impact - Major market moving events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-sm text-secondary">Medium Impact - Moderate market influence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neutral-400"></div>
                  <span className="text-sm text-secondary">Low Impact - Minor market influence</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Market Sentiment */}
      <section className="section bg-white">
        <div className="container">
          <h3 className="text-xl font-semibold text-primary mb-6">Market Sentiment</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Fear & Greed Index */}
            <div className="trading-card text-center">
              <h4 className="font-semibold text-primary mb-4">Fear & Greed Index</h4>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-danger via-warning to-success flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">65</div>
                      <div className="text-xs text-secondary">Greed</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-secondary">Market showing signs of greed</p>
            </div>
            
            {/* VIX Index */}
            <div className="trading-card text-center">
              <h4 className="font-semibold text-primary mb-4">VIX Volatility Index</h4>
              <div className="text-4xl font-bold text-primary mb-2">18.45</div>
              <div className="text-sm text-success mb-4">-2.3% from yesterday</div>
              <p className="text-sm text-secondary">Low volatility environment</p>
            </div>
            
            {/* Market Breadth */}
            <div className="trading-card text-center">
              <h4 className="font-semibold text-primary mb-4">Market Breadth</h4>
              <div className="flex justify-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-success">1,247</div>
                  <div className="text-xs text-secondary">Advancing</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-danger">856</div>
                  <div className="text-xs text-secondary">Declining</div>
                </div>
              </div>
              <p className="text-sm text-secondary">Positive market breadth</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 