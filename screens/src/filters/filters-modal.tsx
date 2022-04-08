import { useNavigation } from '@react-navigation/native'
import { BottomSheet } from '@silo-component/bottom-sheet'
import { Text } from '@silo-component/text'
import { TextInput } from '@silo-component/text-input'
import { COLOR_X } from '@silo-feature/theme'
import { useOpenClose } from '@silo/util'
import { FilterIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React, { useEffect } from 'react'
import CalendarIcon from './calendar-icon.svg'
import LocationIcon from './location-icon.svg'
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
          <FilterIcon color={COLOR_X.ACCENT5} />
          <Spacer size='small' />
          <Text alignCenter textColor={COLOR_X.ACCENT5}>
            Select filters
          </Text>
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
