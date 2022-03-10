import { Background } from '@silo-component/background'
import { Screen } from '@silo-component/screen'
import { LoginForm } from '@silo-feature/login-form'
import { Logo } from '@silo-feature/logo'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React, { useCallback } from 'react'
import { KeyboardAvoidingView, ScrollView, StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { AppBanner } from './app-banner'

const styles = {
  container: { flex: 1 },
}

export function LoginScreen() {
  const hideSplashScreen = useCallback(() => SplashScreen.hide(), [])

  return (
    <Background onLoad={hideSplashScreen}>
      <Screen backgroundColor={COLOR.TRANSPARENT} withSafeArea>
        <StatusBar barStyle='light-content' backgroundColor='#192820' animated />
        <ScrollView keyboardShouldPersistTaps='handled'>
          <KeyboardAvoidingView style={styles.container} behavior='position'>
            <Stack fill alignCenter padding='normal'>
              <Spacer size='large' />
              <Logo />
              <Spacer />
              <LoginForm />
            </Stack>
          </KeyboardAvoidingView>
        </ScrollView>
        <AppBanner />
      </Screen>
    </Background>
  )
}
