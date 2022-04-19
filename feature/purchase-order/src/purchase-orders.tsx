import { useAuth } from '@silo-feature/auth'
import React from 'react'
import { PurchaseOrderList } from './purchase-order-list'
import { usePurchaseOrderSearchQuery } from './use-purchase-order-search-query'

interface Props {
  id?: string
  customerInvoiceNumber?: string
  purchaseOrderNumber?: string
  from?: Date
  to?: Date
  onSelect?: (id: number) => void
  onSearchIconTap?: () => void
  onClearSearchTap?: () => void
  onFilterIconTap?: () => void
}

export function PurchaseOrders({
  id,
  purchaseOrderNumber,
  customerInvoiceNumber,
  from,
  to,
  onSelect,
  onSearchIconTap,
  onClearSearchTap,
  onFilterIconTap,
}: Props) {
  const { user } = useAuth()
  const { data, isLoading, error } = usePurchaseOrderSearchQuery({
    id,
    userID: user?.userID,
    purchaseOrderNumber,
    customerInvoiceNumber,
    startDate: from,
    endDate: to,
  })

  return (
    <PurchaseOrderList
      searchActive={!!(id || purchaseOrderNumber || customerInvoiceNumber)}
      loading={isLoading}
      orders={data?.purchaseOrders}
      error={error}
      onSelect={onSelect}
      onClearSearchTap={onClearSearchTap}
      onSearchIconTap={onSearchIconTap}
      onFilterIconTap={onFilterIconTap}
    />
  )
}
