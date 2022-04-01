import { RouteProp, useRoute } from '@react-navigation/core'
import type { StackScreenProps } from '@react-navigation/stack'
import { PageHeader } from '@silo-component/page-header'
import { Screen } from '@silo-component/screen'
import { Text } from '@silo-component/text'
import { SalesOrder } from '@silo-feature/sales-order'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { Screens } from '../navigation/screens'
import { OutgoingOrdersStackParamList } from './outgoing-orders-stack'
import SalesOrderIcon from './so.svg'

type SalesOrderParamList = {
  [Screens.SalesOrder]: { id: number }
}

export function SalesOrderScreen({
  navigation: { push },
}: StackScreenProps<OutgoingOrdersStackParamList>) {
  const { params } = useRoute<RouteProp<SalesOrderParamList>>()
  const { id } = params ?? {}
  const navigateToLotDetails = React.useCallback(
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
      <Stack fill backgroundColor={COLOR_X.PAGE}>
        <Spacer />
        <Spacer size='small' />
        <PageHeader showBackButton accentColor={COLOR.ACCENT}>
          <Stack horizontal alignMiddle fill alignCenter>
            <SalesOrderIcon />
            <Spacer size='small' />
            <Text semiBold fontSize='x-large' textColor={COLOR.PRIMARY}>
              INV# {id}
            </Text>
          </Stack>
        </PageHeader>
        <SalesOrder id={id} onOrderItemTap={navigateToLotDetails} />
      </Stack>
    </Screen>
  )
}
