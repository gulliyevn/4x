/**
 * Input Component
 * 
 * A versatile input component with validation, icons, and trading-specific features
 * designed for the 4X trading platform with react-hook-form integration.
 */

import React, { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The input type variant
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'currency' | 'percentage'
  
  /**
   * The visual state of the input
   */
  state?: 'default' | 'error' | 'success' | 'disabled'
  
  /**
   * The size of the input
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Label for the input
   */
  label?: string
  
  /**
   * Error message to display
   */
  error?: string
  
  /**
   * Success message to display
   */
  success?: string
  
  /**
   * Helper text to display below input
   */
  helperText?: string
  
  /**
   * Icon to display at the start of input
   */
  prefixIcon?: React.ReactNode
  
  /**
   * Icon to display at the end of input
   */
  suffixIcon?: React.ReactNode
  
  /**
   * Text to display as prefix
   */
  prefix?: string
  
  /**
   * Text to display as suffix
   */
  suffix?: string
  
  /**
   * Whether the input should take full width
   */
  fullWidth?: boolean
  
  /**
   * Whether to show a loading state
   */
  loading?: boolean
  
  /**
   * Currency symbol for currency inputs
   */
  currency?: string
  
  /**
   * Number of decimal places for currency/percentage inputs
   */
  decimals?: number
}

const inputStateStyles = {
  default: [
    'border-gray-300 hover:border-gray-400 focus:border-[#98b5a4]',
    'focus:ring-[#98b5a4] focus:ring-2 focus:ring-opacity-20',
  ].join(' '),
  
  error: [
    'border-red-500 hover:border-red-600 focus:border-red-500',
    'focus:ring-red-500 focus:ring-2 focus:ring-opacity-20',
  ].join(' '),
  
  success: [
    'border-green-500 hover:border-green-600 focus:border-green-500',
    'focus:ring-green-500 focus:ring-2 focus:ring-opacity-20',
  ].join(' '),
  
  disabled: [
    'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed',
  ].join(' '),
}

const inputSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
}

const labelSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

// Loading spinner for input
const InputSpinner = () => (
  <motion.div
    className="w-4 h-4 border-2 border-gray-300 border-t-[#98b5a4] rounded-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  />
)

// Format currency value
const formatCurrency = (value: string, currency: string = '$', decimals: number = 2) => {
  const num = parseFloat(value.replace(/[^0-9.-]/g, ''))
  if (isNaN(num)) return ''
  return currency + num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Format percentage value
const formatPercentage = (value: string, decimals: number = 2) => {
  const num = parseFloat(value.replace(/[^0-9.-]/g, ''))
  if (isNaN(num)) return ''
  return num.toFixed(decimals) + '%'
}

/**
 * Input component for the 4X trading platform
 * 
 * @example
 * ```tsx
 * <Input
 *   type="currency"
 *   label="Amount"
 *   currency="$"
 *   state={errors.amount ? "error" : "default"}
 *   error={errors.amount?.message}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      state = 'default',
      size = 'md',
      label,
      error,
      success,
      helperText,
      prefixIcon,
      suffixIcon,
      prefix,
      suffix,
      fullWidth = false,
      loading = false,
      currency = '$',
      decimals = 2,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value || '')
    const [isFocused, setIsFocused] = useState(false)
    
    const isDisabled = disabled || state === 'disabled'
    const currentState = error ? 'error' : success ? 'success' : state
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value
      
      // Handle special input types
      if (type === 'currency') {
        // Remove formatting and apply new formatting
        const numericValue = newValue.replace(/[^0-9.-]/g, '')
        if (numericValue) {
          const formattedValue = formatCurrency(numericValue, currency, decimals)
          newValue = formattedValue
        }
      } else if (type === 'percentage') {
        const numericValue = newValue.replace(/[^0-9.-]/g, '')
        if (numericValue) {
          const formattedValue = formatPercentage(numericValue, decimals)
          newValue = formattedValue
        }
      }
      
      setInternalValue(newValue)
      
      // Call parent onChange with formatted value
      if (onChange) {
        const modifiedEvent = {
          ...e,
          target: { ...e.target, value: newValue }
        }
        onChange(modifiedEvent)
      }
    }
    
    const displayValue = value !== undefined ? value : internalValue
    
    return (
      <div className={cn('space-y-1', fullWidth ? 'w-full' : 'w-auto')}>
        {/* Label */}
        {label && (
          <label className={cn(
            'block font-medium text-gray-700',
            labelSizes[size],
            isDisabled && 'text-gray-400'
          )}>
            {label}
          </label>
        )}
        
        {/* Input Container */}
        <motion.div
          className={cn(
            'relative flex items-center',
            fullWidth ? 'w-full' : 'w-auto'
          )}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          {/* Prefix Icon */}
          {prefixIcon && (
            <div className="absolute left-3 z-10 text-gray-400">
              {prefixIcon}
            </div>
          )}
          
          {/* Prefix Text */}
          {prefix && (
            <div className={cn(
              'absolute left-3 z-10 text-gray-500 font-medium',
              labelSizes[size]
            )}>
              {prefix}
            </div>
          )}
          
          {/* Input Field */}
          <input
            ref={ref}
            type={type === 'currency' || type === 'percentage' ? 'text' : type}
            className={cn(
              // Base styles
              'w-full rounded-lg border transition-all duration-200',
              'focus:outline-none focus:ring-offset-0',
              'placeholder:text-gray-400',
              
              // Size styles
              inputSizes[size],
              
              // State styles
              inputStateStyles[currentState],
              
              // Prefix/suffix spacing
              (prefixIcon || prefix) && 'pl-10',
              (suffixIcon || suffix || loading) && 'pr-10',
              
              // Disabled styles
              isDisabled && 'cursor-not-allowed',
              
              className
            )}
            value={displayValue}
            onChange={handleChange}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            disabled={isDisabled}
            {...props}
          />
          
          {/* Suffix Icon/Loading */}
          {loading ? (
            <div className="absolute right-3 z-10">
              <InputSpinner />
            </div>
          ) : suffixIcon ? (
            <div className="absolute right-3 z-10 text-gray-400">
              {suffixIcon}
            </div>
          ) : suffix ? (
            <div className={cn(
              'absolute right-3 z-10 text-gray-500 font-medium',
              labelSizes[size]
            )}>
              {suffix}
            </div>
          ) : null}
        </motion.div>
        
        {/* Helper Text / Error / Success Message */}
        {(error || success || helperText) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'text-xs',
              error && 'text-red-600',
              success && 'text-green-600',
              helperText && !error && !success && 'text-gray-500'
            )}
          >
            {error || success || helperText}
          </motion.div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input 