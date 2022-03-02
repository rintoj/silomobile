import { Spinner } from 'native-x-spinner'
import { Stack, StackProps } from 'native-x-stack'
import React, { isValidElement, ReactNode } from 'react'
import { EmptyMessage } from './empty-message'
import { ErrorMessage } from './error-message'

type ErrorMessageType = string | Error | null | undefined
type EmptyMessageObjectType = { title?: string; description: string; icon?: React.ReactNode }
export type EmptyMessageType = ReactNode | null | undefined | EmptyMessageObjectType

interface Props<T> extends StackProps {
  data?: T | null
  isLoading?: boolean
  error?: ErrorMessageType
  renderError?: (error: ErrorMessageType) => ReactNode
  showError?: boolean
  showEmptyMessage?: boolean
  showSpinner?: boolean
  emptyMessage?: EmptyMessageType
}

function isValidEmptyMessageNode(emptyMessage: EmptyMessageType): emptyMessage is ReactNode {
  return isValidElement(emptyMessage)
}

function isEmptyMessageObject(
  emptyMessage: EmptyMessageType,
): emptyMessage is EmptyMessageObjectType {
  return !isValidEmptyMessageNode(emptyMessage) && !!(emptyMessage as EmptyMessageObjectType)?.title
}

function hasEmptyData<T, P extends { items: T[] }>(data: T | T[] | P) {
  return !data || (data as T[])?.length === 0 || (data as P)?.items?.length === 0
}

export function DataView<T>({
  data,
  children,
  isLoading,
  error,
  showError = true,
  showSpinner = true,
  showEmptyMessage = true,
  emptyMessage,
  renderError,
  padding,
  ...stackProps
}: Props<T>) {
  const isEmptyData = hasEmptyData(data)

  if (isEmptyData && isLoading) {
    if (!showSpinner) {
      return null
    }
    return (
      <Stack {...stackProps} padding={padding ?? 'normal'}>
        <Spinner />
      </Stack>
    )
  }

  if (!isLoading && error) {
    if (!showError) {
      return null
    }
    return (
      <Stack {...stackProps} padding={padding ?? 'normal'}>
        {renderError ? renderError(error) : <ErrorMessage>{error}</ErrorMessage>}
      </Stack>
    )
  }

  if (!isLoading && isEmptyData) {
    if (!showEmptyMessage) {
      return null
    }
    return (
      <Stack {...stackProps} padding={padding ?? 'normal'}>
        {isEmptyMessageObject(emptyMessage) ? (
          <EmptyMessage
            title={emptyMessage?.title}
            icon={emptyMessage.icon}
            alignCenter={stackProps.alignCenter}
          >
            {emptyMessage?.description ?? 'no data'}
          </EmptyMessage>
        ) : isValidEmptyMessageNode(emptyMessage) ? (
          emptyMessage
        ) : null}
      </Stack>
    )
  }

  return (
    <Stack {...stackProps} padding={padding}>
      {children}
    </Stack>
  )
}
