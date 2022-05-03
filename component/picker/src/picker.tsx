import { COLOR, useTheme } from 'native-x-theme'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { Spacer } from 'native-x-spacer'
import { Text } from '@silo-component/text'
import { Stack } from 'native-x-stack'

type PickerItem = {
  label: string
  value: string | number | boolean
}

interface Props {
  value?: string | number | boolean
  error?: string | Error
  placeholder?: string
  items: PickerItem[]
  onChange?: (value: any | number, index: number) => void
}

export function Picker({ value, items, error, onChange, placeholder }: Props) {
  const { getColor } = useTheme()
  const placeholderValue = React.useMemo(() => ({ label: placeholder, value: null }), [placeholder])
  const fontStyles = React.useMemo(
    () => ({ fontSize: 16, fontFamily: 'DM Sans', color: getColor(COLOR.SECONDARY) }),
    [getColor],
  )
  const pickerStyle = React.useMemo(
    () => ({
      inputIOS: fontStyles,
      inputAndroid: fontStyles,
      placeholder: {
        ...fontStyles,
        color: getColor(COLOR.TERTIARY),
      },
    }),
    [fontStyles, getColor],
  )

  const onValueChange = (_value: any, index: number) => {
    onChange?.(_value, index)
  }

  return (
    <>
      <Stack
        fillHorizontal
        border
        height={48}
        alignMiddle
        borderColor={error ? COLOR.ERROR : COLOR.TERTIARY}
        backgroundColor={COLOR.DIVIDER}
        borderRadius='normal'
        padding='horizontal:normal'
      >
        <RNPickerSelect
          value={value}
          placeholder={placeholderValue}
          useNativeAndroidPickerStyle={false}
          textInputProps={{}}
          onValueChange={onValueChange}
          items={items}
          style={pickerStyle}
        />
      </Stack>
      {!!error && (
        <Stack>
          <Spacer size='x-small' />
          <Text textColor={COLOR.ERROR}>{typeof error === 'string' ? error : error?.message}</Text>
        </Stack>
      )}
    </>
  )
}
