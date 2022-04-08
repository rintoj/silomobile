import { useNavigation } from '@react-navigation/native'
import { Text } from '@silo-component/text'
import { TextInput } from '@silo-component/text-input'
import { TopSheet } from '@silo-component/top-sheet'
import { COLOR_X } from '@silo-feature/theme'
import { useOpenClose } from '@silo/util'
import { SearchIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React, { useEffect } from 'react'
import { Modal } from 'react-native'

export function SearchModal() {
  const [visible, open, close] = useOpenClose(true)
  const { goBack } = useNavigation()
  const onSearchTap = () => {
    close()
  }

  useEffect(() => {
    open()
  }, [open])

  return (
    <Modal visible transparent>
      <TopSheet visible={visible} onClose={goBack}>
        <Stack fill padding='normal' backgroundColor={COLOR_X.PAGE}>
          <Spacer fill />
          <Text alignCenter>Search by order, invoice, or PO ID</Text>
          <Spacer size='small' />
          <Stack
            fillHorizontal
            border
            borderColor={COLOR.ACCENT}
            backgroundColor={COLOR.DIVIDER}
            borderRadius='large'
            padding='horizontal:normal'
          >
            <TextInput
              fill
              padding='none'
              placeholder='Type order #'
              placeholderColor={COLOR.TERTIARY}
              borderColor={COLOR.ACCENT}
              backgroundColor={COLOR.DIVIDER}
              rightIcon={
                <Tappable onTap={onSearchTap}>
                  <SearchIcon color={COLOR.TERTIARY} />
                </Tappable>
              }
            />
          </Stack>
          <Spacer size='small' />
        </Stack>
      </TopSheet>
    </Modal>
  )
}
