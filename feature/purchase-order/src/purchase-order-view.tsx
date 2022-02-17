import { Button } from '@silo-component/button'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { LocationIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'

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
      <Stack fillHorizontal horizontal padding='normal'>
        <Stack fill>
          <Text textColor={COLOR_X.ACCENT2}>Vendor</Text>
          <Text textColor={COLOR_X.ACCENT3}>{vendor.name}</Text>
          <Text textColor={COLOR_X.ACCENT3}>{vendor.address}</Text>
        </Stack>
        <Stack fill alignRight>
          <Text textColor={COLOR_X.ACCENT2}>Vendor Invoice #</Text>
          <Text textColor={COLOR_X.ACCENT3}>{invoice}</Text>
          <Spacer size='small' />
          <Text textColor={COLOR_X.ACCENT2}>BOL #</Text>
          <Text textColor={COLOR_X.ACCENT3}>{bol}</Text>
        </Stack>
      </Stack>
      <Stack fillHorizontal horizontal padding='normal'>
        <Stack fill>
          <Stack horizontal alignMiddle>
            <Text textColor={COLOR_X.ACCENT2}>Location</Text>
            <Spacer size='xx-small' />
            <LocationIcon size={14} color={COLOR_X.ACCENT2} />
          </Stack>
          <Text textColor={COLOR_X.ACCENT3}>{vendor.location}</Text>
        </Stack>
        <Stack fill>
          <Stack fill alignRight alignMiddle>
            {received ? (
              <Button
                rounded={false}
                size='small'
                fontSize='small'
                width={140}
                backgroundColor={COLOR.TRANSPARENT}
                border
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
