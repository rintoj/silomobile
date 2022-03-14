import { clearAuthToken, setAuthToken } from '@silo-feature/api'
import { usePersistedState } from '@silo/util'
import React, { useEffect } from 'react'
import base64 from 'react-native-base64'
import { AuthContext, AuthState } from './auth-context'
import { useSignInMutation } from './use-sign-in-mutation'
import { useUserQuery } from './use-user-query'

interface Props {
  children: React.ReactElement
}

const AUTH_USER_ID_KEY = 'AUTH_USER_ID'

export function AuthProvider({ children }: Props) {
  const [userId, setUserId] = usePersistedState<number>(AUTH_USER_ID_KEY)
  const [authState, setAuthState] = React.useState(AuthState.UNAUTHORIZED)
  const { data: user, isLoading: userLoading, error: userError } = useUserQuery({ userId })
  const { mutateAsync: signInUser, isLoading: loading, error: signInError } = useSignInMutation()
  const [error, setError] = React.useState<Error | null>(null)
  const signOut = React.useCallback(() => {
    setUserId(undefined)
  }, [setUserId])

  const signIn = React.useCallback(
    async (email: string, password: string) => {
      try {
        setError(null)
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

  const signInWithToken = React.useCallback(
    async (token: string) => {
      try {
        const [, payload] = token.trim().split('.')
        const { userID } = JSON.parse(base64.decode(payload))
        setError(null)
        setAuthToken(token)
        setUserId(userID)
      } catch {
        clearAuthToken()
        setUserId(undefined)
      }
    },
    [setUserId],
  )

  const value = React.useMemo(
    () => ({
      user,
      error,
      loading: loading || userLoading,
      signIn,
      signInWithToken,
      state: authState,
      signOut,
    }),
    [authState, error, loading, signIn, signInWithToken, signOut, user, userLoading],
  )

  useEffect(() => {
    setAuthState(AuthState.PENDING)
  }, [loading])

  useEffect(() => {
    if (user?.userID) {
      setAuthState(AuthState.AUTHORIZED)
    } else {
      setAuthState(AuthState.UNAUTHORIZED)
    }
  }, [user?.userID])

  useEffect(() => {
    if (userError || signInError) {
      setUserId(undefined)
      clearAuthToken()
      setError(userError ?? signInError)
    }
  }, [userError, signInError, setUserId])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
