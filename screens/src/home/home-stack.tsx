import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'
import { Stack } from 'native-x-stack'
import React from 'react'
import SplashScreen from 'react-native-splash-screen'
import { LotDetailsScreen } from '../lot-details/lot-details-screen'
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
  const tabBarHeight = useBottomTabBarHeight()
  React.useEffect(() => SplashScreen.hide(), [])
  return (
    <Stack fill>
      <Navigator screenOptions={screenOptions}>
        <Screen name={Screens.Home} component={HomeScreen} />
        <Screen name={Screens.PurchaseOrder} component={PurchaseOrderScreen} />
        <Screen name={Screens.LotDetails} component={LotDetailsScreen} />
      </Navigator>
      <Stack height={tabBarHeight} />
    </Stack>
  )
}
