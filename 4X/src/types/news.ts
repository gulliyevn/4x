/**
 * News and Media Types
 * 
 * This module contains all type definitions related to news articles,
 * sources, categories, and media content for the 4X trading platform.
 */

/**
 * News category enumeration for different types of financial news
 */
export type NewsCategory = 'CRYPTO' | 'STOCKS' | 'FOREX' | 'COMMODITIES' | 'GENERAL'

/**
 * News sentiment enumeration
 */
export enum NewsSentiment {
  /** Very positive sentiment */
  VERY_POSITIVE = 'VERY_POSITIVE',
  /** Positive sentiment */
  POSITIVE = 'POSITIVE',
  /** Neutral sentiment */
  NEUTRAL = 'NEUTRAL',
  /** Negative sentiment */
  NEGATIVE = 'NEGATIVE',
  /** Very negative sentiment */
  VERY_NEGATIVE = 'VERY_NEGATIVE',
}

/**
 * News priority level enumeration
 */
export enum NewsPriority {
  /** Breaking news with high market impact */
  BREAKING = 'BREAKING',
  /** High priority news */
  HIGH = 'HIGH',
  /** Medium priority news */
  MEDIUM = 'MEDIUM',
  /** Low priority news */
  LOW = 'LOW',
}

/**
 * News article type enumeration
 */
export enum NewsType {
  /** Regular news article */
  ARTICLE = 'ARTICLE',
  /** Market analysis */
  ANALYSIS = 'ANALYSIS',
  /** Opinion piece */
  OPINION = 'OPINION',
  /** Press release */
  PRESS_RELEASE = 'PRESS_RELEASE',
  /** Research report */
  RESEARCH = 'RESEARCH',
  /** Earnings report */
  EARNINGS = 'EARNINGS',
  /** Economic data release */
  ECONOMIC_DATA = 'ECONOMIC_DATA',
  /** Video content */
  VIDEO = 'VIDEO',
  /** Podcast */
  PODCAST = 'PODCAST',
}

/**
 * News article interface containing all article information
 */
export interface NewsArticle {
  /** Unique article identifier */
  id: string
  /** Article title */
  title: string
  /** Brief description or summary */
  description: string
  /** Full article content */
  content: string
  /** External article URL */
  url: string
  /** Featured image URL */
  image: string
  /** Publication timestamp */
  publishedAt: Date
  /** News source information */
  source: NewsSource
  /** Article author */
  author: string
  /** Article category */
  category: NewsCategory
  /** Article type */
  type: 'ARTICLE' | 'VIDEO' | 'ANALYSIS'
  /** Article priority level */
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  /** Related symbols/tickers */
  relatedSymbols: string[]
  /** Article tags */
  tags: string[]
  /** Article language */
  language: string
  /** Whether article is trending */
  isTrending: boolean
  /** Whether article is featured */
  isFeatured: boolean
  /** Whether article is premium content */
  isPremium: boolean
}

/**
 * News source interface
 */
export interface NewsSource {
  /** Source unique identifier */
  id: string
  /** Source name */
  name: string
  /** Source website URL */
  url: string
  /** Primary category of the source */
  category: NewsCategory
  /** Source language */
  language: string
  /** Whether source is active */
  isActive: boolean
  /** Whether source requires subscription */
  isPremium: boolean
}

/**
 * News filter interface for searching and filtering articles
 */
export interface NewsFilter {
  /** Search query */
  query?: string
  /** Filter by category */
  category?: NewsCategory
  /** Filter by article type */
  type?: NewsType
  /** Filter by priority */
  priority?: NewsPriority
  /** Filter by sentiment */
  sentiment?: NewsSentiment
  /** Filter by source IDs */
  sourceIds?: string[]
  /** Filter by related symbols */
  symbols?: string[]
  /** Filter by tags */
  tags?: string[]
  /** Filter by language */
  language?: string
  /** Filter by date range */
  dateRange?: {
    /** Start date */
    from: Date
    /** End date */
    to: Date
  }
  /** Filter by minimum market impact */
  minMarketImpact?: number
  /** Include only trending articles */
  trendingOnly?: boolean
  /** Include only featured articles */
  featuredOnly?: boolean
  /** Include only premium articles */
  premiumOnly?: boolean
}

/**
 * News state interface for state management
 */
export interface NewsState {
  /** List of articles */
  articles: NewsArticle[]
  /** List of available sources */
  sources: NewsSource[]
  /** Currently selected article */
  selectedArticle: NewsArticle | null
  /** Current filter settings */
  filter: NewsFilter
  /** Whether news is loading */
  isLoading: boolean
  /** Error message if any */
  error: string | null
  /** Whether has more articles to load */
  hasMore: boolean
  /** Current page for pagination */
  currentPage: number
  /** Total number of articles */
  totalCount: number
  /** Last update timestamp */
  lastUpdated: Date | null
  /** User's favorite article IDs */
  favorites: string[]
  /** User's read article IDs */
  readArticles: string[]
  /** User's bookmarked article IDs */
  bookmarks: string[]
}

/**
 * News subscription interface
 */
export interface NewsSubscription {
  /** Subscription ID */
  id: string
  /** User ID */
  userId: string
  /** Subscribed categories */
  categories: NewsCategory[]
  /** Subscribed sources */
  sourceIds: string[]
  /** Subscribed symbols */
  symbols: string[]
  /** Keywords to watch */
  keywords: string[]
  /** Notification preferences */
  notifications: {
    /** Email notifications enabled */
    email: boolean
    /** Push notifications enabled */
    push: boolean
    /** SMS notifications enabled */
    sms: boolean
    /** Frequency of notifications */
    frequency: 'REAL_TIME' | 'HOURLY' | 'DAILY' | 'WEEKLY'
  }
  /** Whether subscription is active */
  isActive: boolean
  /** Subscription creation date */
  createdAt: Date
  /** Last update date */
  updatedAt: Date
}

/**
 * News analytics interface
 */
export interface NewsAnalytics {
  /** Article ID */
  articleId: string
  /** Total views */
  views: number
  /** Unique views */
  uniqueViews: number
  /** Total shares */
  shares: number
  /** Shares by platform */
  sharesByPlatform: Record<string, number>
  /** Total comments */
  comments: number
  /** Average reading time */
  avgReadingTime: number
  /** Bounce rate */
  bounceRate: number
  /** Geographic distribution of views */
  geographicDistribution: Record<string, number>
  /** Device type distribution */
  deviceDistribution: Record<string, number>
  /** Referral sources */
  referralSources: Record<string, number>
  /** Analytics date */
  date: Date
}

/**
 * News alert interface
 */
export interface NewsAlert {
  /** Alert ID */
  id: string
  /** User ID */
  userId: string
  /** Alert title */
  title: string
  /** Alert description */
  description: string
  /** Alert conditions */
  conditions: {
    /** Keywords to match */
    keywords?: string[]
    /** Symbols to match */
    symbols?: string[]
    /** Categories to match */
    categories?: NewsCategory[]
    /** Sources to match */
    sourceIds?: string[]
    /** Minimum sentiment score */
    minSentiment?: NewsSentiment
    /** Minimum market impact */
    minMarketImpact?: number
  }
  /** Whether alert is active */
  isActive: boolean
  /** Alert creation date */
  createdAt: Date
  /** Last triggered date */
  lastTriggered?: Date
  /** Number of times triggered */
  triggerCount: number
}

/**
 * News comment interface
 */
export interface NewsComment {
  /** Comment ID */
  id: string
  /** Article ID */
  articleId: string
  /** User ID */
  userId: string
  /** User name */
  userName: string
  /** User avatar */
  userAvatar?: string
  /** Comment content */
  content: string
  /** Parent comment ID for replies */
  parentId?: string
  /** Number of upvotes */
  upvotes: number
  /** Number of downvotes */
  downvotes: number
  /** Whether current user upvoted */
  userUpvoted?: boolean
  /** Whether current user downvoted */
  userDownvoted?: boolean
  /** Comment creation date */
  createdAt: Date
  /** Comment update date */
  updatedAt?: Date
  /** Whether comment is edited */
  isEdited: boolean
  /** Whether comment is deleted */
  isDeleted: boolean
}

/**
 * News recommendation interface
 */
export interface NewsRecommendation {
  /** Recommendation ID */
  id: string
  /** User ID */
  userId: string
  /** Recommended article */
  article: NewsArticle
  /** Recommendation score (0-1) */
  score: number
  /** Recommendation reason */
  reason: string
  /** Whether user clicked on recommendation */
  clicked: boolean
  /** Whether user dismissed recommendation */
  dismissed: boolean
  /** Recommendation date */
  createdAt: Date
} 