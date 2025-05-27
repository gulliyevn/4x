import { render, screen, fireEvent } from '@testing-library/react'
import HeroSection from '@/components/ui/HeroSection'

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('HeroSection', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders the hero section with correct content', () => {
    render(<HeroSection />)
    
    // Check for main title
    expect(screen.getByText('Create Your Reality.')).toBeInTheDocument()
    
    // Check for subtitle
    expect(screen.getByText(/Empower Your Trading with AI-Powered Insights/)).toBeInTheDocument()
    
    // Check for hero image
    const heroImage = screen.getByAltText('Hero Background')
    expect(heroImage).toBeInTheDocument()
    expect(heroImage).toHaveAttribute('src', '/assets/herobanner.png')
  })

  it('renders action buttons with correct text', () => {
    render(<HeroSection />)
    
    const getStartedButton = screen.getByRole('button', { name: /get started/i })
    const chartsButton = screen.getByRole('button', { name: /charts/i })
    
    expect(getStartedButton).toBeInTheDocument()
    expect(chartsButton).toBeInTheDocument()
  })

  it('applies neon title CSS class', () => {
    render(<HeroSection />)
    
    const title = screen.getByText('Create Your Reality.')
    expect(title).toHaveClass('neon-title')
  })

  it('applies neon paragraph CSS class to subtitle', () => {
    render(<HeroSection />)
    
    const subtitle = screen.getByText(/Empower Your Trading with AI-Powered Insights/)
    expect(subtitle).toHaveClass('neon-paragraph')
  })

  it('has proper responsive classes', () => {
    render(<HeroSection />)
    
    const title = screen.getByText('Create Your Reality.')
    expect(title).toHaveClass('text-8xl', 'sm:text-6xl', 'md:text-7xl', 'lg:text-8xl', 'xl:text-8xl')
  })

  it('handles Get Started button click', () => {
    render(<HeroSection />)
    
    const getStartedButton = screen.getByRole('button', { name: /get started/i })
    fireEvent.click(getStartedButton)
    
    // Should navigate to pricing page
    expect(mockPush).toHaveBeenCalledWith('/pricing')
  })

  it('handles Charts button click', () => {
    render(<HeroSection />)
    
    const chartsButton = screen.getByRole('button', { name: /charts/i })
    fireEvent.click(chartsButton)
    
    // Should navigate to charts page
    expect(mockPush).toHaveBeenCalledWith('/charts')
  })

  it('has proper button styling', () => {
    render(<HeroSection />)
    
    const getStartedButton = screen.getByRole('button', { name: /get started/i })
    const chartsButton = screen.getByRole('button', { name: /charts/i })
    
    // Check for consistent button styling
    expect(getStartedButton).toHaveClass('bg-[#98b5a4]', 'hover:bg-[#162A2C]')
    expect(chartsButton).toHaveClass('bg-[#98b5a4]', 'hover:bg-[#162A2C]')
  })

  it('has proper accessibility attributes', () => {
    render(<HeroSection />)
    
    const getStartedButton = screen.getByRole('button', { name: /get started/i })
    const chartsButton = screen.getByRole('button', { name: /charts/i })
    
    expect(getStartedButton).toBeEnabled()
    expect(chartsButton).toBeEnabled()
  })

  it('renders with proper section structure', () => {
    render(<HeroSection />)
    
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('relative')
  })

  it('has proper image overlay styling', () => {
    render(<HeroSection />)
    
    const heroImage = screen.getByAltText('Hero Background')
    expect(heroImage).toHaveClass('w-full', 'h-full', 'object-cover', 'object-center')
  })
}) 