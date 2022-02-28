import { useNavigation } from '@react-navigation/core'
import { ErrorPopup } from '@silo-component/error-popup'
import { Popup } from '@silo-component/popup'
import { Text } from '@silo-component/text'
import { CodeScanner, QRCodeType, ScannedQRCode } from '@silo-feature/code-scanner'
import { COLOR_X } from '@silo-feature/theme'
import { useOpenClose } from '@silo/util'
import { CloseIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR, useTheme } from 'native-x-theme'
import React, { useCallback } from 'react'
import { StatusBar } from 'react-native'
import { Screens } from '../navigation/screens'
import QRCodeIcon from './qr-code-icon.svg'

export function CodeScannerModal() {
  const { navigate } = useNavigation<any>()
  const { getColor } = useTheme()
  const [error, showError, closeError] = useOpenClose()
  const closeModal = useCallback(() => navigate(Screens.Home), [navigate])
  const onScan = useCallback(
    (code: ScannedQRCode) => {
      switch (code.type) {
        case QRCodeType.PurchaseOrder:
          navigate(Screens.PurchaseOrder, code)
          break
        case QRCodeType.Lot:
          navigate(Screens.LotDetails, code)
          break
        default:
          break
      }
    },
    [navigate],
  )

  return (
    <Popup visible accentColor={COLOR_X.ACCENT1}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={getColor(COLOR.ACCENT)}
        animated
        translucent
      />
      <Stack
        alignCenter
        fill
        padding={['vertical:large', 'horizontal:large']}
        backgroundColor={COLOR.ACCENT}
      >
        <Spacer size='small' />
        <Stack horizontal fillHorizontal alignCenter alignMiddle>
          <QRCodeIcon />
          <Spacer size='small' />
          <Text fontSize='large' alignCenter textColor={COLOR.PRIMARY}>
            Scan Silo label
          </Text>
        </Stack>
        <Spacer />
        <Stack fill borderRadius='large'>
          <CodeScanner onSuccess={onScan} onError={showError} />
        </Stack>
        <Spacer />
        <Tappable onTap={closeModal}>
          <Stack
            fillHorizontal
            alignCenter
            width={78}
            height={78}
            borderRadius='round'
            alignMiddle
            backgroundColor={COLOR_X.ACCENT3}
          >
            <CloseIcon size={42} color={COLOR.PRIMARY} />
          </Stack>
        </Tappable>
      </Stack>
      {error ? (
        <ErrorPopup
          title='Invalid QRCode'
          error='The scanned code was not valid. Please try again.'
          onDismiss={closeError}
        />
      ) : null}
    </Popup>
  )
}
