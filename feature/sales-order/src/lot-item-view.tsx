import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React from 'react'
import LotIcon from './images/lot-icon.svg'
import { OrderItem } from './use-sales-order-query'
interface Props {
  order?: OrderItem
  onLotTap?: (lotID: number) => void
}
export function LotItemView({ order, onLotTap }: Props) {
  const lots = order?.traces.map(trace => trace.parentIDs).flat()
  return (
    <Stack fillHorizontal backgroundColor={COLOR.PRIMARY}>
      <Stack
        height={10}
        alignMiddle
        horizontal
        padding='horizontal:normal'
        backgroundColor={COLOR.TERTIARY}
      />
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Spacer size='small' />
        <Stack fill>
          <Text textColor={COLOR_X.ACCENT2}>Item</Text>
          <Text textColor={COLOR_X.ACCENT3}>
            {order?.productName} - {order?.quantity} {order?.unit?.name} - {order?.label?.name}
          </Text>
        </Stack>
        <Spacer size='x-small' />
        <Stack alignRight width={60}>
          <Stack horizontal>
            <LotIcon width={16} />
            <Spacer size='xx-small' />
            <Text textColor={COLOR_X.ACCENT4}>Lot</Text>
          </Stack>
          <Stack>
            {lots?.map(lot => (
              <Tappable key={lot} data={lot} onTap={onLotTap}>
                <Text textColor={COLOR_X.ACCENT2} fontSize='large'>
                  {lot}
                </Text>
              </Tappable>
            ))}
          </Stack>
        </Stack>
        <Spacer size='x-small' />
        <Stack alignRight width={60}>
          <Text textColor={COLOR_X.ACCENT2}>Total u</Text>
          <Text textColor={COLOR_X.ACCENT2} fontSize='large'>
            {order?.total}
          </Text>
        </Stack>
        <Spacer size='small' />
      </Stack>
      <Spacer size='x-small' />
    </Stack>
  )
}
