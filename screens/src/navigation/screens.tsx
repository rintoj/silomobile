import { ById } from '@silo/util'
import { HomeStack } from '../home/home-stack'
import { InventoryStack } from '../inventory/inventory-stack'
import { NetworkingStack } from '../networking/networking-stack'
import { OutgoingOrdersStack } from '../outgoing-orders/outgoing-orders-stack'

export enum Screens {
  Main = 'MAIN',
  Login = 'LOGIN_SCREEN',
  Home = 'HOME_SCREEN',
  LotDetails = 'LOT_DETAILS',
  Error = 'ERROR',
  PurchaseOrder = 'PURCHASE_ORDER',
  HomeTab = 'HOME_TAB',
  OutgoingOrdersTab = 'OUTGOING_ORDERS_TAB',
  InventoryTab = 'INVENTORY_TAB',
  NetworkingTab = 'NETWORKING_TAB',
  InventoryHome = 'INVENTORY_HOME',
  SalesOrder = 'SALES_ORDER',
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
    initialRouteName: Screens.Home,
  },
  [Screens.OutgoingOrdersTab]: {
    screen: OutgoingOrdersStack,
    initialRouteName: Screens.OutgoingOrdersTab,
  },
  [Screens.InventoryTab]: {
    screen: InventoryStack,
    initialRouteName: Screens.InventoryTab,
  },
  [Screens.NetworkingTab]: {
    screen: NetworkingStack,
    initialRouteName: Screens.NetworkingTab,
  },
}

export const appScreens = { publicScreens, mainScreens }
