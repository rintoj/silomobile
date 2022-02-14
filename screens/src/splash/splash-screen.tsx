import { Logo } from '@silo-feature/logo'
import { Stack } from 'native-x-stack'
import React from 'react'
import { Background } from '@silo-component/background'

export function SplashScreen() {
  return (
    <Background>
      <Stack fill alignCenter alignMiddle>
        <Logo />
      </Stack>
    </Background>
  )
}
