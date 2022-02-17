import { useNavigation } from '@react-navigation/core'
import { Background } from '@silo-component/background'
import { Screen } from '@silo-component/screen'
import { LoginForm } from '@silo-feature/login-form'
import { Logo } from '@silo-feature/logo'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR, useTheme } from 'native-x-theme'
import React, { useCallback } from 'react'
import { KeyboardAvoidingView, ScrollView, StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Screens } from '../navigation/screens'

const styles = {
  container: { flex: 1 },
}

export function LoginScreen() {
  const { navigate } = useNavigation<any>()
  const { getColor } = useTheme()
  const navigateToHome = useCallback(() => navigate(Screens.Home), [navigate])
  const hideSplashScreen = useCallback(() => SplashScreen.hide(), [])

  return (
    <Background onLoad={hideSplashScreen}>
      <Screen backgroundColor={COLOR.TRANSPARENT} withSafeArea>
        <StatusBar backgroundColor={getColor(COLOR.TRANSPARENT)} />
        <ScrollView>
          <KeyboardAvoidingView behavior='position' style={styles.container}>
            <Stack fill alignCenter padding='normal'>
              <Spacer size='large' />
              <Logo />
              <Spacer />
              <LoginForm onSuccess={navigateToHome} />
            </Stack>
          </KeyboardAvoidingView>
        </ScrollView>
      </Screen>
    </Background>
  )
}
