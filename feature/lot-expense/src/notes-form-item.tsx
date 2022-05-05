import { BottomSheetTextInput } from '@silo-component/bottom-sheet'
import { FormItem } from '@silo-component/form'
import { COLOR } from 'native-x-theme'
import React from 'react'

export function NotesFormItem() {
  return (
    <FormItem name='note'>
      <BottomSheetTextInput
        label='Notes'
        multiline
        numberOfLines={3}
        height={64}
        placeholderColor={COLOR.TERTIARY}
        borderColor={COLOR.TERTIARY}
        backgroundColor={COLOR.DIVIDER}
      />
    </FormItem>
  )
}
