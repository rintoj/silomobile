import { HttpMethod, useMutation } from '@silo-feature/api'
import { useQueryClient } from 'react-query'

interface Request {
  deliveredAt: string
  signature: string
}

export enum PurchaseOrderStatus {
  DELIVERED = 'delivered',
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
}

export interface PurchaseOrder {
  id: number
  status: PurchaseOrderStatus
}

export function useReceivePOMutation(orderID: number) {
  const queryClient = useQueryClient()
  return useMutation<PurchaseOrder, Request>(`/buyer/purchase_orders/${orderID}/receive`, {
    method: HttpMethod.PATCH,
    onSuccess: () => {
      queryClient.invalidateQueries(['purchase_order', orderID])
    },
  })
}
