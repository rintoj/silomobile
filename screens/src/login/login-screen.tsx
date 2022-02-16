import { useNavigation } from '@react-navigation/core'
import { Background } from '@silo-component/background'
import { Screen } from '@silo-component/screen'
import { LoginForm } from '@silo-feature/login-form'
import { Logo } from '@silo-feature/logo'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Screens } from '../navigation/screens'

const styles = {
  container: { flex: 1 },
}

export function LoginScreen() {
  const { navigate } = useNavigation<any>()
  const navigateToHome = () => {
    navigate(Screens.Home)
  }

  React.useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Background>
      <Screen backgroundColor={COLOR.TRANSPARENT} withSafeArea>
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
