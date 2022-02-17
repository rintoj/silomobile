import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React, { useCallback } from 'react'
import { BarCodeReadEvent, RNCamera } from 'react-native-camera'
import QRCodeScanner from 'react-native-qrcode-scanner'

const styles = {
  camera: {
    height: '100%',
    width: '100%',
    alignSelf: 'center' as const,
    justifyContent: 'center' as const,
  },
}

interface Props {
  onScanSuccess?: (data: string) => void
}

export function CodeScanner({ onScanSuccess }: Props) {
  const handleOnRead = useCallback(
    (e: BarCodeReadEvent) => {
      if (!e.data) {
        return
      }
      onScanSuccess?.(e.data)
    },
    [onScanSuccess],
  )

  return (
    <Stack backgroundColor={COLOR.DIVIDER} fill>
      <QRCodeScanner
        flashMode={RNCamera.Constants.FlashMode.auto}
        cameraStyle={styles.camera}
        onRead={handleOnRead}
      />
    </Stack>
  )
}
