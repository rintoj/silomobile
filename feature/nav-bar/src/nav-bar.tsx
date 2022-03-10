import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { COLOR_X } from '@silo-feature/theme'
import { Modals, Screens } from '@silo/screens'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import IncomingIcon from './icons/incoming.svg'
import InventoryIcon from './icons/inventory.svg'
import NetworkIcon from './icons/network.svg'
import OutgoingIcon from './icons/outgoing.svg'
import { NavBarItem } from './navbar-item'
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

export function NavBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const focusedOptions = descriptors[state?.routes[state.index]?.key]?.options
  const onNavBarItemPress = (screenName: string) => {
    const isActive = state.index === state.routeNames.indexOf(screenName)
    const route = state.routes.find(({ name }) => name === screenName) as any
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })
    if (!isActive && !event.defaultPrevented) {
      navigation.navigate(screenName)
    }
  }

  // Hide tabBar if display style is set as none for any screens
  if ((focusedOptions.tabBarStyle as any)?.display === 'none') {
    return null
  }

  return (
    <Stack fillHorizontal backgroundColor={COLOR.PRIMARY} style={styles.container} overflowVisible>
      <SafeAreaView edges={['bottom']}>
        <Stack
          horizontal
          alignMiddle
          alignCenter
          overflowVisible
          padding={['vertical:x-small', 'horizontal:normal']}
          justifyBetween
        >
          <NavBarItem name={Screens.HomeTab} state={state} onTap={onNavBarItemPress}>
            <IncomingIcon />
          </NavBarItem>
          <NavBarItem name={Screens.OutgoingOrdersTab} state={state} onTap={onNavBarItemPress}>
            <OutgoingIcon />
          </NavBarItem>
          <Spacer size='x-small' />
          <Tappable data={Modals.CodeScanner} onTap={onNavBarItemPress}>
            <Stack
              alignCenter
              alignMiddle
              borderRadius='round'
              width={84}
              height={84}
              backgroundColor={COLOR_X.ACCENT1}
              overflowVisible
              style={styles.fabIcon}
            >
              <Scanner />
            </Stack>
          </Tappable>
          <Spacer size='x-small' />
          <NavBarItem name={Screens.InventoryTab} state={state} onTap={onNavBarItemPress}>
            <InventoryIcon />
          </NavBarItem>
          <NavBarItem name={Screens.NetworkingTab} state={state} onTap={onNavBarItemPress}>
            <NetworkIcon />
          </NavBarItem>
        </Stack>
      </SafeAreaView>
    </Stack>
  )
}
