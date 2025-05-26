/**
 * Card Component
 * 
 * A versatile card component with multiple variants and sections
 * designed for the 4X trading platform with hover effects and animations.
 */

import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual variant of the card
   */
  variant?: 'default' | 'elevated' | 'outlined'
  
  /**
   * Whether the card should have hover effects
   */
  hoverable?: boolean
  
  /**
   * Whether the card should be clickable
   */
  clickable?: boolean
  
  /**
   * Loading state for the card
   */
  loading?: boolean
  
  /**
   * Custom padding for the card
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to show a divider below the header
   */
  divider?: boolean
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom padding for the body
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to show a divider above the footer
   */
  divider?: boolean
  
  /**
   * Justify content alignment
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
}

const cardVariants = {
  default: [
    'bg-white border border-gray-200',
    'shadow-sm',
  ].join(' '),
  
  elevated: [
    'bg-white border border-gray-100',
    'shadow-lg shadow-gray-100/50',
  ].join(' '),
  
  outlined: [
    'bg-white border-2 border-[#98b5a4]/20',
    'shadow-none',
  ].join(' '),
}

const hoverVariants = {
  default: 'hover:shadow-md hover:border-gray-300',
  elevated: 'hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1',
  outlined: 'hover:border-[#98b5a4]/40 hover:shadow-sm',
}

const paddingVariants = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
}

const justifyVariants = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
}

// Loading skeleton for card content
const CardSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
  </div>
)

/**
 * Card component for the 4X trading platform
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" hoverable>
 *   <CardHeader divider>
 *     <h3>Portfolio Performance</h3>
 *   </CardHeader>
 *   <CardBody>
 *     <p>Your portfolio content here</p>
 *   </CardBody>
 *   <CardFooter divider justify="between">
 *     <Button variant="outline">View Details</Button>
 *     <Button variant="primary">Trade Now</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      hoverable = false,
      clickable = false,
      loading = false,
      padding = 'none',
      children,
      onClick,
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
    const isInteractive = hoverable || clickable || onClick

    // Filter out drag-related and animation props that conflict with framer-motion
    const filteredProps = {
      ...props,
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-lg transition-all duration-200',
          
          // Variant styles
          cardVariants[variant],
          
          // Padding
          padding !== 'none' && paddingVariants[padding],
          
          // Interactive states
          isInteractive && 'cursor-pointer',
          hoverable && hoverVariants[variant],
          
          // Focus styles for accessibility
          clickable && 'focus:outline-none focus:ring-2 focus:ring-[#98b5a4] focus:ring-offset-2',
          
          className
        )}
        onClick={onClick}
        whileHover={
          isInteractive && !loading
            ? { scale: 1.02, transition: { duration: 0.2 } }
            : {}
        }
        whileTap={
          clickable && !loading
            ? { scale: 0.98, transition: { duration: 0.1 } }
            : {}
        }
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        tabIndex={clickable ? 0 : undefined}
        role={clickable ? 'button' : undefined}
        {...filteredProps}
      >
        {loading ? <CardSkeleton /> : children}
      </motion.div>
    )
  }
)

/**
 * Card Header component
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, divider = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-6 py-4',
        divider && 'border-b border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

/**
 * Card Body component
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, padding = 'md', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        padding !== 'none' && paddingVariants[padding],
        padding === 'none' && 'px-6 py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

/**
 * Card Footer component
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (
    { 
      className, 
      divider = false, 
      justify = 'end', 
      children, 
      ...props 
    }, 
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'px-6 py-4 flex items-center gap-3',
        divider && 'border-t border-gray-200',
        justifyVariants[justify],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardBody.displayName = 'CardBody'
CardFooter.displayName = 'CardFooter'

export default Card 