import { Stack } from 'native-x-stack'
import React from 'react'
import { LotItem } from './lot-item'
import { OrderItem } from './use-sales-order-query'

interface Props {
  orders?: OrderItem[]
  onLotTap?: (lotID?: number) => void
}

export function LotList({ orders, onLotTap }: Props) {
  return (
    <Stack fillHorizontal>
      {orders?.map(item => (
        <LotItem key={item?.inventoryID} order={item} onLotTap={onLotTap} />
      ))}
    </Stack>
  )
}
