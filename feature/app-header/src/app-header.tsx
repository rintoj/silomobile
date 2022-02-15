import { Avatar } from '@silo-component/avatar'
import { Text } from '@silo-component/text'
import { Logo } from '@silo-feature/logo'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { styles as s } from 'tachyons-react-native'
import { isIOS } from '../../../util/src'

export function AppHeader() {
  return (
    <Stack
      fillHorizontal
      backgroundColor={COLOR.SECONDARY}
      style={[s.brBottom, { borderRadius: 10 }] as any}
    >
      <Stack height={isIOS ? 36 : 24} />
      <Stack horizontal alignMiddle padding='normal'>
        <Logo size='small' />
        <Spacer fill />
        <Text textColor={COLOR.PRIMARY}>Xavier Ponce</Text>
        <Spacer size='small' />
        <Avatar />
      </Stack>
    </Stack>
  )
}
