import { RouteProp, useRoute } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import { BottomSheet, BottomSheetScrollView } from '@silo-component/bottom-sheet'
import { Text } from '@silo-component/text'
import { AddLotExpense } from '@silo-feature/lot-expense'
import { COLOR_X } from '@silo-feature/theme'
import { useOpenClose } from '@silo/util'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { Modals } from '../navigation/modals'

type AddExpenseParamList = {
  [Modals.AddLotExpense]: {
    lotId: number
  }
}

export function AddLotExpenseModal() {
  const [visible, , close] = useOpenClose(true)
  const { goBack } = useNavigation()
  const { params } = useRoute<RouteProp<AddExpenseParamList>>()

  return (
    <BottomSheet visible={visible} snapPoints={['80%']} onClose={goBack}>
      <BottomSheetScrollView>
        <Stack fill padding='large'>
          <Stack horizontal alignCenter fillHorizontal>
            <Text semiBold alignCenter textColor={COLOR_X.ACCENT5}>
              Create Expense
            </Text>
            <Spacer size='small' />
          </Stack>
          <Spacer size='small' />
          <AddLotExpense lotId={params.lotId} onSuccess={close} />
        </Stack>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}
