import React, { useCallback } from 'react'
import { Storage } from './async-storage'

export function usePersistedState<T>(
  key: string,
  initialValue?: T,
): [T, (value: T | undefined) => void, () => void] {
  const [state, setStateValue] = React.useState<T>(initialValue as T)

  const refreshState = React.useCallback(async () => {
    const value = await Storage.getItem(key)
    setStateValue(value ? JSON.parse(value) : undefined)
  }, [key])

  const setState = useCallback(
    (value: T) => {
      if (value === undefined || value === null) {
        Storage.removeItem(key)
        setStateValue(value)
      } else {
        Storage.setItem(key, JSON.stringify(value))
        setStateValue(value)
      }
    },
    [setStateValue, key],
  )

  React.useEffect(() => {
    refreshState()
  }, [refreshState])

  return [state, setState as any, refreshState]
}
