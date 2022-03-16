import React from 'react'
import { LotItemView } from './lot-item-view'
import { OrderItem } from './use-sales-order-query'

interface Props {
  order?: OrderItem
  onLotTap?: (lotID?: number) => void
}
export function LotItem({ order, onLotTap }: Props) {
  return <LotItemView order={order} onLotTap={onLotTap} />
}
