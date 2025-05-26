/**
 * News Store
 * 
 * Manages news articles state, category filtering, bookmarking,
 * caching, and pagination using Zustand.
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'axios'
import type {
  NewsArticle,
  NewsCategory,
  NewsState,
  NewsFilter,
  NewsSource
} from '@/types/news'
import type { ApiResponse, PaginatedResponse } from '@/types/api'

interface NewsStore extends NewsState {
  // Additional state for pagination and caching
  currentPage: number
  totalPages: number
  cache: Record<string, {
    articles: NewsArticle[]
    timestamp: Date
    totalCount: number
  }>
  
  // Actions
  fetchNews: (filter?: Partial<NewsFilter>, page?: number) => Promise<void>
  fetchSources: () => Promise<void>
  setCategory: (category: NewsCategory | undefined) => void
  setFilter: (filter: Partial<NewsFilter>) => void
  markAsRead: (articleId: string) => void
  markAsUnread: (articleId: string) => void
  bookmarkArticle: (articleId: string) => void
  unbookmarkArticle: (articleId: string) => void
  addToFavorites: (articleId: string) => void
  removeFromFavorites: (articleId: string) => void
  setSelectedArticle: (article: NewsArticle | null) => void
  clearCache: () => void
  refreshNews: () => Promise<void>
  loadMore: () => Promise<void>
  searchNews: (query: string) => Promise<void>
  clearError: () => void
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const ARTICLES_PER_PAGE = 20

// Generate cache key from filter
const getCacheKey = (filter: NewsFilter, page: number): string => {
  return JSON.stringify({ ...filter, page })
}

// Check if cache is valid
const isCacheValid = (timestamp: Date): boolean => {
  return Date.now() - timestamp.getTime() < CACHE_DURATION
}

export const useNewsStore = create<NewsStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state from NewsState
        articles: [],
        sources: [],
        selectedArticle: null,
        filter: {
          category: undefined,
          query: '',
        },
        isLoading: false,
        error: null,
        hasMore: true,
        currentPage: 1,
        totalCount: 0,
        lastUpdated: null,
        favorites: [],
        readArticles: [],
        bookmarks: [],

        // Additional state
        totalPages: 1,
        cache: {},

        // Actions
        fetchNews: async (filterUpdates?: Partial<NewsFilter>, page = 1) => {
          const currentFilter = { ...get().filter, ...filterUpdates }
          const cacheKey = getCacheKey(currentFilter, page)
          
          // Check cache first
          const cached = get().cache[cacheKey]
          if (cached && isCacheValid(cached.timestamp)) {
            set((state) => {
              state.articles = page === 1 ? cached.articles : [...state.articles, ...cached.articles]
              state.totalCount = cached.totalCount
              state.totalPages = Math.ceil(cached.totalCount / ARTICLES_PER_PAGE)
              state.currentPage = page
              state.hasMore = page < state.totalPages
              state.lastUpdated = cached.timestamp
              state.filter = currentFilter
            })
            return
          }

          set((state) => {
            state.isLoading = true
            state.error = null
            if (page === 1) {
              state.articles = []
            }
          })

          try {
            const params = {
              page,
              limit: ARTICLES_PER_PAGE,
              ...currentFilter,
            }

            const response = await axios.get<PaginatedResponse<NewsArticle>>(
              `${API_BASE_URL}/news`,
              { params }
            )

            if (response.data.success && response.data.data) {
              const { data: articles } = response.data
              const { pagination } = response.data

              // Cache the response
              const cacheEntry = {
                articles,
                timestamp: new Date(),
                totalCount: pagination.total,
              }

              set((state) => {
                state.cache[cacheKey] = cacheEntry
                state.articles = page === 1 ? articles : [...state.articles, ...articles]
                state.totalCount = pagination.total
                state.totalPages = pagination.totalPages
                state.currentPage = page
                state.hasMore = pagination.hasNext
                state.lastUpdated = new Date()
                state.filter = currentFilter
                state.isLoading = false
                state.error = null
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to fetch news')
            }
          } catch (error: any) {
            set((state) => {
              state.isLoading = false
              state.error = error.response?.data?.error?.message || error.message || 'Failed to fetch news'
            })
            throw error
          }
        },

        fetchSources: async () => {
          try {
            const response = await axios.get<ApiResponse<NewsSource[]>>(
              `${API_BASE_URL}/news/sources`
            )

            if (response.data.success && response.data.data) {
              set((state) => {
                state.sources = response.data.data!
              })
            } else {
              throw new Error(response.data.error?.message || 'Failed to fetch news sources')
            }
          } catch (error: any) {
            console.error('Failed to fetch news sources:', error)
          }
        },

        setCategory: (category: NewsCategory | undefined) => {
          const newFilter = { ...get().filter, category }
          get().fetchNews(newFilter, 1)
        },

        setFilter: (filterUpdates: Partial<NewsFilter>) => {
          const newFilter = { ...get().filter, ...filterUpdates }
          get().fetchNews(newFilter, 1)
        },

        markAsRead: (articleId: string) => {
          set((state) => {
            if (!state.readArticles.includes(articleId)) {
              state.readArticles.push(articleId)
            }
          })
        },

        markAsUnread: (articleId: string) => {
          set((state) => {
            const index = state.readArticles.indexOf(articleId)
            if (index !== -1) {
              state.readArticles.splice(index, 1)
            }
          })
        },

        bookmarkArticle: (articleId: string) => {
          set((state) => {
            if (!state.bookmarks.includes(articleId)) {
              state.bookmarks.push(articleId)
            }
          })
        },

        unbookmarkArticle: (articleId: string) => {
          set((state) => {
            const index = state.bookmarks.indexOf(articleId)
            if (index !== -1) {
              state.bookmarks.splice(index, 1)
            }
          })
        },

        addToFavorites: (articleId: string) => {
          set((state) => {
            if (!state.favorites.includes(articleId)) {
              state.favorites.push(articleId)
            }
          })
        },

        removeFromFavorites: (articleId: string) => {
          set((state) => {
            const index = state.favorites.indexOf(articleId)
            if (index !== -1) {
              state.favorites.splice(index, 1)
            }
          })
        },

        setSelectedArticle: (article: NewsArticle | null) => {
          set((state) => {
            state.selectedArticle = article
            // Mark as read when selected
            if (article && !state.readArticles.includes(article.id)) {
              state.readArticles.push(article.id)
            }
          })
        },

        clearCache: () => {
          set((state) => {
            state.cache = {}
          })
        },

        refreshNews: async () => {
          // Clear cache and fetch fresh data
          get().clearCache()
          await get().fetchNews(get().filter, 1)
        },

        loadMore: async () => {
          const { currentPage, hasMore, isLoading } = get()
          if (!hasMore || isLoading) return

          await get().fetchNews(get().filter, currentPage + 1)
        },

        searchNews: async (query: string) => {
          const newFilter = { ...get().filter, query }
          await get().fetchNews(newFilter, 1)
        },

        clearError: () => {
          set((state) => {
            state.error = null
          })
        },
      })),
      {
        name: 'news-storage',
        partialize: (state) => ({
          favorites: state.favorites,
          readArticles: state.readArticles,
          bookmarks: state.bookmarks,
          filter: state.filter,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            // Fetch initial data
            state.fetchNews()
            state.fetchSources()
          }
        },
      }
    ),
    {
      name: 'news-store',
    }
  )
)

// Cleanup old cache entries periodically
setInterval(() => {
  const { cache } = useNewsStore.getState()
  const now = Date.now()
  
  const validCache = Object.entries(cache).reduce((acc, [key, value]) => {
    if (now - value.timestamp.getTime() < CACHE_DURATION * 2) {
      acc[key] = value
    }
    return acc
  }, {} as typeof cache)

  if (Object.keys(validCache).length < Object.keys(cache).length) {
    useNewsStore.setState((state) => {
      state.cache = validCache
    })
  }
}, CACHE_DURATION) // Run every 5 minutes 