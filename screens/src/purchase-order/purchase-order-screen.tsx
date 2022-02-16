import { PurchaseOrder } from '@silo-feature/purchase-order'
import React from 'react'
import { Screen } from '@silo-component/screen'
import { Stack } from 'native-x-stack'
import { COLOR_X } from '@silo-feature/theme'
import { PageHeader } from '../../../component/page-header/src'
import { AppHeader } from '@silo-feature/app-header'
import { Spacer } from 'native-x-spacer'
import PurchaseOrderIcon from './po.svg'
import { Text } from '@silo-component/text'
import { COLOR } from 'native-x-theme'
import { NavBar } from '@silo-feature/nav-bar'

export function PurchaseOrderScreen() {
  return (
    <Screen>
      <AppHeader />
      <Stack fill backgroundColor={COLOR_X.PAGE}>
        <Spacer />
        <Spacer size='small' />
        <PageHeader showBackButton accentColor={COLOR.SUCCESS}>
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
