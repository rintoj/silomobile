import { RouteProp, useRoute } from '@react-navigation/core'
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

type HomeScreenParamList = {
  [Screens.Home]: {
    id?: string
    invoiceNumber?: string
    purchaseOrderNumber?: string
  }
}

export function HomeScreen({ navigation }: StackScreenProps<any>) {
  const { params } = useRoute<RouteProp<HomeScreenParamList>>()
  const { id, invoiceNumber, purchaseOrderNumber } = params ?? {}

  const navigateToPurchaseOrderDetails = (orderId: number) => {
    navigation.navigate(Screens.HomeTab, { screen: Screens.PurchaseOrder, params: { id: orderId } })
  }
  const navigateToSearch = () => {
    navigation.navigate(Modals.Search, { target: Screens.Home })
  }
  const navigateToFilters = () => {
    navigation.navigate(Modals.Filters)
  }
  const clearSearchParams = () => {
    navigation.navigate(Screens.Home)
  }

  return (
    <Screen>
      <StatusBar barStyle='light-content' backgroundColor='#235039' animated />
      <Stack fill backgroundColor={COLOR.PRIMARY}>
        <Stack alignCenter fill backgroundColor={COLOR_X.PAGE}>
          <Spacer size='large' />
          <PurchaseOrders
            id={id}
            customerInvoiceNumber={invoiceNumber}
            purchaseOrderNumber={purchaseOrderNumber}
            onSelect={navigateToPurchaseOrderDetails}
            onClearSearchTap={clearSearchParams}
            onSearchIconTap={navigateToSearch}
            onFilterIconTap={navigateToFilters}
          />
        </Stack>
      </Stack>
    </Screen>
  )
}
