import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AuthState, useAuth } from '@silo-feature/auth'
import { useCodePush } from '@silo-feature/code-push'
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
  const { state } = useAuth()
  const [updateApp] = useCodePush()
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

  React.useEffect(() => {
    updateApp()
  }, [updateApp])

  if (state !== AuthState.AUTHORIZED) {
    return <LoginScreen />
  }

  return (
    <Stack fill backgroundColor={COLOR.PRIMARY}>
      <Navigator
        initialRouteName={Screens.Login}
        screenOptions={navigatorOptions}
        backBehavior='history'
      >
        <Group screenOptions={mainScreenOptions}>{mainMenuNavigatorScreens}</Group>
        <Group>{publicNavigatorScreens}</Group>
      </Navigator>
    </Stack>
  )
}
