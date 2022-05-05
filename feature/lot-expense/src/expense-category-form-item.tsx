import { FormItem, isEmpty } from '@silo-component/form'
import { Picker } from '@silo-component/picker'
import { Text } from '@silo-component/text'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React, { useMemo } from 'react'
import { useExpenseCategoriesQuery } from './use-expense-categories-query'

const validators = [isEmpty('Choose a category ')]
export function ExpenseCategoryFormItem() {
  const { data } = useExpenseCategoriesQuery()
  const categories = useMemo(
    () => (data ?? []).map((category: string) => ({ label: category, value: category })),
    [data],
  )
  return (
    <Stack fillHorizontal>
      <Text>Type </Text>
      <Spacer size='x-small' />
      <FormItem name='category' validators={validators}>
        <Picker placeholder='Choose category' items={categories} />
      </FormItem>
    </Stack>
  )
}
