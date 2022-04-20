import { Text } from '@silo-component/text'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import PlaceholderIcon from './images/placeholder.svg'

export function EmptyView() {
  return (
    <Stack fill>
      <Spacer fill />
      <Stack fillHorizontal alignCenter padding='large'>
        <PlaceholderIcon />
        <Spacer />
        <Text fontSize='normal' alignCenter fill textColor={COLOR.TERTIARY}>
          Scan any Silo label by pressing the button below
        </Text>
      </Stack>
      <Spacer fill />
    </Stack>
  )
}
