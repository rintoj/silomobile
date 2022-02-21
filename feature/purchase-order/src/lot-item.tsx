import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import React from 'react'
import { LotItemView } from './lot-item-view'

interface Props {
  onSelect?: () => void
}
export function LotItem({ onSelect }: Props) {
  return (
    <Tappable onTap={onSelect}>
      <Stack fillHorizontal>
        <LotItemView />
        <Spacer size='x-small' />
      </Stack>
    </Tappable>
  )
}
