import { BottomSheetTextInput } from '@silo-component/bottom-sheet'
import { FormItem } from '@silo-component/form'
import { COLOR } from 'native-x-theme'
import React from 'react'

export function InvoiceNumberFormItem() {
  return (
    <FormItem name='invoice'>
      <BottomSheetTextInput
        label='Invoice #'
        placeholder='Choose category'
        keyboardType='decimal-pad'
        placeholderColor={COLOR.TERTIARY}
        borderColor={COLOR.TERTIARY}
        backgroundColor={COLOR.DIVIDER}
      />
    </FormItem>
  )
}
