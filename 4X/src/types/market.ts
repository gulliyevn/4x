/**
 * Market Data and Trading Types
 * 
 * This module contains all type definitions related to market data,
 * price information, charts, and trading instruments for the 4X platform.
 */

/**
 * Chart interval enumeration for different time periods
 */
export enum ChartInterval {
  /** 1 minute intervals */
  ONE_MINUTE = '1m',
  /** 3 minute intervals */
  THREE_MINUTES = '3m',
  /** 5 minute intervals */
  FIVE_MINUTES = '5m',
  /** 15 minute intervals */
  FIFTEEN_MINUTES = '15m',
  /** 30 minute intervals */
  THIRTY_MINUTES = '30m',
  /** 1 hour intervals */
  ONE_HOUR = '1h',
  /** 2 hour intervals */
  TWO_HOURS = '2h',
  /** 4 hour intervals */
  FOUR_HOURS = '4h',
  /** 6 hour intervals */
  SIX_HOURS = '6h',
  /** 8 hour intervals */
  EIGHT_HOURS = '8h',
  /** 12 hour intervals */
  TWELVE_HOURS = '12h',
  /** 1 day intervals */
  ONE_DAY = '1d',
  /** 3 day intervals */
  THREE_DAYS = '3d',
  /** 1 week intervals */
  ONE_WEEK = '1w',
  /** 1 month intervals */
  ONE_MONTH = '1M',
}

/**
 * Market status enumeration
 */
export enum MarketStatus {
  /** Market is open for trading */
  OPEN = 'OPEN',
  /** Market is closed */
  CLOSED = 'CLOSED',
  /** Market is in pre-market session */
  PRE_MARKET = 'PRE_MARKET',
  /** Market is in after-hours session */
  AFTER_HOURS = 'AFTER_HOURS',
  /** Market is halted */
  HALTED = 'HALTED',
}

/**
 * Symbol status enumeration
 */
export enum SymbolStatus {
  /** Symbol is actively trading */
  TRADING = 'TRADING',
  /** Symbol is halted */
  HALT = 'HALT',
  /** Symbol is about to be listed */
  PRE_TRADING = 'PRE_TRADING',
  /** Symbol is no longer trading */
  POST_TRADING = 'POST_TRADING',
  /** Symbol is temporarily unavailable */
  BREAK = 'BREAK',
}

/**
 * Order book side enumeration
 */
export enum OrderBookSide {
  /** Buy orders (bids) */
  BUY = 'buy',
  /** Sell orders (asks) */
  SELL = 'sell',
}

/**
 * Market data interface for real-time and historical data
 */
export interface MarketData {
  /** Trading symbol (e.g., BTCUSDT, EURUSD) */
  symbol: string
  /** Current market price */
  price: number
  /** Previous day's closing price */
  prevPrice: number
  /** 24-hour price change amount */
  change24h: number
  /** 24-hour price change percentage */
  changePercent24h: number
  /** 24-hour high price */
  high24h: number
  /** 24-hour low price */
  low24h: number
  /** 24-hour trading volume */
  volume24h: number
  /** 24-hour volume in quote currency */
  quoteVolume24h: number
  /** Best bid price */
  bidPrice: number
  /** Best ask price */
  askPrice: number
  /** Bid-ask spread */
  spread: number
  /** Timestamp of last update */
  timestamp: Date
  /** Number of trades in 24h */
  tradeCount24h: number
  /** Market capitalization (for crypto) */
  marketCap?: number
  /** Circulating supply (for crypto) */
  circulatingSupply?: number
  /** Total supply (for crypto) */
  totalSupply?: number
  /** Whether market is open */
  isMarketOpen: boolean
}

/**
 * Price point interface for candlestick/OHLCV data
 */
export interface PricePoint {
  /** Timestamp of the price point */
  time: number
  /** Opening price */
  open: number
  /** Highest price during period */
  high: number
  /** Lowest price during period */
  low: number
  /** Closing price */
  close: number
  /** Trading volume during period */
  volume: number
  /** Volume in quote currency */
  quoteVolume?: number
  /** Number of trades during period */
  tradeCount?: number
  /** Taker buy base asset volume */
  takerBuyVolume?: number
  /** Taker buy quote asset volume */
  takerBuyQuoteVolume?: number
}

/**
 * Trading symbol interface with detailed information
 */
export interface Symbol {
  /** Symbol identifier (e.g., BTCUSDT) */
  symbol: string
  /** Base asset (e.g., BTC) */
  baseAsset: string
  /** Quote asset (e.g., USDT) */
  quoteAsset: string
  /** Human-readable symbol name */
  name: string
  /** Symbol status */
  status: SymbolStatus
  /** Base asset precision */
  baseAssetPrecision: number
  /** Quote asset precision */
  quoteAssetPrecision: number
  /** Price precision */
  pricePrecision: number
  /** Quantity precision */
  quantityPrecision: number
  /** Minimum order quantity */
  minOrderQty: number
  /** Maximum order quantity */
  maxOrderQty: number
  /** Step size for quantity */
  stepSize: number
  /** Minimum order value */
  minNotional: number
  /** Maximum order value */
  maxNotional: number
  /** Tick size for price */
  tickSize: number
  /** Whether symbol supports margin trading */
  marginTradingAllowed: boolean
  /** Whether symbol supports spot trading */
  spotTradingAllowed: boolean
  /** Category of the symbol */
  category: 'Crypto' | 'Stocks' | 'Forex' | 'Commodities'
  /** Symbol icon URL */
  iconUrl?: string
  /** Whether the symbol is active */
  isActive: boolean
}

/**
 * Real-time ticker interface
 */
export interface Ticker {
  /** Symbol identifier */
  symbol: string
  /** Current price */
  price: number
  /** Price change in 24h */
  priceChange: number
  /** Price change percentage in 24h */
  priceChangePercent: number
  /** Weighted average price */
  weightedAvgPrice: number
  /** Previous day's close price */
  prevClosePrice: number
  /** Last traded quantity */
  lastQty: number
  /** Best bid price */
  bidPrice: number
  /** Best bid quantity */
  bidQty: number
  /** Best ask price */
  askPrice: number
  /** Best ask quantity */
  askQty: number
  /** Opening price */
  openPrice: number
  /** Highest price in 24h */
  highPrice: number
  /** Lowest price in 24h */
  lowPrice: number
  /** Total traded volume */
  volume: number
  /** Total traded volume in quote asset */
  quoteVolume: number
  /** Statistics open time */
  openTime: number
  /** Statistics close time */
  closeTime: number
  /** First trade ID */
  firstId: number
  /** Last trade ID */
  lastId: number
  /** Total count of trades */
  count: number
}

/**
 * Order book entry interface
 */
export interface OrderBookEntry {
  /** Price level */
  price: number
  /** Quantity at this price level */
  quantity: number
  /** Total quantity up to this level */
  total?: number
}

/**
 * Order book interface containing bids and asks
 */
export interface OrderBook {
  /** Symbol identifier */
  symbol: string
  /** Timestamp of last update */
  timestamp: Date
  /** Buy orders (bids) */
  bids: [number, number][] // [price, quantity][]
  /** Sell orders (asks) */
  asks: [number, number][] // [price, quantity][]
  /** Last update ID from exchange */
  lastUpdateId: number
}

/**
 * Market statistics interface
 */
export interface MarketStats {
  /** Total market capitalization */
  totalMarketCap: number
  /** Total 24h volume */
  total24hVolume: number
  /** Market cap change in 24h */
  marketCapChange24h: number
  /** Volume change in 24h */
  volumeChange24h: number
  /** Number of active currencies */
  activeCurrencies: number
  /** Number of active exchanges */
  activeExchanges: number
  /** BTC dominance percentage */
  btcDominance?: number
  /** ETH dominance percentage */
  ethDominance?: number
  /** Fear and greed index */
  fearGreedIndex?: number
  /** Timestamp of last update */
  lastUpdated: Date
}

/**
 * Trading session interface
 */
export interface TradingSession {
  /** Session name */
  name: string
  /** Session start time (UTC) */
  startTime: string
  /** Session end time (UTC) */
  endTime: string
  /** Session timezone */
  timezone: string
  /** Whether session is currently active */
  isActive: boolean
  /** Days of week session is active */
  activeDays: number[]
}

/**
 * Market hours interface
 */
export interface MarketHours {
  /** Symbol or market identifier */
  symbol: string
  /** Current market status */
  status: MarketStatus
  /** Trading sessions */
  sessions: TradingSession[]
  /** Next market open time */
  nextOpen?: Date
  /** Next market close time */
  nextClose?: Date
  /** Current session name */
  currentSession?: string
}

/**
 * Trade interface for individual trades
 */
export interface Trade {
  /** Trade ID */
  id: string
  /** Symbol */
  symbol: string
  /** Trade price */
  price: number
  /** Trade quantity */
  quantity: number
  /** Trade timestamp */
  timestamp: Date
  /** Whether buyer was maker */
  isBuyerMaker: boolean
  /** Side of the trade */
  side: OrderBookSide
}

/**
 * Aggregated trade interface
 */
export interface AggregatedTrade {
  /** Aggregate trade ID */
  id: number
  /** Symbol */
  symbol: string
  /** Trade price */
  price: number
  /** Trade quantity */
  quantity: number
  /** First trade ID */
  firstTradeId: number
  /** Last trade ID */
  lastTradeId: number
  /** Trade timestamp */
  timestamp: Date
  /** Whether buyer was maker */
  isBuyerMaker: boolean
}

/**
 * Exchange information interface
 */
export interface ExchangeInfo {
  /** Exchange timezone */
  timezone: string
  /** Server time */
  serverTime: Date
  /** Rate limits */
  rateLimits: Array<{
    /** Rate limit type */
    rateLimitType: string
    /** Rate limit interval */
    interval: string
    /** Interval number */
    intervalNum: number
    /** Request limit */
    limit: number
  }>
  /** Exchange filters */
  exchangeFilters: unknown[]
  /** Available symbols */
  symbols: Symbol[]
}

/**
 * Market depth interface (Level 2 order book)
 */
export interface MarketDepth {
  /** Symbol */
  symbol: string
  /** Timestamp */
  timestamp: Date
  /** Bids with price levels */
  bids: Array<[number, number]> // [price, quantity]
  /** Asks with price levels */
  asks: Array<[number, number]> // [price, quantity]
  /** Last update ID */
  lastUpdateId: number
}

/**
 * Price statistics interface
 */
export interface PriceStats {
  /** Symbol */
  symbol: string
  /** Price change */
  priceChange: string
  /** Price change percentage */
  priceChangePercent: string
  /** Weighted average price */
  weightedAvgPrice: string
  /** Previous close price */
  prevClosePrice: string
  /** Last price */
  lastPrice: string
  /** Last quantity */
  lastQty: string
  /** Best bid price */
  bidPrice: string
  /** Best ask price */
  askPrice: string
  /** Open price */
  openPrice: string
  /** High price */
  highPrice: string
  /** Low price */
  lowPrice: string
  /** Volume */
  volume: string
  /** Quote volume */
  quoteVolume: string
  /** Open time */
  openTime: number
  /** Close time */
  closeTime: number
  /** First ID */
  firstId: number
  /** Last ID */
  lastId: number
  /** Count */
  count: number
} 