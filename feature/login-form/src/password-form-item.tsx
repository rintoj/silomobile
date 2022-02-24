import { TextInput } from '@silo-component/text-input'
import { COLOR_X } from '@silo-feature/theme'
import { FormItem, isEmpty } from '@silo-component/form'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { Stack } from 'native-x-stack'

interface Props {
  disabled?: boolean
}

const validators = [isEmpty('Password is required')]

export function PasswordFormItem({ disabled }: Props) {
  return (
    <Stack height={85} fillHorizontal>
      <FormItem name='password' validators={validators}>
        <TextInput
          backgroundColor={COLOR_X.ACCENT2}
          disabled={disabled}
          fill
          keyboardType='ascii-capable'
          password
          placeholder='password'
          placeholderColor={COLOR_X.PLACEHOLDER}
          textColor={COLOR.PRIMARY}
        />
      </FormItem>
    </Stack>
  )
}
