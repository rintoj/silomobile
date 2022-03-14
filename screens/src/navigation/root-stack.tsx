import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'
import { MainStack } from './main-stack'
import { ModalParamList, modals } from './modals'
import { MainStackParamList, Screens } from './screens'

export type RootStackParamList = {
  [Screens.Main]: NavigatorScreenParams<MainStackParamList>
} & ModalParamList

const { Navigator, Screen, Group } = createStackNavigator<RootStackParamList>()
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
      Object.keys(modals).map((name: any) => (
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
