'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  showLanguageSwitch?: boolean
  showThemeToggle?: boolean
}

type Language = 'EN' | 'TR' | 'RU'
type Theme = 'light' | 'dark'

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title = "4X Trading Platform",
  subtitle = "Professional trading tools for the modern investor",
  showLanguageSwitch = true,
  showThemeToggle = true
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('EN')
  const [currentTheme, setCurrentTheme] = useState<Theme>('light')

  const languages: Array<{ code: Language; label: string; flag: string }> = [
    { code: 'EN', label: 'English', flag: '🇺🇸' },
    { code: 'TR', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'RU', label: 'Русский', flag: '🇷🇺' },
  ]

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setCurrentTheme(newTheme)
    // In a real app, you'd persist this to localStorage and update the document class
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    // In a real app, you'd handle internationalization here
  }

  return (
    <div className={cn(
      'min-h-screen flex',
      'bg-gradient-to-br from-gray-50 to-gray-100',
      'dark:from-gray-900 dark:to-gray-800'
    )}>
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/3 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/herobanner.png"
            alt="4X Trading Platform"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#162A2C]/90 to-[#162A2C]/70" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">4X</h1>
              <div className="w-16 h-1 bg-[#98b5a4]"></div>
            </div>

            {/* Hero Content */}
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
              Trade with
              <span className="text-[#98b5a4]"> Confidence</span>
            </h2>
            
            <p className="text-xl text-gray-200 mb-8 max-w-lg">
              {subtitle}
            </p>

            {/* Features */}
            <div className="space-y-4 mb-12">
              {[
                { icon: '🔒', text: 'Bank-level security' },
                { icon: '⚡', text: 'Lightning-fast execution' },
                { icon: '📊', text: 'Advanced analytics' },
                { icon: '🌍', text: 'Global market access' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-gray-200">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Trading Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: '$2.5B+', label: 'Trading Volume' },
                { value: '150K+', label: 'Active Traders' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-[#98b5a4]">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-[#98b5a4]/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-[#98b5a4]/30 rounded-full blur-lg"></div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 lg:w-1/2 xl:w-1/3 relative">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <div className="lg:hidden">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">4X</h1>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              {showLanguageSwitch && (
                <div className="relative">
                  <select
                    value={currentLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value as Language)}
                    className="appearance-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-[#98b5a4] focus:border-[#98b5a4] cursor-pointer"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.code}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Theme Toggle */}
              {showThemeToggle && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle theme"
                >
                  {currentTheme === 'light' ? (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col min-h-screen">
          {/* Spacer for top bar */}
          <div className="h-20"></div>

          {/* Form Container */}
          <div className="flex-1 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {children}
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 4X Trading Platform. All rights reserved.
            </p>
            <div className="mt-2 space-x-4">
              <a
                href="/privacy"
                className="text-xs text-gray-400 hover:text-[#98b5a4] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-xs text-gray-400 hover:text-[#98b5a4] transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/support"
                className="text-xs text-gray-400 hover:text-[#98b5a4] transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Background Pattern */}
        <div className="lg:hidden absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#98b5a4] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#162A2C] rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout 