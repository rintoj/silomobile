import { ById } from '@silo/util'
import { HomeScreen } from '../home/home-screen'
import { PurchaseOrderScreen } from '../purchase-order/purchase-order-screen'

export enum Screens {
  Main = 'MAIN',
  Login = 'LOGIN_SCREEN',
  Home = 'HOME_SCREEN',
  Error = 'ERROR',
  PurchaseOrder = 'PurchaseOrder',
}

export type MainStackParamList = {
  [Screens.Login]: undefined
  [Screens.Home]: undefined
}

type ScreenConfigType = {
  screen: (props?: any) => JSX.Element
  path?: string
  icon?: (focused: boolean) => JSX.Element
  initialRouteName?: string
}

const publicScreens: ById<ScreenConfigType> = {}
const mainScreens: ById<ScreenConfigType> = {
  [Screens.Home]: {
    screen: HomeScreen,
    initialRouteName: Screens.Home,
  },
  [Screens.PurchaseOrder]: {
    screen: PurchaseOrderScreen,
  },
}

export const appScreens = { publicScreens, mainScreens }
