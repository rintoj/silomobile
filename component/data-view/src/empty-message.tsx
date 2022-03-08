import { Text } from '@silo-component/text'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR, ContainerStyleProps } from 'native-x-theme'
import React from 'react'

interface Props extends ContainerStyleProps {
  title?: string
  children: string
  alignLeft?: boolean
  alignCenter?: boolean
  alignRight?: boolean
  alignTop?: boolean
  alignMiddle?: boolean
  alignBottom?: boolean
  titleColor?: string
  descriptionColor?: string
  icon?: React.ReactNode
}

export function EmptyMessage({
  title,
  children,
  alignLeft,
  alignCenter,
  alignRight,
  alignTop,
  alignMiddle,
  alignBottom,
  padding = 'none',
  titleColor = COLOR.SECONDARY,
  descriptionColor = COLOR.TERTIARY,
  icon,
  ...props
}: Props) {
  return (
    <Stack
      alignLeft={alignLeft}
      alignCenter={alignCenter}
      alignRight={alignRight}
      alignTop={alignTop}
      alignMiddle={alignMiddle}
      alignBottom={alignBottom}
      {...props}
      padding={padding}
    >
      {icon && (
        <>
          {icon}
          <Spacer />
        </>
      )}
      {title && (
        <>
          <Text bold textColor={titleColor} fontSize='large'>
            {title}
          </Text>
          <Spacer size='small' />
        </>
      )}
      <Text textColor={descriptionColor}>{children}</Text>
    </Stack>
  )
}
