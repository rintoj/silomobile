import React from 'react'
import { LoginFormView } from './login-form-view'

interface Props {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: Props) {
  return <LoginFormView onSubmit={onSuccess} />
}
