import type { StackScreenProps } from '@react-navigation/stack'
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
import { Modals } from '../navigation/modals'
import { RootStackParamList } from '../navigation/root-stack'
const styles = {
  container: { flex: 1 },
}

export function LoginScreen({ navigation }: StackScreenProps<RootStackParamList>) {
  const hideSplashScreen = useCallback(() => SplashScreen.hide(), [])
  const signInWithCode = () => {
    navigation.navigate(Modals.ScanLogin)
  }

  return (
    <Background onLoad={hideSplashScreen}>
      <Screen backgroundColor={COLOR.TRANSPARENT} withSafeArea>
        <StatusBar barStyle='light-content' backgroundColor='#192820' animated />
        <ScrollView>
          <KeyboardAvoidingView behavior='position' style={styles.container}>
            <Stack fill alignCenter padding='normal'>
              <Spacer size='large' />
              <Logo />
              <Spacer />
              <LoginForm onScanLoginTap={signInWithCode} />
            </Stack>
          </KeyboardAvoidingView>
        </ScrollView>
      </Screen>
    </Background>
  )
}
