import { RouteProp, useRoute } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import { AddPurchaseOrderQC } from '@silo-feature/add-qc'
import React from 'react'
import { QCScreens } from './add-qc-modal'

type AddPurchaseOrderQCParamList = {
  [QCScreens.PurchaseOrderQC]: {
    id: string
  }
}

export function AddPurchaseOrderQCScreen() {
  const { navigate } = useNavigation<any>()
  const { params } = useRoute<RouteProp<AddPurchaseOrderQCParamList>>()
  const { id = '' } = params ?? {}

  const navigateToLotSpecificQC = () => {
    navigate(QCScreens.LotSpecificQC, { id, lotId: '' })
  }
  return <AddPurchaseOrderQC purchaseOrderID={parseInt(id, 10)} onNext={navigateToLotSpecificQC} />
}
