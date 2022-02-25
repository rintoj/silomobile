import { useMutation } from '@silo-feature/api'

interface Request {
  email: string
  password: string
}

export interface UserAccount {
  accountID: number
  userID: number
  isBuyer: boolean
  isSeller: boolean
  token: string
  siloEmail: string
}

export function useSignInMutation() {
  return useMutation<UserAccount, Request>('/login', { withAuthHeader: false })
}
