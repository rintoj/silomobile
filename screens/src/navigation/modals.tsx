import { ById } from '@silo/util'
import { CodeScannerModal } from '../code-scanner/code-scanner-modal'
import { ScanLoginModal } from '../code-scanner/scan-login-modal'

export enum Modals {
  CodeScanner = 'CODE_SCANNER',
  ScanLogin = 'SCAN_LOGIN',
}

export type ModalParamList = {
  [Modals.CodeScanner]: undefined
  [Modals.ScanLogin]: undefined
}

type ModalConfigType = {
  screen: (props?: any) => JSX.Element
  path?: string
  animated?: boolean
}

export const modals: ById<ModalConfigType> = {
  [Modals.CodeScanner]: { screen: CodeScannerModal },
  [Modals.ScanLogin]: { screen: ScanLoginModal },
}
