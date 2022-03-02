import { Text } from '@silo-component/text'
import { Stack } from 'native-x-stack'
import { COLOR, ContainerStyleProps, TextStyleProps } from 'native-x-theme'
import React from 'react'

interface Props extends TextStyleProps, ContainerStyleProps {
  children?: Error | string | null
  alignCenter?: boolean
}

export function ErrorMessage({
  textColor = COLOR.ERROR,
  padding = 'normal',
  alignCenter = true,
  children,
  ...props
}: Props) {
  if (children == null) {
    return null
  }

  return (
    <Stack {...props} padding={padding} alignCenter={alignCenter}>
      <Text {...props} textColor={textColor} alignCenter>
        {typeof children === 'string' ? children : children.message}
      </Text>
    </Stack>
  )
}
