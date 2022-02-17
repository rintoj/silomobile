import { ById } from '@silo/util'
import { CodeScannerModal } from '../code-scanner/code-scanner-modal'

export enum Modals {
  CodeScanner = 'CODE_SCANNER',
}

type ModalConfigType = {
  screen: (props?: any) => JSX.Element
  path?: string
  animated?: boolean
}

export const modals: ById<ModalConfigType> = {
  [Modals.CodeScanner]: { screen: CodeScannerModal },
}
