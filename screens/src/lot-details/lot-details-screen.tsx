import { useNavigation } from '@react-navigation/native'
import { PageHeader } from '@silo-component/page-header'
import { Screen } from '@silo-component/screen'
import { Text } from '@silo-component/text'
import { AppHeader } from '@silo-feature/app-header'
import { LotDetails } from '@silo-feature/lot-details'
import { NavBar } from '@silo-feature/nav-bar'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import LotIcon from './lot-icon.svg'

export function LotDetailsScreen() {
  const { goBack } = useNavigation<any>()

  return (
    <>
      <AppHeader />

      <Screen withSafeArea backgroundColor={COLOR.PRIMARY}>
        <Spacer />
        <Spacer size='small' />
        <PageHeader showBackButton accentColor={COLOR_X.ACCENT4} onTapLeftButton={goBack}>
          <Stack horizontal alignMiddle fill alignCenter>
            <LotIcon />
            <Spacer size='x-small' />
            <Text semiBold fontSize='x-large' textColor={COLOR.PRIMARY}>
              LOT #ANG-001617
            </Text>
          </Stack>
        </PageHeader>
        <Stack fill backgroundColor={COLOR_X.PAGE} padding='vertical:x-small'>
          <LotDetails />
        </Stack>
      </Screen>
      <NavBar />
    </>
  )
}
