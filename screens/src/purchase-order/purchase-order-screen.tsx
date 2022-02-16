import { useNavigation } from '@react-navigation/native'
import { PageHeader } from '@silo-component/page-header'
import { Screen } from '@silo-component/screen'
import { Text } from '@silo-component/text'
import { AppHeader } from '@silo-feature/app-header'
import { NavBar } from '@silo-feature/nav-bar'
import { PurchaseOrder } from '@silo-feature/purchase-order'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { Screens } from '../navigation/screens'
import PurchaseOrderIcon from './po.svg'

export function PurchaseOrderScreen() {
  const { navigate } = useNavigation<any>()
  const navigateToHome = () => navigate(Screens.Home)

  return (
    <Screen>
      <AppHeader />
      <Stack fill backgroundColor={COLOR_X.PAGE}>
        <Spacer />
        <Spacer size='small' />
        <PageHeader showBackButton accentColor={COLOR.SUCCESS} onTapLeftButton={navigateToHome}>
          <Stack horizontal alignMiddle fill alignCenter>
            <PurchaseOrderIcon />
            <Spacer size='x-small' />
            <Text semiBold fontSize='large' textColor={COLOR.PRIMARY}>
              PO #65444
            </Text>
          </Stack>
        </PageHeader>
        <PurchaseOrder />
        <NavBar />
      </Stack>
    </Screen>
  )
}
