import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MarketTicker from '@/components/ui/MarketTicker'

// Mock для IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

describe('MarketTicker', () => {
  beforeEach(() => {
    // Mock для window.addEventListener
    jest.spyOn(window, 'addEventListener').mockImplementation(() => {})
    jest.spyOn(window, 'removeEventListener').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders market ticker with all market items', () => {
    render(<MarketTicker />)
    
    // Проверяем наличие основных криптовалют
    expect(screen.getAllByText('BTC')).toHaveLength(3) // 3 копии для бесконечного скролла
    expect(screen.getAllByText('ETH')).toHaveLength(3)
    expect(screen.getAllByText('USDT')).toHaveLength(3)
    expect(screen.getAllByText('LINK')).toHaveLength(3)
  })

  it('displays formatted prices correctly', () => {
    render(<MarketTicker />)
    
    // Проверяем форматирование цен
    expect(screen.getAllByText('$110,432.44')).toHaveLength(3) // Bitcoin price
    expect(screen.getAllByText('$2,673.00')).toHaveLength(3) // Ethereum price
    expect(screen.getAllByText('$1.2300')).toHaveLength(3) // Cardano price (< 1000)
  })

  it('shows positive and negative changes with correct styling', () => {
    render(<MarketTicker />)
    
    // Проверяем положительные изменения
    const positiveChanges = screen.getAllByText('+0.84%')
    expect(positiveChanges).toHaveLength(3) // Bitcoin change
    positiveChanges.forEach(element => {
      expect(element.closest('.ticker-change')).toHaveClass('positive')
    })

    // Проверяем отрицательные изменения
    const negativeChanges = screen.getAllByText('-3.10%')
    expect(negativeChanges).toHaveLength(3) // Litecoin change
    negativeChanges.forEach(element => {
      expect(element.closest('.ticker-change')).toHaveClass('negative')
    })
  })

  it('displays volume information', () => {
    render(<MarketTicker />)
    
    // Проверяем отображение объемов
    expect(screen.getAllByText('20.17K')).toHaveLength(6) // USDT и BTC volume
    expect(screen.getAllByText('695.16K')).toHaveLength(6) // LINK и ETH volume
    expect(screen.getAllByText('298.62K')).toHaveLength(6) // LTC и BNB volume (2 элемента × 3 копии)
  })

  it('renders with custom className', () => {
    const { container } = render(<MarketTicker className="custom-ticker" />)
    
    const ticker = container.querySelector('.market-ticker')
    expect(ticker).toHaveClass('custom-ticker')
  })

  it('has proper accessibility attributes', () => {
    render(<MarketTicker />)
    
    const ticker = screen.getByRole('marquee')
    expect(ticker).toHaveAttribute('aria-label', 'Live market prices ticker')
    
    // Проверяем группы данных
    const marketGroups = screen.getAllByRole('group')
    expect(marketGroups.length).toBeGreaterThan(0)
    
    // Проверяем первую группу
    expect(marketGroups[0]).toHaveAttribute('aria-label', 'Tether market data')
  })

  it('renders gradient overlays for smooth edges', () => {
    const { container } = render(<MarketTicker />)
    
    const leftGradient = container.querySelector('.ticker-gradient-left')
    const rightGradient = container.querySelector('.ticker-gradient-right')
    
    expect(leftGradient).toBeInTheDocument()
    expect(rightGradient).toBeInTheDocument()
    expect(leftGradient).toHaveAttribute('aria-hidden', 'true')
    expect(rightGradient).toHaveAttribute('aria-hidden', 'true')
  })

  it('displays change icons correctly', () => {
    render(<MarketTicker />)
    
    // Проверяем иконки изменений
    const upArrows = screen.getAllByText('▲')
    const downArrows = screen.getAllByText('▼')
    
    expect(upArrows.length).toBeGreaterThan(0)
    expect(downArrows.length).toBeGreaterThan(0)
  })

  it('shows separators between items', () => {
    render(<MarketTicker />)
    
    const separators = screen.getAllByText('|')
    expect(separators.length).toBeGreaterThan(0)
  })

  it('renders with custom speed prop', () => {
    const { container } = render(<MarketTicker speed={30} />)
    
    const tickerWrapper = container.querySelector('.ticker-wrapper')
    expect(tickerWrapper).toHaveStyle('animation-duration: 30s')
  })
}) 