'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import { useToastContext } from './ToastProvider'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  Play, 
  Square, 
  TestTube,
  AlertTriangle,
  CheckCircle,
  Sparkles
} from 'lucide-react'

export function DemoToggle() {
  const { isDemoMode, enableDemoMode, disableDemoMode, demoLogin, user, isAuthenticated } = useAuthStore()
  const { success, info, warning } = useToastContext()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleToggle = async () => {
    setIsTransitioning(true)
    
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
        // Automatically login with demo user if not authenticated
        if (!isAuthenticated) {
          demoLogin()
          info('Demo Login Successful', 'You are now logged in with demo credentials', {
            duration: 4000
          })
        }
      }
    } finally {
      // Add a small delay for smooth animation
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const handleDemoLogin = () => {
    setIsTransitioning(true)
    demoLogin()
    success('Welcome to Demo Mode! 🎉', 'You are now logged in with demo credentials. Start exploring!', {
      duration: 5000
    })
    setTimeout(() => setIsTransitioning(false), 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="demo-card-hover"
    >
      <Card className={`p-6 border-2 relative overflow-hidden ${
        isDemoMode 
          ? 'demo-mode-indicator border-transparent' 
          : 'demo-section-gradient border-dashed border-gray-300 dark:border-gray-600'
      }`}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <motion.div
                  animate={isDemoMode ? { rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="demo-icon"
                >
                  <TestTube className={`h-10 w-10 ${
                    isDemoMode ? 'text-white' : 'text-blue-600 dark:text-blue-400'
                  }`} />
                </motion.div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className={`text-xl font-bold ${
                    isDemoMode ? 'text-white demo-text-shimmer' : 'text-gray-900 dark:text-white'
                  }`}>
                    Demo Mode
                  </h3>
                  
                  <AnimatePresence mode="wait">
                    {isDemoMode ? (
                      <motion.div
                        key="active"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.3, type: "spring" }}
                      >
                        <Badge className="demo-badge-active flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span className="font-semibold">Active</span>
                          <Sparkles className="h-3 w-3" />
                        </Badge>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="inactive"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge className="demo-badge-inactive">Inactive</Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <p className={`text-sm leading-relaxed ${
                  isDemoMode 
                    ? 'text-blue-100' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {isDemoMode 
                    ? '🚀 You\'re exploring with virtual funds - experiment freely with all features!'
                    : '💡 Switch to demo mode to experience our platform with virtual money and zero risk.'
                  }
                </p>

                {isDemoMode && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center space-x-2 text-sm"
                  >
                    <div className="demo-pulse-dot w-2 h-2 rounded-full"></div>
                    <span className="text-white font-medium">
                      Demo User: {user.email}
                    </span>
                    <AlertTriangle className="h-4 w-4 text-yellow-300" />
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {!isAuthenticated && !isDemoMode && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    onClick={handleDemoLogin}
                    disabled={isTransitioning}
                    size="sm"
                    className="demo-button border-0 text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Try Demo
                  </Button>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleToggle}
                  disabled={isTransitioning}
                  size="lg"
                  className={`min-w-[140px] transition-all duration-300 font-semibold px-6 py-3 rounded-xl border-0 ${
                    isDemoMode 
                      ? 'demo-button-stop text-white' 
                      : 'demo-button text-white'
                  } ${isTransitioning ? 'scale-95 opacity-75' : 'scale-100 opacity-100'}`}
                >
                  <AnimatePresence mode="wait">
                    {isTransitioning ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        <span>Loading...</span>
                      </motion.div>
                    ) : isDemoMode ? (
                      <motion.div
                        key="stop"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center"
                      >
                        <Square className="h-5 w-5 mr-2" />
                        <span>Stop Demo</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="start"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center"
                      >
                        <Play className="h-5 w-5 mr-2" />
                        <span>Start Demo</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Demo credentials info */}
          <AnimatePresence>
            {isDemoMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-white/20"
              >
                <div className="demo-credentials-card p-4">
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-2 mb-2">
                      <TestTube className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-blue-600 dark:text-blue-400">Demo Credentials</span>
                    </div>
                    <div className="space-y-1 ml-6">
                      <p className="font-mono">📧 Email: demo@4xtrading.com</p>
                      <p className="font-mono">🔑 Password: demo123</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
} 