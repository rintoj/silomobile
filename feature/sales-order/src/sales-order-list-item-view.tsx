import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { ArrowForwardIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import SalesOrderIcon from './images/so-icon.svg'
import { SalesOrderSearchResult } from './use-sales-order-search-query'

interface Props {
  order?: SalesOrderSearchResult
}

export function SalesOrderListItemView({ order }: Props) {
  return (
    <Stack fillHorizontal backgroundColor={COLOR.PRIMARY}>
      <Stack
        height={40}
        alignMiddle
        horizontal
        padding='horizontal:normal'
        backgroundColor={COLOR.ACCENT}
      >
        <SalesOrderIcon width={18} height={18} />
        <Spacer size='small' />
        <Text textColor={COLOR.PRIMARY}>INV# {order?.salesOrderID}</Text>
        <Spacer size='small' />
        <ArrowForwardIcon size={16} color={COLOR.PRIMARY} />
      </Stack>
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Spacer size='small' />
        <Stack fill>
          <Text textColor={COLOR_X.ACCENT2} fontSize='small'>
            Customer
          </Text>
          <Text textColor={COLOR.SECONDARY}>{order?.customerName}</Text>
        </Stack>
        <Spacer size='x-small' />
        <Stack alignRight width={100}>
          <Text textColor={COLOR_X.ACCENT2} fontSize='small'>
            Invoice #
          </Text>
          <Text textColor={COLOR_X.ACCENT2}>{order?.invoiceNumber}</Text>
        </Stack>
        <Stack alignRight width={100}>
          <Text textColor={COLOR_X.ACCENT2} fontSize='small'>
            # of units
          </Text>
          <Text textColor={COLOR_X.ACCENT2}>{order?.orderTotal}</Text>
        </Stack>
        <Spacer size='small' />
      </Stack>
      <Spacer size='x-small' />
    </Stack>
  )
}
