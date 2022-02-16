import { COLOR_X } from '@silo-feature/theme'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Scanner from './scanner.svg'
const styles = {
  container: {
    borderRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute' as const,
    bottom: 0,
  },
  fabIcon: {
    top: -12,
    shadowColor: '##03002b',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
}

interface Props {
  onScanIconTap?: () => void
}
export function NavBar({ onScanIconTap }: Props) {
  const { bottom } = useSafeAreaInsets()
  return (
    <Stack
      border
      fillHorizontal
      backgroundColor={COLOR.PRIMARY}
      style={styles.container}
      overflowVisible
    >
      <Stack horizontal alignMiddle alignCenter overflowVisible padding='vertical:x-small'>
        <Tappable onTap={onScanIconTap}>
          <Stack
            alignCenter
            alignMiddle
            borderRadius='round'
            width={78}
            height={78}
            backgroundColor={COLOR_X.ACCENT1}
            overflowVisible
            style={styles.fabIcon}
          >
            <Scanner />
          </Stack>
        </Tappable>
      </Stack>
      <Stack height={bottom} fillHorizontal />
    </Stack>
  )
}
