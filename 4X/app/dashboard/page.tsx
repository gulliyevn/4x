'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/stores/authStore'
import { DemoToggle } from '@/components/DemoToggle'
import { DemoFloatingButton } from '@/components/DemoFloatingButton'

// Dashboard Interfaces
interface QuickStat {
  title: string
  value: string
  change: string
  changePercent: number
  icon: string
  color: 'success' | 'danger' | 'primary' | 'warning'
}

interface RecentActivity {
  id: string
  type: 'trade' | 'deposit' | 'withdrawal' | 'alert'
  description: string
  amount?: number
  symbol?: string
  timestamp: string
  status: 'completed' | 'pending' | 'failed'
}

interface Notification {
  id: string
  type: 'price_alert' | 'news' | 'system' | 'trade'
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: 'high' | 'medium' | 'low'
}

// Mock Data
const mockQuickStats: QuickStat[] = [
  {
    title: 'Portfolio Value',
    value: '$125,430.56',
    change: '+$2,340.78',
    changePercent: 1.90,
    icon: '💼',
    color: 'primary'
  },
  {
    title: 'Today\'s P&L',
    value: '+$1,234.56',
    change: '+2.34%',
    changePercent: 2.34,
    icon: '📈',
    color: 'success'
  },
  {
    title: 'Available Balance',
    value: '$8,750.00',
    change: '-$500.00',
    changePercent: -5.40,
    icon: '💰',
    color: 'warning'
  },
  {
    title: 'Open Positions',
    value: '6',
    change: '+2',
    changePercent: 50.00,
    icon: '📊',
    color: 'primary'
  }
]

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'trade',
    description: 'Bought Bitcoin',
    amount: 0.1234,
    symbol: 'BTC/USD',
    timestamp: '2 minutes ago',
    status: 'completed'
  },
  {
    id: '2',
    type: 'deposit',
    description: 'Bank deposit',
    amount: 5000,
    timestamp: '1 hour ago',
    status: 'completed'
  },
  {
    id: '3',
    type: 'trade',
    description: 'Sold Ethereum',
    amount: 2.5678,
    symbol: 'ETH/USD',
    timestamp: '3 hours ago',
    status: 'completed'
  },
  {
    id: '4',
    type: 'alert',
    description: 'Price alert triggered for AAPL',
    symbol: 'AAPL',
    timestamp: '5 hours ago',
    status: 'completed'
  },
  {
    id: '5',
    type: 'withdrawal',
    description: 'Bank withdrawal',
    amount: 2000,
    timestamp: '1 day ago',
    status: 'pending'
  }
]

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'price_alert',
    title: 'Bitcoin Price Alert',
    message: 'BTC/USD has reached your target price of $67,000',
    timestamp: '5 minutes ago',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'news',
    title: 'Market Update',
    message: 'Federal Reserve announces interest rate decision',
    timestamp: '1 hour ago',
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'trade',
    title: 'Trade Executed',
    message: 'Your limit order for AAPL has been filled',
    timestamp: '2 hours ago',
    read: true,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance tonight from 2-4 AM EST',
    timestamp: '6 hours ago',
    read: true,
    priority: 'low'
  }
]

export default function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [showAllNotifications, setShowAllNotifications] = useState(false)
  const { user, isDemoMode } = useAuthStore()

  const timeframes = ['1D', '1W', '1M', '3M', '1Y']

  // Filter unread notifications
  const unreadNotifications = mockNotifications.filter(n => !n.read)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Demo Mode Indicator */}
      {isDemoMode && (
        <section className="demo-mode-indicator py-4 relative overflow-hidden">
          <div className="container">
            <div className="flex items-center justify-center text-white text-sm font-medium">
              <div className="flex items-center space-x-3">
                <div className="demo-pulse-dot w-3 h-3 rounded-full"></div>
                <span className="font-semibold text-lg">🧪 Demo Mode Active</span>
                <span className="text-blue-100">|</span>
                <span className="text-blue-100">Trading with virtual funds</span>
                <div className="demo-pulse-dot w-3 h-3 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Demo Toggle Section */}
      <section className="py-8 demo-section-gradient border-b border-gray-200 dark:border-gray-700">
        <div className="container max-w-5xl mx-auto px-4">
          <DemoToggle />
        </div>
      </section>

        {/* Header */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Welcome back, {user?.firstName || 'Trader'}! 👋
                {isDemoMode && <span className="text-blue-600"> (Demo)</span>}
              </h1>
              <p className="text-lg text-secondary">
                {isDemoMode 
                  ? "You're exploring with virtual funds - try all features risk-free!"
                  : "Here's what's happening with your investments today"
                }
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4">
              <Link href="/markets" className="btn btn-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Explore Markets
              </Link>
              <Link href="/charts" className="btn btn-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Start Trading
              </Link>
              </div>
              </div>
            </div>
      </section>

      {/* Quick Stats */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockQuickStats.map((stat, index) => (
              <div key={index} className="trading-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-secondary">{stat.title}</h3>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    stat.color === 'success' ? 'bg-success' :
                    stat.color === 'danger' ? 'bg-danger' :
                    stat.color === 'warning' ? 'bg-warning' :
                    'bg-gradient-to-r from-accent-primary to-accent-secondary'
                  }`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className={`text-sm ${stat.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
                  {stat.change} ({stat.changePercent >= 0 ? '+' : ''}{stat.changePercent.toFixed(2)}%)
            </div>
              </div>
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Portfolio Performance Chart */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                  <h3 className="text-xl font-semibold text-primary">Portfolio Performance</h3>
                  
                  {/* Timeframe Selector */}
                  <div className="flex gap-2">
                    {timeframes.map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setSelectedTimeframe(tf)}
                        className={`btn btn-sm ${
                          selectedTimeframe === tf ? 'btn-primary' : 'btn-ghost'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
              </div>
            </div>
                
                <div className="h-64 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      Portfolio Performance Chart
                    </h3>
                    <p className="text-secondary">
                      Track your portfolio value over time • {selectedTimeframe}
                </p>
              </div>
                </div>
              </div>
            </div>

            {/* Notifications Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-primary">
                  Notifications
                  {unreadNotifications.length > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-danger rounded-full">
                      {unreadNotifications.length}
              </span>
                  )}
                </h3>
                <button
                  onClick={() => setShowAllNotifications(!showAllNotifications)}
                  className="text-sm text-accent-primary hover:text-accent-secondary"
                >
                  {showAllNotifications ? 'Show Unread' : 'Show All'}
                </button>
        </div>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {(showAllNotifications ? mockNotifications : unreadNotifications).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      notification.read 
                        ? 'bg-neutral-50 border-neutral-200' 
                        : 'bg-accent-primary/5 border-accent-primary/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        notification.priority === 'high' ? 'bg-danger text-white' :
                        notification.priority === 'medium' ? 'bg-warning text-white' :
                        'bg-neutral-400 text-white'
                      }`}>
                        {notification.type === 'price_alert' ? '🚨' :
                         notification.type === 'news' ? '📰' :
                         notification.type === 'trade' ? '💹' : '⚙️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-primary text-sm">{notification.title}</h4>
                        <p className="text-secondary text-sm mt-1">{notification.message}</p>
                        <p className="text-tertiary text-xs mt-2">{notification.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {unreadNotifications.length === 0 && !showAllNotifications && (
                <div className="text-center py-8 text-tertiary">
                  <div className="text-4xl mb-2">✅</div>
                  <p>All caught up!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity & Quick Actions */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div>
              <h3 className="text-xl font-semibold text-primary mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'trade' ? 'bg-accent-primary text-white' :
                      activity.type === 'deposit' ? 'bg-success text-white' :
                      activity.type === 'withdrawal' ? 'bg-warning text-white' :
                      'bg-neutral-400 text-white'
                    }`}>
                      {activity.type === 'trade' ? '💹' :
                       activity.type === 'deposit' ? '💰' :
                       activity.type === 'withdrawal' ? '🏦' : '🔔'}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-primary">{activity.description}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          activity.status === 'completed' ? 'bg-success/10 text-success' :
                          activity.status === 'pending' ? 'bg-warning/10 text-warning' :
                          'bg-danger/10 text-danger'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-sm text-secondary">
                          {activity.symbol && (
                            <span className="font-medium">{activity.symbol}</span>
                          )}
                          {activity.amount && (
                            <span className="ml-2">
                              {activity.type === 'trade' ? `${activity.amount} units` : `$${activity.amount.toLocaleString()}`}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-tertiary">{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link href="/portfolio" className="btn btn-ghost w-full">
                  View All Activity
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-semibold text-primary mb-6">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Trade Actions */}
                <Link href="/charts" className="trading-card text-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Quick Trade</h4>
                  <p className="text-sm text-secondary">Execute trades instantly</p>
                </Link>
                
                <Link href="/markets" className="trading-card text-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Market Watch</h4>
                  <p className="text-sm text-secondary">Monitor live prices</p>
                </Link>
                
                <Link href="/portfolio" className="trading-card text-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Portfolio</h4>
                  <p className="text-sm text-secondary">Manage investments</p>
                </Link>
                
                <div className="trading-card text-center group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Deposit</h4>
                  <p className="text-sm text-secondary">Add funds to account</p>
                </div>
              </div>
              
              {/* Market Overview */}
              <div className="mt-8">
                <h4 className="font-semibold text-primary mb-4">Market Overview</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-white font-bold text-xs">
                        B
                      </div>
                      <div>
                        <div className="font-medium text-primary">BTC/USD</div>
                        <div className="text-sm text-secondary">Bitcoin</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">$67,234.56</div>
                      <div className="text-sm text-success">+2.34%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-white font-bold text-xs">
                        E
                      </div>
                    <div>
                        <div className="font-medium text-primary">ETH/USD</div>
                        <div className="text-sm text-secondary">Ethereum</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">$3,456.78</div>
                      <div className="text-sm text-success">+1.87%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-white font-bold text-xs">
                        A
                    </div>
                    <div>
                        <div className="font-medium text-primary">AAPL</div>
                        <div className="text-sm text-secondary">Apple Inc.</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">$189.45</div>
                      <div className="text-sm text-success">+1.25%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Tools */}
      <section className="section">
        <div className="container">
          <h3 className="text-xl font-semibold text-primary mb-6">Trading Tools & Resources</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Economic Calendar */}
            <div className="trading-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent-tertiary rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-primary">Economic Calendar</h4>
              </div>
              <p className="text-secondary mb-4">Stay updated with important economic events and announcements.</p>
              <Link href="/news" className="btn btn-ghost btn-sm">
                View Calendar →
              </Link>
            </div>
            
            {/* Market Analysis */}
            <div className="trading-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent-tertiary rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-primary">Market Analysis</h4>
              </div>
              <p className="text-secondary mb-4">Get professional insights and technical analysis from our experts.</p>
              <Link href="/news" className="btn btn-ghost btn-sm">
                Read Analysis →
              </Link>
            </div>
            
            {/* Risk Calculator */}
            <div className="trading-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent-tertiary rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-primary">Risk Calculator</h4>
              </div>
              <p className="text-secondary mb-4">Calculate position sizes and manage your trading risk effectively.</p>
              <button className="btn btn-ghost btn-sm">
                Calculate Risk →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Floating Button */}
      <DemoFloatingButton />
    </div>
  )
} 