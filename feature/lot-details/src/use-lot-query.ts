import { useQuery } from '@silo-feature/api'

interface InternalLabel {
  id: number
  accountID?: number
  name?: string
}

interface Origin {
  id: number
  country?: string
}

interface Product {
  id: number
  parentID?: number
  name?: string
}

interface Unit {
  id: number
  name?: string
  price?: number
  isOrganic?: boolean
  createdAt?: Date
  quantityDenominator?: number
  quantityNumerator?: number
  measure?: string
  packaging?: string
  increment?: number
}

interface Location {
  name?: string
  street1?: string
  street2?: any
  city?: string
  state?: string
  post?: string
  county?: any
  country?: any
  faxNumber?: any
  phoneNumber?: string
  displayColor?: string
  id?: number
  accountID?: number
}

interface Margin {
  min?: number
  max?: any
  minType?: string
  maxType?: string
}

export interface Lot {
  rootTraceID: number
  type?: string
  orderItemID?: number
  inventoryID?: number
  createdAt?: Date
  availableAt?: Date
  closedAt?: any
  lotNumber?: string
  packDate?: any
  note?: any
  hold?: boolean
  physicalQuantity?: any
  internalLabel?: InternalLabel
  origin?: Origin
  product?: Product
  unit?: Unit
  isOrganic?: boolean
  receivedQuantity?: number
  remainingQuantity?: number
  outboundTransferQuantity?: number
  hasActivity?: boolean
  locationID?: number
  location?: Location
  returnedQuantity?: number
  supplier?: string
  purchaseOrderID?: number
  fulfillmentDate?: string
  cost?: number
  breakEven?: number
  minPaddedCost?: number
  maxPaddedCost?: number
  minMargin?: number
  maxMargin?: number
  isPAS?: boolean
  isPriced?: boolean
  margin?: Margin
  sourceLotID?: any
  inventoryTransferID?: any
}

export function useLotQuery({ lotId }: { lotId: number }) {
  return useQuery<Lot>(`/lots/${lotId}`, ['lot', lotId], { enabled: !!lotId })
}
