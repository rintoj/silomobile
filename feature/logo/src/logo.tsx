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
}

export function Logo({ size = 'normal' }: Props) {
  const { getColor } = useTheme()
  const { width, height } = logoSizes[size]

  return <SiloLogo width={width} height={height} color={getColor(COLOR.SECONDARY)} />
}
