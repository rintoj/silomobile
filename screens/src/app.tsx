import { THEMES } from '@silo-feature/theme'
import { THEME, ThemeProvider } from 'native-x-theme'
import React from 'react'
import { StatusBar } from 'react-native'
import { SplashScreen } from './splash/splash-screen'

export function App() {
  return (
    <ThemeProvider theme={THEME.LIGHT} themes={THEMES} autoSwitchTheme={false}>
      <StatusBar barStyle='dark-content' animated />
      <SplashScreen />
    </ThemeProvider>
  )
}
