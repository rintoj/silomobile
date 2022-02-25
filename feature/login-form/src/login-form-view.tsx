import { Button } from '@silo-component/button'
import { Form } from '@silo-component/form'
import { Text } from '@silo-component/text'
import { ArrowForwardIcon } from 'native-x-icon'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React, { useCallback } from 'react'
import { ErrorPopup } from '../../../component/error-popup/src'
import { EmailFormItem } from './email-form-item'
import { PasswordFormItem } from './password-form-item'

interface FormData {
  email: string
  password: string
}

interface Props {
  loading?: boolean
  error?: Error | null
  onSubmit?: (email: string, password: string) => void
}

const formState: FormData = {
  email: '',
  password: '',
}

export function LoginFormView({ error, loading, onSubmit }: Props) {
  const handleSubmit = useCallback(
    async ({ isValid, state }: { state: FormData; isValid: boolean }) => {
      if (!isValid) {
        return
      }
      const { email, password } = state
      onSubmit?.(email, password)
    },
    [onSubmit],
  )

  return (
    <Stack fillHorizontal>
      <Form state={formState} onSubmit={handleSubmit}>
        {({ submitForm }) => (
          <Stack fill padding='large'>
            <Text textColor={COLOR.PRIMARY}>Email</Text>
            <EmailFormItem disabled={loading} />
            <Spacer size='x-small' />
            <Text textColor={COLOR.PRIMARY}>Password</Text>
            <PasswordFormItem disabled={loading} />
            <Spacer size='xx-small' />
            <Stack fillHorizontal alignRight>
              <Button
                loading={loading}
                width={125}
                rightIcon={<ArrowForwardIcon color={COLOR.PRIMARY} />}
                size='small'
                onTap={submitForm}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        )}
      </Form>
      {error ? <ErrorPopup error={error} title='Login Failed' /> : null}
    </Stack>
  )
}
