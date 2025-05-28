/**
 * Trading Operations and Portfolio Types
 * 
 * This module contains all type definitions related to trading operations,
 * portfolio management, watchlists, alerts, and trade history for the 4X platform.
 */

/**
 * Order type enumeration
 */
export enum OrderType {
  /** Market order - execute immediately at current market price */
  MARKET = 'MARKET',
  /** Limit order - execute only at specified price or better */
  LIMIT = 'LIMIT',
  /** Stop-loss order - trigger when price reaches stop price */
  STOP_LOSS = 'STOP_LOSS',
  /** Stop-limit order - trigger stop, then place limit order */
  STOP_LIMIT = 'STOP_LIMIT',
  /** Take-profit order - close position at profit target */
  TAKE_PROFIT = 'TAKE_PROFIT',
  /** One-cancels-other order */
  OCO = 'OCO',
  /** Trailing stop order */
  TRAILING_STOP = 'TRAILING_STOP',
}

/**
 * Order side enumeration
 */
export enum OrderSide {
  /** Buy order */
  BUY = 'BUY',
  /** Sell order */
  SELL = 'SELL',
}

/**
 * Order status enumeration
 */
export enum OrderStatus {
  /** Order is waiting to be filled */
  PENDING = 'PENDING',
  /** Order is partially filled */
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  /** Order is completely filled */
  FILLED = 'FILLED',
  /** Order was cancelled */
  CANCELLED = 'CANCELLED',
  /** Order was rejected */
  REJECTED = 'REJECTED',
  /** Order expired */
  EXPIRED = 'EXPIRED',
}

/**
 * Position status enumeration
 */
export enum PositionStatus {
  /** Position is open */
  OPEN = 'OPEN',
  /** Position is closed */
  CLOSED = 'CLOSED',
  /** Position is being closed */
  CLOSING = 'CLOSING',
}

/**
 * Time in force enumeration
 */
export enum TimeInForce {
  /** Good till cancelled */
  GTC = 'GTC',
  /** Immediate or cancel */
  IOC = 'IOC',
  /** Fill or kill */
  FOK = 'FOK',
  /** Good till date */
  GTD = 'GTD',
}

/**
 * Asset type enumeration
 */
export enum AssetType {
  /** Cryptocurrency */
  CRYPTO = 'CRYPTO',
  /** Foreign exchange */
  FOREX = 'FOREX',
  /** Stock/Equity */
  STOCK = 'STOCK',
  /** Commodity */
  COMMODITY = 'COMMODITY',
  /** Index */
  INDEX = 'INDEX',
  /** Bond */
  BOND = 'BOND',
  /** ETF */
  ETF = 'ETF',
  /** Option */
  OPTION = 'OPTION',
  /** Future */
  FUTURE = 'FUTURE',
}

/**
 * Trading pair interface with comprehensive information
 */
export interface TradingPair {
  /** Unique trading pair identifier */
  id: string
  /** Trading symbol (e.g., BTCUSDT, EURUSD) */
  symbol: string
  /** Base asset */
  baseAsset: string
  /** Quote asset */
  quoteAsset: string
  /** Human-readable name */
  name: string
  /** Asset type */
  assetType: AssetType
  /** Current market price */
  currentPrice: number
  /** 24h price change */
  priceChange24h: number
  /** 24h price change percentage */
  priceChangePercent24h: number
  /** 24h volume */
  volume24h: number
  /** Market cap (if applicable) */
  marketCap?: number
  /** Whether trading is enabled */
  tradingEnabled: boolean
  /** Minimum order size */
  minOrderSize: number
  /** Maximum order size */
  maxOrderSize: number
  /** Price precision */
  pricePrecision: number
  /** Quantity precision */
  quantityPrecision: number
  /** Trading fees */
  fees: {
    /** Maker fee percentage */
    maker: number
    /** Taker fee percentage */
    taker: number
  }
  /** Margin trading available */
  marginEnabled: boolean
  /** Maximum leverage */
  maxLeverage?: number
}

/**
 * Trading order interface
 */
export interface Order {
  /** Unique order identifier */
  id: string
  /** User ID who placed the order */
  userId: string
  /** Trading symbol */
  symbol: string
  /** Order type */
  type: OrderType
  /** Order side (buy/sell) */
  side: OrderSide
  /** Order status */
  status: OrderStatus
  /** Order quantity */
  quantity: number
  /** Order price (for limit orders) */
  price?: number
  /** Stop price (for stop orders) */
  stopPrice?: number
  /** Filled quantity */
  filledQuantity: number
  /** Remaining quantity */
  remainingQuantity: number
  /** Average filled price */
  averagePrice?: number
  /** Time in force */
  timeInForce: TimeInForce
  /** Order creation timestamp */
  createdAt: Date
  /** Order update timestamp */
  updatedAt: Date
  /** Order expiration time */
  expiresAt?: Date
  /** Trading fees paid */
  fees: number
  /** Fee currency */
  feeCurrency: string
  /** Additional order metadata */
  metadata?: Record<string, unknown>
}

/**
 * Trading position interface
 */
export interface Position {
  /** Unique position identifier */
  id: string
  /** User ID */
  userId: string
  /** Trading symbol */
  symbol: string
  /** Position side */
  side: OrderSide
  /** Position status */
  status: PositionStatus
  /** Position size */
  size: number
  /** Entry price */
  entryPrice: number
  /** Current market price */
  currentPrice: number
  /** Exit price (if closed) */
  exitPrice?: number
  /** Current PnL (alias for unrealizedPnL) */
  pnl: number
  /** Unrealized PnL */
  unrealizedPnL: number
  /** Realized PnL */
  realizedPnL: number
  /** PnL percentage */
  pnlPercent: number
  /** Leverage used */
  leverage: number
  /** Margin required */
  margin: number
  /** Liquidation price */
  liquidationPrice?: number
  /** Stop loss price */
  stopLoss?: number
  /** Take profit price */
  takeProfit?: number
  /** Position open timestamp */
  openedAt: Date
  /** Position close timestamp */
  closedAt?: Date
  /** Position update timestamp */
  updatedAt: Date
  /** Associated orders */
  orders: string[]
  /** Position fees */
  fees: number
  /** Fee currency */
  feeCurrency: string
}

/**
 * Portfolio interface with comprehensive portfolio information
 */
export interface Portfolio {
  /** Unique portfolio identifier */
  id: string
  /** User ID */
  userId: string
  /** Portfolio name */
  name: string
  /** Portfolio description */
  description?: string
  /** Portfolio base currency */
  currency: string
  /** Total portfolio value */
  totalValue: number
  /** Available balance */
  availableBalance: number
  /** Total PnL (alias for unrealizedPnL + realizedPnL) */
  totalPnL: number
  /** Margin used */
  marginUsed: number
  /** Free margin */
  freeMargin: number
  /** Margin level percentage */
  marginLevel: number
  /** Total unrealized PnL */
  unrealizedPnL: number
  /** Total realized PnL */
  realizedPnL: number
  /** Total PnL percentage */
  totalPnLPercent: number
  /** Portfolio balances by currency */
  balances: Record<string, {
    /** Available balance */
    available: number
    /** Locked balance (in orders) */
    locked: number
    /** Total balance */
    total: number
    /** Value in base currency */
    valueInBaseCurrency: number
  }>
  /** Open positions */
  positions: Position[]
  /** Open orders */
  orders: Order[]
  /** Portfolio creation timestamp */
  createdAt: Date
  /** Last update timestamp */
  updatedAt: Date
  /** Last data update timestamp */
  lastUpdated: Date
  /** Portfolio statistics */
  statistics: {
    /** Total trades count */
    totalTrades: number
    /** Winning trades count */
    winningTrades: number
    /** Losing trades count */
    losingTrades: number
    /** Win rate percentage */
    winRate: number
    /** Average win amount */
    averageWin: number
    /** Average loss amount */
    averageLoss: number
    /** Profit factor */
    profitFactor: number
    /** Maximum drawdown */
    maxDrawdown: number
    /** Sharpe ratio */
    sharpeRatio?: number
  }
}

/**
 * Watchlist interface for tracking favorite trading pairs
 */
export interface Watchlist {
  /** Unique watchlist identifier */
  id: string
  /** User ID */
  userId: string
  /** Watchlist name */
  name: string
  /** Watchlist description */
  description?: string
  /** Trading pairs in watchlist */
  symbols: string[]
  /** Watchlist creation timestamp */
  createdAt: Date
  /** Last update timestamp */
  updatedAt: Date
  /** Whether watchlist is public */
  isPublic: boolean
  /** Whether this is the default watchlist */
  isDefault: boolean
  /** Watchlist color/theme */
  color?: string
  /** Sort order */
  sortOrder: number
}

/**
 * Price alert interface for monitoring price movements
 */
export interface PriceAlert {
  /** Unique alert identifier */
  id: string
  /** User ID */
  userId: string
  /** Trading symbol */
  symbol: string
  /** Alert name */
  name: string
  /** Alert description */
  description?: string
  /** Alert condition type */
  condition: 'ABOVE' | 'BELOW' | 'CROSSES_ABOVE' | 'CROSSES_BELOW' | 'PERCENT_CHANGE'
  /** Target price */
  targetPrice: number
  /** Current price when alert was created */
  basePrice?: number
  /** Percentage change (for percent change alerts) */
  percentChange?: number
  /** Whether alert is active */
  isActive: boolean
  /** Whether alert has been triggered */
  isTriggered: boolean
  /** Alert creation timestamp */
  createdAt: Date
  /** Alert trigger timestamp */
  triggeredAt?: Date
  /** Notification settings */
  notifications: {
    /** Send email notification */
    email: boolean
    /** Send push notification */
    push: boolean
    /** Send SMS notification */
    sms: boolean
  }
  /** Alert expiration time */
  expiresAt?: Date
  /** Number of times this alert can be triggered */
  maxTriggers?: number
  /** Number of times triggered */
  triggerCount: number
}

/**
 * Trade history interface for historical trades
 */
export interface TradeHistory {
  /** Unique trade identifier */
  id: string
  /** User ID */
  userId: string
  /** Trading symbol */
  symbol: string
  /** Order ID that generated this trade */
  orderId: string
  /** Position ID (if applicable) */
  positionId?: string
  /** Trade side */
  side: OrderSide
  /** Trade quantity */
  quantity: number
  /** Trade price */
  price: number
  /** Trade value */
  value: number
  /** Trading fee */
  fee: number
  /** Fee currency */
  feeCurrency: string
  /** Realized PnL */
  realizedPnL?: number
  /** Trade timestamp */
  timestamp: Date
  /** Whether user was maker or taker */
  isMaker: boolean
  /** Additional trade metadata */
  metadata?: Record<string, unknown>
}

/**
 * Trading strategy interface
 */
export interface TradingStrategy {
  /** Unique strategy identifier */
  id: string
  /** User ID */
  userId: string
  /** Strategy name */
  name: string
  /** Strategy description */
  description?: string
  /** Strategy type */
  type: 'MANUAL' | 'AUTOMATED' | 'COPY_TRADING'
  /** Strategy parameters */
  parameters: {
    /** Risk management settings */
    riskManagement: {
      /** Maximum risk per trade (percentage) */
      maxRiskPerTrade: number
      /** Maximum daily loss */
      maxDailyLoss: number
      /** Stop loss percentage */
      stopLossPercent: number
      /** Take profit percentage */
      takeProfitPercent: number
    }
    /** Position sizing settings */
    positionSizing: {
      /** Position sizing method */
      method: 'FIXED' | 'PERCENT_BALANCE' | 'KELLY' | 'RISK_BASED'
      /** Fixed size (if using fixed method) */
      fixedSize?: number
      /** Percentage of balance (if using percent method) */
      percentOfBalance?: number
    }
    /** Trading pairs to use */
    symbols: string[]
    /** Time frames */
    timeframes: string[]
  }
  /** Whether strategy is active */
  isActive: boolean
  /** Strategy performance */
  performance: {
    /** Total return percentage */
    totalReturn: number
    /** Annual return percentage */
    annualReturn: number
    /** Maximum drawdown */
    maxDrawdown: number
    /** Win rate */
    winRate: number
    /** Profit factor */
    profitFactor: number
    /** Sharpe ratio */
    sharpeRatio: number
    /** Total trades */
    totalTrades: number
  }
  /** Strategy creation timestamp */
  createdAt: Date
  /** Last update timestamp */
  updatedAt: Date
}

/**
 * Risk metrics interface
 */
export interface RiskMetrics {
  /** Portfolio ID */
  portfolioId: string
  /** Value at Risk (VaR) */
  valueAtRisk: {
    /** 1-day VaR */
    oneDay: number
    /** 1-week VaR */
    oneWeek: number
    /** 1-month VaR */
    oneMonth: number
  }
  /** Maximum drawdown */
  maxDrawdown: number
  /** Current drawdown */
  currentDrawdown: number
  /** Beta (market correlation) */
  beta: number
  /** Sharpe ratio */
  sharpeRatio: number
  /** Sortino ratio */
  sortinoRatio: number
  /** Risk exposure by asset class */
  exposureByAsset: Record<string, number>
  /** Concentration risk */
  concentrationRisk: number
  /** Leverage ratio */
  leverageRatio: number
  /** Last calculation timestamp */
  calculatedAt: Date
}

/**
 * Trading signal interface
 */
export interface TradingSignal {
  /** Unique signal identifier */
  id: string
  /** Signal provider ID */
  providerId: string
  /** Trading symbol */
  symbol: string
  /** Signal type */
  type: 'BUY' | 'SELL' | 'HOLD'
  /** Signal strength (1-10) */
  strength: number
  /** Signal price */
  price: number
  /** Target prices */
  targets: number[]
  /** Stop loss price */
  stopLoss: number
  /** Signal reasoning */
  reasoning: string
  /** Technical indicators used */
  indicators: string[]
  /** Signal confidence percentage */
  confidence: number
  /** Signal timestamp */
  timestamp: Date
  /** Signal expiration */
  expiresAt?: Date
  /** Signal performance tracking */
  performance?: {
    /** Current PnL if followed */
    currentPnL: number
    /** Maximum favorable excursion */
    maxFavorableExcursion: number
    /** Maximum adverse excursion */
    maxAdverseExcursion: number
  }
}

/**
 * Market analysis interface
 */
export interface MarketAnalysis {
  /** Analysis ID */
  id: string
  /** Symbol analyzed */
  symbol: string
  /** Analysis type */
  type: 'TECHNICAL' | 'FUNDAMENTAL' | 'SENTIMENT'
  /** Overall sentiment */
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
  /** Sentiment score (-100 to 100) */
  sentimentScore: number
  /** Technical analysis */
  technical?: {
    /** Trend direction */
    trend: 'UPTREND' | 'DOWNTREND' | 'SIDEWAYS'
    /** Support levels */
    support: number[]
    /** Resistance levels */
    resistance: number[]
    /** Key indicators */
    indicators: Record<string, {
      /** Indicator value */
      value: number
      /** Indicator signal */
      signal: 'BUY' | 'SELL' | 'NEUTRAL'
    }>
  }
  /** Fundamental analysis */
  fundamental?: {
    /** Overall score */
    score: number
    /** Key metrics */
    metrics: Record<string, number>
    /** Economic events impact */
    economicEvents: Array<{
      /** Event name */
      name: string
      /** Impact level */
      impact: 'HIGH' | 'MEDIUM' | 'LOW'
      /** Event date */
      date: Date
    }>
  }
  /** Analysis timestamp */
  timestamp: Date
  /** Analysis validity period */
  validUntil: Date
  /** Analyst/source information */
  source: {
    /** Source name */
    name: string
    /** Source credibility score */
    credibility: number
  }
}

/**
 * Portfolio summary interface for dashboard display
 */
export interface PortfolioSummary {
  totalValue: number
  totalPnL: number
  totalPnLPercent: number
  dayPnL: number
  dayPnLPercent: number
  positions: number
  availableBalance: number
  marginUsed: number
  marginAvailable: number
  equity: number
}

/**
 * Trade interface for market trades
 */
export interface Trade {
  id: string
  symbol: string
  price: number
  quantity: number
  side: 'BUY' | 'SELL'
  timestamp: Date
  isBuyerMaker: boolean
} 