import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { ArrowForwardIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import LocationIcon from './images/location-icon.svg'
import PurchaseOrderIcon from './images/po-icon.svg'
import { SummaryTile } from './summary-tile'
import { Lot } from './use-lot-query'
import { Tappable } from 'native-x-tappable'

interface Props {
  lot?: Lot
  onPurchaseOrderTap?: (id?: number) => void
}

export function LotDetailsView({ lot, onPurchaseOrderTap }: Props) {
  const ageInInventory = Math.floor(
    (Date.now() - new Date(lot?.fulfillmentDate ?? 0).getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <Stack fill>
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Vendor</Text>
          <Text fill textColor={COLOR_X.ACCENT3} fontSize='large'>
            {lot?.supplier}
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal' maxWidth={170}>
          <Stack horizontal alignMiddle>
            <PurchaseOrderIcon />
            <Spacer size='xx-small' />
            <Text textColor={COLOR.SUCCESS}>PO{'  '}#</Text>
          </Stack>
          <Stack horizontal alignMiddle>
            <Tappable data={lot?.purchaseOrderID} onTap={onPurchaseOrderTap}>
              <Text>
                <ArrowForwardIcon color={COLOR.SUCCESS} size={21} />
                <Spacer size='xx-small' />
                <Text fontSize='large' textColor={COLOR.SUCCESS}>
                  {lot?.purchaseOrderID}
                </Text>
              </Text>
            </Tappable>
          </Stack>
        </Stack>
      </Stack>
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Product</Text>
          <Text fontSize='large' fill textColor={COLOR_X.ACCENT3}>
            {lot?.product?.name}
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal' maxWidth={170}>
          <Text textColor={COLOR_X.ACCENT2}>Unit</Text>
          <Text fontSize='large' alignRight textColor={COLOR_X.ACCENT3}>
            {lot?.unit?.name}
          </Text>
        </Stack>
      </Stack>
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Label</Text>
          <Text fontSize='large' fill textColor={COLOR_X.ACCENT3}>
            {lot?.internalLabel?.name}
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal' maxWidth={170}>
          <Text textColor={COLOR_X.ACCENT2}>Origin</Text>
          <Text fontSize='large' textColor={COLOR_X.ACCENT3}>
            {lot?.origin?.country}
          </Text>
        </Stack>
      </Stack>
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>
            Location <LocationIcon />
          </Text>
          <Text fontSize='large' fill textColor={COLOR_X.ACCENT3}>
            {lot?.location.name}
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal' maxWidth={170}>
          <Text textColor={COLOR_X.ACCENT2}>Age in Inventory</Text>
          <Text fontSize='large' alignRight textColor={COLOR_X.ACCENT3}>
            {ageInInventory}
          </Text>
        </Stack>
      </Stack>
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal justifyBetween padding='normal' overflowVisible>
        <SummaryTile title='Orig Qty' value={lot?.receivedQuantity} />
        <SummaryTile title='Sold' value={lot?.outboundTransferQuantity} />
        <SummaryTile title='Returned' value={lot?.returnedQuantity} alignRight />
        <SummaryTile title='O/H' value={lot?.remainingQuantity} alignRight />
      </Stack>
    </Stack>
  )
}
