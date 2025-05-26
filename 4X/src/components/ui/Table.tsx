/**
 * Table Component
 * 
 * Comprehensive table component with sorting, pagination, and trading features
 * designed for the 4X trading platform with responsive design and loading states.
 */

import React, { useState, useMemo, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface Column<T = any> {
  /**
   * Unique key for the column
   */
  key: string
  
  /**
   * Display title for the column header
   */
  title: string
  
  /**
   * Data key to access value from row object
   */
  dataIndex?: keyof T
  
  /**
   * Custom render function for cell content
   */
  render?: (value: any, record: T, index: number) => React.ReactNode
  
  /**
   * Whether column is sortable
   */
  sortable?: boolean
  
  /**
   * Custom sort function
   */
  sorter?: (a: T, b: T) => number
  
  /**
   * Column width
   */
  width?: string | number
  
  /**
   * Column alignment
   */
  align?: 'left' | 'center' | 'right'
  
  /**
   * Whether column is fixed (sticky)
   */
  fixed?: 'left' | 'right'
  
  /**
   * Whether to hide column on mobile
   */
  hideOnMobile?: boolean
}

export interface TableProps<T = any> {
  /**
   * Table columns configuration
   */
  columns: Column<T>[]
  
  /**
   * Table data source
   */
  dataSource: T[]
  
  /**
   * Loading state
   */
  loading?: boolean
  
  /**
   * Row key extractor
   */
  rowKey?: string | ((record: T) => string)
  
  /**
   * Pagination configuration
   */
  pagination?: {
    current: number
    pageSize: number
    total: number
    showSizeChanger?: boolean
    showQuickJumper?: boolean
    showTotal?: boolean
    onChange?: (page: number, pageSize: number) => void
  } | false
  
  /**
   * Empty state content
   */
  emptyText?: React.ReactNode
  
  /**
   * Table size
   */
  size?: 'small' | 'middle' | 'large'
  
  /**
   * Whether table has border
   */
  bordered?: boolean
  
  /**
   * Whether rows are hoverable
   */
  hoverable?: boolean
  
  /**
   * Row selection configuration
   */
  rowSelection?: {
    selectedRowKeys?: string[]
    onChange?: (selectedRowKeys: string[], selectedRows: T[]) => void
    getCheckboxProps?: (record: T) => { disabled?: boolean }
  }
  
  /**
   * Row click handler
   */
  onRow?: (record: T, index: number) => {
    onClick?: () => void
    onDoubleClick?: () => void
  }
  
  /**
   * Custom className
   */
  className?: string
  
  /**
   * Scroll configuration
   */
  scroll?: {
    x?: number | string
    y?: number | string
  }
}

export interface TradingTableProps {
  /**
   * Trading data
   */
  data: Array<{
    symbol: string
    price: number
    change: number
    changePercent: number
    volume: number
    high24h: number
    low24h: number
  }>
  
  /**
   * Loading state
   */
  loading?: boolean
  
  /**
   * Row click handler
   */
  onSymbolClick?: (symbol: string) => void
  
  /**
   * Custom className
   */
  className?: string
  
  /**
   * Show actions column
   */
  showActions?: boolean
  
  /**
   * Custom actions
   */
  actions?: Array<{
    label: string
    onClick: (record: any) => void
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  }>
}

const tableSizes = {
  small: {
    padding: 'px-2 py-1',
    text: 'text-xs',
    headerPadding: 'px-2 py-2',
  },
  middle: {
    padding: 'px-3 py-2',
    text: 'text-sm',
    headerPadding: 'px-3 py-3',
  },
  large: {
    padding: 'px-4 py-3',
    text: 'text-base',
    headerPadding: 'px-4 py-4',
  },
}

// Sort icons
const SortIcon = ({ direction }: { direction?: 'asc' | 'desc' }) => (
  <div className="inline-flex flex-col ml-1">
    <svg 
      className={cn(
        'w-3 h-3 -mb-1',
        direction === 'asc' ? 'text-[#98b5a4]' : 'text-gray-400'
      )} 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
    <svg 
      className={cn(
        'w-3 h-3',
        direction === 'desc' ? 'text-[#98b5a4]' : 'text-gray-400'
      )} 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </div>
)

// Pagination component
const Pagination: React.FC<{
  current: number
  pageSize: number
  total: number
  onChange: (page: number, pageSize: number) => void
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: boolean
}> = ({ 
  current, 
  pageSize, 
  total, 
  onChange, 
  showSizeChanger = true, 
  showQuickJumper = false,
  showTotal = true 
}) => {
  const totalPages = Math.ceil(total / pageSize)
  const startRecord = (current - 1) * pageSize + 1
  const endRecord = Math.min(current * pageSize, total)
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onChange(page, pageSize)
    }
  }
  
  const handleSizeChange = (newSize: number) => {
    onChange(1, newSize)
  }
  
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      {/* Total info */}
      {showTotal && (
        <div className="text-sm text-gray-700">
          Showing {startRecord} to {endRecord} of {total} results
        </div>
      )}
      
      <div className="flex items-center space-x-4">
        {/* Page size selector */}
        {showSizeChanger && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Show</span>
            <select
              value={pageSize}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        )}
        
        {/* Page navigation */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(current - 1)}
            disabled={current === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum: number
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (current <= 3) {
              pageNum = i + 1
            } else if (current >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = current - 2 + i
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={cn(
                  'px-3 py-1 text-sm border rounded-md',
                  current === pageNum
                    ? 'bg-[#98b5a4] text-white border-[#98b5a4]'
                    : 'border-gray-300 hover:bg-gray-50'
                )}
              >
                {pageNum}
              </button>
            )
          })}
          
          <button
            onClick={() => handlePageChange(current + 1)}
            disabled={current === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Table component for the 4X trading platform
 * 
 * @example
 * ```tsx
 * <Table
 *   columns={columns}
 *   dataSource={data}
 *   pagination={{ current: 1, pageSize: 10, total: 100 }}
 *   loading={false}
 * />
 * ```
 */
export const Table = <T extends Record<string, any>>({
  columns,
  dataSource,
  loading = false,
  rowKey = 'id',
  pagination,
  emptyText = 'No data',
  size = 'middle',
  bordered = true,
  hoverable = true,
  rowSelection,
  onRow,
  className,
  scroll,
}: TableProps<T>) => {
  const [sortState, setSortState] = useState<{
    columnKey: string | null
    direction: 'asc' | 'desc' | null
  }>({ columnKey: null, direction: null })
  
  const sizeConfig = tableSizes[size]
  
  // Get row key
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return record[rowKey] || index.toString()
  }
  
  // Handle sorting
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return
    
    let newDirection: 'asc' | 'desc' | null = 'asc'
    
    if (sortState.columnKey === column.key) {
      if (sortState.direction === 'asc') {
        newDirection = 'desc'
      } else if (sortState.direction === 'desc') {
        newDirection = null
      }
    }
    
    setSortState({
      columnKey: newDirection ? column.key : null,
      direction: newDirection,
    })
  }
  
  // Sort data
  const sortedData = useMemo(() => {
    if (!sortState.columnKey || !sortState.direction) {
      return dataSource
    }
    
    const column = columns.find(col => col.key === sortState.columnKey)
    if (!column) return dataSource
    
    const sorted = [...dataSource].sort((a, b) => {
      if (column.sorter) {
        const result = column.sorter(a, b)
        return sortState.direction === 'desc' ? -result : result
      }
      
      const aValue = column.dataIndex ? a[column.dataIndex] : ''
      const bValue = column.dataIndex ? b[column.dataIndex] : ''
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const result = aValue - bValue
        return sortState.direction === 'desc' ? -result : result
      }
      
      const result = String(aValue).localeCompare(String(bValue))
      return sortState.direction === 'desc' ? -result : result
    })
    
    return sorted
  }, [dataSource, sortState, columns])
  
  // Handle row selection
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(
    rowSelection?.selectedRowKeys || []
  )
  
  const handleRowSelect = (rowKey: string, selected: boolean) => {
    const newSelectedKeys = selected
      ? [...selectedRowKeys, rowKey]
      : selectedRowKeys.filter(key => key !== rowKey)
    
    setSelectedRowKeys(newSelectedKeys)
    rowSelection?.onChange?.(
      newSelectedKeys,
      newSelectedKeys.map(key => 
        sortedData.find(record => getRowKey(record, 0) === key)
      ).filter(Boolean) as T[]
    )
  }
  
  const handleSelectAll = (selected: boolean) => {
    const newSelectedKeys = selected 
      ? sortedData.map((record, index) => getRowKey(record, index))
      : []
    
    setSelectedRowKeys(newSelectedKeys)
    rowSelection?.onChange?.(
      newSelectedKeys,
      selected ? sortedData : []
    )
  }
  
  if (loading) {
    return (
      <div className="border border-gray-200 rounded-lg">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex">
              {columns.map((column) => (
                <div
                  key={column.key}
                  className={cn('flex-1', sizeConfig.headerPadding)}
                  style={{ width: column.width }}
                >
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Rows skeleton */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="border-b border-gray-100">
              <div className="flex">
                {columns.map((column) => (
                  <div
                    key={column.key}
                    className={cn('flex-1', sizeConfig.padding)}
                    style={{ width: column.width }}
                  >
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <div className={cn('border border-gray-200 rounded-lg overflow-hidden', className)}>
      <div className={cn('overflow-auto', scroll?.x && 'min-w-full')}>
        <table className="w-full">
          {/* Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {/* Row selection header */}
              {rowSelection && (
                <th className={cn('text-left', sizeConfig.headerPadding)}>
                  <input
                    type="checkbox"
                    checked={selectedRowKeys.length === sortedData.length && sortedData.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-[#98b5a4] focus:ring-[#98b5a4]"
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'text-left font-semibold text-gray-900',
                    sizeConfig.headerPadding,
                    column.sortable && 'cursor-pointer hover:bg-gray-100',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.hideOnMobile && 'hidden sm:table-cell'
                  )}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center">
                    {column.title}
                    {column.sortable && (
                      <SortIcon 
                        direction={
                          sortState.columnKey === column.key ? sortState.direction || undefined : undefined
                        } 
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Body */}
          <tbody>
            <AnimatePresence>
              {sortedData.length === 0 ? (
                <tr>
                  <td 
                    colSpan={columns.length + (rowSelection ? 1 : 0)} 
                    className={cn('text-center text-gray-500', sizeConfig.padding)}
                  >
                    {emptyText}
                  </td>
                </tr>
              ) : (
                sortedData.map((record, index) => {
                  const key = getRowKey(record, index)
                  const isSelected = selectedRowKeys.includes(key)
                  const rowProps = onRow?.(record, index)
                  
                  return (
                    <motion.tr
                      key={key}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={cn(
                        'border-b border-gray-100',
                        hoverable && 'hover:bg-gray-50',
                        isSelected && 'bg-blue-50',
                        rowProps?.onClick && 'cursor-pointer'
                      )}
                      onClick={rowProps?.onClick}
                      onDoubleClick={rowProps?.onDoubleClick}
                    >
                      {/* Row selection cell */}
                      {rowSelection && (
                        <td className={sizeConfig.padding}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleRowSelect(key, e.target.checked)}
                            disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
                            className="rounded border-gray-300 text-[#98b5a4] focus:ring-[#98b5a4]"
                          />
                        </td>
                      )}
                      
                      {columns.map((column) => {
                        const value = column.dataIndex ? record[column.dataIndex] : undefined
                        const content = column.render 
                          ? column.render(value, record, index)
                          : value
                        
                        return (
                          <td
                            key={column.key}
                            className={cn(
                              sizeConfig.padding,
                              sizeConfig.text,
                              column.align === 'center' && 'text-center',
                              column.align === 'right' && 'text-right',
                              column.hideOnMobile && 'hidden sm:table-cell'
                            )}
                            style={{ width: column.width }}
                          >
                            {content}
                          </td>
                        )
                      })}
                    </motion.tr>
                  )
                })
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {pagination && (
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={pagination.onChange || (() => {})}
          showSizeChanger={pagination.showSizeChanger}
          showQuickJumper={pagination.showQuickJumper}
          showTotal={pagination.showTotal}
        />
      )}
    </div>
  )
}

/**
 * Trading Table - pre-configured table for trading data
 * 
 * @example
 * ```tsx
 * <TradingTable
 *   data={marketData}
 *   onSymbolClick={handleSymbolClick}
 *   showActions
 * />
 * ```
 */
export const TradingTable: React.FC<TradingTableProps> = ({
  data,
  loading = false,
  onSymbolClick,
  className,
  showActions = true,
  actions = [],
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 5,
    }).format(price)
  }
  
  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`
    return volume.toString()
  }
  
  const columns: Column<TradingTableProps['data'][0]>[] = [
    {
      key: 'symbol',
      title: 'Symbol',
      dataIndex: 'symbol',
      sortable: true,
      render: (symbol: string) => (
        <button
          onClick={() => onSymbolClick?.(symbol)}
          className="font-medium text-[#98b5a4] hover:text-[#89a396] transition-colors"
        >
          {symbol}
        </button>
      ),
    },
    {
      key: 'price',
      title: 'Price',
      dataIndex: 'price',
      sortable: true,
      align: 'right',
      render: (price: number) => (
        <span className="font-medium">{formatPrice(price)}</span>
      ),
    },
    {
      key: 'change',
      title: '24h Change',
      dataIndex: 'changePercent',
      sortable: true,
      align: 'right',
      render: (changePercent: number, record) => (
        <div className={cn(
          'font-medium',
          changePercent >= 0 ? 'text-green-600' : 'text-red-600'
        )}>
          <div>{changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%</div>
          <div className="text-xs opacity-75">
            {formatPrice(record.change)}
          </div>
        </div>
      ),
    },
    {
      key: 'volume',
      title: '24h Volume',
      dataIndex: 'volume',
      sortable: true,
      align: 'right',
      hideOnMobile: true,
      render: (volume: number) => (
        <span className="text-gray-600">{formatVolume(volume)}</span>
      ),
    },
    {
      key: 'high',
      title: '24h High',
      dataIndex: 'high24h',
      sortable: true,
      align: 'right',
      hideOnMobile: true,
      render: (high: number) => formatPrice(high),
    },
    {
      key: 'low',
      title: '24h Low',
      dataIndex: 'low24h',
      sortable: true,
      align: 'right',
      hideOnMobile: true,
      render: (low: number) => formatPrice(low),
    },
  ]
  
  if (showActions && actions.length > 0) {
    columns.push({
      key: 'actions',
      title: 'Actions',
      align: 'center',
      render: (_, record) => (
        <div className="flex space-x-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => action.onClick(record)}
              className={cn(
                'px-3 py-1 text-xs rounded-md font-medium transition-colors',
                {
                  'bg-[#98b5a4] text-white hover:bg-[#89a396]': action.variant === 'primary',
                  'bg-gray-100 text-gray-700 hover:bg-gray-200': action.variant === 'secondary',
                  'bg-green-100 text-green-700 hover:bg-green-200': action.variant === 'success',
                  'bg-yellow-100 text-yellow-700 hover:bg-yellow-200': action.variant === 'warning',
                  'bg-red-100 text-red-700 hover:bg-red-200': action.variant === 'danger',
                }
              )}
            >
              {action.label}
            </button>
          ))}
        </div>
      ),
    })
  }
  
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="symbol"
      className={className}
      size="middle"
      pagination={false}
    />
  )
}

Table.displayName = 'Table'
TradingTable.displayName = 'TradingTable'

export default Table 