import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import React from 'react'
import { LotItemView } from './lot-item-view'
import { OrderItem } from './use-purchase-order-query'

interface Props {
  order?: OrderItem
  onTap?: (orderId?: number) => void
}
export function LotItem({ order, onTap }: Props) {
  const [trace] = order?.traces ?? []
  return (
    <Tappable data={trace?.id} onTap={onTap}>
      <Stack fillHorizontal>
        <LotItemView order={order} />
        <Spacer size='x-small' />
        <Spacer size='xx-small' />
      </Stack>
    </Tappable>
  )
}
