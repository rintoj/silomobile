import React from 'react'
import { Text } from 'react-native'
import { ErrorBoundary } from '@silo-feature/error-boundary'

export function SplashScreen() {
  return (
    <ErrorBoundary>
      <Text>Splash Screen</Text>
    </ErrorBoundary>
  )
}
