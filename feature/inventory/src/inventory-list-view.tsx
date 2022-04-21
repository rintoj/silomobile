import { DataView } from '@silo-component/data-view'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { EmptyView } from './empty-view'
import { InventoryListItemView } from './inventory-list-item-view'
import { InventoryType } from './use-inventory-query'

interface Props {
  inventories?: Array<InventoryType>
  loading?: boolean
  error?: Error | null
  onSelect?: (id: number) => void
}

export function InventoryListView({ inventories, loading, error, onSelect }: Props) {
  const renderHeader = useCallback(() => {
    return (
      <Stack padding='normal' fillHorizontal>
        <Spacer size='xx-small' />
        <Stack alignMiddle horizontal fillHorizontal>
          <Text fontSize='x-large' textColor={COLOR_X.ACCENT3}>
            Inventory
          </Text>
          <Spacer fill />
        </Stack>

        <Spacer size='small' />
        <Text textColor={COLOR_X.ACCENT2}>List of Lots</Text>
      </Stack>
    )
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: InventoryType }) => {
      return (
        <Tappable data={item.inventoryID} onTap={onSelect}>
          <InventoryListItemView inventory={item} />
        </Tappable>
      )
    },
    [onSelect],
  )

  return (
    <Stack fill>
      <DataView
        fill
        isLoading={loading}
        error={error}
        data={inventories}
        emptyMessage={<EmptyView />}
      >
        <FlatList
          data={inventories}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader()}
          ListFooterComponent={<Spacer size='large' />}
        />
      </DataView>
    </Stack>
  )
}
