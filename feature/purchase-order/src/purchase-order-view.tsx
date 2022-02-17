import { Button } from '@silo-component/button'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import LocationIcon from './images/location.svg'

enum PurchaseOrderStatus {
  RECEIVED = 'RECEIVED',
  PENDING = 'PENDING',
}

interface PurchaseOrder {
  id: number
  vendor: {
    id: string
    name?: string
    address?: string
    location?: string
  }
  invoice?: number
  bol?: number
  receivedOn?: string
  status?: PurchaseOrderStatus
}

interface Props {
  order: PurchaseOrder
  onReceiveTap?: () => void
}

export function PurchaseOrderView({ onReceiveTap, order }: Props) {
  const { vendor, invoice, bol, status, receivedOn } = order
  const received = status === 'RECEIVED'
  return (
    <Stack alignTop>
      <Spacer size='x-small' />
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Vendor</Text>
          <Text fill textColor={COLOR_X.ACCENT3} fontSize='large'>
            {vendor.name}
          </Text>
          <Text textColor={COLOR_X.ACCENT3} fontSize='large'>
            {vendor.address}
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Vendor Invoice #</Text>
          <Text textColor={COLOR_X.ACCENT3} fontSize='large'>
            {invoice}
          </Text>
          <Spacer size='small' />
          <Spacer size='xx-small' />
          <Text textColor={COLOR_X.ACCENT2}>BOL #</Text>
          <Text textColor={COLOR_X.ACCENT3} fontSize='large'>
            {bol}
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
            {vendor.location}
          </Text>
        </Stack>
        <Stack fill padding='horizontal:normal'>
          <Stack fill alignRight>
            {received ? (
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
    </Stack>
  )
}
