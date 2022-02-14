import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'
import { MainStack } from './main-stack'
import { Screens } from './screens'

const { Navigator, Screen, Group } = createStackNavigator()
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
        <Group screenOptions={screenOptions}>
          <Screen name={Screens.Main} component={MainStack} />
        </Group>
      </Navigator>
    </NavigationContainer>
  )
}
