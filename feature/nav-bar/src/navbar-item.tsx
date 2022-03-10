import { COLOR_X } from '@silo-feature/theme'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { TabNavigationState, ParamListBase } from '@react-navigation/core'

interface Props {
  name: string
  state: TabNavigationState<ParamListBase>
  children?: React.ReactNode
  onTap: (name: string) => void
}

export function NavBarItem({ name, children, state, onTap }: Props) {
  const { index, routeNames } = state
  const active = index === routeNames.indexOf(name)
  return (
    <Tappable data={name} onTap={onTap}>
      <Stack
        backgroundColor={active ? COLOR_X.PAGE : COLOR.PRIMARY}
        padding='normal'
        borderRadius='round'
      >
        {children}
      </Stack>
    </Tappable>
  )
}
