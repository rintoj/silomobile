import { usePersistedState } from '@silo/util'
import React, { useEffect } from 'react'
import { AuthContext, AuthState } from './auth-context'
import { useSignInMutation } from './use-sign-in-mutation'
import { useUserQuery } from './use-user-query'

interface Props {
  children: React.ReactElement
}

const AUTH_TOKEN_KEY = 'AUTH_TOKEN'
const AUTH_USER_ID_KEY = 'AUTH_USER_ID'
export function AuthProvider({ children }: Props) {
  const [userId, setUserId] = usePersistedState<number>(AUTH_USER_ID_KEY)
  const [authToken, setAuthToken] = usePersistedState<string>(AUTH_TOKEN_KEY)
  const [authState, setAuthState] = React.useState(AuthState.UNAUTHORIZED)
  // TODO: Pass authToken via request interceptor
  const { data: user } = useUserQuery({ token: authToken, userId })
  const { mutate: signInUser, isLoading: loading, isError: error } = useSignInMutation()

  const signOut = React.useCallback(() => {
    setAuthToken(undefined)
    setUserId(undefined)
  }, [setAuthToken, setUserId])

  const signIn = React.useCallback(
    async (email: string, password: string) => {
      setAuthState(AuthState.CHECKING)
      signInUser(
        { email, password },
        {
          onSuccess: ({ token, userID }) => {
            setAuthToken(token)
            setUserId(userID)
          },
          onError: () => {
            setAuthToken(undefined)
          },
        },
      )
    },
    [setAuthToken, setUserId, signInUser],
  )

  const value = React.useMemo(
    () => ({ user, error, loading, signIn, state: authState, signOut }),
    [authState, error, loading, signIn, signOut, user],
  )

  useEffect(() => {
    if (authToken) {
      setAuthState(AuthState.AUTHORIZED)
    } else {
      setAuthState(AuthState.UNAUTHORIZED)
    }
  }, [authToken])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
