import type { StackScreenProps } from '@react-navigation/stack'
import { Screen } from '@silo-component/screen'
import { InventoryList } from '@silo-feature/inventory'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { Screens } from '../navigation/screens'
import { InventoryStackParamList } from './inventory-stack'

export function InventoryHome({ navigation: { push } }: StackScreenProps<InventoryStackParamList>) {
  const navigateToLotDetailsScreen = React.useCallback(
    (orderID?: number) => {
      if (!orderID) {
        return
      }
      push(Screens.LotDetails, { id: orderID })
    },
    [push],
  )

  return (
    <Screen withSafeArea>
      <Stack alignCenter fill backgroundColor={COLOR_X.PAGE}>
        <Spacer size='large' />
        <InventoryList onLotSelect={navigateToLotDetailsScreen} />
      </Stack>
    </Screen>
  )
}
