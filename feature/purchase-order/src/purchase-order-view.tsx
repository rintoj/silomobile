import { Button } from '@silo-component/button'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { format } from 'date-fns'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import LocationIcon from './images/location.svg'
import { LotList } from './lot-list'
import { PurchaseOrder, PurchaseOrderStatus } from './use-purchase-order-query'

interface Props {
  order?: PurchaseOrder
  onReceiveTap?: () => void
  onOrderItemTap?: (orderID?: number) => void
}

export function PurchaseOrderView({ order, onReceiveTap, onOrderItemTap }: Props) {
  const [vendor] = order?.sellers ?? []
  const receivedOn = format(new Date(order?.deliveredAt ?? 0), 'MMM dd, yyyy - h:mmaaa')

  return (
    <Stack alignTop>
      <Spacer size='x-small' />
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
            {order?.salesOrderInvoiceNumber || ''}
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
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Stack horizontal alignMiddle>
            <Text textColor={COLOR_X.ACCENT2} fontSize='large'>
              Location
            </Text>
            <Spacer size='xx-small' />
            <LocationIcon />
          </Stack>
          <Text textColor={COLOR_X.ACCENT3} fontSize='large'>
            {order?.salesRep?.city}
          </Text>
        </Stack>
        <Stack fill padding='horizontal:normal'>
          <Stack fill alignRight>
            {order?.status === PurchaseOrderStatus.PENDING ? (
              <Button
                rounded={false}
                size='small'
                width={145}
                height={43}
                backgroundColor={COLOR.TRANSPARENT}
                border
                borderRadius='large'
                borderColor={COLOR.ACCENT}
                textColor={COLOR.ACCENT}
                onTap={onReceiveTap}
              >
                Receive PO
              </Button>
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
      <Spacer size='small' />
      <Spacer size='x-small' />
      <LotList orders={order?.orderItems} onOrderItemTap={onOrderItemTap} />
    </Stack>
  )
}
