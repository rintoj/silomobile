import { ReactElement } from 'react'

export interface BottomSheetRef {
  collapse: () => void
  expand: () => void
}

export interface BottomSheetProps {
  sheetRef?: React.MutableRefObject<BottomSheetRef | undefined>
  width?: number
  hideHandle?: boolean
  snapPoints?: Array<string | number>
  visible?: boolean
  children: ReactElement
  enablePanDownToClose?: boolean
  onClose?: () => void
}
