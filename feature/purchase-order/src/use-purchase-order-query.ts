import { useQuery } from '@silo-feature/api'

export enum PurchaseOrderStatus {
  DELIVERED = 'delivered',
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
}

export interface PurchaseOrder {
  status?: string
  id: number
  locationID?: number
  orderID?: number
  customerInvoiceNumber?: string
  customerBOLNumber?: string
  salesOrderInvoiceNumber?: number
  purchaseOrderNumber?: number
  shippingReferenceNumber?: any
  buyerID?: number
  userID?: number
  salesRep?: SalesRep
  sellers?: Seller[]
  payment?: Payment
  chargeStatus?: string
  paymentStatus?: string
  orderTotal?: number
  orderInlineExpenseTotal?: number
  orderSubTotal?: number
  payThroughSilo?: boolean
  remainingBalance?: number
  orderItems?: OrderItem[]
  costAdjustments?: any
  inlineExpenses?: any
  deliveryRoute?: any
  transportMethod?: number
  notes?: any[]
  files?: any
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
  hasLotActivity?: boolean
  creditOrderSummaries?: any[]
  creditingPurchaseOrderID?: any
  creditingPurchaseOrderNumber?: any
  autoApplyCredit?: boolean
  isAutoReceived?: boolean
  isFactored?: boolean
  growerPortalShareLevel?: string
  growerPortalLink?: string
}

interface SalesRep {
  userID?: string
  accountID?: string
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
  netD?: string
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
  availableCreditBalance?: string
  availableCreditBalanceCents?: string
  defaultLocationID?: string
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
  id?: string
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
  userID?: string
  isClaimed?: boolean
  isDisabled?: any
  isCore?: any
  isPaymentApprover?: boolean
  name?: string
  netD?: string
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
  availableCreditBalance?: string
  availableCreditBalanceCents?: string
}

interface Payment {
  methodID?: string
  type?: string
  isVerified?: boolean
  isDefault?: boolean
  brand?: string
  bank?: string
  last4?: string
  expMonth?: string
  expYear?: string
  status?: string
}

export interface OrderItem {
  inventoryID?: string
  productID?: string
  unitID?: string
  isOrganic?: boolean
  labelID?: string
  labelName?: string
  countryOfOrigin?: string
  quantity?: string
  price?: string
  margin?: Margin
  priceSheetItem?: any
  orderItemID?: string
  salesOrderID?: string
  purchaseOrderID?: string
  status?: string
  total?: string
  productName?: string
  sellerID?: string
  sellerName?: string
  unit?: Unit
  unitName?: string
  assignedQuantity?: string
  inventoryIsMerged?: boolean
  mergeTargetID?: string
  inventoryIsDeleted?: boolean
  automatched?: boolean
  outOfStock?: boolean
  increment?: string
  isRefunded?: boolean
  replaceable?: boolean
  autoReplace?: boolean
  replacedBy?: any
  packed?: boolean
  labeled?: boolean
  constraints?: any
  label?: Label
  requestedLabelID?: string
  requestedLabel?: any
  sku?: string
  traces?: Trace[]
  adjustmentType?: any
  isSplit?: boolean
  splitTargetID?: string
  creditingOrderItemID?: string
  skipBreakEvenPriceSheetAndPriceGuidance?: boolean
  returnedQuantity?: string
  displayIndex?: any
  uuid?: string
}

interface Margin {
  min?: string
  max?: any
  minType?: string
  maxType?: string
}

interface Unit {
  id?: string
  name?: string
  price?: string
  isOrganic?: boolean
  createdAt?: string
  quantityDenominator?: string
  quantityNumerator?: string
  measure?: string
  packaging?: string
  increment?: string
}

interface Label {
  id?: string
  accountID?: string
  name?: string
}

interface Trace {
  id?: string
  locationID?: string
  inventoryID?: string
  orderID?: string
  salesOrderID?: string
  assignedSOs?: any
  orderItemID?: string
  isInbound?: boolean
  providerID?: string
  providerName?: string
  customerName?: any
  timestamp?: string
  closedAt?: any
  sku?: any
  originID?: string
  origin?: Origin
  countryOfOrigin?: string
  internalLabelID?: string
  lotNumber?: string
  packDate?: any
  quantity?: string
  remainingQuantity?: string
  type?: string
  note?: string
  gs1?: string
  hold?: boolean
  cost?: any
  margin?: any
  parentIDs?: any
  childIDs?: any
  averageProfit?: string
  isMerged?: boolean
  repackSourceLotID?: any
  repackSourceQuantity?: any
  orderItemPriceRatio?: string
}

interface Origin {
  id?: string
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
