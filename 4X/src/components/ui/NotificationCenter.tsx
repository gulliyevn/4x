'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface Notification {
  id: string
  type: 'price_alert' | 'trade_execution' | 'system' | 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  timestamp: Date
  read: boolean
  persistent?: boolean
  actionLabel?: string
  actionCallback?: () => void
  metadata?: Record<string, any>
}

interface NotificationStore {
  notifications: Notification[]
  settings: {
    enablePriceAlerts: boolean
    enableTradeNotifications: boolean
    enableSystemNotifications: boolean
    soundEnabled: boolean
    maxNotifications: number
  }
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  removeNotification: (id: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
  updateSettings: (settings: Partial<NotificationStore['settings']>) => void
}

const useNotificationStore = create<NotificationStore>()(
  devtools(
    persist(
      (set, get) => ({
        notifications: [],
        settings: {
          enablePriceAlerts: true,
          enableTradeNotifications: true,
          enableSystemNotifications: true,
          soundEnabled: true,
          maxNotifications: 50,
        },
        addNotification: (notification) => {
          const newNotification: Notification = {
            ...notification,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
            read: false,
          }

          set((state) => {
            const notifications = [newNotification, ...state.notifications]
            
            // Limit notifications to maxNotifications
            if (notifications.length > state.settings.maxNotifications) {
              notifications.splice(state.settings.maxNotifications)
            }

            return { notifications }
          })

          // Play sound if enabled
          if (get().settings.soundEnabled) {
            playNotificationSound(notification.type)
          }
        },
        removeNotification: (id) => {
          set((state) => ({
            notifications: state.notifications.filter(n => n.id !== id)
          }))
        },
        markAsRead: (id) => {
          set((state) => ({
            notifications: state.notifications.map(n => 
              n.id === id ? { ...n, read: true } : n
            )
          }))
        },
        markAllAsRead: () => {
          set((state) => ({
            notifications: state.notifications.map(n => ({ ...n, read: true }))
          }))
        },
        clearAll: () => {
          set({ notifications: [] })
        },
        updateSettings: (newSettings) => {
          set((state) => ({
            settings: { ...state.settings, ...newSettings }
          }))
        },
      }),
      {
        name: 'notification-storage',
        partialize: (state) => ({
          notifications: state.notifications.filter(n => n.persistent),
          settings: state.settings,
        }),
      }
    ),
    { name: 'notification-store' }
  )
)

// Sound utility
const playNotificationSound = (type: Notification['type']) => {
  if (typeof window === 'undefined') return

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Different frequencies for different notification types
    const frequencies = {
      price_alert: 800,
      trade_execution: 600,
      system: 400,
      info: 500,
      warning: 700,
      error: 300,
      success: 900,
    }

    oscillator.frequency.setValueAtTime(frequencies[type] || 500, audioContext.currentTime)
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  } catch (error) {
    console.warn('Could not play notification sound:', error)
  }
}

// Toast notification component
interface ToastNotificationProps {
  notification: Notification
  onClose: () => void
  onAction?: () => void
}

const ToastNotification: React.FC<ToastNotificationProps> = React.memo(({
  notification,
  onClose,
  onAction
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!notification.persistent) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for exit animation
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification.persistent, onClose])

  const getIcon = () => {
    switch (notification.type) {
      case 'price_alert':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z" />
          </svg>
        )
      case 'trade_execution':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        )
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const getColorClasses = () => {
    switch (notification.type) {
      case 'price_alert':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'trade_execution':
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getIconColorClasses = () => {
    switch (notification.type) {
      case 'price_alert':
        return 'text-blue-500'
      case 'trade_execution':
      case 'success':
        return 'text-green-500'
      case 'error':
        return 'text-red-500'
      case 'warning':
        return 'text-yellow-500'
      default:
        return 'text-gray-500'
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`max-w-sm w-full border rounded-lg shadow-lg p-4 ${getColorClasses()}`}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${getIconColorClasses()}`}>
          {getIcon()}
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium">{notification.title}</p>
          <p className="mt-1 text-sm opacity-90">{notification.message}</p>
          {notification.actionLabel && (
            <button
              onClick={onAction}
              className="mt-2 text-sm font-medium underline hover:no-underline"
            >
              {notification.actionLabel}
            </button>
          )}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 300)
            }}
            className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
})

ToastNotification.displayName = 'ToastNotification'

// Main notification center component
interface NotificationCenterProps {
  className?: string
}

export const NotificationCenter: React.FC<NotificationCenterProps> = React.memo(({
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { 
    notifications, 
    settings, 
    removeNotification, 
    markAsRead, 
    markAllAsRead, 
    clearAll,
    updateSettings 
  } = useNotificationStore()

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.read).length
  }, [notifications])

  const recentNotifications = useMemo(() => {
    return notifications.slice(0, 5)
  }, [notifications])

  const handleNotificationClick = useCallback((notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    if (notification.actionCallback) {
      notification.actionCallback()
    }
  }, [markAsRead])

  return (
    <>
      {/* Notification Bell */}
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z" />
          </svg>
          
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.span>
          )}
        </button>

        {/* Notification Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                <div className="flex space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={clearAll}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear all
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z" />
                    </svg>
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                          !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 ${
                            notification.type === 'success' ? 'text-green-500' :
                            notification.type === 'error' ? 'text-red-500' :
                            notification.type === 'warning' ? 'text-yellow-500' :
                            'text-blue-500'
                          }`}>
                            {/* Icon based on type */}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                              {notification.timestamp.toLocaleString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sound</span>
                  <button
                    onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.soundEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {recentNotifications
            .filter(n => !n.read && Date.now() - n.timestamp.getTime() < 10000)
            .map((notification) => (
              <ToastNotification
                key={notification.id}
                notification={notification}
                onClose={() => removeNotification(notification.id)}
                onAction={notification.actionCallback}
              />
            ))}
        </AnimatePresence>
      </div>
    </>
  )
})

NotificationCenter.displayName = 'NotificationCenter'

// Hook for easy notification usage
export const useNotifications = () => {
  const { addNotification, settings } = useNotificationStore()

  const showPriceAlert = useCallback((symbol: string, price: number, targetPrice: number) => {
    if (!settings.enablePriceAlerts) return

    addNotification({
      type: 'price_alert',
      title: 'Price Alert',
      message: `${symbol} has reached ${price.toFixed(5)} (target: ${targetPrice.toFixed(5)})`,
      metadata: { symbol, price, targetPrice }
    })
  }, [addNotification, settings.enablePriceAlerts])

  const showTradeExecution = useCallback((symbol: string, side: 'buy' | 'sell', quantity: number, price: number) => {
    if (!settings.enableTradeNotifications) return

    addNotification({
      type: 'trade_execution',
      title: 'Trade Executed',
      message: `${side.toUpperCase()} ${quantity} ${symbol} at ${price.toFixed(5)}`,
      metadata: { symbol, side, quantity, price }
    })
  }, [addNotification, settings.enableTradeNotifications])

  const showSystemNotification = useCallback((title: string, message: string, type: Notification['type'] = 'system') => {
    if (!settings.enableSystemNotifications && type === 'system') return

    addNotification({
      type,
      title,
      message
    })
  }, [addNotification, settings.enableSystemNotifications])

  return {
    showPriceAlert,
    showTradeExecution,
    showSystemNotification,
    addNotification
  }
}

export default NotificationCenter 