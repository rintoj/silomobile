import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React from 'react'
import LotIcon from './images/lot-icon.svg'
import { OrderItem, Trace } from './use-sales-order-query'
interface Props {
  order?: OrderItem
  onLotTap?: (lotID: number) => void
}

export function LotItemView({ order, onLotTap }: Props) {
  const onLotItemTap = (trace: Trace) => {
    const [lotID] = trace.parentIDs.flat()
    if (lotID) {
      onLotTap?.(lotID)
    }
  }
  return (
    <Stack fillHorizontal backgroundColor={COLOR.PRIMARY}>
      <Stack
        height={10}
        alignMiddle
        horizontal
        padding='horizontal:normal'
        backgroundColor={COLOR_X.ACCENT6}
      />
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Spacer size='small' />
        <Stack fill>
          <Text textColor={COLOR_X.ACCENT3} fontSize='small'>
            {order?.productName}
          </Text>
          <Text textColor={COLOR_X.ACCENT3} fontSize='x-small'>
            {order?.quantity} {order?.unit?.name}
          </Text>
          <Text textColor={COLOR_X.ACCENT3} fontSize='x-small'>
            {order?.label?.name}
          </Text>
        </Stack>
        <Spacer size='x-small' />
        <Stack alignRight width={120}>
          <Stack horizontal>
            <LotIcon width={16} />
            <Spacer size='xx-small' />
            <Text textColor={COLOR_X.ACCENT4}>Lot</Text>
          </Stack>
          <Stack>
            {order?.traces.length === 0 ? (
              <Text alignRight textColor={COLOR_X.ACCENT7}>
                Unlotted
              </Text>
            ) : null}
            {order?.traces.map(trace => (
              <Tappable key={trace.id} data={trace} onTap={onLotItemTap}>
                <Text textColor={COLOR_X.ACCENT3} fontSize='small' alignRight>
                  {trace.lotNumber} ({Math.abs(trace.quantity)})
                </Text>
              </Tappable>
            ))}
          </Stack>
        </Stack>
        <Spacer size='x-small' />
        <Stack alignRight width={60}>
          <Text textColor={COLOR_X.ACCENT2}>Qty</Text>
          <Text textColor={COLOR_X.ACCENT3} fontSize='small'>
            {order?.total}
          </Text>
        </Stack>
        <Spacer size='small' />
      </Stack>
      <Spacer size='x-small' />
    </Stack>
  )
}
