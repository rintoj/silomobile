import { useQuery } from '@silo-feature/api'

export interface AccountType {
  id: number
  createdAt: string
  name: string
  description: string
  ledgerNumber: number
  startingBalance: number
  parentAccountingAccountID: any
  type: string
  subtype: string
  startDate: string
  isAutomated: boolean
  totalBalance: TotalBalance
}

export interface TotalBalance {
  creditSum: number
  debitSum: number
  numCredits: number
  numDebits: number
  startingBalance: number
  sum: number
}

interface Response {
  accountingAccounts: AccountType[]
  expenseAccountMapping: {}
}
export function useAccountsQuery() {
  return useQuery<Response>('/accounting/accounts', 'accounts')
}
