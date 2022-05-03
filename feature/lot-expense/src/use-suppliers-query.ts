import { useQuery } from '@silo-feature/api'

export interface SupplierType {
  userID: number
  accountID: number
  isClaimed: boolean
  isDisabled: boolean
  isCore: boolean
  isPaymentApprover: boolean
  companyName: string
  name: string
  netD: number
  relationshipStatus: string
  customerCode: string
  supplierCode: string
  displayOriginOnInvoices: boolean
  displaySKUOnInvoices: boolean
  disableDigitalPayments: boolean
  disableLockboxCollections: boolean
  note: string
  defaultDeliveryRoute: any
  billingAddress: any
  shippingAddress: any
  isGoodsVendor: boolean
  isServicesVendor: boolean
  contacts: any[]
  statementDeliveryMethod: any
  vanityName: string
  email: string
  availableCreditBalance: number
  availableCreditBalanceCents: number
  defaultLocationID: number
}

export function useSuppliersQuery() {
  return useQuery<Array<SupplierType>>('/buyer/suppliers?isServicesVendor=true', 'suppliers')
}
