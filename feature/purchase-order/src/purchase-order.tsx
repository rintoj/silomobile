import { useAuth } from '@silo-feature/auth'
import { format } from 'date-fns'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { ScrollView } from 'react-native'
import RNPrint from 'react-native-print'
import { getPurchaseOrderLabel } from './label-templates'
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

  const printLabel = async () => {
    const { purchaseOrderNumber, shipAfter } = purchaseOrder ?? {}
    if (purchaseOrderNumber && shipAfter) {
      const html = getPurchaseOrderLabel(
        purchaseOrderNumber,
        format(new Date(shipAfter), 'MM-dd-yyyy'),
      )
      await RNPrint.print({ html, isLandscape: true })
    }
  }

  return (
    <ScrollView style={styles} showsVerticalScrollIndicator={false}>
      <Stack fill>
        <PurchaseOrderView
          loading={isLoading}
          error={error}
          order={purchaseOrder}
          onOrderItemTap={onOrderItemTap}
          onPrintLabelTap={printLabel}
        />
      </Stack>
      <Spacer size='x-large' />
    </ScrollView>
  )
}
