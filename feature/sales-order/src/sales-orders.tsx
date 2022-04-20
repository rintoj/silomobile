import { useAuth } from '@silo-feature/auth'
import React from 'react'
import { SalesOrderList } from './sales-order-list'
import { useSalesOrderSearchQuery } from './use-sales-order-search-query'

interface Props {
  id?: string
  invoiceNumber?: string
  purchaseOrderNumber?: string
  from?: Date
  to?: Date
  locationId?: string
  onSelect?: (id: number) => void
  onSearchIconTap?: () => void
  onClearSearchTap?: () => void
  onFilterIconTap?: () => void
}

export function SalesOrders({
  id,
  invoiceNumber,
  purchaseOrderNumber,
  from,
  to,
  locationId,
  onSelect,
  onSearchIconTap,
  onClearSearchTap,
  onFilterIconTap,
}: Props) {
  const { user } = useAuth()
  const { data, isLoading, error } = useSalesOrderSearchQuery({
    id,
    purchaseOrderNumber,
    invoiceNumber,
    userID: user?.userID,
    startDate: from,
    endDate: to,
    locationId,
  })

  return (
    <SalesOrderList
      searchActive={!!(id || purchaseOrderNumber || invoiceNumber)}
      loading={isLoading}
      orders={data?.salesOrders}
      error={error}
      onSelect={onSelect}
      onClearSearchTap={onClearSearchTap}
      onSearchIconTap={onSearchIconTap}
      onFilterIconTap={onFilterIconTap}
    />
  )
}
