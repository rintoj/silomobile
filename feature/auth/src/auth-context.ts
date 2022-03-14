import React from 'react'
import { User } from './use-user-query'

export enum AuthState {
  AUTHORIZED = 'AUTHORIZED',
  PENDING = 'PENDING',
  INVALID_TOKEN = 'INVALID_TOKEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export interface AuthContextType {
  user?: User
  signIn: (email: string, password: string) => void
  signInWithToken: (token: string) => void
  signOut?: () => void
  loading?: boolean
  error?: Error | null
  state?: AuthState
}

export const AuthContext = React.createContext<AuthContextType>({} as any)
