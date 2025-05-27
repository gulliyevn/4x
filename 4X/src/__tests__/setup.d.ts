import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(...classNames: string[]): R
      toHaveAttribute(attr: string, value?: string): R
      toBeEnabled(): R
      toBeDisabled(): R
      toHaveValue(value: string | number): R
      toHaveTextContent(text: string | RegExp): R
      toBeVisible(): R
      toBeChecked(): R
    }
  }
} 