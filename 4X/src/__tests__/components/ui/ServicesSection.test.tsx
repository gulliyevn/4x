import { render, screen, fireEvent } from '@testing-library/react'
import ServicesSection from '@/components/ui/ServicesSection'

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('ServicesSection', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders the services section with title', () => {
    render(<ServicesSection />)
    
    const title = screen.getByText('Services')
    expect(title).toBeInTheDocument()
  })

  it('renders all three service cards', () => {
    render(<ServicesSection />)
    
    expect(screen.getByText('Real-Time Charts')).toBeInTheDocument()
    expect(screen.getByText('AI-Powered Bot')).toBeInTheDocument()
    expect(screen.getByText('Expert Insights')).toBeInTheDocument()
  })

  it('displays service descriptions', () => {
    render(<ServicesSection />)
    
    expect(screen.getByText(/Access accurate and updated charts/)).toBeInTheDocument()
    expect(screen.getByText(/Let our trading bot handle complex trades/)).toBeInTheDocument()
    expect(screen.getByText(/Get insights and analytics from top trading experts/)).toBeInTheDocument()
  })

  it('renders Font Awesome icons', () => {
    render(<ServicesSection />)
    
    const chartIcon = screen.getByTestId('chart-icon')
    const robotIcon = screen.getByTestId('robot-icon')
    const expertIcon = screen.getByTestId('expert-icon')
    
    expect(chartIcon).toBeInTheDocument()
    expect(robotIcon).toBeInTheDocument()
    expect(expertIcon).toBeInTheDocument()
  })

  it('handles Real-Time Charts button click', () => {
    render(<ServicesSection />)
    
    const chartsButton = screen.getByRole('button', { name: /real-time charts/i })
    fireEvent.click(chartsButton)
    
    expect(mockPush).toHaveBeenCalledWith('/charts')
  })

  it('handles AI-Powered Bot button click', () => {
    render(<ServicesSection />)
    
    const botButton = screen.getByRole('button', { name: /ai-powered bot/i })
    fireEvent.click(botButton)
    
    expect(mockPush).toHaveBeenCalledWith('/demo')
  })

  it('handles Expert Insights button click', () => {
    render(<ServicesSection />)
    
    const insightsButton = screen.getByRole('button', { name: /expert insights/i })
    fireEvent.click(insightsButton)
    
    expect(mockPush).toHaveBeenCalledWith('/portfolio')
  })

  it('has proper service card styling', () => {
    render(<ServicesSection />)
    
    const chartsButton = screen.getByRole('button', { name: /real-time charts/i })
    expect(chartsButton).toHaveClass('service-card')
    expect(chartsButton).toHaveClass('bg-[#98b5a4]', 'hover:bg-[#162A2C]')
  })

  it('has proper grid layout', () => {
    render(<ServicesSection />)
    
    const section = screen.getByTestId('services-section')
    expect(section).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-10')
  })

  it('has proper hover effects', () => {
    render(<ServicesSection />)
    
    const chartsButton = screen.getByRole('button', { name: /real-time charts/i })
    expect(chartsButton).toHaveClass('transform', 'hover:scale-105', 'transition-all', 'duration-300')
  })

  it('has proper accessibility attributes', () => {
    render(<ServicesSection />)
    
    const chartsButton = screen.getByRole('button', { name: /real-time charts/i })
    const botButton = screen.getByRole('button', { name: /ai-powered bot/i })
    const insightsButton = screen.getByRole('button', { name: /expert insights/i })
    
    expect(chartsButton).toBeEnabled()
    expect(botButton).toBeEnabled()
    expect(insightsButton).toBeEnabled()
  })

  it('renders with proper section structure', () => {
    render(<ServicesSection />)
    
    const section = screen.getByTestId('services-section')
    expect(section).toBeInTheDocument()
  })

  it('has consistent button styling across all cards', () => {
    render(<ServicesSection />)
    
    const buttons = screen.getAllByRole('button')
    const serviceButtons = buttons.filter(button => 
      button.textContent?.includes('Real-Time Charts') ||
      button.textContent?.includes('AI-Powered Bot') ||
      button.textContent?.includes('Expert Insights')
    )
    
    serviceButtons.forEach(button => {
      expect(button).toHaveClass('text-center', 'p-6')
    })
  })
}) 