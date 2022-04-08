import { useNavigation } from '@react-navigation/native'
import { BottomSheet, BottomSheetTextInput as TextInput } from '@silo-component/bottom-sheet'
import { CalendarIcon, FilterIcon, LocationIcon } from '@silo-component/icons'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { useOpenClose } from '@silo/util'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React, { useEffect } from 'react'

export function FiltersModal() {
  const [visible, open] = useOpenClose(true)
  const { goBack } = useNavigation()

  useEffect(() => {
    open()
  }, [open])

  return (
    <BottomSheet visible={visible} onClose={goBack} snapPoints={[420]}>
      <Stack fill padding='horizontal:large' alignLeft>
        <Spacer />
        <Stack horizontal alignCenter fillHorizontal>
          <FilterIcon />
          <Spacer size='small' />
          <Text semiBold alignCenter textColor={COLOR_X.ACCENT5}>
            Select filters
          </Text>
          <Spacer size='small' />
        </Stack>
        <Spacer />

        <Text alignCenter textColor={COLOR_X.ACCENT5}>
          Fulfillment date
        </Text>
        <Spacer size='x-small' />
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
            placeholder='Select date range'
            placeholderColor={COLOR.TERTIARY}
            borderColor={COLOR.ACCENT}
            backgroundColor={COLOR.DIVIDER}
            rightIcon={<CalendarIcon />}
          />
        </Stack>
        <Spacer />
        <Text alignCenter textColor={COLOR_X.ACCENT5}>
          Location
        </Text>
        <Spacer size='x-small' />
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
            placeholder='Filter by location'
            placeholderColor={COLOR.TERTIARY}
            borderColor={COLOR.ACCENT}
            backgroundColor={COLOR.DIVIDER}
            rightIcon={<LocationIcon />}
          />
        </Stack>
      </Stack>
    </BottomSheet>
  )
}
