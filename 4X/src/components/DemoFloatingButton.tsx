'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { useToastContext } from './ToastProvider'
import { TestTube, X, Sparkles } from 'lucide-react'

export function DemoFloatingButton() {
  const { isDemoMode, enableDemoMode, disableDemoMode, demoLogin, isAuthenticated } = useAuthStore()
  const { success, info, warning } = useToastContext()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleToggle = async () => {
    setIsTransitioning(true)
    setIsExpanded(false)
    
    try {
      if (isDemoMode) {
        disableDemoMode()
        warning('Demo Mode Disabled', 'You have exited demo mode. Ready for real trading!', {
          duration: 4000
        })
      } else {
        enableDemoMode()
        success('Demo Mode Activated! 🚀', 'Explore all features with virtual funds - no risk involved!', {
          duration: 6000
        })
        if (!isAuthenticated) {
          demoLogin()
          info('Demo Login Successful', 'You are now logged in with demo credentials', {
            duration: 4000
          })
        }
      }
    } finally {
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 mb-4"
          >
            <div className="demo-glassmorphism rounded-2xl p-4 shadow-2xl min-w-[280px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 dark:text-white">Demo Mode</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {isDemoMode 
                  ? 'Currently using virtual funds for safe trading practice.'
                  : 'Enable demo mode to practice trading with virtual money.'
                }
              </p>
              
              <button
                onClick={handleToggle}
                disabled={isTransitioning}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  isDemoMode 
                    ? 'demo-button-stop text-white' 
                    : 'demo-button text-white'
                } ${isTransitioning ? 'opacity-75' : 'opacity-100'}`}
              >
                {isTransitioning ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Loading...
                  </div>
                ) : isDemoMode ? (
                  'Disable Demo Mode'
                ) : (
                  'Enable Demo Mode'
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ${
          isDemoMode 
            ? 'demo-gradient-success' 
            : 'demo-gradient-blue'
        } hover:scale-110 active:scale-95`}
      >
        <div className="relative flex items-center justify-center h-full">
          <TestTube className="h-6 w-6 text-white" />
          
          {isDemoMode && (
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-4 w-4 text-yellow-300" />
            </div>
          )}
        </div>

        {/* Pulse indicator when demo is active */}
        {isDemoMode && (
          <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-20"></div>
        )}
      </button>
    </div>
  )
} 