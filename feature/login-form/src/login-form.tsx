import { useAuth } from '@silo-feature/auth'
import React from 'react'
import { LoginFormView } from './login-form-view'

interface Props {
  onScanLoginTap?: () => void
}
export function LoginForm({ onScanLoginTap }: Props) {
  const { signIn, loading, error } = useAuth()

  return (
    <LoginFormView
      loading={loading}
      error={error}
      onSubmit={signIn}
      onScanLoginTap={onScanLoginTap}
    />
  )
}
