import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { Image } from 'native-x-image'
import background from './images/background.jpg'
import { Logo } from '@silo-feature/logo'
import { styles as s } from 'tachyons-react-native'

export function SplashScreen() {
  return (
    <Stack fill alignCenter alignMiddle backgroundColor={COLOR.SECONDARY}>
      <Image source={background} fill style={[s.absolute]} />
      <Stack backgroundColor={COLOR.SECONDARY} opacity='low' style={[s.absolute]} fill />
      <Logo />
    </Stack>
  )
}
