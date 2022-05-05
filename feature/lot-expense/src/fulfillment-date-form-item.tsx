import { DatePicker } from '@silo-component/date-picker'
import { FormItem } from '@silo-component/form'
import { Text } from '@silo-component/text'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'

export function FulfillmentDateFormItem() {
  return (
    <Stack fillHorizontal>
      <Text>Fulfillment Date </Text>
      <Spacer size='x-small' />
      <FormItem name='serviceDate'>
        <DatePicker />
      </FormItem>
    </Stack>
  )
}
