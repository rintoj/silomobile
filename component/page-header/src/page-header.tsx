import { Text } from '@silo-component/text'
import { useNavigation } from '@react-navigation/native'
import { ChevronBackIcon, CloseIcon } from 'native-x-icon'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { HeaderButton } from './header-button'
import { Spacer } from 'native-x-spacer'
import { COLOR_X } from '@silo-feature/theme'

export interface PageHeaderProps {
  children?: string | React.ReactElement
  leftButton?: string | React.ReactElement
  leftButtonDisabled?: boolean
  onTapLeftButton?: () => void
  rightButton?: string | React.ReactElement
  rightButtonDisabled?: boolean
  rightButtonLoading?: boolean
  onTapRightButton?: () => void
  showBackButton?: boolean
  showCloseButton?: boolean
  accentColor?: COLOR | COLOR_X
}

export function PageHeader({
  accentColor,
  leftButton,
  rightButton,
  leftButtonDisabled,
  rightButtonDisabled,
  rightButtonLoading,
  onTapLeftButton,
  onTapRightButton,
  showBackButton,
  showCloseButton,
  children,
}: PageHeaderProps) {
  const { goBack } = useNavigation<any>()
  return (
    <Stack backgroundColor={accentColor}>
      <Spacer size='small' />
      <Spacer size='x-small' />
      <Stack horizontal alignCenter alignMiddle padding='normal'>
        <Stack width={80}>
          {showBackButton ? (
            <HeaderButton onTap={onTapLeftButton ?? goBack}>
              <ChevronBackIcon color={COLOR.PRIMARY} />
            </HeaderButton>
          ) : (
            <HeaderButton disabled={leftButtonDisabled} onTap={onTapLeftButton ?? goBack}>
              {leftButton}
            </HeaderButton>
          )}
        </Stack>
        <Stack fill overflowVisible>
          {typeof children === 'string' ? (
            <Text bold alignCenter textColor={COLOR.PRIMARY}>
              {children}
            </Text>
          ) : (
            children
          )}
        </Stack>
        <Stack width={80} alignRight>
          {showCloseButton ? (
            <HeaderButton onTap={onTapRightButton}>
              <CloseIcon color={COLOR.TERTIARY} />
            </HeaderButton>
          ) : (
            <HeaderButton
              disabled={rightButtonDisabled}
              loading={rightButtonLoading}
              onTap={onTapRightButton}
            >
              {rightButton}
            </HeaderButton>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
