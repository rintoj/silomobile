import { useNavigation } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'
import { AppHeader } from '@silo-feature/app-header'
import { NavBar } from '@silo-feature/nav-bar'
import React from 'react'
import SplashScreen from 'react-native-splash-screen'
import { LotDetailsScreen } from '../lot-details/lot-details-screen'
import { Modals } from '../navigation/modals'
import { Screens } from '../navigation/screens'
import { PurchaseOrderScreen } from '../purchase-order/purchase-order-screen'
import { HomeScreen } from './home-screen'

const { Navigator, Screen } = createStackNavigator()

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  animationEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
}

export function HomeStack() {
  const { navigate } = useNavigation<any>()
  const openCodeScanner = React.useCallback(() => {
    navigate(Modals.CodeScanner)
  }, [navigate])

  React.useEffect(() => SplashScreen.hide(), [])

  return (
    <>
      <AppHeader />
      <Navigator screenOptions={screenOptions}>
        <Screen name={Screens.Home} component={HomeScreen} />
        <Screen name={Screens.PurchaseOrder} component={PurchaseOrderScreen} />
        <Screen name={Screens.LotDetails} component={LotDetailsScreen} />
      </Navigator>
      <NavBar onScanIconTap={openCodeScanner} />
    </>
  )
}
