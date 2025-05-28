'use client'

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useThemeStore } from '@/stores/themeStore';

const Navigation = React.memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Theme store integration
  const { 
    language, 
    resolvedTheme, 
    setLanguage, 
    toggleTheme 
  } = useThemeStore();

  // Scroll detection for enhanced header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimized handlers with useCallback
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const toggleLangDropdown = useCallback(() => {
    setIsLangDropdownOpen(prev => !prev);
  }, []);

  const handleLanguageChange = useCallback((lang: 'en' | 'tr' | 'ru') => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  }, [setLanguage]);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-dropdown')) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Language flag mapping
  const getFlagSrc = (lang: string) => {
    const flags = {
      en: '/assets/united-kingdom.png',
      tr: '/assets/turkey.png',
      ru: '/assets/russia.png'
    };
    return flags[lang as keyof typeof flags] || flags.en;
  };

  return (
    <header className={`navigation-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        
        {/* LOGO SECTION */}
        <Link href="/" className="nav-logo">
          <div className="flex items-center space-x-3">
            <Image 
              src="/assets/logo.png" 
              alt="4X Trading Platform" 
              width={48} 
              height={48}
              className="nav-logo-image w-12 h-12"
            />
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-white tracking-tight">
                4X Trading
              </div>
              <div className="nav-logo-subtitle">
                Professional Platform
              </div>
            </div>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION MENU */}
        <ul className="nav-menu">
          
          {/* MARKET DROPDOWN */}
          <li className="nav-item">
            <Link href="/markets" className="nav-link" role="menuitem" aria-haspopup="true">
              <span className="nav-link-icon">📊</span>
              <span>Market</span>
            </Link>
            <div className="dropdown-menu" role="menu" aria-label="Market submenu">
              <Link href="/markets/stocks" className="dropdown-item" role="menuitem">Stocks</Link>
              <Link href="/markets/crypto" className="dropdown-item" role="menuitem">Cryptocurrency</Link>
              <Link href="/markets/forex" className="dropdown-item" role="menuitem">Forex</Link>
              <Link href="/markets/shares" className="dropdown-item" role="menuitem">Shares</Link>
              <Link href="/markets/indices" className="dropdown-item" role="menuitem">Indices</Link>
              <Link href="/markets/commodities" className="dropdown-item" role="menuitem">Commodities</Link>
            </div>
          </li>

          {/* CHARTS DROPDOWN */}
          <li className="nav-item">
            <Link href="/charts" className="nav-link" role="menuitem" aria-haspopup="true">
              <span className="nav-link-icon">📈</span>
              <span>Charts</span>
            </Link>
            <div className="dropdown-menu" role="menu" aria-label="Charts submenu">
              <Link href="/charts/ai-trader" className="dropdown-item" role="menuitem">AI Trading Assistant</Link>
              <Link href="/charts/community" className="dropdown-item" role="menuitem">Community Charts</Link>
              <Link href="/charts/copy-trading" className="dropdown-item" role="menuitem">Copy Trading</Link>
              <Link href="/charts/education" className="dropdown-item" role="menuitem">Educational Resources</Link>
            </div>
          </li>

          {/* NEWS DROPDOWN */}
          <li className="nav-item">
            <Link href="/news" className="nav-link" role="menuitem" aria-haspopup="true">
              <span className="nav-link-icon">📰</span>
              <span>News</span>
            </Link>
            <div className="dropdown-menu" role="menu" aria-label="News submenu">
              <Link href="/news/stocks" className="dropdown-item" role="menuitem">Stock News</Link>
              <Link href="/news/crypto" className="dropdown-item" role="menuitem">Crypto News</Link>
              <Link href="/news/forex" className="dropdown-item" role="menuitem">Forex News</Link>
              <Link href="/news/shares" className="dropdown-item" role="menuitem">Share Analysis</Link>
              <Link href="/news/indices" className="dropdown-item" role="menuitem">Index Updates</Link>
              <Link href="/news/commodities" className="dropdown-item" role="menuitem">Commodity Reports</Link>
              <Link href="/news/world" className="dropdown-item" role="menuitem">Global Markets</Link>
            </div>
          </li>

          {/* BROKERS DROPDOWN */}
          <li className="nav-item">
            <Link href="/brokers" className="nav-link" role="menuitem" aria-haspopup="true">
              <span className="nav-link-icon">🏢</span>
              <span>Brokers</span>
            </Link>
            <div className="dropdown-menu" role="menu" aria-label="Brokers submenu">
              <Link href="/brokers" className="dropdown-item" role="menuitem">Top Rated Brokers</Link>
              <Link href="/brokers/compare" className="dropdown-item" role="menuitem">Compare Brokers</Link>
              <Link href="/brokers/comments" className="dropdown-item" role="menuitem">Reviews & Comments</Link>
            </div>
          </li>

          {/* MORE DROPDOWN */}
          <li className="nav-item">
            <Link href="/more" className="nav-link" role="menuitem" aria-haspopup="true">
              <span className="nav-link-icon">⚡</span>
              <span>More</span>
            </Link>
            <div className="dropdown-menu" role="menu" aria-label="More submenu">
              <Link href="/about" className="dropdown-item" role="menuitem">About Platform</Link>
              <Link href="/tutorial" className="dropdown-item" role="menuitem">Trading Tutorial</Link>
              <Link href="/pricing" className="dropdown-item" role="menuitem">Pricing Plans</Link>
            </div>
          </li>
        </ul>

        {/* RIGHT SIDE ACTIONS */}
        <div className="nav-actions">
          
          {/* LANGUAGE DROPDOWN */}
          <div className={`language-dropdown ${isLangDropdownOpen ? 'open' : ''}`}>
            <button 
              onClick={toggleLangDropdown}
              className="nav-button"
              aria-label="Select language"
              aria-haspopup="true"
              aria-expanded={isLangDropdownOpen}
            >
              <Image 
                src={getFlagSrc(language)}
                alt={language.toUpperCase()}
                width={20}
                height={20}
                className="language-flag"
              />
            </button>

            <div className="language-dropdown-menu" role="menu" aria-label="Language selection">
              <button 
                onClick={() => handleLanguageChange('en')} 
                className="language-item"
                role="menuitem"
              >
                <Image src="/assets/united-kingdom.png" alt="English" width={20} height={20} className="language-flag" />
                <span>EN</span>
              </button>
              <button 
                onClick={() => handleLanguageChange('tr')} 
                className="language-item"
                role="menuitem"
              >
                <Image src="/assets/turkey.png" alt="Türkçe" width={20} height={20} className="language-flag" />
                <span>TR</span>
              </button>
              <button 
                onClick={() => handleLanguageChange('ru')} 
                className="language-item"
                role="menuitem"
              >
                <Image src="/assets/russia.png" alt="Русский" width={20} height={20} className="language-flag" />
                <span>RU</span>
              </button>
            </div>
          </div>

          {/* THEME TOGGLE */}
          <button 
            onClick={toggleTheme}
            className="nav-button"
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <i className={`fas ${resolvedTheme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          {/* MOBILE MENU BUTTON */}
          <button 
            onClick={toggleMobileMenu}
            className="mobile-menu-button"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* MOBILE BACKDROP */}
        {isMobileMenuOpen && (
          <div 
            className={`mobile-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={handleMobileMenuClose}
            aria-hidden="true"
          />
        )}
        
        {/* MOBILE DROPDOWN MENU */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-menu-list">
            <li className="mobile-menu-item">
              <Link 
                href="/markets" 
                className="mobile-menu-link" 
                onClick={handleMobileMenuClose}
              >
                <span>📊</span>
                <span>Market</span>
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link 
                href="/charts" 
                className="mobile-menu-link" 
                onClick={handleMobileMenuClose}
              >
                <span>📈</span>
                <span>Charts</span>
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link 
                href="/news" 
                className="mobile-menu-link" 
                onClick={handleMobileMenuClose}
              >
                <span>📰</span>
                <span>News</span>
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link 
                href="/brokers" 
                className="mobile-menu-link" 
                onClick={handleMobileMenuClose}
              >
                <span>🏢</span>
                <span>Brokers</span>
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link 
                href="/more" 
                className="mobile-menu-link" 
                onClick={handleMobileMenuClose}
              >
                <span>⚡</span>
                <span>More</span>
              </Link>
            </li>
          </ul>
        </div>

      </nav>
    </header>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation; 