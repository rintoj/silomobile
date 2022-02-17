import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import data from './data.json'
import { LotList } from './lot-list'
import { PurchaseOrderView } from './purchase-order-view'

const purchaseOrder = data[0]

export function PurchaseOrder() {
  return (
    <Stack fill>
      <PurchaseOrderView order={purchaseOrder as any} />
      <Spacer />
      <LotList />
    </Stack>
  )
}
