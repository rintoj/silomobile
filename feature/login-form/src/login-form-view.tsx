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
  loading?: boolean
  onSubmit?: (email: string, password: string) => void
}
export function LoginFormView({ loading, onSubmit }: Props) {
  // TODO: Use forms for validating fields
  const [email, setEmail] = React.useState<string>()
  const [password, setPassword] = React.useState<string>()
  const onSubmitTap = () => {
    if (email?.length && password?.length) {
      onSubmit?.(email, password)
    }
  }

  return (
    <Stack fill padding='large'>
      <Text textColor={COLOR.PRIMARY}>Email</Text>
      <TextInput
        autoCapitalize='none'
        backgroundColor={COLOR_X.ACCENT2}
        disabled={loading}
        fill
        keyboardType='email-address'
        onChangeText={setEmail}
        placeholder='john@doe.com'
        placeholderColor={COLOR_X.PLACEHOLDER}
        textColor={COLOR.PRIMARY}
        value={email}
      />
      <Spacer />
      <Text textColor={COLOR.PRIMARY}>Password</Text>
      <TextInput
        backgroundColor={COLOR_X.ACCENT2}
        disabled={loading}
        fill
        keyboardType='ascii-capable'
        onChangeText={setPassword}
        password
        placeholder='password'
        placeholderColor={COLOR_X.PLACEHOLDER}
        textColor={COLOR.PRIMARY}
        value={password}
      />
      <Spacer />
      <Stack fillHorizontal alignRight>
        <Button
          loading={loading}
          width={125}
          rightIcon={<ArrowForwardIcon color={COLOR.PRIMARY} />}
          size='small'
          onTap={onSubmitTap}
        >
          Login
        </Button>
      </Stack>
    </Stack>
  )
}
