import { useNavigation } from '@react-navigation/native'
import { BottomSheet } from '@silo-component/bottom-sheet'
import { Button } from '@silo-component/button'
import { DatePicker } from '@silo-component/date-picker'
import { FilterIcon } from '@silo-component/icons'
import { Picker } from '@silo-component/picker'
import { Text } from '@silo-component/text'
import { COLOR_X } from '@silo-feature/theme'
import { useOpenClose } from '@silo/util'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React, { useEffect } from 'react'
import { Screens } from '../navigation/screens'
import { useLocationsQuery } from './use-locations-query'

const ONE_MONTH_AGO = new Date(Date.now() - 60 * 60 * 24 * 30 * 1000)
const TODAY = new Date()

export function FiltersModal() {
  const [visible, open] = useOpenClose(true)
  const { navigate, goBack } = useNavigation<any>()
  const { data } = useLocationsQuery()
  const [locationId, setLocationId] = React.useState()
  const [startDate, setStartDate] = React.useState(ONE_MONTH_AGO)
  const [endDate, setEndDate] = React.useState(TODAY)

  const locations =
    data?.map(item => ({
      value: item.id,
      label: item.name,
    })) ?? []

  const onTapFilterResults = React.useCallback(() => {
    navigate({
      name: Screens.Home,
      params: { startDate: startDate.toISOString(), endDate: endDate.toISOString(), locationId },
      merge: true,
    })
  }, [endDate, locationId, navigate, startDate])

  useEffect(() => {
    open()
  }, [open])

  return (
    <BottomSheet visible={visible} onClose={goBack} snapPoints={[550]}>
      <Stack fill padding='horizontal:large' alignLeft minHeight={550}>
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
          Fulfillment start date
        </Text>
        <Spacer size='x-small' />
        <DatePicker value={startDate} onChange={setStartDate} />
        <Spacer size='small' />
        <Text alignCenter textColor={COLOR_X.ACCENT5}>
          Fulfillment end date
        </Text>
        <Spacer size='x-small' />
        <DatePicker value={endDate} onChange={setEndDate} />
        <Spacer size='small' />
        <Text alignCenter textColor={COLOR_X.ACCENT5}>
          Location
        </Text>
        <Spacer size='x-small' />
        <Stack
          fillHorizontal
          border
          height={44}
          alignMiddle
          borderColor={COLOR.ACCENT}
          backgroundColor={COLOR.DIVIDER}
          borderRadius='normal'
          padding='horizontal:normal'
        >
          <Picker
            items={locations}
            value={locationId}
            onChange={setLocationId}
            placeholder='Select a location'
          />
        </Stack>
        <Spacer />
        <Stack fillHorizontal>
          <Button height={48} rounded={false} onTap={onTapFilterResults}>
            Filter results
          </Button>
        </Stack>
      </Stack>
    </BottomSheet>
  )
}
