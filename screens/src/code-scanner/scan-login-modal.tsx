import type { StackScreenProps } from '@react-navigation/stack'
import { ErrorPopup } from '@silo-component/error-popup'
import { Popup } from '@silo-component/popup'
import { Text } from '@silo-component/text'
import { useAuth } from '@silo-feature/auth'
import { CodeScanner, QRCodeType, ScannedQRCode } from '@silo-feature/code-scanner'
import { COLOR_X } from '@silo-feature/theme'
import { useOpenClose } from '@silo/util'
import { CloseIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Spinner } from 'native-x-spinner'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR, useTheme } from 'native-x-theme'
import React, { useCallback } from 'react'
import { StatusBar } from 'react-native'
import { RootStackParamList } from '../navigation/root-stack'
import QRCodeIcon from './qr-code-icon.svg'

export function ScanLoginModal({ navigation: { goBack } }: StackScreenProps<RootStackParamList>) {
  const { getColor } = useTheme()
  const { loading, signInWithToken, error: authError } = useAuth()
  const [error, showError, closeError] = useOpenClose()
  const closeModal = useCallback(() => goBack(), [goBack])
  const onScan = useCallback(
    (code: ScannedQRCode) => {
      switch (code.type) {
        case QRCodeType.AUTH:
          signInWithToken(code.id)
          break
        default:
          break
      }
    },
    [signInWithToken],
  )

  return (
    <Popup visible accentColor={COLOR.SECONDARY}>
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
            Scan login code from Silo
          </Text>
        </Stack>
        <Spacer />
        <Stack fill borderRadius='large' alignMiddle alignCenter>
          {loading ? (
            <Spinner size='large' color={COLOR.PRIMARY} />
          ) : (
            <CodeScanner onSuccess={onScan} onError={showError} />
          )}
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
      {authError || error ? (
        <ErrorPopup
          title='Sign-in Failed'
          error='The scanned code is not valid. Please try again.'
          onDismiss={closeError}
        />
      ) : null}
    </Popup>
  )
}
