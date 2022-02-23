import { useQuery } from 'react-query'
import config from '@silo-feature/config'

const { baseUrl } = config.api
const endPoint = '/users'

export interface User {
  userID: number
  accountID: number
  firstName: string
  lastName: string
}

async function getUser({ userId, token }: { userId?: number; token: string }) {
  if (!userId || !token) {
    return null
  }

  const response = await fetch(`${baseUrl}${endPoint}/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

export function useUserQuery(variables: { token: string; userId: number }) {
  return useQuery<User>(['user', variables], () => getUser(variables))
}
