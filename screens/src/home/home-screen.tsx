import { Screen } from '@silo-component/screen'
import { Text } from '@silo-component/text'
import { IncomingSilos } from '@silo-feature/incoming-silos'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { StatusBar } from 'react-native'

export function HomeScreen() {
  return (
    <Screen>
      <StatusBar barStyle='light-content' backgroundColor='#235039' animated />
      <Stack fill backgroundColor={COLOR.PRIMARY}>
        <Stack alignCenter fill padding='normal' backgroundColor={COLOR_X.PAGE}>
          <Spacer size='large' />
          <Text fill fontSize='large' textColor={COLOR.TERTIARY} semiBold>
            Incoming
          </Text>
          <IncomingSilos />
        </Stack>
      </Stack>
    </Screen>
  )
}
