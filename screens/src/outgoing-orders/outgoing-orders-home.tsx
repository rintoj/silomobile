import { RouteProp, useRoute } from '@react-navigation/core'
import type { StackScreenProps } from '@react-navigation/stack'
import { Screen } from '@silo-component/screen'
import { SalesOrders } from '@silo-feature/sales-order'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { StatusBar } from 'react-native'
import { Modals } from '../navigation/modals'
import { Screens } from '../navigation/screens'

const ONE_MONTH_AGO = new Date(Date.now() - 60 * 60 * 24 * 30 * 1000)
const TODAY = new Date()

type OutgoingOrdersHomeParamList = {
  [Screens.Home]: {
    id?: string
    startDate?: string
    endDate?: string
    locationId?: string
    invoiceNumber?: string
    purchaseOrderNumber?: string
  }
}

export function OutgoingOrdersHomeScreen({ navigation }: StackScreenProps<any>) {
  const { params } = useRoute<RouteProp<OutgoingOrdersHomeParamList>>()
  const [fromDate, setFromDate] = React.useState(ONE_MONTH_AGO)
  const [toDate, setToDate] = React.useState(TODAY)
  const { id, invoiceNumber, purchaseOrderNumber, startDate, endDate, locationId } = params ?? {}
  const navigateToSearch = () => {
    navigation.navigate(Modals.Search, { target: Screens.OutgoingOrdersHome })
  }
  const navigateToFilters = () => {
    navigation.navigate(Modals.Filters, { target: Screens.OutgoingOrdersHome })
  }
  const clearSearchParams = () => {
    navigation.navigate(Screens.OutgoingOrdersHome)
  }

  const navigateToSalesOrderDetails = (orderId: number) => {
    navigation.navigate(Screens.OutgoingOrdersTab, {
      screen: Screens.SalesOrder,
      params: { id: orderId },
    })
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
          <SalesOrders
            id={id}
            from={fromDate}
            to={toDate}
            locationId={locationId}
            onSelect={navigateToSalesOrderDetails}
            invoiceNumber={invoiceNumber}
            purchaseOrderNumber={purchaseOrderNumber}
            onClearSearchTap={clearSearchParams}
            onSearchIconTap={navigateToSearch}
            onFilterIconTap={navigateToFilters}
          />
        </Stack>
      </Stack>
    </Screen>
  )
}
