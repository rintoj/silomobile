import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { ScrollView } from 'react-native'
import { SalesOrderView } from './sales-order-view'
import { useSalesOrderQuery } from './use-sales-order-query'

const styles = { flex: 1 }

interface Props {
  id: number
  onOrderItemTap?: (orderID?: number) => void
}

export function SalesOrder({ id, onOrderItemTap }: Props) {
  const {
    data: salesOrder,
    isLoading,
    error,
  } = useSalesOrderQuery({
    salesOrderID: id,
  })
  return (
    <ScrollView style={styles} showsVerticalScrollIndicator={false}>
      <Stack fill>
        <SalesOrderView
          loading={isLoading}
          error={error}
          order={salesOrder}
          onOrderItemTap={onOrderItemTap}
        />
      </Stack>
      <Spacer size='x-large' />
    </ScrollView>
  )
}
