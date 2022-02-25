import * as ReactQuery from 'react-query'
import { HttpMethod } from './http-method'
import { useFetch } from './use-fetch'

export type MutationOptions<TData, TError, TVariables, TContext> = Omit<
  ReactQuery.UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationFn'
> & { method?: HttpMethod; withAuthHeader?: boolean }

export function useMutation<
  TData = unknown,
  TVariables = void,
  TError = Error | null,
  TContext = unknown,
>(
  url: string,
  options?: MutationOptions<TData, TError, TVariables, TContext>,
): ReactQuery.UseMutationResult<TData, TError, TVariables, TContext> {
  const mutationFn = useFetch(options?.method ?? HttpMethod.POST, url, {
    withAuthHeader: options?.withAuthHeader,
  })
  return ReactQuery.useMutation<TData, TError, TVariables, TContext>(mutationFn, options)
}
