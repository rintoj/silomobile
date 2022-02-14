import { Image } from 'native-x-image'
import { Stack } from 'native-x-stack'
import { COLOR, ContainerStyleProps } from 'native-x-theme'
import React from 'react'
import { AvatarBadge } from './avatar-badge'
import placeholder from './images/placeholder.png'

export type AvatarSize = 'x-small' | 'small' | 'normal' | 'large' | 'x-large' | 'xx-large'
export const AvatarDimensions: Record<AvatarSize, { width: number; height: number }> = {
  'x-small': { width: 20, height: 20 },
  small: { width: 28, height: 28 },
  normal: { width: 36, height: 36 },
  large: { width: 40, height: 40 },
  'x-large': { width: 60, height: 60 },
  'xx-large': { width: 96, height: 96 },
}

export interface AvatarProps extends Omit<ContainerStyleProps, 'borderRadius'> {
  photoURL?: string
  size?: AvatarSize | number
  isOnline?: boolean
  isBusy?: boolean
  missedCall?: boolean
}

export function Avatar(props: AvatarProps) {
  const { photoURL, size = 'normal', borderColor, isOnline, isBusy, missedCall, ...rest } = props
  const { width, height } =
    typeof size === 'number' ? { width: size, height: size } : AvatarDimensions[size]
  const source = React.useMemo(() => ({ uri: photoURL ?? undefined }), [photoURL])

  return (
    <Stack
      overflowVisible
      backgroundColor={COLOR.INPUT}
      borderRadius='round'
      borderColor={borderColor ?? COLOR.DIVIDER}
      width={width}
      height={height}
      alignMiddle
      alignCenter
      {...rest}
    >
      <Stack width={width} height={height} borderRadius='round'>
        <Image
          fill
          width={width}
          height={height}
          source={source}
          resizeMode='cover'
          fallbackSource={placeholder}
        />
      </Stack>
      <AvatarBadge
        width={width}
        visible={isOnline || missedCall}
        isBusy={isBusy}
        missedCall={missedCall}
      />
    </Stack>
  )
}
