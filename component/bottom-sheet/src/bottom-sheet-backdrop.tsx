import React, { useMemo } from 'react'
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated'

const DEFAULT_OPACITY = 0.3
const DEFAULT_APPEARS_ON_INDEX = 1
const DEFAULT_DISAPPEARS_ON_INDEX = 0

export const BottomSheetBackdrop = ({
  animatedIndex,
  opacity = DEFAULT_OPACITY,
  appearsOnIndex = DEFAULT_APPEARS_ON_INDEX,
  disappearsOnIndex = DEFAULT_DISAPPEARS_ON_INDEX,
  style,
  onClose,
}: any) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: '#000',
    opacity: interpolate(
      animatedIndex.value,
      [-1, disappearsOnIndex, appearsOnIndex],
      [0, 0, opacity],
      Extrapolate.CLAMP,
    ),
    flex: 1,
  }))

  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  )
  const gestureHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onFinish: () => {
        runOnJS(onClose)()
      },
    },
    [onClose],
  )

  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={containerStyle} />
    </TapGestureHandler>
  )
}
