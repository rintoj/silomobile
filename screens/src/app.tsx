import { THEMES } from '@silo-feature/theme'
import { THEME, ThemeProvider } from 'native-x-theme'
import React from 'react'
import { StatusBar } from 'react-native'
import { RootStack } from './navigation/root-stack'

export function App() {
  return (
    <ThemeProvider theme={THEME.LIGHT} themes={THEMES} autoSwitchTheme={false}>
      <StatusBar barStyle='light-content' backgroundColor='#235039' animated />
      <RootStack />
    </ThemeProvider>
  )
}
