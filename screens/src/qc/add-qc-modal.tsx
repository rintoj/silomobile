import { RouteProp, useRoute } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'
import { BottomSheet, BottomSheetScrollView } from '@silo-component/bottom-sheet'
import { QCIcon } from '@silo-component/icons/src/qc-icon'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import React from 'react'
import { AddLotSpecificQCScreen } from './add-lot-specific-qc-screen'
import { AddPurchaseOrderQCScreen } from './add-purchase-order-qc-screen'

const { Navigator, Screen } = createStackNavigator()
const screenOptions: StackNavigationOptions = {
  headerShown: false,
  animationEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
}

export enum QCScreens {
  PurchaseOrderQC = 'PurchaseOrderQC',
  LotSpecificQC = 'LotSpecificQCParamList',
}

export type QCScreensParamList = {
  [QCScreens.PurchaseOrderQC]: {
    id?: string
  }
}

const styles = {
  container: { width: '100%', height: '100%' },
}

export function AddQCModal() {
  const { goBack } = useNavigation()
  const { params } = useRoute<RouteProp<QCScreensParamList>>()

  return (
    <BottomSheet visible snapPoints={['100%']} onClose={goBack}>
      <BottomSheetScrollView contentContainerStyle={styles.container}>
        <Stack fillHorizontal horizontal alignCenter padding='normal' alignMiddle>
          <QCIcon />
          <Spacer size='small' />
          <Text textColor={COLOR_X.ACCENT3}>Quality Control</Text>
        </Stack>
        <Spacer size='small' />
        <Navigator screenOptions={screenOptions} initialRouteName={QCScreens.PurchaseOrderQC}>
          <Screen
            name={QCScreens.PurchaseOrderQC}
            component={AddPurchaseOrderQCScreen}
            initialParams={params}
          />
          <Screen name={QCScreens.LotSpecificQC} component={AddLotSpecificQCScreen} />
        </Navigator>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}
