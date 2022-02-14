import React from 'react'
export function useOpenClose(initialValue?: boolean): [boolean, () => void, () => void] {
  const [state, setState] = React.useState<boolean>(initialValue ?? false)
  const open = React.useCallback(() => setState(true), [])
  const close = React.useCallback(() => setState(false), [])
  return [state, open, close]
}
