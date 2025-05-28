import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navigation from '@/components/layout/Navigation'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/markets',
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}))

// Mock theme store
jest.mock('@/stores/themeStore', () => ({
  useThemeStore: () => ({
    language: 'en',
    resolvedTheme: 'dark',
    setLanguage: jest.fn(),
    toggleTheme: jest.fn(),
  }),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}))

describe('Navigation', () => {
  it('renders navigation items', () => {
    render(<Navigation />)
    
    // Проверяем desktop меню
    expect(screen.getAllByText('Market')).toHaveLength(2) // desktop + mobile
    expect(screen.getAllByText('Charts')).toHaveLength(2)
    expect(screen.getAllByText('News')).toHaveLength(2)
    expect(screen.getAllByText('Brokers')).toHaveLength(2)
    expect(screen.getAllByText('More')).toHaveLength(2)
  })

  it('renders logo and company name', () => {
    render(<Navigation />)
    
    expect(screen.getByText('4X Trading')).toBeInTheDocument()
    expect(screen.getByText('Professional Platform')).toBeInTheDocument()
    expect(screen.getByAltText('4X Trading Platform')).toBeInTheDocument()
  })

  it('shows language selector', () => {
    render(<Navigation />)
    
    const languageButton = screen.getByLabelText('Select language')
    expect(languageButton).toBeInTheDocument()
  })

  it('shows theme toggle button', () => {
    render(<Navigation />)
    
    const themeButton = screen.getByLabelText(/Switch to .* theme/)
    expect(themeButton).toBeInTheDocument()
  })

  it('shows mobile menu button on mobile', () => {
    render(<Navigation />)
    
    const mobileMenuButton = screen.getByLabelText('Toggle mobile menu')
    expect(mobileMenuButton).toBeInTheDocument()
  })

  it('toggles language dropdown when clicked', () => {
    render(<Navigation />)
    
    const languageButton = screen.getByLabelText('Select language')
    fireEvent.click(languageButton)
    
    expect(screen.getByRole('menu', { name: 'Language selection' })).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('TR')).toBeInTheDocument()
    expect(screen.getByText('RU')).toBeInTheDocument()
  })

  it('renders dropdown menus with proper ARIA attributes', () => {
    render(<Navigation />)
    
    const marketLink = screen.getByRole('menuitem', { name: '📊 Market' })
    expect(marketLink).toHaveAttribute('aria-haspopup', 'true')
    
    const chartsLink = screen.getByRole('menuitem', { name: '📈 Charts' })
    expect(chartsLink).toHaveAttribute('aria-haspopup', 'true')
  })
}) 