import { CalendarIcon } from '@silo-component/icons'
import { Text } from '@silo-component/text'
import { useOpenClose } from '@silo/util'
import { format } from 'date-fns'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React from 'react'
import RNDatePicker from 'react-native-date-picker'

const styles = {
  container: {
    width: '100%',
  },
}

interface Props {
  value: Date
  onChange: (value: Date) => void
}

export function DatePicker({ value, onChange }: Props) {
  const [isOpen, open, close] = useOpenClose()
  const onConfirm = React.useCallback(
    (date: Date) => {
      onChange(date)
      close()
    },
    [close, onChange],
  )

  return (
    <Stack fillHorizontal>
      <Tappable onTap={open} style={styles.container}>
        <Stack
          horizontal
          fillHorizontal
          border
          borderColor={COLOR.ACCENT}
          backgroundColor={COLOR.DIVIDER}
          borderRadius='normal'
          padding={['horizontal:normal', 'vertical:normal']}
        >
          <Stack fill>
            <Text fill>{format(value, 'MM-dd-yyyy')}</Text>
          </Stack>
          <Stack>
            <CalendarIcon />
          </Stack>
        </Stack>
      </Tappable>
      <RNDatePicker
        date={value}
        modal
        mode='date'
        maximumDate={new Date()}
        open={isOpen}
        onConfirm={onConfirm}
        onCancel={close}
      />
    </Stack>
  )
}
