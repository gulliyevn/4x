'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useMarketStore } from '@/stores/marketStore'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary'
import { ActivePositions } from '@/components/dashboard/ActivePositions'
import { MarketOverview } from '@/components/dashboard/MarketOverview'
import { RecentTrades } from '@/components/dashboard/RecentTrades'
import { NewsWidget } from '@/components/dashboard/NewsWidget'
import { DemoModeIndicator } from '@/components/common/DemoModeIndicator'
import mockData from '@/lib/mockData'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const { initializeMarketData } = useMarketStore()
  const { initializePortfolio } = usePortfolioStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    // Initialize demo data
    if (user?.accountType === 'DEMO') {
      initializeMarketData(mockData.marketData)
      initializePortfolio({
        portfolio: mockData.portfolio,
        positions: mockData.positions,
        trades: mockData.recentTrades
      })
    }
  }, [isAuthenticated, user])

  if (!isAuthenticated) return null

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {user?.accountType === 'DEMO' && <DemoModeIndicator />}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioSummary data={mockData.portfolioSummary} />
          <MarketOverview data={mockData.marketData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ActivePositions positions={mockData.positions} />
          <RecentTrades trades={mockData.recentTrades} />
        </div>

        <div className="mt-6">
          <NewsWidget articles={mockData.newsArticles.slice(0, 3)} />
        </div>
      </div>
    </DashboardLayout>
  )
} 