import { useNavigation } from '@react-navigation/native'
import { SearchIcon } from '@silo-component/icons'
import { Text } from '@silo-component/text'
import { TextInput } from '@silo-component/text-input'
import { TopSheet } from '@silo-component/top-sheet'
import { COLOR_X } from '@silo-feature/theme'
import { useOpenClose } from '@silo/util'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React, { useEffect } from 'react'
import { Modal } from 'react-native'
import { Screens } from '../navigation/screens'

export function SearchModal() {
  const [searchKey, setSearchKey] = React.useState<string>('')
  const [searchBy] = React.useState<string>('id')
  const [visible, open, close] = useOpenClose(true)
  const { navigate, goBack } = useNavigation<any>()
  const onSearchTap = () => {
    close()
    navigate({ name: Screens.Home, params: { [searchBy]: searchKey }, merge: true })
  }

  const onClose = () => {
    if (visible) {
      goBack()
    }
  }

  useEffect(() => {
    open()
  }, [open])

  return (
    <Modal visible transparent>
      <TopSheet visible={visible} onClose={onClose}>
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
              value={searchKey}
              onChangeText={setSearchKey}
              rightIcon={
                <Tappable onTap={onSearchTap}>
                  <SearchIcon color={searchKey.length > 0 ? COLOR.TERTIARY : COLOR.DISABLED} />
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
