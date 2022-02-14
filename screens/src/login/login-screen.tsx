import { useNavigation } from '@react-navigation/core'
import { Background } from '@silo-component/background'
import { Screen } from '@silo-component/screen'
import { LoginForm } from '@silo-feature/login-form'
import { Logo } from '@silo-feature/logo'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'

const styles = {
  container: { flex: 1 },
}

export function LoginScreen() {
  const { navigate } = useNavigation<any>()
  const navigateToHome = () => {
    navigate('home')
  }
  return (
    <Background>
      <Screen backgroundColor={COLOR.TRANSPARENT} withSafeArea>
        <KeyboardAvoidingView style={styles.container}>
          <Stack fill alignCenter padding='normal'>
            <Spacer />
            <Logo />
            <Spacer />
            <LoginForm onSuccess={navigateToHome} />
          </Stack>
        </KeyboardAvoidingView>
      </Screen>
    </Background>
  )
}
