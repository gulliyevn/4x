# 4X Trading Platform - Type Definitions

This directory contains comprehensive TypeScript type definitions for the 4X trading platform. The type system is designed to provide strong type safety and excellent developer experience across all aspects of the trading platform.

## Overview

The type definitions are organized into logical modules:

- **`auth.ts`** - Authentication and user management types
- **`market.ts`** - Market data and trading instrument types  
- **`news.ts`** - News and media content types
- **`api.ts`** - API responses and communication types
- **`trading.ts`** - Trading operations and portfolio management types
- **`index.ts`** - Main export file with utility types

## Module Details

### Authentication Types (`auth.ts`)

Contains all user authentication and profile related types:

- **Enums**: `UserRole`, `AccountStatus`, `TwoFactorMethod`
- **Interfaces**: `User`, `AuthState`, `LoginCredentials`, `RegisterData`, `JWTPayload`
- **Features**: Complete user profile management, 2FA support, session handling

### Market Data Types (`market.ts`)

Comprehensive market data and trading instrument definitions:

- **Enums**: `ChartInterval`, `MarketStatus`, `SymbolStatus`, `OrderBookSide`
- **Interfaces**: `MarketData`, `PricePoint`, `Symbol`, `Ticker`, `OrderBook`, `Trade`
- **Features**: Real-time price data, historical charts, order books, market statistics

### News Types (`news.ts`)

News and media content management:

- **Enums**: `NewsCategory`, `NewsSentiment`, `NewsPriority`, `NewsType`
- **Interfaces**: `NewsArticle`, `NewsSource`, `NewsFilter`, `NewsState`
- **Features**: Article management, sentiment analysis, subscriptions, analytics

### API Types (`api.ts`)

Standardized API communication and error handling:

- **Enums**: `RequestStatus`, `HttpMethod`, `WebSocketState`, `ApiErrorCode`
- **Interfaces**: `ApiResponse<T>`, `ApiError`, `PaginatedResponse<T>`, `WebSocketMessage<T>`
- **Features**: Generic response types, error codes, WebSocket support, pagination

### Trading Types (`trading.ts`)

Complete trading operations and portfolio management:

- **Enums**: `OrderType`, `OrderSide`, `OrderStatus`, `PositionStatus`, `AssetType`
- **Interfaces**: `Order`, `Position`, `Portfolio`, `TradingPair`, `Watchlist`, `PriceAlert`
- **Features**: Order management, position tracking, portfolio analytics, risk metrics

## Usage Examples

### Basic Imports

```typescript
// Import specific types
import { User, AuthState } from '@/types/auth'
import { MarketData, OrderBook } from '@/types/market'
import { Order, Portfolio } from '@/types/trading'

// Import everything from index
import { User, MarketData, Order, ApiResponse } from '@/types'
```

### Type-Safe API Responses

```typescript
import { ApiResponse, MarketData } from '@/types'

// Type-safe API response
const response: ApiResponse<MarketData[]> = await fetchMarketData()

if (response.success) {
  // TypeScript knows response.data is MarketData[]
  response.data?.forEach(market => {
    console.log(market.symbol, market.price)
  })
}
```

### State Management

```typescript
import { AuthState, Portfolio } from '@/types'

interface AppState {
  auth: AuthState
  portfolio: Portfolio | null
  isLoading: boolean
}
```

### Component Props

```typescript
import { NewsArticle, User } from '@/types'

interface NewsCardProps {
  article: NewsArticle
  user: User
  onRead: (articleId: string) => void
}
```

## Type Safety Features

### Generic Types
- `ApiResponse<T>` for type-safe API responses
- `PaginatedResponse<T>` for paginated data
- `WebSocketMessage<T>` for real-time updates

### Utility Types
- `ID`, `Timestamp`, `Currency` for common value types
- `Option<T>` for dropdown/select components
- `FormState<T>` for form management

### Error Handling
- Comprehensive `ApiErrorCode` enum with categorized error codes
- Detailed `ApiError` interface with validation support
- `ValidationError` for field-specific errors

## Best Practices

### 1. Always Use Type Imports
```typescript
// Preferred
import type { User } from '@/types/auth'

// For values and types
import { UserRole, type User } from '@/types/auth'
```

### 2. Extend Base Types
```typescript
import { BaseEntity } from '@/types'

interface CustomEntity extends BaseEntity {
  customField: string
}
```

### 3. Use Discriminated Unions
```typescript
// Order types automatically narrow based on type field
const order: Order = { type: OrderType.LIMIT, price: 100, ... }
if (order.type === OrderType.LIMIT) {
  // TypeScript knows order.price exists
  console.log(order.price)
}
```

### 4. Leverage Generic Constraints
```typescript
function processApiResponse<T>(response: ApiResponse<T>): T | null {
  return response.success ? response.data : null
}
```

## Global State Interface

The `GlobalState` interface provides a comprehensive type for application-wide state management:

```typescript
import { GlobalState } from '@/types'

const initialState: GlobalState = {
  auth: { /* AuthState */ },
  news: { /* NewsState */ },
  trading: { /* Trading data */ },
  market: { /* Market data */ },
  ui: { /* UI state */ }
}
```

## Contributing

When adding new types:

1. Place them in the appropriate module based on functionality
2. Add comprehensive JSDoc comments
3. Include the new types in the module's export list
4. Update the main `index.ts` file to export new types
5. Add examples to this README if introducing new patterns

## Type Checking

All types are validated during the build process:

```bash
# Type check only
npm run type-check

# Full build with type checking
npm run build
```

The platform uses strict TypeScript configuration for maximum type safety. 