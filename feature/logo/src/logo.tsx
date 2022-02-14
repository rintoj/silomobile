import { Stack } from 'native-x-stack'
import { COLOR, useTheme } from 'native-x-theme'
import React from 'react'
import SiloLogo from './logo.svg'

type LogoSize = 'large' | 'normal' | 'small'

const logoSizes: Record<LogoSize, { width: number; height: number }> = {
  large: {
    width: 120,
    height: 120,
  },
  normal: {
    width: 86,
    height: 86,
  },
  small: {
    width: 26,
    height: 26,
  },
}

interface Props {
  size?: LogoSize
  showCircle?: boolean
}

export function Logo({ size = 'normal', showCircle }: Props) {
  const { getColor } = useTheme()

  const { width, height } = logoSizes[size]
  const icon = <SiloLogo width={width} height={height} color={getColor(COLOR.SECONDARY)} />

  if (showCircle) {
    return (
      <Stack
        alignCenter
        alignMiddle
        padding={size}
        backgroundColor={COLOR.DIVIDER}
        borderRadius='round'
      >
        <Stack padding='small'>{icon}</Stack>
      </Stack>
    )
  }
  return icon
}
