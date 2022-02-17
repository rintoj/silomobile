import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { LotItemView } from './lot-item-view'

export function LotItem() {
  return (
    <Stack fillHorizontal>
      <LotItemView />
      <Spacer size='x-small' />
    </Stack>
  )
}
