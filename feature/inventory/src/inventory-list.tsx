import { useAuth } from '@silo-feature/auth'
import React from 'react'
import { InventoryListView } from './inventory-list-view'
import { useInventoryQuery } from './use-inventory-query'

interface Props {
  onLotSelect?: (id: number) => void
}
export function InventoryList({ onLotSelect }: Props) {
  const { user } = useAuth()
  const { data, isLoading, error } = useInventoryQuery({ userID: user?.userID })

  return (
    <InventoryListView
      onSelect={onLotSelect}
      inventories={data}
      loading={isLoading}
      error={error}
    />
  )
}
