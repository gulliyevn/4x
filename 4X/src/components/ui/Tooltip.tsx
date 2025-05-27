/**
 * Tooltip Component
 * 
 * Tooltip component with hover/click triggers and positioning
 * designed for the 4X trading platform with trading data tooltips and animations.
 */

import React, { useState, useRef, useEffect, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

export interface TooltipProps {
  /**
   * Tooltip content
   */
  content: React.ReactNode
  
  /**
   * Children that trigger the tooltip
   */
  children: React.ReactNode
  
  /**
   * Position of the tooltip relative to trigger
   */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
  
  /**
   * Trigger type
   */
  trigger?: 'hover' | 'click' | 'focus'
  
  /**
   * Delay before showing (in ms)
   */
  showDelay?: number
  
  /**
   * Delay before hiding (in ms)
   */
  hideDelay?: number
  
  /**
   * Whether tooltip is disabled
   */
  disabled?: boolean
  
  /**
   * Maximum width of tooltip
   */
  maxWidth?: string
  
  /**
   * Custom z-index
   */
  zIndex?: number
  
  /**
   * Additional CSS classes for tooltip content
   */
  className?: string
  
  /**
   * Whether to show arrow
   */
  arrow?: boolean
  
  /**
   * Custom offset from trigger element
   */
  offset?: number
}

export interface TradingTooltipProps {
  /**
   * Type of trading data tooltip
   */
  type: 'price' | 'volume' | 'change' | 'indicator' | 'order' | 'position'
  
  /**
   * Trading symbol
   */
  symbol?: string
  
  /**
   * Data to display in tooltip
   */
  data: Record<string, any>
  
  /**
   * Children that trigger the tooltip
   */
  children: React.ReactNode
  
  /**
   * Position of tooltip
   */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
  
  /**
   * Additional CSS classes
   */
  className?: string
}

const positionClasses = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  auto: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2', // Default to top
}

const arrowClasses = {
  top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
  bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
  left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
  right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900',
  auto: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
}

const animations = {
  top: {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.95 },
  },
  bottom: {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  },
  left: {
    initial: { opacity: 0, x: 10, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 10, scale: 0.95 },
  },
  right: {
    initial: { opacity: 0, x: -10, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -10, scale: 0.95 },
  },
  auto: {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.95 },
  },
}

// Hook for calculating optimal position
const useTooltipPosition = (
  triggerRef: React.RefObject<HTMLDivElement | null>,
  tooltipRef: React.RefObject<HTMLDivElement | null>,
  position: TooltipProps['position'] = 'auto'
) => {
  const [calculatedPosition, setCalculatedPosition] = useState(position)
  
  useEffect(() => {
    if (position !== 'auto' || !triggerRef.current || !tooltipRef.current) {
      setCalculatedPosition(position || 'top')
      return
    }
    
    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    
    // Calculate best position based on available space
    const spaceAbove = triggerRect.top
    const spaceBelow = viewport.height - triggerRect.bottom
    const spaceLeft = triggerRect.left
    const spaceRight = viewport.width - triggerRect.right
    
    if (spaceAbove >= tooltipRect.height && spaceAbove >= spaceBelow) {
      setCalculatedPosition('top')
    } else if (spaceBelow >= tooltipRect.height) {
      setCalculatedPosition('bottom')
    } else if (spaceLeft >= tooltipRect.width) {
      setCalculatedPosition('left')
    } else if (spaceRight >= tooltipRect.width) {
      setCalculatedPosition('right')
    } else {
      setCalculatedPosition('top') // Fallback
    }
  }, [position, triggerRef, tooltipRef])
  
  return calculatedPosition
}

/**
 * Tooltip component for the 4X trading platform
 * 
 * @example
 * ```tsx
 * <Tooltip content="This is a helpful tooltip" position="top">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'auto',
  trigger = 'hover',
  showDelay = 500,
  hideDelay = 0,
  disabled = false,
  maxWidth = '200px',
  zIndex = 50,
  className,
  arrow = true,
  offset = 8,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showTimeoutId, setShowTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [hideTimeoutId, setHideTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  
  const calculatedPosition = useTooltipPosition(triggerRef, tooltipRef, position)

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const showTooltip = () => {
    if (disabled) return
    
    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId)
      setHideTimeoutId(null)
    }
    
    const timeoutId = setTimeout(() => setIsVisible(true), showDelay)
    setShowTimeoutId(timeoutId)
  }

  const hideTooltip = () => {
    if (showTimeoutId) {
      clearTimeout(showTimeoutId)
      setShowTimeoutId(null)
    }
    
    const timeoutId = setTimeout(() => setIsVisible(false), hideDelay)
    setHideTimeoutId(timeoutId)
  }

  const handleTriggerClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip()
      } else {
        showTooltip()
      }
    }
  }

  const handleTriggerMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip()
    }
  }

  const handleTriggerMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip()
    }
  }

  const handleTriggerFocus = () => {
    if (trigger === 'focus') {
      showTooltip()
    }
  }

  const handleTriggerBlur = () => {
    if (trigger === 'focus') {
      hideTooltip()
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        hideTooltip()
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isVisible])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutId) clearTimeout(showTimeoutId)
      if (hideTimeoutId) clearTimeout(hideTimeoutId)
    }
  }, [showTimeoutId, hideTimeoutId])

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-block"
        onClick={handleTriggerClick}
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
        onFocus={handleTriggerFocus}
        onBlur={handleTriggerBlur}
      >
        {children}
      </div>
      
      {isMounted && createPortal(
        <AnimatePresence>
          {isVisible && (
            <div
              className={cn('fixed pointer-events-none', `z-${zIndex}`)}
              style={{
                left: triggerRef.current?.getBoundingClientRect().left ?? 0,
                top: triggerRef.current?.getBoundingClientRect().top ?? 0,
                width: triggerRef.current?.getBoundingClientRect().width ?? 0,
                height: triggerRef.current?.getBoundingClientRect().height ?? 0,
              }}
            >
              <div className={cn('relative', positionClasses[calculatedPosition])}>
                <motion.div
                  ref={tooltipRef}
                  className={cn(
                    'bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-lg',
                    'pointer-events-auto',
                    className
                  )}
                  style={{ maxWidth }}
                  {...animations[calculatedPosition]}
                  transition={{ duration: 0.15 }}
                >
                  {content}
                  
                  {/* Arrow */}
                  {arrow && (
                    <div
                      className={cn(
                        'absolute w-0 h-0 border-4',
                        arrowClasses[calculatedPosition]
                      )}
                    />
                  )}
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

/**
 * Trading Tooltip - specialized tooltips for trading data
 * 
 * @example
 * ```tsx
 * <TradingTooltip
 *   type="price"
 *   symbol="BTC/USD"
 *   data={{ price: 45000, change: 2.5, volume: 1234567 }}
 * >
 *   <span>BTC/USD</span>
 * </TradingTooltip>
 * ```
 */
export const TradingTooltip: React.FC<TradingTooltipProps> = ({
  type,
  symbol,
  data,
  children,
  position = 'top',
  className,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 5,
    }).format(price)
  }
  
  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`
    return volume.toString()
  }
  
  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(2)}%`
  }
  
  const renderTooltipContent = () => {
    switch (type) {
      case 'price':
        return (
          <div className="space-y-1">
            {symbol && <div className="font-semibold text-xs text-gray-300">{symbol}</div>}
            <div className="space-y-1">
              {data.price && <div>Price: {formatPrice(data.price)}</div>}
              {data.change !== undefined && (
                <div className={cn(
                  data.change >= 0 ? 'text-green-400' : 'text-red-400'
                )}>
                  24h Change: {formatPercentage(data.change)}
                </div>
              )}
              {data.volume && <div>Volume: {formatVolume(data.volume)}</div>}
            </div>
          </div>
        )
      
      case 'volume':
        return (
          <div className="space-y-1">
            <div className="font-semibold text-xs text-gray-300">Volume Data</div>
            <div className="space-y-1">
              {data.volume24h && <div>24h Volume: {formatVolume(data.volume24h)}</div>}
              {data.avgVolume && <div>Avg Volume: {formatVolume(data.avgVolume)}</div>}
              {data.volumeChange !== undefined && (
                <div className={cn(
                  data.volumeChange >= 0 ? 'text-green-400' : 'text-red-400'
                )}>
                  Volume Change: {formatPercentage(data.volumeChange)}
                </div>
              )}
            </div>
          </div>
        )
      
      case 'order':
        return (
          <div className="space-y-1">
            <div className="font-semibold text-xs text-gray-300">Order Details</div>
            <div className="space-y-1">
              {data.orderType && <div>Type: {data.orderType}</div>}
              {data.quantity && <div>Quantity: {data.quantity}</div>}
              {data.price && <div>Price: {formatPrice(data.price)}</div>}
              {data.status && <div>Status: {data.status}</div>}
              {data.timestamp && <div>Time: {new Date(data.timestamp).toLocaleString()}</div>}
            </div>
          </div>
        )
      
      case 'position':
        return (
          <div className="space-y-1">
            <div className="font-semibold text-xs text-gray-300">Position Info</div>
            <div className="space-y-1">
              {data.size && <div>Size: {data.size}</div>}
              {data.entryPrice && <div>Entry: {formatPrice(data.entryPrice)}</div>}
              {data.currentPrice && <div>Current: {formatPrice(data.currentPrice)}</div>}
              {data.pnl !== undefined && (
                <div className={cn(
                  data.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                )}>
                  P&L: {formatPrice(data.pnl)}
                </div>
              )}
            </div>
          </div>
        )
      
      case 'indicator':
        return (
          <div className="space-y-1">
            <div className="font-semibold text-xs text-gray-300">Technical Indicator</div>
            <div className="space-y-1">
              {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                  {key}: {typeof value === 'number' ? value.toFixed(4) : value}
                </div>
              ))}
            </div>
          </div>
        )
      
      default:
        return (
          <div className="space-y-1">
            {Object.entries(data).map(([key, value]) => (
              <div key={key}>
                {key}: {typeof value === 'number' ? value.toLocaleString() : value}
              </div>
            ))}
          </div>
        )
    }
  }
  
  return (
    <Tooltip
      content={renderTooltipContent()}
      position={position}
      className={className}
      maxWidth="250px"
    >
      {children}
    </Tooltip>
  )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip 