import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { LotItem } from './lot-item'

interface Props {
  onSelectItem?: () => void
}

export function LotList({ onSelectItem }: Props) {
  return (
    <Stack fillHorizontal>
      <Stack padding='horizontal:normal'>
        <Text textColor={COLOR_X.ACCENT2}>List Of Lots</Text>
      </Stack>
      <Spacer size='x-small' />
      <LotItem onSelect={onSelectItem} />
      <Spacer size='xx-small' />
      <LotItem onSelect={onSelectItem} />
      <Spacer size='xx-small' />
      <LotItem onSelect={onSelectItem} />
      <Spacer size='xx-small' />
      <LotItem onSelect={onSelectItem} />
    </Stack>
  )
}
