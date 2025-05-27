'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Filter } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useMarketStore } from '@/stores/marketStore'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { DemoModeIndicator } from '@/components/common/DemoModeIndicator'
import mockData from '@/lib/mockData'
import type { Symbol } from '@/types/market'

export default function MarketsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const { marketData, initializeMarketData } = useMarketStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    // Initialize demo data
    if (user?.accountType === 'DEMO') {
      initializeMarketData(mockData.marketData)
    }
  }, [isAuthenticated, user])

  const categories = Array.from(new Set(mockData.symbols.map(s => s.category)))
  
  const filteredSymbols = mockData.symbols.filter(symbol => {
    const matchesSearch = searchQuery === '' || 
      symbol.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      symbol.name.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesCategory = !selectedCategory || symbol.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  if (!isAuthenticated) return null

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {user?.accountType === 'DEMO' && <DemoModeIndicator />}
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Markets</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="pl-10 pr-4 py-2 border rounded-lg w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSymbols.map(symbol => {
            const data = marketData[symbol.symbol]
            if (!data) return null
            
            const isPositive = data.change24h >= 0
            
            return (
              <div 
                key={symbol.symbol}
                onClick={() => router.push(`/markets/${symbol.symbol}`)}
                className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">{symbol.symbol}</h2>
                    <p className="text-sm text-gray-500">{symbol.name}</p>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                    {symbol.category}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-lg font-semibold">
                      ${data.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">24h Change</p>
                    <p className={`text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}{data.changePercent24h.toFixed(2)}%
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">24h High</p>
                    <p className="text-base">${data.high24h.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">24h Low</p>
                    <p className="text-base">${data.low24h.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500">24h Volume</p>
                  <p className="text-base">${data.volume24h.toLocaleString()}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
} 