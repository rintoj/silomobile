import { RouteProp, useRoute } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import { AddLotSpecificQC } from '@silo-feature/add-qc'
import React from 'react'
import { Screens } from '../navigation/screens'
import { QCScreens } from './add-qc-modal'

type LotSpecificQCParamList = {
  [QCScreens.LotSpecificQC]: {
    id?: string
    lotId?: string
  }
}

export function AddLotSpecificQCScreen() {
  const { navigate } = useNavigation<any>()
  const { params } = useRoute<RouteProp<LotSpecificQCParamList>>()
  const { id = '', lotId = '' } = params ?? {}
  const navigateToHome = () => {
    navigate(Screens.Home)
  }
  return (
    <AddLotSpecificQC
      purchaseOrderID={parseInt(id, 10)}
      lotID={parseInt(lotId, 10)}
      onSubmit={navigateToHome}
    />
  )
}
