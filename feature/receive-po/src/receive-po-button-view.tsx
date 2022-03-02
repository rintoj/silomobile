import { Button } from '@silo-component/button'
import { ErrorPopup } from '@silo-component/error-popup'
import { COLOR } from 'native-x-theme'
import React from 'react'

interface Props {
  loading?: boolean
  error?: Error | null
  onTap?: () => void
}

export function ReceivePOButtonView({ loading, error, onTap }: Props) {
  return (
    <>
      <Button
        rounded={false}
        loading={loading}
        disabled={loading}
        size='small'
        width={145}
        height={43}
        backgroundColor={COLOR.TRANSPARENT}
        border
        borderRadius='large'
        borderColor={COLOR.ACCENT}
        textColor={COLOR.ACCENT}
        onTap={onTap}
      >
        Receive PO
      </Button>
      {error ? <ErrorPopup error={error} title='Unable to receive order' /> : null}
    </>
  )
}
