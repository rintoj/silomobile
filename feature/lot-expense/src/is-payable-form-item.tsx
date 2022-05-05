import { FormItem, Validator } from '@silo-component/form'
import { Picker } from '@silo-component/picker'
import { Text } from '@silo-component/text'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React, { useMemo } from 'react'

function isEmpty<T>(errorMessage: string): Validator<T> {
  return (value: T) => {
    return value !== undefined ? undefined : errorMessage
  }
}

const validators = [isEmpty('Pick an option')]
export function IsPayableFormItem() {
  const payableOptions = useMemo(
    () => [
      {
        value: false,
        label: 'No',
      },
      {
        value: true,
        label: 'Yes, add to AP',
      },
    ],
    [],
  )
  return (
    <Stack fillHorizontal>
      <Text>Is it a payable? </Text>
      <Spacer size='x-small' />
      <FormItem name='isPayable' validators={validators}>
        <Picker items={payableOptions} placeholder='Pick an option' />
      </FormItem>
    </Stack>
  )
}
