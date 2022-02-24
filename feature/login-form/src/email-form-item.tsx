import { FormItem, isEmpty, isInvalidEmail } from '@silo-component/form'
import { TextInput } from '@silo-component/text-input'
import { COLOR_X } from '@silo-feature/theme'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'

interface Props {
  disabled?: boolean
}

const validators = [isEmpty('Email is required'), isInvalidEmail()]

export function EmailFormItem({ disabled }: Props) {
  return (
    <Stack fillHorizontal height={85}>
      <FormItem name='email' validators={validators}>
        <TextInput
          autoCapitalize='none'
          backgroundColor={COLOR_X.ACCENT2}
          disabled={disabled}
          fill
          keyboardType='email-address'
          placeholder='john@doe.com'
          placeholderColor={COLOR_X.PLACEHOLDER}
          textColor={COLOR.PRIMARY}
        />
      </FormItem>
    </Stack>
  )
}
