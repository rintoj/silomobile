import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { COLOR_X } from '@silo-feature/theme'
import { useTheme } from 'native-x-theme'
import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomSheetBackdrop } from './bottom-sheet-backdrop'
import { BottomSheetProps } from './types'

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 60,
  },
  handleStyle: {
    paddingTop: 15,
    paddingBottom: 0,
  },
})

export function BottomSheet({
  sheetRef,
  visible,
  hideHandle,
  children,
  snapPoints = ['85%'],
  enablePanDownToClose,
  onClose,
}: BottomSheetProps) {
  const { getColor } = useTheme()
  const { top } = useSafeAreaInsets()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const openModal = () => bottomSheetModalRef.current?.present()
  const dismissModal = () => bottomSheetModalRef.current?.dismiss()
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onClose={dismissModal}
        {...props}
      />
    ),
    [],
  )

  const backgroundStyle = React.useMemo(
    () => ({ borderRadius: 10, backgroundColor: getColor(COLOR_X.PAGE) }),
    [getColor],
  )

  const handleIndicatorStyle = React.useMemo(
    () => ({ backgroundColor: hideHandle ? 'transparent' : '#C1C9DA', width: 76, height: 6 }),
    [hideHandle],
  )

  React.useImperativeHandle(sheetRef, () => ({
    expand: () => bottomSheetModalRef?.current?.expand(),
    collapse: () => bottomSheetModalRef?.current?.collapse(),
  }))

  useEffect(() => {
    if (visible) {
      openModal()
    } else {
      dismissModal()
    }
  }, [visible])

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        backgroundStyle={backgroundStyle}
        style={styles.shadow}
        handleStyle={styles.handleStyle}
        handleIndicatorStyle={handleIndicatorStyle}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        topInset={top}
        onDismiss={onClose}
        enablePanDownToClose={enablePanDownToClose}
        backdropComponent={renderBackdrop}
        keyboardBehavior='fillParent'
        keyboardBlurBehavior='restore'
      >
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}
