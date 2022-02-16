import { Text } from '@silo-component/text'
import { Spinner } from 'native-x-spinner'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React from 'react'

interface Props {
  children?: string | React.ReactElement
  disabled?: boolean
  loading?: boolean
  onTap?: () => void
}
export function HeaderButton({ children, disabled, loading, onTap }: Props) {
  if (typeof children === 'string') {
    return (
      <Tappable disabled={disabled} onTap={onTap}>
        <Stack horizontal alignMiddle>
          {loading ? <Spinner size='small' /> : null}
          <Text semiBold textColor={disabled ? COLOR.DISABLED : COLOR.ACCENT}>
            {children}
          </Text>
        </Stack>
      </Tappable>
    )
  }
  return (
    <Tappable disabled={disabled} onTap={onTap}>
      {children}
    </Tappable>
  )
}
