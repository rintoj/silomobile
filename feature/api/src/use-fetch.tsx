import config from '@silo-feature/config'
import React from 'react'
import { getAuthToken } from './auth-token'
import { HttpMethod } from './http-method'

const { version, baseUrl } = config.api

export interface FetchOptions {
  withAuthHeader?: boolean
}

export function useFetch<TVariables>(
  method: HttpMethod,
  url: string,
  { withAuthHeader = true }: FetchOptions = {},
) {
  return React.useCallback(
    async (variables?: TVariables) => {
      if (!url) {
        return null
      }
      const response = await fetch(`${baseUrl}${url}`, {
        method,
        headers: {
          ...(withAuthHeader ? { Authorization: `Bearer ${await getAuthToken()}` } : {}),
          'Content-Type': 'application/json',
          'X-Silo-Mobile-Version': version,
        },
        ...(variables && method !== HttpMethod.GET ? { body: JSON.stringify(variables) } : {}),
      })
      if (!response.ok) {
        const error =
          response.headers.get('content-type') === 'application/json'
            ? await response.json()
            : { message: await response.text() }
        throw new Error(error?.message ?? 'Request failed')
      }

      return response.json()
    },
    [url, method, withAuthHeader],
  )
}
