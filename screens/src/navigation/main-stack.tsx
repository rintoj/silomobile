import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppHeader } from '@silo-feature/app-header'
import { AuthState, useAuth } from '@silo-feature/auth'
import { useCodePush } from '@silo-feature/code-push'
import { NavBar } from '@silo-feature/nav-bar'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { LoginScreen } from '../login/login-screen'
import { appScreens, MainStackParamList, Screens } from './screens'
const { mainScreens, publicScreens } = appScreens
const { Navigator, Screen, Group } = createBottomTabNavigator<MainStackParamList>()
const navigatorOptions: BottomTabNavigationOptions = {}
const renderHeader = () => <AppHeader />

export function MainStack() {
  const { state } = useAuth()
  const [updateApp] = useCodePush()
  const mainScreenOptions: any = React.useMemo(() => ({ header: renderHeader }), [])
  const publicScreenOptions: any = React.useMemo(
    () => ({ tabBarStyle: { display: 'none' }, headerShown: false }),
    [],
  )
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

  React.useEffect(() => {
    updateApp()
  }, [updateApp])

  if (state !== AuthState.AUTHORIZED) {
    return (
      <Navigator
        initialRouteName={Screens.Login}
        screenOptions={navigatorOptions}
        backBehavior='history'
      >
        <Screen name={Screens.Login} component={LoginScreen} />
        <Group>{publicNavigatorScreens}</Group>
      </Navigator>
    )
  }

  return (
    <Stack fill backgroundColor={COLOR.PRIMARY}>
      <Navigator
        tabBar={NavBar}
        initialRouteName={Screens.Login}
        screenOptions={navigatorOptions}
        backBehavior='history'
      >
        <Group screenOptions={mainScreenOptions}>{mainMenuNavigatorScreens}</Group>
        <Group screenOptions={publicScreenOptions}>{publicNavigatorScreens}</Group>
      </Navigator>
    </Stack>
  )
}
