import { useNavigation } from '@react-navigation/core'
import { Background } from '@silo-component/background'
import { Logo } from '@silo-feature/logo'
import { Stack } from 'native-x-stack'
import React from 'react'
import { Screens } from '../navigation/screens'

export function SplashScreen() {
  const { navigate } = useNavigation<any>()

  React.useEffect(() => {
    setTimeout(() => {
      navigate(Screens.Login)
    }, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Background>
      <Stack fill alignCenter alignMiddle>
        <Logo />
      </Stack>
    </Background>
  )
}
