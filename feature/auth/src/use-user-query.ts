import { useQuery } from '@silo-feature/api'

export interface User {
  userID: number
  accountID: number
  firstName: string
  lastName: string
}

export function useUserQuery({ userId }: { userId: number }) {
  return useQuery<User>(`/users/${userId}`, ['user', userId], { enabled: !!userId })
}
