import { Screen } from '@silo-component/screen'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import InvoiceIcon from './invoice-icon.svg'

export function InventoryHome() {
  return (
    <Screen withSafeArea>
      <Stack alignCenter fill padding='normal' backgroundColor={COLOR_X.PAGE}>
        <Spacer size='large' />
        <Text fill fontSize='large' textColor={COLOR.TERTIARY} semiBold>
          Invoice
        </Text>
        <Stack fill>
          <Spacer fill />
          <Stack fillHorizontal alignCenter padding='x-large'>
            <InvoiceIcon />
            <Spacer />
            <Text lineHeight='solid' alignCenter fill textColor={COLOR.TERTIARY}>
              Scan any SO label by pressing the button below
            </Text>
          </Stack>
          <Spacer fill />
        </Stack>
      </Stack>
    </Screen>
  )
}
