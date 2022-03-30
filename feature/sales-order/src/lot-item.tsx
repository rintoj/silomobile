import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { LotItemView } from './lot-item-view'
import { OrderItem } from './use-sales-order-query'

interface Props {
  order?: OrderItem
  onLotTap?: (lotID?: number) => void
}
export function LotItem({ order, onLotTap }: Props) {
  return (
    <Stack>
      <LotItemView order={order} onLotTap={onLotTap} />
      <Spacer size='x-small' />
    </Stack>
  )
}
