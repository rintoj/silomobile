import { Avatar } from '@silo-component/avatar'
import { Text } from '@silo-component/text'
import { Logo } from '@silo-feature/logo'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const styles = {
  container: {
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    elevation: 5,
    position: 'absolute' as const,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    top: 0,
    width: '100%',
    zIndex: 1,
  },
}

export function AppHeader() {
  const { top } = useSafeAreaInsets()
  return (
    <Stack
      fillHorizontal
      backgroundColor={COLOR.SECONDARY}
      style={styles.container}
      overflowVisible
    >
      <Stack height={top} />
      <Stack horizontal alignMiddle padding='normal'>
        <Spacer size='xx-small' />
        <Logo size='small' />
        <Spacer fill />
        <Text fontSize='large' textColor={COLOR.PRIMARY}>
          Xavier Ponce
        </Text>
        <Spacer size='small' />
        <Avatar />
      </Stack>
    </Stack>
  )
}
