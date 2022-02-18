import { COLOR, TextStyleProps, useTextStyle } from 'native-x-theme'
import React, { ReactElement, ReactText, useMemo } from 'react'
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native'
import { styles as s } from 'tachyons-react-native'

type TextType = ReactText | ReactElement<Text> | boolean | null | undefined

const FONT_SIZE = {
  'xxx-small': {
    fontSize: 10,
    lineHeight: 15,
  },
  'xx-small': {
    fontSize: 12,
    lineHeight: 16,
  },
  'x-small': {
    fontSize: 14,
    lineHeight: 19,
  },
  small: {
    fontSize: 15,
    lineHeight: 20,
  },
  normal: {
    fontSize: 16,
    lineHeight: 21,
  },
  large: {
    fontSize: 18,
    lineHeight: 24,
  },
  'x-large': {
    fontSize: 20,
    lineHeight: 26,
  },
  'xx-large': {
    fontSize: 24,
    lineHeight: 32,
  },
  'xxx-large': {
    fontSize: 28,
    lineHeight: 37,
  },
}

export interface TextProps extends Pick<RNTextProps, 'onLayout'>, TextStyleProps {
  fill?: boolean
  bold?: boolean
  semiBold?: boolean
  italic?: boolean
  thin?: boolean
  alignLeft?: boolean
  alignCenter?: boolean
  alignRight?: boolean
  children?: TextType | Array<TextType>
  upperCase?: boolean
  style?: StyleProp<TextStyle>
  numberOfLines?: number
  onPress?: () => void
}

const TextAncestorStyleContext = React.createContext<TextStyle[]>([])

export function Text(props: TextProps) {
  const {
    style,
    alignCenter,
    alignRight,
    fill,
    bold,
    semiBold,
    thin,
    italic,
    upperCase,
    children,
    onPress,
    numberOfLines,
    onLayout,
    fontSize,
    textColor,
  } = props

  const defaultStyle = useTextStyle({ fontSize: 'normal', textColor: COLOR.SECONDARY })
  const textAncestorStyle = React.useContext(TextAncestorStyleContext)
  const textStyle = useTextStyle({ ...props, fontSize, textColor })

  const composedStyle = useMemo(
    () => [
      defaultStyle,
      textAncestorStyle,
      alignCenter ? s.tc : alignRight ? s.tr : s.tl,
      fill && s.w100,
      upperCase && { textTransform: 'uppercase' },
      bold && s.b,
      semiBold && s.fw5,
      thin && s.fw2,
      italic && s.i,
      textStyle,
      { fontFamily: 'DM Sans' },
      fontSize ? FONT_SIZE[fontSize] : {},
      style,
    ],
    [
      defaultStyle,
      textAncestorStyle,
      alignCenter,
      alignRight,
      fill,
      upperCase,
      bold,
      semiBold,
      thin,
      italic,
      textStyle,
      fontSize,
      style,
    ],
  ) as TextStyle[]

  if (props.children == null) {
    return null
  }
  return (
    <TextAncestorStyleContext.Provider value={composedStyle}>
      <RNText
        allowFontScaling={false}
        style={composedStyle as never}
        onPress={onPress}
        numberOfLines={numberOfLines}
        onLayout={onLayout}
      >
        {children}
      </RNText>
    </TextAncestorStyleContext.Provider>
  )
}
