import type { StackScreenProps } from '@react-navigation/stack'
import { Screen } from '@silo-component/screen'
import { PurchaseOrders } from '@silo-feature/purchase-order'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { StatusBar } from 'react-native'
import { Modals } from '../navigation/modals'
import { Screens } from '../navigation/screens'

export function HomeScreen({ navigation }: StackScreenProps<any>) {
  const navigateToPurchaseOrderDetails = (id: number) => {
    navigation.navigate(Screens.HomeTab, { screen: Screens.PurchaseOrder, params: { id } })
  }
  const navigateToSearch = () => {
    navigation.navigate(Modals.Search)
  }
  const navigateToFilters = () => {
    navigation.navigate(Modals.Filters)
  }

  return (
    <Screen>
      <StatusBar barStyle='light-content' backgroundColor='#235039' animated />
      <Stack fill backgroundColor={COLOR.PRIMARY}>
        <Stack alignCenter fill backgroundColor={COLOR_X.PAGE}>
          <Spacer size='large' />
          <PurchaseOrders
            onSelect={navigateToPurchaseOrderDetails}
            onSearchIconTap={navigateToSearch}
            onFilterIconTap={navigateToFilters}
          />
        </Stack>
      </Stack>
    </Screen>
  )
}
