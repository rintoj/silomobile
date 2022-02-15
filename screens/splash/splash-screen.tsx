import { ErrorBoundary } from '@silo-feature/error-boundary'
import React from 'react'
import { Text } from 'react-native'

export function SplashScreen() {
  return (
    <ErrorBoundary>
      <Text>Splash Screen</Text>
    </ErrorBoundary>
  )
}
