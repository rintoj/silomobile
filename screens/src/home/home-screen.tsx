import { useNavigation } from '@react-navigation/native'
import { Screen } from '@silo-component/screen'
import { Text } from '@silo-component/text'
import { AppHeader } from '@silo-feature/app-header'
import { IncomingSilos } from '@silo-feature/incoming-silos'
import { NavBar } from '@silo-feature/nav-bar'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { Modals } from '../navigation/modals'

export function HomeScreen() {
  const { navigate } = useNavigation<any>()
  const openCodeScanner = React.useCallback(() => {
    navigate(Modals.CodeScanner)
  }, [navigate])

  return (
    <Screen withSafeArea={false}>
      <Stack fill backgroundColor={COLOR.PRIMARY}>
        <AppHeader />
        <Stack alignCenter fill padding='normal'>
          <Spacer size='small' />
          <Text fill fontSize='large' textColor={COLOR.TERTIARY} semiBold>
            Incoming
          </Text>
          <IncomingSilos />
        </Stack>
        <NavBar onScanIconTap={openCodeScanner} />
      </Stack>
    </Screen>
  )
}
