/**
 * Alert Component
 * 
 * Alert component with different types and trading-specific features
 * designed for the 4X trading platform with dismissible functionality and animations.
 */

import React, { forwardRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The alert type/variant
   */
  type?: 'info' | 'success' | 'warning' | 'error'
  
  /**
   * Alert title
   */
  title?: string
  
  /**
   * Alert description/content
   */
  children: React.ReactNode
  
  /**
   * Whether the alert can be dismissed
   */
  dismissible?: boolean
  
  /**
   * Callback when alert is dismissed
   */
  onDismiss?: () => void
  
  /**
   * Custom icon to override default
   */
  icon?: React.ReactNode
  
  /**
   * Whether to hide the icon
   */
  hideIcon?: boolean
  
  /**
   * Auto dismiss after timeout (in ms)
   */
  autoHideDuration?: number
  
  /**
   * Whether to show border
   */
  bordered?: boolean
  
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Drag event handlers
   */
  onDrag?: (event: React.DragEvent<HTMLDivElement>) => void
  onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void
  
  /**
   * Animation event handlers
   */
  onAnimationStart?: (event: React.AnimationEvent<HTMLDivElement>) => void
  onAnimationEnd?: (event: React.AnimationEvent<HTMLDivElement>) => void
  onAnimationIteration?: (event: React.AnimationEvent<HTMLDivElement>) => void
}

export interface TradingAlertProps {
  /**
   * Type of trading alert
   */
  type: 'price-alert' | 'order-filled' | 'order-cancelled' | 'margin-call' | 'profit-target' | 'stop-loss'
  
  /**
   * Trading symbol
   */
  symbol?: string
  
  /**
   * Price value for price-related alerts
   */
  price?: number
  
  /**
   * Alert message
   */
  message: string
  
  /**
   * Whether the alert can be dismissed
   */
  dismissible?: boolean
  
  /**
   * Callback when alert is dismissed
   */
  onDismiss?: () => void
  
  /**
   * Auto dismiss timeout
   */
  autoHideDuration?: number
  
  /**
   * Additional CSS classes
   */
  className?: string
}

const alertVariants = {
  info: {
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    icon: 'text-blue-400',
    button: 'text-blue-600 hover:bg-blue-100',
  },
  success: {
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    icon: 'text-green-400',
    button: 'text-green-600 hover:bg-green-100',
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    text: 'text-yellow-800',
    icon: 'text-yellow-400',
    button: 'text-yellow-600 hover:bg-yellow-100',
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    icon: 'text-red-400',
    button: 'text-red-600 hover:bg-red-100',
  },
}

const alertSizes = {
  sm: 'p-3 text-sm',
  md: 'p-4 text-sm',
  lg: 'p-5 text-base',
}

// Default icons for each alert type
const defaultIcons = {
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
}

// Close icon
const CloseIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
)

/**
 * Alert component for the 4X trading platform
 * 
 * @example
 * ```tsx
 * <Alert type="success" title="Order Executed" dismissible>
 *   Your buy order for BTC/USD has been successfully executed.
 * </Alert>
 * ```
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      type = 'info',
      title,
      children,
      dismissible = false,
      onDismiss,
      icon,
      hideIcon = false,
      autoHideDuration,
      bordered = true,
      size = 'md',
      onDrag,
      onDragEnd,
      onDragStart,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true)
    const variant = alertVariants[type]
    
    // Auto hide functionality
    useEffect(() => {
      if (autoHideDuration && autoHideDuration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          onDismiss?.()
        }, autoHideDuration)
        
        return () => clearTimeout(timer)
      }
    }, [autoHideDuration, onDismiss])
    
    const handleDismiss = () => {
      setIsVisible(false)
      onDismiss?.()
    }
    
    // Filter out drag-related props that conflict with framer-motion
    const filteredProps = {
      ...props,
    }
    
    if (!isVisible && dismissible) return null
    
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            className={cn(
              // Base styles
              'rounded-lg border',
              bordered ? 'border' : 'border-transparent',
              
              // Variant styles
              variant.bg,
              
              // Size styles
              alertSizes[size],
              
              className
            )}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="alert"
            {...filteredProps}
          >
            <div className="flex items-start">
              {/* Icon */}
              {!hideIcon && (
                <div className={cn('shrink-0 mr-3', variant.icon)}>
                  {icon || defaultIcons[type]}
                </div>
              )}
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                {title && (
                  <h3 className={cn('font-medium mb-1', variant.text)}>
                    {title}
                  </h3>
                )}
                <div className={cn('text-sm', variant.text)}>
                  {children}
                </div>
              </div>
              
              {/* Dismiss button */}
              {dismissible && (
                <motion.button
                  onClick={handleDismiss}
                  className={cn(
                    'ml-3 shrink-0 p-1 rounded-lg transition-colors',
                    variant.button
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Dismiss alert"
                >
                  <CloseIcon />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

/**
 * Trading Alert - specialized alerts for trading operations
 * 
 * @example
 * ```tsx
 * <TradingAlert
 *   type="order-filled"
 *   symbol="BTC/USD"
 *   price={45000}
 *   message="Your buy order has been filled at $45,000"
 *   dismissible
 * />
 * ```
 */
export const TradingAlert: React.FC<TradingAlertProps> = ({
  type,
  symbol,
  price,
  message,
  dismissible = true,
  onDismiss,
  autoHideDuration = 5000,
  className,
}) => {
  const tradingAlertConfig = {
    'price-alert': {
      alertType: 'info' as const,
      title: 'Price Alert',
      icon: '📈',
    },
    'order-filled': {
      alertType: 'success' as const,
      title: 'Order Filled',
      icon: '✅',
    },
    'order-cancelled': {
      alertType: 'warning' as const,
      title: 'Order Cancelled',
      icon: '❌',
    },
    'margin-call': {
      alertType: 'error' as const,
      title: 'Margin Call',
      icon: '⚠️',
    },
    'profit-target': {
      alertType: 'success' as const,
      title: 'Profit Target Hit',
      icon: '🎯',
    },
    'stop-loss': {
      alertType: 'error' as const,
      title: 'Stop Loss Triggered',
      icon: '🛑',
    },
  }
  
  const config = tradingAlertConfig[type]
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 5,
    }).format(price)
  }
  
  return (
    <Alert
      type={config.alertType}
      title={config.title}
      dismissible={dismissible}
      onDismiss={onDismiss}
      autoHideDuration={autoHideDuration}
      className={className}
      icon={<span className="text-lg">{config.icon}</span>}
    >
      <div className="space-y-1">
        {symbol && (
          <div className="font-medium text-sm">
            {symbol} {price && `• ${formatPrice(price)}`}
          </div>
        )}
        <div>{message}</div>
      </div>
    </Alert>
  )
}

// Specialized alert types for common trading scenarios
export interface PriceAlertProps {
  symbol: string
  targetPrice: number
  currentPrice: number
  direction: 'above' | 'below'
  onDismiss?: () => void
}

export const PriceAlert: React.FC<PriceAlertProps> = ({
  symbol,
  targetPrice,
  currentPrice,
  direction,
  onDismiss,
}) => (
  <TradingAlert
    type="price-alert"
    symbol={symbol}
    price={currentPrice}
    message={`${symbol} has moved ${direction} your target price of ${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(targetPrice)}`}
    onDismiss={onDismiss}
  />
)

export interface OrderAlertProps {
  type: 'filled' | 'cancelled' | 'partial'
  orderType: 'buy' | 'sell'
  symbol: string
  quantity: number
  price: number
  onDismiss?: () => void
}

export const OrderAlert: React.FC<OrderAlertProps> = ({
  type,
  orderType,
  symbol,
  quantity,
  price,
  onDismiss,
}) => {
  const alertType = type === 'filled' ? 'order-filled' : 'order-cancelled'
  const action = orderType === 'buy' ? 'Buy' : 'Sell'
  const status = type === 'filled' ? 'filled' : type === 'partial' ? 'partially filled' : 'cancelled'
  
  return (
    <TradingAlert
      type={alertType}
      symbol={symbol}
      price={price}
      message={`${action} order for ${quantity} ${symbol} has been ${status}`}
      onDismiss={onDismiss}
    />
  )
}

Alert.displayName = 'Alert'

export default Alert 