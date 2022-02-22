import { ById } from '@silo/util'
import { HomeStack } from '../home/home-stack'

export enum Screens {
  Main = 'MAIN',
  Login = 'LOGIN_SCREEN',
  Home = 'HOME_SCREEN',
  LotDetails = 'LOT_DETAILS',
  Error = 'ERROR',
  PurchaseOrder = 'PURCHASE_ORDER',
  HomeTab = 'HOME_TAB',
}

export type MainStackParamList = {
  [Screens.Login]: undefined
  [Screens.HomeTab]: undefined
}

type ScreenConfigType = {
  screen: (props?: any) => JSX.Element
  path?: string
  icon?: (focused: boolean) => JSX.Element
  initialRouteName?: string
}

const publicScreens: ById<ScreenConfigType> = {}
const mainScreens: ById<ScreenConfigType> = {
  [Screens.HomeTab]: {
    screen: HomeStack,
    initialRouteName: Screens.HomeTab,
  },
}

export const appScreens = { publicScreens, mainScreens }
