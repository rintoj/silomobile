import { COLOR, useTheme } from 'native-x-theme'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select'

type PickerItem = {
  label: string
  value: string | number
}

interface Props {
  value?: string | number
  placeholder?: string
  items: PickerItem[]
  onChange: (value: any | number, index: number) => void
}

export function Picker({ value, items, onChange, placeholder }: Props) {
  const { getColor } = useTheme()
  const fontStyles = React.useMemo(
    () => ({ fontFamily: 'DM Sans', color: getColor(COLOR.SECONDARY) }),
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

  return (
    <RNPickerSelect
      value={value}
      key='value'
      placeholder={placeholder}
      useNativeAndroidPickerStyle={false}
      onValueChange={onChange}
      items={items}
      style={pickerStyle}
    />
  )
}
