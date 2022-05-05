import { FormItem } from '@silo-component/form'
import { Picker } from '@silo-component/picker'
import { Text } from '@silo-component/text'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { useSuppliersQuery } from './use-suppliers-query'

export function VendorFormItem() {
  const { data } = useSuppliersQuery()
  const vendorList = React.useMemo(() => {
    return (data ?? []).map(supplier => ({
      value: supplier.accountID,
      label: supplier.companyName,
    }))
  }, [data])
  return (
    <Stack>
      <Text>Vendor</Text>
      <Spacer size='x-small' />
      <FormItem name='payableTo'>
        <Picker placeholder='Choose a vendor' items={vendorList} />
      </FormItem>
    </Stack>
  )
}
