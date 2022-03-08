import { useAuth } from '@silo-feature/auth'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { ScrollView } from 'react-native'
import { PurchaseOrderView } from './purchase-order-view'
import { usePurchaseOrderQuery } from './use-purchase-order-query'

const styles = { flex: 1 }

interface Props {
  id: number
  onOrderItemTap?: (orderID?: number) => void
}

export function PurchaseOrder({ id, onOrderItemTap }: Props) {
  const { user } = useAuth()
  const {
    data: purchaseOrder,
    isLoading,
    error,
  } = usePurchaseOrderQuery({
    purchaseOrderID: id,
    accountID: user?.accountID,
  })
  return (
    <ScrollView style={styles} showsVerticalScrollIndicator={false}>
      <Stack fill>
        <PurchaseOrderView
          loading={isLoading}
          error={error}
          order={purchaseOrder}
          onOrderItemTap={onOrderItemTap}
        />
      </Stack>
      <Spacer size='x-large' />
    </ScrollView>
  )
}
