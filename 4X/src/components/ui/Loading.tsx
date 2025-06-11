/**
 * Loading Component
 * 
 * Multiple loading indicators and skeleton components
 * designed for the 4X trading platform with various loading states.
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Loader2, TrendingUp, BarChart3, Activity } from 'lucide-react'

export interface LoadingProps {
  /**
   * The type of loading indicator
   */
  type?: 'spinner' | 'dots' | 'bars' | 'pulse' | 'trading'
  
  /**
   * The size of the loading indicator
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Custom color for the loading indicator
   */
  color?: string
  
  /**
   * Text to display below the loading indicator
   */
  text?: string
  
  /**
   * Whether to center the loading indicator
   */
  center?: boolean
}

export interface SkeletonProps {
  /**
   * The type of skeleton component
   */
  type?: 'text' | 'card' | 'table' | 'chart' | 'avatar' | 'trading-row'
  
  /**
   * Number of skeleton items
   */
  count?: number
  
  /**
   * Custom height for skeleton
   */
  height?: string
  
  /**
   * Custom width for skeleton
   */
  width?: string
  
  /**
   * Additional CSS classes
   */
  className?: string
}

const loadingSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

const textSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}

// Circular Spinner Component
const CircularSpinner = ({ size = 'md', color = '#98b5a4' }: Pick<LoadingProps, 'size' | 'color'>) => (
  <motion.div
    className={cn('border-2 border-gray-200 rounded-full', loadingSizes[size || 'md'])}
    style={{ borderTopColor: color }}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  />
)

// Dots Spinner Component
const DotsSpinner = ({ size = 'md', color = '#98b5a4' }: Pick<LoadingProps, 'size' | 'color'>) => {
  const dotSize = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
    xl: 'w-3 h-3',
  }[size || 'md']

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn('rounded-full', dotSize)}
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

// Bars Spinner Component
const BarsSpinner = ({ size = 'md', color = '#98b5a4' }: Pick<LoadingProps, 'size' | 'color'>) => {
  const barHeight = {
    xs: 'h-3',
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8',
    xl: 'h-12',
  }[size || 'md']

  return (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={cn('w-1 rounded-sm', barHeight)}
          style={{ backgroundColor: color }}
          animate={{
            scaleY: [1, 2, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

// Pulse Spinner Component
const PulseSpinner = ({ size = 'md', color = '#98b5a4' }: Pick<LoadingProps, 'size' | 'color'>) => (
  <motion.div
    className={cn('rounded-full', loadingSizes[size || 'md'])}
    style={{ backgroundColor: color }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [1, 0.7, 1],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
    }}
  />
)

/**
 * Loading component for the 4X trading platform
 * 
 * @example
 * ```tsx
 * <Loading type="spinner" size="md" text="Loading market data..." center />
 * ```
 */
export const Loading: React.FC<LoadingProps> = ({
  type = 'spinner',
  size = 'md',
  color = '#98b5a4',
  text,
  center = false,
}) => {
  const LoadingComponent = {
    spinner: CircularSpinner,
    dots: DotsSpinner,
    bars: BarsSpinner,
    pulse: PulseSpinner,
  }[type]

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3',
        center && 'justify-center min-h-[200px]'
      )}
    >
      <LoadingComponent size={size} color={color} />
      {text && (
        <motion.p
          className="text-sm text-gray-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

/**
 * Skeleton component for loading placeholders
 * 
 * @example
 * ```tsx
 * <Skeleton type="trading-row" count={5} />
 * <Skeleton type="chart" height="300px" />
 * ```
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  type = 'text',
  count = 1,
  height,
  width,
  className,
}) => {
  const renderSkeletonItem = (index: number) => {
    switch (type) {
      case 'text':
        return (
          <div
            key={index}
            className={cn('bg-gray-200 rounded animate-pulse', className)}
            style={{
              height: height || '1rem',
              width: width || `${Math.random() * 40 + 60}%`,
            }}
          />
        )

      case 'avatar':
        return (
          <div
            key={index}
            className={cn(
              'bg-gray-200 rounded-full animate-pulse',
              className
            )}
            style={{
              height: height || '2.5rem',
              width: width || '2.5rem',
            }}
          />
        )

      case 'card':
        return (
          <div
            key={index}
            className={cn('bg-white border border-gray-200 rounded-lg p-4 space-y-4', className)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="h-2 bg-gray-200 rounded animate-pulse w-1/3" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-4/6" />
            </div>
            <div className="flex justify-between">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
              <div className="h-8 bg-gray-200 rounded animate-pulse w-20" />
            </div>
          </div>
        )

      case 'table':
        return (
          <div key={index} className={cn('space-y-2', className)}>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((col) => (
                <div
                  key={col}
                  className="h-4 bg-gray-200 rounded animate-pulse flex-1"
                />
              ))}
            </div>
          </div>
        )

      case 'chart':
        return (
          <div
            key={index}
            className={cn(
              'bg-gray-100 rounded-lg border border-gray-200 relative overflow-hidden',
              className
            )}
            style={{
              height: height || '300px',
              width: width || '100%',
            }}
          >
            {/* Chart skeleton with animated bars */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-full p-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-200 w-2 rounded-t"
                  style={{
                    height: `${Math.random() * 80 + 20}%`,
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            {/* Loading overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Loading type="spinner" size="md" text="Loading chart..." />
            </div>
          </div>
        )

      case 'trading-row':
        return (
          <div
            key={index}
            className={cn(
              'flex items-center justify-between py-3 px-4 border-b border-gray-100',
              className
            )}
          >
            {/* Symbol */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-2 bg-gray-200 rounded animate-pulse w-12" />
              </div>
            </div>
            
            {/* Price */}
            <div className="space-y-1 text-right">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
            </div>
            
            {/* Change */}
            <div className="space-y-1 text-right">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-14" />
              <div className="h-2 bg-gray-200 rounded animate-pulse w-10" />
            </div>
            
            {/* Action */}
            <div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
          </div>
        )

      default:
        return (
          <div
            key={index}
            className={cn('bg-gray-200 rounded animate-pulse', className)}
            style={{
              height: height || '1rem',
              width: width || '100%',
            }}
          />
        )
    }
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, index) => renderSkeletonItem(index))}
    </div>
  )
}

// Specialized loading components for trading scenarios
export const TradingTableLoading: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="space-y-0">
    {/* Table header */}
    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 border-b-2 border-gray-200">
      {['Symbol', 'Price', '24h Change', 'Volume', 'Action'].map((header) => (
        <div key={header} className="h-3 bg-gray-300 rounded animate-pulse w-16" />
      ))}
    </div>
    
    {/* Table rows */}
    <Skeleton type="trading-row" count={rows} />
  </div>
)

export const PortfolioCardLoading: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
    </div>
    
    {/* Value */}
    <div className="space-y-2">
      <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
    </div>
    
    {/* Chart placeholder */}
    <div className="h-40 bg-gray-100 rounded animate-pulse" />
    
    {/* Stats */}
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  </div>
)

export default Loading 

// Full page loading overlay
interface LoadingOverlayProps {
  isVisible: boolean
  text?: string
  variant?: LoadingProps['type']
}

export function LoadingOverlay({ isVisible, text = "Loading...", variant = 'trading' }: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700"
      >
        <Loading size="xl" type={variant} text={text} />
      </motion.div>
    </motion.div>
  )
}

// Skeleton loading components
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 w-full"></div>
      <div className="mt-4 space-y-2">
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-3/4"></div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-1/2"></div>
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`bg-gray-200 dark:bg-gray-700 rounded h-4 ${
            i === lines - 1 ? 'w-2/3' : 'w-full'
          }`}
        />
      ))}
    </div>
  )
} 