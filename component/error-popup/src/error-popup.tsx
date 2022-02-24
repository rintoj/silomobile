import { Button } from '@silo-component/button'
import { Text } from '@silo-component/text'
import { useOpenClose } from '@silo/util'
import { Modal } from 'native-x-modal'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR, THEME, useTheme } from 'native-x-theme'
import React, { useCallback, useEffect } from 'react'
import { Dimensions } from 'react-native'

type Props = {
  title?: string
  error?: Error | string | null
  onDismiss?: () => void
}

const { width } = Dimensions.get('screen')

export function ErrorPopup({ title = '', error, onDismiss }: Props) {
  const [isVisible, showModal, closeModal] = useOpenClose()
  const { themeName } = useTheme()
  const message = error instanceof Error ? error.message : error

  useEffect(() => {
    if (message?.trim()) {
      showModal()
    }
  }, [error, message, showModal])

  const handleOnDismiss = useCallback(() => {
    closeModal()
    onDismiss?.()
  }, [closeModal, onDismiss])

  return (
    <Modal visible={isVisible} onClose={closeModal}>
      <Stack alignCenter maxWidth={768} minWidth={width * 0.9} padding='large'>
        <Text fontSize='x-large' semiBold fill alignCenter>
          {title}
        </Text>
        {title ? <Spacer size='small' /> : null}

        <Text textColor={COLOR.SECONDARY} alignCenter>
          {message?.trim()}
        </Text>

        <Spacer size='normal' />
        <Button
          size='small'
          fontSize='normal'
          rounded
          textColor={themeName === THEME.LIGHT ? COLOR.PRIMARY : COLOR.SECONDARY}
          onTap={handleOnDismiss}
        >
          Got it!
        </Button>
      </Stack>
    </Modal>
  )
}
