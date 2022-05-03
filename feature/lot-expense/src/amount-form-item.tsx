import { BottomSheetTextInput } from '@silo-component/bottom-sheet'
import { FormItem, isEmpty, Validator } from '@silo-component/form'
import { COLOR } from 'native-x-theme'
import React from 'react'

function isPositiveValue<T>(errorMessage: string): Validator<T> {
  return (text: T) => {
    if (typeof text === 'number' && text > 0) {
      return undefined
    }
    if (typeof text !== 'string') {
      return text ? undefined : errorMessage
    }
    const value = parseFloat(text.trim())
    return isNaN(value) || value <= 0 ? errorMessage : undefined
  }
}

const validators = [isEmpty('Amount cannot be empty'), isPositiveValue('Invalid amount')]

export function AmountFormItem() {
  return (
    <FormItem name='amount' validators={validators}>
      <BottomSheetTextInput
        label='Amount'
        placeholder='0.00'
        keyboardType='decimal-pad'
        placeholderColor={COLOR.TERTIARY}
        borderColor={COLOR.TERTIARY}
        backgroundColor={COLOR.DIVIDER}
      />
    </FormItem>
  )
}
