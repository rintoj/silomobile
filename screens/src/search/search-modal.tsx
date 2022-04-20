import { RouteProp, useRoute } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import { SearchIcon } from '@silo-component/icons'
import { Picker } from '@silo-component/picker'
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
import { Modals } from '../navigation/modals'
import { Screens } from '../navigation/screens'

type SearchModalParamList = {
  [Modals.Search]: {
    target?: Screens
  }
}

export function SearchModal() {
  const { params } = useRoute<RouteProp<SearchModalParamList>>()
  const [searchKey, setSearchKey] = React.useState<string>('')
  const [searchBy, setSearchBy] = React.useState<string>('id')
  const [visible, open, close] = useOpenClose(true)
  const { navigate, goBack } = useNavigation<any>()
  const searchFields = React.useMemo(
    () => [
      {
        label: 'Order number',
        value: 'id',
      },
      {
        label: 'Purchase order number',
        value: 'purchaseOrderNumber',
      },
      {
        label: 'Invoice number',
        value: 'invoiceNumber',
      },
    ],
    [],
  )
  const onSearchTap = () => {
    close()
    if (params.target) {
      navigate({ name: params.target, params: { [searchBy]: searchKey }, merge: true })
    }
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
          <Spacer />
          <Stack
            fillHorizontal
            border
            height={48}
            alignMiddle
            borderColor={COLOR.TERTIARY}
            backgroundColor={COLOR.DIVIDER}
            borderRadius='large'
            padding='horizontal:normal'
          >
            <Picker value={searchBy} onChange={setSearchBy} items={searchFields} />
          </Stack>
          <Spacer />
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
              height={44}
              padding='none'
              placeholder='Type order #'
              autoFocus
              placeholderColor={COLOR.TERTIARY}
              borderColor={COLOR.ACCENT}
              backgroundColor={COLOR.DIVIDER}
              value={searchKey}
              onChangeText={setSearchKey}
              returnKeyType='search'
              onSubmitEditing={onSearchTap}
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
