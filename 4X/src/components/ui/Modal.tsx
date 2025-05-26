/**
 * Modal Component
 * 
 * A full-featured modal component with overlay, animations, and accessibility
 * designed for the 4X trading platform with focus management and keyboard navigation.
 */

import React, { useEffect, useRef, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean
  
  /**
   * Callback when modal should close
   */
  onClose: () => void
  
  /**
   * Modal title
   */
  title?: string
  
  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean
  
  /**
   * Whether to close on escape key
   */
  closeOnEscape?: boolean
  
  /**
   * Whether to close on backdrop click
   */
  closeOnBackdrop?: boolean
  
  /**
   * Custom z-index
   */
  zIndex?: number
  
  /**
   * Modal content
   */
  children: React.ReactNode
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Whether to prevent body scroll
   */
  preventBodyScroll?: boolean
}

export interface ModalHeaderProps {
  /**
   * Header content
   */
  children: React.ReactNode
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Close callback from parent modal
   */
  onClose?: () => void
  
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean
}

export interface ModalBodyProps {
  /**
   * Body content
   */
  children: React.ReactNode
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Custom padding
   */
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export interface ModalFooterProps {
  /**
   * Footer content
   */
  children: React.ReactNode
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Content alignment
   */
  align?: 'left' | 'center' | 'right' | 'between'
}

const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4 my-4 h-[calc(100vh-2rem)]',
}

const paddingVariants = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const alignVariants = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  between: 'justify-between',
}

// Close icon component
const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

// Focus trap hook
const useFocusTrap = (ref: React.RefObject<HTMLDivElement | null>, isActive: boolean) => {
  useEffect(() => {
    if (!isActive || !ref.current) return

    const focusableElements = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    // Focus first element
    firstElement?.focus()

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isActive, ref])
}

/**
 * Modal component for the 4X trading platform
 * 
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={onClose} title="Trade Confirmation" size="md">
 *   <ModalBody>
 *     <p>Are you sure you want to execute this trade?</p>
 *   </ModalBody>
 *   <ModalFooter align="between">
 *     <Button variant="outline" onClick={onClose}>Cancel</Button>
 *     <Button variant="primary" onClick={handleConfirm}>Confirm Trade</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
  zIndex = 50,
  children,
  className,
  preventBodyScroll = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  
  // Focus trap
  useFocusTrap(modalRef, isOpen)

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // Handle body scroll
  useEffect(() => {
    if (!preventBodyScroll) return

    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen, preventBodyScroll])

  // Portal target
  const portalTarget = typeof window !== 'undefined' ? document.body : null

  if (!portalTarget) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            'fixed inset-0 flex items-center justify-center p-4',
            `z-${zIndex}`
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className={cn(
              'relative bg-white rounded-lg shadow-xl',
              'max-h-[90vh] overflow-hidden flex flex-col',
              'border border-gray-200',
              modalSizes[size],
              size === 'full' && 'w-full',
              className
            )}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <ModalHeader onClose={onClose} showCloseButton={showCloseButton}>
                {title && (
                  <h2 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h2>
                )}
              </ModalHeader>
            )}

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalTarget
  )
}

/**
 * Modal Header component
 */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, onClose, showCloseButton = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between p-6 border-b border-gray-200',
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className={cn(
            'ml-4 p-2 text-gray-400 hover:text-gray-600',
            'rounded-lg hover:bg-gray-100 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-[#98b5a4]'
          )}
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
)

/**
 * Modal Body component
 */
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex-1',
        padding !== 'none' && paddingVariants[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

/**
 * Modal Footer component
 */
export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, align = 'right', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3 p-6 border-t border-gray-200',
        alignVariants[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

// Specialized modal types for trading
export interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  loading?: boolean
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  loading = false,
}) => {
  const iconMap = {
    danger: '⚠️',
    warning: '⚠️',
    info: 'ℹ️',
  }

  const colorMap = {
    danger: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalBody>
        <div className="flex items-start space-x-3">
          <div className={cn('text-2xl', colorMap[variant])}>
            {iconMap[variant]}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
      </ModalBody>
      
      <ModalFooter align="right">
        <button
          onClick={onClose}
          disabled={loading}
          className={cn(
            'px-4 py-2 text-sm font-medium text-gray-700',
            'border border-gray-300 rounded-lg',
            'hover:bg-gray-50 focus:outline-none focus:ring-2',
            'focus:ring-[#98b5a4] disabled:opacity-50'
          )}
        >
          {cancelText}
        </button>
        
        <button
          onClick={onConfirm}
          disabled={loading}
          className={cn(
            'px-4 py-2 text-sm font-medium text-white',
            variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-[#98b5a4] hover:bg-[#89a396]',
            'rounded-lg focus:outline-none focus:ring-2',
            'focus:ring-offset-2 disabled:opacity-50',
            variant === 'danger' ? 'focus:ring-red-600' : 'focus:ring-[#98b5a4]'
          )}
        >
          {loading ? 'Loading...' : confirmText}
        </button>
      </ModalFooter>
    </Modal>
  )
}

Modal.displayName = 'Modal'
ModalHeader.displayName = 'ModalHeader'
ModalBody.displayName = 'ModalBody'
ModalFooter.displayName = 'ModalFooter'

export default Modal 