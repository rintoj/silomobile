import { useQuery } from '@silo-feature/api'

export interface SalesOrderType {
  salesOrderID: number
  purchaseOrderID: number
  salesRep: SalesRep
  invoiceNumber: number
  customerPurchaseOrderNumber: string
  status: string
  addedManually: boolean
  payThroughSilo: boolean
  paymentStatus: string
  transportMethod: number
  buyer: Buyer
  notes: any
  venueID: number
  priceSheetID: number
  priceSheetName: string
  locationID: number
  location: Location
  submittedTime: string
  fulfillBy: string
  fulfillAfter: string
  orderSubTotal: number
  orderTotal: number
  remainingBalance: number
  costAdjustments: any[]
  items: Item[]
  deliveryRoute: any
  sendNotification: boolean
  sendInvite: boolean
  isCustom: boolean
  sellerIssuedCredits: number
  sellerIssuedCreditCents: number
  creditingSalesOrderID: number
  isOverPayment: boolean
  printCount: number
  hasSaleAssignedToClosedLot: boolean
  creditOrderSummaries: any[]
  shipToAddress: ShipToAddress
  pagesVerifiedCount: number
  pagesUnverifiedCount: number
}

export enum TransportMethod {
  PICKUP,
  DELIVERY,
}

export interface SalesRep {
  userID: number
  isClaimed: any
  isDisabled: any
  isCore: any
  isPaymentApprover: boolean
  firstName: string
  lastName: string
  name: string
  phoneNumber: string
  netD: number
  relationshipStatus: string
  customerCode: string
  supplierCode: string
  displayOriginOnInvoices: boolean
  displaySKUOnInvoices: boolean
  disableDigitalPayments: boolean
  note: string
  defaultDeliveryRoute: any
  billingAddress: any
  shippingAddress: any
  isGoodsVendor: any
  isServicesVendor: any
  contacts: any
  statementDeliveryMethod: any
  availableCreditBalance: number
  availableCreditBalanceCents: number
}

export interface Buyer {
  userID: number
  accountID: number
  isClaimed: boolean
  isDisabled: boolean
  isCore: boolean
  isPaymentApprover: boolean
  companyName: string
  companyType: string
  name: string
  phoneNumber: string
  netD: number
  relationshipStatus: string
  customerCode: string
  supplierCode: string
  displayOriginOnInvoices: boolean
  displaySKUOnInvoices: boolean
  disableDigitalPayments: boolean
  note: string
  defaultDeliveryRoute: any
  billingAddress: BillingAddress
  shippingAddress: ShippingAddress
  isGoodsVendor: any
  isServicesVendor: any
  contacts: any[]
  statementDeliveryMethod: number
  useText: boolean
  vanityName: string
  email: string
  priceSheetID: number
  isRegistered: boolean
  availableCreditBalance: number
  availableCreditBalanceCents: number
  defaultLocationID: number
  settings: Settings
}

export interface BillingAddress {
  name: string
  street1: string
  post: string
}

export interface ShippingAddress {
  name: string
  street1: string
  post: string
}

export interface Settings {
  SO_notifyCustomerOfSaleOrder: any
  areOmnibarInventoriesExpanded: boolean
  automaticallyPrintNewOrders: boolean
  hideEmptyInventories: boolean
  inventoryReportIncludePerformance: any
  inventoryReportSortOption: any
  omnibarSearchAllLocations: boolean
  searchOnlyFavoriteInventoriesDefault: boolean
  searchOnlyUserDepartmentsOmnibarDefault: boolean
  updateExpenseDatesWhenReceivingPOs: boolean
}

export interface Location {
  id: number
  accountID: number
  buyerSellerRelationshipID: number
  name: string
  phone: string
  street1: string
  street2: string
  city: string
  state: string
  post: string
  country: string
  isDefaultBilling: boolean
  isDefaultShipping: boolean
}

export interface Item {
  inventoryID: number
  productID: number
  unitID: number
  isOrganic: boolean
  labelID: number
  labelName: string
  countryOfOrigin: string
  quantity: number
  price: number
  margin: any
  priceSheetItem: PriceSheetItem
  orderItemID: number
  salesOrderID: number
  purchaseOrderID: number
  status: string
  total: number
  productName: string
  sellerID: number
  sellerName: string
  unit: Unit
  unitName: string
  assignedQuantity: number
  assignmentSummary: any
  inventoryIsMerged: boolean
  mergeTargetID: number
  inventoryIsDeleted: boolean
  automatched: boolean
  outOfStock: boolean
  increment: number
  isRefunded: boolean
  replaceable: boolean
  autoReplace: boolean
  replacedBy: any
  packed: boolean
  labeled: boolean
  constraints: any
  label: Label
  requestedLabelID: number
  requestedLabel: any
  sku: string
  traces: Trace[]
  adjustmentType: any
  isSplit: boolean
  splitTargetID: number
  creditingOrderItemID: number
  skipBreakEvenPriceSheetAndPriceGuidance: boolean
  returnedQuantity: number
  relevantLots: RelevantLot[]
  displayIndex: any
  uuid: string
  sellerNoteInternal: any
  sellerNoteToCustomer: any
}

export interface PriceSheetItem {
  inventoryID: number
  createdAt: string
  updatedAt: string
  deactivatedAt: any
  lastActiveAt: any
  lookupCode: any
  accountID: number
  accountName: string
  productID: number
  product: Product
  unitID: number
  unitName: string
  increment: number
  isOrganic: boolean
  basicUnitName: string
  offerHalfUnit: any
  constraints: Constraints
  labelID: number
  label: Label
  note: string
  photos: any[]
  favorited: boolean
  sku: string
  currentQuantity: number
  expectedQuantity: number
  quantityByLocationID: QuantityByLocationId
  physicalQuantity: any
  cascadeTargetID: number
  cascadeRatioNumerator: number
  cascadeRatioDenominator: number
  breakEvenPerUnitOfMostRecentLot: number
  minPaddedCostOfMostRecentLot: number
  maxPaddedCostOfMostRecentLot: number
  priceSheetItemID: number
  priceSheetID: number
  price: number
  priceCents: number
  unitPrice: number
  available: boolean
  lotPhysicalQuantityTotal: any
}

export interface Product {
  id: number
  parentID: number
  name: string
}

export interface Constraints {
  isDeliverable: boolean
  availabilities: any[]
  earliestAvailability: string
}

export interface Label {
  id: number
  accountID: number
  name: string
}

export interface QuantityByLocationId {
  '15186': N15186
}

export interface N15186 {
  currentQuantity: number
  expectedQuantity: number
}

export interface Unit {
  id: number
  name: string
  price: number
  isOrganic: boolean
  createdAt: string
  quantityDenominator: number
  quantityNumerator: number
  measure: string
  packaging: string
  increment: number
}

export interface Trace {
  id: number
  locationID: number
  inventoryID: number
  orderID: number
  purchaseOrderNumber: number
  salesOrderID: number
  assignedSOs: any
  orderItemID: number
  isInbound: boolean
  providerID: number
  providerName: string
  customerName: any
  timestamp: string
  closedAt: any
  sku: any
  originID: number
  origin: Origin
  countryOfOrigin: string
  internalLabelID: number
  internalLabel: InternalLabel
  lotNumber: string
  packDate: any
  quantity: number
  remainingQuantity: number
  type: string
  note: string
  gs1: string
  hold: boolean
  cost: any
  margin: any
  breakEven: number
  minPaddedCost: number
  maxPaddedCost: number
  parentIDs: number[]
  childIDs: any
  averageProfit: number
  isMerged: boolean
  repackSourceLotID: any
  repackSourceQuantity: any
  orderItemPriceRatio: number
  parentLotLocation: ParentLotLocation
}

export interface Origin {
  id: number
  country: string
}

export interface InternalLabel {
  id: number
  accountID: number
  name: string
}

export interface ParentLotLocation {
  name: string
  street1: string
  street2: any
  city: string
  state: string
  post: string
  county: any
  country: any
  faxNumber: any
  phoneNumber: string
  displayColor: string
  id: number
  accountID: number
}

export interface RelevantLot {
  rootTraceID: number
  type: string
  orderItemID: number
  inventoryID: number
  createdAt: string
  availableAt?: string
  closedAt: any
  lotNumber: string
  packDate: any
  note: any
  hold: boolean
  physicalQuantity: any
  internalLabel: InternalLabel
  product: Product
  unit: Unit
  isOrganic: boolean
  receivedQuantity: number
  remainingQuantity: number
  outboundTransferQuantity: number
  hasActivity: boolean
  locationID: number
  location: Location
  returnedQuantity: number
  supplier: string
  purchaseOrderID: number
  purchaseOrderNumber: number
  fulfillmentDate: string
  cost: number
  breakEven: number
  minPaddedCost: number
  maxPaddedCost: number
  minMargin: number
  maxMargin: number
  isPAS: boolean
  isPriced: boolean
  margin: Margin
  sourceLotID: any
  inventoryTransferID: any
  origin?: Origin
  customerInvoiceNumber?: string
  customerBOLNumber?: string
}

export interface Margin {
  min?: number
  max?: number
  minType: string
  maxType: string
}

export interface ShipToAddress {
  id: number
  accountID: number
  buyerSellerRelationshipID: number
  name: string
  phone: string
  street1: string
  street2: string
  city: string
  state: string
  post: string
  country: string
  isDefaultBilling: boolean
  isDefaultShipping: boolean
}

export function useSalesOrderQuery({ salesOrderID }: { salesOrderID?: number }) {
  return useQuery<SalesOrderType>(
    `/seller/sales_orders/${salesOrderID}`,
    ['purchase_order', salesOrderID],
    { enabled: !!salesOrderID },
  )
}
