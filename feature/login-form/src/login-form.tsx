import { useAuth } from '@silo-feature/auth'
import React from 'react'
import { LoginFormView } from './login-form-view'

export function LoginForm() {
  const { signIn, loading } = useAuth()
  return <LoginFormView loading={loading} onSubmit={signIn} />
}
