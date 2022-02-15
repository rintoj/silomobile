import { COLOR_X } from '@silo-feature/theme'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import Scanner from './scanner.svg'
import { Tappable } from 'native-x-tappable'

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
  },
  fabIcon: { top: -20 },
}

interface Props {
  onScanIconTap?: () => void
}
export function NavBar({ onScanIconTap }: Props) {
  return (
    <Stack
      border
      fillHorizontal
      backgroundColor={COLOR.PRIMARY}
      style={styles.container}
      overflowVisible
    >
      <Stack horizontal alignMiddle alignCenter overflowVisible>
        <Tappable onTap={onScanIconTap}>
          <Stack
            alignCenter
            alignMiddle
            borderRadius='round'
            width={78}
            height={78}
            backgroundColor={COLOR_X.ACCENT1}
            style={styles.fabIcon}
          >
            <Scanner />
          </Stack>
        </Tappable>
      </Stack>
      <Spacer size='small' />
    </Stack>
  )
}
