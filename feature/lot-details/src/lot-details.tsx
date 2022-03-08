import React from 'react'
import { LotDetailsView } from './lot-details-view'
import { useLotQuery } from './use-lot-query'

interface Props {
  lotId: number
  onPurchaseOrderTap?: (id?: number) => void
}

export function LotDetails({ lotId, onPurchaseOrderTap }: Props) {
  const { data: lot, isLoading, error } = useLotQuery({ lotId })
  return (
    <LotDetailsView
      lot={lot}
      loading={isLoading}
      error={error}
      onPurchaseOrderTap={onPurchaseOrderTap}
    />
  )
}
