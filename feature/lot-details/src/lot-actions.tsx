import { Button } from '@silo-component/button'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'

interface Props {
  onAddExpenseTap?: () => void
}

export function LotActions({ onAddExpenseTap }: Props) {
  return (
    <Stack
      padding={['vertical:large', 'horizontal:normal']}
      horizontal
      fillHorizontal
      backgroundColor={COLOR.PRIMARY}
      justifyAround
    >
      <Button
        width={150}
        outline
        size='small'
        rounded={false}
        border
        textColor={COLOR.ACCENT}
        borderColor={COLOR.ACCENT}
        onTap={onAddExpenseTap}
      >
        Add expense
      </Button>
      <Button
        width={150}
        outline
        size='small'
        rounded={false}
        border
        textColor={COLOR.ACCENT}
        borderColor={COLOR.ACCENT}
      >
        Phys. O/H
      </Button>
    </Stack>
  )
}
