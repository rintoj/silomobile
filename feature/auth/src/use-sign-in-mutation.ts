import config from '@silo-feature/config'
import { useMutation } from 'react-query'

const { baseUrl } = config.api
const endPoint = '/login'
const appVersion = '1.0.0'

interface SignInRequestParams {
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

function signIn({ email, password }: SignInRequestParams) {
  return fetch(`${baseUrl}${endPoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'X-Silo-Mobile-Version': appVersion,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(response => response.json())
}

export function useSignInMutation() {
  return useMutation<UserAccount, unknown, SignInRequestParams>(signIn)
}
