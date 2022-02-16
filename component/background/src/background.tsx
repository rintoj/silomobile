import { COLOR_X } from '@silo-feature/theme'
import { Stack } from 'native-x-stack'
import React from 'react'
import { ImageBackground } from 'react-native'
import { styles as s } from 'tachyons-react-native'
import background from './images/background.jpg'

interface Props {
  children?: React.ReactChild
  onLoad?: () => void
}

export function Background({ children, onLoad }: Props) {
  return (
    <ImageBackground
      fadeDuration={0}
      source={background}
      resizeMode='cover'
      style={s.flex}
      onLoadEnd={onLoad}
    >
      <Stack backgroundColor={COLOR_X.ACCENT3} opacity='low' style={s.absolute as any} fill />
      {children}
    </ImageBackground>
  )
}
