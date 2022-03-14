import { Screen } from '@silo-component/screen'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'

export function OutgoingOrdersStack() {
  return (
    <Screen withSafeArea>
      <Stack alignCenter fill padding='normal' backgroundColor={COLOR_X.PAGE}>
        <Spacer size='large' />
        <Text fill fontSize='large' textColor={COLOR.TERTIARY} semiBold>
          Outgoing
        </Text>
      </Stack>
    </Screen>
  )
}
