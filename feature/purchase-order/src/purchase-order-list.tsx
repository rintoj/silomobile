import { DataView } from '@silo-component/data-view'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { FilterIcon, SearchIcon } from 'native-x-icon'
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
  onSearchIconTap?: () => void
  onFilterIconTap?: () => void
}

export function PurchaseOrderList({
  orders,
  loading,
  error,
  onSelect,
  onSearchIconTap,
  onFilterIconTap,
}: Props) {
  const renderHeader = React.useCallback(
    () => <Header onSearch={onSearchIconTap} onFilter={onFilterIconTap} />,
    [onFilterIconTap, onSearchIconTap],
  )
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
      {!orders ? renderHeader() : null}
      <DataView
        fill
        isLoading={loading}
        error={error}
        data={orders}
        emptyMessage={<EmptySilosView />}
      >
        <FlatList
          data={orders}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader()}
          ListFooterComponent={<Spacer size='large' />}
        />
      </DataView>
    </Stack>
  )
}

function Header({ onSearch, onFilter }: { onSearch?: () => void; onFilter?: () => void }) {
  return (
    <Stack padding='normal' fillHorizontal>
      <Spacer size='xx-small' />
      <Stack horizontal fillHorizontal>
        <Text fontSize='x-large' textColor={COLOR_X.ACCENT3}>
          Incoming
        </Text>
        <Spacer fill />
        <Tappable onTap={onSearch}>
          <SearchIcon />
        </Tappable>
        <Spacer />
        <Spacer size='x-small' />
        <Tappable onTap={onFilter}>
          <FilterIcon />
        </Tappable>
        <Spacer size='x-small' />
      </Stack>

      <Spacer size='small' />
      <Text textColor={COLOR_X.ACCENT2}>List of POs</Text>
    </Stack>
  )
}
