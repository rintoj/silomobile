import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { LotItem } from './lot-item'
import { OrderItem } from './use-purchase-order-query'

interface Props {
  orders?: OrderItem[]
  onOrderItemTap?: (orderID?: number) => void
}

export function LotList({ orders, onOrderItemTap }: Props) {
  return (
    <Stack fillHorizontal>
      <Stack padding='horizontal:normal'>
        <Text textColor={COLOR_X.ACCENT2}>List Of Lots</Text>
      </Stack>
      <Spacer size='x-small' />
      {orders?.map(item => (
        <LotItem key={item?.inventoryID} order={item} onTap={onOrderItemTap} />
      ))}
    </Stack>
  )
}
