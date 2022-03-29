import { DataView } from '@silo-component/data-view'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import React from 'react'
import { FlatList } from 'react-native'
import { EmptySilosView } from './empty-silos-view'
import { PurchaseOrderListItemView } from './purchase-order-list-item-view'
import { PurchaseOrderSearchResult } from './use-purchase-order-search-query'

interface Props {
  orders?: Array<PurchaseOrderSearchResult>
  loading?: boolean
  error?: Error | null
  onSelect?: (id: number) => void
}

export function PurchaseOrderList({ orders, loading, error, onSelect }: Props) {
  const renderItem = React.useCallback(
    ({ item }: { item: PurchaseOrderSearchResult }) => (
      <Tappable data={item.id} onTap={onSelect}>
        <Stack fill>
          <PurchaseOrderListItemView order={item} />
          <Spacer size='x-small' />
        </Stack>
      </Tappable>
    ),
    [onSelect],
  )
  return (
    <Stack fill>
      {!orders ? <Header /> : null}
      <DataView
        fill
        isLoading={loading}
        error={error}
        data={orders}
        emptyMessage={<EmptySilosView />}
      >
        <FlatList data={orders} ListHeaderComponent={<Header />} renderItem={renderItem} />
      </DataView>
    </Stack>
  )
}

function Header() {
  return (
    <Stack padding='normal' fillHorizontal>
      <Spacer size='xx-small' />
      <Text fill fontSize='x-large' textColor={COLOR_X.ACCENT3}>
        Incoming
      </Text>
    </Stack>
  )
}
