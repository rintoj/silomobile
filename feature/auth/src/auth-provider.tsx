import { usePersistedState } from '@silo/util'
import React, { useEffect } from 'react'
import { AuthContext, AuthState } from './auth-context'
import { clearAuthToken, setAuthToken } from './auth-token'
import { useSignInMutation } from './use-sign-in-mutation'
import { useUserQuery } from './use-user-query'

interface Props {
  children: React.ReactElement
}

const AUTH_USER_ID_KEY = 'AUTH_USER_ID'
export function AuthProvider({ children }: Props) {
  const [userId, setUserId] = usePersistedState<number>(AUTH_USER_ID_KEY)
  const [authState, setAuthState] = React.useState(AuthState.UNAUTHORIZED)
  const { data: user } = useUserQuery({ userId })
  const { mutateAsync: signInUser, isLoading: loading, error } = useSignInMutation()

  const signOut = React.useCallback(() => {
    setUserId(undefined)
  }, [setUserId])

  const signIn = React.useCallback(
    async (email: string, password: string) => {
      try {
        const { userID, token } = await signInUser({ email, password })
        setAuthToken(token)
        setUserId(userID)
      } catch {
        clearAuthToken()
        setUserId(undefined)
      }
    },
    [setUserId, signInUser],
  )

  const value = React.useMemo(
    () => ({ user, error, loading, signIn, state: authState, signOut }),
    [authState, error, loading, signIn, signOut, user],
  )

  useEffect(() => {
    setAuthState(AuthState.PENDING)
  }, [loading])

  useEffect(() => {
    if (userId) {
      setAuthState(AuthState.AUTHORIZED)
    } else {
      setAuthState(AuthState.UNAUTHORIZED)
    }
  }, [userId])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
