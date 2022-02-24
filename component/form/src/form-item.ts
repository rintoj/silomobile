import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { useFormContext } from './form'
import { useValidatedState, Validator } from './form-validators'

export type AcceptableFormValue = string | boolean | number

export type FormChildProp<T extends AcceptableFormValue> = {
  value?: T
  onChange?: (value: T) => void
  onChangeText?: (value: T) => void
  onBlur?: () => void
  error?: string | Error | null
  isLoading?: boolean
}

interface Props<T extends AcceptableFormValue> {
  name: string
  validators?: Validator<T>[]
  children: ReactElement<FormChildProp<T>>
}

export function FormItem<T extends AcceptableFormValue>({ children, name, validators }: Props<T>) {
  const [touched, setTouched] = useState<boolean>(false)
  const { state, submitted, setItemContext, setFormValue } = useFormContext()
  const [value, setValue, stateContext] = useValidatedState(validators || [], state[name])

  const onChange = useCallback(
    (currentValue: T) => {
      setValue(currentValue)
    },
    [setValue],
  )

  const onBlur = useCallback(() => {
    setTouched?.(value ? true : false)
  }, [value])

  useEffect(() => {
    setItemContext?.(name, stateContext)
  }, [name, setItemContext, stateContext])

  useEffect(() => {
    setFormValue?.(name, value)
  }, [setFormValue, name, value])
  return React.cloneElement(children, {
    value,
    onBlur,
    onChange,
    onChangeText: onChange,
    error: touched || submitted ? stateContext?.error : undefined,
  })
}
