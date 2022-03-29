import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { ArrowForwardIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import PurchaseOrderIcon from './images/po-icon.svg'
import { PurchaseOrderSearchResult } from './use-purchase-order-search-query'

interface Props {
  order?: PurchaseOrderSearchResult
}

export function PurchaseOrderListItemView({ order }: Props) {
  return (
    <Stack fillHorizontal backgroundColor={COLOR.PRIMARY}>
      <Stack
        height={40}
        alignMiddle
        horizontal
        padding='horizontal:normal'
        backgroundColor={COLOR.SUCCESS}
      >
        <PurchaseOrderIcon width={18} height={18} />
        <Spacer size='small' />
        <Text textColor={COLOR.PRIMARY}>PO# {order?.id}</Text>
        <Spacer size='small' />
        <ArrowForwardIcon size={16} color={COLOR.PRIMARY} />
      </Stack>
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Spacer size='small' />
        <Stack fill>
          <Text textColor={COLOR_X.ACCENT2} fontSize='small'>
            Vendor
          </Text>
          <Text textColor={COLOR_X.ACCENT3}>{order?.vendorName}</Text>
        </Stack>
        <Spacer size='x-small' />
        <Stack alignRight width={100}>
          <Text textColor={COLOR_X.ACCENT2} fontSize='small'>
            Vendor Inv #
          </Text>
          <Text textColor={COLOR_X.ACCENT2}>{order?.customerInvoiceNumber}</Text>
        </Stack>
        <Stack alignRight width={60}>
          <Text textColor={COLOR_X.ACCENT2} fontSize='small'>
            BOL #
          </Text>
          <Text textColor={COLOR_X.ACCENT2}>{order?.customerBOLNumber}</Text>
        </Stack>
        <Spacer size='small' />
      </Stack>
      <Spacer size='x-small' />
    </Stack>
  )
}
