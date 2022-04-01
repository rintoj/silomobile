import { useAuth } from '@silo-feature/auth'
import React from 'react'
import { SalesOrderList } from './sales-order-list'
import { useSalesOrderSearchQuery } from './use-sales-order-search-query'

interface Props {
  from?: Date
  to?: Date
  onSelect?: (id: number) => void
}

export function SalesOrders({ from, to, onSelect }: Props) {
  const { user } = useAuth()
  const { data, isLoading, error } = useSalesOrderSearchQuery({
    userID: user?.userID,
    startDate: from,
    endDate: to,
  })

  return (
    <SalesOrderList
      loading={isLoading}
      orders={data?.salesOrders}
      error={error}
      onSelect={onSelect}
    />
  )
}
