/**
 * UI Components Index
 * 
 * Central export file for all 4X Trading Platform UI components.
 * Provides easy access to all components and their variants.
 */

// Import all components
import { Button } from './Button'
import { Input } from './Input'
import { Card, CardHeader, CardBody, CardFooter } from './Card'
import { Loading, Skeleton } from './Loading'
import { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmationModal } from './Modal'
import { Badge, PriceChangeBadge, StatusBadge, VolumeBadge, RiskBadge } from './Badge'
import { Alert, TradingAlert, PriceAlert, OrderAlert } from './Alert'
import { Tooltip, TradingTooltip } from './Tooltip'
import { Table, TradingTable } from './Table'

// Re-export all components
export { Button } from './Button'
export type { ButtonProps } from './Button'

export { Input } from './Input'
export type { InputProps } from './Input'

export { Card, CardHeader, CardBody, CardFooter } from './Card'
export type { CardProps } from './Card'

export { Loading, Skeleton } from './Loading'
export type { LoadingProps, SkeletonProps } from './Loading'

export { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmationModal } from './Modal'
export type { ModalProps } from './Modal'

export { Badge, PriceChangeBadge, StatusBadge, VolumeBadge, RiskBadge } from './Badge'
export type { BadgeProps } from './Badge'

export { Alert, TradingAlert, PriceAlert, OrderAlert } from './Alert'
export type { AlertProps, TradingAlertProps } from './Alert'

export { Tooltip, TradingTooltip } from './Tooltip'
export type { TooltipProps, TradingTooltipProps } from './Tooltip'

export { Table, TradingTable } from './Table'
export type { TableProps, TradingTableProps, Column } from './Table'

// Component Groups for Easy Access
export const CoreComponents = {
  Button,
  Input,
  Card,
  Loading,
  Modal,
  Badge,
  Alert,
  Tooltip,
  Table,
}

export const TradingComponents = {
  PriceChangeBadge,
  StatusBadge,
  VolumeBadge,
  RiskBadge,
  TradingAlert,
  PriceAlert,
  OrderAlert,
  TradingTooltip,
  TradingTable,
}

export const LayoutComponents = {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
}

export const FeedbackComponents = {
  Alert,
  TradingAlert,
  Loading,
  Skeleton,
  Badge,
  Tooltip,
} 