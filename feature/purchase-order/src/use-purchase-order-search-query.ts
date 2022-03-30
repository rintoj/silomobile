import { useQuery } from '@silo-feature/api'

interface SearchRequest {
  userID?: number
  startDate?: Date
  endDate?: Date
}

export interface PurchaseOrderSearchResult {
  id: number
  createdAt: string
  shipAfter: string
  shipBefore: string
  signedOffAt: any
  receivedAt: any
  isFactored: boolean
  customerInvoiceNumber: any
  customerBOLNumber: any
  locationID: number
  quantity: number
  priceTotal: number
  type: string
  status: string
  vendorName: string
  vendorID: number
  creditingPurchaseOrderID: any
  paymentStatus: string
  purchaseOrderNumber: number
}

interface PurchaseOrderSearchResponse {
  purchaseOrders: Array<PurchaseOrderSearchResult>
}

export function usePurchaseOrderSearchQuery({ userID, startDate, endDate }: SearchRequest) {
  const params = new URLSearchParams('')
  params.append('sortType', 'ID')
  params.append('sortDirection', 'desc')

  if (userID) {
    params.append('userIDs', userID.toString())
  }

  if (startDate) {
    params.append('fulfilledByStart', startDate.toISOString())
  }

  if (endDate) {
    params.append('fulfilledByEnd', endDate.toISOString())
  }

  return useQuery<PurchaseOrderSearchResponse>(
    `/purchase_orders?${params.toString()}`,
    'purchaseOrders',
    {
      enabled: !!userID,
    },
  )
}
