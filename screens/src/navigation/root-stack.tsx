import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'
import { SplashScreen } from '../splash/splash-screen'

const { Navigator, Screen } = createStackNavigator()
const screenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: false,
  animationEnabled: true,
  presentation: 'transparentModal',
}

export function RootStack() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name='splash' component={SplashScreen} options={screenOptions} />
      </Navigator>
    </NavigationContainer>
  )
}
