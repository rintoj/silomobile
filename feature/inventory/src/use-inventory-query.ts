import { useQuery } from '@silo-feature/api'

export interface InventoryType {
  inventoryID: number
  createdAt?: string
  updatedAt?: string
  deactivatedAt?: any
  lastActiveAt?: any
  lookupCode?: any
  accountID?: number
  accountName?: string
  productID?: number
  product?: Product
  unitID?: number
  unitName?: string
  increment?: number
  isOrganic?: boolean
  basicUnitName?: string
  offerHalfUnit?: any
  labelID?: number
  label?: Label
  note?: string
  sku?: string
  currentQuantity?: number
  expectedQuantity?: number
  physicalQuantity?: any
  cascadeTargetID?: number
  cascadeRatioNumerator?: number
  cascadeRatioDenominator?: number
}

export interface Product {
  id?: number
  name?: string
}

export interface Label {
  id?: number
  accountID?: number
  name?: string
}

interface Request {
  userID?: number
}

export function useInventoryQuery({ userID }: Request) {
  return useQuery<InventoryType[]>(`/seller/${userID}/inventories`, `inventory:${userID}`, {
    enabled: !!userID,
  })
}
