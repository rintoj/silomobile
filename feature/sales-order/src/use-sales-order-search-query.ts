import { useQuery } from '@silo-feature/api'

interface SearchRequest {
  id?: string
  locationId?: string
  purchaseOrderNumber?: string
  invoiceNumber?: string
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

export function useSalesOrderSearchQuery({
  userID,
  id,
  locationId,
  invoiceNumber,
  purchaseOrderNumber,
  startDate,
  endDate,
}: SearchRequest) {
  const params = new URLSearchParams('')
  params.append('order', 'ID')
  params.append('sortDirection', 'desc')

  if (id) {
    params.append('salesOrderID', id)
  }

  if (purchaseOrderNumber) {
    params.append('customerPONumber', purchaseOrderNumber)
  }

  if (invoiceNumber) {
    params.append('invoiceNumber', invoiceNumber)
  }

  if (userID) {
    params.append('userID', userID.toString())
  }

  if (startDate) {
    params.append('start', startDate.toISOString())
  }

  if (endDate) {
    params.append('end', endDate.toISOString())
  }

  if (locationId) {
    params.append('locationID', locationId)
  }

  return useQuery<SalesOrderSearchResponse>(
    `/seller/sales_orders/search?${params.toString()}`,
    `salesOrders:${id}:${purchaseOrderNumber}:${invoiceNumber}:${startDate}:${endDate}:${locationId}`,
    {
      enabled: !!userID,
    },
  )
}
