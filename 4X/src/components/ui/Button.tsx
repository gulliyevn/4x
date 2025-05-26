'use client'

/**
 * Button Component
 * 
 * A versatile button component with multiple variants, sizes, and states
 * designed for the 4X trading platform with custom colors and accessibility.
 */

import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Loading spinner component
const Spinner = ({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <motion.div
      className={cn('border-2 border-white border-t-transparent rounded-full', sizeClasses[size])}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /**
   * The visual style variant of the button
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  
  /**
   * The size of the button
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean
  
  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode
  
  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode
  
  /**
   * Whether the button should take full width
   */
  fullWidth?: boolean
}

const buttonVariants = {
  primary: [
    'bg-[#98b5a4] hover:bg-[#89a396] active:bg-[#7a9287]',
    'text-white font-medium',
    'border border-[#98b5a4] hover:border-[#89a396]',
    'shadow-sm hover:shadow-md',
    'focus:ring-2 focus:ring-[#98b5a4] focus:ring-offset-2',
  ].join(' '),
  
  secondary: [
    'bg-[#162A2C] hover:bg-[#1f3537] active:bg-[#283f42]',
    'text-white font-medium',
    'border border-[#162A2C] hover:border-[#1f3537]',
    'shadow-sm hover:shadow-md',
    'focus:ring-2 focus:ring-[#162A2C] focus:ring-offset-2',
  ].join(' '),
  
  outline: [
    'bg-transparent hover:bg-[#98b5a4]/10 active:bg-[#98b5a4]/20',
    'text-[#98b5a4] hover:text-[#89a396] font-medium',
    'border border-[#98b5a4] hover:border-[#89a396]',
    'focus:ring-2 focus:ring-[#98b5a4] focus:ring-offset-2',
  ].join(' '),
  
  ghost: [
    'bg-transparent hover:bg-gray-100 active:bg-gray-200',
    'text-gray-700 hover:text-gray-900 font-medium',
    'border border-transparent',
    'focus:ring-2 focus:ring-gray-300 focus:ring-offset-2',
  ].join(' '),
  
  destructive: [
    'bg-red-600 hover:bg-red-700 active:bg-red-800',
    'text-white font-medium',
    'border border-red-600 hover:border-red-700',
    'shadow-sm hover:shadow-md',
    'focus:ring-2 focus:ring-red-600 focus:ring-offset-2',
  ].join(' '),
}

const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
  xl: 'px-8 py-4 text-lg gap-3',
}

const disabledClasses = [
  'disabled:opacity-50 disabled:cursor-not-allowed',
  'disabled:hover:shadow-none disabled:active:transform-none',
].join(' ')

/**
 * Button component for the 4X trading platform
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" loading={false}>
 *   Buy BTC
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
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
    const isDisabled = disabled || loading

    // Filter out drag-related and animation props that conflict with framer-motion
    const filteredProps = {
      ...props,
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'rounded-lg font-medium transition-all duration-200',
          'focus:outline-none focus:ring-offset-white',
          'active:scale-[0.98] transform',
          
          // Variant styles
          buttonVariants[variant],
          
          // Size styles
          sizeVariants[size],
          
          // Full width
          fullWidth && 'w-full',
          
          // Disabled styles
          disabledClasses,
          
          // Custom className
          className
        )}
        disabled={isDisabled}
        onClick={onClick}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        {...filteredProps}
      >
        {/* Left icon or loading spinner */}
        {loading ? (
          <Spinner size={size === 'sm' ? 'sm' : size === 'xl' ? 'lg' : 'md'} />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        
        {/* Button content */}
        {children && <span className={loading ? 'opacity-70' : ''}>{children}</span>}
        
        {/* Right icon */}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button 