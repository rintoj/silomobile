import { COLOR_X } from '@silo-feature/theme'
import { COLOR, useTheme } from 'native-x-theme'
import React from 'react'
import SearchSVG from './images/search-icon.svg'

interface Props {
  color?: COLOR | COLOR_X
}

export function SearchIcon({ color }: Props) {
  const { getColor } = useTheme()
  return <SearchSVG color={getColor(color ?? COLOR.TERTIARY)} />
}
