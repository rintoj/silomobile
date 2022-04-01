import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'
import { Stack } from 'native-x-stack'
import React from 'react'
import SplashScreen from 'react-native-splash-screen'
import { Screens } from '../navigation/screens'
import { InventoryHome } from './inventory-home'

const { Navigator, Screen } = createStackNavigator()

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  animationEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
}

export type InventoryStackParamList = {
  [Screens.InventoryHome]: undefined
}

export function InventoryStack() {
  const tabBarHeight = useBottomTabBarHeight()
  React.useEffect(() => SplashScreen.hide(), [])
  return (
    <Stack fill>
      <Navigator screenOptions={screenOptions}>
        <Screen name={Screens.InventoryHome} component={InventoryHome} />
      </Navigator>
      <Stack height={tabBarHeight} />
    </Stack>
  )
}
