import { BackgroundColorStyleProps, COLOR, useContainerStyle } from 'native-x-theme'
import React, { ReactNode, useMemo } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { styles as s } from 'tachyons-react-native'

export interface ScreenProps extends BackgroundColorStyleProps {
  header?: ReactNode
  scrollable?: boolean
  withSafeArea?: boolean
  children: ReactNode | ReactNode[]
}

const styles = {
  container: [s.flex, s.w100, s.h100],
  content: [s.flex, s.w100, s.h100, { flexGrow: 1 }],
  spacer: [s.pa1],
}

export function Screen({
  header,
  scrollable,
  children,
  withSafeArea = true,
  backgroundColor = COLOR.PRIMARY,
}: ScreenProps) {
  const screenStyle = useContainerStyle({ backgroundColor })
  const containerStyle = useMemo(() => {
    return [...styles.container, screenStyle]
  }, [screenStyle])

  const content = withSafeArea ? (
    <SafeAreaView style={containerStyle}>{children}</SafeAreaView>
  ) : (
    children
  )

  return (
    <View style={containerStyle}>
      {header && <View style={styles.spacer} />}
      {header}
      {scrollable ? <ScrollView style={containerStyle}>{content}</ScrollView> : content}
    </View>
  )
}
