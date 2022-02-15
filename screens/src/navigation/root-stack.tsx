import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'
import { MainStack } from './main-stack'
import { modals } from './modals'
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
  const modalScreens = React.useMemo(
    () =>
      Object.keys(modals).map(name => (
        <Screen key={name} name={name} component={modals[name].screen} />
      )),
    [],
  )

  return (
    <NavigationContainer>
      <Navigator>
        <Group screenOptions={screenOptions}>
          <Screen name={Screens.Main} component={MainStack} />
          {modalScreens}
        </Group>
      </Navigator>
    </NavigationContainer>
  )
}
