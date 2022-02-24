import * as emailValidator from 'email-validator'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type Validator<T> = (input: T) => string | undefined

export function isEmpty<T>(errorMessage: string): Validator<T> {
  return (text: T) => {
    if (typeof text === 'number') {
      return undefined
    }
    if (typeof text !== 'string') {
      return text ? undefined : errorMessage
    }
    return text.trim() !== '' ? undefined : errorMessage
  }
}

export function isInvalidEmail(errorMessage = 'Invalid email!'): Validator<string> {
  return text =>
    text.trim() === '' ? undefined : emailValidator.validate(text) ? undefined : errorMessage
}

const alphaNumericRegEx = /^[a-z0-9 ]+$/i
export function isNonAlphaNumeric(errorMessage: string): Validator<string> {
  return value =>
    alphaNumericRegEx.test((value || '').toString().trim()) ? undefined : errorMessage
}

export interface ValidatorContext<T> {
  value?: T
  error: string | undefined
  clear: () => void
  validate: () => boolean
}

export function useValidatedState<T>(
  validators: Validator<T>[],
  initialValue?: T,
): [T | undefined, (v: T) => void, ValidatorContext<T>] {
  const previousValue = useRef(initialValue)
  const [state, setState] = useState<T | undefined>(initialValue)
  const [error, setError] = useState<string | undefined>()

  const clear = useCallback(() => {
    setError(undefined)
  }, [])

  const validate = useCallback((): boolean => {
    previousValue.current = state
    for (const validator of validators) {
      const errorMessage = validator(state as T)
      if (errorMessage) {
        setError(errorMessage)
        return false
      }
    }
    setError(undefined)
    return true
  }, [state, validators])

  useEffect(() => {
    validate()
  }, [state, validate, validators])

  return useMemo(
    () => [state, setState, { value: state, error, clear, validate }],
    [clear, error, state, validate],
  )
}
