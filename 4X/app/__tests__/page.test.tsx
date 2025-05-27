import { render, screen } from '@testing-library/react'
import HomePage from '../page'

// Mock the components
jest.mock('@/components/ui/MarketTicker', () => {
  return function MockMarketTicker() {
    return <div data-testid="market-ticker">Market Ticker</div>
  }
})

jest.mock('@/components/ui/HeroSection', () => {
  return function MockHeroSection() {
    return <div data-testid="hero-section">Hero Section</div>
  }
})

jest.mock('@/components/ui/ServicesSection', () => {
  return function MockServicesSection() {
    return <div data-testid="services-section">Services Section</div>
  }
})

// Mock Chart components
jest.mock('@/components/ui/Charts', () => ({
  AreaChart: () => <div data-testid="area-chart">Area Chart</div>,
  PieChart: () => <div data-testid="pie-chart">Pie Chart</div>,
}))

// Mock PriceDisplay
jest.mock('@/components/ui/PriceDisplay', () => {
  return function MockPriceDisplay() {
    return <div data-testid="price-display">Price Display</div>
  }
})

describe('HomePage', () => {
  it('renders the homepage without crashing', () => {
    render(<HomePage />)
    
    expect(screen.getByTestId('homepage')).toBeInTheDocument()
  })

  it('renders the market ticker section', () => {
    render(<HomePage />)
    
    expect(screen.getByTestId('market-ticker')).toBeInTheDocument()
  })

  it('renders the hero section', () => {
    render(<HomePage />)
    
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })

  it('renders the services section', () => {
    render(<HomePage />)
    
    expect(screen.getByTestId('services-section')).toBeInTheDocument()
  })

  it('renders the market section with title', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Market')).toBeInTheDocument()
  })

  it('renders price displays', () => {
    render(<HomePage />)
    
    const priceDisplays = screen.getAllByTestId('price-display')
    expect(priceDisplays.length).toBeGreaterThan(0)
  })

  it('renders market charts', () => {
    render(<HomePage />)
    
    expect(screen.getByTestId('area-chart')).toBeInTheDocument()
  })

  it('renders the portfolio section with title', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
  })

  it('renders portfolio charts', () => {
    render(<HomePage />)
    
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument()
  })

  it('renders the stats section', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Create Your Reality with 4X')).toBeInTheDocument()
  })

  it('displays platform statistics', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Active Users')).toBeInTheDocument()
    expect(screen.getByText('AI Accuracy')).toBeInTheDocument()
    expect(screen.getByText('Signals Processed')).toBeInTheDocument()
    expect(screen.getByText('Avg Profit per Trade')).toBeInTheDocument()
  })

  it('renders the CTA section', () => {
    render(<HomePage />)
    
    expect(screen.getByText(/Dominate the Market/)).toBeInTheDocument()
    expect(screen.getByText(/Start Winning Today/)).toBeInTheDocument()
  })

  it('has proper page structure with main container', () => {
    render(<HomePage />)
    
    const homepage = screen.getByTestId('homepage')
    expect(homepage).toBeInTheDocument()
    expect(homepage).toHaveClass('min-h-screen')
  })

  it('renders with proper spacing and layout classes', () => {
    render(<HomePage />)
    
    const homepage = screen.getByTestId('homepage')
    expect(homepage).toHaveClass('min-h-screen')
  })

  it('includes all major sections in correct order', () => {
    render(<HomePage />)
    
    const homepage = screen.getByTestId('homepage')
    const sections = homepage.children
    
    // Should have multiple sections
    expect(sections.length).toBeGreaterThan(5)
  })

  it('has proper responsive design classes', () => {
    render(<HomePage />)
    
    const marketSection = screen.getByText('Market').closest('section')
    expect(marketSection).toHaveClass('container', 'mx-auto', 'px-6')
  })

  it('renders market data with proper grid layout', () => {
    render(<HomePage />)
    
    const priceGrid = screen.getByTestId('price-grid')
    expect(priceGrid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  })

  it('renders portfolio section with proper layout', () => {
    render(<HomePage />)
    
    const portfolioSection = screen.getByText('Portfolio').closest('section')
    expect(portfolioSection).toBeInTheDocument()
  })
}) 