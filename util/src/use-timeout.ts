import React from 'react'

export function useTimeout(delay: number, callback?: () => void) {
  const timeoutRef = React.useRef<any>()

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
  }

  const set = (nextCallback: () => void, updatedDelay?: number) => {
    clear()
    timeoutRef.current = setTimeout(nextCallback ?? callback, updatedDelay ?? delay)
  }

  React.useEffect(() => {
    if (callback) {
      set(callback, delay)
    }
    return () => clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, callback])

  return [clear, set] as const
}
