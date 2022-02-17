import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { ScrollView } from 'react-native'
import data from './data.json'
import { LotList } from './lot-list'
import { PurchaseOrderView } from './purchase-order-view'

const purchaseOrder = data[0]
const styles = { flex: 1 }

export function PurchaseOrder() {
  return (
    <ScrollView style={styles} showsVerticalScrollIndicator={false}>
      <Stack fill>
        <PurchaseOrderView order={purchaseOrder as any} />
        <Spacer size='small' />
        <Spacer size='x-small' />
        <LotList />
      </Stack>
      <Spacer size='x-large' />
    </ScrollView>
  )
}
