import { DataView } from '@silo-component/data-view'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import React from 'react'
import { FlatList } from 'react-native'
import { EmptyView } from './empty-view'
import { SalesOrderListItemView } from './sales-order-list-item-view'
import { SalesOrderSearchResult } from './use-sales-order-search-query'

interface Props {
  orders?: Array<SalesOrderSearchResult>
  loading?: boolean
  error?: Error | null
  onSelect?: (id: number) => void
}

export function SalesOrderList({ orders, loading, error, onSelect }: Props) {
  const renderItem = React.useCallback(
    ({ item }: { item: SalesOrderSearchResult }) => (
      <Tappable data={item.salesOrderID} onTap={onSelect}>
        <Stack fill>
          <SalesOrderListItemView order={item} />
          <Spacer size='x-small' />
        </Stack>
      </Tappable>
    ),
    [onSelect],
  )
  return (
    <Stack fill>
      {!orders ? <Header /> : null}
      <DataView fill isLoading={loading} error={error} data={orders} emptyMessage={<EmptyView />}>
        <FlatList
          data={orders}
          renderItem={renderItem}
          ListHeaderComponent={<Header />}
          ListFooterComponent={<Spacer size='large' />}
        />
      </DataView>
    </Stack>
  )
}

function Header() {
  return (
    <Stack padding='normal' fillHorizontal>
      <Spacer size='xx-small' />
      <Text fill fontSize='x-large' textColor={COLOR_X.ACCENT3}>
        Outgoing
      </Text>
      <Spacer size='small' />
      <Text textColor={COLOR_X.ACCENT2}>List of SOs</Text>
    </Stack>
  )
}
