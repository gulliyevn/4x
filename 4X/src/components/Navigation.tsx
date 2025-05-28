'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [isScrolled, setIsScrolled] = useState(false)

  // New Dark Mode Logic - Clean Implementation
  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return

    // Get initial theme state
    const getInitialTheme = () => {
      // Check localStorage first
      const savedTheme = localStorage.getItem('4x-theme')
      if (savedTheme) {
        return savedTheme === 'dark'
      }
      
      // Fall back to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // Apply theme to document
    const applyTheme = (dark: boolean) => {
      const root = document.documentElement
      
      if (dark) {
        root.classList.remove('light')
        root.classList.add('dark')
        root.setAttribute('data-theme', 'dark')
      } else {
        root.classList.remove('dark')
        root.classList.add('light')
        root.setAttribute('data-theme', 'light')
      }
    }

    // Initialize theme
    const initialDarkMode = getInitialTheme()
    setIsDarkMode(initialDarkMode)
    applyTheme(initialDarkMode)

    // Save initial preference
    localStorage.setItem('4x-theme', initialDarkMode ? 'dark' : 'light')

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference recently
      const lastManualChange = localStorage.getItem('4x-theme-manual')
      const now = Date.now()
      
      if (!lastManualChange || (now - parseInt(lastManualChange)) > 24 * 60 * 60 * 1000) {
        const systemDark = e.matches
        setIsDarkMode(systemDark)
        applyTheme(systemDark)
        localStorage.setItem('4x-theme', systemDark ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    
    // Apply theme immediately
    const root = document.documentElement
    if (newDarkMode) {
      root.classList.remove('light')
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      root.setAttribute('data-theme', 'light')
    }
    
    // Save preference
    localStorage.setItem('4x-theme', newDarkMode ? 'dark' : 'light')
    localStorage.setItem('4x-theme-manual', Date.now().toString())
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initialize language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang)
    localStorage.setItem('language', lang)
    // Here you would implement actual language switching logic
  }

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Handle dropdown hover
  const handleDropdownEnter = (dropdown: string) => {
    setActiveDropdown(dropdown)
  }

  const handleDropdownLeave = () => {
    setActiveDropdown(null)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-toggle')) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  const languages = [
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'tr', flag: '🇹🇷', name: 'Türkçe' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский' }
  ]

  return (
    <>
      <nav className={`navigation-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <div className="logo-content">
              <Image
                src="/favicon.ico"
                alt="4X Logo"
                width={32}
                height={32}
                className="logo-icon"
              />
              <div className="logo-text">
                <span className="logo-title">4X Analytics</span>
                <span className="nav-logo-subtitle">Create Your Reality</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-menu">
            {/* AI Intelligence */}
            <li 
              className="nav-item"
              onMouseEnter={() => handleDropdownEnter('ai')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="nav-link">
                <span className="nav-link-icon">🤖</span>
                AI INTELLIGENCE
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'ai' ? 'show' : ''}`}>
                <Link href="/ai-insights" className="dropdown-item">
                  <span className="dropdown-icon">🧠</span>
                  <div>
                    <span className="dropdown-title">AI Dashboard</span>
                    <span className="dropdown-desc">Comprehensive AI analytics</span>
                  </div>
                </Link>
                <Link href="/ai-insights/predictions" className="dropdown-item">
                  <span className="dropdown-icon">🔮</span>
                  <div>
                    <span className="dropdown-title">Price Predictions</span>
                    <span className="dropdown-desc">94.7% accuracy rate</span>
                  </div>
                </Link>
                <Link href="/ai-insights/sentiment-analysis" className="dropdown-item">
                  <span className="dropdown-icon">📊</span>
                  <div>
                    <span className="dropdown-title">Sentiment Analysis</span>
                    <span className="dropdown-desc">Real-time market sentiment</span>
                  </div>
                </Link>
                <Link href="/ai-insights/pattern-recognition" className="dropdown-item">
                  <span className="dropdown-icon">🎯</span>
                  <div>
                    <span className="dropdown-title">Pattern Recognition</span>
                    <span className="dropdown-desc">50+ chart patterns</span>
                  </div>
                </Link>
                <Link href="/ai-insights/risk-assessment" className="dropdown-item">
                  <span className="dropdown-icon">⚠️</span>
                  <div>
                    <span className="dropdown-title">Risk Assessment</span>
                    <span className="dropdown-desc">Advanced VaR models</span>
                  </div>
                </Link>
                <Link href="/ai-insights/trading-signals" className="dropdown-item">
                  <span className="dropdown-icon">📡</span>
                  <div>
                    <span className="dropdown-title">Trading Signals</span>
                    <span className="dropdown-desc">87% win rate</span>
                  </div>
                </Link>
              </div>
            </li>

            {/* Markets */}
            <li 
              className="nav-item"
              onMouseEnter={() => handleDropdownEnter('markets')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="nav-link">
                <span className="nav-link-icon">📊</span>
                MARKETS
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'markets' ? 'show' : ''}`}>
                <Link href="/markets/stocks" className="dropdown-item">
                  <span className="dropdown-icon">📈</span>
                  <div>
                    <span className="dropdown-title">Stocks</span>
                    <span className="dropdown-desc">10,000+ stocks, 50+ exchanges</span>
                  </div>
                </Link>
                <Link href="/markets/cryptocurrency" className="dropdown-item">
                  <span className="dropdown-icon">₿</span>
                  <div>
                    <span className="dropdown-title">Cryptocurrency</span>
                    <span className="dropdown-desc">5,000+ cryptos, DeFi analytics</span>
                  </div>
                </Link>
                <Link href="/markets/forex" className="dropdown-item">
                  <span className="dropdown-icon">💱</span>
                  <div>
                    <span className="dropdown-title">Forex</span>
                    <span className="dropdown-desc">100+ pairs, central bank data</span>
                  </div>
                </Link>
                <Link href="/markets/commodities" className="dropdown-item">
                  <span className="dropdown-icon">🥇</span>
                  <div>
                    <span className="dropdown-title">Commodities</span>
                    <span className="dropdown-desc">50+ commodities</span>
                  </div>
                </Link>
                <Link href="/markets/indices" className="dropdown-item">
                  <span className="dropdown-icon">📊</span>
                  <div>
                    <span className="dropdown-title">Indices</span>
                    <span className="dropdown-desc">100+ global indices</span>
                  </div>
                </Link>
                <Link href="/markets/options" className="dropdown-item">
                  <span className="dropdown-icon">📋</span>
                  <div>
                    <span className="dropdown-title">Options</span>
                    <span className="dropdown-desc">1M+ contracts</span>
                  </div>
                </Link>
              </div>
            </li>

            {/* Charts & Tools */}
            <li 
              className="nav-item"
              onMouseEnter={() => handleDropdownEnter('charts')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="nav-link">
                <span className="nav-link-icon">📈</span>
                CHARTS & TOOLS
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'charts' ? 'show' : ''}`}>
                <Link href="/charts" className="dropdown-item">
                  <span className="dropdown-icon">📊</span>
                  <div>
                    <span className="dropdown-title">Advanced Charts</span>
                    <span className="dropdown-desc">100+ indicators</span>
                  </div>
                </Link>
                <Link href="/tools/calculators" className="dropdown-item">
                  <span className="dropdown-icon">🧮</span>
                  <div>
                    <span className="dropdown-title">Calculators</span>
                    <span className="dropdown-desc">Risk & profit calculators</span>
                  </div>
                </Link>
                <Link href="/tools/screeners" className="dropdown-item">
                  <span className="dropdown-icon">🔍</span>
                  <div>
                    <span className="dropdown-title">Market Screeners</span>
                    <span className="dropdown-desc">AI-powered screening</span>
                  </div>
                </Link>
                <Link href="/tools/alerts" className="dropdown-item">
                  <span className="dropdown-icon">🔔</span>
                  <div>
                    <span className="dropdown-title">Smart Alerts</span>
                    <span className="dropdown-desc">Real-time notifications</span>
                  </div>
                </Link>
              </div>
            </li>

            {/* News & Analysis */}
            <li 
              className="nav-item"
              onMouseEnter={() => handleDropdownEnter('news')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="nav-link">
                <span className="nav-link-icon">📰</span>
                NEWS & ANALYSIS
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'news' ? 'show' : ''}`}>
                <Link href="/news" className="dropdown-item">
                  <span className="dropdown-icon">📰</span>
                  <div>
                    <span className="dropdown-title">Market News</span>
                    <span className="dropdown-desc">Real-time financial news</span>
                  </div>
                </Link>
                <Link href="/analysis" className="dropdown-item">
                  <span className="dropdown-icon">📊</span>
                  <div>
                    <span className="dropdown-title">Market Analysis</span>
                    <span className="dropdown-desc">Expert insights</span>
                  </div>
                </Link>
                <Link href="/calendar" className="dropdown-item">
                  <span className="dropdown-icon">📅</span>
                  <div>
                    <span className="dropdown-title">Economic Calendar</span>
                    <span className="dropdown-desc">Key events & releases</span>
                  </div>
                </Link>
              </div>
            </li>

            {/* Education */}
            <li 
              className="nav-item"
              onMouseEnter={() => handleDropdownEnter('education')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="nav-link">
                <span className="nav-link-icon">📚</span>
                EDUCATION
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'education' ? 'show' : ''}`}>
                <Link href="/education" className="dropdown-item">
                  <span className="dropdown-icon">🎓</span>
                  <div>
                    <span className="dropdown-title">Trading Academy</span>
                    <span className="dropdown-desc">Comprehensive courses</span>
                  </div>
                </Link>
                <Link href="/education/ai-trading" className="dropdown-item">
                  <span className="dropdown-icon">🤖</span>
                  <div>
                    <span className="dropdown-title">AI Trading Course</span>
                    <span className="dropdown-desc">Learn AI-powered trading</span>
                  </div>
                </Link>
                <Link href="/education/webinars" className="dropdown-item">
                  <span className="dropdown-icon">🎥</span>
                  <div>
                    <span className="dropdown-title">Live Webinars</span>
                    <span className="dropdown-desc">Expert-led sessions</span>
                  </div>
                </Link>
              </div>
            </li>
          </ul>

          {/* Right Side Actions */}
          <div className="nav-actions">
            {/* Language Selector */}
            <div className="language-dropdown">
              <button className="nav-button language-btn">
                <span className="language-flag">
                  {languages.find(lang => lang.code === currentLanguage)?.flag}
                </span>
                <span className="language-code">{currentLanguage.toUpperCase()}</span>
              </button>
              <div className="language-dropdown-menu">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`language-item ${currentLanguage === lang.code ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <span className="language-flag">{lang.flag}</span>
                    <span className="language-name">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button 
              className="nav-button theme-toggle"
              onClick={toggleTheme}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <span className="theme-icon">
                {isDarkMode ? '☀️' : '🌙'}
              </span>
            </button>

            {/* Login Button */}
            <Link href="/auth/login" className="btn btn-primary btn-sm">
              Login
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className={`mobile-menu-button ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-list">
          <div className="mobile-menu-item">
            <Link href="/ai-insights" className="mobile-menu-link" onClick={toggleMenu}>
              <span className="mobile-menu-icon">🤖</span>
              AI Intelligence
            </Link>
          </div>
          <div className="mobile-menu-item">
            <Link href="/markets" className="mobile-menu-link" onClick={toggleMenu}>
              <span className="mobile-menu-icon">📊</span>
              Markets
            </Link>
          </div>
          <div className="mobile-menu-item">
            <Link href="/charts" className="mobile-menu-link" onClick={toggleMenu}>
              <span className="mobile-menu-icon">📈</span>
              Charts & Tools
            </Link>
          </div>
          <div className="mobile-menu-item">
            <Link href="/news" className="mobile-menu-link" onClick={toggleMenu}>
              <span className="mobile-menu-icon">📰</span>
              News & Analysis
            </Link>
          </div>
          <div className="mobile-menu-item">
            <Link href="/education" className="mobile-menu-link" onClick={toggleMenu}>
              <span className="mobile-menu-icon">📚</span>
              Education
            </Link>
          </div>
          <div className="mobile-menu-item">
            <Link href="/auth/login" className="mobile-menu-link" onClick={toggleMenu}>
              <span className="mobile-menu-icon">🔐</span>
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      <div className={`mobile-backdrop ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
    </>
  )
}

export default Navigation 