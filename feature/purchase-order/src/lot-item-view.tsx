import React from 'react'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import { COLOR_X } from '@silo-feature/theme'
import { Text } from '@silo-component/text'
import LotIcon from './lot-icon.svg'
import { Spacer } from 'native-x-spacer'

import { ArrowForwardIcon } from 'native-x-icon'
export function LotItemView() {
  return (
    <Stack fillHorizontal>
      <Stack
        height={37}
        alignMiddle
        horizontal
        padding='horizontal:normal'
        backgroundColor={COLOR_X.ACCENT4}
      >
        <LotIcon width={18} height={18} />
        <Spacer size='small' />
        <Text textColor={COLOR.PRIMARY}>LOT# ANG-001617</Text>
        <Spacer size='small' />
        <ArrowForwardIcon size={16} color={COLOR.PRIMARY} />
      </Stack>
      <Stack padding='normal' backgroundColor={COLOR.PRIMARY}>
        <Text textColor={COLOR_X.ACCENT2}>Location</Text>
        <Text textColor={COLOR_X.ACCENT3}>Angel Sweet Cherry Tomato - 2 pint - Green Label</Text>
      </Stack>
    </Stack>
  )
}
