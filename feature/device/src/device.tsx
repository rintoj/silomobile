import React from 'react'
import { AppState, AppStateStatus } from 'react-native'

export function useOnDeviceResume(callback?: () => any) {
  const statusRef = React.useRef(AppState.currentState)
  React.useEffect(() => {
    const listener = (status: AppStateStatus) => {
      if (statusRef.current.match(/inactive|background/) && status === 'active') {
        callback?.()
      }
      statusRef.current = status
    }
    const subscription = AppState.addEventListener('change', listener)
    return () => subscription.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
