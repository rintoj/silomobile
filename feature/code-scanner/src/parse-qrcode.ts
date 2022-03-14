import base64 from 'react-native-base64'

export enum QRCodeType {
  PurchaseOrder = 'PO',
  Lot = 'LT',
  AUTH = 'AUTH',
}

function isValidType(type?: string) {
  return [QRCodeType.PurchaseOrder, QRCodeType.Lot].includes(type?.trim().toUpperCase() as any)
}
function isValidId(id?: string) {
  return id?.match(/[0-9]+/)?.length
}

function isAuthToken(token: string) {
  const [header, payload, signature] = token.trim().split('.')
  if (!header || !payload || !signature) {
    return false
  }
  const { accountID, userID } = JSON.parse(base64.decode(payload))

  if (accountID && userID) {
    return { id: userID, accountID }
  }

  return false
}

export function parseQRCode(data: string) {
  if (isAuthToken(data)) {
    return { type: QRCodeType.AUTH, id: data }
  }

  const [type = '', id] = data.trim().split('-')
  return isValidType(type) && isValidId(id) ? { id, type: type as QRCodeType } : null
}
