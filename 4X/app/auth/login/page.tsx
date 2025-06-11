'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useToastContext } from '@/components/ToastProvider'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { DemoToggle } from '@/components/DemoToggle'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login, demoLogin, isLoading } = useAuthStore()
  const { success, error } = useToastContext()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await login({ 
        email: formData.email, 
        password: formData.password,
        rememberMe: false 
      })
      success('Welcome back! 🎉', 'You have successfully logged in to your account')
      router.push('/dashboard')
    } catch (err: any) {
      error('Login Failed', err.message || 'Invalid email or password')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDemoLogin = () => {
    demoLogin()
    success('Demo Mode Activated! 🚀', 'You are now exploring with virtual funds')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400 to-cyan-400 rounded-full opacity-20 blur-3xl animate-bounce-gentle"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-4 sm:p-6">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">4X</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white hidden sm:block">
                Analytics
              </span>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Sign in to your trading account
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 sm:p-8 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Enter your email"
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 h-12 text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                      />
                      <span className="text-gray-600 dark:text-gray-300">Remember me</span>
                    </label>
                    <Link 
                      href="/auth/forgot-password" 
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full h-12 text-base font-semibold btn-enhanced hover-scale"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Signing In...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={handleDemoLogin}
                    variant="outline"
                    className="w-full h-12 text-base font-semibold btn-enhanced hover-scale border-2 border-dashed"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Try Demo Mode
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    Don't have an account?{' '}
                    <Link 
                      href="/auth/register" 
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Demo Toggle Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <DemoToggle />
            </motion.div>

            {/* Development Helper - Test Credentials */}
            {process.env.NODE_ENV === 'development' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-6"
              >
                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-3">
                      🧪 Development Test Credentials
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                        <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">Demo User</div>
                        <div className="font-mono text-blue-600 dark:text-blue-400">demo@4xtrading.com</div>
                        <div className="font-mono text-blue-600 dark:text-blue-400">demo123</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                        <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">Test User</div>
                        <div className="font-mono text-green-600 dark:text-green-400">test@4xtrading.com</div>
                        <div className="font-mono text-green-600 dark:text-green-400">test123</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                        <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">Admin User</div>
                        <div className="font-mono text-purple-600 dark:text-purple-400">admin@4xtrading.com</div>
                        <div className="font-mono text-purple-600 dark:text-purple-400">admin123</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 sm:p-6 text-center">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 4X Analytics. All rights reserved. | 
              <Link href="/privacy" className="hover:underline ml-1">Privacy Policy</Link> | 
              <Link href="/terms" className="hover:underline ml-1">Terms of Service</Link>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
} 