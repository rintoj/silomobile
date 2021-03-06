import { RouteProp, useRoute } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import { PageHeader } from '@silo-component/page-header'
import { Screen } from '@silo-component/screen'
import { Text } from '@silo-component/text'
import { PurchaseOrder } from '@silo-feature/purchase-order'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { Modals } from '../navigation/modals'
import { Screens } from '../navigation/screens'
import PurchaseOrderIcon from './po.svg'

type PurchaseOrderParamList = {
  [Screens.PurchaseOrder]: { id: number }
}

export function PurchaseOrderScreen() {
  const { navigate, push } = useNavigation<any>()
  const { params } = useRoute<RouteProp<PurchaseOrderParamList>>()
  const { id } = params ?? {}

  const navigateToLotDetails = React.useCallback(
    (orderID?: number) => push(Screens.LotDetails, { id: orderID }),
    [push],
  )

  const openAddQCModal = React.useCallback(() => navigate(Modals.AddQC, { id }), [id, navigate])

  return (
    <Screen withSafeArea>
      <Stack fill backgroundColor={COLOR_X.PAGE}>
        <Spacer />
        <Spacer size='small' />
        <PageHeader showBackButton accentColor={COLOR.SUCCESS}>
          <Stack horizontal alignMiddle fill alignCenter>
            <PurchaseOrderIcon />
            <Spacer size='small' />
            <Text semiBold fontSize='x-large' textColor={COLOR.PRIMARY}>
              PO # {id}
            </Text>
          </Stack>
        </PageHeader>
        <PurchaseOrder id={id} onOrderItemTap={navigateToLotDetails} onAddQCTap={openAddQCModal} />
      </Stack>
    </Screen>
  )
}
