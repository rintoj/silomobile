import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler'

interface Props {
  visible?: boolean
  children?: React.ReactNode
  onClose?: () => void
}

const HEADER_HEIGHT = 20
const CONTAINER_HEIGHT = 220
const styles = StyleSheet.create({
  backdrop: { backgroundColor: '#00000030' },
  contentContainer: {
    height: CONTAINER_HEIGHT - HEADER_HEIGHT,
  },
  container: {
    backgroundColor: '#EFF2F7',
    borderRadius: 16,
    height: CONTAINER_HEIGHT,
  },
  header: {
    width: '100%',
    height: HEADER_HEIGHT,
    paddingBottom: 16,
    justifyContent: 'center',
  },
  handle: {
    width: 76,
    height: 6,
    borderRadius: 50,
    backgroundColor: '#C1C9DA',
    alignSelf: 'center',
  },
  scrollView: {
    backgroundColor: 'blue',
  },
})

const SNAP_POINTS_FROM_TOP = [-CONTAINER_HEIGHT, 0]
const START = SNAP_POINTS_FROM_TOP[0]
const END = SNAP_POINTS_FROM_TOP[SNAP_POINTS_FROM_TOP.length - 1]

export function TopSheet({ visible, children, onClose }: Props) {
  const drawer = React.createRef()
  const drawerHeaderRef = React.createRef()
  const scrollRef = React.createRef()
  const [lastScrollYValue, setLastScrollValue] = React.useState(0)
  const [lastSnap, setLastSnap] = React.useState(0)
  const lastScrollY = new Animated.Value(0)
  const reverseLastScrollY = Animated.multiply(new Animated.Value(-1), lastScrollY)
  const [dragY] = React.useState(new Animated.Value(0))
  const [translateYOffset] = React.useState(new Animated.Value(START))
  lastScrollY.addListener(({ value }) => {
    setLastScrollValue(value)
  })

  const onGestureEvent = Animated.event([{ nativeEvent: { translationY: dragY } }], {
    useNativeDriver: true,
  })
  const translateY = Animated.add(
    translateYOffset,
    Animated.add(dragY, reverseLastScrollY),
  ).interpolate({
    inputRange: [START, END],
    outputRange: [START, END],
    extrapolate: 'clamp',
  })

  const onHeaderHandlerStateChange = ({
    nativeEvent,
  }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (nativeEvent.oldState === State.BEGAN) {
      lastScrollY.setValue(0)
    }
    onHandlerStateChange({ nativeEvent })
  }
  const onHandlerStateChange = ({
    nativeEvent,
  }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let { velocityY, translationY } = nativeEvent
      translationY -= lastScrollYValue
      const dragToss = 0.05
      const endOffsetY = lastSnap + translationY + dragToss * velocityY
      let destSnapPoint = SNAP_POINTS_FROM_TOP[0]
      for (let i = 0; i < SNAP_POINTS_FROM_TOP.length; i++) {
        const snapPoint = SNAP_POINTS_FROM_TOP[i]
        const distFromSnap = Math.abs(snapPoint - endOffsetY)
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint
        }
      }
      setLastSnap(destSnapPoint)
      translateYOffset.extractOffset()
      translateYOffset.setValue(translationY)
      translateYOffset.flattenOffset()
      dragY.setValue(0)
      Animated.spring(translateYOffset, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: true,
      }).start(() => {
        if (destSnapPoint === SNAP_POINTS_FROM_TOP[0]) {
          onClose?.()
        }
      })
    }
  }

  const collapse = React.useCallback(() => {
    let destSnapPoint = SNAP_POINTS_FROM_TOP[0]
    setLastSnap(destSnapPoint)
    translateYOffset.extractOffset()
    translateYOffset.setValue(0)
    translateYOffset.flattenOffset()
    dragY.setValue(0)
    Animated.timing(translateYOffset, {
      duration: 250,
      toValue: destSnapPoint,
      useNativeDriver: true,
    }).start(onClose)
  }, [dragY, onClose, translateYOffset])

  const expand = React.useCallback(() => {
    let destSnapPoint = SNAP_POINTS_FROM_TOP[1]
    setLastSnap(destSnapPoint)
    translateYOffset.extractOffset()
    translateYOffset.setValue(0)
    translateYOffset.flattenOffset()
    dragY.setValue(0)
    Animated.spring(translateYOffset, {
      velocity: 150,
      tension: 68,
      friction: 12,
      toValue: destSnapPoint,
      useNativeDriver: true,
    }).start()
  }, [dragY, translateYOffset])

  React.useEffect(() => {
    if (visible) {
      expand()
    } else {
      collapse()
    }
  }, [collapse, expand, visible])

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.backdrop]}>
      <View style={[StyleSheet.absoluteFill, {}]} onTouchStart={collapse} />
      <Animated.View
        ref={scrollRef}
        style={[
          styles.container,
          {
            transform: [{ translateY: translateY }],
          },
        ]}
      >
        <PanGestureHandler
          ref={drawer}
          shouldCancelWhenOutside={false}
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View style={styles.contentContainer}>{children}</Animated.View>
        </PanGestureHandler>
        <PanGestureHandler
          ref={drawerHeaderRef}
          shouldCancelWhenOutside={false}
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHeaderHandlerStateChange}
        >
          <Animated.View style={styles.header}>
            <View style={styles.handle} />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </View>
  )
}
