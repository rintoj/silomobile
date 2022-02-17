import { useNavigation } from '@react-navigation/core'
import { Popup } from '@silo-component/popup'
import { Text } from '@silo-component/text'
import { CodeScanner } from '@silo-feature/code-scanner'
import { COLOR_X } from '@silo-feature/theme'
import { CloseIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR, useTheme } from 'native-x-theme'
import React, { useCallback } from 'react'
import { Linking, StatusBar } from 'react-native'
import { Screens } from '../navigation/screens'
import QRCodeIcon from './qr-code-icon.svg'

export function CodeScannerModal() {
  const { navigate } = useNavigation<any>()
  const { getColor } = useTheme()
  const closeModal = useCallback(() => navigate(Screens.Home), [navigate])
  const navigateToURL = useCallback(
    (url: string) => {
      Linking.openURL(url).catch(err => console.error('unable to open the url', err))
      closeModal()
    },
    [closeModal],
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
          <CodeScanner onScanSuccess={navigateToURL} />
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
    </Popup>
  )
}
