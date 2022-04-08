import { TextInput, TextInputProps } from '@silo-component/text-input'
import { useBottomSheetInternal } from '@gorhom/bottom-sheet'
import React, { memo, Ref, useCallback } from 'react'
import { TextInput as RNTextInput } from 'react-native'

/**
 * Adds a thin wrapper over TextInput to listen for input events and manage Keyboard interactions while bottom sheet is open
 */
const BottomSheetTextInputComponent = React.forwardRef<RNTextInput, TextInputProps>(
  ({ onFocus, onBlur, ...rest }: TextInputProps, ref: Ref<RNTextInput>) => {
    const { shouldHandleKeyboardEvents } = useBottomSheetInternal()
    const handleOnFocus = useCallback(
      args => {
        shouldHandleKeyboardEvents.value = true
        if (onFocus) {
          onFocus(args)
        }
      },
      [onFocus, shouldHandleKeyboardEvents],
    )
    const handleOnBlur = useCallback(
      args => {
        shouldHandleKeyboardEvents.value = false
        if (onBlur) {
          onBlur(args)
        }
      },
      [onBlur, shouldHandleKeyboardEvents],
    )
    return <TextInput ref={ref} onFocus={handleOnFocus} onBlur={handleOnBlur} {...rest} />
  },
)

export const BottomSheetTextInput = memo(BottomSheetTextInputComponent)
BottomSheetTextInput.displayName = 'BottomSheetTextInput'
