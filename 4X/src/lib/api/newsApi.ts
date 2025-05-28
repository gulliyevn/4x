/**
 * News API Client
 * 
 * Provides news functions with multiple source integration:
 * - Finnhub API integration
 * - NewsAPI integration
 * - Fallback between sources
 * - Caching support
 * - Category filtering and search
 */

import { apiClient, createApiCall, createCancellableRequest, ApiClientError } from './client'
import { 
  NewsArticle, 
  NewsSource, 
  NewsFilter, 
  NewsCategory,
  NewsType,
  NewsPriority,
  NewsSentiment 
} from '@/types/news'
import type { ApiResponse, PaginatedResponse } from '@/types/api'

// News API configuration
const FINNHUB_API_URL = 'https://finnhub.io/api/v1'
const NEWSAPI_URL = 'https://newsapi.org/v2'
const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY
const NEWSAPI_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const cache = new Map<string, {
  data: any
  timestamp: number
  ttl: number
}>()

// Rate limiting configuration
const rateLimits = {
  finnhub: {
    requests: 60, // per minute
    current: 0,
    resetTime: Date.now() + 60000,
  },
  newsapi: {
    requests: 500, // per day for free tier
    current: 0,
    resetTime: Date.now() + 24 * 60 * 60 * 1000,
  },
}

// Cache utility functions
const getCacheKey = (endpoint: string, params: any): string => {
  return `${endpoint}:${JSON.stringify(params)}`
}

const isValidCache = (item: { timestamp: number; ttl: number }): boolean => {
  return Date.now() - item.timestamp < item.ttl
}

const setCache = <T>(key: string, data: T, ttl: number = CACHE_DURATION): void => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  })
}

const getCache = <T>(key: string): T | null => {
  const item = cache.get(key)
  if (item && isValidCache(item)) {
    return item.data as T
  }
  cache.delete(key)
  return null
}

// Rate limiting utilities
const checkRateLimit = (source: 'finnhub' | 'newsapi'): Promise<void> => {
  return new Promise((resolve) => {
    const limit = rateLimits[source]
    const now = Date.now()
    
    if (now >= limit.resetTime) {
      limit.current = 0
      limit.resetTime = source === 'finnhub' 
        ? now + 60000 
        : now + 24 * 60 * 60 * 1000
    }
    
    if (limit.current < limit.requests) {
      limit.current++
      resolve()
    } else {
      const waitTime = limit.resetTime - now
      setTimeout(() => {
        limit.current = 1
        limit.resetTime = source === 'finnhub' 
          ? Date.now() + 60000 
          : Date.now() + 24 * 60 * 60 * 1000
        resolve()
      }, waitTime)
    }
  })
}

// Transform functions for different news sources
const transformFinnhubArticle = (article: any): NewsArticle => ({
  id: `finnhub_${article.id || Date.now()}_${Math.random()}`,
  title: article.headline || 'No title',
  description: article.summary?.substring(0, 200) + '...' || '',
  content: article.summary || '',
  url: article.url || '',
  image: article.image || undefined,
  publishedAt: new Date(article.datetime * 1000),
  source: {
    id: 'finnhub',
    name: 'Finnhub',
    url: 'https://finnhub.io',
    category: 'CRYPTO',
    language: 'en',
    isActive: true,
    isPremium: false,
  },
  author: article.source || 'Finnhub',
  category: 'CRYPTO',
  type: 'ARTICLE',
  priority: 'MEDIUM',
  relatedSymbols: [],
  tags: [],
  language: 'en',
  isTrending: false,
  isFeatured: false,
  isPremium: false,
})

const transformNewsAPIArticle = (article: any): NewsArticle => ({
  id: `newsapi_${article.url?.replace(/[^a-zA-Z0-9]/g, '_') || Date.now()}`,
  title: article.title || 'No title',
  description: article.description || '',
  content: article.content || article.description || '',
  url: article.url || '',
  image: article.urlToImage || undefined,
  publishedAt: new Date(article.publishedAt),
  source: {
    id: article.source?.id || 'newsapi',
    name: article.source?.name || 'NewsAPI',
    url: article.url || '',
    category: 'GENERAL',
    language: 'en',
    isActive: true,
    isPremium: false,
  },
  author: article.author || article.source?.name || 'Unknown',
  category: 'GENERAL',
  type: 'ARTICLE',
  priority: 'MEDIUM',
  relatedSymbols: [],
  tags: [],
  language: 'en',
  isTrending: false,
  isFeatured: false,
  isPremium: false,
})

// Finnhub API functions
const fetchFinnhubNews = async (category: string = 'crypto'): Promise<NewsArticle[]> => {
  await checkRateLimit('finnhub')
  
  if (!FINNHUB_API_KEY) {
    throw new ApiClientError(
      'Finnhub API key not configured',
      undefined,
      'CONFIG_ERROR'
    )
  }
  
  const cacheKey = getCacheKey('finnhub_news', { category })
  const cached = getCache<NewsArticle[]>(cacheKey)
  if (cached) return cached
  
  try {
    const response = await fetch(
      `${FINNHUB_API_URL}/news?category=${category}&token=${FINNHUB_API_KEY}`
    )
    
    if (!response.ok) {
      throw new ApiClientError(
        `Finnhub API error: ${response.statusText}`,
        response.status,
        'FINNHUB_ERROR'
      )
    }
    
    const data = await response.json()
    const articles = data.map(transformFinnhubArticle)
    
    setCache(cacheKey, articles)
    return articles
  } catch (error) {
    console.error('Finnhub API error:', error)
    throw error
  }
}

// NewsAPI functions
const fetchNewsAPIArticles = async (
  query?: string, 
  category?: NewsCategory,
  pageSize: number = 20,
  page: number = 1
): Promise<{ articles: NewsArticle[]; totalResults: number }> => {
  await checkRateLimit('newsapi')
  
  if (!NEWSAPI_KEY) {
    throw new ApiClientError(
      'NewsAPI key not configured',
      undefined,
      'CONFIG_ERROR'
    )
  }
  
  const cacheKey = getCacheKey('newsapi_articles', { query, category, pageSize, page })
  const cached = getCache<{ articles: NewsArticle[]; totalResults: number }>(cacheKey)
  if (cached) return cached
  
  try {
    const params = new URLSearchParams({
      apiKey: NEWSAPI_KEY,
      pageSize: pageSize.toString(),
      page: page.toString(),
      sortBy: 'publishedAt',
      language: 'en',
    })
    
    if (query) {
      params.append('q', query)
    }
    
    if (category && category !== 'GENERAL') {
      // Map our categories to NewsAPI categories
      const categoryMap: Record<string, string> = {
        'CRYPTO': 'technology',
        'BUSINESS': 'business',
        'TECHNOLOGY': 'technology',
        'SPORTS': 'sports',
        'ENTERTAINMENT': 'entertainment',
        'HEALTH': 'health',
        'SCIENCE': 'science',
      }
      params.append('category', categoryMap[category] || 'general')
    }
    
    const endpoint = query ? 'everything' : 'top-headlines'
    const response = await fetch(`${NEWSAPI_URL}/${endpoint}?${params}`)
    
    if (!response.ok) {
      throw new ApiClientError(
        `NewsAPI error: ${response.statusText}`,
        response.status,
        'NEWSAPI_ERROR'
      )
    }
    
    const data = await response.json()
    
    if (data.status !== 'ok') {
      throw new ApiClientError(
        data.message || 'NewsAPI request failed',
        undefined,
        'NEWSAPI_ERROR'
      )
    }
    
    const articles = data.articles.map(transformNewsAPIArticle)
    const result = {
      articles,
      totalResults: data.totalResults || 0,
    }
    
    setCache(cacheKey, result)
    return result
  } catch (error) {
    console.error('NewsAPI error:', error)
    throw error
  }
}

// Main news API functions with fallback
export const getNews = async (
  filter: NewsFilter = {},
  page: number = 1,
  limit: number = 20
): Promise<{ articles: NewsArticle[]; totalCount: number; hasMore: boolean }> => {
  const errors: Error[] = []
  
  // Try our internal API first
  try {
    const response = await apiClient.get<PaginatedResponse<NewsArticle>>('/news', {
      params: { ...filter, page, limit }
    })
    
    if (response.data.success && response.data.data) {
      return {
        articles: response.data.data,
        totalCount: response.data.pagination.total,
        hasMore: response.data.pagination.hasNext,
      }
    }
  } catch (error) {
    console.warn('Internal news API failed, trying external sources:', error)
    errors.push(error as Error)
  }
  
  // Fallback to external APIs
  const allArticles: NewsArticle[] = []
  let totalResults = 0
  
  // Try NewsAPI
  if (NEWSAPI_KEY) {
    try {
      const newsApiResult = await fetchNewsAPIArticles(
        filter.query,
        filter.category,
        limit,
        page
      )
      allArticles.push(...newsApiResult.articles)
      totalResults += newsApiResult.totalResults
    } catch (error) {
      console.warn('NewsAPI failed:', error)
      errors.push(error as Error)
    }
  }
  
  // Try Finnhub for crypto news
  if (FINNHUB_API_KEY && (filter.category === 'CRYPTO' || !filter.category)) {
    try {
      const finnhubArticles = await fetchFinnhubNews('crypto')
      allArticles.push(...finnhubArticles)
      totalResults += finnhubArticles.length
    } catch (error) {
      console.warn('Finnhub failed:', error)
      errors.push(error as Error)
    }
  }
  
  if (allArticles.length === 0 && errors.length > 0) {
    throw new ApiClientError(
      'All news sources failed',
      undefined,
      'ALL_SOURCES_FAILED',
      errors
    )
  }
  
  // Remove duplicates based on title similarity
  const uniqueArticles = allArticles.filter((article, index, arr) => {
    return !arr.slice(0, index).some(existing => 
      existing.title.toLowerCase().includes(article.title.toLowerCase().substring(0, 20)) ||
      article.title.toLowerCase().includes(existing.title.toLowerCase().substring(0, 20))
    )
  })
  
  // Sort by published date
  uniqueArticles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
  
  // Apply pagination
  const startIndex = (page - 1) * limit
  const paginatedArticles = uniqueArticles.slice(startIndex, startIndex + limit)
  
  return {
    articles: paginatedArticles,
    totalCount: uniqueArticles.length,
    hasMore: startIndex + limit < uniqueArticles.length,
  }
}

export const getNewsByCategory = async (
  category: NewsCategory,
  page: number = 1,
  limit: number = 20
): Promise<{ articles: NewsArticle[]; totalCount: number; hasMore: boolean }> => {
  return getNews({ category }, page, limit)
}

export const searchNews = async (
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<{ articles: NewsArticle[]; totalCount: number; hasMore: boolean }> => {
  return getNews({ query }, page, limit)
}

export const getNewsSources = createApiCall<NewsSource[]>(
  () => apiClient.get<ApiResponse<NewsSource[]>>('/news/sources')
)

// Cancellable requests
export const getCancellableNews = (filter: NewsFilter = {}, page: number = 1, limit: number = 20) => {
  return createCancellableRequest<{ articles: NewsArticle[]; totalCount: number; hasMore: boolean }>(
    async (signal) => {
      return getNews(filter, page, limit)
    }
  )
}

export const getCancellableSearch = (query: string, page: number = 1, limit: number = 20) => {
  return createCancellableRequest<{ articles: NewsArticle[]; totalCount: number; hasMore: boolean }>(
    async (signal) => {
      return searchNews(query, page, limit)
    }
  )
}

// Cache management
export const clearNewsCache = (): void => {
  cache.clear()
}

export const getCacheStats = () => {
  const stats = {
    totalEntries: cache.size,
    validEntries: 0,
    expiredEntries: 0,
  }
  
  cache.forEach((item) => {
    if (isValidCache(item)) {
      stats.validEntries++
    } else {
      stats.expiredEntries++
    }
  })
  
  return stats
}

// Cleanup expired cache entries
setInterval(() => {
  cache.forEach((item, key) => {
    if (!isValidCache(item)) {
      cache.delete(key)
    }
  })
}, CACHE_DURATION)

// Health check for news sources
export const checkNewsSourceHealth = async (): Promise<{
  internal: boolean
  newsapi: boolean
  finnhub: boolean
}> => {
  const health = {
    internal: false,
    newsapi: false,
    finnhub: false,
  }
  
  // Check internal API
  try {
    const response = await apiClient.get('/news/health')
    health.internal = response.data.success
  } catch (error) {
    console.warn('Internal news API health check failed:', error)
  }
  
  // Check NewsAPI
  if (NEWSAPI_KEY) {
    try {
      const response = await fetch(`${NEWSAPI_URL}/sources?apiKey=${NEWSAPI_KEY}`)
      health.newsapi = response.ok
    } catch (error) {
      console.warn('NewsAPI health check failed:', error)
    }
  }
  
  // Check Finnhub
  if (FINNHUB_API_KEY) {
    try {
      const response = await fetch(`${FINNHUB_API_URL}/news?category=general&token=${FINNHUB_API_KEY}`)
      health.finnhub = response.ok
    } catch (error) {
      console.warn('Finnhub health check failed:', error)
    }
  }
  
  return health
}

const mockCryptoNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Bitcoin Reaches New All-Time High',
    description: 'Bitcoin surpasses $100,000 for the first time in history',
    content: 'Bitcoin has reached a new milestone...',
    url: 'https://example.com/bitcoin-ath',
    image: 'https://example.com/bitcoin.jpg',
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    source: {
      id: 'coindesk',
      name: 'CoinDesk',
      url: 'https://coindesk.com',
      category: 'CRYPTO',
      language: 'en',
      isActive: true,
      isPremium: false,
    },
    author: 'John Doe',
    category: 'CRYPTO',
    type: 'ARTICLE',
    priority: 'HIGH',
    relatedSymbols: ['BTC', 'BTCUSD'],
    tags: ['bitcoin', 'cryptocurrency', 'ath'],
    language: 'en',
    isTrending: true,
    isFeatured: true,
    isPremium: false,
  },
  // ... existing code ...
]

const mockGeneralNews: NewsArticle[] = [
  {
    id: '4',
    title: 'Federal Reserve Announces Interest Rate Decision',
    description: 'Fed keeps rates unchanged amid economic uncertainty',
    content: 'The Federal Reserve announced today...',
    url: 'https://example.com/fed-rates',
    image: 'https://example.com/fed.jpg',
    publishedAt: new Date('2024-01-15T14:00:00Z'),
    source: {
      id: 'reuters',
      name: 'Reuters',
      url: 'https://reuters.com',
      category: 'GENERAL',
      language: 'en',
      isActive: true,
      isPremium: false,
    },
    author: 'Jane Smith',
    category: 'GENERAL',
    type: 'ARTICLE',
    priority: 'HIGH',
    relatedSymbols: ['USD', 'SPY'],
    tags: ['federal-reserve', 'interest-rates', 'economy'],
    language: 'en',
    isTrending: true,
    isFeatured: false,
    isPremium: false,
  },
  // ... existing code ...
] 