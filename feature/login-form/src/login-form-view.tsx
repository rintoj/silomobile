import { Button } from '@silo-component/button'
import { Text } from '@silo-component/text'
import { TextInput } from '@silo-component/text-input'
import { COLOR_X } from '@silo-feature/theme'
import { ArrowForwardIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'

interface Props {
  onSubmit?: () => void
}

export function LoginFormView({ onSubmit }: Props) {
  return (
    <Stack fill padding='large'>
      <Text textColor={COLOR.PRIMARY}>Email</Text>
      <TextInput
        fill
        placeholder='john@doe.com'
        placeholderColor={COLOR_X.PLACEHOLDER}
        backgroundColor={COLOR_X.ACCENT2}
        textColor={COLOR.PRIMARY}
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <Spacer />
      <Text textColor={COLOR.PRIMARY}>Password</Text>
      <TextInput
        fill
        password
        placeholder='password'
        placeholderColor={COLOR_X.PLACEHOLDER}
        backgroundColor={COLOR_X.ACCENT2}
        textColor={COLOR.PRIMARY}
        keyboardType='ascii-capable'
      />
      <Spacer />
      <Stack fillHorizontal alignRight>
        <Button
          width={125}
          rightIcon={<ArrowForwardIcon color={COLOR.PRIMARY} />}
          size='small'
          onTap={onSubmit}
        >
          Login
        </Button>
      </Stack>
    </Stack>
  )
}
