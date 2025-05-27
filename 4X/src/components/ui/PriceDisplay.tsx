'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PriceDisplayProps {
  price: number
  previousPrice?: number
  currency?: string
  decimals?: number
  showChange?: boolean
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

interface PriceChange {
  direction: 'up' | 'down' | 'neutral'
  percentage: number
  absolute: number
}

export const PriceDisplay: React.FC<PriceDisplayProps> = React.memo(({
  price,
  previousPrice,
  currency = 'USD',
  decimals = 2,
  showChange = true,
  showPercentage = true,
  size = 'md',
  className = ''
}) => {
  const [isFlashing, setIsFlashing] = useState(false)
  const [displayPrice, setDisplayPrice] = useState(price)

  // Calculate price change
  const priceChange = useMemo((): PriceChange => {
    if (!previousPrice || previousPrice === 0) {
      return { direction: 'neutral', percentage: 0, absolute: 0 }
    }

    const absolute = price - previousPrice
    const percentage = (absolute / previousPrice) * 100

    return {
      direction: absolute > 0 ? 'up' : absolute < 0 ? 'down' : 'neutral',
      percentage: Math.abs(percentage),
      absolute: Math.abs(absolute)
    }
  }, [price, previousPrice])

  // Flash animation on price change
  useEffect(() => {
    if (previousPrice && price !== previousPrice) {
      setIsFlashing(true)
      const timer = setTimeout(() => setIsFlashing(false), 300)
      return () => clearTimeout(timer)
    }
  }, [price, previousPrice])

  // Animate price number changes
  useEffect(() => {
    if (price !== displayPrice) {
      const duration = 200
      const steps = 10
      const increment = (price - displayPrice) / steps
      let step = 0

      const animate = () => {
        step++
        setDisplayPrice(prev => prev + increment)
        
        if (step < steps) {
          setTimeout(animate, duration / steps)
        } else {
          setDisplayPrice(price)
        }
      }

      animate()
    }
  }, [price, displayPrice])

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value)
  }

  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl font-bold'
  }

  // Color classes based on price direction
  const getColorClass = (direction: string) => {
    switch (direction) {
      case 'up':
        return 'text-green-500'
      case 'down':
        return 'text-red-500'
      default:
        return 'text-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Main Price */}
      <motion.div
        className={`${sizeClasses[size]} font-mono ${getColorClass(priceChange.direction)}`}
        animate={{
          scale: isFlashing ? [1, 1.05, 1] : 1,
          backgroundColor: isFlashing 
            ? priceChange.direction === 'up' 
              ? 'rgba(34, 197, 94, 0.1)' 
              : 'rgba(239, 68, 68, 0.1)'
            : 'transparent'
        }}
        transition={{ duration: 0.3 }}
      >
        {formatCurrency(displayPrice)}
      </motion.div>

      {/* Price Change Indicator */}
      {showChange && previousPrice && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex items-center space-x-1"
          >
            {/* Arrow Icon */}
            <motion.div
              animate={{ 
                rotate: priceChange.direction === 'up' ? 0 : 180,
                scale: isFlashing ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.2 }}
              className={`w-3 h-3 ${getColorClass(priceChange.direction)}`}
            >
              {priceChange.direction !== 'neutral' && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14l5-5 5 5z" />
                </svg>
              )}
            </motion.div>

            {/* Change Amount */}
            <span className={`text-sm font-medium ${getColorClass(priceChange.direction)}`}>
              {formatCurrency(priceChange.absolute)}
            </span>

            {/* Percentage Change */}
            {showPercentage && (
              <span className={`text-sm ${getColorClass(priceChange.direction)}`}>
                ({priceChange.percentage.toFixed(2)}%)
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Real-time indicator */}
      <motion.div
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-2 h-2 bg-green-400 rounded-full"
        title="Live Price"
      />
    </div>
  )
})

PriceDisplay.displayName = 'PriceDisplay'

export default PriceDisplay 