import { useAuth } from '@silo-feature/auth'
import React from 'react'
import { PurchaseOrderList } from './purchase-order-list'
import { usePurchaseOrderSearchQuery } from './use-purchase-order-search-query'

interface Props {
  from?: Date
  to?: Date
  onSelect?: (id: number) => void
}

export function PurchaseOrders({ from, to, onSelect }: Props) {
  const { user } = useAuth()
  const { data, isLoading, error } = usePurchaseOrderSearchQuery({
    userID: user?.userID,
    startDate: from,
    endDate: to,
  })

  return (
    <PurchaseOrderList
      loading={isLoading}
      orders={data?.purchaseOrders}
      error={error}
      onSelect={onSelect}
    />
  )
}
