import { FormChildProp } from 'native-x-form'
import {
  COLOR,
  ContainerStyleProps,
  TextStyleProps,
  useContainerStyle,
  useTextStyle,
  useTheme,
} from 'native-x-theme'
import React, { ReactNode } from 'react'
import {
  Platform,
  Text,
  TextInput as GenericTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native'
import { TextInput as TextInputWithGestureSupport } from 'react-native-gesture-handler'
import { styles as s } from 'tachyons-react-native'
const styles = {
  spacer: { padding: 4 },
  input: [s.flex, { paddingVertical: 12 }, s.f5, Platform.select({ web: { outline: 0 } })],
  outerContainer: [s.pv1],
  innerContainer: [s.ba, s.flexRow, s.pv0, s.itemsCenter],
  icon: [s.justifyCenter, s.itemsCenter, s.pl2],
}

// Use TextInput with gesture support on native platform
const RNTextInput = Platform.OS === 'web' ? GenericTextInput : TextInputWithGestureSupport

export interface TextInputProps
  extends Omit<RNTextInputProps, 'onChange' | 'onBlur'>,
    ContainerStyleProps,
    TextStyleProps,
    FormChildProp<string> {
  width?: number
  height?: number
  label?: string
  labelColor?: string
  rounded?: boolean
  error?: string | Error | null
  disabled?: boolean
  password?: boolean
  icon?: ReactNode
  rightIcon?: ReactNode
  fill?: boolean
  style?: any
  errorColor?: string
  placeholderColor?: string
  onBlur?: (args?: any) => void
}

function TextInputComponent(props: TextInputProps, ref?: React.Ref<any>) {
  const {
    width,
    height,
    style,
    value,
    icon,
    rightIcon,
    label,
    onChangeText,
    rounded = false,
    disabled,
    borderColor,
    error,
    password,
    fill = true,
    labelColor = COLOR.SECONDARY,
    padding = 'small',
    onBlur,
    ...textInputProps
  } = props
  const isEmpty = value == null || value === ''
  const backgroundColor = props.backgroundColor
    ? props.backgroundColor
    : disabled
    ? COLOR.DISABLED
    : COLOR.INPUT
  const hasError = error != null
  const errorColorName = props.errorColor || COLOR.ERROR
  const textColor =
    hasError && !isEmpty
      ? errorColorName
      : disabled
      ? COLOR.TERTIARY
      : textInputProps.textColor ?? COLOR.SECONDARY

  const inputBorderColor = hasError ? errorColorName : borderColor ? borderColor : COLOR.TERTIARY
  const { getColor, getTextColor } = useTheme()
  const containerStyle = useContainerStyle({
    ...props,
    backgroundColor,
    borderColor: inputBorderColor,
    padding,
  })
  const textContainerInputStyle = useContainerStyle({ padding })
  const textInputStyle = [...useTextStyle({ textColor }), { fontFamily: 'DM Sans' }]
  const transparentColor = getColor?.(COLOR.TRANSPARENT)
  const labelColorStyle = getTextColor?.(labelColor)
  const placeholderColor = getColor?.(props.placeholderColor || COLOR.DIVIDER)
  const errorColor = getTextColor?.(errorColorName)
  const fillStyle: any = fill ? Platform.select({ web: { flex: 'auto' } }) : undefined
  const content = (
    <View style={[styles.outerContainer, fillStyle]}>
      <View
        style={[
          rounded ? s.brPill : s.br3,
          fill ? s.flexAuto : undefined,
          width ? { width } : undefined,
          height ? { height } : undefined,
          styles.innerContainer,
          props.multiline ? [s.itemsStart, s.pv2] : [s.itemsCenter],
          containerStyle,
        ]}
      >
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <RNTextInput
          {...(textInputProps as RNTextInputProps)}
          ref={ref}
          value={value}
          editable={!disabled}
          secureTextEntry={password}
          placeholderTextColor={placeholderColor}
          underlineColorAndroid={transparentColor}
          style={[textInputStyle, textContainerInputStyle, styles.input, ...(style || [])]}
          onChangeText={onChangeText as any}
          onBlur={onBlur}
        />
        {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
      </View>
      {!!error && (
        <>
          <View style={styles.spacer} />
          <Text style={errorColor}>{typeof error === 'string' ? error : error?.message}</Text>
        </>
      )}
    </View>
  )

  if (label) {
    return (
      <View style={[styles.outerContainer, fillStyle]}>
        <Text style={[labelColorStyle, s.f5]}>{label}</Text>
        <View style={styles.spacer} />
        {content}
      </View>
    )
  }

  return content
}

export const TextInput = React.forwardRef(TextInputComponent)
