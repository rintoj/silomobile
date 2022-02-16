import { THEMES } from '@silo-feature/theme'
import { THEME, ThemeProvider } from 'native-x-theme'
import React from 'react'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { RootStack } from './navigation/root-stack'

export function App() {
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <ThemeProvider theme={THEME.LIGHT} themes={THEMES} autoSwitchTheme={false}>
      <StatusBar barStyle='light-content' animated translucent />
      <RootStack />
    </ThemeProvider>
  )
}
