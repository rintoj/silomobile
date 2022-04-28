import { Button } from '@silo-component/button'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'

interface Props {
  onAddQCTap?: () => void
  onPrintLabelTap?: () => void
}

export function PurchaseOrderActions({ onAddQCTap, onPrintLabelTap }: Props) {
  return (
    <Stack
      padding={['vertical:large', 'horizontal:normal']}
      horizontal
      fillHorizontal
      backgroundColor={COLOR.PRIMARY}
    >
      <Spacer size='x-small' />
      <Button
        width={155}
        outline
        rounded={false}
        border
        textColor={COLOR.ACCENT}
        borderColor={COLOR.ACCENT}
        onTap={onAddQCTap}
      >
        Add QC
      </Button>
      <Spacer fill />
      <Button
        width={155}
        outline
        rounded={false}
        border
        textColor={COLOR.ACCENT}
        borderColor={COLOR.ACCENT}
        onTap={onPrintLabelTap}
      >
        Print labels
      </Button>
      <Spacer size='x-small' />
    </Stack>
  )
}
