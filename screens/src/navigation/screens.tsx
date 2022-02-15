import { ById } from '@silo/util'

export enum Screens {
  Main = 'MAIN',
  Splash = 'SPLASH',
  Error = 'ERROR',
}

export type MainStackParamList = {
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
