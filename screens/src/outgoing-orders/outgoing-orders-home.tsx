import type { StackScreenProps } from '@react-navigation/stack'
import { Screen } from '@silo-component/screen'
import { SalesOrders } from '@silo-feature/sales-order'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { StatusBar } from 'react-native'
import { Screens } from '../navigation/screens'

export function OutgoingOrdersHomeScreen({ navigation }: StackScreenProps<any>) {
  const navigateToSalesOrderDetails = (id: number) => {
    navigation.navigate(Screens.OutgoingOrdersTab, { screen: Screens.SalesOrder, params: { id } })
  }
  return (
    <Screen>
      <StatusBar barStyle='light-content' backgroundColor='#235039' animated />
      <Stack fill backgroundColor={COLOR.PRIMARY}>
        <Stack alignCenter fill backgroundColor={COLOR_X.PAGE}>
          <Spacer size='large' />
          <SalesOrders onSelect={navigateToSalesOrderDetails} />
        </Stack>
      </Stack>
    </Screen>
  )
}
