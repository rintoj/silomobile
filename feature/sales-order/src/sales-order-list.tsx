import { Button } from '@silo-component/button'
import { DataView } from '@silo-component/data-view'
import { FilterIcon, SearchIcon } from '@silo-component/icons'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { FlatList } from 'react-native'
import { EmptySearchResultsView } from './empty-search-results-view'
import { EmptyView } from './empty-view'
import { SalesOrderListItemView } from './sales-order-list-item-view'
import { SalesOrderSearchResult } from './use-sales-order-search-query'
interface Props {
  searchActive?: boolean
  orders?: Array<SalesOrderSearchResult>
  loading?: boolean
  error?: Error | null
  onSelect?: (id: number) => void
  onSearchIconTap?: () => void
  onClearSearchTap?: () => void
  onFilterIconTap?: () => void
}

export function SalesOrderList({
  orders,
  loading,
  error,
  searchActive,
  onSelect,
  onClearSearchTap,
  onSearchIconTap,
  onFilterIconTap,
}: Props) {
  const renderHeader = React.useCallback(
    () => (
      <Header
        searchActive={searchActive}
        onSearch={onSearchIconTap}
        onFilter={onFilterIconTap}
        onClearSearchTap={onClearSearchTap}
      />
    ),
    [searchActive, onClearSearchTap, onFilterIconTap, onSearchIconTap],
  )
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
      {!orders?.length ? renderHeader() : null}
      <DataView
        fill
        isLoading={loading}
        error={error}
        data={orders}
        emptyMessage={searchActive ? <EmptySearchResultsView /> : <EmptyView />}
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

function Header({
  searchActive,
  onSearch,
  onFilter,
  onClearSearchTap,
}: {
  searchActive?: boolean
  onClearSearchTap?: () => void
  onSearch?: () => void
  onFilter?: () => void
}) {
  return (
    <Stack padding='normal' fillHorizontal>
      <Spacer size='xx-small' />
      <Stack alignMiddle horizontal fillHorizontal>
        <Text fontSize='x-large' textColor={COLOR_X.ACCENT3}>
          {searchActive ? 'Results' : 'Outgoing'}
        </Text>
        <Spacer fill />
        {searchActive ? (
          <Button clear textColor={COLOR.TERTIARY} size='small' onTap={onClearSearchTap}>
            Clear Search
          </Button>
        ) : null}
        <Tappable onTap={onSearch}>
          <SearchIcon />
        </Tappable>

        {!searchActive ? (
          <>
            <Spacer />
            <Spacer size='x-small' />
            <Tappable onTap={onFilter}>
              <FilterIcon />
            </Tappable>
          </>
        ) : null}
        <Spacer size='x-small' />
      </Stack>
      <Spacer size='small' />
      <Text textColor={COLOR_X.ACCENT2}>{searchActive ? 'Search Results' : 'List of SOs'}</Text>
    </Stack>
  )
}
