import { Button } from '@silo-component/button'
import { TextInput } from '@silo-component/text-input'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'

interface Props {
  onSubmit?: () => void
}

export function PurchaseOrderQCForm({ onSubmit }: Props) {
  return (
    <Stack fill padding='normal'>
      <TextInput
        label='Container temp'
        placeholder='Container temp'
        placeholderColor={COLOR.TERTIARY}
        textColor={COLOR.SECONDARY}
      />
      <Spacer size='small' />
      <TextInput
        label='Notes'
        placeholder='Notes'
        placeholderColor={COLOR.TERTIARY}
        multiline
        numberOfLines={3}
        height={120}
      />
      <Spacer fill />
      <Button rounded={false} height={48} onTap={onSubmit}>
        Next: Lot-specific QC
      </Button>
      <Spacer />
    </Stack>
  )
}
