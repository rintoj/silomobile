import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { ArrowForwardIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import LotIcon from './images/lot-icon.svg'
import { OrderItem } from './use-purchase-order-query'
interface Props {
  order?: OrderItem
}
export function LotItemView({ order }: Props) {
  return (
    <Stack fillHorizontal backgroundColor={COLOR.PRIMARY}>
      <Stack
        height={40}
        alignMiddle
        horizontal
        padding='horizontal:normal'
        backgroundColor={COLOR_X.ACCENT4}
      >
        <LotIcon width={18} height={18} />
        <Spacer size='small' />
        <Text textColor={COLOR.PRIMARY}>LOT# ANG-{order?.inventoryID}</Text>
        <Spacer size='small' />
        <ArrowForwardIcon size={16} color={COLOR.PRIMARY} />
      </Stack>
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
