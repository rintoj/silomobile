import React from 'react'
import { User } from './use-user-query'

export enum AuthState {
  AUTHORIZED = 'AUTHORIZED',
  CHECKING = 'CHECKING',
  INVALID_TOKEN = 'INVALID_TOKEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export interface AuthContextType {
  user?: User
  signIn: (email: string, password: string) => void
  signOut?: () => void
  loading?: boolean
  error?: boolean
  state?: AuthState
}

export const AuthContext = React.createContext<AuthContextType>({} as any)
