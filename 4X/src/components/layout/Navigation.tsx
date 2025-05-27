'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { NotificationCenter } from '@/components/ui/NotificationCenter'
import { mockUser } from '@/lib/mockData'

interface NavigationProps {
  className?: string
}

const languages = [
  { code: 'en', flag: '/assets/united-kingdom.png', label: 'EN' },
  { code: 'tr', flag: '/assets/turkey.png', label: 'TR' },
  { code: 'ru', flag: '/assets/russia.png', label: 'RU' }
]

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const pathname = usePathname()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [isDarkMode, setIsDarkMode] = useState(true)

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  const navigationItems = [
    {
      label: 'Market',
      href: '/markets',
      dropdown: [
        { href: '/markets?category=stocks', label: 'Stocks' },
        { href: '/markets?category=crypto', label: 'Crypto' },
        { href: '/markets?category=forex', label: 'Forex' },
        { href: '/markets?category=shares', label: 'Shares' },
        { href: '/markets?category=indices', label: 'Indices' },
        { href: '/markets?category=commodities', label: 'Commodities' }
      ]
    },
    {
      label: 'Charts',
      href: '/charts',
      dropdown: [
        { href: '/demo?section=ai', label: 'Trade AI' },
        { href: '/dashboard?section=community', label: 'Community' },
        { href: '/portfolio?section=copy', label: 'CopyTrading' },
        { href: '/demo?section=education', label: 'Education' }
      ]
    },
    {
      label: 'News',
      href: '/dashboard',
      dropdown: [
        { href: '/dashboard?category=stocks', label: 'Stocks' },
        { href: '/dashboard?category=crypto', label: 'Crypto' },
        { href: '/dashboard?category=forex', label: 'Forex' },
        { href: '/dashboard?category=shares', label: 'Shares' },
        { href: '/dashboard?category=indices', label: 'Indices' },
        { href: '/dashboard?category=commodities', label: 'Commodities' },
        { href: '/dashboard?category=world', label: 'World' }
      ]
    },
    {
      label: 'Brokers',
      href: '/portfolio',
      dropdown: [
        { href: '/portfolio?section=brokers', label: 'Top Brokers' },
        { href: '/markets?section=compare', label: 'Compare' },
        { href: '/dashboard?section=comments', label: 'Comments' }
      ]
    },
    {
      label: 'More',
      href: '/demo',
      dropdown: [
        { href: '/demo?section=about', label: 'About Us' },
        { href: '/demo?section=tutorial', label: 'Tutorial' },
        { href: '/demo?section=pricing', label: 'Pricing' }
      ]
    }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle('dark-mode')
  }

  const setLanguage = (langCode: string) => {
    setCurrentLanguage(langCode)
    setIsLanguageDropdownOpen(false)
  }

  return (
    <header id="header" className="sticky top-0 w-full shadow-md z-50 transition-all duration-300 bg-gradient-to-r from-gray-200 to-transparent">
      <nav 
        id="navbar" 
        className="container mx-auto px-4 flex justify-between items-center py-2"
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Logo */}
        <div className="flex items-center px-4 lg:px-0">
          <Link href="/" data-testid="logo-link">
            <Image 
              id="logoCompany" 
              src="/assets/logo.png" 
              alt="4X Trading Platform" 
              width={48}
              height={48}
              className="w-12 h-12"
              loading="lazy"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links absolute md:static text-black md:min-h-fit min-h-[60vh] left-0 top-[-100%] sm:hide hidden md:block md:w-auto w-full flex items-center px-14 transition-all duration-300">
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 justify-end">
            <li>
              <Link 
                className={`hover:text-black text-xl cursor-pointer ${isActive('/') ? 'text-[#98b5a4]' : ''}`}
                href="/"
              >
                Home
              </Link>
            </li>
            {navigationItems.map((item) => (
              <li key={item.label} className="relative group">
                <Link 
                  className={`hover:text-black text-xl cursor-pointer ${isActive(item.href) ? 'text-[#98b5a4]' : ''}`}
                  href={item.href}
                  aria-haspopup="true" 
                  aria-expanded="false"
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <ul className="absolute w-[150px] -left-10 top-full hidden group-hover:flex flex-col bg-[#1a1a1a] shadow-lg p-3 rounded-md">
                    {item.dropdown.map((dropdownItem, index) => (
                      <li key={`${item.label}-${index}-${dropdownItem.label}`} className="flex flex-row">
                        <Link 
                          className="hover:text-[#02d1fe] text-lg text-black dark:text-white py-1 px-2" 
                          href={dropdownItem.href}
                        >
                          {dropdownItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Dropdown */}
          <div className="dropdown relative inline-block" data-testid="language-selector">
            <button 
              id="dropdownButton" 
              className="search w-8 h-8 flex justify-center items-center cursor-pointer text-[#005450] text-base font-semibold bg-transparent"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              data-testid="language-button"
              aria-label="Select Language"
            >
              <Image 
                id="current-lang-flag" 
                src={currentLang.flag} 
                alt={currentLang.label}
                width={32}
                height={32}
                className="w-8 h-8"
                data-testid="current-language-flag"
              />
            </button>

            {isLanguageDropdownOpen && (
              <div 
                className="dropdown-content absolute w-[150px] top-full -left-12 mt-2 bg-[#1a1a1a] shadow-lg p-3 rounded-md"
                data-testid="language-dropdown"
              >
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)} 
                    className="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-700 rounded"
                  >
                    <Image 
                      className="w-6 h-6" 
                      src={lang.flag} 
                      alt={lang.label}
                      width={24}
                      height={24}
                    />
                    <span className="text-sm font-medium text-lg text-white">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button 
            id="themeToggle" 
            aria-label="Switch Theme" 
            className="w-10 h-10 rounded-full border border-gray-600 flex justify-center items-center"
            onClick={toggleTheme}
            data-testid="theme-toggle"
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
          </button>

          {/* Notifications */}
          <NotificationCenter />

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <img
                className="h-8 w-8 rounded-full"
                src={mockUser.avatar}
                alt={mockUser.name}
              />
              <span className="hidden md:block text-gray-700 dark:text-gray-300">
                {mockUser.name}
              </span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
                >
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {mockUser.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {mockUser.email}
                    </p>
                  </div>
                  
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    👤 Profile Settings
                  </Link>
                  
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    ⚙️ Account Settings
                  </Link>
                  
                  <Link
                    href="/help"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    ❓ Help & Support
                  </Link>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setIsProfileOpen(false)
                        // Add logout logic here
                      }}
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <div className="relative">
            <button 
              className="block sm:hidden text-xl p-2 bg-gray-200 rounded-md" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-button"
              aria-label="Toggle Mobile Menu"
            >
              <i className="fas fa-bars"></i>
            </button>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
              <div className="absolute bg-[#1a1a1a] top-full right-0 mt-2 w-48 shadow-md rounded-md z-50">
                <ul className="p-2 space-y-1">
                  <li>
                    <Link 
                      href="/" 
                      className="block px-4 py-2 hover:text-[#02d1fe] text-lg text-black dark:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  {navigationItems.map((item) => (
                    <li key={item.label}>
                      <Link 
                        href={item.href} 
                        className="block px-4 py-2 hover:text-[#02d1fe] text-lg text-black dark:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}

export default Navigation 