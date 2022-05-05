import { RouteProp, useRoute } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import { PageHeader } from '@silo-component/page-header'
import { Screen } from '@silo-component/screen'
import { Text } from '@silo-component/text'
import { LotDetails } from '@silo-feature/lot-details'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React, { useCallback } from 'react'
import { Modals } from '../navigation/modals'
import { Screens } from '../navigation/screens'
import LotIcon from './lot-icon.svg'

type LotDetailsParamList = {
  [Screens.LotDetails]: { id: number }
}

export function LotDetailsScreen() {
  const { navigate, push } = useNavigation<any>()
  const { params } = useRoute<RouteProp<LotDetailsParamList>>()
  const { id } = params ?? {}
  const navigateToPurchaseOrderScreen = useCallback(
    (orderId?: number) => {
      if (orderId) {
        push(Screens.PurchaseOrder, { id: orderId })
      }
    },
    [push],
  )

  const openAddExpenseModal = useCallback(() => {
    navigate(Modals.AddLotExpense, { lotId: id })
  }, [id, navigate])

  return (
    <Screen withSafeArea backgroundColor={COLOR.PRIMARY}>
      <Spacer />
      <Spacer size='small' />
      <PageHeader showBackButton accentColor={COLOR_X.ACCENT4}>
        <Stack horizontal alignMiddle fill alignCenter>
          <LotIcon />
          <Spacer size='x-small' />
          <Text semiBold fontSize='x-large' textColor={COLOR.PRIMARY}>
            LOT #ANG-{id}
          </Text>
        </Stack>
      </PageHeader>
      <Stack fill backgroundColor={COLOR_X.PAGE} padding='vertical:x-small'>
        <LotDetails
          lotId={id}
          onPurchaseOrderTap={navigateToPurchaseOrderScreen}
          onAddExpenseTap={openAddExpenseModal}
        />
      </Stack>
    </Screen>
  )
}
