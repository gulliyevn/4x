import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PriceDisplay from '@/components/ui/PriceDisplay'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}))

describe('PriceDisplay', () => {
  it('renders price correctly', () => {
    render(<PriceDisplay price={1234.56} />)
    
    expect(screen.getByText('$1,234.56')).toBeInTheDocument()
  })

  it('shows positive change with green color', () => {
    render(
      <PriceDisplay 
        price={1234.56} 
        previousPrice={1200.00}
        showChange={true}
        showPercentage={true}
      />
    )
    
    const changeElement = screen.getByText('$34.56')
    expect(changeElement).toBeInTheDocument()
    expect(changeElement).toHaveClass('text-green-500')
  })

  it('shows negative change with red color', () => {
    render(
      <PriceDisplay 
        price={1200.00} 
        previousPrice={1234.56}
        showChange={true}
        showPercentage={true}
      />
    )
    
    const changeElement = screen.getByText('$34.56')
    expect(changeElement).toBeInTheDocument()
    expect(changeElement).toHaveClass('text-red-500')
  })

  it('formats currency correctly', () => {
    render(<PriceDisplay price={1234.567} decimals={3} currency="EUR" />)
    
    expect(screen.getByText('€1,234.567')).toBeInTheDocument()
  })

  it('hides change when showChange is false', () => {
    render(
      <PriceDisplay 
        price={1234.56} 
        previousPrice={1200.00}
        showChange={false}
      />
    )
    
    expect(screen.queryByText('$34.56')).not.toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    render(<PriceDisplay price={1234.56} size="lg" />)
    
    expect(screen.getByText('$1,234.56').closest('div')).toHaveClass('text-2xl')
  })
}) 