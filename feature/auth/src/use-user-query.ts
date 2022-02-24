import config from '@silo-feature/config'
import { useQuery } from 'react-query'
import { getAuthToken } from './auth-token'

const { baseUrl } = config.api
const endPoint = '/users'

export interface User {
  userID: number
  accountID: number
  firstName: string
  lastName: string
}

async function getUser({ userId }: { userId?: number }) {
  if (!userId) {
    return null
  }

  return fetch(`${baseUrl}${endPoint}/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAuthToken()}`,
    },
  }).then(response => response.json())
}

export function useUserQuery(variables: { userId: number }) {
  return useQuery<User>(['user', variables], () => getUser(variables))
}
