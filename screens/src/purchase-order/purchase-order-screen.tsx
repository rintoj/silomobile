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
import { Screens } from '../navigation/screens'
import PurchaseOrderIcon from './po.svg'

type PurchaseOrderParamList = {
  [Screens.PurchaseOrder]: { id: string }
}

export function PurchaseOrderScreen() {
  const { navigate } = useNavigation<any>()
  const { params } = useRoute<RouteProp<PurchaseOrderParamList>>()
  const { id } = params ?? {}

  const navigateToLotDetails = React.useCallback(() => navigate(Screens.LotDetails), [navigate])

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
        <PurchaseOrder id={id} onSelectLot={navigateToLotDetails} />
      </Stack>
    </Screen>
  )
}
