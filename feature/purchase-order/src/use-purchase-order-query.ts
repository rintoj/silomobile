import { useQuery } from '@silo-feature/api'

export enum PurchaseOrderStatus {
  DELIVERED = 'delivered',
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
}

export interface PurchaseOrder {
  status?: PurchaseOrderStatus
  id: number
  locationID?: number
  orderID?: number
  customerInvoiceNumber?: string
  customerBOLNumber?: string
  salesOrderInvoiceNumber?: number
  buyerID?: number
  userID?: number
  salesRep?: SalesRep
  sellers?: Seller[]
  payment?: Payment
  chargeStatus?: string
  paymentStatus?: string
  orderTotal?: number
  payThroughSilo?: boolean
  remainingBalance?: number
  orderItems?: OrderItem[]
  costAdjustments?: any
  deliveryRoute?: any
  transportMethod?: number
  photos?: any
  deliveredAt?: string
  submittedTime?: string
  shipAfter?: string
  shipBefore?: string
  signature?: string
  isCustom?: boolean
  signedOffAt?: any
  signedOffBy?: string
  sendEmail?: boolean
  exportedAt?: any
  editableVendor?: boolean
  hasLotActivity?: boolean
  creditOrderSummaries?: any[]
  creditingPurchaseOrderID?: any
  autoApplyCredit?: boolean
  isAutoReceived?: boolean
  isFactored?: boolean
  growerPortalShareLevel?: string
  growerPortalLink?: string
}

interface SalesRep {
  userID?: number
  accountID?: number
  isClaimed?: boolean
  isDisabled?: any
  isCore?: boolean
  isPaymentApprover?: boolean
  firstName?: string
  lastName?: string
  companyName?: string
  companyType?: string
  name?: string
  phoneNumber?: string
  street1?: string
  city?: string
  state?: string
  post?: string
  netD?: number
  relationshipStatus?: string
  customerCode?: string
  supplierCode?: string
  displayOriginOnInvoices?: boolean
  displaySKUOnInvoices?: boolean
  disableDigitalPayments?: boolean
  note?: string
  defaultDeliveryRoute?: any
  billingAddress?: any
  shippingAddress?: any
  isGoodsVendor?: any
  isServicesVendor?: any
  contacts?: any
  statementDeliveryMethod?: any
  useEmail?: boolean
  useText?: boolean
  vanityName?: string
  email?: string
  isRegistered?: boolean
  availableCreditBalance?: number
  availableCreditBalanceCents?: number
  defaultLocationID?: number
  settings?: Settings
}

interface Settings {
  SO_notifyCustomerOfSaleOrder?: any
  areOmnibarInventoriesExpanded?: boolean
  automaticallyPrintNewOrders?: boolean
  hideEmptyInventories?: boolean
  inventoryReportIncludePerformance?: any
  inventoryReportSortOption?: any
  omnibarSearchAllLocations?: boolean
  searchOnlyFavoriteInventoriesDefault?: boolean
  searchOnlyUserDepartmentsOmnibarDefault?: boolean
  updateExpenseDatesWhenReceivingPOs?: boolean
}

interface Seller {
  id?: number
  name?: string
  shippingAddress?: ShippingAddress
  billingAddress?: BillingAddress
  salesContact?: SalesContact
}

interface ShippingAddress {
  name?: string
}

interface BillingAddress {
  name?: string
}

interface SalesContact {
  userID?: number
  isClaimed?: boolean
  isDisabled?: any
  isCore?: any
  isPaymentApprover?: boolean
  name?: string
  netD?: number
  relationshipStatus?: string
  customerCode?: string
  supplierCode?: string
  displayOriginOnInvoices?: boolean
  displaySKUOnInvoices?: boolean
  disableDigitalPayments?: boolean
  note?: string
  defaultDeliveryRoute?: any
  billingAddress?: any
  shippingAddress?: any
  isGoodsVendor?: any
  isServicesVendor?: any
  contacts?: any
  statementDeliveryMethod?: any
  availableCreditBalance?: number
  availableCreditBalanceCents?: number
}

interface Payment {
  methodID?: number
  type?: string
  isVerified?: boolean
  isDefault?: boolean
  brand?: string
  bank?: string
  last4?: string
  expMonth?: number
  expYear?: number
  status?: string
}

export interface OrderItem {
  inventoryID?: number
  productID?: number
  unitID?: number
  isOrganic?: boolean
  labelID?: number
  labelName?: string
  countryOfOrigin?: string
  quantity?: number
  price?: number
  margin?: Margin
  priceSheetItem?: any
  orderItemID?: number
  salesOrderID?: number
  purchaseOrderID?: number
  status?: string
  total?: number
  productName?: string
  sellerID?: number
  sellerName?: string
  unit?: Unit
  unitName?: string
  assignedQuantity?: number
  inventoryIsMerged?: boolean
  mergeTargetID?: number
  inventoryIsDeleted?: boolean
  automatched?: boolean
  outOfStock?: boolean
  increment?: number
  isRefunded?: boolean
  replaceable?: boolean
  autoReplace?: boolean
  replacedBy?: any
  packed?: boolean
  labeled?: boolean
  constraints?: any
  label?: Label
  requestedLabelID?: number
  requestedLabel?: any
  sku?: string
  traces?: Trace[]
  adjustmentType?: any
  isSplit?: boolean
  splitTargetID?: number
  creditingOrderItemID?: number
  skipBreakEvenPriceSheetAndPriceGuidance?: boolean
  returnedQuantity?: number
  displayIndex?: any
  uuid?: string
}

interface Margin {
  min?: number
  max?: any
  minType?: string
  maxType?: string
}

interface Unit {
  id?: number
  name?: string
  price?: number
  isOrganic?: boolean
  createdAt?: string
  quantityDenominator?: number
  quantityNumerator?: number
  measure?: string
  packaging?: string
  increment?: number
}

interface Label {
  id?: number
  accountID?: number
  name?: string
}

interface Trace {
  id?: number
  locationID?: number
  inventoryID?: number
  orderID?: number
  salesOrderID?: number
  assignedSOs?: any
  orderItemID?: number
  isInbound?: boolean
  providerID?: number
  providerName?: string
  customerName?: any
  timestamp?: string
  closedAt?: any
  sku?: any
  originID?: number
  origin?: Origin
  countryOfOrigin?: string
  internalLabelID?: number
  lotNumber?: string
  packDate?: any
  quantity?: number
  remainingQuantity?: number
  type?: string
  note?: string
  gs1?: string
  hold?: boolean
  cost?: any
  margin?: any
  parentIDs?: any
  childIDs?: any
  averageProfit?: number
  isMerged?: boolean
  repackSourceLotID?: any
  repackSourceQuantity?: any
  orderItemPriceRatio?: number
}

interface Origin {
  id?: number
  country?: string
}

export function usePurchaseOrderQuery({
  purchaseOrderID,
  accountID,
}: {
  purchaseOrderID?: number
  accountID?: number
}) {
  return useQuery<PurchaseOrder>(
    `/buyer/${accountID}/purchase_orders/${purchaseOrderID}`,
    ['purchase_order', purchaseOrderID],
    { enabled: !!purchaseOrderID && !!accountID },
  )
}
