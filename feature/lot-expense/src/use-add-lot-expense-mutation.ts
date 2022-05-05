import { HttpMethod, useMutation } from '@silo-feature/api'
import { useQueryClient } from 'react-query'

export interface ExpenseRequest {
  distributionType: 'auto' | 'amount'
  category: string
  amount: string
  isPayable: boolean
  serviceDate: string
  note: string
  type: string
  accountID: number
  connections: Connection[]
  selectedAccountingAccountID?: number
  invoice?: string
  payableTo?: number
}

interface Connection {
  connectionID: number
}

interface Response {
  amount?: number
  relevantAmount?: number
  connections: Connection[]
  accountID?: number
  category?: string
  createdAt?: string
  distributionType?: string
  exportedAt?: string
  fulfillmentDate?: string
  id: number
  invoice?: string
  isPayable?: boolean
  note?: string
  paidStatus?: string
  payableTo?: number
  selectedAccountingAccountID?: number
  serviceDate?: string
  type?: string
}

export function useAddLotExpenseMutation(lotId: number) {
  const queryClient = useQueryClient()
  return useMutation<Response, ExpenseRequest[]>('/accounting/expenses', {
    method: HttpMethod.POST,
    onSuccess: () => {
      queryClient.invalidateQueries(['lot', lotId])
    },
  })
}
