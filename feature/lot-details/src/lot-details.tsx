import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { ArrowForwardIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import PurchaseOrderIcon from './images/po-icon.svg'
import LocationIcon from './images/location-icon.svg'
import { SummaryTile } from './summary-tile'

export function LotDetails() {
  return (
    <Stack fill>
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Vendor</Text>
          <Text fill textColor={COLOR_X.ACCENT3} fontSize='large'>
            Productora de Tomates Oaxaca, SA de CV
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal' maxWidth={170}>
          <Stack horizontal alignMiddle>
            <PurchaseOrderIcon />
            <Spacer size='xx-small' />
            <Text textColor={COLOR.SUCCESS}>PO{'  '}#</Text>
          </Stack>
          <Stack horizontal alignMiddle>
            <ArrowForwardIcon color={COLOR.SUCCESS} size={21} />
            <Spacer size='xx-small' />
            <Text fontSize='large' textColor={COLOR.SUCCESS}>
              65444
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Product</Text>
          <Text fontSize='large' fill textColor={COLOR_X.ACCENT3}>
            Angel Sweet Cherry Tomato
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal' maxWidth={170}>
          <Text textColor={COLOR_X.ACCENT2}>Unit</Text>
          <Text fontSize='large' textColor={COLOR_X.ACCENT3}>
            2 pint
          </Text>
        </Stack>
      </Stack>
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>Label</Text>
          <Text fontSize='large' fill textColor={COLOR_X.ACCENT3}>
            Green Label
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal' maxWidth={170}>
          <Text textColor={COLOR_X.ACCENT2}>Origin</Text>
          <Text fontSize='large' textColor={COLOR_X.ACCENT3}>
            MX
          </Text>
        </Stack>
      </Stack>
      <Stack fillHorizontal horizontal padding='vertical:small'>
        <Stack fill padding='horizontal:normal'>
          <Text textColor={COLOR_X.ACCENT2}>
            Location <LocationIcon />
          </Text>
          <Text fontSize='large' fill textColor={COLOR_X.ACCENT3}>
            Nogales Warehouse
          </Text>
        </Stack>
        <Stack fill alignRight padding='horizontal:normal' maxWidth={170}>
          <Text textColor={COLOR_X.ACCENT2}>Age in Inventory</Text>
          <Text fontSize='large' textColor={COLOR_X.ACCENT3}>
            13 days
          </Text>
        </Stack>
      </Stack>
      <Spacer size='xx-small' />
      <Stack fillHorizontal horizontal justifyBetween padding='normal' overflowVisible>
        <SummaryTile title='Orig Qty' value={50} />
        <SummaryTile title='Sold' value={20} />
        <SummaryTile title='Returned' value={0} alignRight />
        <SummaryTile title='O/H' value={30} alignRight />
      </Stack>
    </Stack>
  )
}
