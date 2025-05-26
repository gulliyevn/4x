/**
 * Theme Store
 * 
 * Manages application theme, language, and user preferences
 * with persistence and system theme detection using Zustand.
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { ThemeConfig } from '@/types'

type ThemeMode = 'light' | 'dark' | 'system'
type Language = 'en' | 'tr' | 'ru'

interface UserPreferences {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    priceAlerts: boolean
    news: boolean
    trading: boolean
  }
  trading: {
    defaultLeverage: number
    confirmTrades: boolean
    autoClose: boolean
    showAdvancedOrders: boolean
  }
  dashboard: {
    defaultChartInterval: string
    layout: 'grid' | 'list'
    compactMode: boolean
    showSidebar: boolean
  }
  accessibility: {
    highContrast: boolean
    largeText: boolean
    reduceMotion: boolean
    screenReader: boolean
  }
}

interface ThemeStore {
  // Theme state
  theme: ThemeMode
  resolvedTheme: 'light' | 'dark'
  language: Language
  preferences: UserPreferences
  
  // Theme configuration
  config: ThemeConfig
  
  // System detection
  systemTheme: 'light' | 'dark'
  isSystemThemeSupported: boolean
  
  // Loading states
  isLoading: boolean
  
  // Actions
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
  setLanguage: (language: Language) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  updateNotificationPreferences: (notifications: Partial<UserPreferences['notifications']>) => void
  updateTradingPreferences: (trading: Partial<UserPreferences['trading']>) => void
  updateDashboardPreferences: (dashboard: Partial<UserPreferences['dashboard']>) => void
  updateAccessibilityPreferences: (accessibility: Partial<UserPreferences['accessibility']>) => void
  updateThemeConfig: (config: Partial<ThemeConfig>) => void
  resetToDefaults: () => void
  detectSystemTheme: () => void
}

const DEFAULT_PREFERENCES: UserPreferences = {
  notifications: {
    email: true,
    push: true,
    sms: false,
    priceAlerts: true,
    news: true,
    trading: true,
  },
  trading: {
    defaultLeverage: 1,
    confirmTrades: true,
    autoClose: false,
    showAdvancedOrders: false,
  },
  dashboard: {
    defaultChartInterval: '1h',
    layout: 'grid',
    compactMode: false,
    showSidebar: true,
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    reduceMotion: false,
    screenReader: false,
  },
}

const DEFAULT_THEME_CONFIG: ThemeConfig = {
  mode: 'light',
  primaryColor: '#98b5a4',
  secondaryColor: '#162A2C',
  accentColor: '#02d1fe',
  borderRadius: 8,
  fontSize: 14,
}

// Language translations
const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  tr: 'Türkçe',
  ru: 'Русский',
}

// Detect system theme preference
const detectSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

// Detect system language
const detectSystemLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = navigator.language.split('-')[0] as Language
  return ['en', 'tr', 'ru'].includes(browserLang) ? browserLang : 'en'
}

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        theme: 'system',
        resolvedTheme: 'light',
        language: 'en',
        preferences: DEFAULT_PREFERENCES,
        config: DEFAULT_THEME_CONFIG,
        systemTheme: 'light',
        isSystemThemeSupported: false,
        isLoading: false,

        // Actions
        setTheme: (theme: ThemeMode) => {
          set((state) => {
            state.theme = theme
            
            // Update resolved theme
            if (theme === 'system') {
              state.resolvedTheme = state.systemTheme
            } else {
              state.resolvedTheme = theme
            }
            
            // Update theme config
            state.config.mode = state.resolvedTheme
          })

          // Apply theme to document
          const { resolvedTheme } = get()
          document.documentElement.setAttribute('data-theme', resolvedTheme)
          document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
        },

        toggleTheme: () => {
          const { theme, resolvedTheme } = get()
          
          if (theme === 'system') {
            // If system theme, switch to opposite of current resolved theme
            get().setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
          } else {
            // Toggle between light and dark
            get().setTheme(theme === 'dark' ? 'light' : 'dark')
          }
        },

        setLanguage: (language: Language) => {
          set((state) => {
            state.language = language
          })

          // Update document language
          document.documentElement.lang = language
          
          // Dispatch language change event for i18n
          window.dispatchEvent(new CustomEvent('languageChange', { detail: { language } }))
        },

        updatePreferences: (preferenceUpdates: Partial<UserPreferences>) => {
          set((state) => {
            state.preferences = { ...state.preferences, ...preferenceUpdates }
          })
        },

        updateNotificationPreferences: (notifications: Partial<UserPreferences['notifications']>) => {
          set((state) => {
            state.preferences.notifications = { ...state.preferences.notifications, ...notifications }
          })
        },

        updateTradingPreferences: (trading: Partial<UserPreferences['trading']>) => {
          set((state) => {
            state.preferences.trading = { ...state.preferences.trading, ...trading }
          })
        },

        updateDashboardPreferences: (dashboard: Partial<UserPreferences['dashboard']>) => {
          set((state) => {
            state.preferences.dashboard = { ...state.preferences.dashboard, ...dashboard }
          })
        },

        updateAccessibilityPreferences: (accessibility: Partial<UserPreferences['accessibility']>) => {
          set((state) => {
            state.preferences.accessibility = { ...state.preferences.accessibility, ...accessibility }
          })

          // Apply accessibility settings to document
          const { preferences } = get()
          document.documentElement.classList.toggle('high-contrast', preferences.accessibility.highContrast)
          document.documentElement.classList.toggle('large-text', preferences.accessibility.largeText)
          document.documentElement.classList.toggle('reduce-motion', preferences.accessibility.reduceMotion)
        },

        updateThemeConfig: (configUpdates: Partial<ThemeConfig>) => {
          set((state) => {
            state.config = { ...state.config, ...configUpdates }
          })

          // Apply custom CSS properties
          const { config } = get()
          const root = document.documentElement
          root.style.setProperty('--color-primary', config.primaryColor)
          root.style.setProperty('--color-secondary', config.secondaryColor)
          root.style.setProperty('--color-accent', config.accentColor)
          root.style.setProperty('--border-radius', `${config.borderRadius}px`)
          root.style.setProperty('--font-size-base', `${config.fontSize}px`)
        },

        resetToDefaults: () => {
          set((state) => {
            state.theme = 'system'
            state.language = detectSystemLanguage()
            state.preferences = DEFAULT_PREFERENCES
            state.config = DEFAULT_THEME_CONFIG
            state.resolvedTheme = state.systemTheme
          })

          // Reapply theme and language
          get().setTheme('system')
          get().setLanguage(get().language)
        },

        detectSystemTheme: () => {
          const systemTheme = detectSystemTheme()
          
          set((state) => {
            state.systemTheme = systemTheme
            state.isSystemThemeSupported = typeof window !== 'undefined' && 
              window.matchMedia && 
              typeof window.matchMedia('(prefers-color-scheme: dark)').matches === 'boolean'
            
            // Update resolved theme if using system theme
            if (state.theme === 'system') {
              state.resolvedTheme = systemTheme
              state.config.mode = systemTheme
            }
          })

          // Apply theme if using system theme
          const { theme } = get()
          if (theme === 'system') {
            document.documentElement.setAttribute('data-theme', systemTheme)
            document.documentElement.classList.toggle('dark', systemTheme === 'dark')
          }
        },
      })),
      {
        name: 'theme-storage',
        partialize: (state) => ({
          theme: state.theme,
          language: state.language,
          preferences: state.preferences,
          config: state.config,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            // Detect system theme on app initialization
            state.detectSystemTheme()
            
            // Apply persisted theme
            state.setTheme(state.theme)
            
            // Apply persisted language
            state.setLanguage(state.language)
            
            // Apply accessibility preferences
            state.updateAccessibilityPreferences(state.preferences.accessibility)
            
            // Apply theme config
            state.updateThemeConfig(state.config)
          }
        },
      }
    ),
    {
      name: 'theme-store',
    }
  )
)

// Listen for system theme changes
if (typeof window !== 'undefined' && window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  const handleSystemThemeChange = () => {
    useThemeStore.getState().detectSystemTheme()
  }
  
  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleSystemThemeChange)
  } else {
    // Legacy browsers
    mediaQuery.addListener(handleSystemThemeChange)
  }
}

// Export language utilities
export { LANGUAGE_NAMES, type Language, type ThemeMode, type UserPreferences } 