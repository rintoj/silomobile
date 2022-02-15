import { CallIcon } from 'native-x-icon'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { ViewStyle } from 'react-native'

export interface AvatarOnlineBadgeProps {
  visible?: boolean
  width: number
  isBusy?: boolean
  missedCall?: boolean
}

const containerStyle: ViewStyle = { position: 'absolute' }

export function AvatarBadge({ visible, width, isBusy, missedCall }: AvatarOnlineBadgeProps) {
  const indicatorStyle = React.useMemo(() => {
    const borderWidth = width >= 96 ? 3 : width >= 60 ? 2 : 1
    const indicatorWidth = width * 0.32
    const offset = indicatorWidth * 0.5 + borderWidth * 0.5
    return {
      right: -offset,
      bottom: -offset,
      borderWidth,
      borderRadius: indicatorWidth,
      width: indicatorWidth,
      height: indicatorWidth,
      iconSize: width >= 96 ? 11 : 9,
    }
  }, [width])

  if (!visible) return null

  return (
    <Stack
      style={containerStyle}
      width={width * Math.SQRT2 * 0.5}
      height={width * Math.SQRT2 * 0.5}
      alignRight
      alignBottom
      overflowVisible
    >
      <Stack
        backgroundColor={missedCall ? COLOR.ERROR : COLOR.SUCCESS}
        borderColor={COLOR.PRIMARY}
        style={indicatorStyle}
        alignMiddle
        alignCenter
      >
        {isBusy || missedCall ? (
          <CallIcon color={COLOR.PRIMARY} size={indicatorStyle.iconSize} />
        ) : null}
      </Stack>
    </Stack>
  )
}
