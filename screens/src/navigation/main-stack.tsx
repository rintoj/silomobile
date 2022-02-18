import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { LoginScreen } from '../login/login-screen'
import { appScreens, MainStackParamList, Screens } from './screens'

const { mainScreens, publicScreens } = appScreens
const { Navigator, Screen, Group } = createBottomTabNavigator<MainStackParamList>()
const navigatorOptions: BottomTabNavigationOptions = {
  tabBarStyle: { display: 'none' },
  headerShown: false,
}

export function MainStack() {
  const mainScreenOptions: any = React.useMemo(() => ({ tabBarStyle: { display: 'none' } }), [])

  const publicNavigatorScreens = React.useMemo(
    () =>
      Object.keys(publicScreens).map(screen => (
        <Screen key={screen} name={screen as any} component={publicScreens[screen].screen} />
      )),
    [],
  )
  const mainMenuNavigatorScreens = React.useMemo(
    () =>
      Object.keys(mainScreens).map(screen => (
        <Screen key={screen} name={screen as any} component={mainScreens[screen].screen} />
      )),
    [],
  )

  return (
    <Stack fill backgroundColor={COLOR.PRIMARY}>
      <Navigator
        initialRouteName={Screens.Login}
        screenOptions={navigatorOptions}
        backBehavior='history'
      >
        <Screen name={Screens.Login} component={LoginScreen} />
        <Group screenOptions={mainScreenOptions}>{mainMenuNavigatorScreens}</Group>
        <Group>{publicNavigatorScreens}</Group>
      </Navigator>
    </Stack>
  )
}
