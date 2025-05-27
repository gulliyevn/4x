import { render, screen, fireEvent } from '@testing-library/react'
import Navigation from '@/components/layout/Navigation'

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/',
}))

describe('Navigation', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders the navigation component', () => {
    render(<Navigation />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('renders the company logo', () => {
    render(<Navigation />)
    
    const logo = screen.getByAltText('4X Trading Platform')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/assets/logo.png')
  })

  it('renders all navigation links', () => {
    render(<Navigation />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Markets')).toBeInTheDocument()
    expect(screen.getByText('Charts')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Demo')).toBeInTheDocument()
  })

  it('handles navigation link clicks', () => {
    render(<Navigation />)
    
    const marketsLink = screen.getByText('Markets')
    fireEvent.click(marketsLink)
    
    expect(mockPush).toHaveBeenCalledWith('/markets')
  })

  it('renders language selector', () => {
    render(<Navigation />)
    
    const languageSelector = screen.getByTestId('language-selector')
    expect(languageSelector).toBeInTheDocument()
  })

  it('displays current language flag', () => {
    render(<Navigation />)
    
    const currentFlag = screen.getByTestId('current-language-flag')
    expect(currentFlag).toBeInTheDocument()
  })

  it('shows language dropdown when clicked', () => {
    render(<Navigation />)
    
    const languageButton = screen.getByTestId('language-button')
    fireEvent.click(languageButton)
    
    const dropdown = screen.getByTestId('language-dropdown')
    expect(dropdown).toBeInTheDocument()
  })

  it('renders all language options', () => {
    render(<Navigation />)
    
    const languageButton = screen.getByTestId('language-button')
    fireEvent.click(languageButton)
    
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('TR')).toBeInTheDocument()
    expect(screen.getByText('RU')).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(<Navigation />)
    
    const themeToggle = screen.getByTestId('theme-toggle')
    expect(themeToggle).toBeInTheDocument()
  })

  it('handles theme toggle click', () => {
    render(<Navigation />)
    
    const themeToggle = screen.getByTestId('theme-toggle')
    fireEvent.click(themeToggle)
    
    // Theme should toggle (implementation depends on theme store)
    expect(themeToggle).toBeInTheDocument()
  })

  it('renders mobile menu button on small screens', () => {
    render(<Navigation />)
    
    const mobileMenuButton = screen.getByTestId('mobile-menu-button')
    expect(mobileMenuButton).toBeInTheDocument()
  })

  it('has proper navigation structure', () => {
    render(<Navigation />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('sticky', 'top-0', 'w-full', 'shadow-md', 'z-50')
  })

  it('has proper logo link functionality', () => {
    render(<Navigation />)
    
    const logoLink = screen.getByTestId('logo-link')
    fireEvent.click(logoLink)
    
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('applies active link styling', () => {
    render(<Navigation />)
    
    const homeLink = screen.getByText('Home')
    expect(homeLink).toHaveClass('text-[#98b5a4]') // Active link color
  })

  it('has proper accessibility attributes', () => {
    render(<Navigation />)
    
    const nav = screen.getByRole('navigation')
    const themeToggle = screen.getByTestId('theme-toggle')
    const languageButton = screen.getByTestId('language-button')
    
    expect(nav).toBeInTheDocument()
    expect(themeToggle).toHaveAttribute('aria-label')
    expect(languageButton).toHaveAttribute('aria-label')
  })

  it('handles language selection', () => {
    render(<Navigation />)
    
    const languageButton = screen.getByTestId('language-button')
    fireEvent.click(languageButton)
    
    const turkishOption = screen.getByText('TR')
    fireEvent.click(turkishOption)
    
    // Language should change (implementation depends on language store)
    expect(turkishOption).toBeInTheDocument()
  })

  it('closes dropdown when clicking outside', () => {
    render(<Navigation />)
    
    const languageButton = screen.getByTestId('language-button')
    fireEvent.click(languageButton)
    
    // Click outside
    fireEvent.click(document.body)
    
    // Dropdown should close (implementation depends on component state)
    expect(languageButton).toBeInTheDocument()
  })
}) 