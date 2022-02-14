import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export function useKeyboard() {
  const [visible, setVisible] = useState(false)

  function dismiss() {
    Keyboard.dismiss()
    setVisible(false)
  }

  useEffect(() => {
    function onKeyboardShow() {
      setVisible(true)
    }

    function onKeyboardHide() {
      setVisible(false)
    }

    const showSubscription = Keyboard.addListener('keyboardWillShow', onKeyboardShow)
    const hideSubscription = Keyboard.addListener('keyboardWillHide', onKeyboardHide)

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return [visible, dismiss]
}
