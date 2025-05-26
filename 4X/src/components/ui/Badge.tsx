/**
 * Badge Component
 * 
 * Versatile badge component with trading-specific variants
 * designed for the 4X trading platform with price indicators and status badges.
 */

import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The visual variant of the badge
   */
  variant?: 
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'positive'
    | 'negative'
    | 'neutral'
  
  /**
   * The size of the badge
   */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  
  /**
   * Badge content
   */
  children: React.ReactNode
  
  /**
   * Whether the badge should have a dot indicator
   */
  dot?: boolean
  
  /**
   * Whether the badge should be removable
   */
  removable?: boolean
  
  /**
   * Callback when badge is removed
   */
  onRemove?: () => void
  
  /**
   * Whether to show animations
   */
  animate?: boolean
  
  /**
   * Custom icon to display
   */
  icon?: React.ReactNode
  
  /**
   * Callback for drag events
   */
  onDrag?: (event: React.DragEvent<HTMLSpanElement>) => void
  
  /**
   * Callback for drag end events
   */
  onDragEnd?: (event: React.DragEvent<HTMLSpanElement>) => void
  
  /**
   * Callback for drag start events
   */
  onDragStart?: (event: React.DragEvent<HTMLSpanElement>) => void
  
  /**
   * Callback for animation start events
   */
  onAnimationStart?: (event: React.AnimationEvent<HTMLSpanElement>) => void
  
  /**
   * Callback for animation end events
   */
  onAnimationEnd?: (event: React.AnimationEvent<HTMLSpanElement>) => void
  
  /**
   * Callback for animation iteration events
   */
  onAnimationIteration?: (event: React.AnimationEvent<HTMLSpanElement>) => void
}

export interface PriceChangeBadgeProps {
  /**
   * The price change value
   */
  change: number
  
  /**
   * Whether to show percentage
   */
  showPercentage?: boolean
  
  /**
   * Number of decimal places
   */
  decimals?: number
  
  /**
   * Size of the badge
   */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  
  /**
   * Additional CSS classes
   */
  className?: string
}

export interface StatusBadgeProps {
  /**
   * The status to display
   */
  status: 'active' | 'pending' | 'completed' | 'cancelled' | 'failed' | 'processing'
  
  /**
   * Size of the badge
   */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Whether to show with pulse animation
   */
  pulse?: boolean
}

const badgeVariants = {
  default: 'bg-gray-100 text-gray-800 border-gray-200',
  primary: 'bg-[#98b5a4] text-white border-[#98b5a4]',
  secondary: 'bg-[#162A2C] text-white border-[#162A2C]',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  positive: 'bg-green-100 text-green-700 border-green-200',
  negative: 'bg-red-100 text-red-700 border-red-200',
  neutral: 'bg-gray-100 text-gray-600 border-gray-200',
}

const badgeSizes = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-1 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-sm',
}

const statusConfig = {
  active: {
    variant: 'success' as const,
    label: 'Active',
    icon: '●',
  },
  pending: {
    variant: 'warning' as const,
    label: 'Pending',
    icon: '○',
  },
  completed: {
    variant: 'success' as const,
    label: 'Completed',
    icon: '✓',
  },
  cancelled: {
    variant: 'error' as const,
    label: 'Cancelled',
    icon: '✕',
  },
  failed: {
    variant: 'error' as const,
    label: 'Failed',
    icon: '!',
  },
  processing: {
    variant: 'primary' as const,
    label: 'Processing',
    icon: '⟳',
  },
}

// Remove icon component
const RemoveIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
)

/**
 * Badge component for the 4X trading platform
 * 
 * @example
 * ```tsx
 * <Badge variant="success" size="sm">
 *   Active
 * </Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'sm',
      children,
      dot = false,
      removable = false,
      onRemove,
      animate = true,
      icon,
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
    // Filter out drag-related props that conflict with framer-motion
    const filteredProps = {
      ...props,
    }
    
    return (
      <motion.span
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center gap-1 font-medium rounded-full border',
          'transition-all duration-200',
          
          // Variant styles
          badgeVariants[variant],
          
          // Size styles
          badgeSizes[size],
          
          className
        )}
        initial={animate ? { scale: 0.8, opacity: 0 } : {}}
        animate={animate ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.2 }}
        {...filteredProps}
      >
        {/* Dot indicator */}
        {dot && (
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
        )}
        
        {/* Icon */}
        {icon && <span className="shrink-0">{icon}</span>}
        
        {/* Content */}
        <span>{children}</span>
        
        {/* Remove button */}
        {removable && onRemove && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="ml-1 p-0.5 hover:bg-black/10 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <RemoveIcon />
          </motion.button>
        )}
      </motion.span>
    )
  }
)

/**
 * Price Change Badge - specifically for trading price changes
 * 
 * @example
 * ```tsx
 * <PriceChangeBadge change={2.45} showPercentage decimals={2} />
 * ```
 */
export const PriceChangeBadge: React.FC<PriceChangeBadgeProps> = ({
  change,
  showPercentage = false,
  decimals = 2,
  size = 'sm',
  className,
}) => {
  const isPositive = change > 0
  const isNegative = change < 0
  const isNeutral = change === 0
  
  const variant = isPositive ? 'positive' : isNegative ? 'negative' : 'neutral'
  const icon = isPositive ? '↗' : isNegative ? '↘' : '→'
  const prefix = isPositive ? '+' : ''
  const suffix = showPercentage ? '%' : ''
  
  const formattedChange = `${prefix}${change.toFixed(decimals)}${suffix}`
  
  return (
    <Badge 
      variant={variant} 
      size={size} 
      icon={icon}
      className={className}
      animate
    >
      {formattedChange}
    </Badge>
  )
}

/**
 * Status Badge - for order/position status
 * 
 * @example
 * ```tsx
 * <StatusBadge status="active" pulse />
 * ```
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'sm',
  className,
  pulse = false,
}) => {
  const config = statusConfig[status]
  
  return (
    <motion.span
      className={cn(
        // Base styles
        'inline-flex items-center gap-1 font-medium rounded-full border',
        'transition-all duration-200',
        
        // Variant styles
        badgeVariants[config.variant],
        
        // Size styles
        badgeSizes[size],
        
        className
      )}
      animate={pulse ? {
        scale: [1, 1.05, 1],
      } : {}}
      transition={{
        duration: 1.5,
        repeat: pulse ? Infinity : 0,
      }}
    >
      <span className={cn(
        'text-current',
        pulse && 'animate-pulse'
      )}>
        {config.icon}
      </span>
      <span>{config.label}</span>
    </motion.span>
  )
}

// Specialized trading badges
export interface VolumeBadgeProps {
  volume: number
  threshold?: 'low' | 'medium' | 'high'
  className?: string
}

export const VolumeBadge: React.FC<VolumeBadgeProps> = ({
  volume,
  threshold = 'medium',
  className,
}) => {
  const formatVolume = (vol: number) => {
    if (vol >= 1e9) return `${(vol / 1e9).toFixed(1)}B`
    if (vol >= 1e6) return `${(vol / 1e6).toFixed(1)}M`
    if (vol >= 1e3) return `${(vol / 1e3).toFixed(1)}K`
    return vol.toString()
  }
  
  const thresholdVariants = {
    low: 'warning',
    medium: 'default',
    high: 'success',
  } as const
  
  return (
    <Badge
      variant={thresholdVariants[threshold]}
      size="xs"
      className={className}
      icon="📊"
    >
      {formatVolume(volume)}
    </Badge>
  )
}

export interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high'
  className?: string
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  className,
}) => {
  const riskConfig = {
    low: { variant: 'success' as const, icon: '🛡️', label: 'Low Risk' },
    medium: { variant: 'warning' as const, icon: '⚠️', label: 'Medium Risk' },
    high: { variant: 'error' as const, icon: '🔥', label: 'High Risk' },
  }
  
  const config = riskConfig[level]
  
  return (
    <Badge
      variant={config.variant}
      size="sm"
      icon={config.icon}
      className={className}
    >
      {config.label}
    </Badge>
  )
}

Badge.displayName = 'Badge'

export default Badge 