export enum QRCodeType {
  PurchaseOrder = 'PO',
  Lot = 'LT',
}

function isValidType(type?: string) {
  return [QRCodeType.PurchaseOrder, QRCodeType.Lot].includes(type?.trim().toUpperCase() as any)
}
function isValidId(id?: string) {
  return id?.match(/[0-9]+/)?.length
}

export function parseQRCode(data: string) {
  const [type = '', id] = data.trim().split('-')
  return isValidType(type) && isValidId(id) ? { id, type: type as QRCodeType } : null
}
