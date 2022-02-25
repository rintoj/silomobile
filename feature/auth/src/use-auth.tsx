import React from 'react'
import { AuthContext } from './auth-context'

export const useAuth = () => React.useContext(AuthContext)
