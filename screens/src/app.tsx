import { AuthProvider } from '@silo-feature/auth'
import { THEMES } from '@silo-feature/theme'
import { THEME, ThemeProvider } from 'native-x-theme'
import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RootStack } from './navigation/root-stack'

const queryClient = new QueryClient()

export function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={THEME.LIGHT} themes={THEMES} autoSwitchTheme={false}>
        <StatusBar barStyle='light-content' backgroundColor='#235039' animated />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RootStack />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
