import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import { ValidatorContext } from './form-validators'

interface FormContextType<T> {
  state: T
  submitted?: boolean
  submitForm?: () => Promise<any>
  resetForm?: () => void
  setFormValue?: (name: string, value: T) => void
  setItemContext?: (name: string, value: ValidatorContext<T>) => void
}

const FormContext = createContext<FormContextType<any>>({ state: {} as any })

interface Props<T> {
  state?: T

  children?: (props: {
    state: T
    submitForm: () => Promise<any>
    resetForm: () => void
  }) => ReactNode | ReactNode[]

  submitIfValid?: boolean
  onSubmit?: (props: { state: T; isValid: boolean }) => Promise<any>
  onChange?: (props: { state: T; isValid: boolean }) => Promise<any>
}

export function Form<T>({
  submitIfValid = true,
  onSubmit,
  onChange,
  children,
  ...props
}: Props<T>) {
  const context = useRef<{ [id: string]: ValidatorContext<T> }>({} as any)
  const state = useRef<T>(props.state || ({} as T))
  const [submitted, setSubmitted] = useState<boolean>(false)

  const setFormValue = useCallback(
    (name: string, value: string) => {
      state.current = { ...state.current, [name]: value }
      const isValid =
        Object.keys(context.current)
          .map(key => context.current?.[key]?.validate?.())
          .filter(i => i !== true).length === 0
      onChange?.({ state: state.current, isValid })
    },
    [onChange],
  )

  const setItemContext = useCallback((name: string, itemContext: ValidatorContext<T>) => {
    context.current = { ...context.current, [name]: itemContext }
  }, [])

  const submitForm = useCallback(async () => {
    const isValid =
      Object.keys(context.current)
        .map(key => context.current?.[key]?.validate?.())
        .filter(i => i !== true).length === 0
    setSubmitted(true)
    if (!submitIfValid || isValid) {
      onSubmit?.({ state: state.current, isValid })
    }
  }, [onSubmit, submitIfValid])

  const resetForm = useCallback(() => {
    Object.keys(context).map(key => context.current?.[key]?.clear?.())
    setSubmitted(false)
  }, [context])

  const value = useMemo(() => {
    return {
      state: state.current,
      submitted,
      submitForm,
      resetForm,
      setFormValue,
      setItemContext,
    }
  }, [submitted, submitForm, resetForm, setFormValue, setItemContext])

  return (
    <FormContext.Provider value={value}>
      {children?.({ state: state.current, submitForm, resetForm })}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  return useContext(FormContext)
}
