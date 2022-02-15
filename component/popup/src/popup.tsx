import { useNavigation } from '@react-navigation/native'
import { COLOR_X } from '@silo-feature/theme'
import { COLOR, useTheme } from 'native-x-theme'
import React from 'react'
import { Modal, StatusBar } from 'react-native'
import { setBackgroundColor } from 'react-native-app-bg-color'

interface Props {
  visible?: boolean
  children?: any
  accentColor?: COLOR | COLOR_X
  onShow?: () => void
  onClose?: () => void
}

const backgroundColorStack: Array<COLOR | COLOR_X> = [COLOR.PRIMARY]

function ModalBackground({
  accentColor,
  children,
}: {
  accentColor?: COLOR | COLOR_X
  children: any
}) {
  const { getColor } = useTheme()
  React.useEffect(() => {
    if (!accentColor) {
      return
    }
    backgroundColorStack.push(accentColor)
    const hexColor = getColor?.(accentColor)
    hexColor && setBackgroundColor(hexColor)
    return () => {
      backgroundColorStack.pop()
      const prevHexColor = getColor?.(backgroundColorStack[backgroundColorStack.length - 1])
      prevHexColor && setBackgroundColor(prevHexColor)
    }
  }, [accentColor, getColor])

  return children
}

export function Popup({ visible, accentColor = COLOR.ACCENT, children, onClose, onShow }: Props) {
  const { goBack } = useNavigation<any>()
  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      interactiveDismissEnabled={true}
      onShow={onShow}
      onDismiss={onClose ?? goBack}
      onRequestClose={onClose ?? goBack}
    >
      <ModalBackground accentColor={accentColor}>
        <StatusBar barStyle='light-content' />
      </ModalBackground>
      {children}
    </Modal>
  )
}
