import { useQuery } from '@silo-feature/api'

interface SearchRequest {
  userID?: number
  startDate?: Date
  endDate?: Date
}

export interface SalesOrderSearchResult {
  salesOrderID: number
  createdAt: string
  fulfillBy: string
  fulfillAfter: string
  invoiceNumber: number
  quantity: number
  status: string
  transportMethod: number
  customerName: string
  customerID: number
  orderTotal: number
  remainingBalance: number
  creditingSalesOrderID: any
  venueName: any
  locationID: number
  deliveryRouteName: any
  pagesVerifiedCount: number
  pagesUnverifiedCount: number
  pagesVerified: any
}

interface SalesOrderSearchResponse {
  salesOrders: Array<SalesOrderSearchResult>
}

export function useSalesOrderSearchQuery({ userID, startDate, endDate }: SearchRequest) {
  const params = new URLSearchParams('')
  params.append('order', 'ID')
  params.append('sortDirection', 'desc')

  if (userID) {
    params.append('userID', userID.toString())
  }

  if (startDate) {
    params.append('start', startDate.toISOString())
  }

  if (endDate) {
    params.append('end', endDate.toISOString())
  }

  return useQuery<SalesOrderSearchResponse>(
    `/seller/sales_orders/search?${params.toString()}`,
    'SalesOrders',
    {
      enabled: !!userID,
    },
  )
}
