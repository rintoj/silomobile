import { ById } from '@silo/util'

export enum Screens {
  Main = 'MAIN',
  Splash = 'SPLASH',
  Login = 'LOGIN_SCREEN',
  Error = 'ERROR',
}

export type MainStackParamList = {
  [Screens.Splash]: undefined
  [Screens.Login]: undefined
}

type ScreenConfigType = {
  screen: (props?: any) => JSX.Element
  path?: string
  icon?: (focused: boolean) => JSX.Element
  initialRouteName?: string
}

const publicScreens: ById<ScreenConfigType> = {}
const mainScreens: ById<ScreenConfigType> = {
}

export const appScreens = { publicScreens, mainScreens }
