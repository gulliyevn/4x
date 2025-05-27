'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, Filter, Clock, Tag, TrendingUp, Star } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { DemoModeIndicator } from '@/components/common/DemoModeIndicator'
import mockData from '@/lib/mockData'
import type { NewsArticle, NewsCategory } from '@/types/news'

export default function NewsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | null>(null)
  const [articles, setArticles] = useState<NewsArticle[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    // Initialize demo data
    if (user?.accountType === 'DEMO') {
      setArticles(mockData.newsArticles)
    }
  }, [isAuthenticated, user])

  const categories: NewsCategory[] = ['CRYPTO', 'STOCKS', 'FOREX', 'COMMODITIES', 'GENERAL']
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesCategory = !selectedCategory || article.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  if (!isAuthenticated) return null

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {user?.accountType === 'DEMO' && <DemoModeIndicator />}
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Market News</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory((e.target.value || null) as NewsCategory)}
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
          {filteredArticles.map(article => (
            <article 
              key={article.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                {article.isPremium && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    Premium
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  {article.isTrending && (
                    <div className="flex items-center text-red-600 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Trending
                    </div>
                  )}
                  {article.isFeatured && (
                    <div className="flex items-center text-yellow-600 text-sm">
                      <Star className="w-4 h-4 mr-1" />
                      Featured
                    </div>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    <span>{article.category}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    By {article.source.name}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
} 