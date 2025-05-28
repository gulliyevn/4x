import { render, screen } from '@testing-library/react'
import HomePage from '../page'

describe('HomePage', () => {
  it('renders the homepage without crashing', () => {
    render(<HomePage />)
    
    const homepage = screen.getByTestId('homepage')
    expect(homepage).toBeDefined()
  })

  it('renders the market section with title', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Market')).toBeDefined()
  })

  it('renders the portfolio section with title', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Portfolio Performance')).toBeDefined()
  })

  it('renders the stats section', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Create Your Reality with 4X')).toBeDefined()
  })

  it('displays platform statistics', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Active Users')).toBeDefined()
    expect(screen.getByText('AI Accuracy')).toBeDefined()
    expect(screen.getByText('Signals Processed')).toBeDefined()
    expect(screen.getByText('Avg Profit per Trade')).toBeDefined()
  })

  it('renders the CTA section', () => {
    render(<HomePage />)
    
    expect(screen.getByText(/Dominate the Market/)).toBeDefined()
    expect(screen.getByText(/Start Winning Today/)).toBeDefined()
  })

  it('has proper page structure with main container', () => {
    render(<HomePage />)
    
    const homepage = screen.getByTestId('homepage')
    expect(homepage).toBeDefined()
  })

  it('renders market data with proper grid layout', () => {
    render(<HomePage />)
    
    const priceGrid = screen.getByTestId('price-grid')
    expect(priceGrid).toBeDefined()
  })
}) 