import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'

const style = {
  container: {
    shadowColor: '#8291a5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
}
interface Props {
  title?: string
  value?: string | number
  alignRight?: boolean
}

export function SummaryTile({ title, value, alignRight }: Props) {
  return (
    <Stack
      width={76}
      height={65}
      alignMiddle
      backgroundColor={COLOR.PRIMARY}
      style={style.container}
      overflowVisible
      padding='small'
    >
      <Stack alignRight={alignRight}>
        <Text fontSize='x-small' textColor={COLOR.TERTIARY}>
          {title}
        </Text>
        <Text fontSize='xxx-large' textColor={COLOR_X.ACCENT5}>
          {value}
        </Text>
      </Stack>
    </Stack>
  )
}
