# 4X Trading Platform UI Components

A comprehensive collection of reusable UI components built specifically for the 4X Trading Platform. These components are designed with TypeScript, Tailwind CSS, and Framer Motion for animations.

## Overview

This library provides 10 core UI components with trading-specific variants and features:

- ✅ **Button** - Interactive buttons with variants and loading states
- ✅ **Input** - Form inputs with currency/percentage support
- ✅ **Card** - Container components with header/body/footer
- ✅ **Loading** - Spinners and skeleton loading states
- ✅ **Modal** - Dialog modals with confirmation variants
- ✅ **Badge** - Status indicators with trading-specific types
- ✅ **Alert** - Notification alerts with trading event types
- ✅ **Tooltip** - Hover tooltips with trading data formatting
- ✅ **Table** - Data tables with sorting, pagination, and trading data
- ✅ **Index** - Central export file for easy importing

## Installation & Usage

```tsx
// Import individual components
import { Button, TradingAlert, TradingTable } from '@/components/ui'

// Or import component groups
import { CoreComponents, TradingComponents } from '@/components/ui'

// Or import everything
import * as UI from '@/components/ui'
```

## Component Examples

### Button
```tsx
<Button variant="primary" size="lg" loading={isSubmitting}>
  Execute Trade
</Button>

<Button variant="outline" icon={<ChartIcon />}>
  View Chart
</Button>
```

### Input
```tsx
<Input
  type="currency"
  label="Trade Amount"
  currency="$"
  decimals={2}
  error={errors.amount?.message}
  fullWidth
/>

<Input
  type="percentage"
  label="Stop Loss"
  suffix="%"
  helperText="Set your stop loss percentage"
/>
```

### Card
```tsx
<Card variant="elevated" loading={isLoading}>
  <CardHeader>
    <h3>Portfolio Overview</h3>
  </CardHeader>
  <CardBody>
    <div>Balance: $12,345.67</div>
    <div>P&L: +$234.56 (1.2%)</div>
  </CardBody>
  <CardFooter>
    <Button variant="primary">View Details</Button>
  </CardFooter>
</Card>
```

### Modal
```tsx
<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <ModalHeader>
    <h2>Confirm Trade</h2>
  </ModalHeader>
  <ModalBody>
    <p>Are you sure you want to execute this trade?</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setShowModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleTrade}>
      Confirm
    </Button>
  </ModalFooter>
</Modal>
```

### Badge
```tsx
<PriceChangeBadge change={2.5} />
<StatusBadge status="active" />
<VolumeBadge volume={1234567} />
<RiskBadge level="high" />
```

### Alert
```tsx
<TradingAlert
  type="order-filled"
  symbol="BTC/USD"
  price={45000}
  message="Your buy order has been filled at $45,000"
  dismissible
/>

<PriceAlert
  symbol="ETH/USD"
  targetPrice={3000}
  currentPrice={3050}
  direction="above"
/>
```

### Tooltip
```tsx
<TradingTooltip
  type="price"
  symbol="BTC/USD"
  data={{ price: 45000, change: 2.5, volume: 1234567 }}
>
  <span>BTC/USD</span>
</TradingTooltip>
```

### Table
```tsx
<TradingTable
  data={marketData}
  loading={isLoading}
  onSymbolClick={handleSymbolClick}
  showActions
  actions={[
    { label: 'Buy', onClick: handleBuy, variant: 'success' },
    { label: 'Sell', onClick: handleSell, variant: 'danger' }
  ]}
/>
```

### Loading
```tsx
<Loading type="spinner" size="lg" />
<Loading type="dots" text="Loading market data..." />
<Skeleton type="trading-card" />
<Skeleton type="table" rows={5} />
```

## Design System

### Colors
- **Primary**: `#98b5a4` (Brand green)
- **Secondary**: `#162A2C` (Dark teal)
- **Success**: Green variants
- **Warning**: Yellow/Orange variants
- **Error**: Red variants

### Typography
- **Small**: `text-xs`
- **Medium**: `text-sm`
- **Large**: `text-base`

### Spacing
- **Small**: `px-2 py-1`
- **Medium**: `px-3 py-2`
- **Large**: `px-4 py-3`

## Features

### Accessibility
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Color contrast compliance

### Animations
- Framer Motion for smooth transitions
- Hover and focus states
- Loading and state changes
- Enter/exit animations

### Responsive Design
- Mobile-first approach
- Breakpoint-specific styling
- Touch-friendly interfaces
- Adaptive layouts

### Trading-Specific Features
- Currency formatting with locale support
- Percentage calculations
- Price change indicators
- Volume formatting (K, M, B)
- Real-time data display
- Trading status indicators

## Customization

All components accept custom CSS classes via the `className` prop and can be styled using Tailwind CSS utilities:

```tsx
<Button 
  className="shadow-lg hover:shadow-xl transform hover:scale-105" 
  variant="primary"
>
  Custom Styled Button
</Button>
```

## TypeScript Support

All components are fully typed with comprehensive interfaces:

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  // ... more props
}
```

## Contributing

When adding new components or features:

1. Follow the existing patterns and conventions
2. Include comprehensive TypeScript types
3. Add JSDoc documentation
4. Implement accessibility features
5. Include animation support
6. Test responsive behavior
7. Update this README with examples

---

Built with ❤️ for the 4X Trading Platform 