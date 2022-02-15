import { Text } from '@silo-component/text'
import { WarningIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'

export function ErrorView() {
  return (
    <Stack fill alignMiddle alignCenter>
      <Stack
        width={72}
        height={72}
        borderRadius='round'
        padding='normal'
        alignCenter
        alignMiddle
        backgroundColor={COLOR.ERROR}
      >
        <WarningIcon size={36} color={COLOR.PRIMARY} />
        <Spacer size='xx-small' />
      </Stack>
      <Spacer />
      <Text alignCenter bold fontSize={'x-large'}>
        uh oh!
      </Text>
      <Spacer size='xx-small' />
      <Stack padding='horizontal:large'>
        <Text alignCenter>application crashed unexpectedly!</Text>
      </Stack>
    </Stack>
  )
}
