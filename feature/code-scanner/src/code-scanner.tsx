import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React, { useCallback } from 'react'
import { BarCodeReadEvent, RNCamera } from 'react-native-camera'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { parseQRCode, QRCodeType } from './parse-qrcode'

const REACTIVATE_ON_ERROR_TIMEOUT = 3000

const styles = {
  camera: {
    height: '100%',
    width: '100%',
    alignSelf: 'center' as const,
    justifyContent: 'center' as const,
  },
}

export interface ScannedQRCode {
  id: string
  type: QRCodeType
}

interface Props {
  onSuccess?: (code: ScannedQRCode) => void
  onError?: () => void
}

export function CodeScanner({ onSuccess, onError }: Props) {
  const handleOnRead = useCallback(
    (e: BarCodeReadEvent) => {
      const code = parseQRCode(e.data)
      if (code) {
        onSuccess?.(code)
      } else {
        onError?.()
      }
    },
    [onError, onSuccess],
  )

  return (
    <Stack backgroundColor={COLOR.DIVIDER} fill>
      <QRCodeScanner
        reactivate
        reactivateTimeout={REACTIVATE_ON_ERROR_TIMEOUT}
        flashMode={RNCamera.Constants.FlashMode.auto}
        cameraStyle={styles.camera}
        onRead={handleOnRead}
      />
    </Stack>
  )
}
