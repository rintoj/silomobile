import { Text } from '@silo-component/text'
import { ReceivePoButton } from '@silo-feature/receive-po'
import { COLOR_X } from '@silo-feature/theme'
import { format } from 'date-fns'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { PurchaseOrder, PurchaseOrderStatus } from './use-purchase-order-query'

interface Props {
  order?: PurchaseOrder
}

export function PurchaseOrderSummaryView({ order }: Props) {
  const [vendor] = order?.sellers ?? []
  const receivedOn = format(new Date(order?.deliveredAt ?? 0), 'MMM dd, yyyy - h:mmaaa')
  return (
    <Stack fillHorizontal>
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Vendor</Text>
          <Text fill textColor={COLOR_X.ACCENT3} fontSize='large'>
            {vendor?.name}
          </Text>
          <Text textColor={COLOR_X.ACCENT3} fontSize='large'>
            {vendor?.shippingAddress?.name}
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Vendor Invoice #</Text>
          <Text textColor={COLOR_X.ACCENT3} fontSize='large'>
            {order?.customerInvoiceNumber || ''}
          </Text>
          <Spacer size='small' />
          <Spacer size='xx-small' />
          <Text textColor={COLOR_X.ACCENT2}>BOL #</Text>
          <Text textColor={COLOR_X.ACCENT3} fontSize='large'>
            {order?.customerBOLNumber || ''}
          </Text>
        </Stack>
      </Stack>
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal padding={['vertical:small', 'horizontal:normal']}>
        <Stack fill>
          <Stack horizontal alignMiddle>
            <Text textColor={COLOR_X.ACCENT2} fontSize='large'>
              Location
            </Text>
          </Stack>
          <Text textColor={COLOR_X.ACCENT3} fontSize='large'>
            {order?.salesRep?.city}
          </Text>
        </Stack>
        <Spacer size='x-small' />
        <Stack fill>
          <Stack fill alignRight>
            {order?.status === PurchaseOrderStatus.PENDING ? (
              <ReceivePoButton orderID={order.id} />
            ) : (
              <>
                <Text textColor={COLOR_X.ACCENT2} alignRight>
                  Received
                </Text>
                <Text textColor={COLOR_X.ACCENT3} alignRight>
                  {receivedOn}
                </Text>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
