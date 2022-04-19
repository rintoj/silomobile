import { useQuery } from '@silo-feature/api'

export interface Location {
  name: string
  street1: string
  street2: any
  city: string
  state: string
  post: string
  county: any
  country: any
  faxNumber: any
  phoneNumber?: string
  displayColor: string
  id: number
  accountID: number
  isAccountDefault: boolean
}

export function useLocationsQuery() {
  return useQuery<Location[]>('/account/locations', ['locations'])
}
