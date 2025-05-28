import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Navigation } from '@/components/layout/Navigation'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/markets',
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
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
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Market')).toBeInTheDocument()
    expect(screen.getByText('Charts')).toBeInTheDocument()
    expect(screen.getByText('News')).toBeInTheDocument()
    expect(screen.getByText('Brokers')).toBeInTheDocument()
    expect(screen.getByText('More')).toBeInTheDocument()
  })

  it('highlights active navigation item', () => {
    render(<Navigation />)
    
    const marketsLink = screen.getByText('Market').closest('a')
    expect(marketsLink).toHaveClass('text-[#98b5a4]')
  })

  it('shows language selector', () => {
    render(<Navigation />)
    
    const languageButton = screen.getByTestId('language-button')
    expect(languageButton).toBeInTheDocument()
  })

  it('toggles language dropdown when clicked', () => {
    render(<Navigation />)
    
    const languageButton = screen.getByTestId('language-button')
    fireEvent.click(languageButton)
    
    expect(screen.getByTestId('language-dropdown')).toBeInTheDocument()
  })

  it('renders logo with correct link', () => {
    render(<Navigation />)
    
    const logoLink = screen.getByTestId('logo-link')
    expect(logoLink).toHaveAttribute('href', '/')
  })
}) 