import { useAuth } from '@silo-feature/auth'
import React, { useCallback } from 'react'
import { ReceivePOButtonView } from './receive-po-button-view'
import { useReceivePOMutation } from './use-receive-po-mutation'

interface Props {
  orderID: number
}

export function ReceivePoButton({ orderID }: Props) {
  const { user } = useAuth()
  const { mutateAsync: receivePurchaseOrder, isLoading, error } = useReceivePOMutation(orderID)
  const onReceiveTap = useCallback(() => {
    if (!user) {
      return
    }
    receivePurchaseOrder({
      deliveredAt: new Date().toISOString(),
      signature: `${user?.firstName} ${user?.lastName}`,
    })
  }, [receivePurchaseOrder, user])

  return <ReceivePOButtonView loading={isLoading} onTap={onReceiveTap} error={error} />
}
