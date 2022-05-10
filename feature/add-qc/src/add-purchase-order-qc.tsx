import { useAuth } from '@silo-feature/auth'
import { Stack } from 'native-x-stack'
import React from 'react'
import { PurchaseOrderQCForm } from './purchase-order-qc-form'
import { PurchaseOrderSummaryView } from './purchase-order-summary-view'
import { usePurchaseOrderQuery } from './use-purchase-order-query'

interface Props {
  purchaseOrderID?: number
  onNext?: () => void
}

export function AddPurchaseOrderQC({ purchaseOrderID, onNext }: Props) {
  const { user } = useAuth()
  const { data: order } = usePurchaseOrderQuery({ accountID: user?.accountID, purchaseOrderID })

  return (
    <Stack fill>
      <PurchaseOrderSummaryView order={order} />
      <PurchaseOrderQCForm onSubmit={onNext} />
    </Stack>
  )
}
