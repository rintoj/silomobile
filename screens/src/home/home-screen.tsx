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
    startDate?: string
    endDate?: string
    locationId?: string
    customerInvoiceNumber?: string
    purchaseOrderNumber?: string
  }
}

const ONE_MONTH_AGO = new Date(Date.now() - 60 * 60 * 24 * 30 * 1000)
const TODAY = new Date()

export function HomeScreen({ navigation }: StackScreenProps<any>) {
  const [fromDate, setFromDate] = React.useState(ONE_MONTH_AGO)
  const [toDate, setToDate] = React.useState(TODAY)
  const { params } = useRoute<RouteProp<HomeScreenParamList>>()
  const { id, locationId, customerInvoiceNumber, purchaseOrderNumber, startDate, endDate } =
    params ?? {}

  const navigateToPurchaseOrderDetails = (orderId: number) => {
    navigation.navigate(Screens.HomeTab, { screen: Screens.PurchaseOrder, params: { id: orderId } })
  }
  const navigateToSearch = () => {
    navigation.navigate(Modals.Search, { target: Screens.Home })
  }
  const navigateToFilters = () => {
    navigation.navigate(Modals.Filters, { target: Screens.Home })
  }
  const clearSearchParams = () => {
    navigation.navigate(Screens.Home)
  }

  React.useEffect(() => {
    if (startDate) {
      setFromDate(new Date(startDate))
    }
  }, [startDate])

  React.useEffect(() => {
    if (endDate) {
      setToDate(new Date(endDate))
    }
  }, [endDate])

  return (
    <Screen>
      <StatusBar barStyle='light-content' backgroundColor='#235039' animated />
      <Stack fill backgroundColor={COLOR.PRIMARY}>
        <Stack alignCenter fill backgroundColor={COLOR_X.PAGE}>
          <Spacer size='large' />
          <PurchaseOrders
            id={id}
            to={toDate}
            from={fromDate}
            locationId={locationId}
            customerInvoiceNumber={customerInvoiceNumber}
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
