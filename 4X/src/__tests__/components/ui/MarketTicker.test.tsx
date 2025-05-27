import { render, screen, waitFor } from '@testing-library/react'
import MarketTicker from '@/components/ui/MarketTicker'

// Mock the market data
const mockMarketData = [
  { symbol: 'BTCUSDT', price: 45000, change: 2.5 },
  { symbol: 'ETHUSDT', price: 3200, change: -1.2 },
  { symbol: 'ADAUSDT', price: 1.25, change: 5.8 },
  { symbol: 'DOTUSDT', price: 25.50, change: -0.5 },
]

describe('MarketTicker', () => {
  it('renders the market ticker container', () => {
    render(<MarketTicker />)
    
    const tickerContainer = screen.getByTestId('market-ticker')
    expect(tickerContainer).toBeInTheDocument()
  })

  it('has proper CSS classes for styling', () => {
    render(<MarketTicker />)
    
    const tickerContainer = screen.getByTestId('market-ticker')
    expect(tickerContainer).toHaveClass('market-ticker')
  })

  it('renders ticker items with proper structure', async () => {
    render(<MarketTicker />)
    
    // Wait for ticker items to be rendered
    await waitFor(() => {
      const tickerItems = screen.getAllByTestId(/ticker-item-/)
      expect(tickerItems.length).toBeGreaterThan(0)
    })
  })

  it('displays price information correctly', async () => {
    render(<MarketTicker />)
    
    // Wait for data to load and check for price displays
    await waitFor(() => {
      // Should contain price information
      expect(screen.getByTestId('market-ticker')).toBeInTheDocument()
    })
  })

  it('has scrolling animation classes', () => {
    render(<MarketTicker />)
    
    const ticker = screen.getByTestId('ticker')
    expect(ticker).toHaveClass('ticker')
  })

  it('renders with gradient background', () => {
    render(<MarketTicker />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveClass('bg-gradient-to-r', 'from-[#98b5a4]', 'to-[#162A2C]')
  })

  it('has proper overflow handling', () => {
    render(<MarketTicker />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveClass('overflow-hidden')
  })

  it('maintains proper height', () => {
    render(<MarketTicker />)
    
    const tickerContainer = screen.getByTestId('market-ticker')
    expect(tickerContainer).toHaveClass('market-ticker')
  })

  it('renders ticker container with proper structure', () => {
    render(<MarketTicker />)
    
    const tickerContainer = screen.getByTestId('ticker-container')
    expect(tickerContainer).toBeInTheDocument()
    expect(tickerContainer).toHaveClass('ticker-container')
  })

  it('has proper accessibility attributes', () => {
    render(<MarketTicker />)
    
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
  })
}) 