import { Text } from '@silo-component/text'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import PlaceHolderIcon from './images/placeholder.svg'

export function EmptySearchResultsView() {
  return (
    <Stack fill alignMiddle alignCenter>
      <Stack fillHorizontal alignCenter padding='large'>
        <PlaceHolderIcon />
        <Spacer />
        <Text fontSize='normal' alignCenter fill textColor={COLOR.TERTIARY}>
          No orders found
        </Text>
      </Stack>
      <Spacer size='x-large' />
    </Stack>
  )
}
