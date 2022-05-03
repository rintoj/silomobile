import { FormItem, isEmpty } from '@silo-component/form'
import { Picker } from '@silo-component/picker'
import { Text } from '@silo-component/text'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React, { useMemo } from 'react'
import { AccountType, useAccountsQuery } from './use-accounts-query'

const validators = [isEmpty('Choose a category ')]
export function AccountsFormItem() {
  const { data } = useAccountsQuery()
  const categories = useMemo(
    () =>
      (data?.accountingAccounts ?? []).map(({ id, name }: AccountType) => ({
        label: name,
        value: id,
      })),
    [data],
  )

  return (
    <Stack fillHorizontal>
      <Text>Account</Text>
      <Spacer size='x-small' />
      <FormItem name='selectedAccountingAccountID' validators={validators}>
        <Picker placeholder='Choose account' items={categories} />
      </FormItem>
    </Stack>
  )
}
