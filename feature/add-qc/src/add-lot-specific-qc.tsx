import { useAuth } from '@silo-feature/auth'
import { Stack } from 'native-x-stack'
import React from 'react'
import { LotQCForm } from './lot-qc-form'
import { PurchaseOrderSummaryView } from './purchase-order-summary-view'
import { usePurchaseOrderQuery } from './use-purchase-order-query'

interface Props {
  purchaseOrderID?: number
  lotID?: number
  onSubmit?: () => void
}

export function AddLotSpecificQC({ purchaseOrderID, onSubmit }: Props) {
  const { user } = useAuth()
  const { data: order } = usePurchaseOrderQuery({ accountID: user?.accountID, purchaseOrderID })

  return (
    <Stack fill>
      <PurchaseOrderSummaryView order={order} />
      <LotQCForm onSubmit={onSubmit} />
    </Stack>
  )
}
