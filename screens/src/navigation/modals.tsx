import { ById } from '@silo/util'
import { CodeScannerModal } from '../code-scanner/code-scanner-modal'
import { ScanLoginModal } from '../code-scanner/scan-login-modal'
import { FiltersModal } from '../filters/filters-modal'
import { AddLotExpenseModal } from '../lot-details/add-lot-expense-modal'
import { AddQCModal } from '../qc/add-qc-modal'
import { SearchModal } from '../search/search-modal'

export enum Modals {
  CodeScanner = 'CODE_SCANNER',
  ScanLogin = 'SCAN_LOGIN',
  Search = 'SEARCH',
  Filters = 'FILTERS',
  AddLotExpense = 'ADD_LOT_EXPENSE',
  AddQC = 'ADD_QC',
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
  [Modals.Search]: { screen: SearchModal },
  [Modals.Filters]: { screen: FiltersModal },
  [Modals.AddLotExpense]: { screen: AddLotExpenseModal },
  [Modals.AddQC]: { screen: AddQCModal },
}
