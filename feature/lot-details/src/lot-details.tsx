import React from 'react'
import { LotDetailsView } from './lot-details-view'
import { useLotQuery } from './use-lot-query'

interface Props {
  lotId: string
}

export function LotDetails({ lotId }: Props) {
  const { data: lot } = useLotQuery({ lotId })
  return <LotDetailsView lot={lot} />
}
