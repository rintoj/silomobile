import { Text } from '@silo-component/text'
import config from '@silo-feature/config'
import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { Dimensions, Linking, StyleSheet } from 'react-native'

const {
  app: { publicURL },
} = config

export function AppBanner() {
  const navigateToSiloWeb = () => Linking.openURL(publicURL)
  return (
    <Stack style={styles.wrapper}>
      <Stack backgroundColor={COLOR_X.ACCENT3} style={styles.banner} />
      <Stack fillHorizontal padding='large' style={styles.bannerText}>
        <Spacer />
        <Text fill lineHeight='solid' textColor={COLOR.PRIMARY} alignCenter>
          The world’s first adaptive food platform is here for a more connected, efficient food
          service.
        </Text>
        <Spacer size='small' />
        <Spacer size='x-small' />
        <Text textColor={COLOR.PRIMARY} alignCenter>
          Not in Silo yet?{' '}
          <Text bold onPress={navigateToSiloWeb}>
            Learn more here
          </Text>
        </Text>
        <Spacer size='small' />
      </Stack>
    </Stack>
  )
}

const { width, height } = Dimensions.get('screen')
const BANNER_HEIGHT = 250
const styles = StyleSheet.create({
  wrapper: {
    height: BANNER_HEIGHT,
    position: 'absolute',
    top: height - BANNER_HEIGHT,
    width,
  },
  bannerText: { top: 0, position: 'absolute' },
  banner: {
    borderTopLeftRadius: BANNER_HEIGHT,
    borderTopRightRadius: BANNER_HEIGHT,
    height: BANNER_HEIGHT,
    position: 'absolute',
    top: 0,
    transform: [{ scaleX: 2.0 }],
    width,
  },
})
