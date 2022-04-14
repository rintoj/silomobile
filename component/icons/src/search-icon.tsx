import React from 'react'
import SearchSVG from './images/search-icon.svg'
import { useTheme, COLOR } from 'native-x-theme'
import { COLOR_X } from '@silo-feature/theme'

interface Props {
  color?: COLOR | COLOR_X
}

export function SearchIcon({ color }: Props) {
  const { getColor } = useTheme()
  return <SearchSVG color={getColor(color ?? COLOR.TERTIARY)} />
}
